import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import LoginForm from './components/login/LoginForm';
import useToken from './components/app/useToken';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';


const App = () => {

  const { token, setToken } = useToken();

  if (!token) {
    return <LoginForm setToken={setToken} />
  }

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}>
          </Route>
          <Route path="/preferences">
          </Route>
        </Routes>
      </BrowserRouter>
  );
}


export default App;
