import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://e0wq7990z1.execute-api.ap-northeast-1.amazonaws.com/dev/hello';
    const response = await fetch(API_URL);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'APIの呼び出しに失敗しました' },
      { status: 500 }
    );
  }
}
