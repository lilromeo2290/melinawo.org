import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const causes = await db.cause.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(causes);
  } catch {
    return NextResponse.json([]);
  }
}