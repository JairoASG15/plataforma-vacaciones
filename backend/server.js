const express = require("express");

const cors = require("cors");

require("dotenv").config();



const app = express();





app.use(cors());

app.use(express.json());






const authRoutes = require("./routes/authRoutes");

const solicitudesRoutes = require("./routes/solicitudes");

const dashboardRoutes = require("./routes/dashboard");






app.use("/api/auth", authRoutes);

app.use("/api/solicitudes", solicitudesRoutes);

app.use("/api/dashboard", dashboardRoutes);




app.get("/", (req,res)=>{


    res.json({

        mensaje:"API de vacaciones funcionando correctamente"

    });


});








const PORT = process.env.PORT || 3000;




app.listen(PORT,()=>{


console.log(
`Servidor iniciado en puerto ${PORT}`
);


});
