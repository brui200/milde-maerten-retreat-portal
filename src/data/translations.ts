
// Import specific locales from date-fns 
import { enUS } from 'date-fns/locale/en-US';
import { de } from 'date-fns/locale/de';
import { nl } from 'date-fns/locale/nl';

const translations = {
  en: {
    navbar: {
      home: "Home",
      suites: "Suites",
      amenities: "Amenities",
      events: "Events",
      contact: "Contact",
      booking: "Book Now",
    },
    footer: {
      company: "Company",
      about: "About Us",
      team: "Our Team",
      careers: "Careers",
      contact: "Contact",
      suites: "Suites",
      amenities: "Amenities",
      events: "Events",
      social: "Social Media",
      facebook: "Facebook",
      instagram: "Instagram",
      linkedin: "LinkedIn",
      newsletter: {
        title: "Subscribe to our Newsletter",
        description: "Stay up to date with our latest news and special offers.",
        emailPlaceholder: "Your Email Address",
        subscribeButton: "Subscribe",
        successMessage: "Thank you for subscribing!",
        errorMessage: "Please enter a valid email address.",
      },
      copyright: "© 2024 Hotel de Milde Maerten. All rights reserved.",
    },
    home: {
      hero: {
        title: "Experience the Charm of Middelburg",
        subtitle: "Discover a unique blend of history and luxury at our boutique hotel in the heart of Zeeland.",
        cta: "Book Your Stay",
      },
      about: {
        title: "A Boutique Hotel with a Story",
        description: "Nestled in the historic heart of Middelburg, Hotel de Milde Maerten offers a unique blend of classic charm and modern luxury. Our carefully restored building, dating back to the 17th century, provides an intimate and elegant setting for your stay. Discover our individually designed suites, indulge in gourmet dining, and experience the warm hospitality that sets us apart.",
      },
      suites: {
        title: "Our Exclusive Suites",
        description: "Indulge in the comfort and style of our individually designed suites. Each room offers a unique ambiance, combining historic charm with modern amenities for an unforgettable stay.",
        viewAll: "View All Suites",
      },
      amenities: {
        title: "Exceptional Amenities",
        description: "Enhance your stay with our exceptional amenities, designed to provide you with the utmost comfort and convenience. From our gourmet dining options to our relaxing spa services, we have everything you need for a memorable experience.",
        viewAll: "Explore All Amenities",
      },
      events: {
        title: "Celebrate in Style",
        description: "Host your special event in our unique and elegant venues. Whether you're planning a wedding, a corporate retreat, or a family celebration, our dedicated team will ensure a seamless and unforgettable experience.",
        learnMore: "Learn More",
      },
      contact: {
        title: "Get in Touch",
        description: "We'd love to hear from you! Contact us for inquiries, reservations, or special requests. Our friendly team is here to assist you with all your needs.",
        contactUs: "Contact Us",
      },
      reviews: {
        title: "Guest Reviews",
        description: "Read what our guests have to say about their experience at Hotel de Milde Maerten",
        allReviews: "All Reviews"
      }
    },
    suites: {
      title: "Our Suites",
      description: "Discover our unique suites, each offering a blend of comfort and style. From cozy rooms to luxurious apartments, find the perfect accommodation for your stay.",
      viewDetails: "View Details",
      book: "Book Now",
      amenities: "Suite Amenities",
      policies: "Hotel Policies",
      checkInOut: "Check-in & Check-out",
      checkInTime: "Check-in Time",
      checkOutTime: "Check-out Time",
      cancellation: "Cancellation Policy",
      cancellationPolicy: "Free cancellation up to 24 hours before arrival.",
      reviews: "Guest Reviews",
      guest: "guest",
      guests: "guests"
    },
    amenities: {
      title: "Hotel Amenities",
      description: "Explore the range of amenities we offer to make your stay more enjoyable. From dining to relaxation, we have something for everyone.",
      learnMore: "Learn More",
    },
    events: {
      title: "Events & Celebrations",
      description: "Plan your special event with us. Our venues and services are perfect for weddings, conferences, and private parties.",
      viewEvents: "View Events",
    },
    contact: {
      title: "Contact Us",
      description: "Get in touch with our team for any inquiries or special requests. We are here to help make your stay perfect.",
      sendEmail: "Send Email",
    },
    booking: {
      title: "Book Your Stay",
      description: "Check availability and book your suite directly with us for the best rates and exclusive offers.",
      checkAvailability: "Check Availability",
    },
    notFound: {
      title: "Page Not Found",
      description: "The page you are looking for does not exist. Please check the URL or return to the homepage.",
      returnHome: "Return to Home",
    },
  },
  de: {
    navbar: {
      home: "Startseite",
      suites: "Suiten",
      amenities: "Annehmlichkeiten",
      events: "Veranstaltungen",
      contact: "Kontakt",
      booking: "Jetzt Buchen",
    },
    footer: {
      company: "Unternehmen",
      about: "Über Uns",
      team: "Unser Team",
      careers: "Karriere",
      contact: "Kontakt",
      suites: "Suiten",
      amenities: "Annehmlichkeiten",
      events: "Veranstaltungen",
      social: "Soziale Medien",
      facebook: "Facebook",
      instagram: "Instagram",
      linkedin: "LinkedIn",
      newsletter: {
        title: "Abonnieren Sie unseren Newsletter",
        description: "Bleiben Sie auf dem Laufenden mit unseren neuesten Nachrichten und Sonderangeboten.",
        emailPlaceholder: "Ihre E-Mail-Adresse",
        subscribeButton: "Abonnieren",
        successMessage: "Vielen Dank für Ihre Anmeldung!",
        errorMessage: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
      },
      copyright: "© 2024 Hotel de Milde Maerten. Alle Rechte vorbehalten.",
    },
    home: {
      hero: {
        title: "Erleben Sie den Charme von Middelburg",
        subtitle: "Entdecken Sie eine einzigartige Mischung aus Geschichte und Luxus in unserem Boutique-Hotel im Herzen von Zeeland.",
        cta: "Buchen Sie Ihren Aufenthalt",
      },
      about: {
        title: "Ein Boutique-Hotel mit Geschichte",
        description: "Das Hotel de Milde Maerten liegt im historischen Herzen von Middelburg und bietet eine einzigartige Mischung aus klassischem Charme und modernem Luxus. Unser sorgfältig restauriertes Gebäude aus dem 17. Jahrhundert bietet einen intimen und eleganten Rahmen für Ihren Aufenthalt. Entdecken Sie unsere individuell gestalteten Suiten, genießen Sie Gourmetküche und erleben Sie die herzliche Gastfreundschaft, die uns auszeichnet.",
      },
      suites: {
        title: "Unsere Exklusiven Suiten",
        description: "Gönnen Sie sich den Komfort und Stil unserer individuell gestalteten Suiten. Jedes Zimmer bietet ein einzigartiges Ambiente, das historischen Charme mit modernen Annehmlichkeiten für einen unvergesslichen Aufenthalt verbindet.",
        viewAll: "Alle Suiten Anzeigen",
      },
      amenities: {
        title: "Außergewöhnliche Annehmlichkeiten",
        description: "Verbessern Sie Ihren Aufenthalt mit unseren außergewöhnlichen Annehmlichkeiten, die Ihnen höchsten Komfort und Bequemlichkeit bieten. Von unseren Gourmetrestaurants bis hin zu unseren entspannenden Spa-Services haben wir alles, was Sie für ein unvergessliches Erlebnis benötigen.",
        viewAll: "Alle Annehmlichkeiten Erkunden",
      },
      events: {
        title: "Stilvoll Feiern",
        description: "Veranstalten Sie Ihr besonderes Ereignis in unseren einzigartigen und eleganten Veranstaltungsorten. Ob Sie eine Hochzeit, einen Firmenausflug oder eine Familienfeier planen, unser engagiertes Team sorgt für ein nahtloses und unvergessliches Erlebnis.",
        learnMore: "Mehr Erfahren",
      },
      contact: {
        title: "Nehmen Sie Kontakt Auf",
        description: "Wir würden uns freuen, von Ihnen zu hören! Kontaktieren Sie uns für Anfragen, Reservierungen oder spezielle Wünsche. Unser freundliches Team steht Ihnen bei allen Ihren Bedürfnissen zur Seite.",
        contactUs: "Kontaktieren Sie Uns",
      },
      reviews: {
        title: "Gästebewertungen",
        description: "Lesen Sie, was unsere Gäste über ihre Erfahrungen im Hotel de Milde Maerten zu sagen haben",
        allReviews: "Alle Bewertungen"
      }
    },
    suites: {
      title: "Unsere Suiten",
      description: "Entdecken Sie unsere einzigartigen Suiten, die jeweils eine Mischung aus Komfort und Stil bieten. Von gemütlichen Zimmern bis hin zu luxuriösen Apartments finden Sie die perfekte Unterkunft für Ihren Aufenthalt.",
      viewDetails: "Details Anzeigen",
      book: "Jetzt Buchen",
      amenities: "Suiten-Annehmlichkeiten",
      policies: "Hotelrichtlinien",
      checkInOut: "Check-in & Check-out",
      checkInTime: "Check-in-Zeit",
      checkOutTime: "Check-out-Zeit",
      cancellation: "Stornierungsbedingungen",
      cancellationPolicy: "Kostenlose Stornierung bis 24 Stunden vor Anreise.",
      reviews: "Gästebewertungen",
      guest: "Gast",
      guests: "Gäste"
    },
    amenities: {
      title: "Hotel Annehmlichkeiten",
      description: "Entdecken Sie die Vielfalt an Annehmlichkeiten, die wir anbieten, um Ihren Aufenthalt angenehmer zu gestalten. Von Gastronomie bis Entspannung haben wir für jeden etwas zu bieten.",
      learnMore: "Mehr Erfahren",
    },
    events: {
      title: "Veranstaltungen & Feiern",
      description: "Planen Sie Ihre besondere Veranstaltung mit uns. Unsere Veranstaltungsorte und Dienstleistungen sind perfekt für Hochzeiten, Konferenzen und private Partys.",
      viewEvents: "Veranstaltungen Anzeigen",
    },
    contact: {
      title: "Kontaktieren Sie Uns",
      description: "Kontaktieren Sie unser Team für Anfragen oder spezielle Wünsche. Wir sind hier, um Ihren Aufenthalt perfekt zu gestalten.",
      sendEmail: "E-Mail Senden",
    },
    booking: {
      title: "Buchen Sie Ihren Aufenthalt",
      description: "Prüfen Sie die Verfügbarkeit und buchen Sie Ihre Suite direkt bei uns, um die besten Preise und exklusiven Angebote zu erhalten.",
      checkAvailability: "Verfügbarkeit Prüfen",
    },
    notFound: {
      title: "Seite Nicht Gefunden",
      description: "Die von Ihnen gesuchte Seite existiert nicht. Bitte überprüfen Sie die URL oder kehren Sie zur Startseite zurück.",
      returnHome: "Zurück zur Startseite",
    },
  },
  nl: {
    navbar: {
      home: "Home",
      suites: "Suites",
      amenities: "Voorzieningen",
      events: "Evenementen",
      contact: "Contact",
      booking: "Boek Nu",
    },
    footer: {
      company: "Bedrijf",
      about: "Over Ons",
      team: "Ons Team",
      careers: "Carrières",
      contact: "Contact",
      suites: "Suites",
      amenities: "Voorzieningen",
      events: "Evenementen",
      social: "Sociale Media",
      facebook: "Facebook",
      instagram: "Instagram",
      linkedin: "LinkedIn",
      newsletter: {
        title: "Abonneer u op onze Nieuwsbrief",
        description: "Blijf op de hoogte van ons laatste nieuws en speciale aanbiedingen.",
        emailPlaceholder: "Uw E-mailadres",
        subscribeButton: "Abonneer",
        successMessage: "Bedankt voor uw aanmelding!",
        errorMessage: "Voer een geldig e-mailadres in.",
      },
      copyright: "© 2024 Hotel de Milde Maerten. Alle rechten voorbehouden.",
    },
    home: {
      hero: {
        title: "Ervaar de Charme van Middelburg",
        subtitle: "Ontdek een unieke mix van historie en luxe in ons boetiekhotel in het hart van Zeeland.",
        cta: "Boek Uw Verblijf",
      },
      about: {
        title: "Een Boetiekhotel met een Verhaal",
        description: "Hotel de Milde Maerten, gelegen in het historische hart van Middelburg, biedt een unieke mix van klassieke charme en moderne luxe. Ons zorgvuldig gerestaureerde gebouw, daterend uit de 17e eeuw, biedt een intieme en elegante setting voor uw verblijf. Ontdek onze individueel ontworpen suites, geniet van gastronomisch dineren en ervaar de warme gastvrijheid die ons onderscheidt.",
      },
      suites: {
        title: "Onze Exclusieve Suites",
        description: "Verwen uzelf met het comfort en de stijl van onze individueel ontworpen suites. Elke kamer biedt een unieke ambiance, die historische charme combineert met moderne voorzieningen voor een onvergetelijk verblijf.",
        viewAll: "Bekijk Alle Suites",
      },
      amenities: {
        title: "Uitzonderlijke Voorzieningen",
        description: "Verbeter uw verblijf met onze uitzonderlijke voorzieningen, ontworpen om u het grootste comfort en gemak te bieden. Van onze gastronomische eetgelegenheden tot onze ontspannende spadiensten, we hebben alles wat u nodig heeft voor een onvergetelijke ervaring.",
        viewAll: "Verken Alle Voorzieningen",
      },
      events: {
        title: "Vier in Stijl",
        description: "Organiseer uw speciale evenement op onze unieke en elegante locaties. Of u nu een bruiloft, een zakelijk uitje of een familiefeest plant, ons toegewijde team zorgt voor een naadloze en onvergetelijke ervaring.",
        learnMore: "Meer Informatie",
      },
      contact: {
        title: "Neem Contact Op",
        description: "We horen graag van u! Neem contact met ons op voor vragen, reserveringen of speciale verzoeken. Ons vriendelijke team staat klaar om u te helpen met al uw behoeften.",
        contactUs: "Neem Contact Op",
      },
      reviews: {
        title: "Beoordelingen van gasten",
        description: "Lees wat onze gasten te zeggen hebben over hun ervaring bij Hotel de Milde Maerten",
        allReviews: "Alle beoordelingen"
      }
    },
    suites: {
      title: "Onze Suites",
      description: "Ontdek onze unieke suites, elk met een mix van comfort en stijl. Van gezellige kamers tot luxe appartementen, vind de perfecte accommodatie voor uw verblijf.",
      viewDetails: "Bekijk Details",
      book: "Boek Nu",
      amenities: "Suite Voorzieningen",
      policies: "Hotelbeleid",
      checkInOut: "In- & Uitchecken",
      checkInTime: "Inchecktijd",
      checkOutTime: "Uitchecktijd",
      cancellation: "Annuleringsbeleid",
      cancellationPolicy: "Gratis annulering tot 24 uur voor aankomst.",
      reviews: "Beoordelingen van gasten",
      guest: "gast",
      guests: "gasten"
    },
    amenities: {
      title: "Hotel Voorzieningen",
      description: "Ontdek het aanbod aan voorzieningen dat we bieden om uw verblijf aangenamer te maken. Van dineren tot ontspanning, we hebben voor elk wat wils.",
      learnMore: "Meer Informatie",
    },
    events: {
      title: "Evenementen & Vieringen",
      description: "Plan uw speciale evenement bij ons. Onze locaties en diensten zijn perfect voor bruiloften, conferenties en privéfeesten.",
      viewEvents: "Bekijk Evenementen",
    },
    contact: {
      title: "Neem Contact Met Ons Op",
      description: "Neem contact op met ons team voor vragen of speciale verzoeken. We zijn hier om uw verblijf perfect te maken.",
      sendEmail: "Stuur E-mail",
    },
    booking: {
      title: "Boek Uw Verblijf",
      description: "Controleer de beschikbaarheid en boek uw suite rechtstreeks bij ons voor de beste tarieven en exclusieve aanbiedingen.",
      checkAvailability: "Beschikbaarheid Controleren",
    },
    notFound: {
      title: "Pagina Niet Gevonden",
      description: "De pagina die u zoekt bestaat niet. Controleer de URL of keer terug naar de startpagina.",
      returnHome: "Terug naar Home",
    },
  },
};

export const getLocale = (locale: string) => {
  switch (locale) {
    case 'de':
      return de;
    case 'nl':
      return nl;
    default:
      return enUS;
  }
};

// Export each language object individually
export const en = translations.en;
export const de = translations.de;
export const nl = translations.nl;

// Default export for the whole translations object
export default translations;
