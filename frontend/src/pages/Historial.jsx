import { useEffect, useState, useContext } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import { AuthContext } from "../context/AuthContext";

import api from "../services/api";

console.log("ENTRANDO A HISTORIAL");

import {
    History,
    CalendarDays,
    Clock,
    FileText
} from "lucide-react";



function Historial() {


    const { usuario } = useContext(AuthContext);


    const [solicitudes, setSolicitudes] = useState([]);





    useEffect(() => {


        if(usuario) {

            obtenerSolicitudes();

        }


    }, [usuario]);







    async function obtenerSolicitudes() {


        try {


            const respuesta = await api.get(
                `/solicitudes/${usuario.id}`
            );


            setSolicitudes(respuesta.data);



        } catch(error) {


            console.log(error);


        }


    }









    function colorEstado(estado) {


        const estadoTexto = estado?.toLowerCase();



        if(estadoTexto === "aprobado") {


            return "bg-green-500/20 text-green-300 border-green-400/20";


        }



        if(estadoTexto === "rechazado") {


            return "bg-red-500/20 text-red-300 border-red-400/20";


        }



        return "bg-yellow-500/20 text-yellow-300 border-yellow-400/20";


    }







    return(


        <DashboardLayout>


            <div className="text-white">





                <div className="mb-6">


                    <div className="flex items-center gap-3">


                        <div className="bg-blue-600/30 p-3 rounded-xl">


                            <History
                                size={25}
                                className="text-blue-300"
                            />


                        </div>



                        <div>


                            <h1 className="text-3xl font-bold">

                                Historial de solicitudes

                            </h1>


                            <p className="text-slate-400 mt-1">

                                Revisa el estado de tus vacaciones solicitadas.

                            </p>


                        </div>


                    </div>


                </div>









                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden">





                    {

                    solicitudes.length === 0 ?



                    (

                        <div className="p-10 text-center">


                            <FileText

                            size={45}

                            className="mx-auto text-slate-500 mb-4"

                            />


                            <h2 className="text-lg font-semibold">

                                No hay solicitudes registradas

                            </h2>


                            <p className="text-slate-400 mt-2">

                                Cuando solicites vacaciones aparecerán aquí.

                            </p>


                        </div>

                    )



                    :



                    (


                    <div className="overflow-x-auto">


                        <table className="w-full">



                            <thead className="bg-white/5">


                                <tr>


                                    <th className="p-4 text-left text-sm text-slate-400">

                                        Motivo

                                    </th>


                                    <th className="p-4 text-left text-sm text-slate-400">

                                        Inicio

                                    </th>


                                    <th className="p-4 text-left text-sm text-slate-400">

                                        Término

                                    </th>


                                    <th className="p-4 text-left text-sm text-slate-400">

                                        Días

                                    </th>


                                    <th className="p-4 text-left text-sm text-slate-400">

                                        Estado

                                    </th>


                                </tr>


                            </thead>







                            <tbody>



                            {

                            solicitudes.map((solicitud)=>(



                                <tr

                                key={solicitud.id}

                                className="border-t border-white/10 hover:bg-white/5 transition"

                                >





                                    <td className="p-4">


                                        <div className="flex items-center gap-2">


                                            <FileText

                                            size={18}

                                            className="text-blue-300"

                                            />


                                            {solicitud.motivo}


                                        </div>


                                    </td>








                                    <td className="p-4 text-slate-300">


                                        <div className="flex items-center gap-2">


                                            <CalendarDays size={16}/>


                                            {new Date(
                                                solicitud.fecha_inicio
                                            ).toLocaleDateString("es-CL")}


                                        </div>


                                    </td>








                                    <td className="p-4 text-slate-300">


                                        {new Date(
                                            solicitud.fecha_fin
                                        ).toLocaleDateString("es-CL")}


                                    </td>








                                    <td className="p-4 font-semibold">


                                        {solicitud.dias}


                                    </td>








                                    <td className="p-4">


                                        <span

                                        className={`px-3 py-1 rounded-full border text-xs font-semibold ${colorEstado(solicitud.estado)}`}

                                        >


                                            {solicitud.estado}


                                        </span>


                                    </td>







                                </tr>



                            ))



                            }



                            </tbody>



                        </table>


                    </div>


                    )


                    }





                </div>





            </div>


        </DashboardLayout>


    )


}


export default Historial;

