import React from "react";
import { Route, Routes, Navigate } from "react-router";

import HomePage from "../Pages/HomePages/Home";
import Login from "../Pages/Auth/LoginPages/Login";
import CountryInfo from "../Pages/Auth/RegistrationPages/CountryInfo";

import Dashboard from "../Pages/(logedin)/DashBoardPages/Dashboard";
import Accounts from "../Pages/(logedin)/AccountsPages/Accounts";

import GenLayout from "../Components/Layouts/GenLayout";
import SignupLayout from "../Components/Layouts/SignupLayout";
import DashboardLayout from "../Components/Layouts/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";
import OnlyGuestRoute from "./OnlyGuestRoute";


export default function GeneralRouter() {
    return (
        <>
        <Routes>
            <Route element={<GenLayout />}>
            <Route path="/" element={<HomePage />} />
            </Route>
            <Route element={<OnlyGuestRoute />}>
            <Route path="/login/" element={<Login />} />
            <Route element={<SignupLayout />}>
            <Route path="/signup/country/" element={<CountryInfo />} />
            </Route>
            </Route>
            <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
                <Route path="/dashboard/" element={<Dashboard />} />
                <Route path="/accounts/" element={<Accounts />} />
            </Route>
            </Route>
        </Routes>
        </>
    )
}