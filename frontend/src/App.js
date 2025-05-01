import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/api/user", { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <div>
      <h1>Steam Achievement Tracker</h1>
      {user ? (
        <div>
          <img src={user.photos[0].value} alt="Avatar" />
          <h2>Welcome, {user.displayName}</h2>
        </div>
      ) : (
        <a href="http://localhost:3001/auth/steam">Login with Steam</a>
      )}
    </div>
  );
}

export default App;
