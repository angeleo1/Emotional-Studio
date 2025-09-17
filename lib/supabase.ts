import { createClient } from '@supabase/supabase-js'

// 클라이언트 사이드용 (NEXT_PUBLIC_ 접두사)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables for client');
  throw new Error('Supabase client configuration is missing');
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// 서버 사이드용
const serverSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!serverSupabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables for server');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.error('SUPABASE_URL:', !!process.env.SUPABASE_URL);
  console.error('SUPABASE_SERVICE_ROLE_KEY:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
  throw new Error('Supabase server configuration is missing');
}

export const supabaseAdmin = createClient(serverSupabaseUrl, supabaseServiceKey)
