// Supabase 기반 부킹 저장소 (영구 저장)
import { supabaseAdmin } from './supabase';

interface Booking {
  id?: string;
  booking_id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  shooting_type: string;
  color_option: boolean;
  a4print: boolean;
  a4frame: boolean;
  digital: boolean;
  additional_retouch: number;
  message: string;
  total_amount: string;
  payment_status: string;
  payment_intent_id: string;
  status: string;
  created_at?: string;
}

// 부킹 저장
export async function saveBooking(bookingData: any): Promise<void> {
  try {
    console.log('=== saveBooking (Supabase) 시작 ===');
    console.log('받은 bookingData:', JSON.stringify(bookingData, null, 2));

    const newBooking: Booking = {
      booking_id: bookingData.bookingId,
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      date: bookingData.date,
      time: bookingData.time,
      shooting_type: bookingData.shootingType,
      color_option: bookingData.colorOption || false,
      a4print: bookingData.a4print || false,
      a4frame: bookingData.a4frame || false,
      digital: bookingData.digital || false,
      additional_retouch: bookingData.additionalRetouch || 0,
      message: bookingData.message || '',
      total_amount: bookingData.totalAmount || '0',
      payment_status: bookingData.paymentStatus || 'completed',
      payment_intent_id: bookingData.paymentIntentId || '',
      status: 'confirmed'
    };

    console.log('생성된 newBooking:', JSON.stringify(newBooking, null, 2));

    // Supabase에 저장
    const { data, error } = await supabaseAdmin
      .from('bookings')
      .upsert(newBooking, { 
        onConflict: 'booking_id',
        ignoreDuplicates: false 
      })
      .select();

    if (error) {
      console.error('Supabase 저장 에러:', error);
      throw new Error(`Failed to save booking: ${error.message}`);
    }

    console.log('Booking saved to Supabase:', data);
    console.log('=== saveBooking (Supabase) 완료 ===');
  } catch (error) {
    console.error('Error saving booking to Supabase:', error);
    throw error;
  }
}

// 특정 날짜의 예약된 시간 조회
export async function getBookedTimesForDate(date: string): Promise<string[]> {
  try {
    console.log('=== getBookedTimesForDate (Supabase) 시작 ===');
    console.log('Query date:', date);

    const { data, error } = await supabaseAdmin
      .from('bookings')
      .select('time')
      .eq('date', date)
      .in('status', ['confirmed', 'completed']);

    if (error) {
      console.error('Supabase 조회 에러:', error);
      return [];
    }

    const bookedTimes = data?.map(booking => booking.time) || [];
    console.log(`Found ${bookedTimes.length} booked times for ${date}:`, bookedTimes);
    console.log('=== getBookedTimesForDate (Supabase) 완료 ===');
    
    return bookedTimes;
  } catch (error) {
    console.error('Error getting booked times from Supabase:', error);
    return [];
  }
}

// 모든 예약 조회
export async function getAllBookings(): Promise<Booking[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase 조회 에러:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error getting all bookings from Supabase:', error);
    return [];
  }
}

// 특정 예약 조회
export async function getBookingById(bookingId: string): Promise<Booking | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('bookings')
      .select('*')
      .eq('booking_id', bookingId)
      .single();

    if (error) {
      console.error('Supabase 조회 에러:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error getting booking by ID from Supabase:', error);
    return null;
  }
}

// 예약 삭제
export async function deleteBooking(bookingId: string): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin
      .from('bookings')
      .delete()
      .eq('booking_id', bookingId);

    if (error) {
      console.error('Supabase 삭제 에러:', error);
      return false;
    }

    console.log('Booking deleted from Supabase:', bookingId);
    return true;
  } catch (error) {
    console.error('Error deleting booking from Supabase:', error);
    return false;
  }
}

// 모든 예약 삭제 (테스트용)
export async function clearAllBookings(): Promise<void> {
  try {
    const { error } = await supabaseAdmin
      .from('bookings')
      .delete()
      .neq('id', ''); // 모든 레코드 삭제

    if (error) {
      console.error('Supabase 전체 삭제 에러:', error);
      throw error;
    }

    console.log('All bookings cleared from Supabase');
  } catch (error) {
    console.error('Error clearing all bookings from Supabase:', error);
    throw error;
  }
}
