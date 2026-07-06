import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingPage = () => {
  const placeholders = new Array(4).fill(null);

  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">
        <Skeleton className="h-4 w-16" />
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {placeholders.map((_, i) => (
          <Card key={i} className="w-full max-w-sm">
            <CardHeader className="p-0 items-center">
              <Skeleton className="h-75 w-75" />
            </CardHeader>
            <CardContent className="p-4 grid gap-4">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex-between gap-4">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-16" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LoadingPage;
