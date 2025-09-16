import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('=== Supabase 테스트 시작 ===');
    
    // 환경 변수 확인
    const envCheck = {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT_SET',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT_SET',
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'NOT_SET',
    };
    
    console.log('환경 변수 상태:', envCheck);
    
    // 가장 간단한 쿼리로 테스트
    const { data, error } = await supabaseAdmin
      .from('bookings')
      .select('id, booking_id, date, time')
      .limit(1);
    
    if (error) {
      console.error('Supabase 쿼리 에러:', error);
      return res.status(500).json({
        success: false,
        error: error.message,
        envCheck
      });
    }
    
    console.log('Supabase 쿼리 성공:', data);
    
    res.status(200).json({
      success: true,
      message: 'Supabase 연결 성공',
      envCheck,
      data: data || []
    });
    
  } catch (error) {
    console.error('테스트 에러:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
