import React, {Component} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from 'react-redux'
import {gray, white, red, black} from '../utils/colors'
class DeckDetail extends Component {
    addCardButtonPressed = () => {
        this.props.navigation.navigate('Add Question',{deckId: this.props.currentDeck.title})
    }
    startQuizButtonTapped = () => {
        this.props.navigation.navigate('Quiz',{deckId: this.props.currentDeck.title})
    }
    deleteDeckButtonTapped = () => {

    }
    render() {
        const {title, questions} = this.props.currentDeck
        return (
            <View style={{flex:1}}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.cardsCount}>{questions.length} cards</Text>
                <TouchableOpacity style={styles.button} onPress={this.addCardButtonPressed}>
                    <Text style={styles.addCardText} >Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button,  {backgroundColor: black}]} onPress={this.startQuizButtonTapped}>
                    <Text style={styles.startQuizText} >Start Quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
function mapStateToProps(decks, {route}) {
    const {deckId} = route.params
    const currentDeck = decks[deckId]
    return {
        currentDeck
    }
}
const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        textAlign: 'center',
        marginTop: 40,
    },
    cardsCount: {
        fontSize: 16,
        color: gray,
        textAlign: 'center'
    },
    addCardText: {
        fontSize: 32,
        textAlign: 'center',

    },
    startQuizText: {
        color: white,
        fontSize: 32,
        textAlign: 'center',

    },
    deleteDeckTex: {
        color: red,
        fontSize: 32,
        textAlign: 'center',

    },
    button: {
        borderRadius: 5,
        borderColor: black,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 40,
        marginRight: 40,
        fontSize: 32,
        marginTop: 40,
        height: 50,
    }
})

export default connect(mapStateToProps)(DeckDetail)