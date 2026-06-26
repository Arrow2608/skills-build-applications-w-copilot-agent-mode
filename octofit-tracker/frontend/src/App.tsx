import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <main className="container py-5">
      <h1>OctoFit Tracker</h1>
      <p>Welcome to the modern OctoFit Tracker frontend.</p>
      <Link to="/about" className="btn btn-primary">About</Link>
    </main>
  );
}

function About() {
  return (
    <main className="container py-5">
      <h1>About</h1>
      <p>This app is powered by React 19, Vite, and Bootstrap.</p>
      <Link to="/" className="btn btn-secondary">Home</Link>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
