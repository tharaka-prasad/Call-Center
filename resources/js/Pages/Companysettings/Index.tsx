import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface District {
    id: number;
    districtName: string;
}

interface Reason {
    id: number;
    reason: string;
}

interface Company {
    id: number;
    companyName: string;
}
interface ProductModel {
    id?: number;
    productModel: string;
    price: number;
    description?: string;
}

interface Product {
    id: number;
    productName: string;
    models: ProductModel[];
}

interface Props {
    districts?: District[];
    reasons?: Reason[];
    companies?: Company[];
    products?: Product[];
    flash?: { success?: string };
}


// ─── ICONS ───────────────────────────────────────────────────────────────────

const Icon = {
    company: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    config: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" /></svg>,
    users: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    profile: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    system: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" /></svg>,
    chevron: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>,
    right: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>,
    product: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" /></svg>,
    district: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    reason: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>,
    password: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    notif: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
    activity: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
    role: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    edit: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    trash: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    plus: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>,
    check: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
    x: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>,
};

// ─── NAV STRUCTURE ───────────────────────────────────────────────────────────

const NAV_SECTIONS = [
    {
        id: 'company', label: 'Company Settings', icon: Icon.company,
        items: [
            { id: 'company-general', label: 'General Info', icon: Icon.company },
        ],
    },
    {
        id: 'config', label: 'Configuration', icon: Icon.config,
        items: [
            { id: 'products', label: 'Products & Models', icon: Icon.product },
            { id: 'districts', label: 'Districts', icon: Icon.district },
            { id: 'reasons', label: 'Reasons', icon: Icon.reason },
        ],
    },
    {
        id: 'users', label: 'User Management', icon: Icon.users,
        items: [
            { id: 'users-list', label: 'Users', icon: Icon.users },
            { id: 'roles', label: 'Roles & Permissions', icon: Icon.role },
        ],
    },
    {
        id: 'profile', label: 'My Profile', icon: Icon.profile,
        items: [
            { id: 'profile-edit', label: 'Edit Profile', icon: Icon.profile },
            { id: 'password', label: 'Change Password', icon: Icon.password },
        ],
    },
    {
        id: 'system', label: 'System', icon: Icon.system,
        items: [
            { id: 'notifications', label: 'Notifications', icon: Icon.notif },
            { id: 'activity', label: 'Activity Log', icon: Icon.activity },
        ],
    },
];

// ─── CONTENT MAP ─────────────────────────────────────────────────────────────

const CONTENT: Record<string, {
    title: string;
    description: string;
    color: string;
    badge: string;
    items: { label: string; desc: string; icon: JSX.Element; comingSoon?: boolean }[];
}> = {
    products: {
        title: 'Products & Models',
        color: 'violet',
        badge: 'bg-violet-50 border-violet-100 text-violet-600',
        items: [
            { label: 'All Products', desc: 'View and manage product list', icon: Icon.product },
            { label: 'Add Product', desc: 'Create a new product', icon: Icon.product },
        ],
        description: ''
    },
    'users-list': {
        title: 'Users', description: 'Manage system users and their access.',
        color: 'sky', badge: 'bg-sky-50 border-sky-100 text-sky-600',
        items: [
            { label: 'All Users', desc: 'View and manage users', icon: Icon.users },
            { label: 'Add User', desc: 'Create a new user', icon: Icon.users },
        ],
    },
    roles: {
        title: 'Roles & Permissions', description: 'Control what each user role can access and do.',
        color: 'indigo', badge: 'bg-indigo-50 border-indigo-100 text-indigo-600',
        items: [
            { label: 'All Roles', desc: 'View and manage roles', icon: Icon.role },
            { label: 'Add Role', desc: 'Create a new role', icon: Icon.role },
        ],
    },
    'profile-edit': {
        title: 'Edit Profile', description: 'Update your personal information and preferences.',
        color: 'pink', badge: 'bg-pink-50 border-pink-100 text-pink-600',
        items: [
            { label: 'Edit Profile', desc: 'Change name, email, avatar', icon: Icon.profile },
        ],
    },
    password: {
        title: 'Change Password', description: 'Update your account login password.',
        color: 'red', badge: 'bg-red-50 border-red-100 text-red-600',
        items: [
            { label: 'Change Password', desc: 'Update your login password', icon: Icon.password },
        ],
    },
    notifications: {
        title: 'Notification Settings', description: 'Configure how and when you receive notifications.',
        color: 'yellow', badge: 'bg-yellow-50 border-yellow-100 text-yellow-600',
        items: [
            { label: 'Notification Preferences', desc: 'Email and system alerts', icon: Icon.notif, comingSoon: true },
        ],
    },
    activity: {
        title: 'Activity Log', description: 'View a history of all actions taken in the system.',
        color: 'gray', badge: 'bg-gray-50 border-gray-200 text-gray-600',
        items: [
            { label: 'View Activity Log', desc: 'Full audit trail of system actions', icon: Icon.activity, comingSoon: true },
        ],
    },
};

