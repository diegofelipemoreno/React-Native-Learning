import React from 'react';
import reactDom from 'react-dom';
import { View, Text, StyleSheet} from 'react-native';

import ToDoButton from './ToDoButton';

const Todo = ({ todoIndex, title, complete, toggleComplete, deleteTodo }) => {
    return (
        <>
            <View oso="2" style={styles.todoContainer}>
                <Text style={styles.todoText}>
                {title}
                </Text>
                <View style={styles.buttons}>
                    <ToDoButton
                        label='Done'
                        complete={complete}
                        onPress={() => toggleComplete({todoIndex, title, complete})}sss />
                    <ToDoButton
                        label='Delete'
                        onPress={() => deleteTodo(todoIndex)} />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    todoContainer: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderColor: '#000',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        paddingBottom: 7,
        paddingLeft: 14,
        paddingTop: 7,
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    todoText: {
        fontSize: 17
    },
    buttons: {
      flexDirection: 'row',
      marginLeft: 20,
      marginRight: 20,
    }
})

export default Todo;