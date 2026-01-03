import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Product';
import User from '@/models/User';
import RevenueChart from '@/components/admin/RevenueChart';
import { FiFilter, FiDownload, FiSearch } from 'react-icons/fi';

async function getStats() {
    await dbConnect();

    const totalRevenue = await Order.aggregate([
        { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();

    // Recent Orders
    const recentOrders = await Order.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('userId', 'name email');

    return {
        revenue: totalRevenue[0]?.total || 0,
        orders: totalOrders,
        products: totalProducts,
        users: totalUsers,
        recentOrders: JSON.parse(JSON.stringify(recentOrders))
    };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div style={{ padding: '0' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--admin-text-dark)' }}>Dashboard Overview</h2>
                <p style={{ color: 'var(--admin-text-muted)' }}>Welcome to your admin dashboard</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--admin-border)', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <h3 style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>Total Revenue</h3>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '1.25rem' }}>💰</span>
                        </div>
                    </div>
                    <p style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--admin-text-dark)' }}>${stats.revenue.toFixed(2)}</p>
                    <p style={{ fontSize: '0.875rem', color: '#10b981', marginTop: '0.5rem' }}>+12.5% from last month</p>
                </div>

                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--admin-border)', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <h3 style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>Total Orders</h3>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255, 112, 67, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '1.25rem' }}>📦</span>
                        </div>
                    </div>
                    <p style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--admin-text-dark)' }}>{stats.orders}</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--admin-primary)', marginTop: '0.5rem' }}>+8.2% from last month</p>
                </div>

                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--admin-border)', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <h3 style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>Total Products</h3>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(41, 98, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '1.25rem' }}>📱</span>
                        </div>
                    </div>
                    <p style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--admin-text-dark)' }}>{stats.products}</p>
                    <p style={{ fontSize: '0.875rem', color: '#2962FF', marginTop: '0.5rem' }}>+5 new this week</p>
                </div>

                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--admin-border)', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <h3 style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>Total Users</h3>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '1.25rem' }}>👥</span>
                        </div>
                    </div>
                    <p style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--admin-text-dark)' }}>{stats.users}</p>
                    <p style={{ fontSize: '0.875rem', color: '#f59e0b', marginTop: '0.5rem' }}>+15 new users</p>
                </div>
            </div>

            <div className="w-full">
                <RevenueChart />
            </div>


            <div style={{ background: 'white', borderRadius: '8px', border: '1px solid var(--admin-border)', overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.02)', marginTop: '2rem' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--admin-text-dark)' }}>Recent Orders</h2>
                        <p style={{ fontSize: '0.875rem', color: 'var(--admin-text-muted)', marginTop: '0.25rem' }}>Latest customer transactions</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--admin-border)', borderRadius: '6px', fontSize: '0.875rem', color: 'var(--admin-text-muted)', cursor: 'pointer' }}>
                            <FiFilter /> Filter
                        </button>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--admin-border)', borderRadius: '6px', fontSize: '0.875rem', color: 'var(--admin-text-muted)', cursor: 'pointer' }}>
                            <FiDownload /> Export
                        </button>
                    </div>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                        <thead style={{ background: '#fcfdfd' }}>
                            <tr>
                                <th style={{ padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: '600', fontSize: '0.875rem', borderBottom: '1px solid var(--admin-border)' }}>Order ID</th>
                                <th style={{ padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: '600', fontSize: '0.875rem', borderBottom: '1px solid var(--admin-border)' }}>Customer</th>
                                <th style={{ padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: '600', fontSize: '0.875rem', borderBottom: '1px solid var(--admin-border)' }}>Amount</th>
                                <th style={{ padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: '600', fontSize: '0.875rem', borderBottom: '1px solid var(--admin-border)' }}>Status</th>
                                <th style={{ padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: '600', fontSize: '0.875rem', borderBottom: '1px solid var(--admin-border)' }}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.recentOrders.length > 0 ? (
                                stats.recentOrders.map(order => (
                                    <tr key={order._id} style={{ borderBottom: '1px solid var(--admin-border)' }}>
                                        <td style={{ padding: '1rem', fontSize: '0.875rem', fontFamily: 'monospace', color: 'var(--admin-primary)' }}>{order._id.substring(0, 8)}...</td>
                                        <td style={{ padding: '1rem', fontWeight: '500', color: 'var(--admin-text-dark)' }}>{order.userId?.name || 'Guest'}</td>
                                        <td style={{ padding: '1rem', fontWeight: '700', color: '#10b981' }}>${order.totalAmount}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                background: order.status === 'delivered' ? 'rgba(16, 185, 129, 0.1)' : order.status === 'pending' ? 'rgba(245, 158, 11, 0.1)' : '#f3f4f6',
                                                color: order.status === 'delivered' ? '#10b981' : order.status === 'pending' ? '#f59e0b' : '#6b7280'
                                            }}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', color: 'var(--admin-text-muted)', fontSize: '0.875rem' }}>
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ padding: '3rem', textAlign: 'center' }}>
                                        <div style={{ color: 'var(--admin-text-muted)' }}>
                                            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📦</div>
                                            <p style={{ fontWeight: '500' }}>No orders found</p>
                                            <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>Orders will appear here once customers make purchases</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
