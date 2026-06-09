import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <>
            <Head title="Welcome" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

                * { box-sizing: border-box; margin: 0; padding: 0; }

                body {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    background: #f9fafb;
                    color: #111827;
                    min-height: 100vh;
                }

                .page {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                }

                /* NAV */
                nav {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1.25rem 2rem;
                    background: #fff;
                    border-bottom: 1px solid #e5e7eb;
                }

                .logo {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: #111827;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .logo-icon {
                    width: 32px;
                    height: 32px;
                    background: #2563eb;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 0.9rem;
                }

                .nav-links {
                    display: flex;
                    gap: 0.75rem;
                }

                .btn {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 0.85rem;
                    font-weight: 500;
                    text-decoration: none;
                    padding: 0.5rem 1.25rem;
                    border-radius: 8px;
                    transition: all 0.15s;
                    display: inline-flex;
                    align-items: center;
                    cursor: pointer;
                    border: none;
                }

                .btn-outline {
                    background: transparent;
                    color: #374151;
                    border: 1px solid #d1d5db;
                }
                .btn-outline:hover {
                    background: #f3f4f6;
                    border-color: #9ca3af;
                }

                .btn-solid {
                    background: #2563eb;
                    color: #fff;
                }
                .btn-solid:hover {
                    background: #1d4ed8;
                }

                /* HERO */
                .hero {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 5rem 1.5rem;
                    gap: 1.5rem;
                }

                .hero h1 {
                    font-size: clamp(2rem, 5vw, 3rem);
                    font-weight: 700;
                    line-height: 1.15;
                    color: #111827;
                }

                .hero h1 span { color: #2563eb; }

                .hero p {
                    font-size: 1rem;
                    color: #6b7280;
                    max-width: 420px;
                    line-height: 1.7;
                }

                .hero-actions {
                    display: flex;
                    gap: 0.75rem;
                    flex-wrap: wrap;
                    justify-content: center;
                    margin-top: 0.5rem;
                }

                .btn-lg {
                    font-size: 0.95rem;
                    padding: 0.7rem 1.75rem;
                }

                /* FOOTER */
                footer {
                    text-align: center;
                    padding: 1.5rem;
                    font-size: 0.75rem;
                    color: #9ca3af;
                    border-top: 1px solid #e5e7eb;
                    background: #fff;
                }
            `}</style>

            <div className="page">
                <div className="hero">
                    <h1>Welcome to<br /><span>CallCenter</span></h1>
                    <p>Manage your agents, monitor calls, and deliver great customer support — all in one place.</p>
                    <div className="hero-actions">
                        {auth.user ? (
                            <Link href={route('dashboard')} className="btn btn-solid btn-lg">
                                Go to Dashboard →
                            </Link>
                        ) : (
                            <>
                                <Link href={route('register')} className="btn btn-solid btn-lg">
                                    Get Started
                                </Link>
                                <Link href={route('login')} className="btn btn-outline btn-lg">
                                    Log in
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                <footer>
                    Laravel v{laravelVersion} · PHP v{phpVersion} · © {new Date().getFullYear()} CallCenter
                </footer>
            </div>
        </>
    );
}
