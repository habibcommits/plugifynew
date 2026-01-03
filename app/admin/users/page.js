import dbConnect from '@/lib/db';
import User from '@/models/User';
import styles from '../admin.module.css';

async function getUsers() {
    await dbConnect();
    const users = await User.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(users));
}

export default async function AdminUsers() {
    const users = await getUsers();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Users</h1>

            <div className="bg-surface border border-border rounded-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#202020] text-gray-400">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Joined</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-b border-border hover:bg-white/5 transition-colors">
                                <td className="p-4 font-medium">{user.name}</td>
                                <td className="p-4 text-gray-400">{user.email}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs ${user.role === 'admin' || user.role === 'super-admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-700'
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-400">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-4">
                                    <button className="text-blue-400 hover:underline text-sm">Edit Role</button>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-gray-500">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
