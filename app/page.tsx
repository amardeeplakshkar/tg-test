"use client"
import WebApp from '@twa-dev/sdk';
import { useEffect, useState } from 'react';

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saveUserData = async (user: UserData) => {
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
        if (!response.ok) {
          throw new Error('Failed to update user data');
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error:', error.message);
        } else {
          console.error('Unknown error:', error);
        }
      }
    };
  
    if (typeof window !== 'undefined') {
      try {
        const user = WebApp.initDataUnsafe.user;
        if (user) {
          setUserData(user as UserData);
          saveUserData(user as UserData); // Call API to save user data
        } else {
          const dummyUser = {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
            language_code: 'en',
            is_premium: true,
          };
          setUserData(dummyUser);
          saveUserData(dummyUser); // Call API to save dummy data
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    }
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }

  return (
    <main className="bg-gray-900 text-white p-6 min-h-screen flex items-center justify-center">
      {userData ? (
        <div className="max-w-lg bg-gray-800 rounded-lg shadow-lg p-6 w-full">
          <h1 className="text-3xl font-bold mb-6 text-center">Hukam's Telegram Mini App</h1>
          <h3 className="text-2xl font-semibold mb-4">User Data</h3>
          <ul className="space-y-2">
            <li className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition duration-300">
              <strong>ID:</strong> {userData.id}
            </li>
            <li className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition duration-300">
              <strong>First Name:</strong> {userData.first_name}
            </li>
            <li className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition duration-300">
              <strong>Last Name:</strong> {userData.last_name || 'N/A'}
            </li>
            <li className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition duration-300">
              <strong>Username:</strong> {userData.username || 'N/A'}
            </li>
            <li className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition duration-300">
              <strong>Language Code:</strong> {userData.language_code}
            </li>
            <li className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition duration-300">
              <strong>Is Premium:</strong> {userData.is_premium ? 'Yes' : 'No'}
            </li>
          </ul>
        </div>
      ) : (
        <div className="text-center text-lg">Loading...</div>
      )}
    </main>
  );
}
