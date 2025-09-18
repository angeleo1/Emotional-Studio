import { useState, useEffect } from 'react';
import MobileNavbar from '../components/MobileNavbar';
import SimplyBookIframe from '../components/SimplyBookIframe';

const MobileBookingPage: React.FC = () => {

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#111111' }}>
      <MobileNavbar />
      
      {/* SimplyBook 위젯 - iframe 모드로 표시 */}
      <SimplyBookIframe />
    </div>
  );
};


export default MobileBookingPage;
