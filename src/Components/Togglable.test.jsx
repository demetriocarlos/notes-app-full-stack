/* eslint-disable no-undef */

import {render,screen} from '@testing-library/react'

import { fireEvent, prettyDOM } from '@testing-library/dom';

import { describe,  expect, test } from 'vitest';

import { Togglable } from './Togglable';
import i18n from './i18n/index'


describe('<Togglable/>', ()  => {
    const buttonLabel='show'  // Etiqueta del botón que se pasa como propiedad al componente
    let component

    beforeEach(() => {
        // Renderiza el componente con la etiqueta del botón y el contenido de prueba
        component = render( 
            <Togglable buttonLabel={buttonLabel}>
                <div >testDivContent</div>
            </Togglable>
        )
    }) 

    test('render its children', () => {
         component.getByText('testDivContent')  // Verifica que el contenido de prueba esté presente en el DOM
    })


    test('renders its children but they are not visible', () => {
        const el = component.getByText('testDivContent')  // Obtiene el elemento de prueba
        expect(el.parentNode).toHaveStyle('display:none') // Verifica que el elemento esté oculto
    })


/*
    test('after clicking its children must be shown', () => {
        
        //expect(el.parentNode).toHaveStyle('display:none')

        const button = component.getByText(buttonLabel)
        fireEvent.click(button)

        const el = component.getByText('testDivContent')
        expect(el.parentNode).not.toHaveStyle('display: none')

    })
*/   

    test('toggled content can be closed', () => {
        const button = component.getByText(buttonLabel) // Obtiene el botón
        fireEvent.click(button)  // Simula un clic en el botón para mostrar el contenido

        const el = component.getByText('testDivContent')// Obtiene el elemento de prueba mostrado
        expect(el.parentNode).not.toHaveStyle('display: none')// Verifica que el elemento esté visible
        


        const cancelButton = component.getByText(i18n.TOGGABLE.CANCEL_BUTTON) // Obtiene el botón de cancelar (presumiblemente traducido)
        fireEvent.click(cancelButton) // Simula un clic en el botón de cancelar para ocultar el contenido
        expect(el.parentNode).toHaveStyle('display: none') // Verifica que el contenido esté oculto nuevamente
    })


})  
