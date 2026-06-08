import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />

            <style>{`
                .cc-wrap {
                    min-height: 100vh;
                    display: flex; align-items: center; justify-content: center;
                    padding: 2rem;
                    position: relative;
                    overflow: hidden;
                }
                .cc-bg {
                    position: absolute; inset: 0;
                    background-image: url('https://images.unsplash.com/photo-1560264280-88b68371db39?w=1400&q=80');
                    background-size: cover;
                    background-position: center;
                    filter: brightness(0.45);
                }
                .cc-card {
                    position: relative; z-index: 1;
                    width: 100%; max-width: 420px;
                    background: rgba(255,255,255,0.97);
                    border: 1px solid rgba(255,255,255,0.6);
                    border-radius: 14px;
                    padding: 2rem;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.35);
                }
                .cc-header {
                    display: flex; flex-direction: column; align-items: center;
                    gap: 10px; margin-bottom: 1.75rem; text-align: center;
                }
                .cc-icon {
                    width: 48px; height: 48px; border-radius: 10px;
                    background: #e6f1fb;
                    display: flex; align-items: center; justify-content: center;
                    color: #185fa5;
                }
                .cc-header h1 { font-size: 18px; font-weight: 600; color: #1a202c; margin: 0; }
                .cc-header p { font-size: 13px; color: #718096; margin: 0; display: flex; align-items: center; gap: 6px; }
                .cc-badge {
                    display: inline-flex; align-items: center; gap: 5px;
                    background: #e6f1fb; color: #185fa5;
                    font-size: 11px; font-weight: 500;
                    padding: 3px 10px; border-radius: 20px;
                }
                .cc-dot { width: 6px; height: 6px; border-radius: 50%; background: #639922; display: inline-block; }
                .cc-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
                .cc-field { margin-bottom: 1rem; }
                .cc-field label { display: block; font-size: 13px; font-weight: 500; color: #4a5568; margin-bottom: 6px; }
                .cc-iw { position: relative; }
                .cc-iw svg {
                    position: absolute; left: 10px; top: 50%; transform: translateY(-50%);
                    width: 15px; height: 15px; color: #a0aec0; pointer-events: none;
                }
                .cc-iw input {
                    width: 100%; padding: 9px 12px 9px 32px;
                    font-size: 14px; border-radius: 8px;
                    border: 1px solid #cbd5e0; background: #fff; color: #2d3748;
                    outline: none; font-family: inherit;
                    transition: border-color .15s, box-shadow .15s;
                }
                .cc-iw input:focus { border-color: #185fa5; box-shadow: 0 0 0 3px rgba(24,95,165,.1); }
                .cc-iw input::placeholder { color: #c4cdd6; }
                .cc-btn {
                    width: 100%; padding: 10px;
                    background: #185fa5; color: #fff;
                    border: none; border-radius: 8px;
                    font-size: 14px; font-weight: 500; cursor: pointer;
                    font-family: inherit; margin-top: 0.25rem;
                    transition: background .15s;
                }
                .cc-btn:hover:not(:disabled) { background: #0c447c; }
                .cc-btn:disabled { opacity: .6; cursor: not-allowed; }
                .cc-divider { height: 1px; background: #e2e6ea; margin: 1.25rem 0; }
                .cc-footer { text-align: center; font-size: 13px; color: #718096; }
                .cc-footer a { color: #185fa5; text-decoration: none; }
                .cc-footer a:hover { text-decoration: underline; }
            `}</style>

            <div className="cc-wrap">
                <div className="cc-bg" />

                <div className="cc-card">
                    <div className="cc-header">
                        <div className="cc-icon">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
                                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
                            </svg>
                        </div>
                        <h1>Create your account</h1>
                        <p>
                            Call Center Portal &nbsp;·&nbsp;
                            <span className="cc-badge"><span className="cc-dot" /> System online</span>
                        </p>
                    </div>

                    <form onSubmit={submit}>
                        <div className="cc-row2">
                            <div className="cc-field">
                                <label htmlFor="firstName">First name</label>
                                <div className="cc-iw">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                                    </svg>
                                    <input id="firstName" name="firstName" type="text" value={data.firstName} placeholder="John" autoComplete="given-name" autoFocus onChange={(e) => setData('firstName', e.target.value)} required />
                                </div>
                                <InputError message={errors.firstName} className="mt-1" />
                            </div>
                            <div className="cc-field">
                                <label htmlFor="lastName">Last name</label>
                                <div className="cc-iw">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                                    </svg>
                                    <input id="lastName" name="lastName" type="text" value={data.lastName} placeholder="Doe" autoComplete="family-name" onChange={(e) => setData('lastName', e.target.value)} required />
                                </div>
                                <InputError message={errors.lastName} className="mt-1" />
                            </div>
                        </div>

                        <div className="cc-field">
                            <label htmlFor="email">Email address</label>
                            <div className="cc-iw">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/>
                                </svg>
                                <input id="email" type="email" name="email" value={data.email} placeholder="john.doe@company.com" autoComplete="username" onChange={(e) => setData('email', e.target.value)} required />
                            </div>
                            <InputError message={errors.email} className="mt-1" />
                        </div>

                        <div className="cc-field">
                            <label htmlFor="password">Password</label>
                            <div className="cc-iw">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                </svg>
                                <input id="password" type="password" name="password" value={data.password} placeholder="••••••••" autoComplete="new-password" onChange={(e) => setData('password', e.target.value)} required />
                            </div>
                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        <div className="cc-field">
                            <label htmlFor="password_confirmation">Confirm password</label>
                            <div className="cc-iw">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                </svg>
                                <input id="password_confirmation" type="password" name="password_confirmation" value={data.password_confirmation} placeholder="••••••••" autoComplete="new-password" onChange={(e) => setData('password_confirmation', e.target.value)} required />
                            </div>
                            <InputError message={errors.password_confirmation} className="mt-1" />
                        </div>

                        <button className="cc-btn" type="submit" disabled={processing}>
                            {processing ? 'Creating account…' : 'Create account'}
                        </button>
                    </form>

                    <div className="cc-divider" />
                    <div className="cc-footer">
                        Already registered? <Link href={route('login')}>Sign in</Link>
                    </div>
                </div>
            </div>
        </>
    );
}