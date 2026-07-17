import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import api from "../services/api";

import { Plane, Lock, Mail } from "lucide-react";


function Login(){

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);


    const [correo,setCorreo] = useState("");

    const [password,setPassword] = useState("");

    const [error,setError] = useState("");



    async function ingresar(){

        try{

            const respuesta = await api.post("/auth/login",{

                correo,

                password

            });


            login(respuesta.data.usuario);

            navigate("/dashboard");


        }catch(error){

            setError("Correo o contraseña incorrectos");

        }

    }



    function manejarEnter(e){

        if(e.key === "Enter"){

            ingresar();

        }

    }



    return(

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">


            <div className="absolute inset-0 bg-blue-500/10 blur-3xl"></div>



            <div className="relative w-full max-w-md px-4">


                <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8">



                    <div className="flex justify-center mb-5">

                        <div className="bg-blue-600/30 p-4 rounded-full">

                            <Plane
                                size={38}
                                className="text-blue-300"
                            />

                        </div>

                    </div>



                    <h1 className="text-2xl font-bold text-center text-white">

                        Plataforma de

                    </h1>


                    <h2 className="text-2xl font-bold text-center text-blue-400 mb-3">

                        Vacaciones

                    </h2>



                    <p className="text-center text-slate-300 text-sm mb-7">

                        Gestiona tus días libres de manera simple

                    </p>




                    <div className="mb-4">


                        <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4">


                            <Mail
                                size={19}
                                className="text-blue-300"
                            />



                            <input

                                type="email"

                                value={correo}

                                onChange={(e)=>setCorreo(e.target.value)}

                                onKeyDown={manejarEnter}

                                placeholder="Correo"

                                className="w-full bg-transparent p-3.5 text-white outline-none placeholder:text-slate-400"

                            />


                        </div>


                    </div>




                    <div className="mb-5">


                        <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4">


                            <Lock
                                size={19}
                                className="text-blue-300"
                            />



                            <input

                                type="password"

                                value={password}

                                onChange={(e)=>setPassword(e.target.value)}

                                onKeyDown={manejarEnter}

                                placeholder="Contraseña"

                                className="w-full bg-transparent p-3.5 text-white outline-none placeholder:text-slate-400"

                            />


                        </div>


                    </div>




                    {
                        error &&

                        <p className="text-red-400 text-center text-sm mb-4">

                            {error}

                        </p>
                    }





                    <button


                        onClick={ingresar}


                        className="w-full bg-blue-600 hover:bg-blue-500 transition text-white font-semibold py-3.5 rounded-xl shadow-lg"


                    >

                        Ingresar


                    </button>





                    <p className="text-center text-slate-500 text-xs mt-7">

                        Sistema interno de gestión

                    </p>




                </div>


            </div>


        </div>

    )

}


export default Login;

