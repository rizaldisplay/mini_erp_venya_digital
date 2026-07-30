import {
    LayoutDashboard, 
    Check,
    Printer,
    RotateCw,
    Plus,
    ChevronRight,
    Info,
    MessageSquareText,
    type LucideIcon
} from 'lucide-react';

// --- Types ---
export interface TransactionItem {
    id: string | number;
    name: string;
    qty: number;
    price: number;
}

export interface TransactionData {
    invoiceNo: string;
    date: string;
    cashier: string;
    items: TransactionItem[];
    subtotal: number;
    tax: number;
    total: number;
    paymentMethod: string;
    cashPaid: number;
    change: number;
}

interface SuccessPaymentProps {
    data?: TransactionData;
    onNewTransaction?: () => void;
    onPrint?: () => void;
    onSendWhatsApp?: () => void;
    onSendEmail?: () => void;
    onDownloadPdf?: () => void;
    onReprint?: () => void;
}

// --- Helper Formatting ---
const formatRupiah = (val: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);

// --- Dummy Fallback Data (Jika props kosong) ---
const DEFAULT_DATA: TransactionData = {
    invoiceNo: 'INV-240704-0012',
    date: '4 Jul 2026 10:24',
    cashier: 'Pak Budi',
    items: [
        { id: 1, name: 'Nasi Goreng Spesial', qty: 1, price: 25000 },
        { id: 2, name: 'Es Teh Manis', qty: 2, price: 5000 },
        { id: 3, name: 'Ayam Geprek', qty: 1, price: 18000 },
        { id: 4, name: 'Soto Ayam', qty: 1, price: 15000 },
        { id: 5, name: 'Kerupuk', qty: 1, price: 3000 },
    ],
    subtotal: 56000,
    tax: 6160,
    total: 62160,
    paymentMethod: 'Tunai',
    cashPaid: 100000,
    change: 37840,
};

