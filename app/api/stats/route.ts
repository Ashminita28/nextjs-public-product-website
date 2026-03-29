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
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
