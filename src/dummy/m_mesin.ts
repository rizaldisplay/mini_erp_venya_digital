interface Mesin {
  id: number;
  code: string;
  name: string;
  category: string;
  maxWidth: number;
  unit: string;
  supportedMaterials: string[];
  maxResolution: number;
  speed: string;
  location: string;
  status: string;
}

const dummyMesin: Mesin[] = [
  {
    id: 1,
    code: "MS001",
    name: "Epson SureColor SC-S80670",
    category: "Outdoor Printer",
    maxWidth: 160,
    unit: "cm",
    supportedMaterials: [
      "Flexi China 280 gsm",
      "Flexi Korea 440 gsm",
      "Sticker Vinyl Glossy",
      "Sticker Vinyl Matte"
    ],
    maxResolution: 1440,
    speed: "95 m²/jam",
    location: "Produksi A",
    status: "ACTIVE"
  },
  {
    id: 2,
    code: "MS002",
    name: "Epson SureColor SC-P9530",
    category: "Indoor Printer",
    maxWidth: 111,
    unit: "cm",
    supportedMaterials: [
      "Photo Paper Glossy",
      "Canvas Printing",
      "Albatros"
    ],
    maxResolution: 2400,
    speed: "18 m²/jam",
    location: "Produksi A",
    status: "ACTIVE"
  },
  {
    id: 3,
    code: "MS003",
    name: "Mimaki JV300-160",
    category: "Outdoor Printer",
    maxWidth: 160,
    unit: "cm",
    supportedMaterials: [
      "Flexi China 280 gsm",
      "Flexi Korea 440 gsm",
      "Sticker Vinyl Glossy"
    ],
    maxResolution: 1440,
    speed: "60 m²/jam",
    location: "Produksi B",
    status: "ACTIVE"
  },
  {
    id: 4,
    code: "MS004",
    name: "Roland VersaCAMM VG2-640",
    category: "Outdoor Printer",
    maxWidth: 160,
    unit: "cm",
    supportedMaterials: [
      "Sticker Vinyl Matte",
      "One Way Vision"
    ],
    maxResolution: 1200,
    speed: "40 m²/jam",
    location: "Produksi B",
    status: "MAINTENANCE"
  },
  {
    id: 5,
    code: "MS005",
    name: "Canon imagePRESS C265",
    category: "Digital Printing",
    maxWidth: 32,
    unit: "cm",
    supportedMaterials: [
      "Art Paper 150 gsm",
      "Art Carton 260 gsm",
      "HVS 80 gsm",
      "Ivory 310 gsm"
    ],
    maxResolution: 2400,
    speed: "65 ppm",
    location: "Digital Print",
    status: "ACTIVE"
  },
  {
    id: 6,
    code: "MS006",
    name: "Graphtec CE7000",
    category: "Cutting Plotter",
    maxWidth: 60,
    unit: "cm",
    supportedMaterials: [
      "Sticker Vinyl Glossy",
      "Sticker Vinyl Matte",
      "Clear Sticker"
    ],
    maxResolution: 0,
    speed: "1000 mm/s",
    location: "Finishing",
    status: "ACTIVE"
  }
]

export default dummyMesin;