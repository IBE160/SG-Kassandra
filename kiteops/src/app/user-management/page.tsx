"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserRole, supabase } from "@/utils/supabase";

export default function UserManagementPage() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function checkAndLoadData() {
      const role = await getUserRole();
      if (role !== "manager") {
        router.push("/login"); // Redirect unauthorized users
        return;
      }
      setUserRole(role);

      // Fetch users and roles
      const { data: usersData, error: usersError } = await supabase
        .from('users') // Assuming a 'users' table or similar for user profiles
        .select('id, email, user_roles(roles(name))');

      if (usersError) {
        console.error('Error fetching users:', usersError.message);
      } else {
        setUsers(usersData);
      }

      const { data: rolesData, error: rolesError } = await supabase
        .from('roles')
        .select('id, name');

      if (rolesError) {
        console.error('Error fetching roles:', rolesError.message);
      } else {
        setRoles(rolesData);
      }

      setLoading(false);
    }
    checkAndLoadData();
  }, [router]);

  const handleRoleChange = async (userId: string, newRoleId: string) => {
    // Implement logic to update user's role in user_roles table
    const { error } = await supabase
      .from('user_roles')
      .update({ role_id: newRoleId })
      .eq('user_id', userId);

    if (error) {
      console.error('Error updating user role:', error.message);
      alert('Failed to update user role.');
    } else {
      alert('User role updated successfully!');
      // Refresh users data
      // For simplicity, a full page reload or re-fetching data can be done here
      window.location.reload();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            User Management
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Manage user roles. Your role: {userRole}
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              User List
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              {users.map((user) => (
                <div key={user.id} className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">{user.email}</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <select
                      value={user.user_roles[0]?.roles?.id || ''}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
