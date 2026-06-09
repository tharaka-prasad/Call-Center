import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

interface Props {
    call: any;
}

function formatDate(val?: string | null) {
    if (!val) return null;
    return new Date(val).toLocaleDateString('en-GB', {
        year: 'numeric', month: 'short', day: '2-digit',
    });
}

const STATUS_CONFIG: Record<string, {
    label: string;
    bg: string;
    text: string;
    border: string;
    dot: string;
    headerBg: string;
    icon: JSX.Element;
}> = {
    pending: {
        label: 'Pending',
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        dot: 'bg-amber-400',
        headerBg: 'bg-gradient-to-r from-amber-50 to-orange-50',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
        ),
    },
    complete: {
        label: 'Complete',
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        dot: 'bg-emerald-400',
        headerBg: 'bg-gradient-to-r from-emerald-50 to-teal-50',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    close: {
        label: 'Closed',
        bg: 'bg-slate-100',
        text: 'text-slate-600',
        border: 'border-slate-300',
        dot: 'bg-slate-400',
        headerBg: 'bg-gradient-to-r from-slate-50 to-gray-100',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        ),
    },
    fail: {
        label: 'Failed',
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        dot: 'bg-red-400',
        headerBg: 'bg-gradient-to-r from-red-50 to-rose-50',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
        ),
    },
};

function DataRow({ label, value, accent = false }: { label: string; value?: string | null; accent?: boolean }) {
    return (
        <div className="flex items-start justify-between py-3 border-b border-gray-50 last:border-0 gap-4">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex-shrink-0 w-36">{label}</span>
            <span className={`text-sm text-right ${accent ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                {value || <span className="text-gray-300 font-normal">—</span>}
            </span>
        </div>
    );
}

export default function Show({ call }: Props) {
    const status = call.status ?? 'pending';
    const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center shadow-sm">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-gray-900 leading-tight">Call Record</h2>
                            <p className="text-xs text-gray-400">{call.customerName}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href={route('call-records.edit', call.id)}
                            className="flex items-center gap-1.5 text-sm bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors font-medium shadow-sm"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                        </Link>
                        <Link
                            href={route('call-records.index')}
                            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back
                        </Link>
                    </div>
                </div>
            }
        >
            <div className="p-6 max-w-5xl mx-auto space-y-4">

                {/* ── HERO STATUS CARD ── */}
                <div className={`rounded-2xl border ${cfg.border} ${cfg.headerBg} p-6 flex items-center justify-between shadow-sm`}>
                    <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center shadow-md flex-shrink-0">
                            <span className="text-xl font-black text-white">
                                {call.customerName?.charAt(0)?.toUpperCase() ?? '?'}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 leading-tight">{call.customerName}</h3>
                            <p className="text-sm text-gray-500 mt-0.5">{call.customerPhoneNumber}</p>
                            <p className="text-xs text-gray-400 mt-1">
                                Created {formatDate(call.created_at)}
                                {call.creator && (
                                    <span> · by <span className="font-semibold text-gray-500">{`${call.creator.firstName ?? ''} ${call.creator.lastName ?? ''}`.trim()}</span></span>
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Status pill */}
                    <div className={`flex flex-col items-center gap-2 px-6 py-4 rounded-xl border ${cfg.border} bg-white/70 backdrop-blur-sm shadow-sm`}>
                        <div className={`${cfg.text}`}>{cfg.icon}</div>
                        <span className={`text-sm font-bold ${cfg.text}`}>{cfg.label}</span>
                        <span className={`w-2 h-2 rounded-full ${cfg.dot} animate-pulse`} />
                    </div>
                </div>

                {/* ── TWO COLUMN LAYOUT ── */}
                <div className="grid grid-cols-2 gap-4">

                    {/* LEFT COLUMN */}
                    <div className="space-y-4">

                        {/* Customer */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-100 bg-gray-50/60">
                                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</span>
                            </div>
                            <div className="px-5 py-1">
                                <DataRow label="Name"    value={call.customerName} accent />
                                <DataRow label="Phone"   value={call.customerPhoneNumber} />
                                <DataRow label="Email"   value={call.customerEmail} />
                                <DataRow label="Company" value={call.customerCompany} />
                                <DataRow label="Address" value={call.customerAddress} />
                                <DataRow label="District" value={call.district?.districtName} />
                            </div>
                        </div>

                        {/* Call details */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-100 bg-gray-50/60">
                                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Call details</span>
                            </div>
                            <div className="px-5 py-1">
                                <DataRow label="Reason"        value={call.reason?.reason} />
                                <DataRow label="Callback date" value={formatDate(call.callback_date)} />
                                <DataRow label="Created by"    value={call.creator ? `${call.creator.firstName ?? ''} ${call.creator.lastName ?? ''}`.trim() : null} />
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-4">

                        {/* Product & Pricing */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-100 bg-gray-50/60">
                                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                                </svg>
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Product &amp; pricing</span>
                            </div>
                            <div className="px-5 py-1">
                                <DataRow label="Product" value={call.product?.productName} accent />
                                <DataRow label="Model"   value={call.product_model?.productModel} />
                                <DataRow label="Unit price"
                                    value={call.productPrice ? `Rs. ${Number(call.productPrice).toLocaleString()}` : null}
                                    accent
                                />
                                <DataRow label="Discount price"
                                    value={call.discountPrice ? `Rs. ${Number(call.discountPrice).toLocaleString()}` : null}
                                />
                            </div>
                        </div>

                        {/* Callback status */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-100 bg-gray-50/60">
                                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Callback status</span>
                            </div>
                            <div className="p-5 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Callback done</span>
                                    {call.is_callback_done === 'yes' ? (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Yes — Done
                                        </span>
                                    ) : call.is_callback_done === 'no' ? (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            No — Pending
                                        </span>
                                    ) : (
                                        <span className="text-sm text-gray-300">—</span>
                                    )}
                                </div>

                                {call.is_callback_done === 'yes' && call.callback_description && (
                                    <div className="mt-2 p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
                                        <p className="text-xs font-semibold text-emerald-600 mb-1">Callback note</p>
                                        <p className="text-sm text-gray-700 leading-relaxed">{call.callback_description}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Fail / Close details */}
                        {status === 'fail' && (
                            <div className="bg-white rounded-xl border border-red-100 shadow-sm overflow-hidden">
                                <div className="flex items-center gap-2 px-5 py-3.5 border-b border-red-100 bg-red-50/60">
                                    <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                    </svg>
                                    <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">Fail details</span>
                                </div>
                                <div className="p-5">
                                    <p className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-2">Fail reason</p>
                                    <p className="text-sm text-red-800 leading-relaxed bg-red-50 rounded-lg p-3 border border-red-100">
                                        {call.fail_reason || '—'}
                                    </p>
                                </div>
                            </div>
                        )}

                        {status === 'close' && (
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-100 bg-gray-50/60">
                                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Close details</span>
                                </div>
                                <div className="px-5 py-1">
                                    <DataRow label="Closing date" value={formatDate(call.closeDate)} accent />
                                    {call.closeNote && (
                                        <div className="py-3">
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Close note</p>
                                            <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-3 border border-gray-100">
                                                {call.closeNote}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
