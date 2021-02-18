import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Constants from 'expo-constants'
import { createStackNavigator } from '@react-navigation/stack'
import AddDeck from './components/AddDeck'
import Decks from './components/Decks'
import { gray, purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import DeckDetail from './components/DeckDetail'
import AddQuestion from './components/AddQuestion'
import Quiz from './components/Quiz'
import { setLocalNotification } from './utils/helpers'

function UdaciStausBar({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>

  )
}
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
      }}>
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="Add Question" component={AddQuestion} />
      <Stack.Screen name="Deck Detail" component={DeckDetail} />
      <Stack.Screen name="Quiz" component={Quiz} />

    </Stack.Navigator>
  );
}
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Decks') {
            iconName = focused
              ? 'ios-bookmarks'
              : 'ios-bookmarks';
              return <Ionicons name={iconName} size={30} color={color} />
          } else if (route.name === 'Add Deck') {
            iconName = focused ? 'plus-square' : 'plus-square';
            return <FontAwesome name={iconName} size={30} color={color} />
          } 

          // You can return any component that you like here!
          ;
        },
      })}
      tabBarOptions={{
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        inactiveTintColor: 'gray',
        style: {
          height: 88,
          backgroundColor: Platform.OS === 'ios' ? white : purple,
          shadowRadius: 6,
          shadowOpacity: 1,
          shadowColor: 'rgba(0,0,0,0.24)',
          shadowOffset: {
              width:0,
              height:3
          }
        }
      }}
>
      <Tab.Screen name='Decks' component={Decks}/>
      <Tab.Screen name='Add Deck' component={AddDeck}/>
    </Tab.Navigator>

  )
}
class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
          <View style={{flex: 1}}>
            <NavigationContainer style={{flex:1}}>
              <UdaciStausBar backgroundColor={purple} barStyle='light-content'/>
              <MainNavigator/>
            </NavigationContainer>
          </View>
        </Provider>
    )

  }
}
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
