import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;

  if (!googleScriptUrl) {
    return NextResponse.json(
      { status: 'error', message: 'GOOGLE_SCRIPT_URL is not configured' },
      { status: 500 }
    );
  }

  try {
    const payload = await request.json();

    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    return NextResponse.json(result, { status: response.ok ? 200 : 500 });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown proxy error',
      },
      { status: 500 }
    );
  }
}
