import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getUserRole() {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }

  const { data: userRoleData, error: userRoleError } = await supabase
    .from('user_roles')
    .select('role_id, roles(name)')
    .eq('user_id', session.user.id)
    .single();

  if (userRoleError) {
    console.error('Error fetching user role:', userRoleError.message);
    return null;
  }

  return userRoleData.roles.name;
}
