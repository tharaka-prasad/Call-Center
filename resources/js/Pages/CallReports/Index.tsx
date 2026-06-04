import React, { useState } from "react";
import { router } from "@inertiajs/react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

type Props = {
    calls: any[];
    filters: any;
};

export default function Index({ calls, filters }: Props) {
    const [values, setValues] = useState({
        from_date: filters?.from_date || "",
        to_date: filters?.to_date || "",
        district: filters?.district || "",
        product: filters?.product || "",
        model: filters?.model || "",
        reason: filters?.reason || "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const applyFilter = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route("call-records.index"), values, {
            preserveState: true,
            replace: true,
        });
    };

    const resetFilter = () => {
        router.get(route("call-records.index"));
    };

    // ── Stats ────────────────────────────────────────────────────────────────────
    const total = calls.length;
    const completed = calls.filter((c) => c.status === "complete").length;
    const pending = calls.filter((c) => c.status !== "complete").length;
    const districts = new Set(calls.map((c) => c.district_data?.districtName)).size;

    // ── Active filter summary (shown in exports) ─────────────────────────────────
    const activeFilters = [
        values.from_date && `From: ${values.from_date}`,
        values.to_date && `To: ${values.to_date}`,
        values.district && `District: ${values.district}`,
        values.product && `Product: ${values.product}`,
        values.model && `Model: ${values.model}`,
        values.reason && `Reason: ${values.reason}`,
    ]
        .filter(Boolean)
        .join("  |  ");

    // ── Excel Export ──────────────────────────────────────────────────────────────
    const downloadExcel = () => {
        const rows = calls.map((c) => ({
            Customer: c.customerName,
            Phone: c.customerPhoneNumber,
            Product: c.product_data?.productName ?? "",
            Model: c.product_model_data?.modelName ?? "",
            Reason: c.reason_data?.reasonName ?? "",
            District: c.district_data?.districtName ?? "",
            Status: c.status,
            Date: new Date(c.created_at).toLocaleDateString("en-GB"),
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

    // ── PDF Export ────────────────────────────────────────────────────────────────
    const downloadPDF = () => {
        const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Call Records Report", 14, 16);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(120);
        doc.text(`Generated: ${new Date().toLocaleDateString("en-GB")}`, 14, 22);
        if (activeFilters) {
            doc.text(`Filters: ${activeFilters}`, 14, 28);
        }

        autoTable(doc, {
            startY: activeFilters ? 33 : 27,
            head: [["Customer", "Phone", "Product", "Model", "Reason", "District", "Status", "Date"]],
            body: calls.map((c) => [
                c.customerName,
                c.customerPhoneNumber,
                c.product_data?.productName ?? "",
                c.product_model_data?.modelName ?? "",
                c.reason_data?.reasonName ?? "",
                c.district_data?.districtName ?? "",
                c.status,
                new Date(c.created_at).toLocaleDateString("en-GB"),
            ]),
            styles: { fontSize: 8, cellPadding: 3 },
            headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: "bold" },
            alternateRowStyles: { fillColor: [245, 247, 250] },
            columnStyles: { 6: { cellWidth: 16 }, 7: { cellWidth: 22 } },
            margin: { left: 14, right: 14 },
        });

        doc.save("call_records_report.pdf");
    };

    // ── Render ────────────────────────────────────────────────────────────────────
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    {/* Left — icon + title */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                            <svg
                                className="w-4 h-4 text-blue-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-gray-800 leading-tight">
                                Call Records
                            </h2>
                            <p className="text-xs text-gray-400">
                                Manage customer calls and follow-ups
                            </p>
                        </div>
                    </div>

                    {/* Right — export buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={downloadExcel}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-opacity hover:opacity-90"
                            style={{ background: "#1A7A4A" }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3.5 h-3.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                                <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                                <line x1="9" y1="13" x2="15" y2="13" />
                                <line x1="9" y1="17" x2="15" y2="17" />
                            </svg>
                            Excel
                        </button>

                        <button
                            onClick={downloadPDF}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-opacity hover:opacity-90"
                            style={{ background: "#C0392B" }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3.5 h-3.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
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

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">

                    {/* ── FILTER CARD ── */}
                    <form
                        onSubmit={applyFilter}
                        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                    >
                        <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-3">
                            Filters
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-3">
                            <input
                                type="date"
                                name="from_date"
                                value={values.from_date}
                                onChange={handleChange}
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="date"
                                name="to_date"
                                value={values.to_date}
                                onChange={handleChange}
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="district"
                                placeholder="District / Area"
                                value={values.district}
                                onChange={handleChange}
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="product"
                                placeholder="Product"
                                value={values.product}
                                onChange={handleChange}
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="model"
                                placeholder="Model"
                                value={values.model}
                                onChange={handleChange}
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="reason"
                                placeholder="Reason"
                                value={values.reason}
                                onChange={handleChange}
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                                Apply Filter
                            </button>
                            <button
                                type="button"
                                onClick={resetFilter}
                                className="px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium rounded-lg transition-colors"
                            >
                                Reset
                            </button>
                        </div>
                    </form>

                    {/* ── STATS ROW ── */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-gray-100 rounded-lg p-4">
                            <p className="text-xs text-gray-500 mb-1">Total Records</p>
                            <p className="text-2xl font-semibold text-gray-900">{total}</p>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-4">
                            <p className="text-xs text-gray-500 mb-1">Completed</p>
                            <p className="text-2xl font-semibold" style={{ color: "#1A7A4A" }}>
                                {completed}
                            </p>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-4">
                            <p className="text-xs text-gray-500 mb-1">Pending</p>
                            <p className="text-2xl font-semibold" style={{ color: "#BA7517" }}>
                                {pending}
                            </p>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-4">
                            <p className="text-xs text-gray-500 mb-1">Districts</p>
                            <p className="text-2xl font-semibold text-gray-900">{districts}</p>
                        </div>
                    </div>

                    {/* ── TABLE ── */}
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        {[
                                            "Customer", "Phone", "Product", "Model",
                                            "Reason", "District", "Status", "Date",
                                        ].map((h) => (
                                            <th
                                                key={h}
                                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {calls.length > 0 ? (
                                        calls.map((call: any) => (
                                            <tr
                                                key={call.id}
                                                className="hover:bg-gray-50 transition-colors"
                                            >
                                                <td className="px-4 py-3 font-medium text-gray-900">
                                                    {call.customerName}
                                                </td>
                                                <td className="px-4 py-3 text-gray-600 font-mono text-xs">
                                                    {call.customerPhoneNumber}
                                                </td>
                                                <td className="px-4 py-3 text-gray-700">
                                                    {call.product_data?.productName}
                                                </td>
                                                <td className="px-4 py-3 text-gray-700">
                                                    {call.product_model_data?.modelName}
                                                </td>
                                                <td className="px-4 py-3 text-gray-700">
                                                    {call.reason_data?.reasonName}
                                                </td>
                                                <td className="px-4 py-3 text-gray-700">
                                                    {call.district_data?.districtName}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${call.status === "complete"
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-amber-100 text-amber-800"
                                                            }`}
                                                    >
                                                        {call.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-gray-500 text-xs">
                                                    {new Date(call.created_at).toLocaleDateString("en-GB")}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={8}
                                                className="px-4 py-12 text-center text-gray-400 text-sm"
                                            >
                                                No records found
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