// ─── REUSABLE CRUD PANEL ─────────────────────────────────────────────────────
// District, Reason, Company යන තුනටම same pattern — generic component එකක්

interface CrudItem {
    id: number;
    label: string; // display value
}

interface CrudPanelProps {
    title: string;
    description: string;
    accentColor: string;         // tailwind text color e.g. 'text-emerald-500'
    icon: JSX.Element;
    placeholder: string;
    items: CrudItem[];
    storeRoute: string;
    updateRoute: string;
    destroyRoute: string;
    fieldKey: string;            // the form field name e.g. 'districtName'
}

function CrudPanel({
    title, description, accentColor, icon, placeholder,
    items, storeRoute, updateRoute, destroyRoute, fieldKey,
}: CrudPanelProps) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const addForm = useForm<Record<string, string>>({ [fieldKey]: '' });
    const editForm = useForm<Record<string, string>>({ [fieldKey]: '' });

    const handleAdd = () => {
        addForm.post(route(storeRoute), {
            preserveScroll: true,
            onSuccess: () => addForm.reset(),
        });
    };

    const startEdit = (item: CrudItem) => {
        setEditingId(item.id);
        editForm.setData(fieldKey, item.label);
    };

    const handleUpdate = (id: number) => {
        editForm.put(route(updateRoute, id), {
            preserveScroll: true,
            onSuccess: () => setEditingId(null),
        });
    };

    const handleDelete = (id: number) => {
        router.delete(route(destroyRoute, id), {
            preserveScroll: true,
            onSuccess: () => setDeletingId(null),
        });
    };

    return (
        <div className="space-y-5">
            <div className="pb-4 border-b border-gray-100">
                <h3 className="text-base font-bold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-400 mt-0.5">{description}</p>
            </div>

            {/* Add Form */}
            <div className="flex gap-2">
                <div className="flex-1">
                    <input
                        type="text"
                        value={addForm.data[fieldKey]}
                        onChange={e => addForm.setData(fieldKey, e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleAdd()}
                        placeholder={placeholder}
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-all ${addForm.errors[fieldKey] ? 'border-red-300' : 'border-gray-200'
                            }`}
                    />
                    {addForm.errors[fieldKey] && (
                        <p className="text-xs text-red-500 mt-1 pl-1">{addForm.errors[fieldKey]}</p>
                    )}
                </div>
                <button
                    onClick={handleAdd}
                    disabled={addForm.processing || !addForm.data[fieldKey].trim()}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-900 hover:bg-gray-700 disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                    {Icon.plus} Add
                </button>
            </div>

            {/* List */}
            <div className="space-y-2">
                {items.length === 0 && (
                    <div className="text-center py-10 text-gray-300">
                        <div className="flex justify-center mb-2">{icon}</div>
                        <p className="text-sm">No items yet. Add one above.</p>
                    </div>
                )}

                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
                    >
                        <span className={`flex-shrink-0 ${accentColor}`}>{icon}</span>

                        {editingId === item.id ? (
                            <>
                                <input
                                    autoFocus
                                    type="text"
                                    value={editForm.data[fieldKey]}
                                    onChange={e => editForm.setData(fieldKey, e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') handleUpdate(item.id);
                                        if (e.key === 'Escape') setEditingId(null);
                                    }}
                                    className={`flex-1 px-2.5 py-1.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-900/10 bg-white transition-all ${editForm.errors[fieldKey] ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                />
                                {editForm.errors[fieldKey] && (
                                    <p className="text-xs text-red-500">{editForm.errors[fieldKey]}</p>
                                )}
                                <button
                                    onClick={() => handleUpdate(item.id)}
                                    disabled={editForm.processing}
                                    className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors"
                                    title="Save"
                                >{Icon.check}</button>
                                <button
                                    onClick={() => setEditingId(null)}
                                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
                                    title="Cancel"
                                >{Icon.x}</button>
                            </>
                        ) : deletingId === item.id ? (
                            <>
                                <span className="flex-1 text-sm text-red-500 font-medium">
                                    Delete "{item.label}"?
                                </span>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition-colors"
                                >Delete</button>
                                <button
                                    onClick={() => setDeletingId(null)}
                                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
                                >{Icon.x}</button>
                            </>
                        ) : (
                            <>
                                <span className="flex-1 text-sm font-medium text-gray-800">{item.label}</span>
                                <button
                                    onClick={() => startEdit(item)}
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                                    title="Edit"
                                >{Icon.edit}</button>
                                <button
                                    onClick={() => setDeletingId(item.id)}
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                    title="Delete"
                                >{Icon.trash}</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── PAGE CONTENT ─────────────────────────────────────────────────────────────
function ProductPanel({ products }: { products: Product[] }) {
    const { data, setData, post, processing, reset } = useForm({
        productName: '',
        models: [
            {
                productModel: '',
                price: '',
                description: '',
            },
        ],
    });

    const addModelRow = () => {
        setData('models', [
            ...data.models,
            {
                productModel: '',
                price: '',
                description: '',
            },
        ]);
    };

    const removeModelRow = (index: number) => {
        setData(
            'models',
            data.models.filter((_, i) => i !== index)
        );
    };

    const saveProduct = () => {
        post('/products', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="space-y-6">

            <div>
                <h3 className="text-lg font-bold">
                    Product & Models
                </h3>
            </div>

            <div className="space-y-4">

                <input
                    type="text"
                    placeholder="Product Name"
                    value={data.productName}
                    onChange={(e) =>
                        setData('productName', e.target.value)
                    }
                    className="w-full border rounded-lg px-3 py-2"
                />

                {data.models.map((model, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-4 gap-2 border p-3 rounded-lg"
                    >
                        <input
                            type="text"
                            placeholder="Model"
                            value={model.productModel}
                            onChange={(e) => {
                                const updated = [...data.models];
                                updated[index].productModel =
                                    e.target.value;
                                setData('models', updated);
                            }}
                            className="border rounded px-2 py-2"
                        />

                        <input
                            type="number"
                            placeholder="Price"
                            value={model.price}
                            onChange={(e) => {
                                const updated = [...data.models];
                                updated[index].price =
                                    e.target.value;
                                setData('models', updated);
                            }}
                            className="border rounded px-2 py-2"
                        />


                        <button
                            type="button"
                            onClick={() =>
                                removeModelRow(index)
                            }
                            className="bg-red-500 text-white rounded px-3"
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addModelRow}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Model
                </button>

                <button
                    type="button"
                    onClick={saveProduct}
                    disabled={processing}
                    className="bg-green-600 text-white px-5 py-2 rounded ml-2"
                >
                    Save Product
                </button>
            </div>

            <hr />

            <div className="space-y-3">
                <h4 className="font-semibold">
                    Existing Products
                </h4>

                {products.map((product) => (
                    <div
                        key={product.id}
                        className="border rounded-lg p-4"
                    >
                        <div className="font-bold">
                            {product.productName}
                        </div>

                        <table className="w-full mt-3 border-collapse">
                            <thead>
                                <tr className="text-left border-b">
                                    <th className="py-2 px-3">Model</th>
                                    <th className="py-2 px-3">Price</th>
                                </tr>
                            </thead>

                            <tbody>
                                {product.models.map((m, i) => (
                                    <tr key={i} className="border-b">
                                        <td className="py-2 px-3">{m.productModel}</td>
                                        <td className="py-2 px-3">{m.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>

        </div>
    );
}
function PageContent({
    activeId, districts, reasons, companies, products
}: {
    activeId: string;
    districts: District[];
    reasons: Reason[];
    companies: Company[];
    products: Product[]
}) {
    if (activeId === 'products') {
        return (
            <ProductPanel
                products={products}
            />
        );
    }
    if (activeId === 'districts') return (
        <CrudPanel
            key="districts"
            title="Districts"
            description="Manage district list used for customer location."
            accentColor="text-emerald-500"
            icon={Icon.district}
            placeholder="New district name…"
            items={districts.map(d => ({ id: d.id, label: d.districtName }))}
            storeRoute="districts.store"
            updateRoute="districts.update"
            destroyRoute="districts.destroy"
            fieldKey="districtName"
        />
    );

    if (activeId === 'reasons') return (
        <CrudPanel
            key="reasons"
            title="Reasons"
            description="Manage call reasons / remarks used in call records."
            accentColor="text-orange-500"
            icon={Icon.reason}
            placeholder="New reason…"
            items={reasons.map(r => ({ id: r.id, label: r.reason }))}
            storeRoute="reasons.store"
            updateRoute="reasons.update"
            destroyRoute="reasons.destroy"
            fieldKey="reason"
        />
    );

    if (activeId === 'company-general') return (
        <CrudPanel
            key="company-general"
            title="Company Names"
            description="Manage company names used in call records."
            accentColor="text-blue-500"
            icon={Icon.company}
            placeholder="New company name…"
            items={companies.map(c => ({ id: c.id, label: c.companyName }))}
            storeRoute="company.store"
            updateRoute="company.update"
            destroyRoute="company.destroy"
            fieldKey="companyName"
        />
    );

    const content = CONTENT[activeId];

    if (!content) return (
        <div className="flex flex-col items-center justify-center h-64 text-gray-300 gap-3">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
            <p className="text-sm font-medium">Select a setting from the left menu</p>
        </div>
    );

    return (
        <div className="space-y-5">
            <div className="pb-4 border-b border-gray-100">
                <h3 className="text-base font-bold text-gray-900">{content.title}</h3>
                <p className="text-sm text-gray-400 mt-0.5">{content.description}</p>
            </div>
            <div className="space-y-2.5">
                {content.items.map((item, i) => (
                    <div key={i} className="group flex items-center gap-4 p-4 bg-gray-50 hover:bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-150 cursor-pointer">
                        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${content.badge}`}>
                            {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                        </div>
                        {item.comingSoon
                            ? <span className="flex-shrink-0 text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-400 border border-gray-200">Coming soon</span>
                            : <span className="flex-shrink-0 text-gray-300 group-hover:text-gray-500 transition-colors">{Icon.right}</span>
                        }
                    </div>
                ))}
            </div>
            {content.items.every(i => i.comingSoon) && (
                <p className="text-xs text-gray-400 text-center pt-2">This section will be available soon.</p>
            )}
        </div>
    );
}
// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function Settings({
    districts = [],
    reasons = [],
    companies = [],
    products = [],
    flash,
}: Props) {
    const [openSections, setOpenSections] = useState<string[]>(['company', 'config', 'profile']);
    const [activeItem, setActiveItem] = useState<string>('company-general');

    const toggle = (id: string) =>
        setOpenSections(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center shadow-sm">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-gray-900 leading-tight">Settings</h2>
                        <p className="text-xs text-gray-400">Manage system configuration</p>
                    </div>
                </div>
            }
        >
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="max-w-5xl mx-auto">

                    {flash?.success && (
                        <div className="mb-4 px-4 py-3 bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium rounded-xl flex items-center gap-2">
                            {Icon.check} {flash.success}
                        </div>
                    )}

                    <div className="flex gap-5 items-start">

                        {/* ── LEFT SIDEBAR ── */}
                        <div className="w-60 flex-shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden sticky top-6">
                            <div className="px-4 py-3.5 border-b border-gray-100 bg-gray-50/60">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Settings Menu</p>
                            </div>
                            <nav className="py-2">
                                {NAV_SECTIONS.map((section) => {
                                    const isOpen = openSections.includes(section.id);
                                    return (
                                        <div key={section.id}>
                                            <button
                                                type="button"
                                                onClick={() => toggle(section.id)}
                                                className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-gray-50 transition-colors group"
                                            >
                                                <div className="flex items-center gap-2.5">
                                                    <span className="text-gray-400 group-hover:text-gray-600">{section.icon}</span>
                                                    <span className="text-xs font-bold text-gray-700 group-hover:text-gray-900">{section.label}</span>
                                                </div>
                                                <span className={`text-gray-300 transition-transform duration-200 ${isOpen ? '' : '-rotate-90'}`}>
                                                    {Icon.chevron}
                                                </span>
                                            </button>
                                            {isOpen && (
                                                <div className="pb-1">
                                                    {section.items.map((item) => {
                                                        const active = activeItem === item.id;
                                                        return (
                                                            <button
                                                                key={item.id}
                                                                type="button"
                                                                onClick={() => setActiveItem(item.id)}
                                                                className={`w-full flex items-center gap-2.5 pl-9 pr-4 py-2 text-left transition-all duration-100 ${active
                                                                    ? 'bg-gray-900 text-white'
                                                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                                                                    }`}
                                                            >
                                                                <span className={active ? 'text-white' : 'text-gray-400'}>{item.icon}</span>
                                                                <span className="text-xs font-medium truncate">{item.label}</span>
                                                                {active && <span className="ml-auto">{Icon.right}</span>}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* ── RIGHT CONTENT ── */}
                        <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-6 min-h-96">
                            <PageContent
                                activeId={activeItem}
                                districts={districts}
                                reasons={reasons}
                                companies={companies}
                                products={products}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
