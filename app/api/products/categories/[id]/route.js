import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Category from '../../../lib/models/Category';

// GET single category
export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const category = await Category.findById(id).populate('parent');
    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Category not found' }, { status: 404 });
  }
}

// UPDATE category
export async function PUT(req, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const body = await req.json();
    const { name, slug, description, parent, imageBase64 } = body;

    const updates = {
      name,
      slug,
      description: description || '',
      parent: parent || null,
    };

    // Only update image if a new one was provided
    if (imageBase64) {
      updates.image = imageBase64;
    }

    const updated = await Category.findByIdAndUpdate(id, updates, { new: true });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('UPDATE error:', error);
    return NextResponse.json({ success: false, message: 'Error updating category' }, { status: 500 });
  }
}

// DELETE category
export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    await Category.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Category deleted' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ success: false, message: 'Error deleting category' }, { status: 500 });
  }
}
