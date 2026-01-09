"use client";

import { supabase } from "@/lib/supabase";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export async function getVisitorId() {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId;
}

export const LoadingVisitor = () => {
  const params = useParams();
  const referralCode = params.referralCode?.[0];
  const router = useRouter();

  const handleVisitor = async () => {
    let visitorId = localStorage.getItem("visitorId");
    if (!visitorId) {
      getVisitorId().then((id) => {
        localStorage.setItem("visitorId", id);
        visitorId = id;
      });
    }

    if (visitorId && referralCode) {
      localStorage.setItem("referralId", referralCode);

      const exists = await supabase
        .schema("marathon")
        .from("referral_clicks")
        .select("*")
        .eq("visitor_id", visitorId)
        .single();

      if (!exists.data) {
        await supabase.schema("marathon").from("referral_clicks").insert({
          referral_code: referralCode,
          visitor_id: visitorId,
        });
      }
    }

    router.push("/registration");
  };

  useEffect(() => {
    handleVisitor();
  }, []);

  return <></>;
};
