import { NextResponse } from 'next/server';
import { registerUser } from '@/lib/strapi';
import { registerSchema } from '@/lib/validations/auth-schema';

export async function POST(req: Request): Promise<NextResponse> {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 },
    );
  }

  const parsed = registerSchema.safeParse(json);
  if (!parsed.success) {
    const message =
      parsed.error.issues[0]?.message ??
      'Please check your input and try again.';
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    const data = await registerUser(parsed.data);

    return NextResponse.json({
      message: 'Your account is ready.',
      user: {
        id: data.user.id,
        email: data.user.email,
        username: data.user.username,
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Unable to create your account. Please try again.' },
      { status: 400 },
    );
  }
}
