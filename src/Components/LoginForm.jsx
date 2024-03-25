//import { useState } from "react"

import { Togglable } from "./Togglable"
import PropTypes from 'prop-types'
// eslint-disable-next-line react/prop-types
export const LoginForm = ({handleSubmit,username,handleUsernameChange, password,handlePasswordChange}) => {

        

    return ( 
      <>
        <Togglable buttonLabel='SHOW LOGIN' >
          <form action="" onSubmit={handleSubmit}> 
            <div>
              <input 
                type="text" 
                value={username}
                name='Username'
                placeholder='Username'
                onChange={handleUsernameChange}
              />
            </div>
            <div>
              <input 
                type="password" 
                value={password}
                name='Password'
                placeholder='Password'
                onChange={handlePasswordChange}
              />
            </div>
            <button>
              Login
            </button>
          </form>
          
        </Togglable>
     
   </>
    )
 }

 
// Define los propTypes para el componente LoginForm.
LoginForm.propTypes = {
  // La prop 'handleSubmit' se espera que sea una función (func). El ".isRequired" indica que esta prop es requerida y debe estar presente en las instancias del componente.
  handleSubmit:PropTypes.func.isRequired,

  // La prop 'username' se espera que sea una cadena de texto (string). Sin embargo, no se indica como requerida, por lo que puede ser opcional.
  username: PropTypes.string 
}

