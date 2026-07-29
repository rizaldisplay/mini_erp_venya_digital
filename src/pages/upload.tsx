import { useState, useMemo, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from "react";
import { Topbar } from "../components/layout/topbar";
import { formatRupiah } from "../lib/utils";
import { Search, ShoppingCart, Plus, Minus, Trash2, CreditCard, Banknote, QrCode, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "../hooks/use-toast";
import { dummyProducts } from "../dummy/product";
import SuccessPayment from "../pages/successPayment";

interface Product {
    id: number,
    name: string,
    category_id: number,
    category_name: string,
    price: number,
    stock: number,
    unit: string,
    image_url: string | null,
}

type CartItem = Product & { cartQuantity: number };

interface PaymentSuccessModalProps {
    isOpen: boolean;
    onClose?: () => void;
}

export const PaymentSuccessModal = ({ isOpen, onClose }: PaymentSuccessModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-10 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat konten di-klik
                        className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
                    >
                        <SuccessPayment />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default function Penjualan() {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [paymentMethod, setPaymentMethod] = useState<"CASH" | "QRIS" | "TRANSFER">("CASH");
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
    const [receivedAmount, setReceivedAmount] = useState<string>("");
    const [memberCode, setMemberCode] = useState("");

    const [selectedMember, setSelectedMember] = useState<{
        id: number;
        code: string;
        name: string;
        level: string;
        discount: number;
    } | null>(null);

    const products: Product[] = dummyProducts;
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const categories = useMemo(() => {
        if (!products) return [];
        const cats = new Map<number, string>();
        products.forEach(p => {
            if (p.category_id && p.category_name) {
                cats.set(p.category_id, p.category_name);
            }
        });
        return Array.from(cats.entries()).map(([id, name]) => ({ id, name }));
    }, [products]);

    const filteredProducts = useMemo<Product[]>(() => {
        return products.filter((product) => {
            const matchCategory =
                !activeCategory ||
                product.category_id === activeCategory;

            const matchSearch =
                product.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

            return matchCategory && matchSearch;
        });
    }, [products, activeCategory, searchTerm]);

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, cartQuantity: item.cartQuantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, cartQuantity: 1 }];
        });
    };

    const updateQuantity = (id: number, delta: number) => {
        setCart(prev => {
            return prev.map(item => {
                if (item.id === id) {
                    const newQ = item.cartQuantity + delta;
                    return newQ > 0 ? { ...item, cartQuantity: newQ } : item;
                }
                return item;
            });
        });
    };

    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.cartQuantity), 0);
    const tax = subtotal * 0.11; // 11% PPN
    const total = subtotal + tax;
    const change = (parseInt(receivedAmount.replace(/\D/g, '')) || 0) - total;
    const isCheckoutDisabled = cart.length === 0 || (paymentMethod === "CASH" && (parseInt(receivedAmount.replace(/\D/g, '')) || 0) < total);

    const handleCheckout = () => {
        toast({
            title: "Berhasil",
            description: "Transaksi dummy berhasil."
        });

        setShowPaymentSuccess(true);
        setCart([]);
        setShowPaymentModal(false);
        setReceivedAmount("");
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <Topbar title="Penjualan (Kasir)" />

            <main className="flex-1 flex overflow-hidden">
                {/* Left: Product Grid */}
                <div className="flex-1 flex flex-col bg-muted/20 border-r border-border">
                    <div className="p-4 border-b border-border bg-card flex flex-col gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Cari menu atau scan barcode..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-muted border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-shadow"
                            />
                        </div>

                        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                            <button
                                onClick={() => setActiveCategory(null)}
                                className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${activeCategory === null
                                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                    : "bg-card border border-border text-foreground hover:bg-muted"
                                    }`}
                            >
                                Semua Menu
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${activeCategory === cat.id
                                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                        : "bg-card border border-border text-foreground hover:bg-muted"
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {filteredProducts?.map((product) => (
                                <motion.div
                                    layout
                                    key={product.id}
                                    onClick={() => addToCart(product)}
                                    className="bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:border-primary/50 transition-colors shadow-sm group flex flex-col h-full"
                                >
                                    <div className="aspect-4/3 bg-muted relative">
                                        {product.image_url ? (
                                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                <Package className="w-8 h-8 opacity-20" />
                                            </div>
                                        )}
                                        <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold shadow-sm">
                                            {product.stock} {product.unit}
                                        </div>
                                    </div>
                                    <div className="p-3 flex flex-col flex-1">
                                        <h3 className="font-semibold text-sm mb-1 line-clamp-2 flex-1">{product.name}</h3>
                                        <p className="text-primary font-bold text-sm mt-auto">{formatRupiah(product.price)}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Cart/Order Panel */}
                <div className="w-[400px] bg-card flex flex-col shadow-[-4px_0_24px_-16px_rgba(0,0,0,0.1)] z-10">
                    <div className="p-4 border-b border-border flex items-center gap-3">
                        <ShoppingCart className="w-5 h-5 text-primary" />
                        <h2 className="font-bold text-lg">Pesanan Saat Ini</h2>
                        <span className="ml-auto bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-sm font-bold">
                            {cart.reduce((sum, item) => sum + item.cartQuantity, 0)} items
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        <AnimatePresence>
                            {cart.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-muted-foreground"
                                >
                                    <ShoppingCart className="w-12 h-12 mb-4 opacity-20" />
                                    <p>Keranjang masih kosong</p>
                                </motion.div>
                            ) : (
                                cart.map(item => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        key={item.id}
                                        className="flex gap-3 p-3 bg-muted/30 border border-border rounded-xl"
                                    >
                                        <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden shrink-0">
                                            {item.image_url ? (
                                                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-secondary flex items-center justify-center text-secondary-foreground text-xs font-medium">
                                                    {item.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0 flex flex-col">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-semibold text-sm truncate pr-2">{item.name}</h4>
                                                <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive shrink-0">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-xs text-muted-foreground mb-auto">{formatRupiah(item.price)}</p>

                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center gap-3 bg-background border border-border rounded-lg p-0.5">
                                                    <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center hover:bg-muted rounded">
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-sm font-semibold w-4 text-center">{item.cartQuantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center hover:bg-muted rounded">
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <p className="font-bold text-sm text-right">
                                                    {formatRupiah(item.price * item.cartQuantity)}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="p-4 border-t border-border bg-card">
                        <div className="space-y-2 mb-4 text-sm">
                            <div className="flex justify-between text-muted-foreground">
                                <span>Subtotal</span>
                                <span>{formatRupiah(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>PPN (11%)</span>
                                <span>{formatRupiah(tax)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg pt-2 border-t border-border border-dashed">
                                <span>Total</span>
                                <span className="text-primary">{formatRupiah(total)}</span>
                            </div>
                        </div>

                        <button
                            disabled={cart.length === 0}
                            onClick={() => setShowPaymentModal(true)}
                            className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/30 hover:bg-primary/90 disabled:opacity-50 disabled:shadow-none transition-all"
                        >
                            Bayar Pesanan
                        </button>
                    </div>
                </div>
            </main>

            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex"
                    >
                        {/* Payment Summary */}
                        <div className="w-1/2 p-6 bg-muted/30 border-r border-border">
                            <h3 className="font-bold text-lg mb-6">Ringkasan Tagihan</h3>
                            <div className="bg-background rounded-xl p-4 border border-border space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Items ({cart.length})</span>
                                    <span>{formatRupiah(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Pajak</span>
                                    <span>{formatRupiah(tax)}</span>
                                </div>
                                <div className="pt-3 border-t border-border flex justify-between font-bold text-xl">
                                    <span>Total</span>
                                    <span className="text-primary">{formatRupiah(total)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="w-1/2 p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-lg">Metode Pembayaran</h3>
                                <button onClick={() => setShowPaymentModal(false)} className="p-1 hover:bg-muted rounded-md text-muted-foreground">
                                    <XIcon className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-3 gap-3 mb-6">
                                <PaymentMethodBtn
                                    icon={Banknote} label="Tunai" value="CASH"
                                    selected={paymentMethod === "CASH"}
                                    onClick={() => setPaymentMethod("CASH")}
                                />
                                <PaymentMethodBtn
                                    icon={QrCode} label="QRIS" value="QRIS"
                                    selected={paymentMethod === "QRIS"}
                                    onClick={() => setPaymentMethod("QRIS")}
                                />
                                <PaymentMethodBtn
                                    icon={CreditCard} label="Transfer" value="TRANSFER"
                                    selected={paymentMethod === "TRANSFER"}
                                    onClick={() => setPaymentMethod("TRANSFER")}
                                />
                            </div>

                            {paymentMethod === "CASH" && (
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <label className="text-sm font-medium mb-1.5 block">Uang Diterima</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-medium text-muted-foreground">Rp</span>
                                            <input
                                                type="text"
                                                value={receivedAmount}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/\D/g, '');
                                                    setReceivedAmount(val ? parseInt(val).toLocaleString('id-ID') : "");
                                                }}
                                                className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl font-bold text-lg focus:ring-2 focus:ring-primary/20"
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>

                                    {receivedAmount && change >= 0 && (
                                        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-200">
                                            <p className="text-sm font-medium mb-1 text-emerald-600">Kembalian</p>
                                            <p className="text-2xl font-bold">{formatRupiah(change)}</p>
                                        </div>
                                    )}
                                    {receivedAmount && change < 0 && (
                                        <p className="text-sm text-destructive font-medium">Uang diterima kurang dari total tagihan</p>
                                    )}
                                </div>
                            )}

                            {paymentMethod === "QRIS" && (
                                <div className="mb-6 flex flex-col items-center justify-center py-4">
                                    <div className="w-32 h-32 bg-muted rounded-xl mb-4 flex items-center justify-center border border-border">
                                        <QrCode className="w-16 h-16 opacity-20" />
                                    </div>
                                    <p className="text-sm text-muted-foreground text-center">Minta pelanggan scan QRIS untuk membayar</p>
                                </div>
                            )}

                            <button
                                disabled={paymentMethod === "CASH" && (parseInt(receivedAmount.replace(/\D/g, '')) || 0) < total}
                                onClick={handleCheckout}
                                className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 disabled:opacity-50 transition-all"
                            >
                                {"Selesaikan Pembayaran"}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Payment Success */}
            <PaymentSuccessModal
                isOpen={showPaymentSuccess}
                onClose={() => setShowPaymentSuccess(false)}
            />
        </div>
    );
}

function PaymentMethodBtn({ icon: Icon, label, value, selected, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${selected
                ? "border-primary bg-primary/5 text-primary shadow-sm"
                : "border-border bg-card text-muted-foreground hover:bg-muted"
                }`}
        >
            <Icon className={`w-6 h-6 mb-2 ${selected ? "text-primary" : ""}`} />
            <span className="text-xs font-semibold">{label}</span>
        </button>
    );
}

function XIcon(props: any) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}
