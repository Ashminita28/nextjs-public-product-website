import { NextResponse } from 'next/server';
import { registerUser } from '@/lib/strapi';
import type { RegisterBody } from '@/lib/types/api-types';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body: RegisterBody = await req.json();

    const data = await registerUser(body);

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
