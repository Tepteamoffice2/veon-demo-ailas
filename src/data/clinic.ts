// All facts come from veon/client.json (ids in comments). Do not add numbers, people or claims that are not there.

export const phone = {
  display: "044 364 10 01", // company.contacts.phones[0], C-126
  href: "tel:+380443641001",
  hours: "пн–сб 8:00–20:00", // C-124
  hoursFull: "пн–сб 8:00–20:00, неділя — вихідний",
};

export const opticsPhone = {
  display: "(067) 231 63 63", // company.contacts.phones[1]
  href: "tel:+380672316363",
  hours: "пн–пт 9:00–19:00, сб 9:00–18:00", // C-125
};

export const email = { display: "info@ailas.com.ua", href: "mailto:info@ailas.com.ua" }; // company.contacts.emails[0]

export const address = {
  street: "просп. Степана Бандери, 17/1",
  full: "04073, м. Київ, просп. Степана Бандери, 17/1", // company.contacts.addresses[0]
  metro: "12 хв пішки від ст. м. «Почайна»",
  optics: "1-й поверх, ліворуч", // addresses[1]
  map: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Київ, проспект Степана Бандери, 17/1"),
};

export const licence = "Ліцензія МОЗ України №896 від 03.08.2017"; // C-001
export const legalName = "ТОВ «АЙЛАЗ»";

// socials[] — status confirmed (approval note in design/concept.md)
export const socials = [
  { name: "Instagram", handle: "@ailasua", href: "https://www.instagram.com/ailasua/" },
  { name: "Facebook", handle: "AILASUA", href: "https://www.facebook.com/AILASUA/" },
  { name: "YouTube", handle: "AILASCOMUA", href: "https://www.youtube.com/user/AILASCOMUA" },
  { name: "TikTok", handle: "@ailasua", href: "https://www.tiktok.com/@ailasua" },
];

export const nav = [
  { href: "#directions", label: "Напрямки" },
  { href: "#prices", label: "Ціни" },
  { href: "#doctors", label: "Лікарі" },
  { href: "#clinic", label: "Клініка" },
  { href: "#contacts", label: "Контакти" },
];

export interface Direction {
  id: string;
  ask: string; // words of the patient
  term: string;
  methods: string[];
  price?: string;
  priceNote?: string;
  call?: "main" | "optics";
}

// business_lines[], products_services[], prices C-009, C-020
export const directions: Direction[] = [
  {
    id: "laser",
    ask: "Хочу бачити без окулярів",
    term: "Лазерна корекція зору",
    methods: ["ЛАСІК (лептоЛАСІК), ЛАСЕК/ФРК, StreamLight на лазері WaveLight EX500", "Корекція астигматизму (астигматомія)", "Імплантація внутрішньоочних (факічних) лінз"],
    price: "від 14 300 грн",
    priceNote: "за око",
  },
  {
    id: "cataract",
    ask: "Зір мутніє — схоже на катаракту",
    term: "Хірургія катаракти",
    methods: ["Холодна факоемульсифікація", "ІОЛ Carl Zeiss (CT Asphina, AT LISA toric/trifocal), Johnson & Johnson PureSee (EDOF)", "Програма для пенсіонерів"],
    price: "від 31 100 грн",
    priceNote: "з ІОЛ",
  },
  {
    id: "kids",
    ask: "Дитина гірше бачить вдалину",
    term: "Дитячий зір і контроль міопії",
    methods: ["Лікування короткозорості, у тому числі контроль міопії у дітей", "Ортокератологія: нічні лінзи Paragon CRT 100 (США) і Precilens DRL (Франція)", "Підбір контактних лінз, у тому числі м'яких кастомізованих Soflex"],
    price: "8 200 грн",
    priceNote: "лінза Paragon CRT 100",
  },
  {
    id: "disease",
    ask: "Лікар знайшов хворобу ока",
    term: "Лікування захворювань ока",
    methods: ["Глаукома, захворювання сітківки", "Кератоконус (крос-лінкінг), кератити й дистрофії рогівки", "Косоокість, сухе око (IPL), апаратні методи лікування зору"],
  },
  {
    id: "diagnostics",
    ask: "Хочу перевірити зір",
    term: "Діагностика зору для дорослих і дітей",
    methods: ["Первинне офтальмологічне обстеження", "Діагностика на Pentacam AXL і TopoLyzer", "0 грн при операції з катаракти"],
    price: "1 400 грн",
    priceNote: "первинне обстеження",
  },
  {
    id: "optics",
    ask: "Потрібні окуляри",
    term: "«АЙЛАЗ-Оптика»",
    methods: ["Підбір окулярів і оправ", "Сонцезахисні окуляри", "У тій самій будівлі: 1-й поверх, ліворуч"],
    call: "optics",
  },
];

