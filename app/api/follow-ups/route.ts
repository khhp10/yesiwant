import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ message: 'Create follow-up: 1432-1, 1432-2 ...' }, { status: 201 });
}
