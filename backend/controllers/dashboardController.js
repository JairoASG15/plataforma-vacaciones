const pool = require("../database/conexion");



const obtenerDashboard = async(req,res)=>{


    try{


        const { usuario_id } = req.params;




        const usuario = await pool.query(


            `
            SELECT 

                nombre,

                cargo,

                rol,

                dias

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







        const pendientes = await pool.query(


            `
            SELECT COUNT(*)

            FROM solicitudes

            WHERE usuario_id=$1

            AND estado='Pendiente'

            `,


            [

                usuario_id

            ]


        );







        const proxima = await pool.query(


            `
            SELECT

                fecha_inicio,

                fecha_fin,

                dias


            FROM solicitudes


            WHERE usuario_id=$1


            AND estado='Aprobado'


            AND fecha_inicio >= CURRENT_DATE


            ORDER BY fecha_inicio ASC


            LIMIT 1

            `,


            [

                usuario_id

            ]


        );








        res.json({


            usuario: usuario.rows[0],


            pendientes: Number(

                pendientes.rows[0].count

            ),


            proximaVacacion:

                proxima.rows[0] || null



        });






    }catch(error){



        console.log(error);



        res.status(500).json({

            mensaje:"Error obteniendo dashboard"

        });


    }


};





module.exports = {


    obtenerDashboard


};
