import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";

export default function VerifyEmail() {
  return (
    <AuthLayout title="Check your email">
      <div className="mt-8 space-y-6">
        <p className="text-center text-gray-600">
          We've sent you an email with a link to verify your account. Please
          check your inbox and follow the instructions.
        </p>
        <div className="text-sm text-center">
          <Link
            to="/login"
            className="font-medium text-primary hover:text-primary/90"
          >
            Back to login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
