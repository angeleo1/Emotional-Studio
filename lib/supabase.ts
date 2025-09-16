import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// 서비스 역할 키를 사용하는 클라이언트 (서버 사이드에서 사용)
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
