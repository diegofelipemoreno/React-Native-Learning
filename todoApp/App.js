import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';

import Heading from './components/Heading';
import Input from './components/Input';
import Button from './components/Button';
import ToDoList from './components/ToDoList';
import TabBar from './components/TabBar';
import ProfileCard from './components/ProfileCard';

import getStyleSheet from './styles/styleSheet';

import {cardData} from './models';
import {replaceItemFromArrayByIndex} from './utils';

class App extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      toDos: new Map(),
      type: '',
      darkTheme: false,
      cardData,
    };

    this.submitTodo = this.submitTodo.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.setType = this.setType.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
    this.handleProfileCardPress = this.handleProfileCardPress.bind(this);
  }

  inputChange(inputValue) {
    this.setState({
      inputValue,
    });
  }

  submitTodo() {
    const {inputValue, toDos} = this.state;

    if (!inputValue) {
      return;
    }

    const newToDo = {
      title: inputValue,
      todoIndex: toDos.size + 1,
      complete: false
    } 
    const {todoIndex} = newToDo;

    this.setState({
      toDos: toDos.set(todoIndex, newToDo),
      inputValue: '',
    });
  }

  toggleComplete(toDo) {
   const {toDos} = this.state;
   const {todoIndex, title} = toDo;

    this.setState({
      toDos: toDos.set(todoIndex, {todoIndex, complete: true, title }),
    });
  }

  deleteTodo(todoIndex) {
    const {toDos} = this.state;
    const toDosCopy = new Map(toDos);

    toDosCopy.delete(todoIndex);
    this.setState({
      toDos: toDosCopy,
    });
  }

  setType(type) {
    this.setState({type});
  }

  toggleTheme() {
    const {darkTheme} = this.state;

    this.setState({darkTheme: !darkTheme});
  }

  handleProfileCardPress(index) {
    const {cardData} = this.state;
    let currentCard = cardData[index];

    currentCard = {...currentCard, showThumbnail: !currentCard.showThumbnail};

    this.setState({
      cardData: replaceItemFromArrayByIndex(cardData, index, currentCard)
    });
  }

  render() {
    const styles = getStyleSheet(this.state.darkTheme);
    const backgroundColor = StyleSheet.flatten(styles.container).backgroundColor;
    const {inputValue, toDos, type, cardData} = this.state;
    const toDosList = [...toDos.values()];

    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='always'>
          <Button 
            label={backgroundColor}
            onPress={this.toggleTheme}
            />
          <Heading/>
          <Input
            inputValue={inputValue}
            inputChange={(text) => {
              this.inputChange(text)
            }}
          />
          <ToDoList 
          toDos={toDosList}
          type={type}
          toggleComplete={this.toggleComplete}
          deleteTodo={this.deleteTodo}
          />
          <Button
            label="Submit"
            onPress={this.submitTodo}
          />
          <Text>ToDo: {JSON.stringify(toDosList)} State: {JSON.stringify(this.state)}</Text>
          <View>
            {
              cardData.map((elem, index) => {
                const {
                  image,
                  name,
                  occupation,
                  description,
                  showThumbnail,
                } = elem;

                return (
                  <ProfileCard 
                  key={`card-${index}`}
                  image={image}
                  name={name}
                  occupation={occupation}
                  description={description}
                  showThumbnail={showThumbnail}
                  onPress={() => this.handleProfileCardPress(index)}
                />
                )
              })
            }
          </View>
    
        </ScrollView>
        <TabBar type={type} setType={this.setType}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingTop: 60
  }
});

export default App
