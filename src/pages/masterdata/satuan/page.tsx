import { useState } from "react";
import { Topbar } from "../../../components/layout/topbar";
import { Search, Plus, Edit2, Trash2, Ruler } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../../hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { formatRupiah } from "../../../lib/utils";
import dummyUnits from "../../../dummy/m_satuan"

interface Unit {
  id: number;
  code: string;
  name: string;
  symbol: string;
  category: string;
  isConvertible: boolean;
  status: string;
}

export default function Satuan() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [units, setUnits] = useState<Unit[]>(dummyUnits);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const [formData, setFormData] = useState({ name: "", symbol: "", category: "", isConvertible: false });

  const filteredUnits = units.filter((unit) => {
    if (!searchTerm) return true;

    const keyword = searchTerm.toLowerCase();

    return (
      unit.name.toLowerCase().includes(keyword) ||
      unit.code?.includes(searchTerm)
    );
  });

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

  const openModal = (unit?: Unit) => {
    if (unit) {
      setEditingUnit(unit);
      setFormData({
        name: "", 
        symbol: "", 
        category: "", 
        isConvertible: false
      });
    } else {
      setEditingUnit(null);
      setFormData({ name: "", symbol: "", category: "", isConvertible: false });
    }
    setIsModalOpen(true);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingUnit) {
      setUnits((prev) =>
        prev.map((unit) =>
          unit.id === editingUnit.id
            ? { ...unit, ...formData }
            : unit
        )
      );

      toast({
        title: "Berhasil",
        description: "Data Satuan diperbarui",
      });
    } else {
      const newUnit: Unit = {
        id: Date.now(),
        ...formData,
        code: "",
        status: ""
      };

      setUnits((prev) => [...prev, newUnit]);

      toast({
        title: "Berhasil",
        description: "Satuan baru ditambahkan",
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Hapus Satuan ini?")) return;

    setUnits((prev) => prev.filter((unit) => unit.id !== id));

    toast({
      title: "Berhasil",
      description: "Satuan dihapus",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Daftar Satuan" />

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
              <Plus className="w-4 h-4 mr-2" /> Tambah Satuan
            </Button>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Satuan</th>
                  <th className="px-6 py-4">Simbol</th>
                  <th className="px-6 py-4 text-center">Kategori</th>
                  <th className="px-6 py-4 text-right">Dapat dikonversi?</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredUnits?.map((unit) => (
                  <tr key={unit.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <Ruler className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{unit.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-foreground">{unit.name || "-"}</div>
                      <div className="text-xs text-muted-foreground">{unit.symbol || "-"}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-medium bg-muted px-2 py-1 rounded-md">{unit.category || ""} </span>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-primary">
                      {unit.isConvertible ? "Ya" : "Tidak"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openModal(unit)} className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(unit.id)} className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {units?.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                      Belum ada data satuan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUnit ? "Edit Satuan" : "Tambah Satuan"}</DialogTitle>
          </DialogHeader>

          <form onSubmit={onSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nama Satuan</label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Simbol</label>
              <Input
                value={formData.symbol}
                onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Kategori</label>
              <Input
                type="email"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
