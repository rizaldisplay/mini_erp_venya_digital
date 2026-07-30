import { useRef, useState } from "react";
import { Topbar } from "../../../components/layout/topbar";
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    Upload,
    Download,
    Barcode
} from "lucide-react";
import { useToast } from "../../../hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import dummyProducts from "../../../dummy/m_produk"

interface Product {
    id: number;
    code: string;
    name: string;
    category: string;
    formulaCode: string;
    unitCode: string;
    bleed: number,
    estimatedProduction: string;
    status: string;
}

export default function Produk() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>(dummyProducts);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState({ name: "", category: "", formulaCode: "", unitCode: "", bleed: 0, estimatedProduction: "" });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredProducts = products.filter((product) => {
        if (!searchTerm) return true;

        const keyword = searchTerm.toLowerCase();

        return (
            product.name.toLowerCase().includes(keyword) ||
            product.code?.includes(searchTerm)
        );
    });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

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

    const openModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                category: product.category || "",
                formulaCode: product.formulaCode || "",
                unitCode: product.unitCode || "",
                bleed: product.bleed,
                estimatedProduction: product.estimatedProduction || ""
            });
        } else {
            setEditingProduct(null);
            setFormData({ name: "", category: "", formulaCode: "", unitCode: "", bleed: 0, estimatedProduction: "" });
        }
        setIsModalOpen(true);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingProduct) {
            setProducts((prev) =>
                prev.map((product) =>
                    product.id === editingProduct.id
                        ? { ...product, ...formData }
                        : product
                )
            );

            toast({
                title: "Berhasil",
                description: "Data produk diperbarui",
            });
        } else {
            const newProduct: Product = {
                id: Date.now(),
                ...formData,
                code: "",
                status: ""
            };

            setProducts((prev) => [...prev, newProduct]);

            toast({
                title: "Berhasil",
                description: "Produk baru ditambahkan",
            });
        }

        setIsModalOpen(false);
    };

    const handleDelete = (id: number) => {
        if (!confirm("Hapus produk ini?")) return;

        setProducts((prev) => prev.filter((customer) => customer.id !== id));

        toast({
            title: "Berhasil",
            description: "Produk dihapus",
        });
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Topbar title="Daftar Masterdata Produk" />

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
                                Tambah Produk
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
                                    <th className="px-6 py-4 text-right">Unit Code</th>
                                    <th className="px-6 py-4 text-right">Estimasi Pengerjaan</th>
                                    <th className="px-6 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredProducts?.map((product) => (
                                    <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                    <Barcode className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-foreground">{product.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-foreground">{product.name || "-"}</div>
                                            <div className="text-xs text-muted-foreground">{product.category || "-"}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="font-medium bg-muted px-2 py-1 rounded-md">{product.unitCode || 0}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-semibold text-primary">
                                            {product.estimatedProduction}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => openModal(product)} className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(product.id)} className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {products?.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                            Belum ada data produk.
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
                                    {filteredProducts.length === 0 ? 0 : startIndex + 1}
                                </span>
                                {" - "}
                                <span className="font-medium">
                                    {Math.min(endIndex, filteredProducts.length)}
                                </span>
                                {" dari "}
                                <span className="font-medium">
                                    {filteredProducts.length}
                                </span>{" "}
                                Products
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
                        <DialogTitle>{editingProduct ? "Edit Produk" : "Tambah Produk"}</DialogTitle>
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
                            <label className="text-sm font-medium">Kategori</label>
                            <Input
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Formula Code</label>
                            <Input
                                type="email"
                                value={formData.formulaCode}
                                onChange={(e) => setFormData({ ...formData, formulaCode: e.target.value })}
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
