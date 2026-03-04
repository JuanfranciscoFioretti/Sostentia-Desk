import { NextRequest, NextResponse } from 'next/server';
import { sendSupportEmail } from '@/lib/email';
import { z } from 'zod';

// Validation schema
const supportSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  subject: z.string().min(5),
  message: z.string().min(10),
  plan: z.enum(['starter', 'growth', 'enterprise']),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request
    const validatedData = supportSchema.parse(body);

    // Send the email
    await sendSupportEmail(
      validatedData.name,
      validatedData.email,
      validatedData.phone,
      validatedData.subject,
      validatedData.message,
      validatedData.plan
    );

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Support API error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid form data', errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
}
