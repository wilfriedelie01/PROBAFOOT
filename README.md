@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

:root {
  --bg: #081a2c;
  --bg-strong: #030d1b;
  --panel: rgba(13, 26, 45, 0.9);
  --panel-border: rgba(125, 164, 214, 0.25);
  --primary: #1d67d7;
  --primary-strong: #1264e9;
  --red: #d93f3f;
  --text: #f5f8ff;
  --muted: #adc2da;
  --success: #3bde8b;
  --shadow: rgba(5, 13, 22, 0.4);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background: radial-gradient(circle at top, rgba(24, 67, 122, 0.8), transparent 35%), var(--bg);
  color: var(--text);
}

a {
  text-decoration: none;
}

button, input, select {
  font: inherit;
}

.page-shell {
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
  padding: 28px 0 72px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 22px;
  background: rgba(8, 20, 34, 0.72);
  border: 1px solid var(--panel-border);
  border-radius: 18px;
  box-shadow: 0 20px 50px var(--shadow);
  backdrop-filter: blur(18px);
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-mark {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--primary-strong), var(--red));
  font-weight: 800;
  font-size: 1.4rem;
}

.eyebrow {
  margin: 0;
  color: var(--muted);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.eyebrow.accent {
  color: #95c0ff;
}

.brand-block h1 {
  margin: 2px 0 0;
  font-size: clamp(1.2rem, 1.4vw, 2rem);
}

.vip-pill {
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  color: var(--muted);
  font-size: 0.82rem;
  font-weight: 600;
}

.vip-pill.active {
  color: white;
  background: rgba(61, 135, 255, 0.18);
  border-color: rgba(80, 150, 255, 0.5);
}

.hero {
  display: grid;
  grid-template-columns: 1.2fr 0.9fr;
  gap: 28px;
  margin-top: 36px;
}

.hero-content,
.hero-panel,
.analysis-card,
.sliders-panel,
.probability-card,
.calc-form,
.result-box,
.checkout-card,
.plan-card {
  background: var(--panel);
  border: 1px solid var(--panel-border);
  border-radius: 22px;
  box-shadow: 0 18px 42px var(--shadow);
}

.hero-content {
  padding: 40px 32px;
}

.hero-content h2 {
  font-size: clamp(2rem, 4vw, 4rem);
  line-height: 1.05;
  max-width: 700px;
  margin: 10px 0 18px;
}

.supporting-text {
  max-width: 670px;
  color: var(--muted);
  font-size: 1.05rem;
  line-height: 1.7;
}

.cta-row {
  display: flex;
  gap: 16px;
  margin-top: 26px;
  flex-wrap: wrap;
}

.primary-btn,
.secondary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 22px;
  border-radius: 12px;
  font-weight: 700;
  transition: transform 0.2s ease;
}

.primary-btn {
  background: linear-gradient(135deg, var(--primary), var(--red));
  color: white;
  border: none;
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text);
}

.primary-btn:hover,
.secondary-btn:hover,
.plan-card:hover {
  transform: translateY(-2px);
}

.hero-panel {
  padding: 28px 26px;
}

.match-headline {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: var(--muted);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.team-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  margin-top: 22px;
  align-items: center;
}

.team-name {
  font-weight: 800;
  font-size: 1.2rem;
}

.versus {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-weight: 800;
  letter-spacing: 0.06em;
}

.mini-stats {
  list-style: none;
  padding: 0;
  margin: 24px 0 0;
  display: grid;
  gap: 14px;
  color: var(--muted);
}

