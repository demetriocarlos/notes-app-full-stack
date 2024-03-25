import axios from 'axios'

// Definir la URL base para las solicitudes de inicio de sesión
const baseUrl ='http://localhost:3001/api/login'

    // Definir una función asíncrona llamada "login" que toma las credenciales del usuario como argumento
 const  login = async credentials => {

    // Realizar una solicitud POST a la URL base con las credenciales proporcionadas
    // Esperar la respuesta y extraer la propiedad "data" de la respuesta utilizando destructuring
    const {data} = await axios.post(baseUrl,credentials)

     // Devolver los datos obtenidos de la respuesta del servidor
    return data
}

export default {login}
 
