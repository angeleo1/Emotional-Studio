import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('=== Supabase 연결 테스트 ===');
    
    // 환경변수 확인
    console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'EXISTS' : 'NOT_FOUND');
    console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'EXISTS' : 'NOT_FOUND');
    
    // Supabase 연결 테스트
    const { data, error } = await supabaseAdmin
      .from('bookings')
      .select('*')
      .limit(5);
    
    if (error) {
      console.error('Supabase 에러:', error);
      return res.status(500).json({ 
        error: 'Supabase connection failed',
        details: error.message 
      });
    }
    
    console.log('Supabase 연결 성공! 데이터 개수:', data?.length || 0);
    
    res.status(200).json({ 
      success: true, 
      dataCount: data?.length || 0,
      sampleData: data?.slice(0, 3) || []
    });
    
  } catch (error) {
    console.error('테스트 에러:', error);
    res.status(500).json({ 
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}