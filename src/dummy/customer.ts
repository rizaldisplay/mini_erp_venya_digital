interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  visit_count: number;
  total_purchases: number;
  discount: number;
}

const dummyCustomers: Customer[] = [
  {
    id: 1,
    name: "Budi Santoso",
    phone: "081234567890",
    email: "budi@gmail.com",
    address: "Malang",
    visit_count: 12,
    total_purchases: 8250000,
    discount: 5000
  },
  {
    id: 2,
    name: "Siti Aminah",
    phone: "081345678901",
    email: "siti@gmail.com",
    address: "Surabaya",
    visit_count: 8,
    total_purchases: 4350000,
    discount: 0,
  },
  {
    id: 3,
    name: "Andi Pratama",
    phone: "081456789012",
    email: "andi@gmail.com",
    address: "Pasuruan",
    visit_count: 15,
    total_purchases: 12450000,
    discount: 5000,
  },
  {
    id: 4,
    name: "Dewi Lestari",
    phone: "081567890123",
    email: "dewi@gmail.com",
    address: "Blitar",
    visit_count: 4,
    total_purchases: 980000,
    discount: 0,
  },
  {
    id: 5,
    name: "Rizky Hidayat",
    phone: "081678901234",
    email: "rizky@gmail.com",
    address: "Kediri",
    visit_count: 20,
    total_purchases: 17800000,
    discount: 10000
  },
];

export default dummyCustomers;