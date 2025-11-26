// lib/payu.ts
import { RegistrationForm } from "@/types/form";
import { TeamDetails } from "@/store/useTeamRegistration";

export const initiatePayment = async (
  registrationFee: number,
  formData: RegistrationForm,
  identificationNumber: string
): Promise<void> => {
  try {
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: registrationFee,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.mobile,
        identification_number: identificationNumber,
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    const paymentData = await response.json();

    // Create a hidden form for PayU submission
    const paymentForm = document.createElement('form');
    paymentForm.method = 'POST';
    paymentForm.action = 'https://secure.payu.in/_payment';

    // Add all required fields
    Object.entries(paymentData).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value as string;
      paymentForm.appendChild(input);
    });

    // Append form to body and submit
    document.body.appendChild(paymentForm);
    paymentForm.submit();
  } catch (error) {
    console.error('Payment initiation failed:', error);
    throw error;
  }
};

export const initiateTeamPayment = async (
  registrationFee: number,
  formData: TeamDetails,
  teamId: string
): Promise<void> => {
  try {
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: registrationFee,
        name: formData.team_name,
        email: formData.email,
        phone: formData.members[0].mobile,
        identification_number: teamId,
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    const paymentData = await response.json();

    // Create a hidden form for PayU submission
    const paymentForm = document.createElement('form');
    paymentForm.method = 'POST';
    paymentForm.action = 'https://secure.payu.in/_payment';

    // Add all required fields
    Object.entries(paymentData).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value as string;
      paymentForm.appendChild(input);
    });

    // Append form to body and submit
    document.body.appendChild(paymentForm);
    paymentForm.submit();
  } catch (error) {
    console.error('Payment initiation failed:', error);
    throw error;
  }
};
