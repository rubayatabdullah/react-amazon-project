import { Outlet } from "react-router-dom";
import Footer from "./HomePage/Footer";
import Header from "./HomePage/Header";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
