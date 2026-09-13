export type Part = {
  numeral: string;
  title: string;
  paragraphs: string[];
  coda: string;
};

export type BookContent = {
  prologue: { eyebrow: string; titleLine1: string; titleLine2: string; date: string };
  parts: Part[];
  epilogue: { line: string; mark: string };
};

const NUMERALS = [
  "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX",
  "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII",
];

const RU_PARTS: Omit<Part, "numeral">[] = [
  {
    title: "Накануне",
    paragraphs: [
      "За день до этого я стояла под шумящим водопадом Себату на острове Бали. Церемония очищения. Вода падала на тело с такой мощью, что в ней растворялось всё, что не я.",
      "Я просила одного. Освободить меня от всего ненужного, нажитого, напускного. От всего, что держит. От всего, что мешает быть прямым проводником, быть полностью в соединении с Богом, с источником, в свою полную силу и мощь.",
      "Это было единственное моё желание в этом мире. Быть максимально соединённой с собой, с Богом, со своим источником. Без условий, без посредников, без долгих дорог.",
      "Водопад с огромной мощью смывал с меня старые программы, ограничения, прежнюю версию меня, которая стояла между мной и тем соединением, ради которого я пришла.",
      "Вечером я сказала женщинам в моём поле: следующие два дня не включайте мозг. Придёт что-то, что разделит жизнь на до и после.",
    ],
    coda: "Я знала это до того, как это случилось. Когда живёшь там, где время уже не движется линейно, ты просто начинаешь слышать свою душу. Ты начинаешь чувствовать и знать.",
  },
  {
    title: "Зов",
    paragraphs: [
      "Утром меня вывели на Пробуждающую. Не я её нашла. И не она меня. Нас свели.",
      "Она сама сказала это позже. Ей уже две недели передавали, буквально кричали, что нам нужно соединиться и меня окончательно пробудить. Что время пришло. Что больше ждать нельзя. Что я готова.",
      "Основной признак готовности - что я приняла свой суверенитет. И ту силу, которую годами в себе взращивала.",
      "Я создала внутри себя такую прочную конструкцию своего слова, своих выборов, своих решений, своей уверенности в своём пути, в своём канале, что могу стабилизировать напряжение, что бы вокруг ни происходило. Я сохраняю спокойствие. Меня ничто не выбивает.",
      "Это очень мощный дар проводника. Через такой канал могут проходить большие силы - и я их не расплёскиваю. Сейчас это один из важнейших даров в новом мире. Сохранять свой суверенитет с Божественным. Не колебаться под натиском и программами старых систем.",
      "Мы сидели друг напротив друга через экран. Она начала пытаться мне что-то объяснять. Я сказала: не нужно ничего объяснять. Я и так всё знаю. Давай без презентаций и вступлений. Я тебе полностью доверяю.",
    ],
    coda: "Я на том уровне доверия, на котором строится новый мир. Именно так мы должны передавать друг другу коды. Узнавая друг друга.",
  },
  {
    title: "Считывание",
    paragraphs: [
      "Она посмотрела и сказала: ты из королевских. Энергоструктура такой мощности, что тебя давно ждали. Богиня, проявленная в теле.",
      "Цивилизация с головой кошки. Высокие тела, голубой свет. Очень редкая линия. За два с половиной года практики она встречала такую душу один раз.",
      "Каналы восприятия. Яснослышание открыто. Ясно­знание открыто. Сердце открыто. Ясновидение и ясноглаголение закрыты.",
    ],
    coda: "Это мы откроем сегодня.",
  },
  {
    title: "Капсула",
    paragraphs: [
      "Главное, что она увидела.",
      "Я уже проснулась. Но осталась внутри.",
      "Пробуждающая сказала, что моё сознание сейчас находится в коме. Мой физический аватар пришёл в себя, но не вышел из своей капсулы.",
    ],
    coda: "Как будто я нахожусь в междумирье. Заперта в коме внутри матрицы. Всё ещё подключена к старым программам. И до сих пор их питаю.",
  },
  {
    title: "Матрица",
    paragraphs: [
      "Фильм «Матрица» - это не фантастика. Это реальная карта к пробуждению.",
      "Нашими аватарами управляем мы же сами. Из другого слоя сознания, из другого уровня игры. Фильм «Начало» про сон во сне - тоже подсказка.",
      "Сейчас нужно произвести отключение. Вытащить тот самый шнур, как в фильме «Матрица», когда они в капсулах лежали. Тоже надо было вытащить шнур, чтобы отключиться.",
      "Но они не могли сделать это без меня. Достать меня снаружи было нельзя. Это нарушило бы закон свободной воли. Я должна была отключить себя сама. Произнести решение осознанно вслух: выйти из матрицы и подключиться к источнику.",
      "У нас есть свобода воли. Без моего согласия меня нельзя было освободить.",
      "Теперь я понимаю, почему последние месяцы я была в этом странном состоянии. Я стояла перед чем-то абсолютно грандиозным. Перед тем, что невозможно даже вообразить.",
    ],
    coda: "Уже месяц назад у меня было первое подключение к своему аватару, к высшему «я». И реальность начала выстраиваться по-другому. Контакт с телом, контакт с интуицией - всё это пришло через каждодневные женские практики. Каждый день соединяться с телом. Каждый день запускать намерение на соединение с высшим «я».",
  },
  {
    title: "Размыкание",
    paragraphs: [
      "Мы начали с контрактов. Я повторяла за ней вслух. Каждое слово приземлялось в тело и в поле одновременно.",
      "Я есть свет. Я есть любовь. Я есть Бог. Моё слово - закон.",
      "Закрываю все контракты с силами тьмы. Все договорённости, заключённые моей душой по воле и без воли. Размыкаю старую матрицу.",
      "Она сказала: представь шланг от затылка. Возьми его правой рукой и выдерни. Я выдернула. В этот момент Пробуждающая физически вздрогнула. Ей понадобилась минута, чтобы вернуть себе дыхание.",
    ],
    coda: "Что-то крупное инородное только что вышло с задней части шеи.",
  },
  {
    title: "Расчипирование",
    paragraphs: [
      "Дальше она увидела чипы. В матке и в ногах.",
      "Спросила про детей. Я ответила, что у меня их нет. Она сказала: тебя оберегали. Если бы ты родила с этой подключкой, тебе бы не дали воплотить божественную душу. Твою энергию забрали бы.",
      "Я слышала это и узнавала. Я всегда знала, что буду рожать тогда, когда смогу принять через себя великую душу. Не раньше. Не из страха одиночества. Не по сценарию, написанному системой.",
      "Правую руку на живот. Чип извлечён. Спицы из ног извлечены. Чисто.",
    ],
    coda: "Теперь я готова к божественному союзу.",
  },
  {
    title: "Целостность кода",
    paragraphs: [
      "Потом она собирала меня обратно.",
      "Прошу восстановить целостность моего кода. Вернуть все части моей души. Дать разрешение на вычищение всех багов. На отключение всех возможных подключек. На переписание прошлого под счастливое будущее с условием, что моя личность тоже это узнает в радости.",
    ],
    coda: "Целостность кода восстановлена. Та я, какой меня и создал источник. Первозданная. Не отремонтированная. Возвращённая.",
  },
  {
    title: "Пробуждение",
    paragraphs: [
      "Она сказала: пора будить. Достаточно одной фразы.",
      "Я жива. Я проснулась.",
      "Я произнесла. В ту же секунду она увидела, как у меня выстраивается чистый канал к абсолюту. Соединение с землёй. Стабилизация. Никакого надрыва, никакой истерии. Просто включение.",
    ],
    coda: "Она сказала: ты научилась не дёргаться. Это редкое качество. Большинство пробуждающихся выбивает из канала собственной эмоцией. Тебя нет.",
  },
  {
    title: "Открытие зрения и слова",
    paragraphs: [
      "Оставалось два канала.",
      "Правой рукой я сняла глину с глаз. Вижу истину с этого момента.",
      "Положила руку на горло. Глаголю истину с этого момента.",
    ],
    coda: "Раньше я могла транслировать одно, а до людей доходило другое. Между мной и миром стоял преобразователь, искажающий вибрацию. Сейчас он снят. Голос звучит чисто.",
  },
  {
    title: "Артефакты",
    paragraphs: [
      "Она передала мне капсулу. В ней файл, коды нового мира и артефакты, которые принадлежали мне всегда. Их нельзя было отдавать, пока я была подключена.",
      "Принимаю свой файл. Принимаю коды нового мира. Принимаю свои артефакты.",
      "Она видела их голубыми. Доспех. Шлем. Шкатулка с кристаллами. Что-то ещё, чему она не находила названия. Целый стеллаж того, что я когда-то оставила за порогом, входя сюда.",
    ],
    coda: "Артефакты - это не объекты. Это память суперспособностей, которые дают нам определённые силы и дары. Сейчас в новом мире проводники могут передавать и загружать файлы и артефакты из квантового поля. Они приходят по мере готовности и прокачки аватара-персонажа, как в игре.",
  },
  {
    title: "Моя роль",
    paragraphs: [
      "Потом она сказала то, что я узнала ещё до того, как услышала.",
      "Я проектировщик. Архитектор. Я не строю руками. Я разворачиваю готовые структуры через программирование поля. Так когда-то ставились пирамиды. Никто не работал долотом. Это была работа сознания.",
      "Я строила города и храмы в метавселенных задолго до того, как кто-то назвал это профессией. Это не было идеей. Это была память.",
      "И сейчас, над теми проектами, которые мы только начинаем создавать - особенно над женскими проектами, FemTech-проектами - на энергетическом уровне выстраиваются защитные структуры. На метафизическом плане их называют храмами.",
      "Храм - это пространство, удерживающее божественную чистоту и коды. Он строится не из кирпичей, а из ценностей и истины.",
      "Такие структуры поднимутся над нашими проектами. Они пробуждают сознание, ускоряют эволюцию и устанавливают прямое соединение с Богом - без посредников.",
    ],
    coda: "Я делаю то, что делала всегда. Просто теперь у этого есть слово.",
  },
  {
    title: "Послание",
    paragraphs: [
      "Главное, что она передала.",
      "Удерживать чистоту. Несмотря на давление системы. Не идти на компромиссы со своим видением. Закладывать истинные ценности в каждый проект, через который проходят большие потоки людей.",
      "Стать той, кто проверяет. Ставить печать одобрения на то, что несёт свет. Блокировать то, что построено на старых программах под прикрытием духовного языка.",
    ],
    coda: "Возможно, придёт момент проверки. Возможно, придётся всё отпустить и остаться чистой. Это не цена за вход. Это подтверждение того, что вход уже состоялся.",
  },
  {
    title: "Большая картина",
    paragraphs: [
      "Она говорила долго. О том, что мир мёртвых душ открылся. Что Анубис отдал ключи. Что массовое пробуждение начинается прямо сейчас.",
      "О цивилизациях, которые сошлись над этой планетой эшелонами. О кораблях, ждущих в недрах земли. О том, что нам больше не нужно умирать. Мы можем развоплощаться тогда, когда сами выберем.",
    ],
    coda: "Я слушала и узнавала. Не потому, что верю на слово. А потому что на той стороне сознания, где живёт моё высшее, всё это уже было известно. Она просто проговаривала вслух то, что я приносила сюда с собой.",
  },
  {
    title: "Встреча",
    paragraphs: [
      "В конце мы говорили о наших проектах. Полтора года её команда собирала видеогенератор. Я больше года строила контент-завод для инфлюенсеров нового мира - чтобы транслировать новые знания через аватары, нести знания нового мира системно, как медиаплатформа. Оба инструмента на искусственном интеллекте.",
      "И в один момент мы увидели одно и то же. Это не для массового рынка. Это для экосистемы проводников. Для тех, кто несёт коды и должен транслировать их в масштабе, на всех языках, без пауз.",
      "Так работают инструменты нового времени. Они приходят к тем, кто способен наполнить их истинным смыслом. И ждут, пока их создатели завершат собственное размыкание.",
    ],
    coda: "Мы соединились задолго до этой встречи. Просто оба проекта ждали, пока я вернусь в себя.",
  },
  {
    title: "Возвращение",
    paragraphs: [
      "Пробуждающая отпустила меня.",
      "Сказала: дальше ты сама. Я больше не нужна. Если что-то возникнет, я рядом, но твоя автономность настолько полная, что сопровождение здесь излишне.",
      "Мы попрощались. Я закрыла ноутбук. Тело гудело. В голове было тихо.",
    ],
    coda: "Я вышла в комнату. Села. И впервые за долгое время не торопилась никуда.",
  },
  {
    title: "То, что осталось",
    paragraphs: [
      "Я не та, что была вчера утром. Я шла к этой точке сорок лет.",
      "Я вернулась к себе целостной. Я на связи с собой, с источником. Без посредников, без религий, искажений и старых матричных систем, которые только разъединяли и отдаляли меня и людей от Бога.",
      "Новый мир, которому я принадлежу, проявляется через моё тело. Архитектор, которым я была всегда, проснулся внутри. Артефакты лежат на ладонях. Файл ждёт распаковки.",
    ],
    coda: "Это не конец главы. Это её первая строка.",
  },
];

