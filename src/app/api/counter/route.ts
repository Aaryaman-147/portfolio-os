import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

// This automatically connects using the UPSTASH_REDIS_REST_URL 
// and UPSTASH_REDIS_REST_TOKEN in your .env.local file
const redis = Redis.fromEnv();

export async function GET() {
  try {
    // Increments the counter by 1. If it doesn't exist, it creates it at 1.
    const count = await redis.incr('portfolio_visitors');
    
    return NextResponse.json({ count });
  } catch (error) {
    console.error("Redis Error:", error);
    // Fallback retro number just in case the database ever sleeps or fails
    return NextResponse.json({ count: 208 }, { status: 500 }); 
  }
}
hi
