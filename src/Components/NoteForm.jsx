import { useState,useRef } from "react"
import { Togglable } from "./Togglable"
 
// eslint-disable-next-line react/prop-types
export const NoteForm = ({addNote,handleLogout}) => {

  const [newNote,setNewNote] = useState("")
  // Crear una referencia 'togglableRef' utilizando el hook useRef
  const  togglableRef = useRef()

  const handleChange = (event) => {
    setNewNote(event.target.value)
   }

   const handleSubmit = (event) => {
      event.preventDefault()

      // Crear un objeto de nota con la información del formulario y un valor aleatorio para la propiedad 'important'
      const noteObject = {
        content: newNote,
        important :Math.random() > 0.5
      }

      // Llamar a la función 'addNote' pasándole el objeto de nota
      addNote(noteObject)

      // Limpiar el campo 'newNote' estableciendo su valor en una cadena vacía
      setNewNote('')

      // Acceder al método 'toggleVisibility' del componente Togglable a través de la referencia 'togglableRef'
      togglableRef.current.toggleVisibility()
   }

   console.log( togglableRef)

  return (
  
    <Togglable  ref={togglableRef} > 
        <h3 >create a new nota</h3>

         
        <form  onSubmit={handleSubmit}>
            <input type="text" 
                placeholder='Write your note content'
                value={newNote}
                onChange={handleChange}
            />
            <button type='submit'>
              Crear notas
            </button >
        </form>

              <div>
                <button onClick={handleLogout}>
                  Cerrar session
                </button>
              </div>
    </Togglable>
  )
}








