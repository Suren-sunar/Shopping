import { BrowserRouter } from "react-router-dom";
import { CmsRoutes } from "./CmsRoutes";
import { FrontRoutes } from "./FrontRoutes";

export const AllRoutes = () => <BrowserRouter>
    <CmsRoutes />
    <FrontRoutes />
</BrowserRouter>