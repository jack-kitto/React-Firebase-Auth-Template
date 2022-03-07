import { Container } from "react-bootstrap";
import Signup from "./components/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Profile from "./components/Profile";
import Login from "./components/Login";
import Private from "./components/Private";
import ResetPassword from "./components/ResetPassword";
import UpdateProfile from "./components/UpdateProfile";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <AuthProvider>
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Router>
              <AuthProvider>
                <Routes>
                  <Route exact path='/' element={
                    <Private>
                      <Dashboard />
                    </Private>
                  } />
                  <Route path='/profile' element={
                    <Private>
                      <Profile />
                    </Private>
                  } />
                  <Route path='/update-profile' element={
                    <Private>
                      <UpdateProfile />
                    </Private>
                  } />
                  <Route path='/signup' element={<Signup />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/reset-password' element={<ResetPassword />} />
                </Routes>
              </AuthProvider>
            </Router>
          </div>
        </Container>
      </AuthProvider>
    </>
  );
}

export default App;
