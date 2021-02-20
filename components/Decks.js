import React, {Component} from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native"
import { fetchAllDecks } from '../utils/api'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { useIsFocused } from '@react-navigation/native';
import { gray } from '../utils/colors'
class Decks extends Component {
    state = {
        ready: false
    }
    componentDidMount () {
        const {dispatch} = this.props
        fetchAllDecks()
        .then((decks) => dispatch(receiveDecks(decks)))
        .then(()=> this.setState(() => ({ready: true})))

    }
    renderItem = ({item}) => {
        const {decks} = this.props
        return (
            <View key={decks[item].title} style={{flex:1, padding: 10}}>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('Deck Detail',{deckId: item})}>
                    <Text style={styles.deck}>{decks[item].title}</Text>
                    <Text style={styles.cardsCount}>{decks[item].questions.length} cards</Text>
                </TouchableOpacity>
            </View>
        ) 
    }
    render() {
        const {decks} = this.props
        const {ready} = this.state
        if (ready === false) {
            return (
                <View style={{justifyContent: 'center', flex:1, alignItems: 'center'}}>
                    <Text>Loading...</Text>
                </View>
                
            )
        }
        return (
            <View style={{flex:1}}>
                <FlatList
                data={Object.keys(decks)}
                keyExtractor={(item, index) => `${index}`}
                renderItem={this.renderItem}
                />
                
            </View>
        )
    }
}
function mapStateToProps(decks) {
    return {
        decks
    }
}
const styles = StyleSheet.create({
    deck: {
        fontSize: 32,
        textAlign: 'center'
    },
    cardsCount: {
        fontSize: 16,
        color: gray,
        textAlign: 'center'
    },
})
export default connect(mapStateToProps)(Decks)