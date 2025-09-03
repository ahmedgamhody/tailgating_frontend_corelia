import { Navbar } from "flowbite-react";

import { Link, useLocation } from "react-router-dom";
import {
  History,
  LayoutDashboard,
  // TriangleAlert,
  User,
  // , LayoutDashboard, User
} from "lucide-react";
import { useAppSelector } from "../../store/hooks";

export function NavBar() {
  const location = useLocation();
  const { anomalies } = useAppSelector((state) => state.anomaliesSlice);
  const capitalize = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  return (
    <div className="px-4 bg-black ">
      <Navbar fluid rounded className="bg-black">
        <Navbar.Brand as={Link} to="/" className="text-white">
          <h1 className="text-3xl font-bold">
            Tailgating {capitalize(location.pathname.split("/").pop() || "")}
          </h1>
        </Navbar.Brand>

        <div className="flex gap-5 items-center">
          <Navbar.Toggle />
        </div>
        <div className="hidden md:flex gap-4 items-center">
          <a
            href="http://10.100.102.6:2345"
            target="_blank"
            rel="noopener noreferrer"
            title="Dashboard"
          >
            <LayoutDashboard
              color="white"
              strokeWidth={3}
              className="cursor-pointer"
            />
          </a>
          <Link to={"/history"}>
            <div className="relative cursor-pointer">
              <History color="white" strokeWidth={3} />
              {anomalies[0]?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-semibold"></span>
              )}
            </div>
          </Link>
          {/* <Link to={"/anomalies"}>
            <TriangleAlert
              color="white"
              strokeWidth={3}
              className="cursor-pointer"
            />
          </Link> */}
          <User color="white" strokeWidth={3} className="cursor-pointer" />
        </div>
      </Navbar>
    </div>
  );
}
