import withAuth, { getServerSideProps } from '../hoc/withAuth';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import api from "../api";

function Protected() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (session) {
      // Fetch user data from the Java backend
      api.get('/api/user', {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
  }, [session]);

  if (!session) {
    return <p>Access Denied</p>;
  }

  return (
    <div>
      <h1>Protected Page</h1>
      {userData ? (
        <div>
          <p>Welcome, {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export { getServerSideProps };
export default withAuth(Protected);