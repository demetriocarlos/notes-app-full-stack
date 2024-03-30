// no
//import '@testing-library/jest-dom/extend-expect'

import {render,screen} from '@testing-library/react'
import { Note } from './Note'
import { fireEvent, prettyDOM } from '@testing-library/dom';

import { describe, it, expect, test ,run} from 'vitest';




test('renders content', () => {

    // Crear un objeto "note" con propiedades "content" e "important"
    const note = {
        content: 'This is a test',
        important: true
    }

     
    // Renderizar un componente llamado "Note" con la propiedad "note"
    const  component = render(<Note note = {note}/>)
        // Verificar que el texto "This is a test" está presente en el componente
    component.getByText('This is a test')
    // Verificar que el texto "make not important" está presente en el componente
    component.getByText('make not important')
})



 /*
test('clicking the button calls event handler once', () => {
    const note = {
        content: 'This is a test',
        important: true
    }

    const mockHandler = jest.fn()
     
    const  component = render(<Note note={note} toggleImportance={() => {mockHandler}}/>)

    const button = component.getByText('make not important') 
    fireEvent.click(button)
    
    expect(mockHandler).toHaveBeenCalledTimes(1)
})
*/

 