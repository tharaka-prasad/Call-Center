import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

                .profile-wrap * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }

                .profile-wrap {
                    padding: 2rem 1.5rem 3rem;
                    max-width: 780px;
                    margin: 0 auto;
                }

                /* page title */
                .profile-heading {
                    margin-bottom: 2rem;
                }
                .profile-heading h1 {
                    font-size: 1.4rem;
                    font-weight: 700;
                    color: #111827;
                    margin-bottom: 0.25rem;
                }
                .profile-heading p {
                    font-size: 0.82rem;
                    color: #6b7280;
                }

                /* section card */
                .profile-card {
                    background: #fff;
                    border: 1px solid #e5e7eb;
                    border-radius: 14px;
                    overflow: hidden;
                    margin-bottom: 1.25rem;
                }

                .profile-card-header {
                    display: flex;
                    align-items: center;
                    gap: 0.85rem;
                    padding: 1.25rem 1.75rem;
                    border-bottom: 1px solid #f3f4f6;
                    background: #fafafa;
                }

                .card-icon {
                    width: 36px;
                    height: 36px;
                    border-radius: 9px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .icon-blue  { background: #eff6ff; color: #2563eb; }
                .icon-amber { background: #fffbeb; color: #d97706; }
                .icon-red   { background: #fef2f2; color: #dc2626; }

                .card-header-text h3 {
                    font-size: 0.9rem;
                    font-weight: 700;
                    color: #111827;
                    margin-bottom: 0.1rem;
                }
                .card-header-text p {
                    font-size: 0.75rem;
                    color: #6b7280;
                }

                .profile-card-body {
                    padding: 1.75rem;
                }

                /* danger card */
                .profile-card.danger {
                    border-color: #fecaca;
                }
                .profile-card.danger .profile-card-header {
                    background: #fef2f2;
                    border-bottom-color: #fecaca;
                }
            `}</style>

            <div className="profile-wrap">
                <div className="profile-heading">
                    <h1>Account Settings</h1>
                    <p>Manage your profile information, password, and account preferences.</p>
                </div>

                {/* Profile Information */}
                <div className="profile-card">
                    <div className="profile-card-header">
                        <div className="card-icon icon-blue">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>
                        </div>
                        <div className="card-header-text">
                            <h3>Profile Information</h3>
                            <p>Update your name and email address</p>
                        </div>
                    </div>
                    <div className="profile-card-body">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>
                </div>

                {/* Update Password */}
                <div className="profile-card">
                    <div className="profile-card-header">
                        <div className="card-icon icon-amber">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                <path d="M7 11V7a5 5 0 0110 0v4"/>
                            </svg>
                        </div>
                        <div className="card-header-text">
                            <h3>Update Password</h3>
                            <p>Ensure your account uses a strong, secure password</p>
                        </div>
                    </div>
                    <div className="profile-card-body">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                </div>

                {/* Delete Account */}
                <div className="profile-card danger">
                    <div className="profile-card-header">
                        <div className="card-icon icon-red">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                                <path d="M10 11v6M14 11v6"/>
                                <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                            </svg>
                        </div>
                        <div className="card-header-text">
                            <h3>Delete Account</h3>
                            <p>Permanently delete your account and all data</p>
                        </div>
                    </div>
                    <div className="profile-card-body">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}