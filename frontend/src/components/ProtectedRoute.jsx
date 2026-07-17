import { Navigate } from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";



function ProtectedRoute({children, rolPermitido}){


    const {usuario} = useContext(AuthContext);





    if(!usuario){


        return <Navigate to="/" />;


    }





    if(rolPermitido && usuario.rol !== rolPermitido){


        return <Navigate to="/dashboard" />;


    }





    return children;



}


export default ProtectedRoute;
