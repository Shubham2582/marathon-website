import { supabase } from "@/lib/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Loader } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getDriveFileByName } from "@/lib/google-drive";
import Image from "next/image";

interface ProfileProps {
  params: Promise<{
    bibNumber: number;
  }>;
}

export default async function ProfilePage({ params }: ProfileProps) {
  const { bibNumber } = await params;

  if (!bibNumber) {
    return notFound();
  }

  return (
    <main>
      <Suspense fallback={<Skeleton />}>
        <LoadingProfile bibNumber={bibNumber} />
      </Suspense>
    </main>
  );
}

const Skeleton = () => {
  return (
    <main className="h-screen w-full flex items-center justify-center">
      <Loader className="animate-spin" />
    </main>
  );
};

const Error = ({ error }: { error: string }) => {
  return (
    <main className="h-screen w-full flex items-center justify-center">
      {error}
    </main>
  );
};

const LoadingProfile = async ({ bibNumber }: { bibNumber: number }) => {
  const { data, error } = await supabase
    .schema("marathon")
    .from("registrations_2026")
    .select("*")
    .eq("bib_num", bibNumber);

  if (error) {
    return <Error error={error.message} />;
  }
  if (!data || data.length === 0) {
    return <Error error="Profile not found." />;
  }

  const profile = data[0];
  const folderId = "1BNMPReLOYta7jq87i6Ex0wpTixexbcvl";
  const profileImage = await getDriveFileByName(
    folderId,
    profile.identification_number,
  );

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Marathon Image</CardTitle>
            </CardHeader>
            <CardContent>
              {profileImage && profileImage.thumbnailLink ? (
                <Image
                  src={profileImage.thumbnailLink.replace("=s220", "=s400")}
                  alt={`Profile image of ${profile.first_name}`}
                  width={400}
                  height={400}
                  className="aspect-square object-contain rounded-md"
                />
              ) : (
                <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center">
                  <span className="text-gray-500">Image not found</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{`${profile.first_name} ${profile.last_name}`}</CardTitle>
              <CardDescription>Bib Number: {profile.bib_num}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Personal Information
                  </h3>
                  <div className="space-y-1">
                    <p>
                      <strong>Email:</strong> {profile.email}
                    </p>
                    <p>
                      <strong>Mobile:</strong> {profile.mobile}
                    </p>
                    <p>
                      <strong>Gender:</strong> {profile.gender}
                    </p>
                    <p>
                      <strong>Date of Birth:</strong> {profile.date_of_birth}
                    </p>
                    <p>
                      <strong>Blood Group:</strong> {profile.blood_group}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Address</h3>
                  <div className="space-y-1">
                    <p>
                      <strong>City:</strong> {profile.city}
                    </p>
                    <p>
                      <strong>State:</strong> {profile.state}
                    </p>
                    <p>
                      <strong>Country:</strong> {profile.country}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Race Information
                  </h3>
                  <div className="space-y-1">
                    <p>
                      <strong>Race Category:</strong> {profile.race_category}
                    </p>
                    <p>
                      <strong>T-Shirt Size:</strong> {profile.t_shirt_size}
                    </p>
                    <p>
                      <strong>Wants T-shirt:</strong>{" "}
                      {profile.wants_tshirt ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Emergency Contact
                  </h3>
                  <div className="space-y-1">
                    <p>
                      <strong>Name:</strong> {profile.emergency_contact_name}
                    </p>
                    <p>
                      <strong>Number:</strong>{" "}
                      {profile.emergency_contact_number}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Payment Details</h3>
                <div className="space-y-1">
                  <p>
                    <strong>Payment Status:</strong> {profile.payment_status}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
