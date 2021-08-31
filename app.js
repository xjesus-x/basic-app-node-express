var express = require("express");
var app = express();

const pug = require("pug");

//Puerto para despliegue
const puerto = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

var aviones_array = [
	{modelo:"Turboprop",texto:"Avión con características de jet", imagen:"turboprop.jpg"},
	{modelo:"Boeing 747",texto:"El avión más grande del mundo", imagen:"boeing747.jpg"},
	{modelo:"Biplano 75",texto:"Avión antiguo", imagen:"biplano75.jpg"},
	{modelo:"Lockheed",texto:"Avión moderno con última tecnología", imagen:"lockheed.jpg"}
]

app.get("/", (req,res)=>{
	//res.send("index.html");
	res.render("index.pug",{
		titulo: "Aviones del mundo",
		texto: "Selecciona un avión",
		imagen: "aviones.jpg",
		aviones: aviones_array
	})
});

app.get("/avion/:modelo", (req,res)=>{

	var datosAvion = aviones_array.filter((avion)=>{
		if (req.params.modelo == avion.modelo){
			return avion;
		}
	})[0];
	//El 0 es para que devuelva un objeto en lugar de un arreglo

	res.render("avion.pug",{
		modelo: req.params.modelo,
		data: datosAvion
	})
});

//Manejo de url que no existen
app.use((req,res) => {

	//capturar todas con estatus 400
	res.status(400);

	let error = req.originalUrl;

	//se manda la url del error como texto
	res.render("404.pug", {texto:error});
});

app.listen(puerto,()=>{
	console.log("Servidor encendido en puerto ", puerto);
});