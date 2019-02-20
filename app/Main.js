import React from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import { LinearGradient } from 'expo';
import { primaryGradientArray } from './utils/Colors'; 
import Header from './components/Header';
import Input from './components/Input';
import List from './components/List';


const headerTitle = 'To Do';

export default class Main extends React.Component {
    state = {
        inputValue: ''
    };
    newInputValue = value => {
        this.setState({
            inputValue: value
        });
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
                        {Object.values(allItems)
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