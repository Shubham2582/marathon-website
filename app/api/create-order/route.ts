import { NextResponse } from 'next/server';

interface OrderResponse {
  payment_session_id: string;
  order_id: string;
}


export async function POST() {
  try {
    // Generate a unique order ID
    const orderId = `order_${Date.now()}`;

    const response = await fetch('https://sandbox.cashfree.com/pg/orders', { // Use sandbox URL for testing
      method: 'POST',
      headers: {
        'x-client-id': process.env.CASHFREE_CLIENT_ID!,
        'x-client-secret': process.env.CASHFREE_CLIENT_SECRET!,
        'x-api-version': '2022-09-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: 1,
        order_currency: "INR",
        customer_details: {
          customer_id: "customer_" + Date.now(),
          customer_name: "John Doe",
          customer_email: "john@example.com",
          customer_phone: "9999999999"
        },
        order_meta: {
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/registration/payment-success`
          },
          order_note: ""
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Cashfree API error:', errorData);
      throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
    }

    const data: OrderResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order', details: error },
      { status: 500 }
    );
  }
} 