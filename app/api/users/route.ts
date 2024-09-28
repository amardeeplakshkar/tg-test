import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// For POST requests
export async function POST(request: Request) {
  try {
    const body = await request.json(); // Parse the request body
    const { id, first_name, last_name, username, language_code, is_premium } = body;

    // Perform the upsert operation
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
    // Check if the error is an instance of Error
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error(error);
    return NextResponse.json({ success: false, message: 'Failed to save user data', error: errorMessage });
  }
}
