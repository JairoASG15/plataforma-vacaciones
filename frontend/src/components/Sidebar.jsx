import { 
    Home,
    CalendarDays,
    History,
    ShieldCheck,
    LogOut
} from "lucide-react";


import { Link, useLocation, useNavigate } from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";



function Sidebar(){


    const location = useLocation();

    const navigate = useNavigate();


    const { logout, usuario } = useContext(AuthContext);




    function activo(ruta){

        return location.pathname === ruta

        ?

        "bg-blue-600/30 text-white shadow-lg"

        :

        "text-slate-300 hover:bg-white/10";


    }





    function cerrarSesion(){


        logout();


        navigate("/");


    }





    return(


        <aside className="w-60 min-h-screen p-4">



            <div className="h-full rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl p-5 flex flex-col">





                <div className="mb-8">


                    <h1 className="text-xl font-bold text-white">

                        ✈ Plataforma

                    </h1>


                    <h2 className="text-lg font-bold text-blue-400">

                        de Vacaciones

                    </h2>


                    <p className="text-xs text-slate-400 mt-2">

                        Gestión interna

                    </p>


                </div>







                <nav className="space-y-2 flex-1">





                    <Link

                    to="/dashboard"

                    className={`flex items-center gap-3 p-2.5 rounded-xl transition ${activo("/dashboard")}`}

                    >

                        <Home size={20}/>

                        <span className="text-sm">
                            Dashboard
                        </span>

                    </Link>







                    <Link

                    to="/solicitar"

                    className={`flex items-center gap-3 p-2.5 rounded-xl transition ${activo("/solicitar")}`}

                    >

                        <CalendarDays size={20}/>

                        <span className="text-sm">
                            Solicitar vacaciones
                        </span>

                    </Link>







                    <Link

                    to="/historial"

                    className={`flex items-center gap-3 p-2.5 rounded-xl transition ${activo("/historial")}`}

                    >

                        <History size={20}/>

                        <span className="text-sm">
                            Historial
                        </span>

                    </Link>







                    <Link

                    to="/admin"

                    className={`flex items-center gap-3 p-2.5 rounded-xl transition ${activo("/admin")}`}

                    >

                        <ShieldCheck size={20}/>

                        <span className="text-sm">
                            Administración
                        </span>

                    </Link>





                </nav>







                <div className="border-t border-white/20 pt-4">






                    <p className="text-white font-semibold text-sm">

                        {usuario?.nombre}

                    </p>


                    <p className="text-xs text-slate-400 mb-3">

                        {usuario?.rol}

                    </p>






                    <button


                    onClick={cerrarSesion}


                    className="flex items-center gap-3 w-full p-2.5 rounded-xl text-red-300 hover:bg-red-500/20 transition"


                    >


                        <LogOut size={20}/>


                        <span className="text-sm">
                            Cerrar sesión
                        </span>


                    </button>






                </div>





            </div>



        </aside>



    )


}


export default Sidebar;

