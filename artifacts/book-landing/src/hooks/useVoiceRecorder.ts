import { useCallback, useEffect, useRef, useState } from "react";

type State = "idle" | "requesting" | "recording" | "denied" | "unsupported";

export function useVoiceRecorder() {
  const [state, setState] = useState<State>("idle");
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const resolveRef = useRef<((blob: Blob | null) => void) | null>(null);

  const cleanupStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(
    () => () => {
      cleanupStream();
    },
    [cleanupStream],
  );

  const start = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setState("unsupported");
      return false;
    }
    try {
      setState("requesting");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : "";
      const recorder = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });
        cleanupStream();
        resolveRef.current?.(blob.size > 0 ? blob : null);
        resolveRef.current = null;
      };
      recorderRef.current = recorder;
      recorder.start();
      setState("recording");
      return true;
    } catch (err) {
      cleanupStream();
      setState("denied");
      return false;
    }
  }, [cleanupStream]);

  const stop = useCallback((): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const recorder = recorderRef.current;
      if (!recorder || recorder.state === "inactive") {
        resolve(null);
        setState("idle");
        return;
      }
      resolveRef.current = (blob) => {
        setState("idle");
        resolve(blob);
      };
      recorder.stop();
    });
  }, []);

  return { state, start, stop };
}
