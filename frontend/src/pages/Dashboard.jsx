import { useContext, useEffect, useState } from "react";

import {
    CalendarDays,
    BriefcaseBusiness,
    Plane,
    Clock3,
    FileCheck
} from "lucide-react";

import { AuthContext } from "../context/AuthContext";

import DashboardLayout from "../layouts/DashboardLayout";

import api from "../services/api";



function Dashboard(){


    const { usuario } = useContext(AuthContext);


    const [datosDashboard,setDatosDashboard] = useState(null);





    useEffect(()=>{


        async function cargarDashboard(){


            try{


                const respuesta = await api.get(

                    `/dashboard/${usuario.id}`

                );


                setDatosDashboard(respuesta.data);



            }catch(error){


                console.log(error);


            }


        }




        if(usuario){


            cargarDashboard();


        }


    },[usuario]);







    return(



        <DashboardLayout>



            <div className="min-h-screen text-white">





                <div className="mb-8">


                    <h1 className="text-3xl font-bold">


                        Buenos días, {datosDashboard?.usuario?.nombre} 👋


                    </h1>



                    <p className="text-slate-400 mt-2">

                        Bienvenido a tu portal de vacaciones


                    </p>


                </div>









                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">







                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-xl">


                        <div className="flex justify-between items-center">


                            <div>


                                <p className="text-slate-400">

                                    Días disponibles

                                </p>



                                <h2 className="text-3xl font-bold mt-3">


                                    {datosDashboard?.usuario?.dias}


                                </h2>


                            </div>



                            <CalendarDays

                            size={36}

                            className="text-blue-400"

                            />


                        </div>


                    </div>









                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-xl">


                        <div className="flex justify-between items-center">


                            <div>


                                <p className="text-slate-400">

                                    Cargo

                                </p>



                                <h2 className="text-lg font-bold mt-3">


                                    {datosDashboard?.usuario?.cargo}


                                </h2>


                            </div>



                            <BriefcaseBusiness

                            size={36}

                            className="text-purple-400"

                            />


                        </div>


                    </div>









                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-xl">


                        <div className="flex justify-between items-center">


                            <div>


                                <p className="text-slate-400">

                                    Solicitudes pendientes

                                </p>



                                <h2 className="text-3xl font-bold mt-3">


                                    {datosDashboard?.pendientes}


                                </h2>


                            </div>



                            <FileCheck

                            size={36}

                            className="text-green-400"

                            />


                        </div>


                    </div>









                </div>









                <div className="mt-8 bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl">





                    <div className="flex items-center gap-4">



                        <Plane

                        size={42}

                        className="text-blue-300"

                        />



                        <div>


                            <h2 className="text-2xl font-bold">

                                Próximas vacaciones

                            </h2>



                            {

                            datosDashboard?.proximaVacacion ? (


                                <div className="text-slate-300 mt-3">


                                    <p>

                                        Desde:{" "}

                                        {

                                        new Date(

                                        datosDashboard.proximaVacacion.fecha_inicio

                                        ).toLocaleDateString("es-CL")

                                        }

                                    </p>



                                    <p>

                                        Hasta:{" "}

                                        {

                                        new Date(

                                        datosDashboard.proximaVacacion.fecha_fin

                                        ).toLocaleDateString("es-CL")

                                        }

                                    </p>



                                    <p>

                                        Duración:{" "}

                                        {

                                        datosDashboard.proximaVacacion.dias

                                        }

                                        {" "}días

                                    </p>


                                </div>


                            )

                            :

                            (

                                <p className="text-slate-300 mt-3">

                                    No tienes vacaciones próximas.

                                </p>

                            )

                            }



                        </div>



                    </div>





                </div>









                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">





                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5">



                        <div className="flex items-center gap-3">



                            <Clock3

                            className="text-yellow-400"

                            />



                            <h3 className="font-bold text-xl">

                                Estado de solicitudes

                            </h3>


                        </div>




                        <p className="text-slate-400 mt-3">

                            Tienes {datosDashboard?.pendientes} solicitud(es) pendiente(s) de revisión.

                        </p>



                    </div>









                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5">



                        <h3 className="font-bold text-xl">

                            Estado del sistema

                        </h3>



                        <p className="text-green-400 mt-3">

                            ● Plataforma operativa

                        </p>



                    </div>






                </div>








            </div>





        </DashboardLayout>


    );


}



export default Dashboard;
