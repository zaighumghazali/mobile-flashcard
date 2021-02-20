import React, {Component} from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import { connect } from 'react-redux'
import {gray, purple, white} from '../utils/colors'
import { addCard } from '../actions'
import { submitAddCard, submitAddDeck } from '../utils/api'
import { CommonActions } from '@react-navigation/native'

class AddQuestion extends Component {
    state = {
        question: '',
        answer: '',
    }
    onChangeQuestion = (text) => {
        this.setState(() => ({
            question: text
        }))

    }
    onChangeAnswer = (text) => {
        this.setState(() => ({
            answer: text
        }))
    }
    submitButtonTapped = () => {
        const {question, answer} = this.state
        this.props.dispatch(addCard({
            question: question,
            answer: answer,
        }, this.props.currentDeck.title))
        this.setState(() => ({
            question: '',
            answer: '',
        }))
        this.props.navigation.dispatch(CommonActions.goBack({
            key: 'Deck Detail'
        }))
        submitAddCard(this.props.currentDeck.title,{
            question: question,
            answer: answer,
        })


    }
    render() {
        const {question, answer} = this.state
        return (
            <View style={{flex:1}}>
                <TextInput
                        style={styles.textInput}
                        onChangeText={this.onChangeQuestion}
                        value={question}
                        placeholder='Question'
                />
                <TextInput
                        style={styles.textInput}
                        onChangeText={this.onChangeAnswer}
                        value={answer}
                        placeholder='Answer'
                />
                <TouchableOpacity disabled={question === '' || answer === ''} style={styles.iosSubmitButton} onPress={this.submitButtonTapped}>
                    <Text style={styles.submitButtonText} >Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
function mapStateToProps(decks,{route}) {
    const {deckId} = route.params
    const currentDeck = decks[deckId]
    return {
        currentDeck
    }

}
const styles = StyleSheet.create({
    textInput: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        padding: 5,
        marginRight: 30,
        marginLeft: 30,
        color: gray,
        marginTop: 30,
    },
    submitButtonText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
    iosSubmitButton: {
        backgroundColor: purple,
        marginLeft: 40,
        marginRight: 40,
        borderRadius: 7,
        padding: 10,
        height: 45,
        marginTop: 30,
    },
})
export default connect(mapStateToProps)(AddQuestion)