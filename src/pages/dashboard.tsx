import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Topbar } from "../components/layout/topbar";
import { formatRupiah } from "../lib/utils";
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    CreditCard,
    ShoppingCart,
    Clock,
    AlertTriangle,
    Palette,
    Scissors,
    PackageCheck,
    Printer,
} from "lucide-react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line
} from "recharts";
import { motion } from "framer-motion";

// Types
interface StockItem {
    id: string | number;
    name: string;
    stock: number;
    minimum: number;
    unit: string;
    status: "Kritis" | string;
}

interface Machine {
    id: string | number;
    name: string;
    operator: string;
    status: "Beroperasi" | "Standby" | "Maintenance" | string;
    currentJob: string;
    progress: number;
}

interface TimelineItem {
    id: string | number;
    time: string;
    description: string;
    amount: string;
    status: "Lunas" | "DP" | "Belum Bayar" | string;
}

interface ProductionStatusItem {
    id: string | number;
    title: string;
    total: number;
    icon: React.ElementType;
    color: string;
}

export default function Dashboard() {
    const summary = {
        omzet_today: 15750000,
        profit_today: 5280000,
        orders_today: 42,
        receivable_today: 8350000,
    };

    const weeklySales = [
        { label: "Sen", omzet: 8250000, profit: 2650000, orders: 21 },
        { label: "Sel", omzet: 10250000, profit: 3280000, orders: 28 },
        { label: "Rab", omzet: 9650000, profit: 3100000, orders: 24 },
        { label: "Kam", omzet: 13800000, profit: 4450000, orders: 36 },
        { label: "Jum", omzet: 15250000, profit: 4980000, orders: 41 },
        { label: "Sab", omzet: 18650000, profit: 6240000, orders: 53 },
        { label: "Min", omzet: 11400000, profit: 3720000, orders: 30 },
    ];

    const machineStatus: Machine[] = [
        { id: 1, name: "Printer Indoor Epson S80670", operator: "Andi", status: "Beroperasi", currentJob: "Banner PT Maju Jaya", progress: 75 },
        { id: 2, name: "Printer Outdoor Konica", operator: "-", status: "Standby", currentJob: "Tidak ada pekerjaan", progress: 0 },
        { id: 3, name: "Mesin Laminasi", operator: "Budi", status: "Beroperasi", currentJob: "Laminasi Brosur", progress: 40 },
        { id: 4, name: "Mesin Cutting", operator: "-", status: "Maintenance", currentJob: "Penggantian pisau", progress: 0 },
    ];

    const lowStocks: StockItem[] = [
        { id: 1, name: "Flexi China 280 gr", stock: 2, minimum: 10, unit: "Roll", status: "Kritis" },
        { id: 2, name: "Sticker Vinyl Glossy", stock: 5, minimum: 15, unit: "Roll", status: "Menipis" },
        { id: 3, name: "Tinta Cyan Epson", stock: 15, minimum: 40, unit: "%", status: "Menipis" },
        { id: 4, name: "PVC Board 5mm", stock: 7, minimum: 20, unit: "Lembar", status: "Menipis" },
        { id: 5, name: "Laminasi Doff", stock: 1, minimum: 8, unit: "Roll", status: "Kritis" },
    ];

    const productionStatus: ProductionStatusItem[] = [
        { id: 1, title: "Menunggu Desain", total: 4, icon: Palette, color: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400" },
        { id: 2, title: "Sedang Dicetak", total: 12, icon: Printer, color: "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400" },
        { id: 3, title: "Finishing", total: 6, icon: Scissors, color: "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400" },
        { id: 4, title: "Siap Diambil/Kirim", total: 9, icon: PackageCheck, color: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" },
    ];

    const timeline: TimelineItem[] = [
        { id: 1, time: "08:15", description: "Cetak Banner 2x1 m", amount: "Rp350.000", status: "Lunas" },
        { id: 2, time: "08:42", description: "Kartu Nama 500 pcs", amount: "Rp120.000", status: "DP" },
        { id: 3, time: "09:18", description: "Print Dokumen A4", amount: "Rp45.000", status: "Belum Bayar" },
        { id: 4, time: "10:05", description: "Stiker Vinyl", amount: "Rp180.000", status: "Lunas" },
        { id: 5, time: "10:47", description: "Spanduk 5x1 m", amount: "Rp275.000", status: "DP" },
    ];

    const topProducts = [
        { id: 1, name: "Banner Flexi 280gr", image_url: "", total_order: 42, quantity_sold: 124, unit: "m²", revenue: 18650000 },
        { id: 2, name: "Kartu Nama", image_url: "", total_order: 38, quantity_sold: 18500, unit: "pcs", revenue: 9240000 },
        { id: 3, name: "Stiker Vinyl", image_url: "", total_order: 31, quantity_sold: 420, unit: "lembar", revenue: 7150000 },
        { id: 4, name: "Brosur A4", image_url: "", total_order: 27, quantity_sold: 13500, unit: "lembar", revenue: 6425000 },
        { id: 5, name: "Spanduk", image_url: "", total_order: 19, quantity_sold: 58, unit: "pcs", revenue: 5180000 },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Topbar />

            <main className="flex-1 p-8">
                <motion.div
                    className="max-w-7xl mx-auto space-y-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <KpiCard
                            title="Omzet Hari Ini"
                            value={formatRupiah(summary.omzet_today)}
                            trend={12.5}
                            icon={DollarSign}
                            data={[9, 12, 10, 14, 13, 15, 16]}
                        />
                        <KpiCard
                            title="Profit Hari Ini"
                            value={formatRupiah(summary.profit_today)}
                            trend={8.2}
                            icon={TrendingUp}
                            data={[3, 4, 4, 5, 5, 5, 6]}
                        />
                        <KpiCard
                            title="Order Hari Ini"
                            value={summary.orders_today.toString()}
                            trend={6.8}
                            icon={ShoppingCart}
                            data={[18, 22, 24, 28, 31, 36, 42]}
                        />
                        <KpiCard
                            title="Piutang"
                            value={formatRupiah(summary.receivable_today)}
                            trend={-4.3}
                            icon={CreditCard}
                            data={[11, 10, 10, 9, 8, 8, 7]}
                        />
                    </div>

                    {/* Charts & Lists Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Penjualan 7 hari */}
                        <motion.div variants={itemVariants} className="md:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold mb-6">Penjualan 7 Hari Terakhir</h3>
                            <div className="h-[300px]">
                                {weeklySales && (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={weeklySales} margin={{ top: 5, right: 0, left: -10, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                            <XAxis
                                                dataKey="label"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                                dy={10}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                                tickFormatter={(val) => `Rp ${val / 1000000}Jt`}
                                            />
                                            <Tooltip
                                                cursor={{ fill: 'hsl(var(--muted)/0.5)' }}
                                                contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                formatter={(value) => [formatRupiah(value as number), "Omzet"]}
                                            />
                                            <Bar dataKey="omzet" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={40} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                )}
                            </div>
                        </motion.div>

                        {/* Produk Terlaris */}
                        <motion.div variants={itemVariants} className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold">Produk Terlaris</h3>
                                <button className="text-sm text-primary font-medium hover:underline">Lihat Semua</button>
                            </div>
                            <div className="space-y-4 flex-1">
                                {topProducts?.map((product, i) => (
                                    <div key={product.id} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                                            {i + 1}
                                        </div>
                                        <div className="w-10 h-10 rounded-lg bg-muted overflow-hidden shrink-0">
                                            {product.image_url ? (
                                                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-secondary flex items-center justify-center text-secondary-foreground text-xs font-medium">
                                                    {product.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-sm truncate">{product.name}</p>
                                            <p className="text-xs text-muted-foreground">{product.quantity_sold} {product.unit} terjual</p>
                                        </div>
                                        <div className="text-sm font-semibold text-right shrink-0">
                                            {formatRupiah(product.revenue)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TimelineCard timeline={timeline} itemVariant={itemVariants} />
                        <ProductionStatusCard productionStatus={productionStatus} itemVariant={itemVariants} />
                    </div>

                    {/* Middle Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <LowStockCard lowStocks={lowStocks} itemVariant={itemVariants} />
                        <MachineStatusCard machineStatus={machineStatus} itemVariant={itemVariants} />
                    </div>

                

                </motion.div>
            </main>
        </div>
    );
}

/* ==========================================================================
   SUB-COMPONENTS (Clean & Separated Logic)
   ========================================================================== */

function KpiCard({ title, value, trend, icon: Icon, data }: { title: string, value: string, trend: number, icon: any, data: number[] }) {
    const isPositive = trend >= 0;

    return (
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="bg-card border border-border rounded-2xl p-5 shadow-sm">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
                    <h3 className="text-2xl font-bold">{value}</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5" />
                </div>
            </div>
            <div className="flex items-end justify-between">
                <div className="flex items-center gap-1">
                    <span className={`text-xs font-medium px-1.5 py-0.5 rounded-md ${isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {isPositive ? '↑' : '↓'} {Math.abs(trend)}%
                    </span>
                    <span className="text-xs text-muted-foreground">vs Kemarin</span>
                </div>
                <div className="w-16 h-8">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data.map(v => ({ v }))}>
                            <Line type="monotone" dataKey="v" stroke={isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))"} strokeWidth={2} dot={false} isAnimationActive={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </motion.div>
    );
}

// 1. Component Stok Menipis
function LowStockCard({ lowStocks, itemVariant }: { lowStocks: StockItem[]; itemVariant: any }) {
    return (
        <motion.div variants={itemVariant} className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    Stock Menipis
                </h3>
                <span className="text-xs text-muted-foreground">{lowStocks.length} Item</span>
            </div>

            <div className="space-y-5">
                {lowStocks.map((item) => (
                    <LowStockItem key={item.id} item={item} />
                ))}
            </div>
        </motion.div>
    );
}

function LowStockItem({ item }: { item: StockItem }) {
    const isCritical = item.status === "Kritis";
    const percent = Math.min((item.stock / item.minimum) * 100, 100);

    const badgeStyle = isCritical
        ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400";

    const progressColor = isCritical ? "bg-red-500" : "bg-yellow-500";

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                        Sisa {item.stock} {item.unit}
                    </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${badgeStyle}`}>
                    {item.status}
                </span>
            </div>

            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all ${progressColor}`}
                    style={{ width: `${percent}%` }}
                />
            </div>

            <div className="flex justify-between text-xs text-muted-foreground">
                <span>Minimum {item.minimum} {item.unit}</span>
                <span>{Math.round(percent)}%</span>
            </div>
        </div>
    );
}

// 2. Component Status Mesin
function MachineStatusCard({ machineStatus, itemVariant }: { machineStatus: Machine[]; itemVariant: any }) {
    return (
        <motion.div variants={itemVariant} className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold flex items-center gap-2">
                    <Printer className="w-5 h-5" />
                    Status Mesin
                </h3>
                <span className="text-xs text-muted-foreground">{machineStatus.length} Mesin</span>
            </div>

            <div className="space-y-4">
                {machineStatus.map((machine) => (
                    <MachineStatusItem key={machine.id} machine={machine} />
                ))}
            </div>
        </motion.div>
    );
}

function MachineStatusItem({ machine }: { machine: Machine }) {
    const statusStyles: Record<string, string> = {
        Beroperasi: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
        Standby: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
        Maintenance: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
    };

    return (
        <div className="border border-border rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-medium">{machine.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">Operator : {machine.operator}</p>
                    <p className="text-xs text-muted-foreground">{machine.currentJob}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[machine.status] || ""}`}>
                    {machine.status}
                </span>
            </div>

            {machine.status === "Beroperasi" && (
                <div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                            className="bg-primary h-full rounded-full transition-all"
                            style={{ width: `${machine.progress}%` }}
                        />
                    </div>
                    <div className="text-right text-xs text-muted-foreground mt-1">
                        {machine.progress}% Selesai
                    </div>
                </div>
            )}
        </div>
    );
}

// 3. Component Timeline Transaksi
function TimelineCard({ timeline, itemVariant }: { timeline: TimelineItem[]; itemVariant: any }) {
    return (
        <motion.div variants={itemVariant} className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                Aktivitas Transaksi
            </h3>
            <div className="relative pl-6 space-y-6 before:absolute before:inset-y-2 before:left-[11px] before:w-0.5 before:bg-border">
                {timeline.map((event) => (
                    <TimelineItem key={event.id} event={event} />
                ))}
            </div>
        </motion.div>
    );
}

function TimelineItem({ event }: { event: TimelineItem }) {
    const statusStyles: Record<string, string> = {
        Lunas: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        DP: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        "Belum Bayar": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };

    return (
        <div className="relative">
            <div className="absolute -left-[30px] w-3 h-3 rounded-full bg-primary border-2 border-card" />
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <p className="text-xs text-muted-foreground">{event.time}</p>
                    <p className="font-medium text-sm">{event.description}</p>
                    <div className="mt-2 flex items-center gap-2">
                        <span className="font-semibold text-primary">{event.amount}</span>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[event.status] || ""}`}>
                            {event.status}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// 4. Component Status Produksi
function ProductionStatusCard({ productionStatus, itemVariant }: { productionStatus: ProductionStatusItem[]; itemVariant: any }) {
    const totalOrders = productionStatus.reduce((acc, curr) => acc + curr.total, 0);

    return (
        <motion.div variants={itemVariant} className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold">Status Produksi</h3>
                <span className="text-xs text-muted-foreground">{totalOrders} Order</span>
            </div>

            <div className="space-y-4">
                {productionStatus.map((status) => {
                    const Icon = status.icon;
                    return (
                        <div
                            key={status.id}
                            className="flex items-center justify-between rounded-xl border border-border p-4 hover:bg-muted/40 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${status.color}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium">{status.title}</p>
                                    <p className="text-xs text-muted-foreground">Sedang diproses</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold">{status.total}</p>
                                <p className="text-xs text-muted-foreground">Order</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}