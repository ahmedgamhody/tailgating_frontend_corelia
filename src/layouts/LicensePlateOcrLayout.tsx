import { Outlet } from "react-router-dom";
import { NavBar } from "../components/headers/NavBar";

export default function LicensePlateOcrLayout() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
