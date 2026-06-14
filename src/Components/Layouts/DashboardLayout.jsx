import { Outlet } from "react-router";
import DashboardNavbar from "../NavBars/DashboardNavbar";

export default function DashboardLayout() {
    return (
        <>
        <DashboardNavbar className="navbar dashboard-nav" />
        <Outlet />
        </>
    )
}