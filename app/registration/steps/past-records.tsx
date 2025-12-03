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
    const mobile = useRegistrationStore.getState().form.mobile;
    resetForm();
    setForm("mobile", mobile);
    setStep(3); // Go to Verification step
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-2">{t.past_records.title}</h3>
        <p className="text-sm">{t.past_records.subtitle}</p>
      </div>
      <div className="space-y-4 max-h-[200px] overflow-y-auto">
        {pastRecords.map((record: any, index) => (
          <Card key={index} className="bg-white/30">
            <CardHeader className="p-3 pb-0">
              <CardTitle className="text-lg">
                {record.first_name} {record.last_name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-1 p-3 pt-0">
              <p className="text-sm">
                Mobile: {record.mobile || record.mobile_number}
              </p>
              <p className="text-sm">Race Category: {record.race_category}</p>
              <Button
                size="sm"
                className="mt-2 w-fit"
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
