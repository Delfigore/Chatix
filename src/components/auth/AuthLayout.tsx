import { Card } from "@/components/ui/card";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md space-y-8 p-8 bg-white">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            {title}
          </h2>
        </div>
        {children}
      </Card>
    </div>
  );
}
