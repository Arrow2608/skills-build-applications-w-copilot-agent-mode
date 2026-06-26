import { useEffect, useState } from 'react';

type Activity = {
  type: string;
  duration: number;
  calories: number;
  date: string;
  userId?: string;
};

const parseActivities = (response: any): Activity[] => {
  if (Array.isArray(response)) return response;
  return response.results ?? response.data ?? response.activities ?? [];
};

export default function Activities({ apiHost }: { apiHost: string }) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`${apiHost}/api/activities/`);
        if (!response.ok) {
          throw new Error(`Failed to load activities (${response.status})`);
        }

        const data = await response.json();
        setActivities(parseActivities(data));
      } catch (fetchError) {
        setError(String(fetchError));
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [apiHost]);

  return (
    <main className="container py-4">
      <h2>Activities</h2>
      {loading && <p>Loading activities…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && activities.length === 0 && (
        <div className="alert alert-info">No activities found.</div>
      )}

      {!loading && !error && activities.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>User ID</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={`${activity.type}-${activity.date}-${index}`}>
                  <td>{new Date(activity.date).toLocaleString()}</td>
                  <td>{activity.type}</td>
                  <td>{activity.duration} min</td>
                  <td>{activity.calories}</td>
                  <td>{activity.userId ?? 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
