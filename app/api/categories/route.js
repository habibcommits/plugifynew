import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';
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

export async function GET() {
    try {
        await dbConnect();
        const categories = await Category.find({}).sort({ name: 1 });
        return NextResponse.json({ categories });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        if (!await verifyAdmin()) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const body = await req.json();

        console.log('Creating category with data:', body);

        const category = await Category.create(body);

        console.log('Category created successfully:', category);

        return NextResponse.json({ category }, { status: 201 });
    } catch (error) {
        console.error('Category create error:', error);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);

        // Return more specific error message
        const errorMessage = error.message || 'Failed to create category';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
