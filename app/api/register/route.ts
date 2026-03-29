// app/api/register/route.ts
import { NextResponse } from 'next/server';
import { registerUser } from '@/lib/strapi';
import { RegisterBody } from '@/lib/types/api-types';

export async function POST(req: Request) {
  try {
    const body: RegisterBody = await req.json();

    const data = await registerUser(body);

    // Ensure it's JSON-serializable
    const serializable = JSON.parse(JSON.stringify(data));

    return NextResponse.json(serializable);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Register failed' },
      { status: 400 },
    );
  }
}
