import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/homePage/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";
import HistoryPage from "./pages/history/HistoryPage";
import AnomaliesPage from "./pages/anomalies/AnomaliesPage";
import { useState } from "react";
import { PlotsConditionsType } from "./types";
import LicensePlateOcrLayout from "./layouts/LicensePlateOcrLayout";
import LicensePlateOcrPage from "./pages/License Plate Ocr/LicensePlateOcrPage";
import HistoryLayout from "./layouts/HistoryLayout";

function App() {
  const [plotsConditions, setPlotsConditions] = useState<PlotsConditionsType>({
    plots: true,

    source_name: true,
    timestamp: true,
    frame_rate: true,
    ///////////////////////////////////////////////
    classes_counts: true,
    classesSummations: true,
    ///////////////////////////////////////////////
    labels: true,
    boxes: true,
    masks: true,
    keypoints: true,
    ///////////////////////////////////////////////
    trackingIds: true,
    objectsDurations: true,
    trackingLines: true,
    heatMap: true,
    blur: true,
  });
  const [moreInstancesInput, setMoreInstancesInput] = useState<number | "">("");
  const [itemsPerRow, setItemsPerRow] = useState(3);
  const [isFirstItemExpanded, setIsFirstItemExpanded] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<string>("");
  const [selectedSource, setSelectedSource] = useState<string>("");

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <MainLayout
              plotsConditions={plotsConditions}
              moreInstancesInput={moreInstancesInput}
              setMoreInstancesInput={setMoreInstancesInput}
              setPlotsConditions={setPlotsConditions}
              isFirstItemExpanded={isFirstItemExpanded}
              setIsFirstItemExpanded={setIsFirstItemExpanded}
              setItemsPerRow={setItemsPerRow}
              selectedChannel={selectedChannel}
              setSelectedChannel={setSelectedChannel}
              selectedSource={selectedSource}
              setSelectedSource={setSelectedSource}
            />
          }
        >
          <Route
            index
            element={
              <HomePage
                plotsConditions={plotsConditions}
                moreInstancesInput={moreInstancesInput}
                isFirstItemExpanded={isFirstItemExpanded}
                itemsPerRow={itemsPerRow}
              />
            }
          />
          {/* <Route
            path="/history"
            element={
              <HistoryPage
                plotsConditions={plotsConditions}
                moreInstancesInput={moreInstancesInput}
                isFirstItemExpanded={isFirstItemExpanded}
                itemsPerRow={itemsPerRow}
              />
            }
          /> */}
          <Route
            path="/anomalies/:timestamp"
            element={
              <AnomaliesPage
                plotsConditions={plotsConditions}
                moreInstancesInput={moreInstancesInput}
                selectedChannel={selectedChannel}
                selectedSource={selectedSource}
              />
            }
          />
        </Route>
        <Route path="/license-plate-ocr" element={<LicensePlateOcrLayout />}>
          <Route index element={<LicensePlateOcrPage />} />
        </Route>
        <Route path="/history" element={<HistoryLayout />}>
          <Route index element={<HistoryPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
