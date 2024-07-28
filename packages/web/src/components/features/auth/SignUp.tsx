'use client'

import { useState } from 'react';
import { signUp } from '@/utils/firebase/auth';
import { createUserProfile } from '@/utils/firebase/user';
import { useRouter } from 'next/navigation';
import { User } from '@/utils/firebase/types';


export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user: User = await signUp(email, password);
      await createUserProfile(user);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error signing up:', error);
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
      <button type="submit">Sign Up</button>
    </form>
  );
}