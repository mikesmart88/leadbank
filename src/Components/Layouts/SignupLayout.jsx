import { Outlet } from "react-router";
import ImageEffect from "../Cards/SignUpImageEffect";

export default function SignupLayout({className}) {
    return (
        <>
        <section className="signup-layout">
            <ImageEffect className="signup-image-effect" />
            <Outlet />
        </section>
        </>
    )
}