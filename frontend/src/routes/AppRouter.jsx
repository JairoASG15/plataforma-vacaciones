import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Solicitar from "../pages/Solicitar";
import Historial from "../pages/Historial";
import Admin from "../pages/Admin";

import ProtectedRoute from "../components/ProtectedRoute";


function AppRouter(){


    return(


        <BrowserRouter>


            <Routes>



                <Route

                    path="/"

                    element={<Login />}

                />





                <Route

                    path="/dashboard"

                    element={

                        <ProtectedRoute>

                            <Dashboard />

                        </ProtectedRoute>

                    }

                />





                <Route

                    path="/solicitar"

                    element={

                        <ProtectedRoute>

                            <Solicitar />

                        </ProtectedRoute>

                    }

                />





                <Route

                    path="/historial"

                    element={

                        <ProtectedRoute>

                            <Historial />

                        </ProtectedRoute>

                    }

                />





                <Route

                    path="/admin"

                    element={

                        <ProtectedRoute rolPermitido="admin">

                            <Admin />

                        </ProtectedRoute>

                    }

                />




            </Routes>


        </BrowserRouter>


    );


}


export default AppRouter;
