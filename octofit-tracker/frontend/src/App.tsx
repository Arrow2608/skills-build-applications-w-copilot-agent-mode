import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

interface AppProps {
  codespaceName: string;
}

const getApiHost = (codespaceName: string) => {
  const trimmed = codespaceName?.trim();

  if (trimmed) {
    return `https://${trimmed}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/users', label: 'Users' },
  { path: '/activities', label: 'Activities' },
  { path: '/teams', label: 'Teams' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/workouts', label: 'Workouts' },
];

export default function App({ codespaceName }: AppProps) {
  const apiHost = getApiHost(codespaceName);
  const isCodespace = Boolean(codespaceName?.trim());

  return (
    <BrowserRouter>
      <div className="container py-4">
        <header className="mb-4">
          <h1 className="mb-3">OctoFit Tracker</h1>
          <nav className="nav nav-pills flex-wrap gap-2 mb-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link${isActive ? ' active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="border rounded-3 p-3 bg-light">
            <p className="mb-1">
              API host: <code>{apiHost}</code>
            </p>
            <p className="mb-0 small text-muted">
              {isCodespace
                ? 'Using Codespaces backend URL from VITE_CODESPACE_NAME.'
                : 'VITE_CODESPACE_NAME is not set. Falling back to localhost. Create a frontend .env.local file with VITE_CODESPACE_NAME defined for Codespaces.'}
            </p>
          </div>
        </header>

        {!isCodespace && (
          <div className="alert alert-warning">
            <strong>VITE_CODESPACE_NAME is unset.</strong> Please define{' '}
            <code>VITE_CODESPACE_NAME</code> inside <code>.env.local</code> in the frontend folder to connect to Codespaces.
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <main className="container py-5">
                <h2>Welcome</h2>
                <p>
                  This frontend uses React 19, Vite, Bootstrap, and react-router-dom.
                </p>
                <p>
                  The backend API is loaded from the host above using{' '}
                  <code>import.meta.env.VITE_CODESPACE_NAME</code>.
                </p>
              </main>
            }
          />
          <Route path="/users" element={<Users apiHost={apiHost} />} />
          <Route path="/activities" element={<Activities apiHost={apiHost} />} />
          <Route path="/teams" element={<Teams apiHost={apiHost} />} />
          <Route path="/leaderboard" element={<Leaderboard apiHost={apiHost} />} />
          <Route path="/workouts" element={<Workouts apiHost={apiHost} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
