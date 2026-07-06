import { Skeleton } from "@/components/ui/skeleton";

const ProfileLoader = () => {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <h2 className="h2-bold">Profile</h2>
      <div className="flex flex-col gap-5">
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
      </div>
      <Skeleton className="w-full h-8 bg-accent-foreground" />
    </div>
  );
};

export default ProfileLoader;
