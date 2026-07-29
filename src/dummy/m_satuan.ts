interface Satuan {
  id: number;
  code: string;
  name: string;
  symbol: string;
  category: string;
  isConvertible: boolean;
  status: string;
}

const dummySatuan: Satuan[] = [
  {
    id: 1,
    code: "ST001",
    name: "Piece",
    symbol: "pcs",
    category: "Quantity",
    isConvertible: false,
    status: "ACTIVE"
  },
  {
    id: 2,
    code: "ST002",
    name: "Lembar",
    symbol: "lbr",
    category: "Quantity",
    isConvertible: false,
    status: "ACTIVE"
  },
  {
    id: 3,
    code: "ST003",
    name: "Rim",
    symbol: "rim",
    category: "Quantity",
    isConvertible: true,
    status: "ACTIVE"
  },
  {
    id: 4,
    code: "ST004",
    name: "Roll",
    symbol: "roll",
    category: "Quantity",
    isConvertible: false,
    status: "ACTIVE"
  },
  {
    id: 5,
    code: "ST005",
    name: "Meter",
    symbol: "m",
    category: "Length",
    isConvertible: true,
    status: "ACTIVE"
  },
  {
    id: 6,
    code: "ST006",
    name: "Meter Persegi",
    symbol: "m²",
    category: "Area",
    isConvertible: true,
    status: "ACTIVE"
  },
  {
    id: 7,
    code: "ST007",
    name: "Centimeter",
    symbol: "cm",
    category: "Length",
    isConvertible: true,
    status: "ACTIVE"
  },
  {
    id: 8,
    code: "ST008",
    name: "Milimeter",
    symbol: "mm",
    category: "Length",
    isConvertible: true,
    status: "ACTIVE"
  },
  {
    id: 9,
    code: "ST009",
    name: "Inch",
    symbol: "in",
    category: "Length",
    isConvertible: true,
    status: "ACTIVE"
  },
  {
    id: 10,
    code: "ST010",
    name: "Kilogram",
    symbol: "kg",
    category: "Weight",
    isConvertible: true,
    status: "ACTIVE"
  },
  {
    id: 11,
    code: "ST011",
    name: "Gram",
    symbol: "gr",
    category: "Weight",
    isConvertible: true,
    status: "ACTIVE"
  },
  {
    id: 12,
    code: "ST012",
    name: "Liter",
    symbol: "L",
    category: "Volume",
    isConvertible: true,
    status: "ACTIVE"
  },
  {
    id: 13,
    code: "ST013",
    name: "Mililiter",
    symbol: "ml",
    category: "Volume",
    isConvertible: true,
    status: "ACTIVE"
  },
  {
    id: 14,
    code: "ST014",
    name: "Set",
    symbol: "set",
    category: "Quantity",
    isConvertible: false,
    status: "ACTIVE"
  },
  {
    id: 15,
    code: "ST015",
    name: "Box",
    symbol: "box",
    category: "Quantity",
    isConvertible: false,
    status: "ACTIVE"
  }
];

export default dummySatuan;