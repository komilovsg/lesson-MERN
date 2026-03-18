import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = ({ isAuthenticated, loading, user }) => {
  const [apiStatus, setApiStatus] = useState({ state: 'idle', ts: null });

  useEffect(() => {
    let alive = true;
    const run = async () => {
      try {
        setApiStatus({ state: 'loading', ts: null });
        const res = await axios.get('/api/health');
        if (!alive) return;
        setApiStatus({ state: 'ok', ts: res?.data?.timestamp ?? null });
      } catch (e) {
        if (!alive) return;
        setApiStatus({ state: 'error', ts: null });
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, []);

  const firstName = useMemo(() => {
    const raw = user?.name?.trim() || '';
    if (!raw) return 'there';
    return raw.split(' ')[0] || raw;
  }, [user?.name]);

  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <section className="page-shell">
      <header className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">
            Welcome back, <span className="accent">{firstName}</span>. Pick up
            where you left off.
          </p>
        </div>

        <div className="page-actions">
          <Link className="btn btn-primary" to="/profiles">
            Explore Developers
          </Link>
        </div>
      </header>

      <div className="grid grid--widgets">
        <article className="card card--widget">
          <h2 className="widget-title">Quick actions</h2>
          <div className="widget-actions">
            <button className="btn btn-secondary" type="button" disabled>
              <i className="fas fa-user-edit" aria-hidden="true" /> Edit Profile
            </button>
            <button className="btn btn-secondary" type="button" disabled>
              <i className="fas fa-briefcase" aria-hidden="true" /> Add
              Experience
            </button>
            <button className="btn btn-secondary" type="button" disabled>
              <i className="fas fa-graduation-cap" aria-hidden="true" /> Add
              Education
            </button>
          </div>
          <p className="widget-hint">
            These will become active once we build profile forms later in the
            course.
          </p>
        </article>

        <article className="card card--widget">
          <h2 className="widget-title">API status</h2>
          <div className="status-row">
            <span
              className={`status-dot status-dot--${apiStatus.state}`}
              aria-hidden="true"
            />
            <span className="status-text">
              {apiStatus.state === 'loading'
                ? 'Checking backend…'
                : apiStatus.state === 'ok'
                  ? 'Backend is healthy'
                  : apiStatus.state === 'error'
                    ? 'Backend not reachable'
                    : 'Not checked yet'}
            </span>
          </div>
          {apiStatus.ts ? (
            <p className="card-meta">Last response: {apiStatus.ts}</p>
          ) : (
            <p className="card-meta">
              Endpoint: <code className="inline-code">/api/health</code>
            </p>
          )}
        </article>

        <article className="card card--widget">
          <h2 className="widget-title">Your session</h2>
          <ul className="kv">
            <li className="kv-item">
              <span className="kv-key">Authenticated</span>
              <span className="kv-val">
                {isAuthenticated ? 'Yes' : 'No'}
              </span>
            </li>
            <li className="kv-item">
              <span className="kv-key">Email</span>
              <span className="kv-val">{user?.email ?? '—'}</span>
            </li>
            <li className="kv-item">
              <span className="kv-key">User id</span>
              <span className="kv-val">{user?._id ?? '—'}</span>
            </li>
          </ul>
        </article>

        <article className="card card--widget">
          <h2 className="widget-title">Next up</h2>
          <ol className="steps">
            <li>Build profile creation & editing forms</li>
            <li>Connect profile data to Redux</li>
            <li>Create a real dashboard with profile info</li>
          </ol>
          <p className="widget-hint">
            For now, you can explore the public profiles list.
          </p>
        </article>
      </div>
    </section>
  );
};

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user
});

export default connect(mapStateToProps)(Dashboard);

