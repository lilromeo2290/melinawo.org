import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const donateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  amount: z.number().positive('Amount must be positive'),
  causeId: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = donateSchema.parse(body);

    const donation = await db.donation.create({
      data: {
        name: data.name,
        email: data.email,
        amount: data.amount,
        causeId: data.causeId,
        message: data.message,
      },
    });

    // If causeId provided, update raised amount
    if (data.causeId) {
      await db.cause.update({
        where: { id: data.causeId },
        data: { raised: { increment: data.amount } },
      });
    }

    return NextResponse.json(
      { success: true, donation: { id: donation.id, amount: donation.amount } },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const totalDonations = await db.donation.aggregate({
      _sum: { amount: true },
      _count: true,
    });
    return NextResponse.json({
      totalRaised: totalDonations._sum.amount || 0,
      totalDonors: totalDonations._count,
    });
  } catch {
    return NextResponse.json({ totalRaised: 0, totalDonors: 0 });
  }
}