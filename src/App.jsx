import { useEffect, useState } from 'react'
import './App.css'

const whatsappNumber = '9345927994'
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Sri Krishna, I want to pay the balance amount of ₹6,700 INR to enable this account.')}`

const summaryItems = [
  { label: 'Transfer fee', value: '₹0' },
  { label: 'Processing', value: 'Instant' },
  { label: 'Reference', value: 'Account ID 4321' },
]

function App() {
  const [counter, setCounter] = useState(6)

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => prev + 1)
    }, 1400)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="page-shell">
      <div className="background-glow glow-one" />
      <div className="background-glow glow-two" />

      <main className="payment-layout">
        <section className="panel main-panel">
          <div className="status-row">
            <span className="status-badge success">Account activation</span>
            <span className="status-pill">
              <span className="dot" />
              Live
            </span>
          </div>

          <div className="header-copy">
            <div className="title-row">
              <p className="eyebrow">Due balance</p>
              <div className="count-badge">
                <span className="count-dot" />
                {counter}s
              </div>
            </div>
            <h1>Pay now to enable this account</h1>
            <p className="subtitle">
              Complete the outstanding payment of ₹6,700 INR to Sri Krishna as soon as possible.
            </p>
          </div>

          <div className="amount-card">
            <div className="amount-topline">
              <span>Balance due</span>
              <span className="security-tag">Secure</span>
            </div>
            <div className="amount-row">
              <span className="currency">₹</span>
              <span className="amount">6,700</span>
              <span className="currency compact">INR</span>
            </div>
            <div className="amount-meta">
              <span>Due today</span>
              <span>Instant confirmation</span>
            </div>
          </div>

          <div className="recipient-card">
            <div className="avatar">SK</div>
            <div className="recipient-text">
              <span className="mini-label">Payee</span>
              <h2>Sri Krishna</h2>
              <p>Developer • Account activation</p>
            </div>
            <span className="verified-badge">Verified</span>
          </div>

          <div className="cta-row">
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="primary-btn">
              Pay ₹6,700 now
            </a>
            <button type="button" className="secondary-btn">
              Schedule
            </button>
          </div>
        </section>

        <aside className="panel side-panel">
          <div className="side-header">
            <span className="mini-label">Transfer summary</span>
            <span className="pill neutral">Priority</span>
          </div>

          <div className="summary-total">
            <span className="summary-label">Amount</span>
            <strong>₹6,700</strong>
          </div>

          <div className="summary-list">
            {summaryItems.map((item) => (
              <div key={item.label} className="summary-item">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>

          <div className="progress-block">
            <div className="progress-labels">
              <span>Validation</span>
              <span>96%</span>
            </div>
            <div className="progress-bar">
              <span />
            </div>
          </div>

          <div className="timeline">
            <div className="timeline-step active">
              <span className="step-dot" />
              <div>
                <strong>Queued</strong>
                <small>Just now</small>
              </div>
            </div>
            <div className="timeline-step">
              <span className="step-dot" />
              <div>
                <strong>Verified</strong>
                <small>Within seconds</small>
              </div>
            </div>
            <div className="timeline-step">
              <span className="step-dot" />
              <div>
                <strong>Activated</strong>
                <small>Once cleared</small>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}

export default App
