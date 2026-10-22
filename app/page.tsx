'use client';

import { useEffect, useMemo, useState } from 'react';

type SubscriptionKey = 'week' | 'month' | 'year';

type SliderConfig = {
  key: string;
  label: string;
  description: string;
};

const sliderConfig: SliderConfig[] = [
  { key: 'recentForm', label: 'Forme récente', description: '3 derniers matchs' },
  { key: 'starPlayers', label: 'Titulaires', description: 'Performances individuelles' },
  { key: 'headToHead', label: 'Face à face', description: 'Résultats entre adversaires' },
  { key: 'immediatePressure', label: 'Enjeu immédiat', description: 'Urgence de cette rencontre' },
  { key: 'seasonGoal', label: 'Objectif saison', description: 'Motive la formation' },
  { key: 'attack', label: 'Attaque', description: 'Capacité offensive' },
  { key: 'defense', label: 'Défense', description: 'Solidité défensive' },
];

const pricePlans = [
  { key: 'week' as SubscriptionKey, title: 'Semaine', price: 35, description: 'Accès VIP d’une semaine' },
  { key: 'month' as SubscriptionKey, title: 'Mois', price: 130, description: 'Accès VIP mensuel' },
  { key: 'year' as SubscriptionKey, title: 'Année', price: 1520, description: 'Accès premium annuel' },
];

const matchData = {
  homeTeam: 'Bayern Munich',
  awayTeam: 'Real Madrid',
  competition: 'Finale nationale',
  kickoff: '20:45',
  homeLastMatches: [2, 1, 3],
  awayLastMatches: [1, 2, 2],
  homePlayers: ['Kim', 'Kimmich', 'Müller', 'Musiala', 'Harry Kane'],
  awayPlayers: ['Bellingham', 'Vinicius', 'Valverde', 'Rüdiger', 'Courtois'],
  homeVsAway: ['1-0', '2-2', '3-1'],
  homeForm: 'Très forte de 3 matches sans défaite',
  awayForm: 'Bonne dynamique mais vulnérable en défense',
  homeObjectives: 'Valider le titre et sécuriser la qualification',
  attackHome: 88,
  defenseHome: 76,
  attackAway: 85,
  defenseAway: 72,
};

