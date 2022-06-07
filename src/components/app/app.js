import { Navigate, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';

import NavbarHeader from '../navbar-header/navbar-header';
import LidList from '../lid-list/lid-list';
import WorkOrderList from '../work-order-list/work-order-list';
import AdminsList from '../admins/admins-list';
import ArchiveList from '../archive/archive-list';
import ClientsList from '../client-list/clients-list';
import LoginInSystem from '../auth/login';
import Page404 from '../pages/404';
import { store } from '../../store';
import ControlAuth from '../auth/control-auth';

import './app.css';

function SecureRoute ({ children, path, ...rest }) {
  const user = useSelector((state) => state.auth.userAuth);
  const loading = useSelector((state) => state.auth.userLoading);
  if (loading) return null;  
  if (!user) {
    return <Navigate to="/login" />
  }
  return children
}

function App() {

   return (
    <Provider store={store}>
      <ControlAuth />
      <Router>
        <div className="app">
            
              
          <NavbarHeader/>
              
              <Routes>
                <Route  path="/" element={<SecureRoute><LidList/></SecureRoute>} />
                <Route  path="/work" element={<SecureRoute><WorkOrderList/></SecureRoute>} />
                <Route path="/admins" element={<SecureRoute><AdminsList/></SecureRoute>} />
                <Route  path="/clients" element={<SecureRoute><ClientsList/></SecureRoute>} />
                <Route path="/archive" element={<SecureRoute><ArchiveList/></SecureRoute>} />
                <Route path="/login" element={<LoginInSystem />} />
                <Route path="/order/:orderId" element={'in work'} />
                <Route path="*" element={<Page404 />} />  
              </Routes>
            
            
        </div>
      </Router>
    </Provider>

  );
}

export default App;
