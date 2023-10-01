const express = require('express')
var bodyParser = require('body-parser')
const { response } = require("express");
const app = express();
const puerto = process.env.PORT || 3000;

//Arreglo de objetos tipo proyecto
//ID (clave primaria), Nombre del Proyecto, Descripción, Fecha de Inicio, Fecha de Finalización

let proyectos = [
	{id: 1,   nombre: "EcoVida", descripcion: "Es un proyecto de investigación y desarrollo de tecnologías sostenibles para reducir la huella de carbono en la industria alimentaria.", fecha_inicio: "21/05/23", fecha_fin: "30/08/23" },
    {id: "2", nombre: "Operación Orquídea Azul",descripcion: "Es un proyecto de conservación marina", fecha_inicio: "10/07/2020", fecha_fin:"15/12/2024"},
    {id: "3", nombre:"Proyecto Aurora Virtual", descripcion: "Es una iniciativa de realidad virtual que busca llevar la belleza de las auroras boreales a cualquier lugar del mundo.", fecha_inicio: "05/01/2023", fecha_fin:"20/06/2026"},
    {id: "4", nombre:"Innovacion Sonora",descripcion: "Se enfoca en la creación de tecnología de sonido de próxima generación", fecha_inicio: "01/11/2021", fecha_fin:"31/08/2024"},
    {id: "5", nombre:"Nómada Verde",descripcion: "Es una iniciativa de investigación en energía renovable que busca proporcionar soluciones de energía sostenible para comunidades rurales y nómadas en todo el mundo. ", fecha_inicio: "20/04/2022", fecha_fin:"25/03/2026"},
    {id: "6", nombre:"Misión Ícaro",descripcion: "Es un proyecto espacial que tiene como objetivo enviar una nave no tripulada a explorar un asteroide cercano a la Tierra. ", fecha_inicio: "08/09/2023", fecha_fin:"12/12/2027"},
    {id: "7", nombre:"Ciudad Inteligente EcoViva",descripcion: "Es una ciudad inteligente en desarrollo que se centra en la sostenibilidad y la calidad de vida de sus habitantes", fecha_inicio: "03/05/2024", fecha_fin:"20/08/28"},
    {id: "8", nombre:"Proyecto Genoma Dorado",descripcion: "Es una iniciativa de investigación genética que busca desarrollar cultivos genéticamente modificados resistentes a enfermedades", fecha_inicio: "12/06/2020", fecha_fin:"15/11/2023"},
    {id: "9", nombre:"Iniciativa Educativa TechTalent",descripcion: "Es un programa educativo que brinda oportunidades de formación en tecnología", fecha_inicio: "01/08/2021", fecha_fin:"30/06/2025"},
    {id: "10", nombre:"Proyecto Viaje en el Tiempo",descripcion: "Tiene como objetivo teórico desarrollar una máquina del tiempo.", fecha_inicio: "01/04/2050", fecha_fin:"14/06/2058"}]

