import { Outlet } from "react-router-dom";
import { NavBar } from "../components/headers/NavBar";

export default function HistoryLayout() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
