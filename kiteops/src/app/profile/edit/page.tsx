"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState<string | null>(null);
  const [contactNumber, setContactNumber] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [newEmail, setNewEmail] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function getProfile() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setEmail(user.email);
      setNewEmail(user.email);

      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, contact_number')
        .eq('id', user.id)
        .single();

      if (error) {
        console.warn(error.message);
      } else if (data) {
        setFullName(data.full_name);
        setContactNumber(data.contact_number);
      }

      setLoading(false);
    }

    getProfile();
  }, [router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setMessage("User not logged in.");
      return;
    }

    // Basic validation (AC: 4)
    if (!fullName || fullName.trim() === "") {
      setMessage("Full name cannot be empty.");
      return;
    }

    // Update profile data
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: fullName,
        contact_number: contactNumber,
        updated_at: new Date().toISOString(),
      });

    if (profileError) {
      setMessage(profileError.message);
      return;
    }

    // Handle email update (AC: 6)
    if (newEmail && newEmail !== email) {
      const { error: emailUpdateError } = await supabase.auth.updateUser({
        email: newEmail,
      });

      if (emailUpdateError) {
        setMessage(emailUpdateError.message);
        return;
      } else {
        setMessage("Profile and email updated successfully! Please check your new email for a confirmation link.");
      }
    } else {
      setMessage("Profile updated successfully!");
    }

    router.push("/profile"); // Redirect back to profile page
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Edit Your Profile
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleUpdate}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="full-name" className="sr-only">
                Full Name
              </label>
              <input
                id="full-name"
                name="full-name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                value={fullName || ''}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={newEmail || ''}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="contact-number" className="sr-only">
                Contact Number
              </label>
              <input
                id="contact-number"
                name="contact-number"
                type="text"
                autoComplete="tel"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Contact Number"
                value={contactNumber || ''}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Profile
            </button>
          </div>

          {message && (
            <p className="mt-2 text-center text-sm text-gray-600">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
