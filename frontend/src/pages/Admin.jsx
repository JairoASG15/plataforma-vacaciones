import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import api from "../services/api";

import {
    Check,
    X,
    CalendarDays,
    Clock,
    User
} from "lucide-react";



function Admin(){


    const [solicitudes,setSolicitudes] = useState([]);

    const [mensaje,setMensaje] = useState("");





    useEffect(()=>{

        obtenerSolicitudes();

    },[]);






    async function obtenerSolicitudes(){


        try{


            const respuesta = await api.get("/solicitudes/todas");


            setSolicitudes(respuesta.data);



        }catch(error){


            console.log(error);


        }


    }








    async function aprobar(id){



        const confirmar = window.confirm(
            "¿Seguro deseas aprobar esta solicitud?"
        );



        if(!confirmar){

            return;

        }




        try{


            await api.put(`/solicitudes/${id}/aprobar`);




            setMensaje(
                "Solicitud aprobada correctamente ✅"
            );



            obtenerSolicitudes();



            limpiarMensaje();




        }catch(error){


            console.log(error);


            setMensaje(
                "Error aprobando solicitud ❌"
            );


        }



    }









    async function rechazar(id){



        const confirmar = window.confirm(
            "¿Seguro deseas rechazar esta solicitud?"
        );



        if(!confirmar){

            return;

        }





        try{


            await api.put(`/solicitudes/${id}/rechazar`);




            setMensaje(
                "Solicitud rechazada correctamente ❌"
            );



            obtenerSolicitudes();



            limpiarMensaje();





        }catch(error){


            console.log(error);



            setMensaje(
                "Error rechazando solicitud ❌"
            );


        }



    }









    function limpiarMensaje(){


        setTimeout(()=>{


            setMensaje("");



        },3000);


    }









    function estiloEstado(estado){



        if(estado==="Aprobado"){


            return "bg-green-500/20 text-green-300 border-green-500/30";


        }



        if(estado==="Rechazado"){


            return "bg-red-500/20 text-red-300 border-red-500/30";


        }



        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";


    }









    return(


        <DashboardLayout>





            <div className="text-white">







                <div className="mb-8">



                    <h1 className="text-4xl font-bold">

                        Administración 👋

                    </h1>



                    <p className="text-slate-400 mt-2 text-lg">

                        Revisa y gestiona las solicitudes de vacaciones

                    </p>



                </div>









                {
                    mensaje &&


                    <div className="bg-blue-500/20 border border-blue-400/30 text-blue-200 p-4 rounded-2xl mb-6">


                        {mensaje}


                    </div>


                }









                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">







                {


                solicitudes.length === 0 ?



                (


                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center">


                        No existen solicitudes


                    </div>


                )



                :







                solicitudes.map((sol)=>(





                    <div

                    key={sol.id}

                    className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition"

                    >







                        <div className="flex justify-between items-start mb-5">







                            <div className="flex items-center gap-3">



                                <div className="bg-blue-500/20 p-3 rounded-full">



                                    <User

                                    className="text-blue-300"

                                    />



                                </div>







                                <div>


                                    <h2 className="font-bold text-xl">

                                        {sol.nombre}

                                    </h2>



                                    <p className="text-slate-400">

                                        Solicitud #{sol.id}

                                    </p>



                                </div>



                            </div>









                            <span

                            className={`px-4 py-2 rounded-full border text-sm ${estiloEstado(sol.estado)}`}

                            >



                                {sol.estado}



                            </span>





                        </div>












                        <div className="space-y-3 text-slate-300">





                            <p>

                                📌 <b>Motivo:</b> {sol.motivo}

                            </p>







                            <p className="flex items-center gap-2">


                                <CalendarDays size={18}/>



                                {new Date(sol.fecha_inicio).toLocaleDateString("es-CL")}



                                -




                                {new Date(sol.fecha_fin).toLocaleDateString("es-CL")}



                            </p>








                            <p className="flex items-center gap-2">


                                <Clock size={18}/>



                                {sol.dias} días



                            </p>







                        </div>












                        {


                        sol.estado === "Pendiente"



                        ?



                        (


                            <div className="flex gap-3 mt-6">







                                <button


                                onClick={()=>aprobar(sol.id)}



                                className="flex-1 bg-green-600 hover:bg-green-500 transition p-3 rounded-xl flex justify-center items-center gap-2"



                                >



                                    <Check size={20}/>


                                    Aprobar



                                </button>









                                <button


                                onClick={()=>rechazar(sol.id)}



                                className="flex-1 bg-red-600 hover:bg-red-500 transition p-3 rounded-xl flex justify-center items-center gap-2"



                                >



                                    <X size={20}/>



                                    Rechazar



                                </button>







                            </div>


                        )



                        :



                        (


                            <div className="mt-6 text-center text-slate-400">


                                Solicitud procesada ✓



                            </div>


                        )



                        }









                    </div>







                ))



                }








                </div>








            </div>





        </DashboardLayout>



    )


}



export default Admin;

