import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from '../AuthContext/AuthCOntext';
import useAdmin from '../CustomeHook/UseAdmin';
import Footer from '../Pages/Shared/Footer';
import Header from '../Pages/Shared/Header';

const DashboardLayOut = () => {
    const {user}=useContext(UserContext);
    const [isAdmin]=useAdmin(user?.email);
    return (
        <div>
            <Header></Header>
           <div className="drawer drawer-mobile">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content ">
    {/* <!-- Page content here --> */}
    <Outlet></Outlet>
    {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80  text-base-content">
      {/* <!-- Sidebar content here --> */}
      <li><Link to='/dashboard'>My Apointments</Link></li>
      {
        isAdmin &&
        <>
        <li><Link to='/dashboard/allusers'>All Users</Link></li>
        <li><Link to='/dashboard/adddoctor'>Add doctor</Link></li>
        <li><Link to='/dashboard/managedoctors'>Manage Doctors</Link></li>
        </>
      }
    </ul>
  
  </div>
</div>
<Footer></Footer>
        </div>
    );
};

export default DashboardLayOut;