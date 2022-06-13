import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

const ToDoButton = ({label, complete, onPress}) => {
        return (
        <View style={styles.buttonContainer}>
            <TouchableHighlight
            underlayColor='#efefef'
            style={styles.button}
            onPress={onPress}>
            <Text style={[
            styles.text,
            complete ? styles.complete : null,
            label === 'delete' ? styles.deleteButton : null ]}
            >
                {label}
            </Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        alignSelf: 'flex-end',
        padding: 7,
        borderColor: '#ededed',
        borderWidth: 1,
        borderRadius: 4,
        marginRight: 5
    },
    text: {
        color: '#666666'
    },
    complete: {
        color: 'green',
        fontWeight: 'bold'
    },
    deleteButton: {
        color: 'rgba(175, 47, 47, 1)'
    }
});

export default ToDoButton;