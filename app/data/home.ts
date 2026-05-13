/* ── Planet Data ── */
export interface Planet {
  name: string;
  image: string;
  href: string;
}

export const planets: Planet[] = [
  { name: "Mercurio", image: "https://i.ibb.co/wg3z6D5/mercurio.jpg", href: "/sistema-solar/mercurio" },
  { name: "Venus", image: "https://i.ibb.co/PcyGKXz/venuss-1.png", href: "/sistema-solar/venus" },
  { name: "La Tierra", image: "https://i.ibb.co/74S6B6v/tierra.jpg", href: "/sistema-solar/tierra" },
  { name: "Marte", image: "https://www.nasa.gov/wp-content/uploads/2025/02/37983-mars-globe-valles-marineris-enhanced.jpg", href: "/sistema-solar/marte" },
  { name: "Júpiter", image: "https://i.ibb.co/jRbhbY0/jupiter.jpg", href: "/sistema-solar/jupiter" },
  { name: "Saturno", image: "https://i.ibb.co/G94Z59D/saturnon.jpg", href: "/sistema-solar/saturno" },
  { name: "Urano", image: "https://i.ibb.co/c1Pqq7n/urano.jpg", href: "/sistema-solar/urano" },
  { name: "Neptuno", image: "https://i.ibb.co/z7GPnDY/neptuno-1.jpg", href: "/sistema-solar/neptuno" },
];

/* ── Matter Composition ── */
export interface MatterType {
  title: string;
  description: string;
  image: string;
  href: string;
}

export const matterTypes: MatterType[] = [
  {
    title: "Energía Oscura",
    description: "Forma misteriosa de energía que constituye aproximadamente el 68% del universo y es responsable de la expansión acelerada del cosmos.",
    image: "https://i.postimg.cc/qMZBG7wk/25400.png",
    href: "/materia/energia-oscura",
  },
  {
    title: "Materia Oscura",
    description: "Materia invisible que no emite ni absorbe luz. Constituye el 27% del universo y su presencia se detecta por sus efectos gravitacionales.",
    image: "https://i.postimg.cc/XGGzsgbh/ZMXJ3-OYEZRDYTEVV7-OOCWGCOKU.png",
    href: "/materia/materia-oscura",
  },
  {
    title: "Antimateria",
    description: "Materia compuesta por antipartículas, que poseen la misma masa pero carga opuesta a las partículas normales. Su contacto con la materia produce aniquilación.",
    image: "https://i.postimg.cc/G2sg6Xw7/Capturaant.png",
    href: "/materia/antimateria",
  },
  {
    title: "Materia Bariónica",
    description: "La materia ordinaria que compone todo lo visible: estrellas, planetas y nosotros mismos. Representa solo el 5% del universo.",
    image: "https://i.postimg.cc/hvFWkPdP/mbarionica.png",
    href: "/materia/materia-barionica",
  },
  {
    title: "La Luz",
    description: "Radiación electromagnética visible que viaja a 299.792 km/s. Es nuestra principal herramienta para observar y comprender el universo.",
    image: "https://i.postimg.cc/ppq3Xrqs/luz.jpg",
    href: "/materia/la-luz",
  },
];

/* ── Moons ── */
export interface Moon {
  name: string;
  rank: number;
  image: string;
  href: string;
}

export const moons: Moon[] = [
  { name: "Ganímedes", rank: 1, image: "https://i.postimg.cc/65BzYHbL/Captura-2.png", href: "/lunas/ganimedes" },
  { name: "Titán", rank: 2, image: "https://i.postimg.cc/QtHV8rMk/Tit-Tan-1.png", href: "/lunas/titan" },
  { name: "Calisto", rank: 3, image: "https://i.ibb.co/ynGTyY4/2due.png", href: "/lunas/calisto" },
  { name: "Ío", rank: 4, image: "https://i.postimg.cc/8czJrrwW/ioNN-1.png", href: "/lunas/io" },
  { name: "La Luna", rank: 5, image: "https://i.postimg.cc/FRDX1f72/Captura-1.png", href: "/lunas/la-luna" },
];

/* ── Hero Slider Images ── */
export const heroImages: string[] = [
  "https://i.ibb.co/kS3sx7v/video-frame-1643.jpg",
  "https://i.ibb.co/n1LrFMh/pexels-adam-krypel-7649139.jpg",
  "https://i.ibb.co/8XV9Pm0/pexels-adam-krypel-7649132.jpg",
  "https://i.ibb.co/hdzQyt2/pexels-adam-krypel-7649105.jpg",
  "https://i.ibb.co/0hjWVhY/pexels-harrison-macourt-6707964.jpg",
  "https://i.ibb.co/SKjCZXv/pexels-jakub-novacek-924824.jpg",
];

/* ── Electromagnetic Spectrum ── */
export const spectrumTypes: string[] = [
  "Radio",
  "Microondas",
  "Infrarrojo",
  "Luz Visible",
  "Ultravioleta",
  "Rayos X",
  "Rayos Gamma",
];

/* ── Explore More Cards ── */
export interface ExploreCard {
  title: string;
  backgroundImage: string;
  href: string;
}

export const exploreCards: ExploreCard[] = [
  {
    title: "Conocé el cielo",
    backgroundImage: "https://i.ibb.co/twvGpSm8/Captura-de-pantalla-2025-12-23-181022.png",
    href: "/explorar/cielo",
  },
  {
    title: "Argentina en el Espacio",
    backgroundImage: "https://i.ibb.co/9H2VGdrm/Captura-de-pantalla-2025-12-23-180706.png",
    href: "/explorar/argentina-espacio",
  },
  {
    title: "Aprendé",
    backgroundImage: "https://i.ibb.co/bRDx88B7/stsci-01gk2kmys6hads6nd8nrhg53rp.webp",
    href: "/explorar/aprender",
  },
  {
    title: "Olimpiadas",
    backgroundImage: "https://i.ibb.co/TDqySwcs/Hubble-ultra-deep-field.jpg",
    href: "/explorar/olimpiadas",
  },
];

/* ── Telescopes ── */
export const telescopeImages: string[] = [
  "https://i.postimg.cc/kG5KvHv1/james-webb2.jpg",
  "https://i.postimg.cc/pX9NrLM7/hubble.jpg",
  "https://i.postimg.cc/P5DZyY1j/euclid-removebg-preview.png",
];
