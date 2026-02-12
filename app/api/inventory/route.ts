import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'List inventory items with filters' });
}
