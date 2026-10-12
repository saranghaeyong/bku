export interface CharacterSpec {
  label: string;
  value: string;
}

export interface CharacterItem {
  id: string;
  name: string;
  unit: string;
  archiveId: string;
  scale: string;
  available: boolean;
  modelUrl: string | null;
  cardArt: string | null;
  thumbnail: string | null;
  sheetImage: string | null;
  views: {
    front: string;
    side: string;
    back: string;
  } | null;
  specs: CharacterSpec[];
  attireDetails: {
    upper: string;
    lower: string;
    hairBeard: string;
    footwear: string;
    accessories: string[];
  } | null;
  tags: string[];
  statusLabel: string;
}

export const CHARACTERS: CharacterItem[] = [
  {
    id: 'justin',
    name: 'JUSTIN',
    unit: 'BETHLEHEM KUDUMBA UNIT',
    archiveId: 'BKU-CH-001',
    scale: '1/12 Collectible Figurine',
    available: true,
    modelUrl: '/models/justin.glb',
    cardArt: '/images/justin/justin-card.jpg',
    thumbnail: '/images/justin/justin-front.jpg',
    sheetImage: '/images/justin/justin-sheet.jpg',
    views: {
      front: '/images/justin/justin-front.jpg',
      side: '/images/justin/justin-side.jpg',
      back: '/images/justin/justin-back.jpg',
    },
    specs: [
      { label: 'ARCHIVE ID', value: 'BKU-CH-001' },
      { label: 'NAME', value: 'JUSTIN' },
      { label: 'UNIT', value: 'BETHLEHEM KUDUMBA UNIT' },
      { label: 'FIGURE SCALE', value: '1/12 Collectible Prototype' },
      { label: 'AVAILABILITY', value: 'Available in Archive' },
      { label: 'ATTIRE STYLE', value: 'Tailored Maroon Shirt with Traditional Kasavu Dhoti' },
      { label: 'HAIR & BEARD', value: 'Groomed Black Hair, Full Trimmed Beard & Mustache' },
      { label: 'FOOTWEAR', value: 'Dual-Strap Handcrafted Leather Sandals' },
    ],
    attireDetails: {
      upper: 'Deep Maroon Collared Casual Half-Sleeve Shirt with Buttoned Placket',
      lower: 'Traditional Off-White Dhoti (Mundu) with Golden Kasavu Border Trim',
      hairBeard: 'Modern Groomed Dark Hair with Trimmed Full Beard',
      footwear: 'Crossed-Strap Heritage Brown Leather Sandals',
      accessories: ['Minimal Wrist Accent', 'Pedestal Base', 'Articulation Joint Specs'],
    },
    tags: ['Bethlehem Kudumba Unit', 'Action Figure Prototype', 'Active Record'],
    statusLabel: 'AVAILABLE',
  },
  {
    id: 'ashley',
    name: 'ASHLEY',
    unit: 'BETHLEHEM KUDUMBA UNIT',
    archiveId: 'BKU-CH-002',
    scale: '1/12 Collectible Figurine',
    available: false,
    modelUrl: null,
    cardArt: null,
    thumbnail: null,
    sheetImage: null,
    views: null,
    specs: [
      { label: 'ARCHIVE ID', value: 'BKU-CH-002' },
      { label: 'NAME', value: 'ASHLEY' },
      { label: 'UNIT', value: 'BETHLEHEM KUDUMBA UNIT' },
      { label: 'STATUS', value: 'Coming Soon / In Preparation' },
      { label: 'ARCHIVE STAGE', value: 'Future Release' },
    ],
    attireDetails: null,
    tags: ['Bethlehem Kudumba Unit', 'Future Character', 'Archive Entry Reserved'],
    statusLabel: 'COMING SOON',
  },
];

export function getCharacterById(id: string): CharacterItem | undefined {
  return CHARACTERS.find((char) => char.id === id);
}
