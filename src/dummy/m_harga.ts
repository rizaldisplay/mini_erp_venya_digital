interface Harga {
  id: number;
  code: string;
  product: string;
  material: string;
  formula: string;
  price: number;
  minimumCharge: number;
  unit: string;
}

const dummyHarga: Harga[] = [
  {
    id: 1,
    code: "HG001",
    product: "Banner Indoor",
    material: "Flexi China 280 gsm",
    formula: "FM001",
    price: 20000,
    minimumCharge: 10000,
    unit: "m²"
  },
  {
    id: 2,
    code: "HG002",
    product: "Banner Outdoor",
    material: "Flexi Korea 440 gsm",
    formula: "FM001",
    price: 25000,
    minimumCharge: 10000,
    unit: "m²"
  },
  {
    id: 3,
    code: "HG003",
    product: "Sticker Vinyl",
    material: "Sticker Vinyl Glossy",
    formula: "FM005",
    price: 35000,
    minimumCharge: 15000,
    unit: "m²"
  },
  {
    id: 4,
    code: "HG004",
    product: "Brosur A4",
    material: "Art Paper 150 gsm",
    formula: "FM004",
    price: 500,
    minimumCharge: 50000,
    unit: "Lembar"
  },
  {
    id: 5,
    code: "HG005",
    product: "ID Card PVC",
    material: "PVC",
    formula: "FM003",
    price: 3500,
    minimumCharge: 3500,
    unit: "PCS"
  },
  {
    id: 6,
    code: "HG006",
    product: "X Banner",
    material: "Albatros",
    formula: "FM001",
    price: 45000,
    minimumCharge: 25000,
    unit: "m²"
  }
];

export default dummyHarga;