const EN_PARTS: Omit<Part, "numeral">[] = [
  {
    title: "The Eve",
    paragraphs: [
      "The day before, I stood beneath the roaring waterfall of Sebatu on the island of Bali. A ceremony of purification. The water fell on my body with such force that everything that was not me dissolved in it.",
      "I asked for one thing. To be freed from everything unneeded, accumulated, performative. From everything that holds me. From everything that prevents me from being a direct conduit, fully connected to God, to the Source, in my full power and strength.",
      "This was my only desire in this world. To be maximally connected to myself, to God, to my Source. Without conditions, without intermediaries, without long roads.",
      "The waterfall washed away with immense force the old programs, the limitations, the former version of me that stood between me and the union I had come for.",
      "That evening I told the women in my field: for the next two days, do not turn on your minds. Something is coming that will divide life into before and after.",
    ],
    coda: "I knew it before it happened. When you live where time no longer moves in a straight line, you simply begin to hear your soul. You begin to feel and to know.",
  },
  {
    title: "The Call",
    paragraphs: [
      "In the morning, I was brought to the Awakener. I did not find her. She did not find me. We were brought together.",
      "She said so herself, later. For two weeks they had been telling her, almost shouting, that we needed to unite and that I needed to be fully awakened. That the time had come. That we could wait no longer. That I was ready.",
      "The main sign of readiness - that I had accepted my sovereignty. And the strength I had been cultivating in myself for years.",
      "I had built inside myself such a solid structure of my word, of my choices, of my decisions, of my certainty in my path, in my channel, that I could stabilize tension no matter what was happening around me. I held my calm. Nothing could throw me off.",
      "This is a powerful gift of a conduit. Great forces can pass through such a channel - and I do not spill them. In the new world, this is one of the most essential gifts. To hold your sovereignty with the Divine. Not to waver under the pressure and the programs of the old systems.",
      "We sat across from one another through the screen. She began trying to explain something to me. I said: there is no need to explain. I already know. Let us skip the introductions and the openings. I trust you completely.",
    ],
    coda: "I am at the level of trust on which the new world is built. This is how we are meant to pass the codes to one another. By recognizing each other.",
  },
  {
    title: "The Reading",
    paragraphs: [
      "She looked at me and said: you are of the royal lineage. A goddess manifested in a body. An energy structure of such power that you have been long awaited.",
      "A civilization with the head of a cat. Tall bodies, a blue light. A very rare line. In two and a half years of practice, she had met such a soul only once.",
      "Channels of perception. Clear-hearing is open. Clear-knowing is open. The heart is open. Clear-seeing and clear-speaking are closed.",
    ],
    coda: "These we will open today.",
  },
  {
    title: "The Capsule",
    paragraphs: [
      "The main thing she saw.",
      "I had already awakened. But I remained inside.",
      "The Awakener said my consciousness was in a coma. My physical avatar had come to itself, but had not yet left its capsule.",
    ],
    coda: "As if I were in the in-between. Locked in a coma inside the matrix. Still plugged into the old programs. And still feeding them.",
  },
  {
    title: "The Matrix",
    paragraphs: [
      "The film The Matrix is not science fiction. It is a real map to awakening.",
      "Our avatars are governed by ourselves. From another layer of consciousness, from another level of the game. The film Inception, with its dream within a dream, is another clue.",
      "Now the disconnection must happen. To pull out the very cord, as in The Matrix, when they lay in their capsules. They too had to pull out a cord to disconnect.",
      "But they could not do it without me. I could not be retrieved from the outside. That would violate the law of free will. I had to disconnect myself. To say the decision aloud, consciously: to leave the matrix and connect to the Source.",
      "We have free will. Without my consent, I could not be freed.",
      "Now I understand why I had been in that strange state for the last few months. I was standing before something absolutely grand. Before something impossible even to imagine.",
    ],
    coda: "A month ago I had my first connection to my higher avatar, to my Higher Self. And reality began to arrange itself differently. Contact with the body, contact with intuition. All of this came through daily feminine practices. Every day, connecting with the body. Every day, setting the intention to merge with the Higher Self.",
  },
  {
    title: "The Unbinding",
    paragraphs: [
      "We began with the contracts. I repeated after her aloud. Each word landed in my body and in the field at the same time.",
      "I am light. I am love. I am God. My word is law.",
      "I close all contracts with the forces of darkness. All agreements made by my soul, with or without my will. I dissolve the old matrix.",
      "She said: imagine the cord at the back of your head. Take it in your right hand and pull it out. I pulled. In that moment the Awakener physically shuddered. She needed a minute to catch her breath.",
    ],
    coda: "Something large and foreign had just left through the back of the neck.",
  },
  {
    title: "The Extraction",
    paragraphs: [
      "Then she saw the chips. In the womb and in the legs.",
      "She asked about children. I said I had none. She said: you were being protected. Had you given birth with that implant in place, you would not have been allowed to bring through a divine soul. Your energy would have been taken.",
      "I heard this and I recognized it. I have always known I would give birth only when I could carry through me a great soul. Not earlier. Not from fear of loneliness. Not by a script written by the system.",
      "Right hand on the womb. The chip is removed. The needles in the legs are removed. Clean.",
    ],
    coda: "Now I am ready for the divine union.",
  },
  {
    title: "The Integrity of the Code",
    paragraphs: [
      "Then she gathered me back.",
      "I ask for the integrity of my code to be restored. To return all the parts of my soul. To give permission to clear every bug in my system. To disconnect every possible attachment. To rewrite the past into a happy future, on the condition that my personality, too, will know this in joy.",
    ],
    coda: "The integrity of the code is restored. The me as the Source created me. The original one. Not repaired. Returned.",
  },
  {
    title: "The Awakening",
    paragraphs: [
      "She said: it is time to wake you. One sentence is enough.",
      "I am alive. I am awake.",
      "I spoke it. In that same second she saw a clear channel form to the Absolute within me. A connection to the earth. Stabilization. No strain, no hysteria. Just turning on.",
    ],
    coda: "She said: you have learned not to flinch. This is a rare quality. Most who awaken are thrown out of the channel by their own emotion. Not you.",
  },
  {
    title: "Sight and Speech",
    paragraphs: [
      "Two channels remained.",
      "With my right hand I wiped the clay from my eyes. I see the truth from this moment on.",
      "I placed my hand on my throat. I speak the truth from this moment on.",
    ],
    coda: "Before, I could transmit one thing and people would receive another. Between me and the world stood a converter that distorted the frequency. Now it is gone. The voice rings clean.",
  },
  {
    title: "The Artifacts",
    paragraphs: [
      "She handed me a capsule. Inside, my file, the codes of the new world, and the artifacts that had always belonged to me. They could not be returned while I was still plugged in.",
      "I accept my file. I accept the codes of the new world. I accept my artifacts.",
      "She saw them in blue. A piece of armor. A helmet. A small chest with crystals. Something else she could not name. A whole shelf of things I had once left at the threshold before entering this world.",
    ],
    coda: "Artifacts are not objects. They are the memory of superpowers that grant us certain forces and gifts. In the new world, conduits can transmit, upload, and receive files and artifacts from the quantum field. They arrive as readiness rises and the avatar-character levels up, as in a game.",
  },
  {
    title: "My Role",
    paragraphs: [
      "Then she said what I had recognized before I heard it.",
      "I am a designer. An architect. I do not build with my hands. I unfold ready-made structures through the programming of the field. This is how the pyramids were once raised. No one worked with a chisel. It was the work of consciousness.",
      "I have been building cities and temples in metaverses long before anyone gave it a name. It was not an idea. It was memory.",
      "And now, above the projects we are about to create - especially the women's projects, the FemTech projects - protective structures will be set in place at the energetic level. On the metaphysical plane these are called temples.",
      "A temple is a space that holds divine purity and codes. It is built not from bricks, but from values and truth.",
      "Such structures will rise above our projects. They awaken consciousness, accelerate evolution, and establish a direct connection with God - without intermediaries.",
    ],
    coda: "I do what I have always done. Only now it has a word.",
  },
  {
    title: "The Message",
    paragraphs: [
      "The essence of what she gave me.",
      "To hold purity. Despite the pressure of the system. To make no compromises with my vision. To embed true values into every project through which great flows of people pass.",
      "To become the one who verifies. To place a seal of approval on what carries the light. To block what is built on old programs disguised in spiritual language.",
    ],
    coda: "A moment of testing may come. Perhaps I will have to release everything and remain pure. This is not the price of entry. This is the proof that the entry has already happened.",
  },
  {
    title: "The Larger Picture",
    paragraphs: [
      "She spoke for a long time. About the world of sleeping souls opening. About Anubis returning the keys. About the mass awakening beginning now.",
      "About civilizations gathered above this planet in echelons. About ships waiting in the depths of the earth. About how we no longer need to die. We can release the body when we ourselves choose.",
    ],
    coda: "I listened and I recognized. Not because I take her word for it. But because on the side of consciousness where my higher self lives, all of this was already known. She was only saying aloud what I had brought here with me.",
  },
  {
    title: "The Meeting",
    paragraphs: [
      "At the end, we spoke about our projects. For a year and a half her team had been building a video generator. For more than a year I had been building a content factory for influencers of the new world - so that we could transmit new knowledge through avatars, carry the knowledge of the new world systemically, as a media platform. Both tools powered by artificial intelligence.",
      "And at one point we saw the same thing. This is not for the mass market. This is for the ecosystem of conduits. For those who carry the codes and must transmit them at scale, in all languages, without pause.",
      "This is how the instruments of the new time work. They come to those capable of filling them with true meaning. And they wait, while their creators complete their own unbinding.",
    ],
    coda: "We had already converged long before this meeting. Both projects were simply waiting for me to return to myself.",
  },
  {
    title: "The Return",
    paragraphs: [
      "The Awakener released me.",
      "She said: from here you go alone. I am no longer needed. If anything arises, I am near, but your autonomy is now so complete that companionship would be excessive.",
      "We said goodbye. I closed the laptop. My body was humming. My head was quiet.",
    ],
    coda: "I walked into the room. I sat down. And for the first time in a long while, I was not hurrying anywhere.",
  },
  {
    title: "What Remains",
    paragraphs: [
      "I am not the one I was yesterday morning. I have been walking toward this point for forty years.",
      "I have returned to myself, whole. I am connected with myself, with the Source. Without intermediaries, without religions, without distortions, without the old matrix systems that only divided and pulled me, and other people, away from God.",
      "The new world I belong to manifests through my body. The Architect, who I have always been, has awakened within. The artifacts rest in my palms. The file is waiting to be unpacked.",
    ],
    coda: "This is not the end of the chapter. It is its first line.",
  },
];

