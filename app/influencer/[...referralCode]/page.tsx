import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { LoadingVisitor } from "./_components/loading";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

interface InfluencerPageProps {
  params: Promise<{ referralCode?: string }>;
}

export default async function InfluencerPage({ params }: InfluencerPageProps) {
  const { referralCode } = await params;

  const { data: influencer } = await supabase
    .schema("marathon")
    .from("influencers")
    .select("*")
    .eq("referral_code", referralCode)
    .eq("is_active", true)
    .single();

  if (!influencer) {
    return notFound();
  }

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Suspense>
        <LoadingVisitor />
      </Suspense>
      <Loader2 className="animate-spin text-primary size-6" />
    </div>
  );
}
