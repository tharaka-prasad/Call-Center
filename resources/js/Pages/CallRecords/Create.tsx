import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Link } from '@inertiajs/react';

interface Props {
    reasons: any[];
    products: any[];
}

export default function Create({ reasons = [], products = [] }: Props) {

    const { data, setData, post, processing, errors } = useForm({
        CustomerName: '',
        CustomerPhoneNumber: '',
        CustomerAddress: '',
        CustomerEmail: '',
        reason_id: '',
        product: '',
        CustomerCompany: '',
        status: 'pending',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('call-records.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Call Record
                </h2>
            }
        >
            <div className="py-6 px-6">
                <div className="max-w-5xl mx-auto">

                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                New Call Record
                            </h1>
                            <p className="text-gray-500 mt-1">
                                Add customer call details and follow-up information
                            </p>
                        </div>

                        <Link
                            href={route('call-records.index')}
                            className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
                        >
                            Back
                        </Link>
                    </div>

                    <form onSubmit={submit}>
                        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

                            {/* Card Header */}
                            <div className="border-b px-6 py-4 bg-gray-50">
                                <h3 className="font-semibold text-lg">
                                    Customer Information
                                </h3>
                            </div>

                            {/* Form Body */}
                            <div className="p-6">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                    {/* Customer Name */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium">
                                            Customer Name *
                                        </label>

                                        <input
                                            type="text"
                                            value={data.CustomerName}
                                            onChange={(e) =>
                                                setData('CustomerName', e.target.value)
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                        />

                                        {errors.CustomerName && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.CustomerName}
                                            </p>
                                        )}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium">
                                            Phone Number *
                                        </label>

                                        <input
                                            type="text"
                                            value={data.CustomerPhoneNumber}
                                            onChange={(e) =>
                                                setData(
                                                    'CustomerPhoneNumber',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            value={data.CustomerEmail}
                                            onChange={(e) =>
                                                setData('CustomerEmail', e.target.value)
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                        />
                                    </div>

                                    {/* Company */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium">
                                            Company
                                        </label>

                                        <input
                                            type="text"
                                            value={data.CustomerCompany}
                                            onChange={(e) =>
                                                setData(
                                                    'CustomerCompany',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                        />
                                    </div>

                                    {/* Reason */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium">
                                            Reason
                                        </label>

                                        <select
                                            value={data.reason_id}
                                            onChange={(e) =>
                                                setData(
                                                    'reason_id',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                        >
                                            <option value="">
                                                Select Reason
                                            </option>

                                            {reasons.map((reason) => (
                                                <option
                                                    key={reason.id}
                                                    value={reason.id}
                                                >
                                                    {reason.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Product */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium">
                                            Product
                                        </label>

                                        <select
                                            value={data.product}
                                            onChange={(e) =>
                                                setData(
                                                    'product',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                        >
                                            <option value="">
                                                Select Product
                                            </option>

                                            {products.map((product) => (
                                                <option
                                                    key={product.id}
                                                    value={product.name}
                                                >
                                                    {product.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium">
                                            Status
                                        </label>

                                        <select
                                            value={data.status}
                                            onChange={(e) =>
                                                setData('status', e.target.value)
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                        >
                                            <option value="pending">
                                                Pending
                                            </option>
                                            <option value="complete">
                                                Complete
                                            </option>
                                            <option value="close">
                                                Close
                                            </option>
                                            <option value="fail">
                                                Fail
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="mt-5">
                                    <label className="block mb-2 text-sm font-medium">
                                        Address
                                    </label>

                                    <textarea
                                        rows={4}
                                        value={data.CustomerAddress}
                                        onChange={(e) =>
                                            setData(
                                                'CustomerAddress',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                    />
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="border-t bg-gray-50 px-6 py-4 flex justify-end gap-3">
                                <Link
                                    href={route('call-records.index')}
                                    className="rounded-lg bg-gray-200 px-5 py-2 text-gray-700 hover:bg-gray-300"
                                >
                                    Cancel
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700 disabled:opacity-50"
                                >
                                    {processing
                                        ? 'Saving...'
                                        : 'Save Call Record'}
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
