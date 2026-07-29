interface Produk {
  id: number;
  code: string;
  name: string;
  category: string;
  formulaCode: string;
  unitCode: string;
  bleed: number,
  estimatedProduction: string;
  status: string;
}

const dummyProduk: Produk[] = [
  {
    id: 1,
    code: "PR001",
    name: "Banner Flexi",
    category: "Outdoor",
    formulaCode: "FM001",
    unitCode: "ST006",
    bleed: 5,
    estimatedProduction: "1 Hari",
    status: "ACTIVE"
  },
  {
    id: 2,
    code: "PR002",
    name: "Banner Albatros",
    category: "Indoor",
    formulaCode: "FM001",
    unitCode: "ST006",
    bleed: 5,
    estimatedProduction: "1 Hari",
    status: "ACTIVE"
  },
  {
    id: 3,
    code: "PR003",
    name: "Sticker Vinyl Glossy",
    category: "Sticker",
    formulaCode: "FM005",
    unitCode: "ST006",
    bleed: 3,
    estimatedProduction: "2 Hari",
    status: "ACTIVE"
  },
  {
    id: 4,
    code: "PR004",
    name: "Sticker Vinyl Matte",
    category: "Sticker",
    formulaCode: "FM005",
    unitCode: "ST006",
    bleed: 3,
    estimatedProduction: "2 Hari",
    status: "ACTIVE"
  },
  {
    id: 5,
    code: "PR005",
    name: "One Way Vision",
    category: "Sticker",
    formulaCode: "FM001",
    unitCode: "ST006",
    bleed: 3,
    estimatedProduction: "2 Hari",
    status: "ACTIVE"
  },
  {
    id: 6,
    code: "PR006",
    name: "Brosur A4",
    category: "Offset",
    formulaCode: "FM004",
    unitCode: "ST002",
    bleed: 2,
    estimatedProduction: "2 Hari",
    status: "ACTIVE"
  },
  {
    id: 7,
    code: "PR007",
    name: "Flyer A5",
    category: "Offset",
    formulaCode: "FM004",
    unitCode: "ST002",
    bleed: 2,
    estimatedProduction: "2 Hari",
    status: "ACTIVE"
  },
  {
    id: 8,
    code: "PR008",
    name: "Poster A3",
    category: "Digital Printing",
    formulaCode: "FM004",
    unitCode: "ST002",
    bleed: 2,
    estimatedProduction: "1 Hari",
    status: "ACTIVE"
  },
  {
    id: 9,
    code: "PR009",
    name: "X Banner",
    category: "Display",
    formulaCode: "FM003",
    unitCode: "ST001",
    bleed: 5,
    estimatedProduction: "2 Hari",
    status: "ACTIVE"
  },
  {
    id: 10,
    code: "PR010",
    name: "Roll Up Banner",
    category: "Display",
    formulaCode: "FM003",
    unitCode: "ST001",
    bleed: 5,
    estimatedProduction: "2 Hari",
    status: "ACTIVE"
  },
  {
    id: 11,
    code: "PR011",
    name: "ID Card PVC",
    category: "PVC",
    formulaCode: "FM003",
    unitCode: "ST001",
    bleed: 0,
    estimatedProduction: "3 Hari",
    status: "ACTIVE"
  },
  {
    id: 12,
    code: "PR012",
    name: "Name Tag Acrylic",
    category: "Acrylic",
    formulaCode: "FM003",
    unitCode: "ST001",
    bleed: 0,
    estimatedProduction: "3 Hari",
    status: "ACTIVE"
  }
];

export default dummyProduk;