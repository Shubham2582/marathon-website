import { NextResponse } from 'next/server';
import crypto from 'crypto';

interface PayUOrderRequest {
  amount: number;
  name: string;
  email: string;
  phone: string;
  identification_number: string;
}

const generateHash = (params: PayUOrderRequest, txnid: string) => {
  const salt = process.env.PAYU_SALT!;
  const hashString = `${process.env.PAYU_KEY}|${txnid}|${params.amount}|Marathon Registration|${params.name}|${params.email}|||||||||||${salt}`;
  return crypto.createHash('sha512').update(hashString).digest('hex');
};

export async function POST(req: Request) {
  try {
    const params: PayUOrderRequest = await req.json();
    const txnid = `txn_${Date.now()}`;
    
    const hash = generateHash(params, txnid);

    const paymentData = {
      key: process.env.PAYU_KEY,
      txnid,
      amount: params.amount,
      productinfo: "Marathon Registration",
      firstname: params.name,
      email: params.email,
      phone: params.phone,
      surl: encodeURI(`${process.env.NEXT_PUBLIC_APP_URL}/registration/payment-success?identification_number=${params.identification_number}`),
      furl: encodeURI(`${process.env.NEXT_PUBLIC_APP_URL}/registration/payment-failure?identification_number=${params.identification_number}`),
      hash,
    };
    
    return NextResponse.json(paymentData);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order', details: error },
      { status: 500 }
    );
  }
}