export default function SuccessPayment({
    data = DEFAULT_DATA,
    onNewTransaction,
    onPrint,
    onSendWhatsApp,
    onReprint
}: SuccessPaymentProps) {

    // Action Menu Options
    type ActionButton = {
        id: string;
        label: string;
        desc: string;
        icon: LucideIcon;
        bgClass: string;
        textClass: string;
        hoverBorderClass: string;
        onClick?: () => void;
    };

    const actionButtons: ActionButton[] = [
        { id: 'print', label: 'Cetak Nota', desc: 'Cetak nota untuk pelanggan', icon: Printer, bgClass: 'bg-blue-50 group-hover:bg-blue-100', textClass: 'text-blue-600', hoverBorderClass: 'hover:border-indigo-300', onClick: onPrint },
        { id: 'wa', label: 'Kirim via WhatsApp', desc: 'Kirim nota ke WhatsApp', icon: MessageSquareText, bgClass: 'bg-emerald-50 group-hover:bg-emerald-100', textClass: 'text-emerald-600', hoverBorderClass: 'hover:border-emerald-300', onClick: onSendWhatsApp },
        // { id: 'email', label: 'Kirim via Email', desc: 'Kirim nota ke email pelanggan', icon: Mail, bgClass: 'bg-purple-50 group-hover:bg-purple-100', textClass: 'text-purple-600', hoverBorderClass: 'hover:border-purple-300', onClick: onSendEmail },
        // { id: 'pdf', label: 'Download PDF', desc: 'Simpan nota sebagai PDF', icon: FileText, bgClass: 'bg-amber-50 group-hover:bg-amber-100', textClass: 'text-amber-600', hoverBorderClass: 'hover:border-amber-300', onClick: onDownloadPdf },
    ];

    const totalItemsCount = data.items.reduce((acc, item) => acc + item.qty, 0);

    return (
        <div className="w-full bg-white font-sans p-4 md:p-6 max-h-[85vh] overflow-y-auto">

            {/* Header / Brand Logo */}
            <div className="flex items-center gap-2.5 pb-6 border-b border-slate-100">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                        <span className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                            <LayoutDashboard className="w-5 h-5" />
                        </span>
                        Mini ERP
                    </h1>
                </div>
            </div>

            {/* Main Grid Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">

                {/* ================= LEFT COLUMN: Status & Actions ================= */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-5">

                    {/* Success Icon & Heading */}
                    <div className="text-center pt-1">
                        <div className="relative inline-block mb-3">
                            <div className="absolute -top-1 -left-3 w-2.5 h-1 bg-yellow-400 rounded-full rotate-45" />
                            <div className="absolute top-2 -right-4 w-2 h-2 bg-blue-400 rounded-full" />
                            <div className="absolute -bottom-1 -left-2 w-1.5 h-1.5 bg-purple-400 rounded-full" />
                            <div className="absolute top-8 -right-5 w-2.5 h-1 bg-rose-400 rounded-full -rotate-12" />

                            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200 text-white mx-auto">
                                <Check className="w-9 h-9 stroke-[3]" />
                            </div>
                        </div>

                        <h1 className="text-xl md:text-2xl font-extrabold text-slate-900">
                            Pembayaran Berhasil!
                        </h1>
                        <p className="text-slate-500 mt-1 text-xs font-medium">
                            Transaksi telah berhasil disimpan.
                        </p>
                    </div>

                    {/* Total & Change Card */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-center space-y-3">
                        <div>
                            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
                                Total Pembayaran
                            </p>
                            <p className="text-2xl font-black text-slate-900">
                                {formatRupiah(data.total)}
                            </p>
                        </div>

                        <hr className="border-dashed border-slate-200 w-3/4 mx-auto" />

                        <div>
                            <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider mb-0.5">
                                Kembalian
                            </p>
                            <p className="text-xl font-extrabold text-emerald-600">
                                {formatRupiah(data.change)}
                            </p>
                        </div>
                    </div>

                    {/* Action Grid */}
                    <div className="space-y-2.5">
                        <p className="text-xs font-medium text-slate-500 text-center mb-2">
                            Apa yang ingin Anda lakukan selanjutnya?
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-2.5">
                            {actionButtons.map(({ id, label, desc, icon: Icon, bgClass, textClass, hoverBorderClass, onClick }) => (
                                <button
                                    key={id}
                                    onClick={onClick}
                                    type="button"
                                    className={`flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl ${hoverBorderClass} hover:shadow-xs transition group text-left`}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <div className={`${bgClass} ${textClass} p-2 rounded-lg transition shrink-0`}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-800">{label}</p>
                                            <p className="text-[11px] text-slate-500 leading-tight">{desc}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition shrink-0" />
                                </button>
                            ))}
                        </div>

                        {/* Cetak Ulang (Full Width) */}
                        <button
                            onClick={onReprint}
                            type="button"
                            className="w-full flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-xs transition group text-left"
                        >
                            <div className="flex items-center gap-2.5">
                                <div className="bg-blue-50 text-blue-600 p-2 rounded-lg group-hover:bg-blue-100 transition shrink-0">
                                    <RotateCw className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-800">Cetak Ulang</p>
                                    <p className="text-[11px] text-slate-500 leading-tight">Cetak nota terakhir</p>
                                </div>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition shrink-0" />
                        </button>
                    </div>

                    {/* Primary Action Button */}
                    <button
                        onClick={onNewTransaction}
                        type="button"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-200 transition"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="text-sm">Transaksi Baru</span>
                    </button>
                </div>

                {/* ================= RIGHT COLUMN: Receipt Preview ================= */}
                <div className="lg:col-span-6 bg-slate-50/70 border border-slate-100 rounded-2xl p-4 md:p-5 flex flex-col justify-between">

                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-slate-800 text-sm">Preview Nota</h3>
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-white border border-slate-200 text-slate-600">
                                <Printer className="w-3 h-3 text-blue-600" />
                                80mm
                            </span>
                        </div>

                        {/* Thermal Receipt Paper */}
                        <div className="relative bg-white p-5 shadow-sm border border-slate-200/60 text-[11px] text-slate-700 mx-auto max-w-xs">

                            {/* Receipt Header */}
                            <div className="text-center mb-3">
                                <div className="inline-flex bg-primary text-white p-1.5 rounded-lg mb-1.5">
                                    <LayoutDashboard className="w-5 h-5" />
                                </div>
                                <h4 className="font-extrabold text-slate-900 text-sm">Mini ERP</h4>
                                <p className="text-[10px] text-slate-500">Solusi Kasir & Manajemen Bisnis</p>
                            </div>

                            <div className="border-b border-dashed border-slate-300 my-2.5" />

                            {/* Metadata */}
                            <div className="space-y-1 text-slate-600 text-[11px]">
                                <div className="flex justify-between">
                                    <span>No. Transaksi</span>
                                    <span className="font-semibold text-slate-800">{data.invoiceNo}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tanggal</span>
                                    <span className="font-semibold text-slate-800">{data.date}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Kasir</span>
                                    <span className="font-semibold text-slate-800">{data.cashier}</span>
                                </div>
                            </div>

                            <div className="border-b border-dashed border-slate-300 my-2.5" />

                            {/* Items Table */}
                            <div className="grid grid-cols-12 font-bold text-slate-800 pb-1 border-b border-slate-200 text-[11px]">
                                <span className="col-span-5">Item</span>
                                <span className="col-span-2 text-center">Qty</span>
                                <span className="col-span-2 text-right">Harga</span>
                                <span className="col-span-3 text-right">Total</span>
                            </div>

                            <div className="space-y-1.5 py-2 text-slate-700 text-[11px]">
                                {data.items.map((item) => (
                                    <div key={item.id} className="grid grid-cols-12 items-center">
                                        <span className="col-span-5 font-medium truncate">{item.name}</span>
                                        <span className="col-span-2 text-center">{item.qty}</span>
                                        <span className="col-span-2 text-right">{item.price.toLocaleString('id-ID')}</span>
                                        <span className="col-span-3 text-right font-medium">
                                            {(item.qty * item.price).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-b border-dashed border-slate-300 my-2.5" />

                            {/* Subtotal & Tax */}
                            <div className="space-y-1 text-slate-600 text-[11px]">
                                <div className="flex justify-between">
                                    <span>Subtotal ({totalItemsCount} items)</span>
                                    <span>{formatRupiah(data.subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Pajak (11%)</span>
                                    <span>{formatRupiah(data.tax)}</span>
                                </div>
                            </div>

                            <div className="border-b border-slate-300 my-2.5" />

                            {/* TOTAL */}
                            <div className="flex justify-between items-center font-extrabold text-sm text-slate-900 my-1.5">
                                <span>TOTAL</span>
                                <span className="text-blue-600 text-base">{formatRupiah(data.total)}</span>
                            </div>

                            <div className="space-y-1 text-slate-600 text-[10px] pt-1">
                                <div className="flex justify-between">
                                    <span>Metode Pembayaran</span>
                                    <span className="font-semibold text-slate-800">{data.paymentMethod}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Uang Diterima</span>
                                    <span className="font-semibold text-slate-800">{formatRupiah(data.cashPaid)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Kembalian</span>
                                    <span className="font-semibold text-slate-800">{formatRupiah(data.change)}</span>
                                </div>
                            </div>

                            <div className="border-b border-dashed border-slate-300 my-3" />

                            {/* Receipt Footer Message */}
                            <div className="text-center text-slate-500 text-[10px] space-y-0.5">
                                <p>Terima kasih atas kunjungan Anda!</p>
                                <p>:)</p>
                            </div>

                            {/* Bottom Jagged Mask */}
                            <div
                                className="absolute left-0 right-0 -bottom-2.5 h-2.5 bg-white"
                                style={{
                                    maskImage: 'radial-gradient(circle 4px at 4px -2px, transparent 100%, white 100%)',
                                    maskSize: '8px 100%',
                                    WebkitMaskImage: 'radial-gradient(circle 4px at 4px -2px, transparent 100%, white 100%)',
                                    WebkitMaskSize: '8px 100%',
                                }}
                            />
                        </div>
                    </div>

                    {/* Printer Status */}
                    <div className="mt-6 bg-blue-50/70 border border-blue-100 rounded-xl p-2.5 flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1.5 text-blue-900">
                            <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span>Printer Thermal 80mm</span>
                        </div>
                        <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-[10px] font-medium border border-emerald-200 shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Terhubung</span>
                        </div>
                    </div>

                </div>

            </div>
            
        </div>
    );
}