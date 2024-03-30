/* eslint-disable react/prop-types */

 

// eslint-disable-next-line react/prop-types
export const Note = ({note, toggleImportance}) => {

  const label = note.important
      ? 'make not important'
      : 'make important'

  return (
    <div>
      
        
        <div>
          <p>{note.content}</p>
        </div>
        <button onClick={toggleImportance}>{label}</button>
        {/*<small>{body}</small>*/}
  
    </div>
  )
}
