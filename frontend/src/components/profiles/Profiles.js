import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('loading'); // loading | success | error

  useEffect(() => {
    let alive = true;

    const run = async () => {
      try {
        const res = await axios.get('/api/profile');
        if (!alive) return;
        setProfiles(Array.isArray(res.data) ? res.data : []);
        setStatus('success');
      } catch (e) {
        if (!alive) return;
        setStatus('error');
      }
    };

    run();
    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return profiles;

    return profiles.filter((p) => {
      const name = p?.user?.name ?? '';
      const statusText = p?.status ?? '';
      const company = p?.company ?? '';
      const location = p?.location ?? '';
      const skills = Array.isArray(p?.skills) ? p.skills.join(' ') : '';
      return [name, statusText, company, location, skills]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [profiles, query]);

  return (
    <section className="page-shell">
      <header className="page-header">
        <div>
          <h1 className="page-title">Developers</h1>
          <p className="page-subtitle">
            Browse the community and discover profiles, skills, and experience.
          </p>
        </div>

        <div className="page-actions">
          <div className="search">
            <i className="fas fa-search" aria-hidden="true" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, skill, location..."
              aria-label="Search developers"
            />
          </div>
        </div>
      </header>

      {status === 'loading' ? (
        <div className="grid grid--cards">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="card card--skeleton">
              <div className="skeleton skeleton--title" />
              <div className="skeleton skeleton--line" />
              <div className="skeleton skeleton--line" />
              <div className="skeleton skeleton--chips" />
            </div>
          ))}
        </div>
      ) : status === 'error' ? (
        <div className="empty">
          <h2 className="empty-title">Couldn’t load profiles</h2>
          <p className="empty-copy">
            Make sure the backend is running and try refreshing the page.
          </p>
          <a className="btn btn-primary" href="/profiles">
            Retry
          </a>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty">
          <h2 className="empty-title">No matches</h2>
          <p className="empty-copy">
            Try a different search term, or create a profile to appear here.
          </p>
          <Link className="btn btn-primary" to="/dashboard">
            Go to Dashboard
          </Link>
        </div>
      ) : (
        <div className="grid grid--cards">
          {filtered.map((profile) => {
            const name = profile?.user?.name ?? 'Unknown';
            const avatar = profile?.user?.avatar ?? null;
            const statusText = profile?.status ?? '';
            const company = profile?.company ?? '';
            const location = profile?.location ?? '';
            const skills = Array.isArray(profile?.skills) ? profile.skills : [];

            const initials = name
              .split(' ')
              .filter(Boolean)
              .slice(0, 2)
              .map((p) => p[0]?.toUpperCase())
              .join('');

            return (
              <article key={profile?._id ?? name} className="card">
                <div className="card-head">
                  <div className="avatar-ring avatar-ring--sm">
                    <div className="avatar-inner avatar-inner--sm">
                      {avatar ? (
                        <img
                          src={avatar}
                          alt=""
                          className="avatar-img"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        initials || 'U'
                      )}
                    </div>
                  </div>
                  <div className="card-titlewrap">
                    <h3 className="card-title">{name}</h3>
                    <p className="card-subtitle">
                      {statusText}
                      {company ? ` · ${company}` : ''}
                    </p>
                    {location ? (
                      <p className="card-meta">
                        <i className="fas fa-map-marker-alt" aria-hidden="true" />{' '}
                        {location}
                      </p>
                    ) : null}
                  </div>
                </div>

                {skills.length > 0 ? (
                  <div className="chip-row" style={{ marginTop: '1rem' }}>
                    {skills.slice(0, 8).map((skill) => (
                      <span key={skill} className="chip">
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="card-meta" style={{ marginTop: '1rem' }}>
                    No skills listed yet.
                  </p>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Profiles;

