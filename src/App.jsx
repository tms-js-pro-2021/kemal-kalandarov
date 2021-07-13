import React, { useEffect, useState } from "react";

export default function App() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    console.log('login:');
    console.log(login);
    console.log('password:');
    console.log(password);
    setLogin("");
    setPassword("");
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div style={{ width: 200, display: "flex", flexDirection: "column" }}>
        <input
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          style={{ margin: 8 }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: 8 }}
        />
        <button style={{ margin: 8 }} onClick={handleLoginClick}>
          login
        </button>
      </div>
    </div>
  );
}
