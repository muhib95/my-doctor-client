import { createBrowserRouter } from "react-router-dom";
import AllUsers from "../AllUsers/AllUsers";
import AddDoctor from "../Dashboard/AddDoctor/AddDoctor";
import ManageDoctors from "../Dashboard/ManageDoctors/ManageDoctors";
import Payment from "../Dashboard/Payment/Payment";
// import Dashboard from "../Dashboard/Dashboard";
import DashboardLayOut from "../DashboardLayOut/DashboardLayOut";
import Layout from "../Layout/Layout";
import MyApointment from "../MyApointment/MyApointment";
import Apointment from "../Pages/Apointment/Apointment";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Pages/Shared/ErrorPage/ErrorPage";
import AdminRoute from "../PrivateRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router=createBrowserRouter([
    {
        path:'/',
        element:<Layout></Layout>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/apointment',
                element:<PrivateRoute><Apointment></Apointment></PrivateRoute>
            }
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><DashboardLayOut></DashboardLayOut></PrivateRoute>,
        children:[
            {
                path:'/dashboard',
                element:<MyApointment></MyApointment>
            },
            {
                path:'/dashboard/allusers',
                element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path:'/dashboard/adddoctor',
                element:<AdminRoute><AddDoctor></AddDoctor></AdminRoute>
            },
            {
                path:'/dashboard/managedoctors',
                element:<AdminRoute><ManageDoctors></ManageDoctors></AdminRoute>
            },
            {
                path:'/dashboard/payment/:id',
                element:<Payment></Payment>,
                loader:({params})=>fetch(`http://localhost:5000/booking/${params.id}`)
            }
        ]
    }
]);