#  PhishGuardAI

<p align="center">
  <strong>AI-Powered Phishing Detection Platform</strong><br>
  Detect phishing attacks across URLs, Emails, QR Codes, and Files using Artificial Intelligence, Machine Learning, and Blockchain.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" />
  <img src="https://img.shields.io/badge/Node.js-Backend-green?logo=node.js" />
  <img src="https://img.shields.io/badge/Express.js-API-black?logo=express" />
  <img src="https://img.shields.io/badge/MongoDB-Database-darkgreen?logo=mongodb" />
  <img src="https://img.shields.io/badge/AI-Powered-purple" />
  <img src="https://img.shields.io/badge/Blockchain-GPSL-orange" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" />
</p>

---

#  Overview

**PhishGuardAI** is an intelligent phishing detection platform designed to identify and prevent phishing attacks before users become victims. The application combines Artificial Intelligence, Machine Learning, behavioral analysis, phishing fingerprinting, and blockchain technology to detect both known and zero-day phishing attacks.

Unlike traditional phishing detection systems that rely mainly on blacklists, PhishGuardAI analyzes the behavior, content, visual appearance, and structure of suspicious resources to determine whether they are malicious.

The vision behind this project is to create a modern phishing detection ecosystem that continuously learns from new attacks while securely sharing threat intelligence through a decentralized ledger.

---

#  The Problem

Phishing remains one of the fastest-growing cyber threats worldwide. Every day, attackers create fake websites, fraudulent emails, counterfeit payment portals, and impersonated login pages to steal confidential information such as:

* Usernames and passwords
* Banking credentials
* Credit card information
* OTPs
* Personal identity data
* Corporate credentials

Traditional phishing detection methods have several limitations:

* Heavy dependence on blacklist databases
* Poor detection of newly created phishing domains
* High false-positive rates
* Slow community reporting
* Limited detection across different attack vectors

These limitations leave organizations and users vulnerable to sophisticated phishing campaigns.

---

#  Our Solution

PhishGuardAI approaches phishing detection differently.

Instead of simply asking whether a website already exists in a blacklist, the platform evaluates multiple characteristics to determine whether the content behaves like phishing.

The detection engine performs:

* URL analysis
* Email inspection
* Domain intelligence
* Visual similarity detection
* HTML structure comparison
* Risk scoring
* AI-based classification
* Blockchain signature verification

Each analysis contributes to a comprehensive threat assessment, allowing the platform to identify both existing and previously unseen phishing attempts.

---

#  Key Features

##  URL Scanner

Analyze suspicious URLs using multiple indicators, including:

* URL entropy
* Suspicious keywords
* Domain age
* SSL certificate validation
* Redirect chains
* WHOIS information
* DNS records
* Homograph attack detection

---

##  Email Scanner

Inspect emails for phishing indicators such as:

* SPF verification
* DKIM validation
* DMARC policy
* Suspicious sender addresses
* Embedded malicious links
* Urgency-based language
* AI-generated phishing patterns

---

##  QR Code Scanner

Extract hidden URLs from QR codes and perform:

* URL reputation analysis
* Redirect tracking
* SSL verification
* Domain intelligence lookup

---

##  File Scanner

Detect malicious content inside uploaded files.

Supported formats include:

* PDF
* DOCX
* Images
* ZIP archives

The scanner searches for:

* Embedded phishing URLs
* Hidden scripts
* Suspicious metadata
* Obfuscated content

---

##  AI Risk Assessment

Every scanned resource receives a confidence score based on multiple analysis engines.

Example:

```
Risk Score : 91%

Threat Level : High

Reasons:

• Newly registered domain
• Login page impersonation
• Suspicious HTML structure
• Brand similarity detected
```

---

##  Fingerprinting Engine

Instead of storing complete phishing pages, PhishGuardAI generates a unique digital fingerprint consisting of:

```
signature_id

├── text_hash
├── url_hash
├── visual_hash
└── struct_hash
```

This enables rapid identification of similar phishing attacks while minimizing storage requirements.

---

##  Blockchain Integration

Generated fingerprints are stored inside the **Global Phishing Signature Ledger (GPSL)**.

Benefits include:

* Immutable records
* Tamper-resistant storage
* Decentralized threat sharing
* Faster signature lookup
* Transparent verification

---

#  System Architecture

