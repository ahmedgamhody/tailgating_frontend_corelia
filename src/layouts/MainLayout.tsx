import { ChannelsSideBar } from "../components/SideBar/ChannelsSideBar";
import { NavBar } from "../components/headers/NavBar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ChevronRight } from "lucide-react";
import { Tooltip } from "flowbite-react";
import {
  openAnomaliesSidebar,
  openChannelsSidebar,
  openPlotsSidebar,
} from "../store/ui/uiSlice";
import PlotsSideBar from "../components/SideBar/PlotsSideBar";
import { PlotsConditionsProps } from "../types";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AnomaliesSideBar from "../components/SideBar/AnomaliesSideBar";

export default function MainLayout({
  plotsConditions,
  moreInstancesInput,
  setMoreInstancesInput,
  setPlotsConditions,
  setItemsPerRow,
  isFirstItemExpanded,
  setIsFirstItemExpanded,
  selectedChannel,
  setSelectedChannel,
  selectedSource,
  setSelectedSource,
}: PlotsConditionsProps) {
  const { isChannelsSidebarOpen, isPlotsSidebarOpen, isAnomaliesSidebarOpen } =
    useAppSelector((state) => state.ui);
  const location = useLocation();
  const dispatch = useAppDispatch();

  return (
    <div className="bg-section h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 w-full bg-gray-50 overflow-hidden">
        {/* Left Side - Channels */}
        {location.pathname === "/" && (
          <>
            {isChannelsSidebarOpen ? (
              <ChannelsSideBar />
            ) : (
              <div className="w-10 h-full pt-2 flex flex-col items-center justify-center">
                <Tooltip
                  content="Open Channels Sidebar"
                  placement="right"
                  arrow={false}
                >
                  <ChevronRight
                    className="cursor-pointer text-secondary hover:text-primary duration-200"
                    onClick={() => dispatch(openChannelsSidebar())}
                    size={35}
                  />
                </Tooltip>
              </div>
            )}
          </>
        )}

        {location.pathname === "/anomalies" && (
          <>
            {isAnomaliesSidebarOpen ? (
              <AnomaliesSideBar
                selectedChannel={selectedChannel}
                setSelectedChannel={setSelectedChannel}
                selectedSource={selectedSource}
                setSelectedSource={setSelectedSource}
              />
            ) : (
              <div className="w-10 h-full pt-2 flex flex-col  items-center justify-center">
                <Tooltip
                  content="Open Anomalies Sidebar"
                  placement="right"
                  arrow={false}
                >
                  <ChevronRight
                    className="cursor-pointer text-secondary hover:text-primary duration-200"
                    onClick={() => dispatch(openAnomaliesSidebar())}
                    size={35}
                  />
                </Tooltip>
              </div>
            )}
          </>
        )}

        {/* Main Content */}
        <div className="flex-1 bg-section flex flex-col min-h-0">
          <Outlet />
        </div>

        {/* Right Side - Plots */}
        {isPlotsSidebarOpen ? (
          <div className="w-72 h-full  flex flex-col items-center justify-center ">
            <PlotsSideBar
              plotsConditions={plotsConditions}
              setPlotsConditions={setPlotsConditions}
              setMoreInstancesInput={setMoreInstancesInput}
              moreInstancesInput={moreInstancesInput}
              setItemsPerRow={setItemsPerRow}
              isFirstItemExpanded={isFirstItemExpanded}
              setIsFirstItemExpanded={setIsFirstItemExpanded}
            />
          </div>
        ) : (
          <div className="w-10 h-full  flex flex-col items-center justify-center bg-section">
            <div className="w-10 h-full  flex flex-col items-center justify-center bg-gray-50">
              <Tooltip
                content="Open Plots Sidebar"
                placement="left"
                arrow={false}
              >
                <ChevronRight
                  className="cursor-pointer text-secondary hover:text-primary duration-200 rotate-180"
                  onClick={() => dispatch(openPlotsSidebar())}
                  size={35}
                />
              </Tooltip>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
