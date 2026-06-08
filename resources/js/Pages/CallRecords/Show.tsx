import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

interface Props {
    call: any;
}

const sectionClass = 'bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden';
const sectionHeaderClass = 'flex items-center gap-2 px-5 py-3.5 border-b border-gray-100 bg-gray-50/60';
const sectionTitleClass = 'text-xs font-semibold text-gray-500 uppercase tracking-wider';
const fieldLabelClass = 'text-xs font-semibold text-gray-400 mb-0.5';
const fieldValueClass = 'text-sm text-gray-800 font-medium';

function Field({ label, value }: { label: string; value?: string | number | null }) {
    return (
        <div>
            <p className={fieldLabelClass}>{label}</p>
            <p className={fieldValueClass}>{value || <span className="text-gray-300 font-normal">—</span>}</p>
        </div>
    );
}

const STATUS_STYLES: Record<string, string> = {
    pending:  'bg-blue-50 text-blue-700 border border-blue-200',
    complete: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    close:    'bg-gray-100 text-gray-700 border border-gray-300',
    fail:     'bg-red-50 text-red-700 border border-red-200',
};

const STATUS_LABELS: Record<string, string> = {
    pending:  'Pending',
    complete: 'Complete',
    close:    'Closed',
    fail:     'Failed',
};

function formatDate(val?: string | null) {
    if (!val) return null;
    return new Date(val).toLocaleDateString('en-GB', {
        year: 'numeric', month: 'short', day: '2-digit',
    });
}

export default function Show({ call }: Props) {
    const status = call.status ?? 'pending';

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
                            className="flex items-center gap-1.5 text-sm bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
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
            <div className="p-6 max-w-4xl mx-auto space-y-4">

                {/* ── STATUS BADGE ── */}
                <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${STATUS_STYLES[status]}`}>
                        {STATUS_LABELS[status] ?? status}
                    </span>
                    <span className="text-xs text-gray-400">
                        Created {formatDate(call.created_at)}
                    </span>
                </div>

                {/* ── CUSTOMER INFORMATION ── */}
                <div className={sectionClass}>
                    <div className={sectionHeaderClass}>
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className={sectionTitleClass}>Customer information</span>
                    </div>
                    <div className="p-5 grid grid-cols-2 gap-5">
                        <Field label="Customer name" value={call.customerName} />
                        <Field label="Phone number"  value={call.customerPhoneNumber} />
                        <Field label="Email address" value={call.customerEmail} />
                        <Field label="Company"       value={call.customerCompany} />
                        <Field label="Address"       value={call.customerAddress} />
                        <Field label="District"      value={call.district?.districtName} />
                    </div>
                </div>

                {/* ── PRODUCT & PRICING ── */}
                <div className={sectionClass}>
                    <div className={sectionHeaderClass}>
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                        </svg>
                        <span className={sectionTitleClass}>Product &amp; pricing</span>
                    </div>
                    <div className="p-5 grid grid-cols-2 gap-5">
                        <Field label="Product"        value={call.product?.productName} />
                        <Field label="Model"          value={call.product_model?.productModel} />
                        <Field label="Unit price"     value={call.productPrice ? `Rs. ${Number(call.productPrice).toLocaleString()}` : null} />
                        <Field label="Discount price" value={call.discountPrice ? `Rs. ${Number(call.discountPrice).toLocaleString()}` : null} />
                    </div>
                </div>

                {/* ── CALL DETAILS ── */}
                <div className={sectionClass}>
                    <div className={sectionHeaderClass}>
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className={sectionTitleClass}>Call details</span>
                    </div>
                    <div className="p-5 grid grid-cols-2 gap-5">
                        <Field label="Reason"        value={call.reason?.reason} />
                        <Field label="Callback date" value={formatDate(call.callback_date)} />
                        <Field label="Created by"    value={call.creator ? `${call.creator.firstName ?? ''} ${call.creator.lastName ?? ''}`.trim() : null} />
                    </div>
                </div>

                {/* ── STATUS DETAILS ── */}
                {(status === 'fail' || status === 'close') && (
                    <div className={sectionClass}>
                        <div className={sectionHeaderClass}>
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
                            </svg>
                            <span className={sectionTitleClass}>
                                {status === 'fail' ? 'Fail details' : 'Close details'}
                            </span>
                        </div>
                        <div className="p-5 space-y-4">
                            {status === 'fail' && (
                                <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                                    <p className="text-xs font-semibold text-red-600 mb-1">Fail reason</p>
                                    <p className="text-sm text-red-800">{call.fail_reason || '—'}</p>
                                </div>
                            )}
                            {status === 'close' && (
                                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
                                    <div>
                                        <p className="text-xs font-semibold text-gray-600 mb-1">Closing date</p>
                                        <p className="text-sm text-gray-800">{formatDate(call.closeDate) || '—'}</p>
                                    </div>
                                    {call.closeNote && (
                                        <div>
                                            <p className="text-xs font-semibold text-gray-600 mb-1">Close note</p>
                                            <p className="text-sm text-gray-800">{call.closeNote}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ── CALLBACK STATUS ── */}
                <div className={sectionClass}>
                    <div className={sectionHeaderClass}>
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className={sectionTitleClass}>Callback status</span>
                    </div>
                    <div className="p-5 space-y-3">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-gray-500">Callback done:</span>
                            {call.is_callback_done === 'yes' ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Yes
                                </span>
                            ) : call.is_callback_done === 'no' ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    No
                                </span>
                            ) : (
                                <span className="text-sm text-gray-300">—</span>
                            )}
                        </div>

                        {call.is_callback_done === 'yes' && call.callback_description && (
                            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                                <p className="text-xs font-semibold text-emerald-700 mb-1">Callback note</p>
                                <p className="text-sm text-gray-800">{call.callback_description}</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