export default function Home() {
  const [weights, setWeights] = useState<Record<string, number>>({
    recentForm: 76,
    starPlayers: 72,
    headToHead: 58,
    immediatePressure: 80,
    seasonGoal: 70,
    attack: 82,
    defense: 63,
  });

  const [selectedPlan, setSelectedPlan] = useState<SubscriptionKey>('month');
  const [paymentDone, setPaymentDone] = useState(false);
  const [isVipActive, setIsVipActive] = useState(false);
  const [stake, setStake] = useState(50);
  const [selectedOdd, setSelectedOdd] = useState<'1' | 'N' | '2'>('1');
  const [oddValue, setOddValue] = useState(2.1);
  const [form, setForm] = useState({
    name: '',
    email: '',
    cardName: '',
    cardNumber: '',
  });

  useEffect(() => {
    const active = window.localStorage.getItem('probafoot-vip-status');
    if (active === 'active') {
      setIsVipActive(true);
    }
  }, []);

  const marketProbabilities = useMemo(() => {
    const values = Object.values(weights);
    const total = values.reduce((sum, value) => sum + value, 0);

    const home = ((weights.recentForm + weights.headToHead + weights.immediatePressure + weights.attack) / total) * 100;
    const draw = ((weights.starPlayers + weights.seasonGoal + weights.defense) / total) * 100;
    const away = 100 - home - draw;

    return {
      home: Math.max(5, Math.min(90, home)),
      draw: Math.max(5, Math.min(50, draw)),
      away: Math.max(5, Math.min(90, away)),
    };
  }, [weights]);

  const probabilityValues = useMemo(() => {
    const home = Number(marketProbabilities.home.toFixed(1));
    const draw = Number(marketProbabilities.draw.toFixed(1));
    const away = Number((100 - home - draw).toFixed(1));
    return { home, draw, away };
  }, [marketProbabilities]);

  const netProfit = useMemo(() => {
    const payout = stake * oddValue;
    return payout - stake;
  }, [stake, oddValue]);

  const currentPlan = pricePlans.find((plan) => plan.key === selectedPlan)!;

  const handleSlider = (key: string, value: number) => {
    setWeights((prev) => ({ ...prev, [key]: value }));
  };

  const handlePayment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPaymentDone(true);
    setIsVipActive(true);
    window.localStorage.setItem('probafoot-vip-status', 'active');
  };

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark">P</div>
          <div>
            <p className="eyebrow">VIP Predictions</p>
            <h1>PROBAFOOT</h1>
          </div>
        </div>
        <div className="nav-actions">
          <span className={`vip-pill ${isVipActive ? 'active' : ''}`}>
            {isVipActive ? 'Compte VIP actif' : 'Accès standard'}
          </span>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow accent">Pronostiques Premium</p>
          <h2>Anticipez les rencontres avec un moteur de probabilités robuste.</h2>
          <p className="supporting-text">
            Analyse des 3 derniers matchs, des titulaires, du contexte du match, des objectifs de saison,
            de la forme défensive et offensive, ainsi que des statistiques face à face.
          </p>
          <div className="cta-row">
            <a href="#vip" className="primary-btn">S’abonner VIP</a>
            <a href="#engine" className="secondary-btn">Voir le moteur</a>
          </div>
        </div>

        <div className="hero-panel">
          <div className="match-headline">
            <span>{matchData.competition}</span>
            <span>{matchData.kickoff}</span>
          </div>
          <div className="team-grid">
            <div>
              <div className="team-name">{matchData.homeTeam}</div>
              <small>Forme: {matchData.homeForm}</small>
            </div>
            <div className="versus">VS</div>
            <div>
              <div className="team-name">{matchData.awayTeam}</div>
              <small>Forme: {matchData.awayForm}</small>
            </div>
          </div>
          <ul className="mini-stats">
            <li><strong>3 derniers</strong> {matchData.homeLastMatches.join(' - ')} / {matchData.awayLastMatches.join(' - ')}</li>
            <li><strong>Face à face</strong> {matchData.homeVsAway.join(' • ')}</li>
            <li><strong>Attaque / Défense</strong> {matchData.attackHome} / {matchData.defenseHome} vs {matchData.attackAway} / {matchData.defenseAway}</li>
          </ul>
        </div>
      </section>

      <section className="grid-section">
        <div className="analysis-card">
          <h3>Analyse du match</h3>
          <div className="metric-list">
            <div>
              <span>3 derniers matchs</span>
              <strong>{matchData.homeLastMatches.join(' - ')}</strong>
            </div>
            <div>
              <span>Titulaires clés</span>
              <strong>{matchData.homePlayers.slice(0, 3).join(', ')}</strong>
            </div>
            <div>
              <span>Rivalité</span>
              <strong>{matchData.homeVsAway.join(' • ')}</strong>
            </div>
            <div>
              <span>Objectif de saison</span>
              <strong>{matchData.homeObjectives}</strong>
            </div>
            <div>
              <span>Enjeu pratique</span>
              <strong>Qualification directe et prestige local</strong>
            </div>
            <div>
              <span>État de forme</span>
              <strong>{matchData.homeForm}</strong>
            </div>
          </div>
        </div>

        <div className="analysis-card">
          <h3>État des joueurs</h3>
          <div className="player-boxes">
            {matchData.homePlayers.map((player) => (
              <div key={player} className="player-tag">{player}</div>
            ))}
          </div>
          <div className="player-boxes secondary">
            {matchData.awayPlayers.map((player) => (
              <div key={player} className="player-tag away">{player}</div>
            ))}
          </div>
          <div className="summary-box">
            <span>Écart tactique</span>
            <strong>Pressing haut + transitions rapides côté domicile</strong>
          </div>
        </div>
      </section>

      <section id="engine" className="engine-section">
        <div className="section-heading">
          <p className="eyebrow accent">Moteur probabiliste</p>
          <h3>7 curseurs en temps réel</h3>
        </div>

        <div className="sliders-panel">
          {sliderConfig.map((slider) => (
            <div key={slider.key} className="slider-item">
              <div className="slider-header">
                <label>{slider.label}</label>
                <span>{weights[slider.key]}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={weights[slider.key]}
                onChange={(event) => handleSlider(slider.key, Number(event.target.value))}
              />
              <small>{slider.description}</small>
            </div>
          ))}
        </div>

        <div className="probability-card">
          <div className="probability-head">
            <span>Distribution probabiliste</span>
            <strong>1 - N - 2</strong>
          </div>
          <div className="probability-bars">
            <div className="probability-item home">
              <span>1</span>
              <div className="bar-track"><div style={{ width: `${probabilityValues.home}%` }} /></div>
              <strong>{probabilityValues.home}%</strong>
            </div>
            <div className="probability-item draw">
              <span>N</span>
              <div className="bar-track"><div style={{ width: `${probabilityValues.draw}%` }} /></div>
              <strong>{probabilityValues.draw}%</strong>
            </div>
            <div className="probability-item away">
              <span>2</span>
              <div className="bar-track"><div style={{ width: `${probabilityValues.away}%` }} /></div>
              <strong>{probabilityValues.away}%</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="calculator-section">
        <div className="section-heading">
          <p className="eyebrow accent">Calculateur de gains</p>
          <h3>Estimation de bénéfices</h3>
        </div>

        <div className="calculator-grid">
          <div className="calc-form">
            <label>
              Mise (€)
              <input type="number" value={stake} min={10} onChange={(e) => setStake(Number(e.target.value || 0))} />
            </label>

            <label>
              Option
              <select value={selectedOdd} onChange={(e) => setSelectedOdd(e.target.value as '1' | 'N' | '2')}>
                <option value="1">1</option>
                <option value="N">N</option>
                <option value="2">2</option>
              </select>
            </label>

            <label>
              Cote
              <input type="number" value={oddValue} min={1.01} step={0.01} onChange={(e) => setOddValue(Number(e.target.value || 1.01))} />
            </label>
          </div>

          <div className="result-box">
            <div className="result-line">
              <span>Gain brut</span>
              <strong>{(stake * oddValue).toFixed(2)} €</strong>
            </div>
            <div className="result-line">
              <span>Bénéfice net</span>
              <strong>{netProfit.toFixed(2)} €</strong>
            </div>
            <div className="result-line highlight">
              <span>Probabilité retenue</span>
              <strong>
                {selectedOdd === '1' ? `${probabilityValues.home}%` : selectedOdd === 'N' ? `${probabilityValues.draw}%` : `${probabilityValues.away}%`}
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section id="vip" className="vip-section">
        <div className="section-heading">
          <p className="eyebrow accent">Abonnements VIP</p>
          <h3>Choisissez votre accès premium</h3>
        </div>

        <div className="plans-grid">
          {pricePlans.map((plan) => (
            <button
              key={plan.key}
              className={`plan-card ${selectedPlan === plan.key ? 'selected' : ''}`}
              onClick={() => setSelectedPlan(plan.key)}
              type="button"
            >
              <span className="plan-title">{plan.title}</span>
              <strong>{plan.price}€</strong>
              <small>{plan.description}</small>
            </button>
          ))}
        </div>

        <form className="checkout-card" onSubmit={handlePayment}>
          <div className="checkout-row">
            <label>
              Nom complet
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jean Dupont" required />
            </label>
            <label>
              Email
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jean@mail.com" required />
            </label>
          </div>

          <div className="checkout-row">
            <label>
              Titulaire de la carte
              <input value={form.cardName} onChange={(e) => setForm({ ...form, cardName: e.target.value })} placeholder="Jean DUPONT" required />
            </label>
            <label>
              Numéro de carte
              <input value={form.cardNumber} onChange={(e) => setForm({ ...form, cardNumber: e.target.value })} placeholder="4242 4242 4242 4242" required />
            </label>
          </div>

          <div className="checkout-summary">
            <div>
              <span>Plan sélectionné</span>
              <strong>{currentPlan.title}</strong>
            </div>
            <div>
              <span>Total</span>
              <strong>{currentPlan.price}€</strong>
            </div>
          </div>

          <button type="submit" className="primary-btn checkout-btn">
            {paymentDone ? 'Paiement validé' : 'Valider l’abonnement'}
          </button>
        </form>
      </section>
    </main>
  );
}
