
export interface Suite {
  id: string;
  name: string;
  description: {
    en: string;
    de: string;
    nl: string;
  };
  price: number;
  capacity: number;
  size: number;
  amenities: string[];
  images: string[];
}

export interface Amenity {
  id: string;
  name: {
    en: string;
    de: string;
    nl: string;
  };
  description: {
    en: string;
    de: string;
    nl: string;
  };
  image: string;
}

// Suites data
export const suites: Suite[] = [
  {
    id: "royal-suite",
    name: "Royal Suite",
    description: {
      en: "Our most luxurious accommodation, featuring a spacious bedroom, elegant living area, and a stunning view of Middelburg's historic center.",
      de: "Unsere luxuriöseste Unterkunft mit einem geräumigen Schlafzimmer, einem eleganten Wohnbereich und einem atemberaubenden Blick auf das historische Zentrum von Middelburg.",
      nl: "Onze meest luxueuze accommodatie, met een ruime slaapkamer, elegant woongedeelte en een prachtig uitzicht op het historische centrum van Middelburg."
    },
    price: 350,
    capacity: 2,
    size: 65,
    amenities: ["King-size bed", "Freestanding bathtub", "Rainfall shower", "Lounge area", "Minibar", "Coffee machine", "Smart TV"],
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2574",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2670"
    ]
  },
  {
    id: "garden-suite",
    name: "Garden Suite",
    description: {
      en: "A peaceful retreat overlooking our garden, with a private terrace, comfortable bedroom, and modern amenities.",
      de: "Ein friedlicher Rückzugsort mit Blick auf unseren Garten, mit privater Terrasse, komfortablem Schlafzimmer und modernen Annehmlichkeiten.",
      nl: "Een rustige oase met uitzicht op onze tuin, met een privéterras, comfortabele slaapkamer en moderne voorzieningen."
    },
    price: 275,
    capacity: 2,
    size: 50,
    amenities: ["Queen-size bed", "Private terrace", "En-suite bathroom", "Lounge area", "Minibar", "Coffee machine", "Smart TV"],
    images: [
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=2574",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2574"
    ]
  },
  {
    id: "historic-suite",
    name: "Historic Suite",
    description: {
      en: "Experience the rich history of our building in this unique suite featuring original architectural elements combined with modern luxury.",
      de: "Erleben Sie die reiche Geschichte unseres Gebäudes in dieser einzigartigen Suite mit originalen architektonischen Elementen kombiniert mit modernem Luxus.",
      nl: "Ervaar de rijke geschiedenis van ons gebouw in deze unieke suite met originele architectonische elementen gecombineerd met moderne luxe."
    },
    price: 325,
    capacity: 2,
    size: 55,
    amenities: ["King-size bed", "Exposed beams", "Freestanding bathtub", "Lounge area", "Minibar", "Coffee machine", "Smart TV"],
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2670",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670"
    ]
  },
  {
    id: "family-suite",
    name: "Family Suite",
    description: {
      en: "Perfect for families, this spacious suite offers a master bedroom, a second bedroom with twin beds, and a comfortable living area.",
      de: "Perfekt für Familien, diese geräumige Suite bietet ein Hauptschlafzimmer, ein zweites Schlafzimmer mit Einzelbetten und einen komfortablen Wohnbereich.",
      nl: "Perfect voor gezinnen, deze ruime suite heeft een master bedroom, een tweede slaapkamer met twee eenpersoonsbedden en een comfortabel woongedeelte."
    },
    price: 400,
    capacity: 4,
    size: 80,
    amenities: ["King-size bed", "Twin beds", "Two bathrooms", "Lounge area", "Minibar", "Coffee machine", "Smart TV"],
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2670",
      "https://images.unsplash.com/photo-1576675784201-0e142b423952?q=80&w=2670"
    ]
  }
];

// Amenities data
export const amenities: Amenity[] = [
  {
    id: "coffee-cafe",
    name: {
      en: "Coffee Café",
      de: "Kaffee-Café",
      nl: "Koffiecafé"
    },
    description: {
      en: "Our cozy café serves specialty coffees, teas, and freshly baked pastries throughout the day. The perfect spot to relax with a good book or meet with friends.",
      de: "Unser gemütliches Café serviert Spezialitätenkaffees, Tees und frisch gebackene Gebäcke den ganzen Tag über. Der perfekte Ort, um sich mit einem guten Buch zu entspannen oder sich mit Freunden zu treffen.",
      nl: "Ons gezellige café serveert speciale koffies, theeën en vers gebakken gebak gedurende de dag. De perfecte plek om te ontspannen met een goed boek of af te spreken met vrienden."
    },
    image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2670"
  },
  {
    id: "chocolaterie",
    name: {
      en: "Chocolaterie",
      de: "Chocolaterie",
      nl: "Chocolaterie"
    },
    description: {
      en: "Discover the art of fine chocolate making at our in-house chocolaterie. Sample exquisite handmade chocolates crafted by our master chocolatier using only the finest ingredients.",
      de: "Entdecken Sie die Kunst der feinen Schokoladenherstellung in unserer hauseigenen Chocolaterie. Probieren Sie exquisite handgemachte Schokoladen, die von unserem Meister-Chocolatier nur mit den feinsten Zutaten hergestellt werden.",
      nl: "Ontdek de kunst van fijne chocoladebereiding in onze eigen chocolaterie. Proef exquise handgemaakte chocolade, bereid door onze meester-chocolatier met alleen de fijnste ingrediënten."
    },
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=2670"
  },
  {
    id: "garden-terrace",
    name: {
      en: "Garden & Terrace",
      de: "Garten & Terrasse",
      nl: "Tuin & Terras"
    },
    description: {
      en: "Our tranquil garden and terrace provide a peaceful oasis in the heart of the city. Enjoy breakfast in the morning sun or sip cocktails under the stars in the evening.",
      de: "Unser ruhiger Garten und unsere Terrasse bieten eine friedliche Oase im Herzen der Stadt. Genießen Sie das Frühstück in der Morgensonne oder nippen Sie abends unter dem Sternenhimmel an Cocktails.",
      nl: "Onze rustige tuin en terras vormen een vreedzame oase in het hart van de stad. Geniet van het ontbijt in de ochtendzon of nip aan cocktails onder de sterren in de avond."
    },
    image: "https://images.unsplash.com/photo-1580137197143-acf03df2eae9?q=80&w=2670"
  },
  {
    id: "church-venue",
    name: {
      en: "Church Venue",
      de: "Kirchlicher Veranstaltungsort",
      nl: "Kerklocatie"
    },
    description: {
      en: "Our beautifully restored church provides a breathtaking setting for weddings, conferences, concerts, and special events. The historic architecture and excellent acoustics make it a truly unique venue.",
      de: "Unsere wunderschön restaurierte Kirche bietet eine atemberaubende Kulisse für Hochzeiten, Konferenzen, Konzerte und besondere Veranstaltungen. Die historische Architektur und die ausgezeichnete Akustik machen sie zu einem wirklich einzigartigen Veranstaltungsort.",
      nl: "Onze prachtig gerestaureerde kerk biedt een adembenemende setting voor bruiloften, conferenties, concerten en speciale evenementen. De historische architectuur en uitstekende akoestiek maken het een echt unieke locatie."
    },
    image: "https://images.unsplash.com/photo-1623170095789-a1d37891e67e?q=80&w=2574"
  }
];
