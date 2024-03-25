 
import {forwardRef,useImperativeHandle ,useState } from "react"
import PropTypes from 'prop-types'

// eslint-disable-next-line react/prop-types, react/display-name
export const Togglable = forwardRef(({children ,buttonLabel = 'Muestrame'}, ref) => {

    const [visible, setVisible]= useState(false)

        // Estilos para ocultar y mostrar el contenido según su visibilidad
      const hideWhenVisible = {display: visible ? 'none' : ''}
      const showWhenVisible = {display: visible ? '' : 'none'}

        // Función para alternar la visibilidad del contenido
      const toggleVisibility = () => setVisible(!visible)

      // Uso de useImperativeHandle para exponer una función a través del ref
      useImperativeHandle(ref, () => {
        return {
          toggleVisibility
        }
      })


  return (
    <div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>{buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
            {children}
            <button onClick={ toggleVisibility}>cancel</button>
        </div>
    </div>
  )
})

// Establece el nombre de visualización del componente Togglable como 'Togglable'.
Togglable.displayName = 'Togglable'

// Define los propTypes para el componente Togglable. Los propTypes son una forma de definir los tipos de las props que se esperan en un componente React.
Togglable.propTypes = {
  // Se espera que la prop 'buttonLabel' sea una cadena de texto (string).
  buttonLabel: PropTypes.string 
}
