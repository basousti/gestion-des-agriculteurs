import {  Route, Routes } from 'react-router-dom';
import DashboardE from './pages/Dashboard/DashboardE/dashboardE';
import DashboardA from './pages/Dashboard/DashboardA/dashboardA';
import Login1 from "./pages/auth/login1";
import Signup1 from "./pages/auth/signup1";
import ForgotPassword from "./pages/auth/ForgotPW";
import EnterCode from "./pages/auth/EnterCode"
import ResetPassword from "./pages/auth/ResetPassword"


function App() {

  return (
    <>
      <Routes>
        <Route path="/*" element={<Login1/>} />
        <Route path="Signup1" element={<Signup1/>} />
        <Route path="ForgetPW" element={<ForgotPassword/>}/>
        <Route path="EnterCode" element={<EnterCode/>}/>
        <Route path="ResetPassword" element={<ResetPassword/>}/>
        <Route path='DashboardA' element={<DashboardA/>}/>
        <Route path='DashboardE' element={<DashboardE/>}/>
      </Routes>
    </>
  )
}

export default App
