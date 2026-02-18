import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import CommonHeader from "../components/commonHeader";

const DashboardLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isHeader, setIsHeader] = useState(true);
  const [headerName, setHeaderName] = useState("dashboard");

  return (
    <div className="d-flex w-100">
      <Navbar />
      <div className="app-main-container">
        {<CommonHeader headerName={headerName} />}
        <main className={`app-main-content p-6`}>
          <Outlet
            context={{
              searchQuery,
              setIsHeader,
              setHeaderName,
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
