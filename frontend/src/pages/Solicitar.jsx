import { useState, useContext } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import api from "../services/api";

import { AuthContext } from "../context/AuthContext";

import {
    CalendarDays,
    Send,
    FileText
} from "lucide-react";



function Solicitar(){


    const { usuario } = useContext(AuthContext);



    const [fechaInicio,setFechaInicio] = useState("");

    const [fechaFin,setFechaFin] = useState("");

    const [motivo,setMotivo] = useState("");

    const [mensaje,setMensaje] = useState("");





    function calcularDias(){


        if(!fechaInicio || !fechaFin){

            return 0;

        }



        const inicio = new Date(fechaInicio);

        const fin = new Date(fechaFin);



        const diferencia = fin - inicio;



        return Math.ceil(

            diferencia / (1000 * 60 * 60 * 24)

        ) + 1;


    }







    async function enviarSolicitud(){


        try{


            const dias = calcularDias();



            await api.post("/solicitudes",{


                usuario_id: usuario.id,


                fecha_inicio: fechaInicio,


                fecha_fin: fechaFin,


                dias:dias,


                motivo:motivo



            });




            setMensaje(
                "Solicitud enviada correctamente ✅"
            );


            setFechaInicio("");

            setFechaFin("");

            setMotivo("");



        }catch(error){


            console.log(
                error.response?.data || error
            );



            setMensaje(

                error.response?.data?.mensaje ||

                "Error enviando solicitud"

            );


        }


    }







    return(



        <DashboardLayout>




            <div className="text-white max-w-3xl mx-auto">





                <div className="mb-6">


                    <h1 className="text-3xl font-bold">

                        Solicitar vacaciones

                    </h1>


                    <p className="text-slate-400 mt-2">

                        Envía una nueva solicitud de días libres.

                    </p>


                </div>







                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">







                    <div className="flex items-center gap-3 mb-6">


                        <div className="bg-blue-600/30 p-3 rounded-xl">

                            <CalendarDays
                                size={24}
                                className="text-blue-300"
                            />

                        </div>


                        <div>


                            <h2 className="font-bold text-lg">

                                Nueva solicitud

                            </h2>


                            <p className="text-sm text-slate-400">

                                Usuario: {usuario?.nombre}

                            </p>


                        </div>


                    </div>








                    <div className="grid md:grid-cols-2 gap-5">



                        <div>


                            <label className="text-sm text-slate-300">

                                Fecha inicio

                            </label>


                            <input


                            type="date"


                            className="mt-2 w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white outline-none"


                            value={fechaInicio}


                            onChange={(e)=>setFechaInicio(e.target.value)}


                            />


                        </div>







                        <div>


                            <label className="text-sm text-slate-300">

                                Fecha término

                            </label>


                            <input


                            type="date"


                            className="mt-2 w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white outline-none"


                            value={fechaFin}


                            onChange={(e)=>setFechaFin(e.target.value)}


                            />


                        </div>




                    </div>








                    <div className="mt-5 bg-blue-600/20 border border-blue-400/20 rounded-xl p-4">


                        <p className="text-sm text-slate-300">

                            Días solicitados

                        </p>


                        <p className="text-3xl font-bold">

                            {calcularDias()}

                        </p>


                    </div>








                    <div className="mt-5">


                        <label className="text-sm text-slate-300">

                            Motivo

                        </label>


                        <textarea


                        className="mt-2 w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white outline-none resize-none"


                        rows="4"


                        placeholder="Describe el motivo de la solicitud"


                        value={motivo}


                        onChange={(e)=>setMotivo(e.target.value)}


                        />



                    </div>









                    <button


                    onClick={enviarSolicitud}


                    className="mt-6 flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 transition text-white font-semibold p-3 rounded-xl shadow-lg"


                    >


                        <Send size={18}/>

                        Enviar solicitud


                    </button>









                    {

                    mensaje &&


                    <div className="mt-5 flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl p-4">


                        <FileText
                            size={20}
                            className="text-blue-300"
                        />


                        <p>

                            {mensaje}

                        </p>


                    </div>


                    }





                </div>





            </div>





        </DashboardLayout>



    )


}


export default Solicitar;

