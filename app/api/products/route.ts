import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const PRODUCTS_FILE = path.join(process.cwd(), 'data', 'products.json');

// GET /api/products - Get all products
export async function GET() {
  try {
    const fileContents = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    const products = JSON.parse(fileContents);
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error reading products:', error);
    return NextResponse.json({ error: 'Failed to load products' }, { status: 500 });
  }
}

// POST /api/products - Create new product
export async function POST(request: NextRequest) {
  try {
    const newProduct = await request.json();
    
    // Read current products
    const fileContents = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    const products = JSON.parse(fileContents);
    
    // Add new product
    products.push(newProduct);
    
    // Write back to file
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}