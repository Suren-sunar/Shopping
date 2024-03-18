import { Navigate, Route, Routes } from "react-router-dom"
import { FrontLayout } from "../Layouts/FrontLayout"
import { Front } from "../pages";
import { PrivateRoutes } from "./PrivateRoutes";

export const FrontRoutes = () => <Routes>
    <Route path="/" element={<FrontLayout />}>

        <Route index element={<Front.Pages.Home />} />

        <Route path="cart" element={<Front.Pages.Cart />} />

        <Route path="login" element={<Front.User.Login />} />
        <Route path="register" element={<Front.User.Register />} />

        <Route path="user" element={<PrivateRoutes element={<Front.User.Profile />} />} />

        <Route path="category/:id" element={<Front.Pages.Category />} />
        <Route path="brand/:id" element={<Front.Pages.Brand />} />
        <Route path="product/:id" element={<Front.Pages.Detail />} />

    </Route>
</Routes>