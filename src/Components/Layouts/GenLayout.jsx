import { useTranslation } from "../../auto-il8n";
import { Outlet } from "react-router";
import NavBar from "../NavBars/NavBar";
import Footer from "../Footers/Footer";
export default function GenLayout() {
  const {
    t
  } = useTranslation();
  return <>
        <NavBar className="navbar" />
        <Outlet />
        <Footer className="footer" />
        </>;
}