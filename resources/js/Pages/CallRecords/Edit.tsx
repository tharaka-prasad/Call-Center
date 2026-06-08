import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Link } from '@inertiajs/react';

interface Props {
    call: any;
    reasons: any[];
    products: any[];
    districts: any[];
}

const inputClass =
    'w-full text-sm px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-150';

const labelClass = 'block text-xs font-semibold text-gray-800 mb-1.5';

const sectionClass = 'bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden';

const sectionHeaderClass =
    'flex items-center gap-2 px-5 py-3.5 border-b border-gray-100 bg-gray-50/60';

const sectionTitleClass = 'text-xs font-semibold text-gray-500 uppercase tracking-wider';

const STATUS_OPTIONS = [
    {
        value: 'pending',
        label: 'Pending',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
        ),
        active: 'bg-blue-50 border-blue-400 text-blue-700',
        inactive: 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50',
    },
    {
        value: 'complete',
        label: 'Complete',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        active: 'bg-emerald-50 border-emerald-400 text-emerald-700',
        inactive: 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50',
    },
    {
        value: 'close',
        label: 'Close',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        ),
        active: 'bg-gray-100 border-gray-400 text-gray-700',
        inactive: 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50',
    },
    {
        value: 'fail',
        label: 'Fail',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
        ),
        active: 'bg-red-50 border-red-400 text-red-700',
        inactive: 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50',
    },
];

