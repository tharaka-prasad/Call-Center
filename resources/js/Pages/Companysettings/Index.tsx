import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import { useForm, router, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface District { id: number; districtName: string; }
interface Reason   { id: number; reason: string; }
interface Company  { id: number; companyName: string; }
interface ProductModel { id?: number; productModel: string; price: number; description?: string; }
interface Product  { id: number; productName: string; models: ProductModel[]; }

interface UserItem {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'companyadmin' | 'argent' | 'superadmin';
    status: 'active' | 'inactive';
    companyid: number;
}

interface Props extends PageProps {
    districts?: District[];
    reasons?: Reason[];
    companies?: Company[];
    products?: Product[];
    users?: UserItem[];
    flash?: { success?: string; error?: string };
    auth: { user: UserItem };
}

// ─── ICONS ───────────────────────────────────────────────────────────────────

const Icon = {
    company:  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    config:   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" /></svg>,
    users:    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    profile:  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    system:   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" /></svg>,
    chevron:  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>,
    right:    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>,
    product:  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" /></svg>,
    district: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    reason:   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>,
    password: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    notif:    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
    activity: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
    role:     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    edit:     <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    trash:    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    plus:     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>,
    check:    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
    x:        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>,
};

// ─── NAV STRUCTURE ───────────────────────────────────────────────────────────

const NAV_SECTIONS = [
    {
        id: 'company', label: 'Company Settings', icon: Icon.company,
        items: [{ id: 'company-general', label: 'General Info', icon: Icon.company }],
    },
    {
        id: 'config', label: 'Configuration', icon: Icon.config,
        items: [
            { id: 'products',  label: 'Products & Models', icon: Icon.product },
            { id: 'districts', label: 'Districts',         icon: Icon.district },
            { id: 'reasons',   label: 'Reasons',           icon: Icon.reason },
        ],
    },
    {
        id: 'users', label: 'User Management', icon: Icon.users,
        items: [{ id: 'users-list', label: 'Users', icon: Icon.users }],
    },
    {
        id: 'profile', label: 'My Profile', icon: Icon.profile,
        items: [
            { id: 'profile-edit', label: 'Edit Profile',    icon: Icon.profile },
            { id: 'password',     label: 'Change Password', icon: Icon.password },
        ],
    },
    {
        id: 'system', label: 'System', icon: Icon.system,
        items: [
            { id: 'notifications', label: 'Notifications', icon: Icon.notif },
            { id: 'activity',      label: 'Activity Log',  icon: Icon.activity },
        ],
    },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const inputClass = 'w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-all';
const labelClass = 'block text-xs font-semibold text-gray-600 mb-1.5';

const ROLE_BADGE: Record<string, string> = {
    superadmin:   'bg-purple-50 text-purple-700 border-purple-200',
    companyadmin: 'bg-blue-50 text-blue-700 border-blue-200',
    argent:       'bg-gray-50 text-gray-600 border-gray-200',
};
const ROLE_LABEL: Record<string, string> = {
    superadmin:   'Super Admin',
    companyadmin: 'Company Admin',
    argent:       'Agent',
};
const STATUS_BADGE: Record<string, string> = {
    active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    inactive: 'bg-red-50 text-red-600 border-red-200',
};

// ─── USER PANEL ──────────────────────────────────────────────────────────────

function UserPanel({
    users,
    authUser,
    companies,
}: {
    users: UserItem[];
    authUser: UserItem;
    companies: Company[];
}) {
    const [mode, setMode]               = useState<'list' | 'add' | 'edit'>('list');
    const [editingUser, setEditingUser] = useState<UserItem | null>(null);
    const [deletingId, setDeletingId]   = useState<number | null>(null);

    const addForm = useForm({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'argent',
        status: 'active',
        companyid: authUser.role === 'superadmin' ? '' : String(authUser.companyid),
    });

    const editForm = useForm({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'argent' as string,
        status: 'active' as string,
        companyid: '' as string,
    });

    const startEdit = (u: UserItem) => {
        setEditingUser(u);
        editForm.setData({
            firstName: u.firstName,
            lastName:  u.lastName,
            email:     u.email,
            password:  '',
            role:      u.role,
            status:    u.status,
            companyid: String(u.companyid),
        });
        setMode('edit');
    };

    const handleAdd = () => {
        addForm.post(route('users.store'), {
            preserveScroll: true,
            onSuccess: () => {
                addForm.reset();
                if (authUser.role !== 'superadmin') {
                    addForm.setData('companyid', String(authUser.companyid));
                }
                setMode('list');
            },
        });
    };

    const handleUpdate = () => {
        if (!editingUser) return;
        editForm.put(route('users.update', editingUser.id), {
            preserveScroll: true,
            onSuccess: () => {
                setMode('list');
                setEditingUser(null);
            },
        });
    };

    const handleDelete = (id: number) => {
        router.delete(route('users.destroy', id), {
            preserveScroll: true,
            onSuccess: () => setDeletingId(null),
        });
    };

    // ── FORM (Add / Edit) ──
    if (mode === 'add' || mode === 'edit') {
        const form     = mode === 'add' ? addForm : editForm;
        const onSubmit = mode === 'add' ? handleAdd : handleUpdate;
        const title    = mode === 'add'
            ? 'Add New User'
            : `Edit — ${editingUser?.firstName} ${editingUser?.lastName}`;

        return (
            <div className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div>
                        <h3 className="text-base font-bold text-gray-900">{title}</h3>
                        <p className="text-sm text-gray-400 mt-0.5">
                            {mode === 'add' ? 'Create a new system user.' : 'Update user details.'}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setMode('list')}
                        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors"
                    >
                        {Icon.x} Cancel
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* First Name */}
                    <div>
                        <label className={labelClass}>First name</label>
                        <input
                            className={inputClass}
                            placeholder="First name"
                            value={form.data.firstName}
                            onChange={e => form.setData('firstName', e.target.value)}
                        />
                        {form.errors.firstName && (
                            <p className="text-xs text-red-500 mt-1">{form.errors.firstName}</p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className={labelClass}>Last name</label>
                        <input
                            className={inputClass}
                            placeholder="Last name"
                            value={form.data.lastName}
                            onChange={e => form.setData('lastName', e.target.value)}
                        />
                        {form.errors.lastName && (
                            <p className="text-xs text-red-500 mt-1">{form.errors.lastName}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="col-span-2">
                        <label className={labelClass}>Email</label>
                        <input
                            type="email"
                            className={inputClass}
                            placeholder="user@example.com"
                            value={form.data.email}
                            onChange={e => form.setData('email', e.target.value)}
                        />
                        {form.errors.email && (
                            <p className="text-xs text-red-500 mt-1">{form.errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="col-span-2">
                        <label className={labelClass}>
                            Password{' '}
                            {mode === 'edit' && (
                                <span className="text-gray-400 font-normal">(leave blank to keep current)</span>
                            )}
                        </label>
                        <input
                            type="password"
                            className={inputClass}
                            placeholder={mode === 'add' ? 'Min 6 characters' : 'Leave blank to keep current'}
                            value={form.data.password}
                            onChange={e => form.setData('password', e.target.value)}
                        />
                        {form.errors.password && (
                            <p className="text-xs text-red-500 mt-1">{form.errors.password}</p>
                        )}
                    </div>

                    {/* Role */}
                    <div>
                        <label className={labelClass}>Role</label>
                        <select
                            className={inputClass}
                            value={form.data.role}
                            onChange={e => form.setData('role', e.target.value)}
                        >
                            <option value="argent">Agent</option>
                            <option value="companyadmin">Company Admin</option>
                            {authUser.role === 'superadmin' && (
                                <option value="superadmin">Super Admin</option>
                            )}
                        </select>
                        {form.errors.role && (
                            <p className="text-xs text-red-500 mt-1">{form.errors.role}</p>
                        )}
                    </div>

                    {/* Status */}
                    <div>
                        <label className={labelClass}>Status</label>
                        <select
                            className={inputClass}
                            value={form.data.status}
                            onChange={e => form.setData('status', e.target.value)}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        {form.errors.status && (
                            <p className="text-xs text-red-500 mt-1">{form.errors.status}</p>
                        )}
                    </div>

                    {/* Company — superadmin: dropdown | others: read-only */}
                    <div className="col-span-2">
                        <label className={labelClass}>Company</label>
                        {authUser.role === 'superadmin' ? (
                            <>
                                <select
                                    className={inputClass}
                                    value={form.data.companyid}
                                    onChange={e => form.setData('companyid', e.target.value)}
                                >
                                    <option value="">— Select company —</option>
                                    {companies.map(c => (
                                        <option key={c.id} value={c.id}>
                                            {c.companyName}
                                        </option>
                                    ))}
                                </select>
                                {form.errors.companyid && (
                                    <p className="text-xs text-red-500 mt-1">{form.errors.companyid}</p>
                                )}
                            </>
                        ) : (
                            <div className={`${inputClass} bg-gray-100 text-gray-500 cursor-not-allowed`}>
                                {companies.find(c => c.id === authUser.companyid)?.companyName ?? '—'}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <button
                        type="button"
                        onClick={onSubmit}
                        disabled={form.processing}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-700 disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition-colors"
                    >
                        {Icon.check}
                        {mode === 'add' ? 'Create user' : 'Save changes'}
                    </button>
                </div>
            </div>
        );
    }

    // ── LIST VIEW ──
    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                    <h3 className="text-base font-bold text-gray-900">Users</h3>
                    <p className="text-sm text-gray-400 mt-0.5">
                        {authUser.role === 'superadmin'
                            ? 'All system users.'
                            : 'Users in your company.'}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => setMode('add')}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                    {Icon.plus} Add user
                </button>
            </div>

            {users.length === 0 && (
                <div className="text-center py-12 text-gray-300">
                    <div className="flex justify-center mb-2">{Icon.users}</div>
                    <p className="text-sm">No users found.</p>
                </div>
            )}

            <div className="space-y-2">
                {users.map((u) => (
                    <div
                        key={u.id}
                        className="flex items-center gap-4 px-4 py-3.5 bg-gray-50 hover:bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
                    >
                        {/* Avatar */}
                        <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold text-white">
                                {u.firstName?.charAt(0)?.toUpperCase() ?? '?'}
                            </span>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate">
                                {u.firstName} {u.lastName}
                                {u.id === authUser.id && (
                                    <span className="ml-2 text-xs font-normal text-gray-400">(you)</span>
                                )}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                                {u.email}
                                {authUser.role === 'superadmin' && (
                                    <>
                                        <span className="mx-1.5 text-gray-300">·</span>
                                        <span className="text-gray-400">
                                            {companies.find(c => c.id === u.companyid)?.companyName ?? '—'}
                                        </span>
                                    </>
                                )}
                            </p>
                        </div>

                        {/* Badges */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${ROLE_BADGE[u.role] ?? ROLE_BADGE.argent}`}>
                                {ROLE_LABEL[u.role] ?? u.role}
                            </span>
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_BADGE[u.status]}`}>
                                {u.status === 'active' ? 'Active' : 'Inactive'}
                            </span>
                        </div>

                        {/* Actions */}
                        {deletingId === u.id ? (
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="text-xs text-red-500 font-medium">Delete?</span>
                                <button
                                    onClick={() => handleDelete(u.id)}
                                    className="px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition-colors"
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={() => setDeletingId(null)}
                                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
                                >
                                    {Icon.x}
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1 flex-shrink-0">
                                <button
                                    onClick={() => startEdit(u)}
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                                    title="Edit"
                                >
                                    {Icon.edit}
                                </button>
                                {u.id !== authUser.id && (
                                    <button
                                        onClick={() => setDeletingId(u.id)}
                                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                        title="Delete"
                                    >
                                        {Icon.trash}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── CRUD PANEL ───────────────────────────────────────────────────────────────

interface CrudItem { id: number; label: string; }
interface CrudPanelProps {
    title: string; description: string; accentColor: string;
    icon: JSX.Element; placeholder: string; items: CrudItem[];
    storeRoute: string; updateRoute: string; destroyRoute: string;
    fieldKey: string;
}

function CrudPanel({
    title, description, accentColor, icon, placeholder,
    items, storeRoute, updateRoute, destroyRoute, fieldKey,
}: CrudPanelProps) {
    const [editingId, setEditingId]   = useState<number | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const addForm  = useForm<Record<string, string>>({ [fieldKey]: '' });
    const editForm = useForm<Record<string, string>>({ [fieldKey]: '' });

    const handleAdd    = () => addForm.post(route(storeRoute), { preserveScroll: true, onSuccess: () => addForm.reset() });
    const startEdit    = (item: CrudItem) => { setEditingId(item.id); editForm.setData(fieldKey, item.label); };
    const handleUpdate = (id: number) => editForm.put(route(updateRoute, id), { preserveScroll: true, onSuccess: () => setEditingId(null) });
    const handleDelete = (id: number) => router.delete(route(destroyRoute, id), { preserveScroll: true, onSuccess: () => setDeletingId(null) });

    return (
        <div className="space-y-5">
            <div className="pb-4 border-b border-gray-100">
                <h3 className="text-base font-bold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-400 mt-0.5">{description}</p>
            </div>
            <div className="flex gap-2">
                <div className="flex-1">
                    <input
                        type="text"
                        value={addForm.data[fieldKey]}
                        onChange={e => addForm.setData(fieldKey, e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleAdd()}
                        placeholder={placeholder}
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-all ${addForm.errors[fieldKey] ? 'border-red-300' : 'border-gray-200'}`}
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
                                        if (e.key === 'Enter')  handleUpdate(item.id);
                                        if (e.key === 'Escape') setEditingId(null);
                                    }}
                                    className={`flex-1 px-2.5 py-1.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-900/10 bg-white transition-all ${editForm.errors[fieldKey] ? 'border-red-300' : 'border-gray-300'}`}
                                />
                                <button
                                    onClick={() => handleUpdate(item.id)}
                                    disabled={editForm.processing}
                                    className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors"
                                >
                                    {Icon.check}
                                </button>
                                <button
                                    onClick={() => setEditingId(null)}
                                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
                                >
                                    {Icon.x}
                                </button>
                            </>
                        ) : deletingId === item.id ? (
                            <>
                                <span className="flex-1 text-sm text-red-500 font-medium">Delete "{item.label}"?</span>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition-colors"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => setDeletingId(null)}
                                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
                                >
                                    {Icon.x}
                                </button>
                            </>
                        ) : (
                            <>
                                <span className="flex-1 text-sm font-medium text-gray-800">{item.label}</span>
                                <button
                                    onClick={() => startEdit(item)}
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    {Icon.edit}
                                </button>
                                <button
                                    onClick={() => setDeletingId(item.id)}
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                >
                                    {Icon.trash}
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── PRODUCT PANEL ────────────────────────────────────────────────────────────

function ProductPanel({ products }: { products: Product[] }) {
    const { data, setData, post, processing, reset } = useForm({
        productName: '',
        models: [{ productModel: '', price: '', description: '' }],
    });

    const addModelRow    = () => setData('models', [...data.models, { productModel: '', price: '', description: '' }]);
    const removeModelRow = (i: number) => setData('models', data.models.filter((_, idx) => idx !== i));
    const saveProduct    = () => post('/products', { preserveScroll: true, onSuccess: () => reset() });

    return (
        <div className="space-y-6">
            <div className="pb-4 border-b border-gray-100">
                <h3 className="text-base font-bold text-gray-900">Products &amp; Models</h3>
                <p className="text-sm text-gray-400 mt-0.5">Manage products and their model variants.</p>
            </div>
            <div className="space-y-4">
                <div>
                    <label className={labelClass}>Product name</label>
                    <input
                        type="text"
                        placeholder="e.g. Air Conditioner"
                        value={data.productName}
                        onChange={e => setData('productName', e.target.value)}
                        className={inputClass}
                    />
                </div>
                <div className="space-y-2">
                    <label className={labelClass}>Models</label>
                    {data.models.map((model, index) => (
                        <div key={index} className="grid grid-cols-5 gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <input
                                type="text"
                                placeholder="Model name"
                                value={model.productModel}
                                onChange={e => {
                                    const u = [...data.models];
                                    u[index].productModel = e.target.value;
                                    setData('models', u);
                                }}
                                className="col-span-2 px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={model.price}
                                onChange={e => {
                                    const u = [...data.models];
                                    u[index].price = e.target.value;
                                    setData('models', u);
                                }}
                                className="col-span-2 px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                            />
                            <button
                                type="button"
                                onClick={() => removeModelRow(index)}
                                className="flex items-center justify-center p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors"
                            >
                                {Icon.trash}
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addModelRow}
                        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        {Icon.plus} Add model row
                    </button>
                </div>
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={saveProduct}
                        disabled={processing}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-700 disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition-colors"
                    >
                        {Icon.check} Save product
                    </button>
                </div>
            </div>
            <div className="pt-4 border-t border-gray-100 space-y-3">
                <h4 className="text-sm font-bold text-gray-700">Existing products</h4>
                {products.length === 0 && (
                    <p className="text-sm text-gray-300 text-center py-6">No products yet.</p>
                )}
                {products.map(product => (
                    <div key={product.id} className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                        <div className="px-4 py-3 flex items-center gap-2 border-b border-gray-100">
                            <span className="text-violet-500">{Icon.product}</span>
                            <span className="text-sm font-bold text-gray-800">{product.productName}</span>
                            <span className="ml-auto text-xs text-gray-400">{product.models.length} model(s)</span>
                        </div>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left border-b border-gray-100">
                                    <th className="py-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Model</th>
                                    <th className="py-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.models.map((m, i) => (
                                    <tr key={i} className="border-b border-gray-50 last:border-0">
                                        <td className="py-2.5 px-4 text-gray-700 font-medium">{m.productModel}</td>
                                        <td className="py-2.5 px-4 text-gray-500">Rs. {Number(m.price).toLocaleString()}</td>
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

// ─── PAGE CONTENT ─────────────────────────────────────────────────────────────

function PageContent({
    activeId,
    districts,
    reasons,
    companies,
    products,
    users,
    authUser,
}: {
    activeId: string;
    districts: District[];
    reasons: Reason[];
    companies: Company[];
    products: Product[];
    users: UserItem[];
    authUser: UserItem;
}) {
    if (activeId === 'users-list') return (
        <UserPanel users={users} authUser={authUser} companies={companies} />
    );

    if (activeId === 'products') return <ProductPanel products={products} />;

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
            description="Manage call reasons used in call records."
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

    return (
        <div className="flex flex-col items-center justify-center h-64 text-gray-300 gap-3">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
            <p className="text-sm font-medium">Select a setting from the left menu</p>
        </div>
    );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function Settings({
    districts = [],
    reasons = [],
    companies = [],
    products = [],
    users = [],
    flash,
}: Props) {
    const { auth } = usePage<Props>().props;
    const authUser = auth.user;

    const [openSections, setOpenSections] = useState<string[]>(['company', 'config', 'users', 'profile']);
    const [activeItem, setActiveItem]     = useState<string>('company-general');

    const toggle = (id: string) =>
        setOpenSections(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );

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

                    {(flash?.success || flash?.error) && (
                        <div className={`mb-4 px-4 py-3 border text-sm font-medium rounded-xl flex items-center gap-2 ${
                            flash.error
                                ? 'bg-red-50 border-red-100 text-red-700'
                                : 'bg-emerald-50 border-emerald-100 text-emerald-700'
                        }`}>
                            {flash.error ? Icon.x : Icon.check}
                            {flash.error ?? flash.success}
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
                                                                className={`w-full flex items-center gap-2.5 pl-9 pr-4 py-2 text-left transition-all duration-100 ${
                                                                    active
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
                                users={users}
                                authUser={authUser}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
