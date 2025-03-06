import { Navigate, Route, Routes } from 'react-router-dom';
import AuthWrapper from './pages/auth/AuthWrapper';
import DashboardE from './pages/Dashboard/dashboardE';
import DashboardA from './pages/Dashboard/dashboardA';

function App() {

  return (
    <>
    
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/*" element={<AuthWrapper />} />
        <Route path='DashboardA' element={<DashboardA></DashboardA>}></Route>
        <Route path='DashboardE' element={<DashboardE></DashboardE>}></Route>
      </Routes>
    </>
  )
}

export default App
