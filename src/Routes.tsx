import { Routes, Route } from "react-router-dom";
import ListSort from "./pages/ListSort";
import ContainerSort from "./pages/ContainerSort";
import SortDnd from "./pages/SortDnd";

const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<ListSort />} />
    <Route path="/container-sort" element={<ContainerSort />} />
    <Route path="/sort-dnd" element={<SortDnd />} />
  </Routes>
);

export default MainRoutes;
