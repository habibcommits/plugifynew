import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import styles from '../admin.module.css';

async function getOrders() {
    await dbConnect();
    const orders = await Order.find({})
        .populate('userId', 'name email')
        .sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(orders));
}

export default async function AdminOrders() {
    const orders = await getOrders();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Orders</h1>

            <div className="bg-surface border border-border rounded-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#202020] text-gray-400">
                        <tr>
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Total</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="border-b border-border hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono text-sm">{order._id}</td>
                                <td className="p-4">
                                    <div>{order.userId?.name || 'Guest'}</div>
                                    <div className="text-xs text-gray-500">{order.userId?.email}</div>
                                </td>
                                <td className="p-4 font-bold">${order.totalAmount}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs ${order.status === 'delivered' ? 'bg-success/20 text-success' :
                                            order.status === 'pending' ? 'bg-warning/20 text-warning' : 'bg-gray-700'
                                        }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-400">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-4">
                                    <button className="text-primary hover:underline text-sm">View Details</button>
                                </td>
                            </tr>
                        ))}
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan="6" className="p-8 text-center text-gray-500">No orders found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
