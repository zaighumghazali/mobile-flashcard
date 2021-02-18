import React, {Component} from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView } from "react-native";
import {gray, purple, white} from '../utils/colors'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import {submitAddDeck} from '../utils/api'
import { CommonActions } from '@react-navigation/native'

function SubmitBtn ({onPress}) {
    return (
        <TouchableOpacity style={Platform.OS === 'ios' 
        ? styles.iosSubmitButton
        : styles.androidSubmitButton
    }  onPress={onPress}>
            <Text style={styles.submitButtonText}>SUBMIT</Text>
        </TouchableOpacity>
    )
}
class AddDeck extends Component {
    state = {
        text: ''
    }
    onChange = (text) => {
        this.setState(()=>({
            text: text
        }))

    }
    submit = () => {
        const title = this.state.text
        this.props.dispatch(addDeck({
            [title]: {
                title: title,
                questions: []
            }
        }))
        this.setState(() => ({
            text: ''
        }))
        submitAddDeck(title)
    }
    render() {
        const {text} = this.state
        return (
            <KeyboardAvoidingView style={{flex: 1 }}>
                <Text style={styles.textBox}>What is the title of your new deck?</Text>
                <View style={{flex:1, height: 50}}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={this.onChange}
                        value={text}
                        placeholder='Deck Title'
                    />
                </View>
                <SubmitBtn onPress={this.submit}/>
            </KeyboardAvoidingView>
            
        )
    }
}
const styles = StyleSheet.create({
    textBox: {
        flex: 1,
        fontSize: 40, 
        textAlign:'center',
        height: 50,
    },
    textInput: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        padding: 5,
        marginRight: 30,
        marginLeft: 30,
        color: gray,
    },
    iosSubmitButton: {
        backgroundColor: purple,
        marginLeft: 40,
        marginRight: 40,
        borderRadius: 7,
        padding: 10,
        height: 45,
    },
    submitButtonText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',

    },
    androidSubmitButton: {
        backgroundColor: purple,
        padding: 10,
        height: 45,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',


    }
})
export default connect()(AddDeck)

