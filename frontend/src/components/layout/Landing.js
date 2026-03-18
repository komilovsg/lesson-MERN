import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Landing login', formData);
  };

  return (
    <section className="landing">
      <div className="landing-grid">
        <article className="profile-card">
          <div className="profile-header">
            <div className="avatar-ring">
              <div className="avatar-inner">SK</div>
            </div>
            <div>
              <span className="badge">
                <i className="fas fa-bolt" /> Available for projects
              </span>
              <h1 className="profile-title">Shakhron Komilov</h1>
              <p className="profile-subtitle">
                Frontend / Full‑Stack Developer · Mentor
              </p>
              <p className="profile-location">Dushanbe, Tajikistan · GMT+5</p>
            </div>
          </div>

          <p className="profile-bio">
            Ambitious frontend & full‑stack developer with hands‑on experience
            in React, Next.js and Node.js. I build clean, fast interfaces,
            mentor developers and love turning complex ideas into simple
            products.
          </p>

          <div className="chip-row">
            <span className="chip">React / Next.js</span>
            <span className="chip">TypeScript</span>
            <span className="chip">Node.js & Express</span>
            <span className="chip chip--outline">Mentorship & Code Review</span>
          </div>

          <div className="metrics">
            <div className="metric">
              <div className="metric-label">Experience</div>
              <div className="metric-value">3+ yrs</div>
              <div className="metric-sub">Production apps</div>
            </div>
            <div className="metric">
              <div className="metric-label">Focus</div>
              <div className="metric-value">MERN</div>
              <div className="metric-sub">Full‑stack</div>
            </div>
            <div className="metric">
              <div className="metric-label">Location</div>
              <div className="metric-value">Remote</div>
              <div className="metric-sub">Worldwide</div>
            </div>
          </div>

          <div className="social-row">
            <a
              href="https://github.com/komilovsg"
              target="_blank"
              rel="noreferrer"
              className="social-pill"
            >
              <i className="fab fa-github" />
            </a>
            <a
              href="https://www.linkedin.com/in/komilovsg"
              target="_blank"
              rel="noreferrer"
              className="social-pill"
            >
              <i className="fab fa-linkedin-in" />
            </a>
            <a
              href="https://t.me/komilovsg"
              target="_blank"
              rel="noreferrer"
              className="social-pill"
            >
              <i className="fab fa-telegram-plane" />
            </a>
          </div>
        </article>

        <aside className="auth-card">
          <h2 className="auth-title">Sign in to DevConnector</h2>
          <p className="auth-subtitle">
            Continue to your developer dashboard and community.
          </p>

          <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email address"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
                minLength="6"
              />
            </div>
            <button type="submit" className="btn-primary">
              Login
            </button>
          </form>

          <p className="auth-meta">
            Don't have an account yet? <Link to="/register">Create one</Link>
          </p>
        </aside>
      </div>
    </section>
  );
};

export default Landing;


