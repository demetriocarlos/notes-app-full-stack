import axios from "axios";
// Definir la URL base para las solicitudes de notas
const baseUrl ='http://localhost:3001/api/notes'

// Inicializar el token como nulo
let token = null

// Función para establecer el token de autorización
const setToken = newToken => {
    token = `Bearer ${newToken}`
} 

// Función para obtener todas las notas
const getAll=() =>{
    // Realizar una solicitud GET a la URL base
    const request = axios.get(baseUrl)
     
    // Devolver una promesa que resuelve con los datos de la respuesta
    return request.then(response => response.data /*.concat(nonExisting)*/ )
}

// Función para crear una nueva nota
const create = (newObject,) =>{
     // Configurar los encabezados de la solicitud con el token de autorización
    const config = {
        headers:{
            Authorization: token
        } 
    }

    // Realizar una solicitud POST a la URL base con la nueva nota y la configuración de los encabezados
    const request = axios.post(baseUrl, newObject, config)

    // Devolver una promesa que resuelve con los datos de la respuesta
    return request.then(response => response.data)
}


// Función para actualizar una nota existente
const update = (id,newObject) =>{
    // Configurar los encabezados de la solicitud con el token de autorización
    const config = {
        headers:{
            Authorization: token
        } 
    }

    // Realizar una solicitud PUT a la URL base con el ID de la nota a actualizar, la nueva nota y la configuración de los encabezados
    const request = axios.put(`${baseUrl}/${id}`, newObject,config)

     // Devolver una promesa que resuelve con los datos de la respuesta
    return request.then(response => response.data)

}

// Exportar las funciones getAll, create, update y setToken para que puedan ser utilizadas por otros módulos
export default {getAll,create,update,setToken}