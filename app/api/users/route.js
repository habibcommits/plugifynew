import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { headers } from 'next/headers';

const verifyAdmin = async () => {
    const headersList = await headers();
    const token = headersList.get('cookie')?.split('token=')[1]?.split(';')[0];

    if (!token) return false;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'admin' && decoded.role !== 'super-admin') return false;
        return true;
    } catch (e) {
        return false;
    }
};

export async function PUT(req, { params }) {
    try {
        if (!await verifyAdmin()) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const body = await req.json();
        const { role, id } = body; // User ID passed in body or query

        const user = await User.findByIdAndUpdate(id, { role }, { new: true });

        return NextResponse.json({ user });
    } catch (error) {
        console.error('Update user error:', error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}
