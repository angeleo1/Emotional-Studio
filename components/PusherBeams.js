import { useEffect } from 'react';

export default function PusherBeams() {
  useEffect(() => {
    // Pusher Beams 클라이언트 초기화
    const beamsClient = new PusherPushNotifications.Client({
      instanceId: '43c63552-1e0a-4648-a932-db267a634a77',
    });

    beamsClient.start()
      .then(() => beamsClient.addDeviceInterest('hello'))
      .then(() => console.log('Successfully registered and subscribed!'))
      .catch(console.error);

    // 컴포넌트 언마운트 시 정리
    return () => {
      beamsClient.stop();
    };
  }, []);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
} 