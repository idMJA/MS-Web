import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://64.235.41.10:7031/members');
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch members' },
      { status: 500 }
    );
  }
} 