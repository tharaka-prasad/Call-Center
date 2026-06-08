import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Login" />

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
                    background-position: center;
                    filter: brightness(0.45);
                }
                .cc-card {
                    position: relative; z-index: 1;
                    width: 100%; max-width: 380px;
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
                .cc-status {
                    background: #eaf3de; border: 1px solid #c0dd97;
                    border-radius: 8px; padding: 8px 12px;
                    font-size: 13px; color: #27500a;
                    margin-bottom: 1rem; text-align: center;
                }
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
                .cc-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; }
                .cc-remember { display: flex; align-items: center; gap: 7px; font-size: 13px; color: #4a5568; cursor: pointer; }
                .cc-remember input { accent-color: #185fa5; cursor: pointer; }
                .cc-forgot { font-size: 13px; color: #185fa5; text-decoration: none; }
                .cc-forgot:hover { text-decoration: underline; }
                .cc-btn {
                    width: 100%; padding: 10px;
                    background: #185fa5; color: #fff;
                    border: none; border-radius: 8px;
                    font-size: 14px; font-weight: 500; cursor: pointer;
                    font-family: inherit; transition: background .15s;
                }
                .cc-btn:hover:not(:disabled) { background: #0c447c; }
                .cc-btn:disabled { opacity: .6; cursor: not-allowed; }
                .cc-divider { height: 1px; background: #e2e6ea; margin: 1.25rem 0; }
                .cc-footer { text-align: center; font-size: 12px; color: #a0aec0; }
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
                        <h1>Login</h1>
                        <p>
                            Call Center Portal &nbsp;·&nbsp;
                            <span className="cc-badge"><span className="cc-dot" /> System online</span>
                        </p>
                    </div>

                    {status && <div className="cc-status">{status}</div>}

                    <form onSubmit={submit}>
                        <div className="cc-field">
                            <label htmlFor="email">Login ID / Email</label>
                            <div className="cc-iw">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                                </svg>
                                <input id="email" type="text" name="email" value={data.email} placeholder="e.g. AGT-10482 or email" autoComplete="username" autoFocus onChange={(e) => setData('email', e.target.value)} />
                            </div>
                            <InputError message={errors.email} className="mt-1" />
                        </div>

                        <div className="cc-field">
                            <label htmlFor="password">Password</label>
                            <div className="cc-iw">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                </svg>
                                <input id="password" type="password" name="password" value={data.password} placeholder="••••••••" autoComplete="current-password" onChange={(e) => setData('password', e.target.value)} />
                            </div>
                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        <div className="cc-row">
                            <label className="cc-remember">
                                <input type="checkbox" name="remember" checked={data.remember} onChange={(e) => setData('remember', (e.target.checked || false) as false)} />
                                Keep me signed in
                            </label>
                            {canResetPassword && (
                                <Link href={route('password.request')} className="cc-forgot">Forgot password?</Link>
                            )}
                        </div>

                        <button className="cc-btn" type="submit" disabled={processing}>
                            {processing ? 'Signing in…' : 'Login'}
                        </button>
                    </form>

                    <div className="cc-divider" />
                    <div className="cc-footer">Secured &nbsp;·&nbsp; IT support: ext. 100</div>
                </div>
            </div>
        </>
    );
}