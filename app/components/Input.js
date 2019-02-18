import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { inputPlaceholder } from '../utils/Colors';

const Input = ({ inputValue, onchangeText, onDoneAddItem }) => (
    <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={onchangeText}
        placeholder="Type here to add a note"
        placeholderTextColor={inputPlaceholder}
        multiline={true}
        autoCapitalize="sentences"
        underlineColorAndroid="transparent"
        selectionColor={'white'}
        maxLength={30}
        returnKeyType="done"
        autoCorrect={false}
        blurOnSubmit={true}
        onSubmitEditing={onDoneAddItem}
    />
);

const styles = StyleSheet.create({
    input: {
        paddingTop: 10,
        paddingRight: 15,
        fontSize: 34,
        color: 'white',
        fontWeight: '500'
    }
});

export default Input;