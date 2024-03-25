 
import  { useState, useEffect } from 'react'
//import Note from './components/Note'
 //import axios from 'axios'
import { Note } from './Components/Note.jsx'
//import { CreateNote } from './services/notes/CreateNote.jsx'
//import { GetAllNotes } from './services/notes/GetAllNotes.jsx'
import noteService from './services/notes/Index.jsx'
import loginService from './services/Login.js'
import { LoginForm } from './Components/LoginForm.jsx'
import { NoteForm } from './Components/NoteForm.jsx'

const App = () => {
  const [notes, setNotes] = useState([]) 
  
  const [error,setError]= useState(false)
  const [showAll, setShowAll] = useState(true)
  const[errorMessage, setErrorMessage]= useState(null)

  const [username,setUserName]= useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)
   
  useEffect(() => {
    noteService
      .getAll()
      .then(notes => {
        setNotes(notes)
      });

      return () =>{
        console.log("removeEffect")
      };

  }, [])


  useEffect(() => {
     // Mantener la sesión del usuario

    // Obtener los datos del usuario almacenados en el localStorage del navegador
    const loggedUserJSON= window.localStorage.getItem('loggedNoteAppUser')

    // Verificar si existen datos del usuario en el localStorage
    if(loggedUserJSON){
      // Si existen, parsear los datos del usuario de formato JSON a objeto JavaScript
      const user = JSON.parse(loggedUserJSON)
      // Establecer el estado del usuario con los datos obtenidos
      setUser(user)
      // Establecer el token de autorización en el servicio de notas utilizando el token del usuario
      noteService.setToken(user.token)
    }
  },[])


  const handleLogout = () =>{
       // Eliminar el usuario del estado del componente, es decir, cerrar sesión
      setUser(null)

      // Eliminar el token de autorización del servicio de notas
    // (Sin embargo, hay un error aquí, ya que se está intentando utilizar `user.token` después de haber establecido el estado del usuario en null)
      noteService.setToken(user.token)

      // Eliminar los datos del usuario del localStorage del navegador
      window.localStorage.removeItem('loggedNoteAppUser')
  }

  const addNote = (noteObject) => {
    // Llamar al servicio de notas para crear una nueva nota en el servidor
    noteService
      .create(noteObject,)
      .then(returnedNote => {
        // Una vez que se ha creado la nota en el servidor con éxito, actualizar el estado 'notes'
          // agregando la nueva nota devuelta por el servidor
        setNotes(notes.concat(returnedNote))
        
      })
  }


  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)   
      })
  }

 
   const handleLogin = async (event) => {
        event.preventDefault()
      try { 
        // Intentar iniciar sesión utilizando el servicio de login
        const user = await loginService.login({
          username,
          password
             
        })  
         // Mantener la sesión del usuario almacenando sus datos en el localStorage del navegador
        window.localStorage.setItem(
          'loggedNoteAppUser', JSON.stringify(user)
        )

         // Establecer el token de autorización en el servicio de notas utilizando el token del usuario
        noteService.setToken(user.token)
         
        // Establecer el estado del usuario en el componente con los datos del usuario autenticado
        setUser(user)
        setUserName('')
        setPassword('')
      } catch(e) {
        setErrorMessage('Wrong credentials')
        // Establecer un temporizador para limpiar el mensaje de error después de 5 segundos
        setTimeout(() => {
          setErrorMessage()
        }, 5000)
      }
   }


    const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)


      
   
  return (
    <div>
      <h1>Notes</h1>
    {errorMessage}
        {
          user
            ? <NoteForm 
              addNote={addNote}
              handleLogout={handleLogout}
            />
            : <LoginForm
                username={username}
                password={password}
                handleUsernameChange={
                  ({target}) => setUserName(target.value)
                }

                handlePasswordChange={
                  ({target}) => setPassword(target.value)
                }

                handleSubmit={handleLogin}
            />
        }

         
          {error? error: ''}
      <ol>
        {notes.map((note) =>(
             <Note key={note.id} {...note}/>
        ))}
      </ol>

      


    </div>
  )
}

 

export default App
