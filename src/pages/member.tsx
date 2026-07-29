import { useState } from "react";
import { Topbar } from "../components/layout/topbar";
import { Search, Plus, Edit2, Trash2, UserCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "../hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { formatRupiah } from "../lib/utils";
import dummyCustomers from "../dummy/customer"

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

export default function Pelanggan() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>(dummyCustomers);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", address: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredCustomers = customers.filter((customer) => {
    if (!searchTerm) return true;

    const keyword = searchTerm.toLowerCase();

    return (
      customer.name.toLowerCase().includes(keyword) ||
      customer.phone?.includes(searchTerm)
    );
  });

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

  const createMutation = {
    isPending: false,
    mutate: () => { },
  };

  const updateMutation = {
    isPending: false,
    mutate: () => { },
  };

  const deleteMutation = {
    mutate: () => { },
  };

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const openModal = (customer?: Customer) => {
    if (customer) {
      setEditingCustomer(customer);
      setFormData({
        name: customer.name,
        phone: customer.phone || "",
        email: customer.email || "",
        address: customer.address || ""
      });
    } else {
      setEditingCustomer(null);
      setFormData({ name: "", phone: "", email: "", address: "" });
    }
    setIsModalOpen(true);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingCustomer) {
      setCustomers((prev) =>
        prev.map((customer) =>
          customer.id === editingCustomer.id
            ? { ...customer, ...formData }
            : customer
        )
      );

      toast({
        title: "Berhasil",
        description: "Data pelanggan diperbarui",
      });
    } else {
      const newCustomer: Customer = {
        id: Date.now(),
        ...formData,
        visit_count: 0,
        total_purchases: 0,
        discount: 0,
      };

      setCustomers((prev) => [...prev, newCustomer]);

      toast({
        title: "Berhasil",
        description: "Pelanggan baru ditambahkan",
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Hapus pelanggan ini?")) return;

    setCustomers((prev) => prev.filter((customer) => customer.id !== id));

    toast({
      title: "Berhasil",
      description: "Pelanggan dihapus",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Daftar Pelanggan" />

      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama atau telepon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full bg-card"
              />
            </div>

            <Button onClick={() => openModal()} className="shadow-sm">
              <Plus className="w-4 h-4 mr-2" /> Tambah Pelanggan
            </Button>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Pelanggan</th>
                  <th className="px-6 py-4">Kontak</th>
                  <th className="px-6 py-4 text-center">Kunjungan</th>
                  <th className="px-6 py-4 text-right">Total Belanja</th>
                  <th className="px-6 py-4 text-right">Discount Potongan</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCustomers?.map((customer) => (
                  <tr key={customer.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <UserCircle className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{customer.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-foreground">{customer.phone || "-"}</div>
                      <div className="text-xs text-muted-foreground">{customer.email || "-"}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-medium bg-muted px-2 py-1 rounded-md">{customer.visit_count || 0} x</span>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-primary">
                      {formatRupiah(customer.total_purchases || 0)}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-primary">
                      {formatRupiah(customer.discount || 0)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openModal(customer)} className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(customer.id)} className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {customers?.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                      Belum ada data pelanggan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <p className="text-sm text-muted-foreground">
                Menampilkan{" "}
                <span className="font-medium">
                  {filteredCustomers.length === 0 ? 0 : startIndex + 1}
                </span>
                {" - "}
                <span className="font-medium">
                  {Math.min(endIndex, filteredCustomers.length)}
                </span>
                {" dari "}
                <span className="font-medium">
                  {filteredCustomers.length}
                </span>{" "}
                pelanggan
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  Sebelumnya
                </Button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i}
                    size="sm"
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Berikutnya
                </Button>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCustomer ? "Edit Pelanggan" : "Tambah Pelanggan"}</DialogTitle>
          </DialogHeader>

          <form onSubmit={onSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nama Lengkap</label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Nomor WhatsApp</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email (Opsional)</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="pt-4 flex justify-end gap-2 border-t border-border">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Batal</Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                Simpan
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