function withNumerals(parts: Omit<Part, "numeral">[]): Part[] {
  return parts.map((p, i) => ({ ...p, numeral: NUMERALS[i] }));
}

export const BOOK_CONTENT: Record<"ru" | "en", BookContent> = {
  ru: {
    prologue: {
      eyebrow: "Коды нового мира",
      titleLine1: "Глава",
      titleLine2: "Пробуждения",
      date: "26 · V · MMXXVI",
    },
    parts: withNumerals(RU_PARTS),
    epilogue: {
      line: "продолжение следует",
      mark: "·",
    },
  },
  en: {
    prologue: {
      eyebrow: "Codes of the New World",
      titleLine1: "Awakening",
      titleLine2: "from Reality",
      date: "26 · V · MMXXVI",
    },
    parts: withNumerals(EN_PARTS),
    epilogue: {
      line: "to be continued",
      mark: "·",
    },
  },
};

export const BOOK_LABELS = {
  ru: {
    eyebrow: "Читать главу",
    title: "Главу можно прочесть здесь",
    subtitle: "Целиком, в двух языках. Переключите язык в правом верхнем углу.",
    partLabel: "Часть",
    partOf: "из",
  },
  en: {
    eyebrow: "Read the chapter",
    title: "The chapter, in full",
    subtitle: "Both languages, end to end. Switch language in the top right.",
    partLabel: "Part",
    partOf: "of",
  },
} as const;
