import React, { useEffect, useState } from "react";

export default function App() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log("mounted");

    return () => {
      console.log("unmounting");
    };
  }, []);

  const handleLoginClick = () => {
    setLogin("");
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
        <input style={{ margin: 8 }} />
        <input style={{ margin: 8 }} />
        <button style={{ margin: 8 }} onClick={handleLoginClick}>
          login
        </button>
      </div>
    </div>
  );
}
