import { useEffect, useState } from 'react';

type Workout = {
  title: string;
  duration: number;
  difficulty?: string;
  recommendedFor?: string;
};

const parseWorkouts = (response: any): Workout[] => {
  if (Array.isArray(response)) return response;
  return response.results ?? response.data ?? response.workouts ?? [];
};

export default function Workouts({ apiHost }: { apiHost: string }) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(`${apiHost}/api/workouts/`);
        if (!response.ok) {
          throw new Error(`Failed to load workouts (${response.status})`);
        }

        const data = await response.json();
        setWorkouts(parseWorkouts(data));
      } catch (fetchError) {
        setError(String(fetchError));
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [apiHost]);

  return (
    <main className="container py-4">
      <h2>Workouts</h2>
      {loading && <p>Loading workouts…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && workouts.length === 0 && (
        <div className="alert alert-info">No workouts available.</div>
      )}

      {!loading && !error && workouts.length > 0 && (
        <div className="row gy-3">
          {workouts.map((workout, index) => (
            <div className="col-12 col-md-6" key={`${workout.title}-${index}`}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{workout.title}</h5>
                  <p className="card-text mb-1">
                    <strong>Duration:</strong> {workout.duration} min
                  </p>
                  <p className="card-text mb-1">
                    <strong>Difficulty:</strong> {workout.difficulty ?? 'All levels'}
                  </p>
                  <p className="card-text mb-0">
                    <strong>Recommended for:</strong> {workout.recommendedFor ?? 'Everyone'}
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
