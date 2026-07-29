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
import dummyFormulas from "../../../dummy/m_formula"

interface Formula {
    id: number;
    code: string;
    name: string;
    formula: string;
    description: string;
}

export default function Formula() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formulas, setFormulas] = useState<Formula[]>(dummyFormulas);
    const [editingFormula, setEditingFormula] = useState<Formula | null>(null);
    const [formData, setFormData] = useState({ name: "", formula: "", description: "" });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredFormulas = formulas.filter((formula) => {
        if (!searchTerm) return true;

        const keyword = searchTerm.toLowerCase();

        return (
            formula.name.toLowerCase().includes(keyword) ||
            formula.code?.includes(searchTerm)
        );
    });

    const totalPages = Math.ceil(filteredFormulas.length / itemsPerPage);

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

    const openModal = (formula?: Formula) => {
        if (formula) {
            setEditingFormula(formula);
            setFormData({
              name: formula.name, 
              formula: formula.formula, 
              description: formula.description
            });
        } else {
            setEditingFormula(null);
            setFormData({ name: "", formula: "", description: "" });
        }
        setIsModalOpen(true);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingFormula) {
            setFormulas((prev) =>
                prev.map((formula) =>
                    formula.id === editingFormula.id
                        ? { ...formula, ...formData }
                        : formula
                )
            );

            toast({
                title: "Berhasil",
                description: "Data formula diperbarui",
            });
        } else {
            const newFormula: Formula = {
                id: Date.now(),
                ...formData,
                code: ""
            };

            setFormulas((prev) => [...prev, newFormula]);

            toast({
                title: "Berhasil",
                description: "Formula baru ditambahkan",
            });
        }

        setIsModalOpen(false);
    };

    const handleDelete = (id: number) => {
        if (!confirm("Hapus formula ini?")) return;

        setFormulas((prev) => prev.filter((formula) => formula.id !== id));

        toast({
            title: "Berhasil",
            description: "Formula dihapus",
        });
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Topbar title="Daftar Masterdata Formula" />

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
                                Tambah Formula
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
                                    <th className="px-6 py-4">Formula</th>
                                    <th className="px-6 py-4 text-right">Unit Code</th>
                                    <th className="px-6 py-4 text-right">Deskripsi</th>
                                    <th className="px-6 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredFormulas?.map((formula) => (
                                    <tr key={formula.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                    <Barcode className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-foreground">{formula.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-foreground">{formula.name || "-"}</div>
                                            <div className="text-xs text-muted-foreground">{formula.formula || "-"}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="font-medium bg-muted px-2 py-1 rounded-md">{formula.code || 0}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-semibold text-primary">
                                            {formula.description}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => openModal(formula)} className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(formula.id)} className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {formulas?.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                            Belum ada data formula.
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
                                    {filteredFormulas.length === 0 ? 0 : startIndex + 1}
                                </span>
                                {" - "}
                                <span className="font-medium">
                                    {Math.min(endIndex, filteredFormulas.length)}
                                </span>
                                {" dari "}
                                <span className="font-medium">
                                    {filteredFormulas.length}
                                </span>{" "}
                                Formulas
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
                        <DialogTitle>{editingFormula ? "Edit Formula" : "Tambah Formula"}</DialogTitle>
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
                            <label className="text-sm font-medium">Formula</label>
                            <Input
                                value={formData.formula}
                                onChange={(e) => setFormData({ ...formData, formula: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Deksripsi</label>
                            <Input
                                type="email"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
