const db = require("./database/conexion");



db.query(
"SELECT NOW()",
(error,result)=>{


if(error){

console.log(error);

}else{


console.log(
"Base de datos conectada:",
result.rows
);


}


}
);

