import { NextRequest, NextResponse } from 'next/server';
import { registerSchema } from '@/lib/validations/register';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = registerSchema.parse(body);

    // Here you would typically:
    // 1. Check if user already exists
    // 2. Hash the password
    // 3. Store the user in database
    // 4. Send verification email
    // 5. Create session/JWT token

    // For now, we'll just log and return success
    console.log('New registration:', {
      email: validatedData.email,
      name: `${validatedData.firstName} ${validatedData.lastName}`,
      company: validatedData.company,
      useCase: validatedData.useCase,
    });

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful',
        user: {
          email: validatedData.email,
          name: `${validatedData.firstName} ${validatedData.lastName}`,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Registration failed' },
      { status: 500 }
    );
  }
}
