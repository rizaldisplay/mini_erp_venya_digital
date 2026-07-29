import { useRef, useState } from "react";
import { Topbar } from "../../../components/layout/topbar";
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    UserCircle,
    Upload,
    Download,
    Barcode
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../../hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { formatRupiah } from "../../../lib/utils";
import dummyMachines from "../../../dummy/m_mesin"

interface Machine {
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

export default function Machine() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [machines, setMachines] = useState<Machine[]>(dummyMachines);
    const [editingMachine, setEditingMachine] = useState<Machine | null>(null);
    const [formData, setFormData] = useState<{
        name: string;
        category: string;
        maxWidth: number;
        unit: string;
        supportedMaterials: string[];
        maxResolution: number;
        speed: string;
        location: string;
    }>({
        name: "",
        category: "",
        maxWidth: 0,
        unit: "",
        supportedMaterials: [],
        maxResolution: 0,
        speed: "",
        location: "",
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredMachines = machines.filter((machine) => {
        if (!searchTerm) return true;

        const keyword = searchTerm.toLowerCase();

        return (
            machine.name.toLowerCase().includes(keyword) ||
            machine.code.toLowerCase().includes(keyword)
        );
    });

    const totalPages = Math.ceil(filteredMachines.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

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

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleImportExcel = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        toast({
            title: "Import Excel",
            description: `${file.name} siap diproses`,
        });

        // TODO:
        // parse excel menggunakan xlsx
    };

    const handleDownloadTemplate = () => {
        toast({
            title: "Download Template",
            description: "Template Excel berhasil diunduh",
        });

        // nanti diarahkan download template
    };

    const openModal = (machine?: Machine) => {
        if (machine) {
            setEditingMachine(machine);
            setFormData({
                name: machine.name,
                category: machine.category,
                maxWidth: machine.maxWidth,
                unit: machine.unit,
                supportedMaterials: machine.supportedMaterials || [],
                maxResolution: machine.maxResolution,
                speed: machine.speed,
                location: machine.location,
            });
        } else {
            setEditingMachine(null);
            setFormData({
                name: "",
                category: "",
                maxWidth: 0,
                unit: "",
                supportedMaterials: [],
                maxResolution: 0,
                speed: "",
                location: "",
            });
        }
        setIsModalOpen(true);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingMachine) {
            setMachines((prev) =>
                prev.map((machine) =>
                    machine.id === editingMachine.id
                        ? { ...machine, ...formData }
                        : machine
                )
            );

            toast({
                title: "Berhasil",
                description: "Data mesin diperbarui",
            });
        } else {
            const newMachine: Machine = {
                id: Date.now(),
                code: "",
                status: "Active",
                ...formData,
            };

            setMachines((prev) => [...prev, newMachine]);

            toast({
                title: "Berhasil",
                description: "Mesin baru ditambahkan",
            });
        }

        setIsModalOpen(false);
    };

    const handleDelete = (id: number) => {
        if (!confirm("Hapus mesin ini?")) return;

        setMachines((prev) => prev.filter((machine) => machine.id !== id));

        toast({
            title: "Berhasil",
            description: "Mesin dihapus",
        });
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Topbar title="Daftar Masterdata Mesin" />

            <main className="flex-1 p-8">
                <div className="max-w-6xl mx-auto space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="relative w-full sm:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Cari nama atau kode..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 w-full bg-card"
                            />
                        </div>

                        <div className="flex gap-2 flex-wrap">

                            <Button
                                variant="outline"
                                onClick={handleDownloadTemplate}
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Template Excel
                            </Button>

                            <Button
                                variant="outline"
                                onClick={handleImportClick}
                            >
                                <Upload className="w-4 h-4 mr-2" />
                                Import Excel
                            </Button>

                            <Button
                                onClick={() => openModal()}
                                className="shadow-sm"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Tambah Mesin
                            </Button>

                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".xlsx,.xls"
                            className="hidden"
                            onChange={handleImportExcel}
                        />
                    </div>

                    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                        {/* Table */}
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-semibold">
                                <tr>
                                    <th className="px-6 py-4">Nama</th>
                                    <th className="px-6 py-4">Kategori</th>
                                    <th className="px-6 py-4 text-right">Unit</th>
                                    <th className="px-6 py-4 text-right">Speed</th>
                                    <th className="px-6 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredMachines.map((machine) => (
                                    <tr key={machine.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                    <Barcode className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-foreground">{machine.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-foreground">{machine.category || "-"}</div>
                                            <div className="text-xs text-muted-foreground">{machine.location || "-"}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="font-medium bg-muted px-2 py-1 rounded-md">{machine.unit || "-"}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-semibold text-primary">
                                            {machine.speed || "-"}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => openModal(machine)} className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(machine.id)} className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {machines.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                            Belum ada data mesin.
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
                                    {filteredMachines.length === 0 ? 0 : startIndex + 1}
                                </span>
                                {" - "}
                                <span className="font-medium">
                                    {Math.min(endIndex, filteredMachines.length)}
                                </span>
                                {" dari "}
                                <span className="font-medium">
                                    {filteredMachines.length}
                                </span>{" "}
                                Mesin
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
                        <DialogTitle>{editingMachine ? "Edit Mesin" : "Tambah Mesin"}</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={onSubmit} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Nama Mesin</label>
                            <Input
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Kategori</label>
                            <Input
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Max Width</label>
                            <Input
                                type="number"
                                value={formData.maxWidth}
                                onChange={(e) => setFormData({ ...formData, maxWidth: Number(e.target.value) })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Unit</label>
                            <Input
                                value={formData.unit}
                                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Supported Materials</label>
                            <Input
                                value={formData.supportedMaterials.join(", ")}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        supportedMaterials: e.target.value
                                            .split(",")
                                            .map((item) => item.trim())
                                            .filter(Boolean),
                                    })
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Max Resolution</label>
                            <Input
                                type="number"
                                value={formData.maxResolution}
                                onChange={(e) => setFormData({ ...formData, maxResolution: Number(e.target.value) })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Speed</label>
                            <Input
                                value={formData.speed}
                                onChange={(e) => setFormData({ ...formData, speed: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Location</label>
                            <Input
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
