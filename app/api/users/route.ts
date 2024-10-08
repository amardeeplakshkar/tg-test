import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, first_name, last_name, username, language_code, is_premium } = body;

    const user = await prisma.user.upsert({
      where: { id },
      update: {
        first_name,
        last_name,
        username,
        language_code,
        is_premium,
      },
      create: {
        id,
        first_name,
        last_name,
        username,
        language_code,
        is_premium,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Prisma Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ success: false, message: `Failed to save user data: ${errorMessage}` });
  }
}
