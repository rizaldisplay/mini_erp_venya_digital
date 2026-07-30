import {
  Package,
  Boxes,
  Tags,
  SquarePi,
  DollarSign,
  ShoppingBag,
  Printer,
} from "lucide-react";

const ListMaster = [
  {
    id: 1,
    title: "Master Produk",
    description: "Kelola data produk",
    icon: ShoppingBag,
    path: "/master/produk",
  },
  {
    id: 2,
    title: "Master Kategori",
    description: "Kelola kategori barang",
    icon: Tags,
    path: "/master/kategori",
  },
  {
    id: 3,
    title: "Master Bahan",
    description: "Kelola data bahan",
    icon: Package,
    path: "/master/bahan",
  },
  {
    id: 4,
    title: "Master Harga",
    description: "Kelola data Harga Produk",
    icon: DollarSign,
    path: "/master/harga",
  },
  {
    id: 5,
    title: "Master Formula",
    description: "Kelola data Formula Hitung",
    icon: SquarePi,
    path: "/master/formula",
  },
  {
    id: 6,
    title: "Master Satuan",
    description: "Kelola satuan barang",
    icon: Boxes,
    path: "/master/satuan",
  },
   {
    id: 7,
    title: "Master Mesin",
    description: "Kelola satuan mesin",
    icon: Printer,
    path: "/master/mesin",
  },
];

export default ListMaster;