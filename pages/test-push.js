import { useState } from 'react';

export default function TestPush() {
  const [title, setTitle] = useState('Hello');
  const [body, setBody] = useState('Hello, world!');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendPushNotification = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/test-push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-white mb-6">Push Notification Test</h1>
          
          <div className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="Notification title"
              />
            </div>
            
            <div>
              <label className="block text-white text-sm font-medium mb-2">Body</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={3}
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                placeholder="Notification message"
              />
            </div>
            
            <button
              onClick={sendPushNotification}
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-2xl font-medium transition-colors"
            >
              {loading ? 'Sending...' : 'Send Push Notification'}
            </button>
            
            {result && (
              <div className={`p-4 rounded-2xl border ${
                result.error 
                  ? 'bg-red-500/20 border-red-500/30 text-red-200' 
                  : 'bg-green-500/20 border-green-500/30 text-green-200'
              }`}>
                <h3 className="font-medium mb-2">
                  {result.error ? 'Error' : 'Success'}
                </h3>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 