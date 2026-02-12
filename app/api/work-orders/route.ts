import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'List work orders (tenant-scoped + RBAC + RLS)' });
}

export async function POST() {
  return NextResponse.json({ message: 'Create work order + auto catalog upsert + audit log' }, { status: 201 });
}
