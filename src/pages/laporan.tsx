import { useState } from "react";
import { Topbar } from "../components/layout/topbar";
import { formatRupiah, formatDateTime } from "../lib/utils";
import { Download } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

// Type & Dummy Data Hook
interface Transaction {
  id: number;
  created_at: string;
  customer_name?: string;
  payment_method: string;
  total_amount: number;
}

const DUMMY_TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    created_at: "2026-07-23T14:32:00Z",
    customer_name: "Budi Santoso",
    payment_method: "QRIS",
    total_amount: 150000,
  },
  {
    id: 2,
    created_at: "2026-07-23T12:15:00Z",
    customer_name: undefined,
    payment_method: "Tunai",
    total_amount: 45000,
  },
  {
    id: 3,
    created_at: "2026-07-22T18:45:00Z",
    customer_name: "Siti Rahma",
    payment_method: "Transfer",
    total_amount: 320000,
  },
  {
    id: 4,
    created_at: "2026-07-21T09:10:00Z",
    customer_name: "Andi Wijaya",
    payment_method: "QRIS",
    total_amount: 85000,
  },
  {
    id: 5,
    created_at: "2026-07-20T16:20:00Z",
    customer_name: undefined,
    payment_method: "Kartu Kredit",
    total_amount: 500000,
  },
];

function useListTransactions(filters?: { date_from?: string; date_to?: string }) {
  let filteredData = DUMMY_TRANSACTIONS;

  if (filters?.date_from) {
    filteredData = filteredData.filter(
      (t) => new Date(t.created_at) >= new Date(filters.date_from!)
    );
  }

  if (filters?.date_to) {
    filteredData = filteredData.filter(
      (t) => new Date(t.created_at) <= new Date(`${filters.date_to}T23:59:59Z`)
    );
  }

  return { data: filteredData };
}

export default function Laporan() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const { data: transactions } = useListTransactions({
    date_from: dateFrom || undefined,
    date_to: dateTo || undefined,
  });

  const totalOmzet = transactions?.reduce((sum, t) => sum + t.total_amount, 0) || 0;
  const totalTransaksi = transactions?.length || 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Laporan Transaksi" />

      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="bg-card border border-border p-4 rounded-xl shadow-sm flex flex-wrap gap-4 items-end">
            <div className="space-y-1.5 flex-1 min-w-[200px]">
              <label className="text-sm font-medium">Dari Tanggal</label>
              <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            </div>
            <div className="space-y-1.5 flex-1 min-w-[200px]">
              <label className="text-sm font-medium">Sampai Tanggal</label>
              <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" /> Unduh CSV
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-primary text-primary-foreground p-6 rounded-2xl shadow-sm">
              <p className="text-primary-foreground/80 font-medium mb-2">Total Omzet</p>
              <h2 className="text-4xl font-bold">{formatRupiah(totalOmzet)}</h2>
            </div>
            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
              <p className="text-muted-foreground font-medium mb-2">Total Transaksi</p>
              <h2 className="text-4xl font-bold">{totalTransaksi}</h2>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-bold text-lg">Riwayat Transaksi Hari Ini</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-6 py-4">ID Transaksi</th>
                    <th className="px-6 py-4">Waktu</th>
                    <th className="px-6 py-4">Pelanggan</th>
                    <th className="px-6 py-4">Metode Pembayaran</th>
                    <th className="px-6 py-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {transactions?.map((trx) => (
                    <tr key={trx.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-mono font-medium text-primary">
                        #TRX-{trx.id.toString().padStart(4, "0")}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {formatDateTime(trx.created_at)}
                      </td>
                      <td className="px-6 py-4">{trx.customer_name || "Pelanggan Umum"}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-muted border border-border">
                          {trx.payment_method}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-bold">
                        {formatRupiah(trx.total_amount)}
                      </td>
                    </tr>
                  ))}
                  {transactions?.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                        Tidak ada transaksi pada periode ini.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}