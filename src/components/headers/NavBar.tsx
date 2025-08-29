import { Navbar } from "flowbite-react";

import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import { useAppSelector } from "../../store/hooks";

export function NavBar() {
  const { license_plates } = useAppSelector((state) => state.license_plates);
  const licensePlatesCount = license_plates.length;

  return (
    <div className="px-4 bg-black ">
      <Navbar fluid rounded className="bg-black">
        <Navbar.Brand as={Link} to="/" className="text-white">
          <h1 className="text-3xl font-bold">Tailgating</h1>
        </Navbar.Brand>

        <div className="flex gap-5 items-center">
          <Navbar.Toggle />
        </div>
        <div className="hidden md:flex gap-4 items-center">
          {/* <a
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
          </a> */}
          <div className="relative cursor-pointer">
            <Bell color="white" strokeWidth={3} />
            {licensePlatesCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                {licensePlatesCount > 99 ? "99+" : licensePlatesCount}
              </span>
            )}
          </div>
          {/* <User color="white" strokeWidth={3} className="cursor-pointer" /> */}
        </div>
      </Navbar>
    </div>
  );
}
