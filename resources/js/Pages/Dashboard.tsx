import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

const stats = [
    {
        label: 'Total Calls Today',
        value: '1,284',
        change: '+12%',
        up: true,
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z"/>
            </svg>
        ),
        color: '#2563eb',
        bg: '#eff6ff',
    },

    {
        label: 'Completed Calls',
        value: '1,142',
        change: '+9%',
        up: true,
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
        ),
        color: '#059669',
        bg: '#ecfdf5',
    },
    {
        label: 'Pending Calls',
        value: '14',
        change: '+3',
        up: false,
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/>
            </svg>
        ),
        color: '#7c3aed',
        bg: '#f5f3ff',
    },
    {
        label: 'Closed Calls',
        value: '98',
        change: '+7%',
        up: true,
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M18.36 6.64A9 9 0 115.64 17.36"/><path d="M2 12h4"/><path d="M12 2v4"/>
            </svg>
        ),
        color: '#dc2626',
        bg: '#fef2f2',
    },
    {
        label: 'Failed Calls',
        value: '43',
        change: '-2%',
        up: false,
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
        ),
        color: '#ea580c',
        bg: '#fff7ed',
    },
];

const recentCalls = [
    { id: 'CL-4821', caller: 'Sarah Johnson',  duration: '6m 14s', status: 'Completed', agent: 'Mike T.',   time: '2 min ago' },
    { id: 'CL-4820', caller: 'David Lee',       duration: '—',      status: 'Pending',   agent: '—',         time: '8 min ago' },
    { id: 'CL-4819', caller: 'Priya Mehta',     duration: '11m 40s',status: 'Completed', agent: 'Anna K.',   time: '15 min ago' },
    { id: 'CL-4818', caller: 'James Carter',    duration: '—',      status: 'Pending',   agent: 'Chris M.',  time: '22 min ago' },
    { id: 'CL-4817', caller: 'Emily Nguyen',    duration: '3m 27s', status: 'Completed', agent: 'Mike T.',   time: '31 min ago' },
];

const statusColor: Record<string, { bg: string; color: string }> = {
    Completed:  { bg: '#ecfdf5', color: '#059669' },
    Pending:    { bg: '#f5f3ff', color: '#7c3aed' },
    'On Call':  { bg: '#eff6ff', color: '#2563eb' },
    Available:  { bg: '#ecfdf5', color: '#059669' },
    Break:      { bg: '#f3f4f6', color: '#6b7280' },
};

