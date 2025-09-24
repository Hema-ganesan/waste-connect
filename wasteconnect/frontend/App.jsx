import React, { useEffect, useState } from "react";

export default function App(){
  const [pickups, setPickups] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:5000/api/pickups")
      .then(r=>r.json())
      .then(setPickups);
  },[]);

  return (
    <div>
      <h1>Municipality Dashboard</h1>
      <h2>Pickup Requests</h2>
      <ul>
        {pickups.map(p => (
          <li key={p._id}>
            {p.userName} — {p.binType} — {new Date(p.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
