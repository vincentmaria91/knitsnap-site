import { useState, useEffect, useRef } from "react";

export default function App() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [vis, setVis] = useState({});
  const refs = useRef({});

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) setVis((v) => ({ ...v, [e.target.dataset.s]: true }));
      }),
      { threshold: 0.1 }
    );
    Object.values(refs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const r = (id) => (el) => { refs.current[id] = el; };
  const anim = (id, d = 0) => ({
    opacity: vis[id] ? 1 : 0,
    transform: vis[id] ? "translateY(0)" : "translateY(40px)",
    transition: `opacity 0.7s ease ${d}s, transform 0.7s ease ${d}s`,
  });

  const imgStyle = { width: "100%", height: "100%", objectFit: "cover", display: "block" };

  // ── Netlify form submission ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.includes("@")) { setError("Please enter a valid email."); return; }
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ "form-name": "waitlist", email }).toString(),
      });
      if (res.ok) { setDone(true); }
      else { setError("Something went wrong. Please try again."); }
    } catch { setError("Something went wrong. Please try again."); }
  };

  return (
    <div style={{ fontFamily: "'Libre Franklin', sans-serif", color: "#1a1a1a", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&display=swap" rel="stylesheet" />

      {/* ══════ NAV ══════ */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(255,255,255,0.92)", backdropFilter: "blur(10px)",
        borderBottom: "1px solid #e8e8e8",
        padding: "14px 32px",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <span style={{ fontFamily: "Playfair Display, serif", fontSize: 26, fontWeight: 900 }}>knitsnap</span>
        <a href="#signup" style={{
          fontSize: 14, fontWeight: 600, color: "#1a1a1a", textDecoration: "none",
          border: "2px solid #1a1a1a", borderRadius: 28, padding: "8px 24px"
        }}>Get early access</a>
      </nav>

      {/* ══════ HERO — APP DEMO ══════ */}
      <section style={{ background: "#FFE500", display: "flex", flexWrap: "wrap", minHeight: "94vh" }}>
        <div style={{
          flex: "1 1 50%", minWidth: 300, minHeight: 600,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "60px 40px", background: "#F5DFA0", position: "relative", overflow: "hidden"
        }}>
          <svg viewBox="0 0 300 560" width="270" style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.14))", position: "relative", zIndex: 1 }}>
            <rect x="30" y="10" width="240" height="530" rx="32" fill="#1a1a1a"/>
            <rect x="40" y="24" width="220" height="500" rx="22" fill="#FFF8F0"/>
            <rect x="105" y="12" width="90" height="20" rx="10" fill="#1a1a1a"/>
            <text x="80" y="50" fontSize="8" fill="#1a1a1a" fontWeight="600" fontFamily="Helvetica">9:41</text>
            <text x="248" y="50" textAnchor="end" fontSize="7" fill="#1a1a1a" fontFamily="Helvetica">▮▮▮ ⚡</text>
            <rect x="40" y="56" width="220" height="34" fill="#E8614D"/>
            <circle cx="62" cy="73" r="10" fill="none" stroke="#fff" strokeWidth="1.3"/>
            <path d="M57,78 Q60,65 65,70 Q70,75 72,64" fill="none" stroke="#fff" strokeWidth="1.3" strokeLinecap="round"/>
            <text x="80" y="78" fontSize="14" fill="#fff" fontWeight="700" fontFamily="Georgia, serif">knitsnap</text>
            <rect x="50" y="100" width="200" height="170" rx="10" fill="#4A7FBF" opacity=".18"/>
            <path d="M108,118 L108,248 Q108,255 118,255 L182,255 Q192,255 192,248 L192,118 L182,106 L176,116 L172,104 L164,98 L136,98 L128,104 L124,116 L118,106Z" fill="#4A7FBF" opacity=".3" stroke="#3A6FAF" strokeWidth="1.8"/>
            <path d="M118,155 C128,140 138,168 148,152 C158,136 168,162 178,148" fill="none" stroke="#fff" strokeWidth="2.5" opacity=".4"/>
            <path d="M118,185 C128,170 138,198 148,182 C158,166 168,192 178,178" fill="none" stroke="#fff" strokeWidth="2.5" opacity=".35"/>
            <circle cx="150" cy="192" r="20" fill="#2A9D8F" opacity=".82"/>
            <path d="M141,192 L147,198 L160,185" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="50" y="282" width="72" height="24" rx="12" fill="#E8614D15"/>
            <text x="86" y="298" textAnchor="middle" fontSize="10" fill="#E8614D" fontWeight="600" fontFamily="sans-serif">Intarsia</text>
            <rect x="128" y="282" width="60" height="24" rx="12" fill="#2A9D8F15"/>
            <text x="158" y="298" textAnchor="middle" fontSize="10" fill="#2A9D8F" fontWeight="600" fontFamily="sans-serif">Wool</text>
            <rect x="194" y="282" width="54" height="24" rx="12" fill="#E8A83815"/>
            <text x="221" y="298" textAnchor="middle" fontSize="10" fill="#E8A838" fontWeight="600" fontFamily="sans-serif">6mm</text>
            <rect x="50" y="320" width="200" height="7" rx="3.5" fill="#e8e0d0"/>
            <rect x="50" y="320" width="200" height="7" rx="3.5" fill="#2A9D8F"/>
            <text x="150" y="344" textAnchor="middle" fontSize="10" fill="#2A9D8F" fontWeight="600" fontFamily="sans-serif">Done ✓</text>
            <rect x="50" y="358" width="200" height="55" rx="8" fill="#F8F4EE"/>
            {Array.from({length:10}).map((_,c)=>(<rect key={c} x={56+c*19.5} y={366} width={17} height={12} rx={2} fill={c%2===0?"#4A7FBF":"#4A7FBF30"} opacity={c%2===0?.65:.3}/>))}
            {Array.from({length:10}).map((_,c)=>(<rect key={`b${c}`} x={56+c*19.5} y={381} width={17} height={12} rx={2} fill={c%2===0?"#4A7FBF30":"#4A7FBF"} opacity={c%2===0?.3:.65}/>))}
            <rect x="56" y="398" width="130" height="5" rx="2.5" fill="#ddd"/>
            <rect x="50" y="428" width="200" height="42" rx="21" fill="#E8614D"/>
            <text x="150" y="454" textAnchor="middle" fontSize="14" fill="#fff" fontWeight="700" fontFamily="sans-serif">Get pattern →</text>
            <rect x="108" y="486" width="84" height="4" rx="2" fill="#1a1a1a18"/>
          </svg>
          <div style={{ position: "absolute", top: 35, left: 25, width: 60, height: 60, borderRadius: "50%", background: "#E8614D", opacity: 0.1 }}/>
          <div style={{ position: "absolute", bottom: 50, right: 30, width: 80, height: 80, borderRadius: "50%", background: "#2A9D8F", opacity: 0.08 }}/>
          <div style={{ position: "absolute", top: 130, right: 15, width: 45, height: 45, borderRadius: "50%", background: "#E8A838", opacity: 0.1 }}/>
        </div>
        <div style={{ flex: "1 1 50%", minWidth: 300, display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 48px" }}>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(48px, 7vw, 96px)", fontWeight: 900, lineHeight: 0.9, margin: 0, letterSpacing: "-3px" }}>
            From<br/>photo to<br/>pattern.
          </h1>
          <p style={{ fontSize: "clamp(17px, 2vw, 21px)", lineHeight: 1.55, marginTop: 28, maxWidth: 420 }}>
            See a sweater you love? Upload the photo — knitsnap creates a complete knitting pattern for you. Automatically, in seconds.
          </p>
          <a href="#signup" style={{ display: "inline-block", marginTop: 32, border: "2.5px solid #1a1a1a", borderRadius: 32, padding: "14px 36px", fontSize: 16, fontWeight: 700, color: "#1a1a1a", textDecoration: "none", width: "fit-content" }}>
            Try it free
          </a>
        </div>
      </section>

      {/* ══════ BLUE SWEATER ══════ */}
      <section style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 55%", minWidth: 300, minHeight: 500, overflow: "hidden" }}>
          <img src="/images/sweater-blue.jpg" alt="Blue knit sweater with white swirl pattern" style={imgStyle} loading="lazy" />
        </div>
        <div style={{ flex: "1 1 45%", minWidth: 300, background: "#D4B8FF", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 48px" }}>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 900, lineHeight: 0.95, margin: 0, letterSpacing: "-1.5px" }}>
            Any sweater.<br/>Any style.<br/><span style={{ fontStyle: "italic" }}>Your pattern.</span>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, marginTop: 20, maxWidth: 380, color: "#2a2040" }}>
            Cable knit, mohair, colorwork, ribbed — our AI recognizes the stitch pattern and creates a matching instruction set.
          </p>
        </div>
      </section>

      {/* ══════ HOW IT WORKS ══════ */}
      <section data-s="how" ref={r("how")} style={{ background: "#fff", padding: "100px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(40px, 5.5vw, 76px)", fontWeight: 900, lineHeight: 0.92, margin: "0 0 64px", letterSpacing: "-2px", ...anim("how") }}>
            How it<br/>works.
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 40 }}>
            {[
              { n: "01", title: "Upload a photo", desc: "Screenshot from Pinterest, Instagram, or your own photo — just upload it.", color: "#FFE500" },
              { n: "02", title: "AI analyzes", desc: "Stitch pattern, yarn weight, construction, and sizing — detected in seconds.", color: "#D4B8FF" },
              { n: "03", title: "Start knitting", desc: "Complete pattern with stitch chart, schematic, instructions, and yarn recommendations.", color: "#FFE500" },
            ].map((step, i) => (
              <div key={step.n} style={{ flex: "1 1 280px", ...anim("how", 0.15 * (i + 1)) }}>
                <div style={{ width: 76, height: 76, borderRadius: "50%", background: step.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <span style={{ fontFamily: "Playfair Display, serif", fontSize: 28, fontWeight: 900 }}>{step.n}</span>
                </div>
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 30, fontWeight: 800, margin: "0 0 10px", lineHeight: 1.05 }}>{step.title}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: "#555", margin: 0, maxWidth: 340 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FEATURES + PURPLE SWEATER ══════ */}
      <section data-s="feat" ref={r("feat")} style={{ background: "#FFE500", display: "flex", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 50%", minWidth: 300, display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 48px" }}>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, lineHeight: 0.95, margin: "0 0 28px", letterSpacing: "-1.5px", ...anim("feat") }}>
            Photo in.<br/>Pattern out.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 400 }}>
            {[
              { icon: "🧶", title: "Stitch detection", desc: "Cable, rib, brioche, intarsia — recognized instantly" },
              { icon: "📐", title: "All sizes", desc: "S to 5XL — stitches and yarn recalculated automatically" },
              { icon: "🎨", title: "Yarn matching", desc: "Specific yarn recommendations based on the texture" },
              { icon: "📊", title: "Visual charts", desc: "Interactive stitch charts, schematics, and step-by-step guides" },
            ].map((f, i) => (
              <div key={f.title} style={{ display: "flex", gap: 14, alignItems: "flex-start", ...anim("feat", 0.1 * (i + 1)) }}>
                <div style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{f.icon}</div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800 }}>{f.title}</div>
                  <div style={{ fontSize: 15, color: "#1a1a1a90", marginTop: 2 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: "1 1 50%", minWidth: 300, minHeight: 500, overflow: "hidden" }}>
          <img src="/images/sweater-purple.jpg" alt="Purple and cream striped knit sweater" style={imgStyle} loading="lazy" />
        </div>
      </section>

      {/* ══════ SEE IT KNIT IT ══════ */}
      <section data-s="cta2" ref={r("cta2")} style={{ display: "flex", flexWrap: "wrap-reverse" }}>
        <div style={{ flex: "1 1 50%", minWidth: 300, minHeight: 500, overflow: "hidden" }}>
          <img src="/images/sweater-blue.jpg" alt="Blue sweater" style={imgStyle} loading="lazy" />
        </div>
        <div style={{ flex: "1 1 50%", minWidth: 300, background: "#1a1a1a", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 48px" }}>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(38px, 5.5vw, 68px)", fontWeight: 900, lineHeight: 0.95, margin: 0, color: "#fff", letterSpacing: "-1.5px", ...anim("cta2") }}>
            See it.<br/>Snap it.<br/><span style={{ color: "#FFE500", fontStyle: "italic" }}>Knit it.</span>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, marginTop: 20, maxWidth: 380, color: "#ffffff70" }}>
            Stop saving sweaters you'll never find a pattern for. knitsnap turns any photo into a complete, knittable pattern.
          </p>
          <a href="#signup" style={{ display: "inline-block", marginTop: 28, border: "2.5px solid #FFE500", borderRadius: 32, padding: "14px 32px", fontSize: 16, fontWeight: 700, color: "#FFE500", textDecoration: "none", width: "fit-content" }}>
            Try it free
          </a>
        </div>
      </section>

      {/* ══════ TAGS ══════ */}
      <section data-s="tags" ref={r("tags")} style={{ background: "#D4B8FF", padding: "100px 48px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 900, lineHeight: 0.95, margin: "0 0 40px", letterSpacing: "-1.5px", ...anim("tags") }}>
            Works with <span style={{ fontStyle: "italic" }}>every</span> style.
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", maxWidth: 700, margin: "0 auto", ...anim("tags", 0.2) }}>
            {["Cable knit","Mohair","Colorwork","Ribbing","Intarsia","Brioche","Lace","Fair Isle","Aran","Chunky","Stripes","Textured","Bobble","Seed stitch"].map(t => (
              <span key={t} style={{ padding: "10px 22px", borderRadius: 28, border: "2.5px solid #1a1a1a", fontSize: 15, fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ QUOTE ══════ */}
      <section data-s="quote" ref={r("quote")} style={{ background: "#FFE500", padding: "100px 48px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", ...anim("quote") }}>
          <div style={{ fontFamily: "Playfair Display, serif", fontSize: 80, lineHeight: "0.7", opacity: 0.12, marginBottom: 10 }}>"</div>
          <p style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 700, lineHeight: 1.3, fontStyle: "italic", margin: "0 0 24px" }}>
            I have literally hundreds of sweaters saved on Pinterest that I could never knit because I couldn't find a matching pattern. This changes everything.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#1a1a1a10", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 18, fontWeight: 700 }}>J</span>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Julia M.</div>
              <div style={{ fontSize: 13, opacity: 0.6 }}>Beta tester from Munich</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ SIGNUP — NETLIFY FORM ══════ */}
      <section id="signup" data-s="cta" ref={r("cta")} style={{ background: "#fff", padding: "120px 48px" }}>
        <div style={{ maxWidth: 620, margin: "0 auto", ...anim("cta") }}>
          {!done ? (
            <>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(44px, 6vw, 80px)", fontWeight: 900, lineHeight: 0.92, margin: "0 0 16px", letterSpacing: "-2px" }}>
                Get early<br/>access.
              </h2>
              <p style={{ fontSize: 19, lineHeight: 1.6, color: "#555", margin: "0 0 8px", maxWidth: 460 }}>
                Be the first to try knitsnap when we launch. Sign up and get <strong style={{ color: "#1a1a1a" }}>30% off</strong> your first year.
              </p>
              <p style={{ fontSize: 14, color: "#999", margin: "0 0 36px" }}>No spam. One email when we're ready.</p>

              {/* 
                NETLIFY FORM: This form is automatically detected by Netlify.
                All submissions appear in your Netlify dashboard under Forms.
                You can set up email notifications there.
              */}
              <form
                name="waitlist"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
              >
                <input type="hidden" name="form-name" value="waitlist" />
                <p style={{ display: "none" }}><input name="bot-field" /></p>
                <input
                  type="email" name="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    flex: "1 1 260px", padding: "16px 24px", fontSize: 17,
                    border: "2.5px solid #1a1a1a", borderRadius: 32,
                    outline: "none", fontFamily: "inherit", color: "#1a1a1a"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#E8614D"}
                  onBlur={(e) => e.target.style.borderColor = "#1a1a1a"}
                />
                <button type="submit" style={{
                  padding: "16px 36px", fontSize: 17, fontWeight: 800,
                  color: "#1a1a1a", background: "#FFE500",
                  border: "2.5px solid #1a1a1a", borderRadius: 32,
                  cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap"
                }}>Sign me up</button>
              </form>
              {error && <p style={{ color: "#E8614D", fontSize: 14, marginTop: 12 }}>{error}</p>}
            </>
          ) : (
            <>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(44px, 6vw, 72px)", fontWeight: 900, lineHeight: 0.92, margin: "0 0 16px", letterSpacing: "-2px" }}>You're in.</h2>
              <p style={{ fontSize: 19, lineHeight: 1.6, color: "#555" }}>
                We'll email <strong style={{ color: "#1a1a1a" }}>{email}</strong> as soon as knitsnap launches. Your 30% discount is locked in.
              </p>
            </>
          )}
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer style={{ background: "#FFE500", padding: "48px", borderTop: "2px solid #1a1a1a10" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div>
            <span style={{ fontFamily: "Playfair Display, serif", fontSize: 24, fontWeight: 900 }}>knitsnap</span>
            <p style={{ fontSize: 14, color: "#1a1a1a80", margin: "4px 0 0" }}>From photo to knitting pattern.</p>
          </div>
          <div style={{ display: "flex", gap: 28 }}>
            {["Imprint", "Privacy", "Contact"].map(l => (
              <a key={l} href="#" style={{ fontSize: 14, color: "#1a1a1a", textDecoration: "none", fontWeight: 600 }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
