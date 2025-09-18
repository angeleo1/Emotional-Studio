import { useState, useEffect } from 'react';
import MobileNavbar from '../components/MobileNavbar';
import SimplyBookWidget from '../components/SimplyBookWidget';

const MobileBookingPage: React.FC = () => {

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#111111' }}>
      <MobileNavbar />
      
      {/* SimplyBook 위젯 - 버튼 모드로 표시 */}
      <SimplyBookWidget />
    </div>
  );
};


export default MobileBookingPage;
