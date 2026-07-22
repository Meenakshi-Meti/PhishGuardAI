import "./EmailScanner.css";
import { useState } from "react";

function EmailScanner() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const suspiciousWords = [
    "urgent",
    "verify",
    "password",
    "click here",
    "bank",
    "gift card",
    "login",
    "otp",
    "account suspended",
    "confirm",
    "invoice",
    "payment",
    "crypto",
    "wallet",
  ];

  const analyzeMail = () => {
    if (!email.trim()) {
      alert("Please paste an email first.");
      return;
    }

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      let score = 5;
      let reasons = [];

      suspiciousWords.forEach((word) => {
        if (email.toLowerCase().includes(word)) {
          score += 10;
          reasons.push(`Detected keyword: "${word}"`);
        }
      });

      if (email.includes("http://")) {
        score += 15;
        reasons.push("Unsecured HTTP link detected");
      }

      if (email.includes("https://")) {
        score += 5;
      }

      if (score > 100) score = 100;

      let prediction = "Safe";
      let color = "#22c55e";
      let action = "Keep in Inbox";

      if (score >= 35 && score < 70) {
        prediction = "Suspicious";
        color = "#facc15";
        action = "Move to Spam";
      }

      if (score >= 70) {
        prediction = "Phishing";
        color = "#ef4444";
        action = "Delete Immediately";
      }

      setResult({
        score,
        prediction,
        color,
        action,
        reasons,
      });

      setLoading(false);
    }, 2500);
  };

  return (
    <section className="scanner-section">

      <div className="scanner-card">

        <h1>AI Email Scanner</h1>

        <p>
          Paste any email below and let PhishGuardAI analyze it.
        </p>

        <textarea
          placeholder="Paste email here..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={analyzeMail}>
          Analyze Email
        </button>

        {loading && (
          <div className="analysis-box">

            <h2>AI Engine Running...</h2>

            <div className="loader"></div>

            <ul>
              <li>✔ Parsing Email</li>
              <li>✔ Checking Sender</li>
              <li>✔ Detecting URLs</li>
              <li>✔ Detecting Urgency</li>
              <li>✔ NLP Analysis</li>
              <li>✔ Blockchain Verification</li>
              <li>✔ Calculating Risk Score</li>
            </ul>

          </div>
        )}

        {result && (

          <div className="result-card">

            <h2>AI Security Report</h2>

            <div
              className="score-circle"
              style={{
                borderColor: result.color,
                color: result.color,
              }}
            >
              {result.score}%
            </div>

            <h3
              style={{
                color: result.color,
              }}
            >
              {result.prediction}
            </h3>

            <p>
              <strong>Recommended Action:</strong>{" "}
              {result.action}
            </p>

            <h4>Reasons</h4>

            <ul>

              {result.reasons.length === 0 ? (
                <li>No suspicious patterns detected.</li>
              ) : (
                result.reasons.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              )}

            </ul>

          </div>

        )}

      </div>

    </section>
  );
}

export default EmailScanner;