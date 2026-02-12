import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Aggregate reports by status, totals, delayed work orders' });
}
