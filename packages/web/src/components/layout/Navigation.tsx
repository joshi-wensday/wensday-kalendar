'use client'

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from '@/utils/firebase/auth';
import { ThemeToggle } from '@/components/ui/theme-toggle';

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
    <nav className="flex items-center justify-between p-4 bg-background text-foreground">
      <div className="flex space-x-4">
        <Link href="/" className="hover:text-primary">Home</Link>
        {user ? (
          <>
            <Link href="/dashboard" className="hover:text-primary">Dashboard</Link>
            <button onClick={handleSignOut} className="hover:text-primary">Sign Out</button>
          </>
        ) : (
          <>
            <Link href="/signin" className="hover:text-primary">Sign In</Link>
            <Link href="/signup" className="hover:text-primary">Sign Up</Link>
          </>
        )}
      </div>
      <ThemeToggle />
    </nav>
  );
}