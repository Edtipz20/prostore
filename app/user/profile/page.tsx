import { auth } from "@/auth";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import ProfileForm from "./profile-form";
import { Suspense } from "react";
import ProfileLoader from "./loading";

export const metadata: Metadata = {
  title: "Customer Profile",
};

const Profile = async () => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className="max-w-md mx-auto space-y-4">
        <h2 className="h2-bold">Profile</h2>
        <Suspense key="customer-profile" fallback={<ProfileLoader />}>
          <ProfileForm />
        </Suspense>
      </div>
    </SessionProvider>
  );
};

export default Profile;
<>Profile</>;
