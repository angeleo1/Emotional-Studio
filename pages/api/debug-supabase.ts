import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('=== Supabase 디버깅 시작 ===');
    
    // 환경 변수 확인
    const envCheck = {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT_SET',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT_SET',
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'NOT_SET',
    };
    
    console.log('환경 변수 상태:', envCheck);
    
    // Supabase 연결 테스트 - 간단한 쿼리
    const { data, error } = await supabaseAdmin
      .from('bookings')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('Supabase 연결 에러:', error);
      return res.status(500).json({
        success: false,
        error: error.message,
        envCheck
      });
    }
    
    console.log('Supabase 연결 성공:', data);
    
    res.status(200).json({
      success: true,
      message: 'Supabase 연결 성공',
      envCheck,
      data
    });
    
  } catch (error) {
    console.error('디버깅 에러:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
