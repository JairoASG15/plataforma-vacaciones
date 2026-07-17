const pool = require("../database/conexion");



function calcularDias(fechaInicio, fechaFin){


    const inicio = new Date(fechaInicio);

    const fin = new Date(fechaFin);



    const diferencia = fin - inicio;



    return Math.ceil(

        diferencia / (1000 * 60 * 60 * 24)

    ) + 1;


}







const crearSolicitud = async(req,res)=>{


    try{


        const {

            usuario_id,

            fecha_inicio,

            fecha_fin,

            motivo


        } = req.body;





        if(!usuario_id || !fecha_inicio || !fecha_fin || !motivo){


            return res.status(400).json({

                mensaje:"Todos los campos son obligatorios"

            });


        }







        const diasCalculados = calcularDias(

            fecha_inicio,

            fecha_fin

        );








        if(diasCalculados <= 0){


            return res.status(400).json({

                mensaje:"La fecha de término debe ser mayor o igual a la fecha de inicio"

            });


        }








        const usuario = await pool.query(


            `
            SELECT dias

            FROM usuarios

            WHERE id=$1

            `,


            [

                usuario_id

            ]


        );








        if(usuario.rows.length===0){


            return res.status(404).json({

                mensaje:"Usuario no encontrado"

            });


        }








        if(usuario.rows[0].dias < diasCalculados){


            return res.status(400).json({

                mensaje:"No tienes suficientes días disponibles"

            });


        }








        // VALIDAR SOLICITUDES DUPLICADAS O CRUZADAS


        const existente = await pool.query(


            `
            SELECT *

            FROM solicitudes


            WHERE usuario_id=$1


            AND estado IN ('Pendiente','Aprobado')


            AND (

                fecha_inicio <= $3

                AND fecha_fin >= $2

            )

            `,


            [

                usuario_id,

                fecha_inicio,

                fecha_fin

            ]


        );








        if(existente.rows.length > 0){


            return res.status(400).json({

                mensaje:"Ya existe una solicitud para ese período"

            });


        }








        const resultado = await pool.query(


            `
            INSERT INTO solicitudes

            (

                usuario_id,

                fecha_inicio,

                fecha_fin,

                dias,

                motivo

            )


            VALUES($1,$2,$3,$4,$5)


            RETURNING *

            `,


            [

                usuario_id,

                fecha_inicio,

                fecha_fin,

                diasCalculados,

                motivo

            ]


        );






        res.json(resultado.rows[0]);





    }catch(error){



        console.log(error);



        res.status(500).json({

            mensaje:"Error creando solicitud"

        });


    }


};









const obtenerSolicitudes = async(req,res)=>{


    try{


        const { usuario_id } = req.params;



        const resultado = await pool.query(


            `
            SELECT *

            FROM solicitudes

            WHERE usuario_id=$1

            ORDER BY id DESC

            `,


            [

                usuario_id

            ]


        );



        res.json(resultado.rows);




    }catch(error){



        console.log(error);



        res.status(500).json({

            mensaje:"Error obteniendo solicitudes"

        });


    }


};









const obtenerTodasLasSolicitudes = async(req,res)=>{


    try{


        const resultado = await pool.query(


            `
            SELECT

                solicitudes.id,

                usuarios.nombre,

                solicitudes.fecha_inicio,

                solicitudes.fecha_fin,

                solicitudes.dias,

                solicitudes.motivo,

                solicitudes.estado


            FROM solicitudes


            INNER JOIN usuarios


            ON usuarios.id = solicitudes.usuario_id


            ORDER BY solicitudes.id DESC

            `


        );



        res.json(resultado.rows);




    }catch(error){



        console.log(error);



        res.status(500).json({

            mensaje:"Error obteniendo todas las solicitudes"

        });


    }


};









const aprobarSolicitud = async(req,res)=>{


    const conexion = await pool.connect();



    try{


        const { id } = req.params;



        await conexion.query("BEGIN");






        const solicitud = await conexion.query(


            `
            SELECT *

            FROM solicitudes

            WHERE id=$1

            `,


            [

                id

            ]


        );






        if(solicitud.rows.length===0){


            await conexion.query("ROLLBACK");


            return res.status(404).json({

                mensaje:"Solicitud no encontrada"

            });


        }








        const datosSolicitud = solicitud.rows[0];






        if(datosSolicitud.estado !== "Pendiente"){


            await conexion.query("ROLLBACK");


            return res.status(400).json({

                mensaje:"La solicitud ya fue procesada"

            });


        }








        const usuario = await conexion.query(


            `
            SELECT dias

            FROM usuarios

            WHERE id=$1

            `,


            [

                datosSolicitud.usuario_id

            ]


        );








        if(usuario.rows[0].dias < datosSolicitud.dias){


            await conexion.query("ROLLBACK");


            return res.status(400).json({

                mensaje:"No tiene suficientes días disponibles"

            });


        }








        const actualizacion = await conexion.query(


            `
            UPDATE solicitudes

            SET estado='Aprobado'

            WHERE id=$1

            RETURNING *

            `,


            [

                id

            ]


        );








        await conexion.query(


            `
            UPDATE usuarios

            SET dias=dias-$1

            WHERE id=$2

            `,


            [

                datosSolicitud.dias,

                datosSolicitud.usuario_id

            ]


        );








        await conexion.query("COMMIT");



        res.json(actualizacion.rows[0]);




    }catch(error){



        await conexion.query("ROLLBACK");



        console.log(error);



        res.status(500).json({

            mensaje:"Error aprobando solicitud"

        });



    }finally{


        conexion.release();


    }


};









const rechazarSolicitud = async(req,res)=>{


    try{


        const { id } = req.params;




        const resultado = await pool.query(


            `
            UPDATE solicitudes

            SET estado='Rechazado'

            WHERE id=$1

            RETURNING *

            `,


            [

                id

            ]


        );






        if(resultado.rows.length===0){


            return res.status(404).json({

                mensaje:"Solicitud no encontrada"

            });


        }





        res.json(resultado.rows[0]);




    }catch(error){



        console.log(error);



        res.status(500).json({

            mensaje:"Error rechazando solicitud"

        });



    }


};







module.exports = {


    crearSolicitud,

    obtenerSolicitudes,

    obtenerTodasLasSolicitudes,

    aprobarSolicitud,

    rechazarSolicitud


};