//Arreglo de objetos tipo tareas
//Campos: ID (clave primaria), ID del Proyecto (clave foránea), Nombre de la Tarea, Descripción, Fecha de Asignación, Estado
//Estado (No iniciada, En Progreso, Completada)
let tareas = [
{id:"1", id_proyecto:"1",nombre_tarea:"Investigar tecnologías de agricultura sostenible",descripcion:"Hacer investigacion",fecha_asignacion:"25/07/23",estado: "En progreso",},
{id:"2", id_proyecto:"2",nombre_tarea:"Monitorear la salud del arrecife de coral.",descripcion:"Monitoriar el arrecife",fecha_asignacion:"15/09/24",estado: "No iniciada",},
{id:"3", id_proyecto:"3",nombre_tarea:"Crear contenido de realidad virtual de alta calidad de auroras boreales",descripcion:"Crear contenido",fecha_asignacion:"10/04/23",estado: "Completada",},
{id:"4", id_proyecto:"4",nombre_tarea:"Investigar tecnologías de vanguardia en audio",descripcion:"Hacer investigacion",fecha_asignacion:"20/03/23",estado: "En progreso",},
{id:"5", id_proyecto:"5",nombre_tarea:"Desarrollar tecnología de energía solar portátil",descripcion:"Desarrollar",fecha_asignacion:"26/02/23",estado: "No iniciada",},
{id:"6", id_proyecto:"6",nombre_tarea:"Diseñar y construir una nave espacial no tripulada",descripcion:"Diseñar y construir",fecha_asignacion:"06/09/23",estado: "Completada",},
{id:"7", id_proyecto:"7",nombre_tarea:"Desarrollar una red de transporte público eficiente",descripcion:"Desarrollar",fecha_asignacion:"07/11/23",estado: "En progreso",},
{id:"8", id_proyecto:"8",nombre_tarea:"Secuenciar y analizar el genoma de cultivos importantes",descripcion:"Analizar",fecha_asignacion:"08/04/23",estado: "No iniciada",},
{id:"9", id_proyecto:"9",nombre_tarea:"Ofrecer cursos en línea y talleres presenciales",descripcion:"Hacer promocion",fecha_asignacion:"07/07/23",estado: "Completada",},
{id:"10", id_proyecto:"10",nombre_tarea:"Diseñar modelos matemáticos y experimentos teóricos",descripcion:"Diseñar",fecha_asignacion:"04/10/2051",estado: "En progreso",}

]    


// CONSULTAS PROYECTOS

app.get('/socios/v1/proyectos', (req, res) => {
	//Obtener todos los proyectos
	if (proyectos.length === 0) {
		return res.status(404).json({
			estado: 0,
			mensaje: 'No hay proyectos',
			proyectos: proyectos
		})
	} else {
		return res.json({
			proyectos: proyectos,
			estado: 1,
			mensaje: 'Proyectos obtenidos con exito'
		})
	}

})

app.get('/socios/v1/proyectos/:id', (req, res) => {
	const id = req.params.id;
	
	const proyecto = proyectos.find(proyecto => proyecto.id == id);
	if (proyecto) { // si se encontro un proyecto
		res.status(200).json({
			estado: 1,
			mensaje: "Proyecto encontrado",
			proyecto: proyecto,
		});
	} else { // si no se encuentra
		res.status(404).json({
			estado: 0,
			mensaje: "Proyecto no encontrado",
		});
	}
});

const jsonParser = bodyParser.json(); //middleware

app.use(jsonParser); //Utilizar middleware
app.post('/socios/v1/proyectos', jsonParser, (req, res) => {
	// crear un recurso 
	//requiere: id (generado por el server),
	//nombre y descripcion (introducidas x el user y se obtienen del body)
    //ID (clave primaria), Nombre del Proyecto, Descripción, Fecha de Inicio, Fecha de Finalización
	const { nombre, descripcion,fecha_inicio,fecha_fin } = req.body; //Destructuring de objetos
	const id = Math.round(Math.random() * 1000); // generar el ID

	if (nombre == undefined || descripcion == undefined || fecha_inicio == undefined || fecha_fin == undefined ) {
		res.status(400).json({
			estado: 0,
			mensaje: "Faltan parametros en la solicitud",
		});
	} else {

		const proyecto = { id: id, nombre: nombre, descripcion: descripcion, fecha_fin: fecha_fin, fecha_inicio: fecha_inicio };
		const longitudInicial = proyectos.length;
		proyectos.push(proyecto);

		// verificar la longitud del array de categos para ver si se agrego una nueva
		if (proyectos.length > longitudInicial) {
			res.status(201).json({
				estado: 1,
				mensaje: "Proyecto creado",
				proyecto: proyecto,
			});
		} else {
			res.status(500).json({
				estado: 0,
				mensaje: "Ocurrio un error desconocido"
			});
		}
	}

})

