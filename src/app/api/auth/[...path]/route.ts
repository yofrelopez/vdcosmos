import { auth } from '@/lib/auth/server';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const { GET, POST } = auth.handler();
