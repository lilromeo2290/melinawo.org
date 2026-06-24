import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const team = await db.teamMember.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(team);
  } catch {
    return NextResponse.json([]);
  }
}