app.put('/socios/v1/proyectos/:id', (req, res) => {
	// Actualizar 

	// ID viene en los parámetros
	// Nombre y descripción vienen en el cuerpo (body)

	const { id } = req.params;
	const { nombre, descripcion, fecha_inicio, fecha_fin } = req.body;

	if (nombre === undefined || descripcion === undefined || fecha_inicio == undefined || fecha_fin == undefined) {
		// No se enviaron el nombre o la descripción
		res.status(400).json({
			estado: 0,
			mensaje: "Bad Request (faltan parámetros)"
		});
	} else {
		const posActualizar = proyectos.findIndex(proyecto => proyecto.id == id);

		if (posActualizar !== -1) {
			// Si se encontró el ID
			// Actualizar el nombre y la descripción 
			proyectos[posActualizar].nombre = nombre;
			proyectos[posActualizar].descripcion = descripcion;
            proyectos[posActualizar].fecha_inicio = fecha_inicio;
            proyectos[posActualizar].fecha_fin = fecha_fin;
			res.status(200).json({
				estado: 1,
				mensaje: "Proyecto actualizado",
				proyecto: proyectos[posActualizar], // Devolver la tarea actualizada
			});
		} else {
			res.status(404).json({
				estado: 0,
				mensaje: "ID no encontrado"
			});
		}
	}
});

app.delete('/socios/v1/proyectos/:id', (req, res) => {
	// Eliminar 
	const { id } = req.params;
	const indiceEliminar = proyectos.findIndex(proyecto => proyecto.id == id);
  
	if (indiceEliminar !== -1) {
	  // Se borra 
	  proyectos.splice(indiceEliminar, 1);
	  res.status(200).json({
		estado: 1,
		mensaje: "Proyecto borrado correctamente"
	  });
	} else {
	  // No se encuentra la categoría
	  res.status(404).json({
		estado: 0,
		mensaje: "Proyecto no encontrado"
	  });
	}
  });



//CONSULTAS TAREAS
//ID (clave primaria), ID del Proyecto (clave foránea), Nombre de la Tarea, Descripción, Fecha de Asignación, Estado

app.get('/socios/v1/tareas', (req, res) => {
	//Obtener 
	if (tareas.length === 0) {
		return res.status(404).json({
			estado: 0,
			mensaje: 'No hay tareas',
			tareas: tareas
		})
	} else {
		return res.json({
			tareas: tareas,
			estado: 1,
			mensaje: 'Tareas obtenidas con exito'
		})
	}

})

app.get('/socios/v1/tareas/:id', (req, res) => {
	const id = req.params.id;
	// comparar  cual coincide con el ID
	const tarea = tareas.find(tarea => tarea.id == id);
	if (tarea) { // si se encontro 
		res.status(200).json({
			estado: 1,
			mensaje: "Tarea encontrada",
			tarea: tarea,
		});
	} else { // si no se encuentra
		res.status(404).json({
			estado: 0,
			mensaje: "Tareaa no encontrada",
		});
	}
});

app.use(jsonParser); //Utilizar middleware
app.post('/socios/v1/tareas', jsonParser, (req, res) => {
	// crear un recurso 
	//requiere: id (generado por el server),
	//nombre y descripcion (introducidas x el user y se obtienen del body)
//Campos: ID (clave primaria), ID del Proyecto (clave foránea), Nombre de la Tarea, Descripción, Fecha de Asignación, Estado (No iniciada, En Progreso, Completada)
	const { nombre_tarea, descripcion,id_proyecto, fecha_asignacion,estado } = req.body; //Destructuring de objetos
	const id = Math.round(Math.random() * 1000); // generar el ID

	if (nombre_tarea == undefined || descripcion == undefined || id_proyecto == undefined || fecha_asignacion == undefined || estado == undefined) {
		res.status(400).json({
			estado: 0,
			mensaje: "Faltan parametros en la solicitud",
		});
	} else {

		const tarea = { id: id, nombre_tarea: nombre_tarea, descripcion: descripcion, id_proyecto: id_proyecto, fecha_asignacion: fecha_asignacion, estado: estado };
		const longitudInicial = tareas.length;
		tareas.push(tarea);

		// verificar la longitud del array  para ver si se agrego una nueva
		if (tareas.length > longitudInicial) {
			res.status(201).json({
				estado: 1,
				mensaje: "Tarea creada",
				tarea: tarea,
			});
		} else {
			res.status(500).json({
				estado: 0,
				mensaje: "Ocurrio un error desconocido"
			});
		}
	}

})

