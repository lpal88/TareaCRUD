import React from 'react'
import { useState } from 'react'
import { DragDropContext } from '@hello-pangea/dnd';
import { Droppable } from '@hello-pangea/dnd';
import { Draggable } from '@hello-pangea/dnd';

const App = () => {

  const initialTodos = [
    {id:1, text: "aprender react"},
    {id:2, text: "aprender js"},
    {id:3, text: "aprender vue"},
  ];

  const [todos, setTodos] = useState(initialTodos)

  const handleonDragEnd = (result)=> {
    //console.log(result);
    const {destination,source} = result;
    if(!destination) return;

    const startIndex = source.index;
    const endIndex = destination.index;
    reorder(startIndex, endIndex);
  };

  const reorder = (startIndex, endIndex) => {
    const result = [...todos]
    const removed = result.splice(startIndex,1)
    const [remove_item] = removed

      result.splice(endIndex, 0, removed)
      setTodos(result)
  }

  return (
    <DragDropContext onDragEnd={handleonDragEnd}>
      <h1>Drag and Drop</h1>
      <Droppable  droppableId="droppable-1">
        {
          ( DroppableProvided) => (
      <ul ref= {DroppableProvided.innerRef} {...DroppableProvided.droppableProps}>
        {
          todos.map((todo, index) => (
            <Draggable key={todo.id} draggableId={`${todo.id}`} index={index}>
              {
                (DraggableProvided) => (
                  <li ref= {DraggableProvided.innerRef} 
                  {...DraggableProvided.draggableProps} 
                  {...DraggableProvided.dragHandleProps}
                  >

                  {todo.id}-{todo.text}
                </li>
                )}
            </Draggable>
          ))
        }
      </ul>
      )
    }
      </Droppable>
    </DragDropContext>
  )
}

export default App