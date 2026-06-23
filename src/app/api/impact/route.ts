import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const [donationAgg, causeCount, eventCount, subscriberCount] = await Promise.all([
      db.donation.aggregate({ _sum: { amount: true }, _count: true }),
      db.cause.count(),
      db.event.count(),
      db.subscriber.count(),
    ]);

    return NextResponse.json({
      totalRaised: donationAgg._sum.amount || 0,
      totalDonors: donationAgg._count,
      activeCauses: causeCount,
      upcomingEvents: eventCount,
      subscribers: subscriberCount,
    });
  } catch {
    return NextResponse.json({
      totalRaised: 0,
      totalDonors: 0,
      activeCauses: 0,
      upcomingEvents: 0,
      subscribers: 0,
    });
  }
}