app.put('/socios/v1/tareas/:id', (req, res) => {
	// Actualizar una tarea

	// ID viene en los parámetros
	// Nombre y descripción vienen en el cuerpo (body)

	const { id } = req.params;
	const { nombre_tarea, descripcion,id_proyecto,fecha_asignacion, estado } = req.body;

	if (nombre_tarea === undefined || descripcion === undefined || id_proyecto == undefined || fecha_asignacion == undefined || estado == undefined) {
		// No se enviaron el nombre o la descripción
		res.status(400).json({
			estado: 0,
			mensaje: "Bad Request (faltan parámetros)"
		});
	} else {
		const posActualizar = tareas.findIndex(tarea => tarea.id == id);

		if (posActualizar !== -1) {
			// Si se encontró el ID
			// Actualizar 
			tareas[posActualizar].nombre_tarea = nombre_tarea;
			tareas[posActualizar].descripcion = descripcion;
			tareas[posActualizar].id_proyecto = id_proyecto;
			tareas[posActualizar].fecha_asignacion = fecha_asignacion;
			tareas[posActualizar].estado = estado;


			res.status(200).json({
				estado: 1,
				mensaje: "Tarea actualizada",
				tarea: tareas[posActualizar], // Devolver la tarea actualizada
			});
		} else {
			res.status(404).json({
				estado: 0,
				mensaje: "ID no encontrado"
			});
		}
	}
});

app.delete('/socios/v1/tareas/:id', (req, res) => {
	// Eliminar 
	const { id } = req.params;
	const indiceEliminar = tareas.findIndex(tarea => tarea.id == id);
  
	if (indiceEliminar !== -1) {
	  // Se borra 
	  tareas.splice(indiceEliminar, 1);
	  res.status(200).json({
		estado: 1,
		mensaje: "Tarea borrada correctamente"
	  });
	} else {
	  // No se encuentra la tarea
	  res.status(404).json({
		estado: 0,
		mensaje: "Tarea no encontrada"
	  });
	}
  });

//mostrar todas las tareas de un proyecto
app.get('/proyectos/:id/tareas', (req, res) => {
    let id = req.params.id
    let tareasProyecto = tareas.filter((tarea) => tarea.id_proyecto == id);
 //   console.log(tareasProyecto);
    res.json(tareasProyecto);
} );

//mostrar una tarea de un proyecto
app.get('/proyectos/:id/tareas/:idProyecto', (req, res) => {
    let id = req.params.id
    let id_proyecto = req.params.id_proyecto
    let tareasProyecto = tareas.filter((tarea) => tarea.id_proyecto == id_proyecto && tarea.id == id);
    //console.log(tareasProyecto);
    res.json(tareasProyecto);
} );

//mostrar todas las tareas de un proyecto con un status
app.get('/proyectos/:id/tareas', (req, res) => {
    let id = req.params.id
    let estado = req.query.status
    let tareasProyecto = tareas.filter((tarea) => tarea.id_proyecto === id && tarea.estado === estado);
    console.log(tareasProyecto);
    res.json(tareasProyecto);

} );

//mostrar todas las tareas de un proyecto paginadas
app.get('/proyectos/:id/tareas?_page=:page&_limit=:limit', (req, res) => {
    let id = req.params.id
    let page = req.params.page
    let limit = req.params.limit
    let tareasProyecto = tareas.filter((tarea) => tarea.id_proyecto == id);
    //console.log(tareasProyecto);
    res.json(tareasProyecto);

} );

//Mostrar tareas de un proyecto por fecha de asignacion
app.get('/proyectos/:id/tareas?fechaAsignacion=:fechaAsignacion', (req, res) => {
    let id = req.params.id
    let fecha_asignacion = req.params.fecha_asignacion
    let tareasProyecto = tareas.filter((tarea) => tarea.id_proyecto == id && tarea.fecha_asignacion == fecha_asignacion);
    console.log(tareasProyecto);
    res.json(tareasProyecto);

} );




app.listen(puerto, () => {
	console.log(`Escuchando en el puerto ${puerto}`);
})

