import { Outlet } from "react-router";
import DashboardNavbar from "../NavBars/DashboardNavbar";
import BottomNavBar from "../NavBars/Bottomnav";

export default function DashboardLayout() {
    return (
        <>
        <DashboardNavbar className="navbar dashboard-nav" />
        <Outlet />
        <BottomNavBar className="bottom-nav" />
        </>
    )
}