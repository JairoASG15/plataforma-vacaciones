const express = require("express");

const router = express.Router();


const {

    crearSolicitud,
    obtenerSolicitudes,
    obtenerTodasLasSolicitudes,
    aprobarSolicitud,
    rechazarSolicitud

} = require("../controllers/solicitudesController");




// Crear solicitud

router.post("/", crearSolicitud);




// Obtener todas las solicitudes

router.get("/todas", obtenerTodasLasSolicitudes);




// Aprobar solicitud

router.put("/:id/aprobar", aprobarSolicitud);




// Rechazar solicitud

router.put("/:id/rechazar", rechazarSolicitud);




// Obtener solicitudes de un usuario

router.get("/:usuario_id", obtenerSolicitudes);



module.exports = router;

