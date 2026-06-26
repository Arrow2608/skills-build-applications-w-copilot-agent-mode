import { useEffect, useState } from 'react';

type User = {
  name: string;
  email: string;
  role?: string;
  joinedAt?: string;
};

const parseUsers = (response: any): User[] => {
  if (Array.isArray(response)) return response;
  return response.results ?? response.data ?? response.items ?? [];
};

export default function Users({ apiHost }: { apiHost: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiHost}/api/users/`);
        if (!response.ok) {
          throw new Error(`Failed to load users (${response.status})`);
        }

        const data = await response.json();
        setUsers(parseUsers(data));
      } catch (fetchError) {
        setError(String(fetchError));
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [apiHost]);

  return (
    <main className="container py-4">
      <h2>Users</h2>
      {loading && <p>Loading users…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && users.length === 0 && (
        <div className="alert alert-info">No users found.</div>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={`${user.email ?? user.name}-${index}`}>
                  <td>{user.name ?? 'Unknown'}</td>
                  <td>{user.email ?? 'N/A'}</td>
                  <td>{user.role ?? 'Member'}</td>
                  <td>{user.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : 'Unknown'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
