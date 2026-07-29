interface Kategori {
  id: number;
  code: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  status: string;
}

const dummyKategori: Kategori[] = [
  {
    id: 1,
    code: "KT001",
    name: "Banner",
    description: "Produk banner indoor dan outdoor",
    icon: "Image",
    color: "blue",
    status: "ACTIVE"
  },
  {
    id: 2,
    code: "KT002",
    name: "Sticker",
    description: "Produk sticker dan label",
    icon: "Tag",
    color: "green",
    status: "ACTIVE"
  },
  {
    id: 3,
    code: "KT003",
    name: "Digital Printing",
    description: "Produk cetak digital",
    icon: "Printer",
    color: "purple",
    status: "ACTIVE"
  },
  {
    id: 4,
    code: "KT004",
    name: "Offset Printing",
    description: "Produk cetak offset",
    icon: "FileText",
    color: "orange",
    status: "ACTIVE"
  },
  {
    id: 5,
    code: "KT005",
    name: "Display Promotion",
    description: "Produk display promosi",
    icon: "Layout",
    color: "pink",
    status: "ACTIVE"
  },
  {
    id: 6,
    code: "KT006",
    name: "Acrylic",
    description: "Produk berbahan acrylic",
    icon: "Square",
    color: "cyan",
    status: "ACTIVE"
  },
  {
    id: 7,
    code: "KT007",
    name: "Advertising",
    description: "Produk media promosi",
    icon: "Megaphone",
    color: "red",
    status: "ACTIVE"
  },
  {
    id: 8,
    code: "KT008",
    name: "Merchandise",
    description: "Produk souvenir dan merchandise",
    icon: "Gift",
    color: "yellow",
    status: "ACTIVE"
  },
  {
    id: 9,
    code: "KT009",
    name: "Packaging",
    description: "Produk kemasan",
    icon: "Package",
    color: "indigo",
    status: "ACTIVE"
  },
  {
    id: 10,
    code: "KT010",
    name: "Finishing",
    description: "Layanan finishing cetak",
    icon: "Scissors",
    color: "gray",
    status: "ACTIVE"
  }
];

export default dummyKategori;