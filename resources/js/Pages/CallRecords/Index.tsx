import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function Index({ calls = [] }: any) {
    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'complete':
                return { dot: 'bg-emerald-400', bg: 'bg-emerald-500/10 text-emerald-600 border-emerald-200', label: 'Complete' };
            case 'pending':
                return { dot: 'bg-amber-400', bg: 'bg-amber-500/10 text-amber-600 border-amber-200', label: 'Pending' };
            case 'close':
                return { dot: 'bg-blue-400', bg: 'bg-blue-500/10 text-blue-600 border-blue-200', label: 'Closed' };
            case 'fail':
                return { dot: 'bg-red-400', bg: 'bg-red-500/10 text-red-600 border-red-200', label: 'Failed' };
            default:
                return { dot: 'bg-gray-400', bg: 'bg-gray-100 text-gray-600 border-gray-200', label: status };
        }
    };

    const stats = [
        {
            label: 'Total Calls',
            value: calls.length,
            color: 'text-gray-900',
            icon: (
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            bar: 'bg-gray-400',
            iconBg: 'bg-gray-100',
        },
        {
            label: 'Pending',
            value: calls.filter((c: any) => c.status === 'pending').length,
            color: 'text-amber-600',
            icon: (
                <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
            ),
            bar: 'bg-amber-400',
            iconBg: 'bg-amber-50',
        },
        {
            label: 'Completed',
            value: calls.filter((c: any) => c.status === 'complete').length,
            color: 'text-emerald-600',
            icon: (
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            bar: 'bg-emerald-400',
            iconBg: 'bg-emerald-50',
        },
        {
            label: 'Failed',
            value: calls.filter((c: any) => c.status === 'fail').length,
            color: 'text-red-600',
            icon: (
                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            bar: 'bg-red-400',
            iconBg: 'bg-red-50',
        },
    ];

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
                </div>
            }
        >
            <div className="py-6 px-6 bg-gray-50 min-h-screen">
                <div className="mx-auto max-w-7xl space-y-5">

                    {/* Header bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search customer..."
                                className="pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 w-64 transition-all shadow-sm"
                            />
                        </div>
                        <Link
                            href={route('call-records.create')}
                            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white font-semibold hover:bg-gray-700 transition-colors shadow-sm"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            New Call
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {stats.map((stat) => (
                            <div key={stat.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{stat.label}</span>
                                    <div className={`w-8 h-8 rounded-lg ${stat.iconBg} flex items-center justify-center`}>
                                        {stat.icon}
                                    </div>
                                </div>
                                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                                <div className="mt-3 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${stat.bar} transition-all duration-700`}
                                        style={{ width: calls.length > 0 ? `${(stat.value / calls.length) * 100}%` : '0%' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-800">All Records</span>
                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">{calls.length} total</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    {/* ✅ BLACK BOLD HEADER */}
                                    <tr className="bg-gray-900">
                                        <th className="px-5 py-3.5 text-left text-xs font-bold text-white uppercase tracking-wider">
                                            Customer
                                        </th>
                                        <th className="px-5 py-3.5 text-left text-xs font-bold text-white uppercase tracking-wider">
                                            Phone
                                        </th>
                                        <th className="px-5 py-3.5 text-left text-xs font-bold text-white uppercase tracking-wider">
                                            Address
                                        </th>
                                        <th className="px-5 py-3.5 text-left text-xs font-bold text-white uppercase tracking-wider">
                                            Product
                                        </th>
                                        <th className="px-5 py-3.5 text-left text-xs font-bold text-white uppercase tracking-wider">
                                            Model
                                        </th>
                                        <th className="px-5 py-3.5 text-left text-xs font-bold text-white uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="px-5 py-3.5 text-left text-xs font-bold text-white uppercase tracking-wider">
                                            Discount Price
                                        </th>
                                        <th className="px-5 py-3.5 text-left text-xs font-bold text-white uppercase tracking-wider">
                                            Next Call Date
                                        </th>
                                        <th className="px-5 py-3.5 text-left text-xs font-bold text-white uppercase tracking-wider">
                                            Closing Date
                                        </th>
                                        <th className="px-5 py-3.5 text-left text-xs font-bold text-white uppercase tracking-wider">
                                            Remark
                                        </th>
                                        <th className="px-5 py-3.5 text-left text-xs font-bold text-white uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-5 py-3.5 text-center text-xs font-bold text-white uppercase tracking-wider">
                                            Created By
                                        </th>
                                        <th className="px-5 py-3.5 text-center text-xs font-bold text-white uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {calls.length > 0 ? (
                                        calls.map((call: any) => {
                                            const status = getStatusConfig(call.status);
                                            return (
                                                <tr key={call.id} className="hover:bg-gray-50/70 transition-colors group">
                                                    <td className="px-5 py-3.5">
                                                        <div className="flex items-center gap-2.5">
                                                            <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                                                                <span className="text-xs font-bold text-white">
                                                                    {call.customerName?.charAt(0)?.toUpperCase() ?? '?'}
                                                                </span>
                                                            </div>
                                                            <span className="text-sm font-semibold text-gray-800">{call.customerName}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-3.5 text-sm text-gray-500 font-medium">
                                                        {call.customerPhoneNumber}
                                                    </td>
                                                    <td className="px-5 py-3.5 text-sm text-gray-500">
                                                        {call.customerAddress || '-'}
                                                    </td>
                                                    <td className="px-5 py-3.5 text-sm text-gray-500">
                                                        {call.product?.productName || '-'}
                                                    </td>
                                                    <td className="px-5 py-3.5 text-sm text-gray-500">
                                                        {call.productModel?.productModel || '-'}
                                                    </td>
                                                    <td className="px-5 py-3.5 text-sm font-semibold text-gray-700">
                                                        Rs. {Number(call.productPrice ?? 0).toLocaleString()}
                                                    </td>
                                                    <td className="px-5 py-3.5 text-sm font-semibold text-emerald-600">
                                                        Rs. {Number(call.discountPrice ?? 0).toLocaleString()}
                                                    </td>
                                                    <td className="px-5 py-3.5 text-sm text-gray-500">
                                                        {call.callback_date
                                                            ? new Date(call.callback_date).toLocaleDateString()
                                                            : '-'}
                                                    </td>
                                                    <td className="px-5 py-3.5 text-sm text-gray-500">
                                                        {call.closeDate
                                                            ? new Date(call.closeDate).toLocaleDateString()
                                                            : '-'}
                                                    </td>
                                                    <td className="px-5 py-3.5 text-sm text-gray-500">
                                                        {call.reason?.reason || '-'}
                                                    </td>
                                                    <td className="px-5 py-3.5">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${status.bg}`}>
                                                            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                                                            {status.label}
                                                        </span>
                                                    </td>
                                                    <td className="px-5 py-3.5 text-sm text-gray-500 text-center">
                                                        {call.creator?.firstName || '-'} {call.creator?.lastName || '-'}
                                                    </td>
                                                    <td className="px-5 py-3.5">
                                                        <div className="flex justify-center gap-1.5">
                                                            <Link
                                                                href={route('call-records.show', call.id)}
                                                                className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 hover:border-emerald-500 hover:text-white hover:bg-emerald-500 transition-all shadow-sm"
                                                            >
                                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                </svg>
                                                                View
                                                            </Link>
                                                            <Link
                                                                href={route('call-records.edit', call.id)}
                                                                className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 hover:border-emerald-500 hover:text-white hover:bg-emerald-500 transition-all shadow-sm"
                                                            >
                                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                </svg>
                                                                Edit
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={13} className="py-16 text-center">
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                                                        <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                        </svg>
                                                    </div>
                                                    <p className="text-sm font-semibold text-gray-500">No call records found</p>
                                                    <p className="text-xs text-gray-300">Create your first call to get started</p>
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
