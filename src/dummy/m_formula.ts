interface Formula {
  id: number;
  code: string;
  name: string;
  formula: string;
  description: string;
}

const dummyFormulas: Formula[] = [
  {
    id: 1,
    code: "FM001",
    name: "Per Meter Persegi",
    formula: "area * price",
    description: "Harga berdasarkan luas (m²)"
  },
  {
    id: 2,
    code: "FM002",
    name: "Per Meter",
    formula: "length * price",
    description: "Harga berdasarkan meter"
  },
  {
    id: 3,
    code: "FM003",
    name: "Per PCS",
    formula: "qty * price",
    description: "Harga berdasarkan jumlah"
  },
  {
    id: 4,
    code: "FM004",
    name: "Per Lembar",
    formula: "qty * price",
    description: "Harga berdasarkan lembar"
  },
  {
    id: 5,
    code: "FM005",
    name: "Luas x Qty",
    formula: "area * qty * price",
    description: "Sticker atau label"
  },
  {
    id: 6,
    code: "FM006",
    name: "Luas + Finishing",
    formula: "(area * price) + finishing",
    description: "Banner dengan finishing"
  }
];

export default dummyFormulas;