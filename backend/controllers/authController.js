const db = require("../database/conexion");

const login = async (req, res) => {

    const { correo, password } = req.body;

    try {

        const resultado = await db.query(

            "SELECT * FROM usuarios WHERE correo=$1 AND password=$2",

            [correo, password]

        );

        if (resultado.rows.length === 0) {

            return res.status(401).json({

                mensaje: "Correo o contraseña incorrectos"

            });

        }

        const usuario = resultado.rows[0];

        res.json({

            usuario

        });

    } catch (error) {

        res.status(500).json({

            error: "Error del servidor"

        });

    }

};

module.exports = {

    login

};
