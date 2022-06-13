import React from 'react';
import { View, Text } from 'react-native';

import ToDo from './ToDo';

const TodoList = ({ toDos, type, toggleComplete, deleteTodo }) => {  

    const toDosFilterBy = (type) => {
        switch (type) {
            case 'All':
              return toDos;
            case 'Complete':
              return toDos.filter((elem) => elem.complete);
            case 'Active':
              return toDos.filter((elem) => !elem.complete);
            default:
              return toDos;
        }
    };

    return (
        <View>
            {toDosFilterBy(type).map((elem, index) => {

                return (
                    <View key={`toDo-${index}`}>
                        <ToDo 
                        {...elem}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                        />
                    </View>
                )
            })}  
        </View>
    )
}

export default TodoList;