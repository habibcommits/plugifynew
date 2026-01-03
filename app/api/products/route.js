import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import jwt from 'jsonwebtoken';
import { headers } from 'next/headers';

// Helper to verify admin
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

export async function GET(req) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        const featured = searchParams.get('featured');
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 10;
        const skip = (page - 1) * limit;

        let query = {};
        if (category) query.category = category;
        if (featured) query.isFeatured = featured === 'true';

        const products = await Product.find(query)
            .populate('category', 'name slug')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Product.countDocuments(query);

        return NextResponse.json({
            products,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalProducts: total
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        if (!await verifyAdmin()) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const body = await req.json();

        const product = await Product.create(body);

        return NextResponse.json({ product }, { status: 201 });
    } catch (error) {
        console.error('Product create error:', error);
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
