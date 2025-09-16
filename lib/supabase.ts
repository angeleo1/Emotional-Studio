import { createClient } from '@supabase/supabase-js'

// 클라이언트 사이드용 (NEXT_PUBLIC_ 접두사)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// 서버 사이드용 (NEXT_PUBLIC_ 접두사 없이)
const serverSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseAdmin = createClient(serverSupabaseUrl, supabaseServiceKey)
