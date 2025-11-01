"use client";

import { useRegistrationStore } from "@/store/useRegistration";
import { useStep } from "@/store/useStep";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegistrationForm } from "@/types/form";
import { useTranslation } from "@/store/useLanguage";
import { getPincodeFromCityAndState } from "@/services/pincodeService";
import { useState } from "react";

const toCamelCase = (s: string) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

const mapSupabaseRecordToForm = (record: any): Partial<RegistrationForm> => {
  const formRecord: Partial<RegistrationForm> = {};
  for (const key in record) {
    const camelCaseKey = toCamelCase(key);
    formRecord[camelCaseKey as keyof RegistrationForm] = record[key];
  }
  return formRecord;
};

export const PastRecords = () => {
  const { pastRecords, setForm, resetForm } = useRegistrationStore();
  const { setStep } = useStep();
  const t = useTranslation();
  const [loading, setLoading] = useState<number | null>(null);

  const handleSelectRecord = async (record: any, index: number) => {
    setLoading(index);
    const mappedRecord = mapSupabaseRecordToForm(record);
    console.log(mappedRecord);

    if (!mappedRecord.pincode && mappedRecord.city && mappedRecord.state) {
      try {
        const pincode = await getPincodeFromCityAndState(
          mappedRecord.city,
          mappedRecord.state as string,
        );
        if (pincode) {
          mappedRecord.pincode = pincode;
        }
      } catch (error) {
        console.error("Could not fetch pincode:", error);
      }
    }

    for (const key in mappedRecord) {
      if (Object.prototype.hasOwnProperty.call(mappedRecord, key)) {
        setForm(
          key as keyof RegistrationForm,
          mappedRecord[key as keyof RegistrationForm],
        );
      }
    }
    setLoading(null);
    setStep(4); // Go to Personel step
  };

  const handleNewRegistration = () => {
    const email = useRegistrationStore.getState().form.email;
    resetForm();
    setForm("email", email);
    setStep(3); // Go to Verification step
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">{t.past_records.title}</h3>
      <p>{t.past_records.subtitle}</p>
      <div className="space-y-4">
        {pastRecords.map((record: any, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>
                {record.first_name} {record.last_name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Email: {record.email}</p>
              <p>Race Category: {record.race_category}</p>
              <Button
                onClick={() => handleSelectRecord(record, index)}
                disabled={loading === index}
              >
                {loading === index
                  ? t.past_records.loading
                  : t.past_records.continue_button}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-end">
        <Button onClick={handleNewRegistration} variant="outline">
          {t.past_records.new_registration_button}
        </Button>
      </div>
    </div>
  );
};
