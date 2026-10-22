'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const plans = [
  { key: 'week', title: 'Semaine', price: 35, description: 'Accès VIP d’une semaine' },
  { key: 'month', title: 'Mois', price: 130, description: 'Accès VIP mensuel' },
  { key: 'year', title: 'Année', price: 1520, description: 'Accès premium annuel' },
];

export default function PricingPage() {
  const router = useRouter();
  const [selected, setSelected] = useState('month');
  const [form, setForm] = useState({ name: '', email: '', cardName: '', cardNumber: '' });

  const currentPlan = plans.find((plan) => plan.key === selected)!;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const user = JSON.parse(window.localStorage.getItem('probafoot-user') || '{}');
    const subscription = { plan: currentPlan.key, amount: currentPlan.price, active: true };
    window.localStorage.setItem('probafoot-subscription', JSON.stringify(subscription));
    window.localStorage.setItem('probafoot-vip-status', 'active');
    window.localStorage.setItem('probafoot-user', JSON.stringify({ ...user, name: form.name || user.name || 'VIP Member' }));
    router.push('/dashboard');
  };

  return (
    <main className="app-shell">
      <div className="container">
        <header className="topbar">
          <div className="brand">
            <div className="brand-mark">P</div>
            <div className="brand-copy">
              <p className="eyebrow">VIP Predictions</p>
              <h1>PROBAFOOT</h1>
            </div>
          </div>
          <div className="nav-actions">
            <Link href="/" className="ghost-btn">Accueil</Link>
            <Link href="/login" className="secondary-btn">Connexion</Link>
          </div>
        </header>

        <section className="section">
          <div className="section-head">
            <p className="eyebrow accent">Abonnements</p>
            <h3>Choisissez votre accès VIP</h3>
          </div>

          <div className="pricing-grid">
            {plans.map((plan) => (
              <button
                key={plan.key}
                type="button"
                className={`plan-card ${selected === plan.key ? 'selected' : ''}`}
                onClick={() => setSelected(plan.key)}
              >
                <span className="plan-tag">{plan.title}</span>
                <div className="plan-price">{plan.price}€</div>
                <small>{plan.description}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="summary-card">
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-grid">
                <label>
                  Nom complet
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jean Dupont" required />
                </label>
                <label>
                  Email
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jean@mail.com" required />
                </label>
              </div>

              <div className="form-grid">
                <label>
                  Titulaire de la carte
                  <input value={form.cardName} onChange={(e) => setForm({ ...form, cardName: e.target.value })} placeholder="Jean DUPONT" required />
                </label>
                <label>
                  Numéro de carte
                  <input value={form.cardNumber} onChange={(e) => setForm({ ...form, cardNumber: e.target.value })} placeholder="4242 4242 4242 4242" required />
                </label>
              </div>

              <div className="summary-row">
                <span>Plan sélectionné</span>
                <strong>{currentPlan.title}</strong>
              </div>
              <div className="summary-row">
                <span>Total</span>
                <strong>{currentPlan.price}€</strong>
              </div>

              <button type="submit" className="submit-btn" style={{ width: '100%' }}>
                Valider l’abonnement
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
