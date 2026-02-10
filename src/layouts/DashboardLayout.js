import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

const DashboardLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="d-flex w-100">
      <Navbar />
      <div className="app-main-container">
        <main className={`app-main-content p-6  `}>
          <Outlet
            context={{
              searchQuery,
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
