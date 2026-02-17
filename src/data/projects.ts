import project1a from "@/assets/project-1a.jpg";
import project1b from "@/assets/project-1b.jpg";
import project1c from "@/assets/project-1c.jpg";
import project2a from "@/assets/project-2a.jpg";
import project2b from "@/assets/project-2b.jpg";
import project2c from "@/assets/project-2c.jpg";
import project3a from "@/assets/project-3a.jpg";
import project3b from "@/assets/project-3b.jpg";

export interface Project {
  id: string;
  name: string;
  location: string;
  status: "Completed" | "Ongoing" | "Upcoming";
  year: string;
  type: string;
  area: string;
  units: number;
  description: string;
  features: string[];
  images: string[];
  specifications: Record<string, string>;
  amenities: string[];
  neighborhood: string[];
}

export const locations = [
  "All",
  "Salt Lake",
  "New Town",
  "Rajarhat",
  "Ballygunge",
  "Howrah",
  "Alipore",
  "Dum Dum",
  "Behala",
];

export const projects: Project[] = [
  {
    id: "aranya-residences",
    name: "Aranya Residences",
    location: "New Town",
    status: "Completed",
    year: "2019 – 2023",
    type: "Luxury Apartments",
    area: "2,50,000 sq ft",
    units: 120,
    description:
      "A premium residential complex featuring modern architecture with lush green surroundings. Aranya Residences redefines urban living with spacious 3 & 4 BHK apartments, world-class amenities, and sustainable design principles.",
    features: [
      "Rooftop infinity pool",
      "Landscaped gardens",
      "Smart home automation",
      "24/7 concierge service",
      "EV charging stations",
      "Indoor sports complex",
    ],
    specifications: {
      "Structure": "RCC framed earthquake-resistant",
      "Flooring": "Italian marble in living areas, vitrified tiles in bedrooms",
      "Kitchen": "Modular kitchen with granite countertop",
      "Bathrooms": "Premium CP fittings, anti-skid tiles",
      "Doors": "Teak wood main door, flush doors internally",
      "Windows": "UPVC double-glazed windows",
      "Electrical": "Concealed copper wiring, modular switches",
      "Ceiling Height": "10 ft floor-to-floor",
    },
    amenities: [
      "Swimming pool", "Gymnasium", "Clubhouse", "Children's play area",
      "Jogging track", "Indoor badminton court", "Yoga room", "Party hall",
      "Library", "Landscaped garden", "Senior citizen corner", "Multipurpose court",
    ],
    neighborhood: [
      "5 min to City Centre 2 Mall",
      "10 min to Netaji Subhas Chandra Bose International Airport",
      "Near DPS & Delhi Public School",
      "Adjacent to Eco Park",
      "Close to Tata Medical Centre",
      "Well-connected via Major Arterial Road",
    ],
    images: [project1a, project1b, project1c, project2a, project3a, project2b, project3b, project1c, project2c, project1a, project3a, project2a],
  },
  {
    id: "skyline-tower",
    name: "Skyline Tower",
    location: "Salt Lake",
    status: "Ongoing",
    year: "2022 – Present",
    type: "Commercial & Residential",
    area: "4,80,000 sq ft",
    units: 200,
    description:
      "A landmark 35-storey mixed-use tower in the heart of Salt Lake. Skyline Tower combines premium office spaces with luxury penthouses, featuring a striking glass facade and cutting-edge structural engineering.",
    features: [
      "Sky lounge on 30th floor",
      "Grade-A office spaces",
      "Helipad",
      "Earthquake-resistant design",
      "Rainwater harvesting",
      "Multi-level parking",
    ],
    specifications: {
      "Structure": "Steel-reinforced RCC with shear walls",
      "Facade": "Double-skin curtain wall glazing",
      "Flooring": "Imported marble lobby, wooden flooring in residences",
      "Elevators": "8 high-speed elevators by KONE",
      "HVAC": "VRV central air conditioning",
      "Fire Safety": "Automated sprinkler & alarm system",
      "Power Backup": "100% DG backup for common areas",
      "Parking": "3-level automated car parking",
    },
    amenities: [
      "Business centre", "Conference halls", "Sky lounge", "Gymnasium",
      "Swimming pool", "Cafeteria", "Retail arcade", "ATM booth",
      "Visitor lounge", "Landscaped terrace", "Concierge desk", "EV charging",
    ],
    neighborhood: [
      "Within Salt Lake Sector V IT Hub",
      "2 min from Karunamoyee Metro Station",
      "Near Nicco Park & Science City",
      "Close to major hospitals",
      "Adjacent to Central Mall",
      "Excellent bus & metro connectivity",
    ],
    images: [project2a, project2b, project2c, project1a, project1b, project3a, project3b, project1c, project2a, project2b],
  },
  {
    id: "green-haven-villas",
    name: "Green Haven Villas",
    location: "Rajarhat",
    status: "Completed",
    year: "2020 – 2024",
    type: "Independent Villas",
    area: "3,00,000 sq ft",
    units: 45,
    description:
      "An exclusive gated community of contemporary villas surrounded by nature. Each villa is crafted with premium materials, private gardens, and thoughtful spatial planning for the discerning homeowner.",
    features: [
      "Private swimming pools",
      "Home theatre rooms",
      "Solar-powered",
      "Organic community garden",
      "Clubhouse & spa",
      "Pet-friendly trails",
    ],
    specifications: {
      "Plot Size": "2400–4800 sq ft",
      "Built-up Area": "2800–5500 sq ft",
      "Structure": "Load-bearing masonry with RCC",
      "Flooring": "Hardwood in living, ceramic in wet areas",
      "Roofing": "Insulated flat roof with terrace garden provision",
      "Garden": "Private landscaped garden per villa",
      "Water": "Borewell + municipal, with filtration",
      "Security": "Video door phone, perimeter CCTV",
    },
    amenities: [
      "Clubhouse", "Spa & sauna", "Tennis court", "Community garden",
      "Walking trails", "Cycling path", "Open-air theatre", "Mini golf",
      "Pet park", "Children's adventure zone", "Reading pavilion", "BBQ area",
    ],
    neighborhood: [
      "Near Rajarhat Township",
      "15 min to Airport",
      "Close to multiple international schools",
      "Near upcoming metro corridor",
      "Surrounded by greenery & water bodies",
      "Growing commercial hub nearby",
    ],
    images: [project3a, project3b, project1c, project2a, project1a, project2c, project1b, project3a, project2b],
  },
  {
    id: "heritage-square",
    name: "Heritage Square",
    location: "Ballygunge",
    status: "Upcoming",
    year: "2025 – 2028",
    type: "Heritage Restoration & Luxury Condos",
    area: "1,80,000 sq ft",
    units: 60,
    description:
      "A sensitive restoration of a colonial-era property transformed into exclusive luxury condominiums. Heritage Square blends old-world charm with modern comforts in one of Kolkata's most prestigious neighbourhoods.",
    features: [
      "Heritage facade preservation",
      "Italian marble flooring",
      "Private wine cellars",
      "Art gallery space",
      "Valet parking",
      "Cigar lounge",
    ],
    specifications: {
      "Architecture": "Colonial revival with modern interiors",
      "Flooring": "Italian Statuario marble throughout",
      "Ceiling": "12 ft with ornamental cornices",
      "Doors": "Burmese teak carved doors",
      "Windows": "Plantation-style shuttered windows",
      "Bathrooms": "Imported European sanitaryware",
      "Kitchen": "European modular kitchen with island",
      "Smart Home": "Full home automation by Crestron",
    },
    amenities: [
      "Art gallery", "Wine cellar", "Cigar lounge", "Library",
      "Concierge", "Valet parking", "Rooftop garden", "Private dining",
      "Guest suites", "Business lounge", "Wellness centre", "Salon",
    ],
    neighborhood: [
      "In the heart of Ballygunge",
      "Walking distance to South City Mall",
      "Near Birla Academy of Art & Culture",
      "Close to AMRI & Woodlands hospitals",
      "Adjacent to Gariahat market",
      "Excellent road & metro connectivity",
    ],
    images: [project1b, project3a, project2b, project1a, project2c, project3b, project1c, project2a],
  },
  {
    id: "riverside-heights",
    name: "Riverside Heights",
    location: "Howrah",
    status: "Ongoing",
    year: "2023 – Present",
    type: "Waterfront Apartments",
    area: "3,50,000 sq ft",
    units: 150,
    description:
      "Premium waterfront living along the Hooghly River. Riverside Heights offers stunning river views from every apartment, with a riverside promenade and world-class recreational facilities.",
    features: [
      "River-facing balconies",
      "Jogging & cycling track",
      "Yoga deck by the river",
      "Children's play zone",
      "Amphitheatre",
      "Guest suites",
    ],
    specifications: {
      "Structure": "RCC framed with pile foundation",
      "Flooring": "Vitrified tiles in all rooms",
      "Balcony": "Anti-corrosion glass railing",
      "Plumbing": "CPVC piping, solar water heating",
      "Elevators": "4 automatic elevators per tower",
      "Painting": "Exterior texture, interior emulsion",
      "Power": "100% power backup",
      "Sewage": "In-house STP plant",
    },
    amenities: [
      "Riverside promenade", "Amphitheatre", "Swimming pool", "Gymnasium",
      "Yoga deck", "Cycling track", "Children's play zone", "Guest suites",
      "Community hall", "Indoor games", "Meditation garden", "Open lawn",
    ],
    neighborhood: [
      "On the banks of Hooghly River",
      "5 min to Howrah Station",
      "Near Botanical Garden",
      "Connected via Vidyasagar Setu",
      "Close to Howrah Maidan",
      "Growing infrastructure corridor",
    ],
    images: [project2a, project1a, project3b, project2c, project1b, project3a, project2b, project1c],
  },
  {
    id: "royal-greens",
    name: "Royal Greens",
    location: "Alipore",
    status: "Completed",
    year: "2018 – 2022",
    type: "Ultra-Luxury Residences",
    area: "2,00,000 sq ft",
    units: 32,
    description:
      "An ultra-exclusive address in Alipore featuring just 32 sprawling residences. Royal Greens is designed for those who accept nothing less than perfection, with bespoke interiors and unmatched privacy.",
    features: [
      "Private elevators",
      "Butler service",
      "Temperature-controlled wine room",
      "Rooftop observatory",
      "Zen garden",
      "Concierge desk",
    ],
    specifications: {
      "Type": "4 & 5 BHK ultra-luxury",
      "Size": "3500–6000 sq ft per unit",
      "Flooring": "Book-matched Italian marble",
      "Fittings": "Grohe & Duravit bathware",
      "Kitchen": "Poggenpohl modular kitchen",
      "AC": "Daikin VRV central AC",
      "Elevators": "Private lift per residence",
      "Security": "Multi-tier with biometric access",
    },
    amenities: [
      "Rooftop observatory", "Zen garden", "Temperature-controlled pool",
      "Wine tasting room", "Private theatre", "Billiards room",
      "Steam & sauna", "Business centre", "Banquet hall", "Helipad",
      "Concierge", "Butler service",
    ],
    neighborhood: [
      "In prestigious Alipore locality",
      "Near Alipore Zoo & Horticultural Gardens",
      "Close to SSKM Hospital",
      "Adjacent to National Library",
      "Near Kolkata Racecourse",
      "Premium south Kolkata address",
    ],
    images: [project1c, project1b, project2b, project3a, project2a, project3b, project1a, project2c],
  },
];
