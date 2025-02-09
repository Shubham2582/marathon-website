// app/api/verify-hash/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const payuResponse = await req.json();
    const salt = process.env.PAYU_SALT!;

    // PayU response hash verification
    const hashString = `${salt}|${payuResponse.status}||||||||||${payuResponse.email}|${payuResponse.firstname}|${payuResponse.productinfo}|${payuResponse.amount}|${payuResponse.txnid}|${process.env.PAYU_KEY}`;
    const calculatedHash = crypto.createHash('sha512').update(hashString).digest('hex');

    const isValid = calculatedHash === payuResponse.hash;

    return NextResponse.json({ isValid });
  } catch (error) {
    console.error('Hash verification error:', error);
    return NextResponse.json(
      { error: 'Hash verification failed', details: error },
      { status: 500 }
    );
  }
}