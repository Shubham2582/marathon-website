import { RegistrationForm } from "@/types/form";
import { CashfreeCheckoutConfig, CashfreeConfig, CashfreeInstance, load } from "@cashfreepayments/cashfree-js";

export const initializeSDK = async (): Promise<CashfreeInstance> => {
    const config: CashfreeConfig = {
        mode: "production",
        redirectTarget: "_self",
        paymentSessionId: "" // This can be empty during initialization
    };
    const cashfreeInstance = await load(config);
    return cashfreeInstance;
};

export const doPayment = async (cashfree: CashfreeInstance, registrationFee: number, form: RegistrationForm, identificationNumber: string): Promise<void> => {
    try {
        if (!cashfree) {
            throw new Error('Cashfree SDK not initialized');
        }

        // Call your API route
        const response = await fetch('/api/create-order', {
            method: 'POST',
            body: JSON.stringify({
                amount: registrationFee,
                name: form.firstName + " " + form.lastName,
                email: form.email,
                phone: form.mobile,
                identification_number: identificationNumber,
            })
        });

        if (!response.ok) {
            throw new Error('Failed to create order');
        }

        const orderDetails = await response.json();
        console.log(orderDetails);

        if (!orderDetails.payment_session_id) {
            throw new Error('Payment session ID not found');
        }

        const checkoutOptions: CashfreeCheckoutConfig = {
            mode: "production",
            redirectTarget: "_self",
            paymentSessionId: orderDetails.payment_session_id,
            onSuccess: (data) => {
                console.log("Payment success", data);
            },
            onFailure: (data) => {
                console.log("Payment failed", data);
            },
            onError: (error) => {
                console.log("Error", error);
            }

        };

        cashfree.checkout(checkoutOptions);
    } catch (error) {
        console.error('Payment initiation failed:', error);
    }
};