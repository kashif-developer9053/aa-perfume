// app/api/products/categories/route.js
import { NextResponse } from 'next/server';
import connectDB from '../../lib/db';
import Category from '../../lib/models/Category';
import Product from '../../lib/models/Product';
import { formatError } from '../../lib/utils';

export async function GET(req) {
  try {
    await connectDB();
    console.log('Connected to database for categories');

    const categories = await Category.find({}).sort({ name: 1 }).lean();
    console.log('Fetched categories:', categories);

    if (!categories || categories.length === 0) {
      console.log('No categories found');
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        try {
          const productCount = await Product.countDocuments({ category: category._id });
          return { ...category, productCount };
        } catch (error) {
          console.error(`Error counting products for category ${category._id}:`, error.message);
          return { ...category, productCount: 0 };
        }
      })
    );

    console.log('Categories with counts:', categoriesWithCounts);

    return NextResponse.json({
      success: true,
      data: categoriesWithCounts,
    });
  } catch (error) {
    console.error('Get categories error:', error.message, error.stack);
    return NextResponse.json(
      { success: false, message: formatError(error) || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, slug, description, parent, imageBase64 } = body;

    const category = new Category({
      name,
      slug,
      description,
      parent: parent || null,
      image: imageBase64 || null,
    });

    await category.save();

    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}