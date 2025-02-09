import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const url = new URL(req.url);

        // Get identification number from multiple possible sources
        const identificationNumber = url.searchParams.get('identification_number');

        // Redirect to the success page with parameters using 302 Found status
        return new NextResponse(null, {
            status: 302,
            headers: {
                'Location': `/registration/payment-success?identification_number=${identificationNumber}`,
            },
        });
    } catch (error) {
        console.error('Payment callback error:', error);
        return new NextResponse(null, {
            status: 302,
            headers: {
                'Location': '/registration/payment-failure',
            },
        });
    }
}
