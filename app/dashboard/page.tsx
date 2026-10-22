'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const sliderConfig = [
  { key: 'recentForm', label: 'Forme récente', description: '3 derniers matchs' },
  { key: 'starPlayers', label: 'Titulaires', description: 'Performances individuelles' },
  { key: 'headToHead', label: 'Face à face', description: 'Résultats adverses' },
  { key: 'immediatePressure', label: 'Enjeu immédiat', description: 'Mise sous pression' },
  { key: 'seasonGoal', label: 'Objectif saison', description: 'Priorité collective' },
  { key: 'attack', label: 'Attaque', description: 'Capacité offensive' },
  { key: 'defense', label: 'Défense', description: 'Solidité défensive' },
];

const match = {
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

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name?: string; email?: string; vip?: boolean } | null>(null);
  const [weights, setWeights] = useState<Record<string, number>>({
    recentForm: 78,
    starPlayers: 72,
    headToHead: 60,
    immediatePressure: 80,
    seasonGoal: 70,
    attack: 82,
    defense: 65,
  });
  const [stake, setStake] = useState(50);
  const [oddValue, setOddValue] = useState(2.1);
  const [selectedOdd, setSelectedOdd] = useState<'1' | 'N' | '2'>('1');

  useEffect(() => {
    const storedUser = window.localStorage.getItem('probafoot-user');
    if (!storedUser) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [router]);

  const probabilities = useMemo(() => {
    const values = Object.values(weights);
    const total = values.reduce((sum, value) => sum + value, 0);

    const home = ((weights.recentForm + weights.headToHead + weights.immediatePressure + weights.attack) / total) * 100;
    const draw = ((weights.starPlayers + weights.seasonGoal + weights.defense) / total) * 100;
    const away = 100 - home - draw;

    return {
      home: Math.max(5, Math.min(90, Number(home.toFixed(1)))),
      draw: Math.max(5, Math.min(50, Number(draw.toFixed(1)))),
      away: Math.max(5, Math.min(90, Number((100 - home - draw).toFixed(1)))),
    };
  }, [weights]);

  const netProfit = useMemo(() => stake * oddValue - stake, [stake, oddValue]);

  if (!user) {
    return null;
  }

  const vipStatus = window.localStorage.getItem('probafoot-vip-status') === 'active';

  return (
    <main className="app-shell">
      <div className="container">
        <header className="topbar">
          <div className="brand">
            <div className="brand-mark">P</div>
            <div className="brand-copy">
              <p className="eyebrow">VIP Dashboard</p>
              <h1>PROBAFOOT</h1>
            </div>
          </div>
          <div className="nav-actions">
            <span className={`vip-pill ${vipStatus ? 'active' : ''}`}>
              {vipStatus ? 'Compte VIP actif' : 'Accès standard'}
            </span>
            <Link href="/pricing" className="primary-btn">Abonnement</Link>
          </div>
        </header>

        <section className="section">
          <div className="section-head">
            <p className="eyebrow accent">Pronostic du jour</p>
            <h3>Tableau de bord premium</h3>
          </div>

          <div className="quick-stats">
            <div className="stat-box">
              <span>Forme domicile</span>
              <strong>88%</strong>
            </div>
            <div className="stat-box">
              <span>Risque nul</span>
              <strong>{probabilities.draw}%</strong>
            </div>
            <div className="stat-box">
              <span>Attaque</span>
              <strong>{match.attackHome}</strong>
            </div>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="panel">
            <div className="metric-card">
              <div className="match-header">
                <span>{match.competition}</span>
                <span>{match.kickoff}</span>
              </div>

              <div className="team-grid">
                <div>
                  <div className="team-name">{match.homeTeam}</div>
                  <small>Forme: {match.homeForm}</small>
                </div>
                <div className="versus">VS</div>
                <div>
                  <div className="team-name">{match.awayTeam}</div>
                  <small>Forme: {match.awayForm}</small>
                </div>
              </div>

              <ul className="meta-list">
                <li><strong>3 derniers :</strong> {match.homeLastMatches.join(' - ')} / {match.awayLastMatches.join(' - ')}</li>
                <li><strong>Face à face :</strong> {match.homeVsAway.join(' • ')}</li>
                <li><strong>Objectif :</strong> {match.homeObjectives}</li>
              </ul>
            </div>

            <div className="metric-card" style={{ marginTop: '20px' }}>
              <h3 style={{ marginTop: 0 }}>Analyse des équipes</h3>
              <div className="metric-list">
                <div>
                  <span>Titulaires clés</span>
                  <strong>{match.homePlayers.slice(0, 3).join(', ')}</strong>
                </div>
                <div>
                  <span>Écart tactique</span>
                  <strong>Pressing haut + transitions rapides côté domicile</strong>
                </div>
                <div>
                  <span>Performance défensive</span>
                  <strong>{match.defenseHome} / {match.defenseAway}</strong>
                </div>
                <div>
                  <span>Performance offensive</span>
                  <strong>{match.attackHome} / {match.attackAway}</strong>
                </div>
              </div>
            </div>
          </div>

          <aside className="panel">
            <div className="summary-card">
              <div>
                <p className="eyebrow accent">Compte</p>
                <h3 style={{ margin: '8px 0 6px' }}>{user.name || 'VIP Member'}</h3>
                <small style={{ color: 'var(--muted)' }}>{user.email}</small>
              </div>

              <div className="summary-row">
                <span>Statut</span>
                <strong>{vipStatus ? 'VIP' : 'Standard'}</strong>
              </div>
              <div className="summary-row">
                <span>Pronostics rédigés</span>
                <strong>12</strong>
              </div>
              <div className="summary-row">
                <span>ROI</span>
                <strong>+21.4%</strong>
              </div>
            </div>
          </aside>
        </section>

        <section className="section">
          <div className="section-head">
            <p className="eyebrow accent">Moteur probabiliste</p>
            <h3>7 curseurs en temps réel</h3>
          </div>

          <div className="slider-card">
            {sliderConfig.map((slider) => (
              <div key={slider.key} className="slider-item">
                <div className="slider-head">
                  <label>{slider.label}</label>
                  <span>{weights[slider.key]}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={weights[slider.key]}
                  onChange={(e) => setWeights((prev) => ({ ...prev, [slider.key]: Number(e.target.value) }))}
                />
                <small>{slider.description}</small>
              </div>
            ))}

            <div className="probability-card">
              <div className="probability-head">
                <span>Distribution 1 - N - 2</span>
                <strong>{probabilities.home}% — {probabilities.draw}% — {probabilities.away}%</strong>
              </div>

              <div className="probability-list">
                <div className="probability-row">
                  <span>1</span>
                  <div className="bar home"><div style={{ width: `${probabilities.home}%` }} /></div>
                  <strong>{probabilities.home}%</strong>
                </div>
                <div className="probability-row">
                  <span>N</span>
                  <div className="bar draw"><div style={{ width: `${probabilities.draw}%` }} /></div>
                  <strong>{probabilities.draw}%</strong>
                </div>
                <div className="probability-row">
                  <span>2</span>
                  <div className="bar away"><div style={{ width: `${probabilities.away}%` }} /></div>
                  <strong>{probabilities.away}%</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <p className="eyebrow accent">Calculateur</p>
            <h3>Gains et bénéfices</h3>
          </div>

          <div className="calc-grid">
            <div className="calc-card">
              <div className="auth-form">
                <label>
                  Mise (€)
                  <input type="number" value={stake} onChange={(e) => setStake(Number(e.target.value || 0))} min={10} />
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
                  <input type="number" value={oddValue} onChange={(e) => setOddValue(Number(e.target.value || 1.01))} step={0.01} min={1.01} />
                </label>
              </div>
            </div>

            <div className="calc-card">
              <div className="result-stack">
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
                    {selectedOdd === '1' ? `${probabilities.home}%` : selectedOdd === 'N' ? `${probabilities.draw}%` : `${probabilities.away}%`}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
