import { NextResponse } from 'next/server';
import { getDashboardStats, getSubscriberCount } from '@/lib/strapi';

export async function GET() {
  try {
    const stats = await getDashboardStats();
    const subscribers = await getSubscriberCount();

    return NextResponse.json({
      stats,
      subscribers,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unauthorized' },
      { status: 401 },
    );
  }
}
