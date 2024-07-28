'use client'

import { useState } from 'react';
import { signIn } from '@/utils/firebase/auth';
import { useRouter } from 'next/navigation';
import { User } from '@/utils/firebase/types';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user: User = await signIn(email, password);
      console.log("Sign in successful", user);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error signing in:', error);
      // Handle error (e.g., display error message)
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Sign In</button>
    </form>
  );
}