.mini-stats li {
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.grid-section,
.engine-section,
.calculator-section,
.vip-section {
  margin-top: 42px;
}

.grid-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.analysis-card {
  padding: 28px;
}

.analysis-card h3,
.section-heading h3 {
  margin: 0 0 18px;
  font-size: clamp(1.4rem, 2vw, 2.2rem);
}

.metric-list {
  display: grid;
  gap: 14px;
}

.metric-list div {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: var(--muted);
}

.metric-list strong {
  color: var(--text);
}

.player-boxes {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.player-tag {
  padding: 10px 12px;
  border-radius: 999px;
  background: rgba(29, 103, 215, 0.14);
  border: 1px solid rgba(29, 103, 215, 0.4);
  color: #edf5ff;
  font-size: 0.9rem;
}

.player-tag.away {
  background: rgba(217, 63, 63, 0.12);
  border-color: rgba(217, 63, 63, 0.45);
}

.secondary {
  margin-top: 14px;
}

.summary-box {
  margin-top: 18px;
  padding: 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: var(--muted);
}

.summary-box strong {
  color: var(--text);
}

.section-heading {
  margin-bottom: 18px;
}

.sliders-panel {
  padding: 26px;
  display: grid;
  gap: 18px;
}

.slider-item {
  display: grid;
  gap: 10px;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-weight: 600;
  color: var(--text);
}

.slider-header span {
  color: #9ad0ff;
  font-weight: 700;
}

.slider-item input[type='range'] {
  width: 100%;
  accent-color: var(--primary);
}

.slider-item small {
  color: var(--muted);
}

.probability-card {
  margin-top: 26px;
  padding: 26px;
}

.probability-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  color: var(--muted);
  margin-bottom: 14px;
}

.probability-head strong {
  color: var(--text);
  font-size: 1.1rem;
}

.probability-bars {
  display: grid;
  gap: 18px;
}

.probability-item {
  display: grid;
  grid-template-columns: 42px 1fr 66px;
  align-items: center;
  gap: 12px;
  font-weight: 700;
}

.bar-track {
  height: 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.bar-track > div {
  height: 100%;
  border-radius: inherit;
}

.probability-item.home .bar-track > div {
  background: linear-gradient(90deg, var(--primary), #59a0ff);
}

.probability-item.draw .bar-track > div {
  background: linear-gradient(90deg, #8da7ff, #d3d7ff);
}

.probability-item.away .bar-track > div {
  background: linear-gradient(90deg, var(--red), #ff7d7d);
}

.calculator-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.calc-form,
.result-box {
  padding: 26px;
}

.calc-form {
  display: grid;
  gap: 18px;
}

.calc-form label,
.checkout-card label {
  display: grid;
  gap: 8px;
  color: var(--muted);
  font-weight: 600;
}

.calc-form input,
.calc-form select,
.checkout-card input {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: var(--text);
  padding: 12px 14px;
}

.result-box {
  display: grid;
  gap: 16px;
  align-content: center;
}

.result-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: var(--muted);
}

.result-line strong {
  color: var(--text);
}

.result-line.highlight {
  background: rgba(29, 103, 215, 0.1);
  border-color: rgba(29, 103, 215, 0.35);
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.plan-card {
  text-align: left;
  color: var(--text);
  padding: 24px;
  background: rgba(255, 255, 255, 0.02);
  cursor: pointer;
}

.plan-card.selected {
  background: linear-gradient(135deg, rgba(29, 103, 215, 0.2), rgba(217, 63, 63, 0.08));
  border-color: rgba(29, 103, 215, 0.55);
}

.plan-card .plan-title {
  display: block;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}

.plan-card strong {
  display: block;
  margin-top: 12px;
  font-size: clamp(2rem, 2.4vw, 3rem);
}

.plan-card small {
  display: block;
  margin-top: 8px;
  color: var(--muted);
}

.checkout-card {
  margin-top: 24px;
  padding: 28px;
}

.checkout-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin-bottom: 18px;
}

.checkout-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin: 18px 0 22px;
  padding: 16px 18px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: var(--muted);
}

.checkout-summary strong {
  color: var(--text);
}

.checkout-btn {
  width: 100%;
  border: none;
  cursor: pointer;
}

@media (max-width: 900px) {
  .hero,
  .grid-section,
  .calculator-grid,
  .plans-grid,
  .checkout-row {
    grid-template-columns: 1fr;
  }

  .hero {
    display: block;
  }

  .hero-panel {
    margin-top: 22px;
  }

  .plans-grid {
    display: grid;
  }
}

@media (max-width: 560px) {
  .page-shell {
    width: min(100% - 18px, 1200px);
  }

  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-content,
  .analysis-card,
  .sliders-panel,
  .probability-card,
  .calc-form,
  .result-box,
  .checkout-card {
    padding: 18px;
  }
}
