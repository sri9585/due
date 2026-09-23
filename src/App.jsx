import { useEffect, useState } from 'react'
import './App.css'
import qrImage from '../public/qr.jpeg'

const whatsappNumber = '9345927994'
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Sri Krishna, I want to pay the balance amount of ₹6,700 INR to enable this account.')}`
const upiId = 'srik9585a-1@okhdfcbank'
const amount = '₹6,700.00'

const summaryItems = [
  { label: 'Transfer fee', value: '₹0' },
  { label: 'Processing', value: 'Instant' },
  { label: 'Reference', value: 'Account ID 4321' },
]

function App() {
  const getTimeFrom5AM = () => {
    const now = new Date()
    const startOfFiveAM = new Date(now)
    startOfFiveAM.setHours(5, 0, 0, 0)

    if (now < startOfFiveAM) {
      return 0
    }

    return now.getTime() - startOfFiveAM.getTime()
  }

  const [elapsedSince5AM, setElapsedSince5AM] = useState(getTimeFrom5AM)
  const [isPayDialogOpen, setIsPayDialogOpen] = useState(false)
  const [paymentView, setPaymentView] = useState('chooser')

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSince5AM(getTimeFrom5AM())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handlePayNowClick = () => {
    setPaymentView('chooser')
    setIsPayDialogOpen(true)
  }

  const handlePayByWhatsApp = () => {
    window.open(whatsappLink, '_blank', 'noopener,noreferrer')
    setIsPayDialogOpen(false)
    setPaymentView('chooser')
  }

  const totalMinutes = Math.floor(elapsedSince5AM / (1000 * 60))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const seconds = Math.floor((elapsedSince5AM / 1000) % 60)

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
              <div className="count-badge" aria-live="polite">
                <span className="count-dot" />
                {String(hours)}:{String(minutes).padStart(2, '0')} hrs
                <span className="count-label">since 5 AM</span>
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
            <button type="button" className="primary-btn" onClick={handlePayNowClick}>
              Pay ₹6,700 now
            </button>
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

      {isPayDialogOpen && (
        <div className="pay-dialog-backdrop" onClick={() => setIsPayDialogOpen(false)}>
          <div
            className="pay-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Choose payment method"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pay-dialog-header">
              <div>
                <p className="eyebrow">Choose payment method</p>
                <h3>Pay balance</h3>
              </div>
              <button
                type="button"
                className="dialog-close"
                onClick={() => setIsPayDialogOpen(false)}
                aria-label="Close payment options"
              >
                ×
              </button>
            </div>

            {paymentView === 'chooser' ? (
              <div className="payment-choice-grid">
                <button type="button" className="choice-card" onClick={handlePayByWhatsApp}>
                  <span className="choice-icon whatsapp">W</span>
                  <strong>WhatsApp message</strong>
                  <small>Send payment request instantly</small>
                </button>

                <button type="button" className="choice-card" onClick={() => setPaymentView('qr')}>
                  <span className="choice-icon qr">QR</span>
                  <strong>Scan QR</strong>
                  <small>Open the UPI QR code</small>
                </button>
              </div>
            ) : (
              <div className="qr-viewer">
                <div className="qr-preview-shell">
                  <img src={qrImage} alt="UPI QR code for payment" className="qr-preview" />
                </div>
                <div className="qr-meta">
                  <p>UPI ID: <strong>{upiId}</strong></p>
                  <p>Amount: <strong>{amount}</strong></p>
                </div>
                <div className="qr-actions">
                  <button type="button" className="secondary-btn modal-btn" onClick={() => setPaymentView('chooser')}>
                    Back
                  </button>
                  <button type="button" className="primary-btn modal-btn" onClick={handlePayByWhatsApp}>
                    WhatsApp instead
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
