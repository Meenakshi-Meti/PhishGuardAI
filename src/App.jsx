import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import HeroBanner from "./components/HeroBanner";
import MetricsRow from "./components/MetricsRow";
import EmailScanner from "./components/EmailScanner";
import ThreatVerdict from "./components/ThreatVerdict";
import FingerprintPanel from "./components/FingerprintPanel";
import LedgerPanel from "./components/LedgerPanel";
import ToastStack from "./components/ToastStack";
import { initialMail } from "./data/samples";
import { scoreMail } from "./utils/scoring";

export default function App() {
  const [theme, setTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
  const [mail, setMail] = useState(initialMail);
  const [tab, setTab] = useState("scanner");
  const [toasts, setToasts] = useState([]);
  const [ledger, setLedger] = useState([
    { hash: "PG-11AF92AC", domain: "paypa1-support.com", score: 9, action: "Move to Spam", source: "Node A" },
    { hash: "PG-55CD1290", domain: "secure-bank-verification.net", score: 10, action: "Auto Delete", source: "Node C" }
  ]);
  const [quarantine, setQuarantine] = useState([
    "security@paypa1-support.com",
    "payments@secure-bank-verification.net"
  ]);

  const analysis = useMemo(() => scoreMail(mail), [mail]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const addToast = (title, desc) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [{ id, title, desc }, ...t].slice(0, 3));
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3200);
  };

  const syncToLedger = () => {
    const entry = {
      hash: analysis.hash,
      domain: analysis.domain,
      score: analysis.score,
      action: analysis.action,
      source: "Local Browser"
    };
    setLedger((prev) => [entry, ...prev.filter((item) => item.hash !== entry.hash)].slice(0, 8));
    addToast("Ledger synchronized", `${entry.hash} was shared with connected browsers.`);
  };

  const applyAction = () => {
    setQuarantine((prev) => (prev.includes(mail.from) ? prev : [mail.from, ...prev]));
    addToast("Policy executed", `${analysis.action} applied for ${mail.from}.`);
  };

  return (
    <>
      <div className="app-shell">
        <Sidebar
          tab={tab}
          setTab={setTab}
          quarantine={quarantine}
        />

        <main className="main">
          <HeroBanner
            analysis={analysis}
            theme={theme}
            setTheme={setTheme}
            syncToLedger={syncToLedger}
            applyAction={applyAction}
          />

          <MetricsRow
            analysis={analysis}
            ledger={ledger}
            quarantine={quarantine}
          />

          <section className="mail-grid">
            <EmailScanner
              mail={mail}
              setMail={setMail}
              syncToLedger={syncToLedger}
              applyAction={applyAction}
              addToast={addToast}
            />

            <ThreatVerdict analysis={analysis} />
          </section>

          <section className="grid-2">
            <FingerprintPanel analysis={analysis} addToast={addToast} />
            <LedgerPanel ledger={ledger} />
          </section>

          <section className="rule-grid">
            <article className="rule-card">
              <h4>Policy automation</h4>
              <p>Auto-move suspicious emails to spam and hard-delete only the most critical messages according to threshold logic.</p>
            </article>
            <article className="rule-card">
              <h4>Variant detection</h4>
              <p>Reworded phishing emails can still be grouped by sender domain plus normalized wording patterns and fingerprint similarity.</p>
            </article>
            <article className="rule-card">
              <h4>Operational visibility</h4>
              <p>Security teams get a premium dashboard view with score output, triggered reasons, global sync history, and enforcement actions.</p>
            </article>
          </section>

          <div className="footer-note">PhishGuard AI demo UI · Official presentation version for project showcase</div>
        </main>
      </div>

      <ToastStack toasts={toasts} />
    </>
  );
}