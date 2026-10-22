'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const user = { name: email.split('@')[0], email, vip: false };
    window.localStorage.setItem('probafoot-user', JSON.stringify(user));
    router.push('/dashboard');
  };

  return (
    <main className="auth-shell">
      <div className="auth-card">
        <p className="eyebrow accent">Connexion</p>
        <h2>Accédez à PROBAFOOT</h2>
        <p className="sub">Connectez-vous pour analyser les matchs et gérer votre abonnement VIP.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          </label>

          <label>
            Mot de passe
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          </label>

          <div className="auth-actions">
            <button type="submit" className="submit-btn">Se connecter</button>
            <Link href="/signup" className="link-text">Créer un compte</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
