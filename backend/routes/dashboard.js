const express = require("express");

const router = express.Router();


const {
    obtenerDashboard
} = require("../controllers/dashboardController");



router.get("/:usuario_id", obtenerDashboard);



module.exports = router;

