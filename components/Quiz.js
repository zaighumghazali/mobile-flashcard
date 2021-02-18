import React, {Component} from 'react'
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import {red, green, white} from '../utils/colors'
import { CommonActions } from '@react-navigation/native'
import { clearLocalNotification } from '../utils/helpers'
class Quiz extends Component {
    state = {
        currentIndex: 0,
        correctAnswers: 0,
        falseAnswers: 0,
        showingQuestion: true,
        showResults: false
    }
    answerQuestionButtontapped = () => {
        this.setState((oldState) => ({
            showingQuestion: !oldState.showingQuestion
        }))
    }
    correctButtonTapped = () => {
        this.updateIndex()        
        this.setState((oldState) => ({
            correctAnswers: oldState.correctAnswers + 1
        }))
        
    }
    updateIndex() {
        const {currentIndex} = this.state
        const { questions } = this.props.currentDeck
        if (currentIndex === questions.length-1) {
            this.setState(() => ({
                showResults: true
            }))
            clearLocalNotification()
        } else {
            this.setState((oldState) => ({
                currentIndex: oldState.currentIndex + 1
            }))
        }
    }
    inCorrectButtontapped = () => {
        this.updateIndex()
        this.setState((oldState) => ({
            falseAnswers: oldState.falseAnswers + 1
        }))
    }
    restartQuizButtonTapped= () => {
        this.setState(() => ({
            currentIndex: 0,
            correctAnswers: 0,
            falseAnswers: 0,
            showingQuestion: true,
            showResults: false
        }))
    }
    backToDeckButtonTapped = () => {
        this.props.navigation.dispatch(CommonActions.goBack({
            key: 'Deck Detail',
        }))

    }
    render() {
        const { questions } = this.props.currentDeck
        if (questions.length === 0){
            return(
                <View style={{flex:1, justifyContent:'center'}}>
                    <Text style={{textAlign:'center', fontSize:24}}>Sorry! You cannot take a quiz because there are no cards in the deck</Text>
                </View>

            )
        }
        const {currentDeck} = this.props
        const { currentIndex, showingQuestion, showResults, correctAnswers, falseAnswers } = this.state
        if (showResults === true) {
            return (
                <View style={{flex:1, alignItems:'center'}}>
                    <Text style={{fontSize: 32}}>Correct Answers: {correctAnswers}</Text>
                    <Text style={{fontSize: 32}}>In Correct Answers: {falseAnswers}</Text>
                    <TouchableOpacity onPress={this.restartQuizButtonTapped} style={styles.correctButton}>
                        <Text style={styles.buttonText}>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.correctButton} onPress={this.backToDeckButtonTapped}>
                        <Text style={styles.buttonText}>Back to Deck</Text>
                    </TouchableOpacity>

                </View>
            )
        }

        return (
            <View style={{flex:1}}>
                <Text style={styles.questionsCount}>{currentIndex + 1}/{currentDeck.questions.length}</Text>
                <View style={styles.container}>
                    {showingQuestion === true 
                    ?<View style={styles.questionView}>
                        <Text style={styles.headingLabel}>{currentDeck.questions[currentIndex].question}</Text>
                        <TouchableOpacity onPress={this.answerQuestionButtontapped} style={styles.answerButton}><Text>Answer</Text></TouchableOpacity>
                    </View>
                    :<View style={styles.questionView}>
                        <Text style={styles.headingLabel}>{currentDeck.questions[currentIndex].answer}</Text>
                        <TouchableOpacity onPress={this.answerQuestionButtontapped} style={styles.answerButton}><Text>Question</Text></TouchableOpacity>
                    </View>
                    }
                    <TouchableOpacity onPress={this.correctButtonTapped} style={styles.correctButton}><Text style={styles.buttonText}>Correct</Text></TouchableOpacity>
                    <TouchableOpacity onPress={this.inCorrectButtontapped} style={styles.inCorrectButton}><Text style={styles.buttonText}>Incorrect</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center'
    },
    questionsCount: {
        fontSize: 17,
    },
    questionView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:0,
        marginRight:0,
    },
    headingLabel: {
        fontSize: 40,
    },
    answerButton: {
        height: 50,
        marginTop:30,
    },
    correctButton: {
        width: 200,
        height: 50,
        marginTop:30,
        borderRadius: 5,
        backgroundColor: green,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inCorrectButton: {
        width: 200,
        height: 50,
        marginTop:30,
        borderRadius: 5,
        backgroundColor: red,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: white
    }


}) 
function mapStateToProps(decks, {route}) {
    const {deckId} = route.params
    const currentDeck = decks[deckId]
    return {
        currentDeck
    }

}
export default connect(mapStateToProps)(Quiz)