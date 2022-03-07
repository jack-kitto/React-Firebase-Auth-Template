import { Container } from "react-bootstrap";
import Signup from "./components/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Private from "./components/Private";
import ResetPassword from "./components/ResetPassword";
import UpdateProfile from "./components/UpdateProfile";

function App() {
  return (
    <>
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
