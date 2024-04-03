import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddJobForm from "../AddJobform";
import AddjobTable from "../AddjobTable";
import Login from "../Login";
import Layout from "../Layout";
import SignUp from "../SignUp";



const Routing = () => {


  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Layout />} />

          <Route index element={<Login />} />


          <Route path="/addJob" element={<AddJobForm />} />

          <Route path="/ManageJob" element={<AddjobTable />} />
          <Route path="/EditJob" element={<AddJobForm />} />
          <Route path="/SignUp" element={<SignUp />} />


        </Routes>

      </BrowserRouter>
    </>
  );
};

export default Routing;

