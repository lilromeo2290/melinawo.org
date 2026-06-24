import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const events = await db.event.findMany({
      orderBy: { date: 'asc' },
    });
    return NextResponse.json(events);
  } catch {
    return NextResponse.json([]);
  }
}