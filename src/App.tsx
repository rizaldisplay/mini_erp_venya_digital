import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "../src/components/ui/toaster";
import { TooltipProvider } from "../src/components/ui/tooltip";
import { AppLayout } from "../src/components/layout/app-layout";

import Dashboard from "../src/pages/dashboard";
import Masterdata from "../src/pages/masterdata/page";
import Laporan from "../src/pages/laporan";
import Member from "../src/pages/member";
import Penjualan from "./pages/upload";
import Produk from "./pages/masterdata/produk/page";
import Bahan from "./pages/masterdata/bahan/page";
import Formula from "./pages/masterdata/formula/page";
import Harga from "./pages/masterdata/harga/page";
import Kategori from "./pages/masterdata/kategori/page";
import Mesin from "./pages/masterdata/mesin/page";
import Satuan from "./pages/masterdata/satuan/page";
// import Print from "@/pages/upload";
// import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/masterdata" element={<Masterdata />} />
              <Route path="/laporan" element={<Laporan />} />
              <Route path="/member" element={<Member />} />
              <Route path="/penjualan" element={<Penjualan />} />

              {/* masterdata */}
              <Route path="/master/produk" element={<Produk />} />
              <Route path="/master/bahan" element={<Bahan />} />
              <Route path="/master/formula" element={<Formula />} />
              <Route path="/master/harga" element={<Harga />} />
              <Route path="/master/kategori" element={<Kategori />} />
              <Route path="/master/mesin" element={<Mesin />} />
              <Route path="/master/satuan" element={<Satuan />} />

              {/* 404 */}
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </AppLayout>

          <Toaster />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;