export default function Dashboard() {
    const user = (usePage().props as any).auth?.user;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

                .dash-wrap * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }

                .dash-wrap {
                    padding: 2rem 1.5rem 3rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                /* greeting */
                .greeting {
                    margin-bottom: 2rem;
                }
                .greeting-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #111827;
                    margin-bottom: 0.25rem;
                }
                .greeting-sub {
                    font-size: 0.85rem;
                    color: #6b7280;
                }

                /* stat cards */
                .stat-grid {
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    gap: 1rem;
                    margin-bottom: 1.75rem;
                }
                @media (max-width: 1100px) { .stat-grid { grid-template-columns: repeat(3, 1fr); } }
                @media (max-width: 700px)  { .stat-grid { grid-template-columns: repeat(2, 1fr); } }
                @media (max-width: 420px)  { .stat-grid { grid-template-columns: 1fr; } }

                .stat-card {
                    background: #fff;
                    border: 1px solid #e5e7eb;
                    border-radius: 12px;
                    padding: 1.25rem 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    transition: box-shadow 0.15s;
                }
                .stat-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.07); }

                .stat-top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .stat-icon {
                    width: 38px;
                    height: 38px;
                    border-radius: 9px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .stat-change {
                    font-size: 0.72rem;
                    font-weight: 600;
                    padding: 0.2rem 0.5rem;
                    border-radius: 999px;
                }
                .change-up   { background: #ecfdf5; color: #059669; }
                .change-down { background: #fef2f2; color: #dc2626; }

                .stat-value {
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: #111827;
                    line-height: 1;
                }
                .stat-label {
                    font-size: 0.78rem;
                    color: #6b7280;
                    margin-top: 0.1rem;
                }

                /* bottom grid */
                .bottom-grid {
                    display: grid;
                    grid-template-columns: 1fr 340px;
                    gap: 1rem;
                }
                @media (max-width: 900px) { .bottom-grid { grid-template-columns: 1fr; } }

                /* panel */
                .panel {
                    background: #fff;
                    border: 1px solid #e5e7eb;
                    border-radius: 12px;
                    overflow: hidden;
                }
                .panel-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1.1rem 1.5rem;
                    border-bottom: 1px solid #f3f4f6;
                }
                .panel-title {
                    font-size: 0.92rem;
                    font-weight: 700;
                    color: #111827;
                }
                .panel-action {
                    font-size: 0.75rem;
                    color: #2563eb;
                    font-weight: 500;
                    text-decoration: none;
                    cursor: pointer;
                    background: none;
                    border: none;
                    padding: 0;
                }
                .panel-action:hover { text-decoration: underline; }

                /* table */
                .call-table { width: 100%; border-collapse: collapse; }
                .call-table th {
                    text-align: left;
                    font-size: 0.7rem;
                    font-weight: 600;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    color: #9ca3af;
                    padding: 0.65rem 1.5rem;
                    background: #fafafa;
                    border-bottom: 1px solid #f3f4f6;
                }
                .call-table td {
                    padding: 0.85rem 1.5rem;
                    font-size: 0.82rem;
                    color: #374151;
                    border-bottom: 1px solid #f9fafb;
                    vertical-align: middle;
                }
                .call-table tr:last-child td { border-bottom: none; }
                .call-table tr:hover td { background: #fafafa; }

                .call-id { font-weight: 600; color: #111827; }
                .call-time { color: #9ca3af; font-size: 0.75rem; }

                .badge {
                    display: inline-flex;
                    align-items: center;
                    padding: 0.2rem 0.6rem;
                    border-radius: 999px;
                    font-size: 0.72rem;
                    font-weight: 600;
                }

                /* agent list */
                .agent-list { padding: 0.5rem 0; }
                .agent-row {
                    display: flex;
                    align-items: center;
                    gap: 0.85rem;
                    padding: 0.75rem 1.5rem;
                    border-bottom: 1px solid #f9fafb;
                    transition: background 0.15s;
                }
                .agent-row:last-child { border-bottom: none; }
                .agent-row:hover { background: #fafafa; }

                .avatar {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background: #eff6ff;
                    color: #2563eb;
                    font-size: 0.7rem;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .agent-name {
                    font-size: 0.83rem;
                    font-weight: 600;
                    color: #111827;
                }
                .agent-calls {
                    font-size: 0.72rem;
                    color: #6b7280;
                }
                .agent-badge {
                    margin-left: auto;
                }
            `}</style>

            <div className="dash-wrap">
                {/* Greeting */}
                <div className="greeting">
                    <div className="greeting-title">
                        Good morning{user?.name ? `, ${user.name.split(' ')[0]}` : ''} 👋
                    </div>
                    <div className="greeting-sub">
                        Here's what's happening in your call center today.
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="stat-grid">
                    {stats.map((s) => (
                        <div className="stat-card" key={s.label}>
                            <div className="stat-top">
                                <div className="stat-icon" style={{ background: s.bg, color: s.color }}>
                                    {s.icon}
                                </div>
                                <span className={`stat-change ${s.up ? 'change-up' : 'change-down'}`}>
                                    {s.change}
                                </span>
                            </div>
                            <div>
                                <div className="stat-value">{s.value}</div>
                                <div className="stat-label">{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Calls Table */}
                <div className="panel">
                        <div className="panel-header">
                            <span className="panel-title">Recent Calls</span>
                            <a className="panel-action" href={route('call-records.index')}>View all →</a>
                        </div>
                        <table className="call-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Caller</th>
                                    <th>Duration</th>
                                    <th>Agent</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentCalls.map((c) => (
                                    <tr key={c.id}>
                                        <td>
                                            <div className="call-id">{c.id}</div>
                                            <div className="call-time">{c.time}</div>
                                        </td>
                                        <td>{c.caller}</td>
                                        <td>{c.duration}</td>
                                        <td>{c.agent}</td>
                                        <td>
                                            <span
                                                className="badge"
                                                style={{
                                                    background: statusColor[c.status]?.bg,
                                                    color: statusColor[c.status]?.color,
                                                }}
                                            >
                                                {c.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            </div>
        </AuthenticatedLayout>
    );
}