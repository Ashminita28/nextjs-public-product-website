import { NextResponse } from 'next/server';
import { getDashboardStats, getSubscriberCount } from '@/lib/strapi';

export async function GET(): Promise<NextResponse> {
  try {
    const stats = await getDashboardStats();
    const subscribers = await getSubscriberCount();

    return NextResponse.json({
      stats,
      subscribers,
    });
  } catch (error) {
    if (error instanceof Error && /unauthorized/i.test(error.message)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(
      { error: 'Unable to fetch dashboard stats right now.' },
      { status: 500 },
    );
  }
}