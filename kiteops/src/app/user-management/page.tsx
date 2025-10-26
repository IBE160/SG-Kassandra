"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserRole, supabase } from "@/utils/supabase";

export default function UserManagementPage() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function checkAndLoadData() {
      const role = await getUserRole();
      if (role !== "manager") {
        router.push("/login"); // Redirect unauthorized users
        return;
      }
      setUserRole(role);

      const { data: usersData, error: usersError } = await supabase
        .from('all_users_with_roles')
        .select('id, email, user_metadata, full_name, contact_number, role_name, role_id');

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
    const { error } = await supabase
      .from('user_roles')
      .update({ role_id: newRoleId })
      .eq('user_id', userId);

    if (error) {
      console.error('Error updating user role:', error.message);
      alert('Failed to update user role.');
    } else {
      alert('User role updated successfully!');
      // Re-fetch users data to reflect the change
      const { data: usersData, error: usersError } = await supabase
        .from('all_users_with_roles')
        .select('id, email, user_metadata, full_name, contact_number, role_name, role_id');

      if (usersError) {
        console.error('Error re-fetching users:', usersError.message);
      } else {
        setUsers(usersData);
      }
    }
  };

  const handleDeactivateActivate = async (userId: string, isActive: boolean) => {
    const { error } = await supabase.auth.admin.updateUserById(userId, {
      user_metadata: { is_active: isActive },
    });

    if (error) {
      console.error('Error updating user status:', error.message);
      alert('Failed to update user status.');
    } else {
      alert(`User ${isActive ? 'activated' : 'deactivated'} successfully!`);
      // Re-fetch users data to reflect the change
      const { data: usersData, error: usersError } = await supabase
        .from('all_users_with_roles')
        .select('id, email, user_metadata, full_name, contact_number, role_name, role_id');

      if (usersError) {
        console.error('Error re-fetching users:', usersError.message);
      } else {
        setUsers(usersData);
      }
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearchTerm =
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "" || user.role_name === filterRole;
    return matchesSearchTerm && matchesRole;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            User Management
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Manage user roles. Your role: {userRole}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
          <input
            type="text"
            placeholder="Search by email or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="max-w-xs w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">All Roles</option>
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              User List
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Number</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.full_name || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.contact_number || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <select
                        value={user.role_id || ''}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        {roles.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.user_metadata?.is_active === false ? 'Inactive' : 'Active'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {user.user_metadata?.is_active === false ? (
                        <button
                          onClick={() => handleDeactivateActivate(user.id, true)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Activate
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDeactivateActivate(user.id, false)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Deactivate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
