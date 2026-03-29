import { NextResponse } from 'next/server';
import { subscribeNewsletter } from '@/lib/strapi';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { email }: { email: string } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    await subscribeNewsletter(email);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Unable to subscribe. Please try again later.' },
      { status: 500 },
    );
  }
}
