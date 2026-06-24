import React from "react";
import { Route, Routes, Navigate } from "react-router";

import HomePage from "../Pages/HomePages/Home";
import Login from "../Pages/Auth/LoginPages/Login";
import CountryInfo from "../Pages/Auth/RegistrationPages/CountryInfo";
import PersoanlInfo from "../Pages/Auth/RegistrationPages/PersonalInfoSignUp";
import PassInfo from "../Pages/Auth/RegistrationPages/PasswordInfo";
import PinInfo from "../Pages/Auth/RegistrationPages/transactionpin";

import Dashboard from "../Pages/(logedin)/DashBoardPages/Dashboard";
import Accounts from "../Pages/(logedin)/AccountsPages/Accounts";

import GenLayout from "../Components/Layouts/GenLayout";
import SignupLayout from "../Components/Layouts/SignupLayout";
import DashboardLayout from "../Components/Layouts/DashboardLayout";
import Payments from "../Pages/(logedin)/PaymentPages/Payment";
import Transaction from "../Pages/(logedin)/TransactionPages/Transactions";
import Card from "../Pages/(logedin)/CardsPages/Card";
import AccountStatement from "../Pages/(logedin)/AccountsPages/AccountStatement";
import More from "../Pages/(logedin)/MorePages/More";
import KYCVerification from "../Pages/(logedin)/VerificationPage/Verification";
import CardStatement from "../Pages/(logedin)/CardsPages/CardStatement";
import CardDeposit from "../Pages/(logedin)/DepositingPages/CardDeposit";
import CreateAccount from "../Pages/(logedin)/AccountsPages/CreateAccount";
import WithdrawFunds from "../Pages/(logedin)/withdrawalPages/SendFunds";

import ProtectedRoute from "./ProtectedRoute";
import OnlyGuestRoute from "./OnlyGuestRoute";
import KYCRoute from "./KYCRoutes";

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
            <Route path="/signup/personal/" element={<PersoanlInfo />} />
            <Route path="/signup/setpassword/" element={<PassInfo />} />
            <Route path="/signup/setpin/" element={<PinInfo />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard/" element={<Dashboard />} />
            <Route path="/accounts/" element={<Accounts />} />
            <Route path="/payments/" element={<Payments />} />
            <Route path="/transactions/" element={<Transaction />} />
            <Route path="/card/" element={<Card />} />
            <Route path="/card/statement" element={<CardStatement />} />
            <Route path="/account/statement/" element={<AccountStatement />} />
            <Route path="/more/" element={<More />} />
          </Route>
          <Route element={<KYCRoute />}>
            <Route
              path="/account/verification/kyc/*"
              element={<KYCVerification />}
            />
          </Route>
          <Route path="/card/top-up/*" element={<CardDeposit />} />
          <Route path="/account/create/new/" element={<CreateAccount />} />
          <Route path="/dashboard/funds/send/*" element={<WithdrawFunds />} />
        </Route>
      </Routes>
    </>
  );
}
