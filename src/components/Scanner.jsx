function Scanner() {
  return (
    <section>
      <h2>Scan Anything Suspicious</h2>

      <div className="tabs">
        <button>URL</button>
        <button>Email</button>
        <button>File</button>
        <button>QR Code</button>
      </div>

      <div className="scanner-box">
        <input
          type="text"
          placeholder="Paste Suspicious URL..."
        />

        <button>Analyze Threat</button>
      </div>
    </section>
  );
}

export default Scanner;