import { NextResponse } from 'next/server';
import { subscribeNewsletter } from '@/lib/strapi';

export async function POST(req: Request) {
  try {
    const { email }: { email: string } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    await subscribeNewsletter(email);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to subscribe' },
      { status: 500 },
    );
  }
}
