import { useEffect, useState } from 'react';

type LeaderboardEntry = {
  rank: number;
  user: string;
  score: number;
  team?: string;
};

const parseLeaderboard = (response: any): LeaderboardEntry[] => {
  if (Array.isArray(response)) return response;
  return response.results ?? response.data ?? response.leaderboard ?? [];
};

export default function Leaderboard({ apiHost }: { apiHost: string }) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${apiHost}/api/leaderboard/`);
        if (!response.ok) {
          throw new Error(`Failed to load leaderboard (${response.status})`);
        }

        const data = await response.json();
        setEntries(parseLeaderboard(data));
      } catch (fetchError) {
        setError(String(fetchError));
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [apiHost]);

  return (
    <main className="container py-4">
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && entries.length === 0 && (
        <div className="alert alert-info">No leaderboard data available.</div>
      )}

      {!loading && !error && entries.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Team</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={`${entry.user}-${index}`}>
                  <td>{entry.rank}</td>
                  <td>{entry.user}</td>
                  <td>{entry.team ?? 'Individual'}</td>
                  <td>{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
