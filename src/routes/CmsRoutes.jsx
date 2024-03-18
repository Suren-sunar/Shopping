import { Outlet, Route, Routes } from "react-router-dom"
import { Cms } from "../pages"
import { CmsLayout } from "../Layouts"
import { PrivateRoutes } from "./PrivateRoutes"
import { AdminRoutes } from "./AdminRoutes"

export const CmsRoutes = () => <Routes>
    <Route path="/cms" element={<CmsLayout />}>
        <Route path="dashboard" element={<PrivateRoutes element={<Cms.Dashboard.List />} />} />

        <Route path="profile" element={<PrivateRoutes element={<Cms.Profile.Edit />} />} />
        
        <Route path="password" element={<PrivateRoutes element={<Cms.Profile.Password />} />} />

        <Route path="staffs" element={<PrivateRoutes element={<AdminRoutes element={<Outlet />} />} />}>
            <Route index element={<Cms.Staffs.List />} />
            <Route path="create" element={<Cms.Staffs.Create />} />
            <Route path=":id" element={<Cms.Staffs.Edit />} />
        </Route>

        <Route path="categories" element={<PrivateRoutes element={<Outlet />} />}>
            <Route index element={<Cms.Categories.List />} />
            <Route path="create" element={<Cms.Categories.Create />} />
            <Route path=":id" element={<Cms.Categories.Edit />} />
        </Route>

        <Route path="brands" element={<PrivateRoutes element={<Outlet />} />}>
            <Route index element={<Cms.Brands.List />} />
            <Route path="create" element={<Cms.Brands.Create />} />
            <Route path=":id" element={<Cms.Brands.Edit />} />
        </Route>

        <Route path="products" element={<PrivateRoutes element={<Outlet />} />}>
            <Route index element={<Cms.Products.List />} />
            <Route path="create" element={<Cms.Products.Create />} />
            <Route path=":id" element={<Cms.Products.Edit />} />
        </Route>

        <Route path="orders" element={<PrivateRoutes element={<Cms.Orders.List />} />} />

        <Route path="reviews" element={<PrivateRoutes element={<Cms.Reviews.List />} />} />

        <Route path="login" element={<Cms.Auth.Login />} />
    </Route>
</Routes>