import React, { useState } from "react";
import { router } from "@inertiajs/react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

type District = { id: number; districtName: string };
type Reason   = { id: number; reason: string };
type Product  = { id: number; productName: string };
type Model    = { id: number; productModel: string; productId: number };

type Props = {
    calls:     any[];
    filters:   any;
    districts: District[];
    reasons:   Reason[];
    products:  Product[];
    models:    Model[];
};

export default function Index({ calls, filters, districts, reasons, products, models }: Props) {
    const [values, setValues] = useState({
        from_date: filters?.from_date || "",
        to_date:   filters?.to_date   || "",
        district:  filters?.district  || "",
        product:   filters?.product   || "",
        model:     filters?.model     || "",
        reason:    filters?.reason    || "",
    });

    // When product changes, reset model and reload models via server
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "product") {
            setValues((prev) => ({ ...prev, product: value, model: "" }));
        } else {
            setValues((prev) => ({ ...prev, [name]: value }));
        }
    };

    const applyFilter = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route("call-records.index"), values, {
            preserveState: true,
            replace: true,
        });
    };

    const resetFilter = () => {
        setValues({ from_date: "", to_date: "", district: "", product: "", model: "", reason: "" });
        router.get(route("call-records.index"));
    };

    // Stats
    const total     = calls.length;
    const completed = calls.filter((c) => c.status === "complete").length;
    const pending   = calls.filter((c) => c.status !== "complete").length;
    const districtCount = new Set(calls.map((c) => c.district_data?.districtName)).size;

    const activeFilters = [
        values.from_date && `From: ${values.from_date}`,
        values.to_date   && `To: ${values.to_date}`,
        values.district  && `District: ${districts.find(d => String(d.id) === values.district)?.districtName}`,
        values.product   && `Product: ${products.find(p => String(p.id) === values.product)?.productName}`,
        values.model     && `Model: ${models.find(m => String(m.id) === values.model)?.productModel}`,
        values.reason    && `Reason: ${reasons.find(r => String(r.id) === values.reason)?.reason}`,
    ].filter(Boolean).join("  |  ");

    // Excel Export
    const downloadExcel = () => {
        const rows = calls.map((c) => ({
            Customer: c.customerName,
            Phone:    c.customerPhoneNumber,
            Product:  c.product_data?.productName  ?? "",
            Model:    c.product_model_data?.modelName ?? "",
            Reason:   c.reason_data?.reasonName    ?? "",
            District: c.district_data?.districtName ?? "",
            Status:   c.status,
            Date:     new Date(c.created_at).toLocaleDateString("en-GB"),
        }));
        const ws = XLSX.utils.json_to_sheet(rows);
        ws["!cols"] = [
            { wch: 22 }, { wch: 15 }, { wch: 18 },
            { wch: 16 }, { wch: 20 }, { wch: 16 },
            { wch: 11 }, { wch: 13 },
        ];
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Call Records");
        XLSX.writeFile(wb, "call_records_report.xlsx");
    };

    // PDF Export
    const downloadPDF = () => {
        const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Call Records Report", 14, 16);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(120);
        doc.text(`Generated: ${new Date().toLocaleDateString("en-GB")}`, 14, 22);
        if (activeFilters) doc.text(`Filters: ${activeFilters}`, 14, 28);

        autoTable(doc, {
            startY: activeFilters ? 33 : 27,
            head: [["Customer", "Phone", "Product", "Model", "Reason", "District", "Status", "Date"]],
            body: calls.map((c) => [
                c.customerName,
                c.customerPhoneNumber,
                c.product_data?.productName   ?? "",
                c.product_model_data?.modelName ?? "",
                c.reason_data?.reasonName     ?? "",
                c.district_data?.districtName ?? "",
                c.status,
                new Date(c.created_at).toLocaleDateString("en-GB"),
            ]),
            styles:            { fontSize: 8, cellPadding: 3 },
            headStyles:        { fillColor: [17, 24, 39], textColor: 255, fontStyle: "bold" },
            alternateRowStyles:{ fillColor: [245, 247, 250] },
            columnStyles:      { 6: { cellWidth: 16 }, 7: { cellWidth: 22 } },
            margin:            { left: 14, right: 14 },
        });
        doc.save("call_records_report.pdf");
    };

    // Filtered models based on selected product
    const filteredModels = values.product
        ? models.filter((m) => String(m.productId) === values.product)
        : models;

    const selectClass =
        "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-400 transition-all appearance-none cursor-pointer";

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center shadow-sm">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-gray-900 leading-tight">Call Records</h2>
                            <p className="text-xs text-gray-400">Manage customer calls and follow-ups</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={downloadExcel}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white hover:opacity-90 transition-opacity shadow-sm"
                            style={{ background: "#1A7A4A" }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                                <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                                <line x1="9" y1="13" x2="15" y2="13" />
                                <line x1="9" y1="17" x2="15" y2="17" />
                            </svg>
                            Excel
                        </button>
                        <button
                            onClick={downloadPDF}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white hover:opacity-90 transition-opacity shadow-sm"
                            style={{ background: "#C0392B" }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                                <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                                <line x1="9" y1="17" x2="15" y2="17" />
                            </svg>
                            PDF
                        </button>
                    </div>
                </div>
            }
        >
            <Head title="Call Records" />

            <div className="py-6 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">

                    {/* ── FILTER CARD ── */}
                    <form onSubmit={applyFilter} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                            </svg>
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Filters</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">

                            {/* From Date */}
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-gray-400">From Date</label>
                                <input
                                    type="date"
                                    name="from_date"
                                    value={values.from_date}
                                    onChange={handleChange}
                                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-400 transition-all"
                                />
                            </div>

                            {/* To Date */}
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-gray-400">To Date</label>
                                <input
                                    type="date"
                                    name="to_date"
                                    value={values.to_date}
                                    onChange={handleChange}
                                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-400 transition-all"
                                />
                            </div>

                            {/* District Select */}
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-gray-400">District</label>
                                <div className="relative">
                                    <select name="district" value={values.district} onChange={handleChange} className={selectClass}>
                                        <option value="">All Districts</option>
                                        {districts.map((d) => (
                                            <option key={d.id} value={d.id}>{d.districtName}</option>
                                        ))}
                                    </select>
                                    <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Product Select */}
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-gray-400">Product</label>
                                <div className="relative">
                                    <select name="product" value={values.product} onChange={handleChange} className={selectClass}>
                                        <option value="">All Products</option>
                                        {products.map((p) => (
                                            <option key={p.id} value={p.id}>{p.productName}</option>
                                        ))}
                                    </select>
                                    <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Model Select — filtered by product */}
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-gray-400">Model</label>
                                <div className="relative">
                                    <select
                                        name="model"
                                        value={values.model}
                                        onChange={handleChange}
                                        disabled={filteredModels.length === 0}
                                        className={`${selectClass} ${filteredModels.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                    >
                                        <option value="">All Models</option>
                                        {filteredModels.map((m) => (
                                            <option key={m.id} value={m.id}>{m.productModel}</option>
                                        ))}
                                    </select>
                                    <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Reason Select */}
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-gray-400">Reason</label>
                                <div className="relative">
                                    <select name="reason" value={values.reason} onChange={handleChange} className={selectClass}>
                                        <option value="">All Reasons</option>
                                        {reasons.map((r) => (
                                            <option key={r.id} value={r.id}>{r.reason}</option>
                                        ))}
                                    </select>
                                    <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                        </div>

                        <div className="flex gap-2 pt-1">
                            <button type="submit" className="px-4 py-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">
                                Apply Filter
                            </button>
                            <button type="button" onClick={resetFilter} className="px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium rounded-lg transition-colors">
                                Reset
                            </button>
                        </div>
                    </form>

                    {/* ── STATS ── */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                            { label: "Total Records", value: total,         color: "text-gray-900", bar: "bg-gray-400",    barBg: "bg-gray-100" },
                            { label: "Completed",     value: completed,     color: "text-emerald-600", bar: "bg-emerald-400", barBg: "bg-emerald-50" },
                            { label: "Pending",       value: pending,       color: "text-amber-600",   bar: "bg-amber-400",  barBg: "bg-amber-50" },
                            { label: "Districts",     value: districtCount, color: "text-blue-600",    bar: "bg-blue-400",   barBg: "bg-blue-50" },
                        ].map((s) => (
                            <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">{s.label}</p>
                                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                                <div className={`mt-3 h-1.5 w-full ${s.barBg} rounded-full overflow-hidden`}>
                                    <div
                                        className={`h-full rounded-full ${s.bar} transition-all duration-700`}
                                        style={{ width: total > 0 ? `${(s.value / total) * 100}%` : "0%" }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ── TABLE ── */}
                    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-800">All Records</span>
                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">{calls.length} total</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-900">
                                        {["Customer", "Phone", "Product", "Model", "Reason", "District", "Status", "Date"].map((h) => (
                                            <th key={h} className="px-4 py-3.5 text-left text-xs font-bold text-white uppercase tracking-wider">
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {calls.length > 0 ? (
                                        calls.map((call: any) => (
                                            <tr key={call.id} className="hover:bg-gray-50/70 transition-colors">
                                                <td className="px-4 py-3 font-semibold text-gray-800">
                                                    {call.customerName}
                                                </td>
                                                <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                                                    {call.customerPhoneNumber}
                                                </td>
                                                <td className="px-4 py-3 text-gray-600">
                                                    {call.product?.productName ?? "-"}
                                                </td>
                                                <td className="px-4 py-3 text-gray-600">
                                                    {call.productModel?.productModel ?? "-"}
                                                </td>
                                                <td className="px-4 py-3 text-gray-600">
                                                    {call.reason?.reason ?? "-"}
                                                </td>
                                                <td className="px-4 py-3 text-gray-600">
                                                    {call.district?.districtName ?? "-"}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                                                        call.status === "complete"
                                                            ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                                            : "bg-amber-50 text-amber-600 border-amber-200"
                                                    }`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${call.status === "complete" ? "bg-emerald-400" : "bg-amber-400"}`} />
                                                        {call.status === "complete" ? "Complete" : "Pending"}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-gray-500 text-xs">
                                                    {new Date(call.created_at).toLocaleDateString("en-GB")}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={8} className="py-16 text-center">
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                                                        <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493..." />
                                                        </svg>
                                                    </div>
                                                    <p className="text-sm font-semibold text-gray-400">No records found</p>
                                                    <p className="text-xs text-gray-300">Try adjusting your filters</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
