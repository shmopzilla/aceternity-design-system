export interface Instructor {
  id: string;
  fullName: string;
  dateOfBirth: string;
  nationality: "FR" | "IT" | "EN" | "SP" | "GR";
  languages: string[];
  sport: "ski" | "snowboard" | "touring";
  priceHourlyEuros: number;
  profileThumbUrl: string;
  actionShotUrls: string[];
  tagline: string;
  available: boolean;
}

const instructorTemplates = [
  {
    fullName: "Marcus",
    dateOfBirth: "1999-04-15",
    nationality: "FR" as const,
    languages: ["French", "English", "Spanish"],
    sport: "ski" as const,
    priceHourlyEuros: 100,
    tagline: "Fine tune your form, Après-ski companion",
  },
  {
    fullName: "Sofia",
    dateOfBirth: "1995-08-22",
    nationality: "IT" as const,
    languages: ["Italian", "English", "German"],
    sport: "snowboard" as const,
    priceHourlyEuros: 120,
    tagline: "Master freestyle tricks, Park specialist",
  },
  {
    fullName: "James",
    dateOfBirth: "1992-11-03",
    nationality: "EN" as const,
    languages: ["English", "French"],
    sport: "ski" as const,
    priceHourlyEuros: 150,
    tagline: "Off-piste expert, Avalanche certified",
  },
  {
    fullName: "Elena",
    dateOfBirth: "1997-03-15",
    nationality: "SP" as const,
    languages: ["Spanish", "English", "Portuguese", "French"],
    sport: "ski" as const,
    priceHourlyEuros: 90,
    tagline: "Beginner specialist, Patient teacher",
  },
  {
    fullName: "Dimitri",
    dateOfBirth: "1988-06-28",
    nationality: "GR" as const,
    languages: ["Greek", "English", "Italian"],
    sport: "touring" as const,
    priceHourlyEuros: 180,
    tagline: "Mountain guide, Backcountry specialist",
  },
];

const additionalNames = [
  "Amélie", "Luca", "Emma", "Kai", "Zara", "Niko", "Chloe", "Alex", 
  "Mia", "Felix", "Luna", "Oscar", "Aria", "Leo", "Eva", "Max", 
  "Isla", "Noah", "Ava", "Hugo"
];

const additionalTaglines = [
  "Freestyle coach, Youth programs",
  "Racing technique specialist",
  "All-mountain expert",
  "Powder enthusiast",
  "Competition coach",
  "Safety first instructor",
  "Advanced carving techniques",
  "Mogul master",
  "Cross-country specialist",
  "Adaptive skiing expert",
  "Terrain park guru",
  "Backcountry guide",
  "Glacier skiing pro",
  "Speed and technique",
  "Family instructor",
  "Photography tours",
  "Night skiing expert",
  "Weather specialist",
  "Equipment advisor",
  "First aid certified"
];

function generateInstructorId(index: number): string {
  return `instructor-${index + 1}`;
}

function getRandomProfileImage(index: number): string {
  const profileImages = [
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop"
  ];
  return profileImages[index % profileImages.length];
}

function getRandomActionShots(): string[] {
  const actionShots = [
    "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1518611507436-f9221403cca2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1564919440809-55b7a1d45990?w=800&h=600&fit=crop",
  ];
  
  // Shuffle and take 3 random shots
  const shuffled = [...actionShots].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}

function generateRandomBirthDate(): string {
  const minAge = 20;
  const maxAge = 45;
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - Math.floor(Math.random() * (maxAge - minAge + 1)) - minAge;
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  return `${birthYear}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}

function generateRandomPrice(): number {
  const prices = [75, 85, 90, 95, 100, 110, 120, 130, 140, 150, 160, 170, 180, 200, 220];
  return prices[Math.floor(Math.random() * prices.length)];
}

export const mockInstructors: Instructor[] = Array.from({ length: 25 }, (_, index) => {
  const template = instructorTemplates[index % instructorTemplates.length];
  const additionalName = additionalNames[index % additionalNames.length];
  const name = index < instructorTemplates.length ? template.fullName : additionalName;
  const tagline = index < instructorTemplates.length ? template.tagline : additionalTaglines[index % additionalTaglines.length];
  
  return {
    id: generateInstructorId(index),
    fullName: name,
    dateOfBirth: index < instructorTemplates.length ? template.dateOfBirth : generateRandomBirthDate(),
    nationality: index < instructorTemplates.length ? template.nationality : (["FR", "IT", "EN", "SP", "GR"][Math.floor(Math.random() * 5)] as any),
    languages: index < instructorTemplates.length ? template.languages : ["English", "French"],
    sport: index < instructorTemplates.length ? template.sport : (["ski", "snowboard", "touring"][Math.floor(Math.random() * 3)] as any),
    priceHourlyEuros: index < instructorTemplates.length ? template.priceHourlyEuros : generateRandomPrice(),
    profileThumbUrl: getRandomProfileImage(index),
    actionShotUrls: getRandomActionShots(),
    tagline,
    available: true
  };
});

export function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

export function formatLanguages(languages: string[]): string {
  if (languages.length === 0) return "";
  if (languages.length === 1) return `Speaks ${languages[0]}`;
  if (languages.length === 2) return `Speaks ${languages[0]} and ${languages[1]}`;
  
  const lastLanguage = languages[languages.length - 1];
  const otherLanguages = languages.slice(0, -1).join(", ");
  return `Speaks ${otherLanguages} and ${lastLanguage}`;
}

export function getNationalityText(nationality: string): string {
  const nationalityMap: Record<string, string> = {
    "FR": "French",
    "IT": "Italian", 
    "EN": "English",
    "SP": "Spanish",
    "GR": "Greek"
  };
  return nationalityMap[nationality] || nationality;
}