```
                  User

                    │

                    ▼

          React Frontend (Vite)

                    │

                    ▼

           Express REST API

                    │

     ┌──────────────┼──────────────┐

     ▼              ▼              ▼

 AI Detection    MongoDB       GPSL Blockchain

     │

     ▼

 Threat Classification

     │

     ▼

 Final Security Report
```

---

#  Technology Stack

| Category   | Technologies                            |
| ---------- | --------------------------------------- |
| Frontend   | React, Vite, JavaScript, HTML, CSS      |
| Backend    | Node.js, Express.js                     |
| Database   | MongoDB                                 |
| AI / ML    | Python, TensorFlow, Scikit-learn, NLP   |
| Blockchain | Solidity, Ethereum, Hardhat             |
| APIs       | WHOIS, VirusTotal, Google Safe Browsing |

---

#  Project Structure

```
PhishGuardAI/

│

├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
│
├── blockchain/
│
├── ai-model/
│
├── screenshots/
│
├── README.md
│
└── package.json
```

---

#  Getting Started

## Clone the Repository

```bash
git clone https://github.com/your-username/PhishGuardAI.git
```

Move into the project directory.

```bash
cd PhishGuardAI
```

Install all dependencies.

```bash
npm install
```

---

# ▶ Running the Application

Start the frontend:

```bash
npm run dev
```

Start the backend:

```bash
npm start
```

The frontend will be available on:

```
http://localhost:5173
```

---

#  Environment Variables

Create a `.env` file in the server directory.

```env
PORT=5000

MONGO_URI=your_database_url

JWT_SECRET=your_secret

GOOGLE_SAFE_BROWSING_API=

VIRUSTOTAL_API_KEY=

OPENAI_API_KEY=
```

---

#  Security Features

PhishGuardAI incorporates multiple layers of security:

* JWT Authentication
* Password Hashing
* HTTPS Support
* CORS Protection
* Helmet.js
* Rate Limiting
* Input Validation
* Secure Cookies
* XSS Prevention
* CSRF Protection (where applicable)

---

#  Performance Goals

The project aims to achieve:

| Metric              | Target      |
| ------------------- | ----------- |
| URL Scan Time       | < 2 seconds |
| Email Scan Time     | < 3 seconds |
| False Positive Rate | Below 3%    |
| Detection Accuracy  | Above 95%   |
| Blockchain Lookup   | < 500 ms    |

---

#  Roadmap

### Phase 1

* ✅ Frontend Development
* ✅ URL Scanner
* ✅ Email Scanner
* ✅ Risk Score Engine

### Phase 2

* 🔄 AI Model Training
* 🔄 Fingerprinting Engine
* 🔄 GPSL Blockchain

### Phase 3

* Chrome Extension
* Firefox Extension
* Gmail Integration
* Outlook Plugin
* Enterprise Dashboard
* Mobile Application

---

#  Future Enhancements

Planned improvements include:

* Real-time email monitoring
* Browser extension
* Enterprise threat dashboard
* Threat intelligence portal
* SIEM integration
* Dark web intelligence
* User reporting system
* Community-driven phishing signatures

---

#  Contributing

Contributions are welcome and appreciated.

If you would like to contribute:

1. Fork the repository.
2. Create a new feature branch.
3. Implement your changes.
4. Commit your work.
5. Push the branch.
6. Open a Pull Request.

Please ensure your code follows consistent formatting, includes meaningful commit messages, and is well documented.

---

#  License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute the software in accordance with the terms of the license.

---

#  Author

## Meenakshi

**Computer Science Engineering Student**

Cybersecurity • Artificial Intelligence • Full Stack Development • Blockchain

I enjoy building practical cybersecurity solutions that combine modern web technologies, AI, and decentralized systems to solve real-world security challenges. PhishGuardAI reflects my interest in creating intelligent tools that help users recognize and prevent phishing attacks through explainable analysis rather than relying solely on static blacklists.

---

#  Acknowledgements

This project has benefited from the excellent work of the open-source community and the maintainers of the technologies used throughout development.

Special thanks to:

* React
* Vite
* Node.js
* Express.js
* MongoDB
* TensorFlow
* Scikit-learn
* OWASP Foundation
* VirusTotal
* Google Safe Browsing

Their tools, documentation, and research have been invaluable throughout the development process.

---

#  Support the Project

If you found **PhishGuardAI** useful or interesting, consider giving the repository a ⭐ on GitHub. Your support motivates further development and helps the project reach more developers and cybersecurity enthusiasts.

Together, we can contribute to making the internet a safer place—one phishing attack at a time.
