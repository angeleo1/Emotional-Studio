import { useState } from 'react';
import { motion } from 'framer-motion';

const TestBookingSystem = () => {
  const [testResults, setTestResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const testEmailSystem = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/test-email-v2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      setTestResults(result);
    } catch (error) {
      console.error('Test failed:', error);
      setTestResults({ error: 'Test failed' });
    } finally {
      setIsLoading(false);
    }
  };

  const testAvailabilitySystem = async () => {
    setIsLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await fetch(`/api/check-availability-v2?date=${today}`);
      const result = await response.json();
      setTestResults({ availability: result });
    } catch (error) {
      console.error('Availability test failed:', error);
      setTestResults({ error: 'Availability test failed' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20"
        >
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            부킹 시스템 테스트
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <button
              onClick={testEmailSystem}
              disabled={isLoading}
              className="px-6 py-4 bg-gradient-to-r from-[#FF6100] to-[#e55a00] text-white font-bold rounded-lg hover:from-[#e55a00] hover:to-[#cc4d00] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '테스트 중...' : '메일 시스템 테스트'}
            </button>

            <button
              onClick={testAvailabilitySystem}
              disabled={isLoading}
              className="px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '테스트 중...' : '예약 가능 시간 테스트'}
            </button>
          </div>

          {testResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-4">테스트 결과</h2>
              <pre className="text-gray-300 text-sm overflow-auto max-h-96">
                {JSON.stringify(testResults, null, 2)}
              </pre>
            </motion.div>
          )}

          <div className="mt-8 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl">
            <h3 className="text-lg font-bold text-yellow-400 mb-4">설정 필요사항</h3>
            <div className="text-gray-300 space-y-2">
              <p>1. <code className="bg-gray-800 px-2 py-1 rounded">.env.local</code> 파일에 다음 환경 변수를 설정하세요:</p>
              <div className="bg-gray-800 p-4 rounded-lg mt-2">
                <pre className="text-sm">
{`EMAIL_USER=your-gmail@gmail.com
EMAIL_APP_PASSWORD=your-app-password`}
                </pre>
              </div>
              <p>2. Gmail에서 앱 비밀번호를 생성하고 설정하세요.</p>
              <p>3. 테스트 버튼을 클릭하여 시스템이 정상 작동하는지 확인하세요.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestBookingSystem;
