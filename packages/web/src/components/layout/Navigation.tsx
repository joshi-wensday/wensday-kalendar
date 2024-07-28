'use client'

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from '@/utils/firebase/auth';

export default function Navigation() {
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to home page or show a message
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav>
      <Link href="/">Home</Link>
      {user ? (
        <>
          <Link href="/dashboard">Dashboard</Link>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <>
          <Link href="/signin">Sign In</Link>
          <Link href="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
}