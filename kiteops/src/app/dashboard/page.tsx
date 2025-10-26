"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserRole } from "@/utils/supabase";

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkRole() {
      const role = await getUserRole();
      if (role !== "manager") {
        router.push("/login"); // Redirect unauthorized users
      } else {
        setUserRole(role);
        setLoading(false);
      }
    }
    checkRole();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Manager Dashboard
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome, Manager! Your role is: {userRole}
          </p>
        </div>
      </div>
    </div>
  );
}
