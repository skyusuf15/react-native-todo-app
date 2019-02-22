import React from 'react';
import { StyleSheet, View, StatusBar, ActivityIndicator, ScrollView, AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo';
import uuid from 'uuid/v1';
import { primaryGradientArray } from './utils/Colors'; 
import Header from './components/Header';
// import SubTitle from './components/SubTitle';
import Input from './components/Input';
import List from './components/List';
// import Button from './components/Button';

const headerTitle = 'To Do';

export default class Main extends React.Component {
    state = {
        inputValue: '',
        loadingItems: false,
        allItems: {},
        isCompleted: false
    };
    componentDidMount = () => {
        this.loadingItems();
    };
    newInputValue = value => {
        this.setState({
            inputValue: value
        });
    };
    loadingItems = async () => {
        try {
            const allItems = await AsyncStorage.getItem('ToDos');
            this.setState({
                loadingItems: true,
                allItems: JSON.parse(allItems) || {}
            });
        } catch (err) {
            console.log(err);
        }
    };
    onDoneAddItem = () => {
        const { inputValue } = this.state;
        if (inputValue !== '') {
            this.setState(prevState => {
                const id = uuid();
                const newItemObject = {
                    [id]: {
                        id,
                        isCompleted: false,
                        text: inputValue,
                        createdAt: Date.now()
                    }
                };
                const newState = {
                    ...prevState,
                    inputValue: '',
                    allItems: {
                        ...prevState.allItems,
                        ...newItemObject
                    }
                };
                this.saveItems(newState.allItems);
                return { ...newState };
            });
        }
    };
    deleteItem = id => {
        this.setState(prevState => {
            const allItems = prevState.alignItems;
            delete allItems[id];
            const newState = {
                ...prevState,
                ...allItems
            };
            this.saveItems(newState.allItems);
            return { ...newState };
        });
    };

    

    completeItem = id => {
        this.setState(prevState => {
          const newState = {
            ...prevState,
            allItems: {
              ...prevState.allItems,
              [id]: {
                ...prevState.allItems[id],
                isCompleted: true
              }
            }
          };
          this.saveItems(newState.allItems);
          return { ...newState };
        });
      };
      incompleteItem = id => {
        this.setState(prevState => {
          const newState = {
            ...prevState,
            allItems: {
              ...prevState.allItems,
              [id]: {
                ...prevState.allItems[id],
                isCompleted: false
              }
            }
          };
          this.saveItems(newState.allItems);
          return { ...newState };
        });
      };
      deleteAllItems = async () => {
        try {
          await AsyncStorage.removeItem('ToDos');
          this.setState({ allItems: {} });
        } catch (err) {
          console.log(err);
        }
      };
      saveItems = newItem => {
        const saveItem = AsyncStorage.setItem('To Dos', JSON.stringify(newItem));
      };


    render() {
        const { inputValue } = this.state;
        return (
            <LinearGradient colors={primaryGradientArray} style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={styles.centered}>
                    <Header title={headerTitle}/>
                </View>

                <View style={styles.inputContainer}>
                    <Input inputValue={inputValue} onchangeText={this.newInputValue} />
                </View>

                <View style={styles.list}>
                    <ScrollView contentContainerStyle={styles.scrollableList}>
                        {Object.values({allItems})
                            .reverse()
                            .map(item => (
                                <List
                                    key={item.id}
                                    {...item}
                                    deleteItem={this.deleteItem}
                                    completeItem={this.completeItem}
                                    incompleteItem={this.incompleteItem}
                                />
                            ))}
                    </ScrollView>
                </View>
            </LinearGradient>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    centered: {
        alignItems: 'center'
    },
    inputContainer: {
        marginTop: 40,
        paddingLeft: 15
    },
    list: {
        flex: 1,
        marginTop: 70,
        paddingLeft: 15,
        marginBottom: 10,
    },
    scrollableList: {
        marginTop: 15
    }
});