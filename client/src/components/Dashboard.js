import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            <p>Dashboard</p>
            <Link to="/survey/new">New survey</Link>
        </div>
    );
};

export default Dashboard;