export interface PriceItem { value: string; label: string; }
export interface PriceGroup { id: string; tab: string; heading: string; items: PriceItem[]; }

// C-009, C-020 — reference prices, UAH
export const priceGroups: PriceGroup[] = [
  {
    id: "laser",
    tab: "Лазерна корекція",
    heading: "Лазерна корекція зору, за одне око",
    items: [
      { value: "14 300", label: "Wavefront Optimized" },
      { value: "20 000", label: "Custom-Q" },
      { value: "23 000", label: "StreamLight" },
    ],
  },
  {
    id: "cataract",
    tab: "Катаракта",
    heading: "Факоемульсифікація катаракти з ІОЛ",
    items: [
      { value: "31 100", label: "з ІОЛ CT Asphina 404" },
      { value: "25 000", label: "програма для пенсіонерів" },
      { value: "0", label: "первинне обстеження при операції" },
    ],
  },
  {
    id: "kids",
    tab: "Діти",
    heading: "Ортокератологія, нічні лінзи",
    items: [
      { value: "8 200", label: "лінза Paragon CRT 100" },
      { value: "4 500", label: "річна програма рефракційної терапії Paragon CRT 100, без витратних матеріалів" },
    ],
  },
  {
    id: "exam",
    tab: "Обстеження",
    heading: "Діагностика зору",
    items: [
      { value: "1 400", label: "первинне офтальмологічне обстеження" },
      { value: "0", label: "якщо далі — операція з катаракти" },
    ],
  },
];

// C-003
export const leaders = [
  { name: "Розумій Наталія Михайлівна", role: "Головна лікарка", rank: "Кандидатка медичних наук, Заслужена лікарка України" },
  { name: "Авер'янова Оксана Сергіївна", role: "Директорка", rank: "Кандидатка медичних наук" },
  { name: "Ковальов Андрій Іванович", role: "Провідний хірург", rank: "Кандидат медичних наук" },
];

// C-004 (roles exactly as on the clinic site; empty where the site gives none)
export const doctors = [
  { name: "Гайдамака Т. Б.", note: "доктор медичних наук" },
  { name: "Максименко О. М.", note: "кандидат медичних наук" },
  { name: "Шпак О. О.", note: "вітреоретинальний хірург" },
  { name: "Поплавець О. В.", note: "лазерний ретинальний хірург, дитячий офтальмолог" },
  { name: "Бурдига О. М.", note: "лазерний рефракційний хірург, дитячий офтальмолог" },
  { name: "Савинець Т. В.", note: "" },
  { name: "Прохвачова О. С.", note: "" },
];

// C-007
export const equipment = [
  { name: "WaveLight EX500", what: "лазер для корекції зору" },
  { name: "Pentacam AXL, TopoLyzer", what: "діагностика: три топографи" },
  { name: "Oertly OS 3", what: "факоемульсифікатор для операцій з катаракти" },
  { name: "Власний операційний блок", what: "з ламінарним потоком повітря" },
];

// C-006
export const firsts = ["Ортокератологія", "Імплантація факічних ІОЛ", "Лікування кератоконусу", "Підбір кастомізованих лінз"];

// C-008
export const makers = ["Bausch & Lomb", "Alcon", "Quantel Medical", "Reichert", "Keeler", "Heine", "Topcon", "Oculus", "Leica", "Oertly", "Haag-Streit", "Carl Zeiss"];
