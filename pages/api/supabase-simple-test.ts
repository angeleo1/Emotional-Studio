import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('=== Supabase 간단 테스트 ===');
    
    // 환경 변수 확인
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    console.log('Supabase URL:', supabaseUrl ? 'SET' : 'NOT_SET');
    console.log('Service Key:', supabaseKey ? 'SET' : 'NOT_SET');
    
    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({
        success: false,
        error: 'Missing Supabase credentials',
        supabaseUrl: !!supabaseUrl,
        supabaseKey: !!supabaseKey
      });
    }
    
    // Supabase 클라이언트 직접 생성
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // 가장 간단한 쿼리
    const { data, error } = await supabase
      .from('bookings')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('Supabase 에러:', error);
      return res.status(500).json({
        success: false,
        error: error.message,
        details: error
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Supabase 연결 성공',
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