export default function Edit({ call, reasons = [], products = [], districts = [] }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        customerName:        call.customerName        ?? '',
        customerPhoneNumber: call.customerPhoneNumber ?? '',
        customerAddress:     call.customerAddress     ?? '',
        customerEmail:       call.customerEmail       ?? '',
        customerCompany:     call.customerCompany     ?? '',

        district:            call.district            ?? '',
        reason:              call.reason              ?? '',

        product:             call.product             ?? '',
        productModel:        call.productModel        ?? '',

        productPrice:        call.productPrice        ?? '',
        discountPrice:       call.discountPrice       ?? '',

        callback_date:       call.callback_date
                                ? new Date(call.callback_date).toISOString().split('T')[0]
                                : '',

        status:              call.status              ?? 'pending',

        // Fail fields
        fail_reason:         call.fail_reason         ?? '',

        // Close fields
        closeDate:           call.closeDate
                                ? new Date(call.closeDate).toISOString().split('T')[0]
                                : '',
        closeNote:           call.closeNote           ?? '',

        // Callback fields
        is_callback_done:    call.is_callback_done    ?? '',
        callback_description: call.callback_description ?? '',
    });

    const selectedProduct = products.find((p: any) => p.id == data.product);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center shadow-sm">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-gray-900 leading-tight">Edit Call Record</h2>
                            <p className="text-xs text-gray-400">Update call details for {call.customerName}</p>
                        </div>
                    </div>
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
            }
        >
            <div className="p-6 max-w-4xl mx-auto space-y-4">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        put(route('call-records.update', call.id));
                    }}
                    className="space-y-4"
                >
                    {/* ── CUSTOMER INFORMATION ── */}
                    <div className={sectionClass}>
                        <div className={sectionHeaderClass}>
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className={sectionTitleClass}>Customer information</span>
                        </div>
                        <div className="p-5 grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Customer name</label>
                                <input
                                    className={inputClass}
                                    placeholder="e.g. Nuwan Perera"
                                    value={data.customerName}
                                    onChange={(e) => setData('customerName', e.target.value)}
                                />
                                {errors.customerName && <p className="mt-1 text-xs text-red-500">{errors.customerName}</p>}
                            </div>

                            <div>
                                <label className={labelClass}>Phone number</label>
                                <input
                                    className={inputClass}
                                    placeholder="e.g. 077 123 4567"
                                    value={data.customerPhoneNumber}
                                    onChange={(e) => setData('customerPhoneNumber', e.target.value)}
                                />
                                {errors.customerPhoneNumber && <p className="mt-1 text-xs text-red-500">{errors.customerPhoneNumber}</p>}
                            </div>

                            <div>
                                <label className={labelClass}>Email address</label>
                                <input
                                    type="email"
                                    className={inputClass}
                                    placeholder="nuwan@example.com"
                                    value={data.customerEmail}
                                    onChange={(e) => setData('customerEmail', e.target.value)}
                                />
                                {errors.customerEmail && <p className="mt-1 text-xs text-red-500">{errors.customerEmail}</p>}
                            </div>

                            <div>
                                <label className={labelClass}>Company</label>
                                <input
                                    className={inputClass}
                                    placeholder="Company name"
                                    value={data.customerCompany}
                                    onChange={(e) => setData('customerCompany', e.target.value)}
                                />
                                {errors.customerCompany && <p className="mt-1 text-xs text-red-500">{errors.customerCompany}</p>}
                            </div>

                            <div>
                                <label className={labelClass}>Address</label>
                                <textarea
                                    className={inputClass + ' resize-none h-20'}
                                    placeholder="Street, city..."
                                    value={data.customerAddress}
                                    onChange={(e) => setData('customerAddress', e.target.value)}
                                />
                                {errors.customerAddress && <p className="mt-1 text-xs text-red-500">{errors.customerAddress}</p>}
                            </div>

                            <div>
                                <label className={labelClass}>District</label>
                                <select
                                    className={inputClass}
                                    value={data.district}
                                    onChange={(e) => setData('district', e.target.value)}
                                >
                                    <option value="">Select district</option>
                                    {districts.map((d: any) => (
                                        <option key={d.id} value={d.id}>{d.districtName}</option>
                                    ))}
                                </select>
                                {errors.district && <p className="mt-1 text-xs text-red-500">{errors.district}</p>}
                            </div>
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
                        <div className="p-5 grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Product</label>
                                <select
                                    className={inputClass}
                                    value={data.product}
                                    onChange={(e) => {
                                        setData('product', e.target.value);
                                        setData('productModel', '');
                                        setData('productPrice', '');
                                    }}
                                >
                                    <option value="">Select product</option>
                                    {products.map((p: any) => (
                                        <option key={p.id} value={p.id}>{p.productName}</option>
                                    ))}
                                </select>
                                {errors.product && <p className="mt-1 text-xs text-red-500">{errors.product}</p>}
                            </div>

                            <div>
                                <label className={labelClass}>Model</label>
                                <select
                                    className={inputClass + (!selectedProduct ? ' opacity-50 cursor-not-allowed' : '')}
                                    value={data.productModel}
                                    disabled={!selectedProduct}
                                    onChange={(e) => {
                                        const model = selectedProduct?.models?.find(
                                            (m: any) => m.id == e.target.value
                                        );
                                        setData('productModel', e.target.value);
                                        if (model) setData('productPrice', model.price);
                                    }}
                                >
                                    <option value="">Select model</option>
                                    {selectedProduct?.models?.map((m: any) => (
                                        <option key={m.id} value={m.id}>{m.productModel}</option>
                                    ))}
                                </select>
                                {errors.productModel && <p className="mt-1 text-xs text-red-500">{errors.productModel}</p>}
                            </div>

                            <div>
                                <label className={labelClass}>Unit price</label>
                                <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50">
                                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a2 2 0 012-2z" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-700">
                                        {data.productPrice || <span className="font-normal text-gray-400">—</span>}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Discount price</label>
                                <input
                                    type="number"
                                    className={inputClass}
                                    placeholder="0.00"
                                    value={data.discountPrice}
                                    onChange={(e) => setData('discountPrice', e.target.value)}
                                />
                                {errors.discountPrice && <p className="mt-1 text-xs text-red-500">{errors.discountPrice}</p>}
                            </div>
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
                        <div className="p-5 grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Reason</label>
                                <select
                                    className={inputClass}
                                    value={data.reason}
                                    onChange={(e) => setData('reason', e.target.value)}
                                >
                                    <option value="">Select reason</option>
                                    {reasons.map((r: any) => (
                                        <option key={r.id} value={r.id}>{r.reason}</option>
                                    ))}
                                </select>
                                {errors.reason && <p className="mt-1 text-xs text-red-500">{errors.reason}</p>}
                            </div>

                            <div>
                                <label className={labelClass}>Callback date</label>
                                <input
                                    type="date"
                                    className={inputClass}
                                    value={data.callback_date}
                                    onChange={(e) => setData('callback_date', e.target.value)}
                                />
                                {errors.callback_date && <p className="mt-1 text-xs text-red-500">{errors.callback_date}</p>}
                            </div>
                        </div>
                    </div>

                    {/* ── STATUS ── */}
                    <div className={sectionClass}>
                        <div className={sectionHeaderClass}>
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
                            </svg>
                            <span className={sectionTitleClass}>Status</span>
                        </div>
                        <div className="p-5 space-y-4">
                            <div className="grid grid-cols-4 gap-2.5">
                                {STATUS_OPTIONS.map((opt) => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => setData('status', opt.value)}
                                        className={`flex flex-col items-center gap-1.5 py-3 rounded-lg border text-xs font-medium transition-all duration-150 ${
                                            data.status === opt.value ? opt.active : opt.inactive
                                        }`}
                                    >
                                        {opt.icon}
                                        {opt.label}
                                    </button>
                                ))}
                            </div>

                            {/* ✅ FAIL REASON — status === 'fail' නම් පෙනෙනවා */}
                            {data.status === 'fail' && (
                                <div className="mt-3 p-4 bg-red-50 border border-red-100 rounded-xl space-y-1 animate-in fade-in duration-200">
                                    <label className="block text-xs font-semibold text-red-700 mb-1.5">
                                        Fail reason
                                        <span className="text-red-400 ml-0.5">*</span>
                                    </label>
                                    <textarea
                                        className="w-full text-sm px-3 py-2 rounded-lg border border-red-200 bg-white text-gray-900 placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-red-400/20 focus:border-red-400 transition-all resize-none h-24"
                                        placeholder="Describe why this call failed..."
                                        value={data.fail_reason}
                                        onChange={(e) => setData('fail_reason', e.target.value)}
                                    />
                                    {errors.fail_reason && <p className="text-xs text-red-500">{errors.fail_reason}</p>}
                                </div>
                            )}

                            {/* ✅ CLOSING DATE + NOTE — status === 'close' නම් පෙනෙනවා */}
                            {data.status === 'close' && (
                                <div className="mt-3 p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3 animate-in fade-in duration-200">
                                    {/* Closing Date */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                            Closing date
                                            <span className="text-red-400 ml-0.5">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400/20 focus:border-gray-400 transition-all"
                                            value={data.closeDate}
                                            onChange={(e) => setData('closeDate', e.target.value)}
                                        />
                                        {errors.closeDate && (
                                            <p className="mt-1 text-xs text-red-500">{errors.closeDate}</p>
                                        )}
                                    </div>

                                    {/* Close Note */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                            Close note
                                        </label>
                                        <textarea
                                            className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400/20 focus:border-gray-400 transition-all resize-none h-24"
                                            placeholder="Any notes about closing this record..."
                                            value={data.closeNote}
                                            onChange={(e) => setData('closeNote', e.target.value)}
                                        />
                                        {errors.closeNote && (
                                            <p className="text-xs text-red-500">{errors.closeNote}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── CALLBACK DONE ── */}
                    <div className={sectionClass}>
                        <div className={sectionHeaderClass}>
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className={sectionTitleClass}>Callback status</span>
                        </div>
                        <div className="p-5 space-y-4">
                            <div>
                                <label className={labelClass}>Is callback done?</label>
                                <div className="flex gap-3 mt-1">
                                    <button
                                        type="button"
                                        onClick={() => setData('is_callback_done', 'yes')}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-medium transition-all duration-150 ${
                                            data.is_callback_done === 'yes'
                                                ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                                                : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Yes
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setData('is_callback_done', 'no')}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-medium transition-all duration-150 ${
                                            data.is_callback_done === 'no'
                                                ? 'bg-red-50 border-red-400 text-red-700'
                                                : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        No
                                    </button>
                                </div>
                                {errors.is_callback_done && <p className="mt-1 text-xs text-red-500">{errors.is_callback_done}</p>}
                            </div>

                            {/* ✅ CALLBACK DESCRIPTION — is_callback_done === 'yes' නම් පෙනෙනවා */}
                            {data.is_callback_done === 'yes' && (
                                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl space-y-1 animate-in fade-in duration-200">
                                    <label className="block text-xs font-semibold text-emerald-700 mb-1.5">
                                        Callback note
                                    </label>
                                    <textarea
                                        className="w-full text-sm px-3 py-2 rounded-lg border border-emerald-200 bg-white text-gray-900 placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 focus:border-emerald-400 transition-all resize-none h-24"
                                        placeholder="What was discussed during the callback..."
                                        value={data.callback_description}
                                        onChange={(e) => setData('callback_description', e.target.value)}
                                    />
                                    {errors.callback_description && <p className="text-xs text-red-500">{errors.callback_description}</p>}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── SUBMIT ── */}
                    <div className="flex items-center justify-between pt-1">
                        <Link
                            href={route('call-records.index')}
                            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 disabled:bg-gray-400 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors duration-150 shadow-sm"
                        >
                            {processing ? (
                                <>
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                    </svg>
                                    Update record
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
