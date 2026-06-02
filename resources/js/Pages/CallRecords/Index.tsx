import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function Index({ calls = [] }: any) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'complete':
                return 'bg-green-100 text-green-700';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700';
            case 'close':
                return 'bg-blue-100 text-blue-700';
            case 'fail':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Call Records
                </h2>
            }
        >
            <div className="py-6 px-6">
                <div className="mx-auto max-w-7xl">

                    {/* Top Card */}
                    <div className="mb-6 rounded-xl bg-white p-6 shadow-sm border">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">
                                    Call Records
                                </h1>

                                <p className="text-gray-500 mt-1">
                                    Manage customer calls and follow-ups
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="Search customer..."
                                    className="rounded-lg border px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                />

                                <Link
                                    href={route('call-records.create')}
                                    className="rounded-lg bg-blue-600 px-5 py-2 text-white font-medium hover:bg-blue-700"
                                >
                                    + New Call
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

                        <div className="bg-white border rounded-xl p-5 shadow-sm">
                            <h4 className="text-gray-500 text-sm">
                                Total Calls
                            </h4>
                            <p className="text-3xl font-bold mt-2">
                                {calls.length}
                            </p>
                        </div>

                        <div className="bg-white border rounded-xl p-5 shadow-sm">
                            <h4 className="text-gray-500 text-sm">
                                Pending
                            </h4>
                            <p className="text-3xl font-bold text-yellow-600 mt-2">
                                {
                                    calls.filter(
                                        (c: any) => c.status === 'pending'
                                    ).length
                                }
                            </p>
                        </div>

                        <div className="bg-white border rounded-xl p-5 shadow-sm">
                            <h4 className="text-gray-500 text-sm">
                                Completed
                            </h4>
                            <p className="text-3xl font-bold text-green-600 mt-2">
                                {
                                    calls.filter(
                                        (c: any) => c.status === 'complete'
                                    ).length
                                }
                            </p>
                        </div>

                        <div className="bg-white border rounded-xl p-5 shadow-sm">
                            <h4 className="text-gray-500 text-sm">
                                Failed
                            </h4>
                            <p className="text-3xl font-bold text-red-600 mt-2">
                                {
                                    calls.filter(
                                        (c: any) => c.status === 'fail'
                                    ).length
                                }
                            </p>
                        </div>
                    </div>

                    {/* Table Card */}
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm border">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                            Customer
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                            Phone Number
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                            Company
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                            Product
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {calls.length > 0 ? (
                                        calls.map((call: any) => (
                                            <tr
                                                key={call.id}
                                                className="border-t hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-gray-800">
                                                        {call.CustomerName}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    {call.CustomerPhoneNumber}
                                                </td>

                                                <td className="px-6 py-4">
                                                    {call.CustomerCompany}
                                                </td>

                                                <td className="px-6 py-4">
                                                    {call.product}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                                            call.status
                                                        )}`}
                                                    >
                                                        {call.status}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex justify-center gap-2">
                                                        <button className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600">
                                                            View
                                                        </button>

                                                        <button className="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600">
                                                            Edit
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="py-10 text-center text-gray-500"
                                            >
                                                No Call Records Found
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
