import { NextResponse } from 'next/server';
import { subscribeNewsletter } from '@/lib/strapi';
import { newsletterSchema } from '@/lib/validations/newsletter-schema';
import { hasJsonContentType, isAllowedOrigin } from '@/lib/security';

export async function POST(req: Request): Promise<NextResponse> {
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ error: 'Forbidden origin.' }, { status: 403 });
  }

  if (!hasJsonContentType(req)) {
    return NextResponse.json(
      { error: 'Expected application/json content type.' },
      { status: 415 },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error:
          parsed.error.issues[0]?.message ?? 'Please provide a valid email.',
      },
      { status: 400 },
    );
  }

  try {
    await subscribeNewsletter(parsed.data.email);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Unable to subscribe. Please try again later.' },
      { status: 500 },
    );
  }
}