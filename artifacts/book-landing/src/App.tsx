import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Access from "@/pages/Access";
import { LanguageProvider } from "@/lib/language-context";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/access" component={Access} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <WouterRouter base={basePath === "/" ? "" : basePath}>
            <Router />
          </WouterRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
