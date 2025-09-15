import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { paypalOptions } from '../lib/paypal';

const TestPayPal: React.FC = () => {
  const [configStatus, setConfigStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkConfig();
  }, []);

  const checkConfig = async () => {
    try {
      const response = await fetch('/api/check-paypal-config');
      const data = await response.json();
      setConfigStatus(data);
    } catch (error) {
      console.error('Config check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createOrder = async (data: any, actions: any) => {
    try {
      const response = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingData: {
            name: 'Test User',
            email: 'test@example.com',
            phone: '1234567890',
            date: '2024-01-01',
            time: '12:00',
            shootingType: 'test',
          },
          amount: 1,
          currency: 'AUD',
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to create order';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      return result.orderId;
    } catch (error) {
      console.error('Order creation error:', error);
      throw error;
    }
  };

  const onApprove = async (data: any, actions: any) => {
    try {
      const response = await fetch('/api/paypal/capture-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to capture order';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      alert('Payment successful! Order ID: ' + data.orderID);
    } catch (error) {
      console.error('Capture error:', error);
      alert('Payment failed: ' + (error as Error).message);
    }
  };

  const onError = (err: any) => {
    console.error('PayPal error:', err);
    alert('PayPal error: ' + err.message);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            PayPal Payment Test
          </h1>

          {/* Configuration Status */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Configuration Status</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-600">PayPal Client ID:</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${
                    configStatus?.config?.paypalClientId ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {configStatus?.config?.paypalClientId ? '✓ Configured' : '✗ Missing'}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-600">PayPal Client Secret:</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${
                    configStatus?.config?.paypalClientSecret ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {configStatus?.config?.paypalClientSecret ? '✓ Configured' : '✗ Missing'}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-600">PayPal API URL:</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${
                    configStatus?.config?.paypalApiUrl ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {configStatus?.config?.paypalApiUrl ? '✓ Configured' : '✗ Missing'}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-600">Overall Status:</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${
                    configStatus?.configured ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {configStatus?.configured ? '✓ Ready' : '✗ Not Ready'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* PayPal Button */}
          {configStatus?.configured ? (
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Test Payment ($1.00 AUD)</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <PayPalScriptProvider options={paypalOptions}>
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                    style={{
                      layout: 'vertical',
                      color: 'blue',
                      shape: 'rect',
                      label: 'paypal',
                      height: 45,
                    }}
                  />
                </PayPalScriptProvider>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                This is a test payment. Use PayPal sandbox credentials for testing.
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-2">Configuration Required</h3>
                <p className="text-red-600 mb-4">
                  Please configure your PayPal environment variables in .env.local
                </p>
                <div className="text-left bg-white rounded p-4">
                  <p className="text-sm font-mono text-gray-800">
                    NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_client_id<br/>
                    PAYPAL_CLIENT_SECRET=your_client_secret<br/>
                    PAYPAL_API_URL=https://api-m.sandbox.paypal.com
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPayPal;

