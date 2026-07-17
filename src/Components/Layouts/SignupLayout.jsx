import { useTranslation } from "../../auto-il8n";
import { Outlet } from "react-router";
import ImageEffect from "../Cards/SignUpImageEffect";
export default function SignupLayout({
  className
}) {
  const {
    t
  } = useTranslation();
  return <>
        <section className="signup-layout">
            <ImageEffect className="signup-image-effect" />
            <Outlet />
        </section>
        </>;
}