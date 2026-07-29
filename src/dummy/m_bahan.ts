interface Bahan {
  id: number;
  code: string;
  name: string;
  category: string;
  type: string;
  width: number;
  length: number;
  unit: string;
  purchasePrice: number;
  minimumStock: number;
  currentStock: number;
  supplier: string;
  status: string;
}

const dummyBahan: Bahan[] = [
  {
    id: 1,
    code: "BH001",
    name: "Flexi China 280 gsm",
    category: "Banner",
    type: "Roll",
    width: 1.6,
    length: 50,
    unit: "Roll",
    purchasePrice: 450000,
    minimumStock: 2,
    currentStock: 8,
    supplier: "PT Sinar Media",
    status: "ACTIVE"
  },
  {
    id: 2,
    code: "BH002",
    name: "Flexi Korea 440 gsm",
    category: "Banner",
    type: "Roll",
    width: 3.2,
    length: 50,
    unit: "Roll",
    purchasePrice: 1450000,
    minimumStock: 2,
    currentStock: 4,
    supplier: "PT Sinar Media",
    status: "ACTIVE"
  },
  {
    id: 3,
    code: "BH006",
    name: "Sticker Vinyl Glossy",
    category: "Sticker",
    type: "Roll",
    width: 1.07,
    length: 50,
    unit: "Roll",
    purchasePrice: 950000,
    minimumStock: 2,
    currentStock: 5,
    supplier: "PT Sticker Indonesia",
    status: "ACTIVE"
  },
  {
    id: 4,
    code: "BH010",
    name: "Art Paper 150 gsm",
    category: "Offset",
    type: "Rim",
    width: 31,
    length: 43,
    unit: "Rim",
    purchasePrice: 185000,
    minimumStock: 3,
    currentStock: 10,
    supplier: "UD Kertas Jaya",
    status: "ACTIVE"
  },
  {
    id: 5,
    code: "BH014",
    name: "Acrylic 3 mm",
    category: "Display",
    type: "Lembar",
    width: 122,
    length: 244,
    unit: "Lembar",
    purchasePrice: 550000,
    minimumStock: 5,
    currentStock: 12,
    supplier: "PT Acrylic Nusantara",
    status: "ACTIVE"
  }
];

export default dummyBahan;