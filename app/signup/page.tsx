'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    window.localStorage.setItem('probafoot-user', JSON.stringify({ ...form, vip: false }));
    router.push('/pricing');
  };

  return (
    <main className="auth-shell">
      <div className="auth-card">
        <p className="eyebrow accent">Inscription</p>
        <h2>Créer votre compte</h2>
        <p className="sub">Rejoignez PROBAFOOT et choisissez votre abonnement VIP.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Nom complet
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jean Dupont" required />
          </label>

          <label>
            Email
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jean@mail.com" required />
          </label>

          <label>
            Mot de passe
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" required />
          </label>

          <div className="auth-actions">
            <button type="submit" className="submit-btn">Créer mon compte</button>
            <Link href="/login" className="link-text">J’ai déjà un compte</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
