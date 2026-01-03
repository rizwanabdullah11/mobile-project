import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const PRODUCTS_FILE = path.join(process.cwd(), 'data', 'products.json');

// GET /api/products/[id] - Get single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fileContents = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    const products = JSON.parse(fileContents);
    const product = products.find((p: any) => p.id === params.id);
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error reading product:', error);
    return NextResponse.json({ error: 'Failed to load product' }, { status: 500 });
  }
}

// PUT /api/products/[id] - Update product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updatedProduct = await request.json();
    
    // Read current products
    const fileContents = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    const products = JSON.parse(fileContents);
    
    // Find and update product
    const productIndex = products.findIndex((p: any) => p.id === params.id);
    if (productIndex === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    products[productIndex] = updatedProduct;
    
    // Write back to file
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE /api/products/[id] - Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Read current products
    const fileContents = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    const products = JSON.parse(fileContents);
    
    // Filter out the product to delete
    const filteredProducts = products.filter((p: any) => p.id !== params.id);
    
    if (filteredProducts.length === products.length) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    // Write back to file
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(filteredProducts, null, 2));
    
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}