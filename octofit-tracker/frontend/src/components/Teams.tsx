import { useEffect, useState } from 'react';

type Team = {
  name: string;
  members: string[];
  createdAt?: string;
};

const parseTeams = (response: any): Team[] => {
  if (Array.isArray(response)) return response;
  return response.results ?? response.data ?? response.teams ?? [];
};

export default function Teams({ apiHost }: { apiHost: string }) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${apiHost}/api/teams/`);
        if (!response.ok) {
          throw new Error(`Failed to load teams (${response.status})`);
        }

        const data = await response.json();
        setTeams(parseTeams(data));
      } catch (fetchError) {
        setError(String(fetchError));
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [apiHost]);

  return (
    <main className="container py-4">
      <h2>Teams</h2>
      {loading && <p>Loading teams…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && teams.length === 0 && (
        <div className="alert alert-info">No teams found.</div>
      )}

      {!loading && !error && teams.length > 0 && (
        <div className="accordion" id="teamsAccordion">
          {teams.map((team, index) => (
            <div className="accordion-item" key={`${team.name}-${index}`}>
              <h2 className="accordion-header" id={`heading-${index}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${index}`}
                  aria-expanded="false"
                  aria-controls={`collapse-${index}`}
                >
                  {team.name}
                </button>
              </h2>
              <div
                id={`collapse-${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading-${index}`}
                data-bs-parent="#teamsAccordion"
              >
                <div className="accordion-body">
                  <p>
                    <strong>Members:</strong> {team.members.join(', ') || 'None'}
                  </p>
                  <p>
                    <strong>Created:</strong>{' '}
                    {team.createdAt
                      ? new Date(team.createdAt).toLocaleDateString()
                      : 'Unknown'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
