import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import RNSoundLevel from 'react-native-sound-level';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Audio } from 'expo-av';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style = {styles.playbutton}
        onPress = {() => navigation.navigate('Play')}>
        <Text style = {styles.buttonfont}>PLAY</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style = {styles.tutorialbutton}
        onPress = {() => navigation.navigate('Tutorial')}>
        <Text style = {styles.buttonfont}>TUTORIAL</Text>
      </TouchableOpacity>
    </View>
  )
}

const soundObject = new Audio.Sound();
soundObject.loadAsync(require('./assets/sounds/gamemusic.mp3'));

function rng() {
  return Math.floor(Math.random()*4);
}
let commands = ['Thump It!', 'Shout It!', "Shake It!", "Swipe It!"];
let timer = null

function PlayScreen({ navigation }) {
  //const [command, setCommand] = useState(commands[rng()]);

  //game music
  /*useEffect(() => {
      soundObject.playAsync();
      return function cleanup() {
        soundObject.stopAsync();
      }
  });*/

  return (
    <View style={styles.playscreen}>
      <Text style={styles.font}>Ready?</Text>
      <TouchableOpacity 
        style = {styles.beginbutton}
        //onPress = {() => navigation.push(commands[rng()])}>
        onPress = {() => navigation.push(commands[0], {
          time: 5000
        })}>
        <Text style = {styles.buttonfont}>Begin!</Text>
      </TouchableOpacity>
    </View>
  )
} 

function ThumpScreen({ route, navigation }) {
  const { time } = route.params;
  useEffect(() => {
    timer = setTimeout(function(){
      navigation.dispatch(StackActions.popToTop());
    }, time)
  })
  return (
    <View style={styles.thumpscreen}>
      <Text style={styles.font}>Thump It!</Text>
      <TouchableOpacity
        style = {styles.beginbutton}
        onPress = {() => {
          clearTimeout(timer)
          navigation.push(commands[rng()], {
            time: time - 300
          })}}>
        <Text style = {styles.buttonfont}>Begin!</Text>
      </TouchableOpacity>
    </View>
  )
}

function ShoutScreen({ route, navigation }) {
  const { time } = route.params;
  useEffect(() => {
    timer = setTimeout(function(){
      navigation.dispatch(StackActions.popToTop());
    }, time)
  })
  return (
    <View style={styles.shoutscreen}>
      <Text style={styles.font}>Shout It!</Text>
      <TouchableOpacity 
        style = {styles.beginbutton}
        onPress = {() => {
          clearTimeout(timer)
          navigation.push(commands[rng()], {
            time: time - 300
          })}}>
        <Text style = {styles.buttonfont}>Begin!</Text>
      </TouchableOpacity>
    </View>
  )
}

function ShakeScreen({ route, navigation }) {
  const { time } = route.params;
  useEffect(() => {
    timer = setTimeout(function(){
      navigation.dispatch(StackActions.popToTop());
    }, time)
  })
  return (
    <View style={styles.shakescreen}>
      <Text style={styles.font}>Shake It!</Text>
      <TouchableOpacity 
        style = {styles.beginbutton}
        onPress = {() => {
          clearTimeout(timer)
          navigation.push(commands[rng()], {
            time: time - 300
          })}}>
        <Text style = {styles.buttonfont}>Begin!</Text>
      </TouchableOpacity>
    </View>
  )
}

function SwipeScreen({ route, navigation }) {
  const { time } = route.params;
  useEffect(() => {
    timer = setTimeout(function(){
      navigation.dispatch(StackActions.popToTop());
    }, time)
  })
  return (
    <View style={styles.swipescreen}>
      <Text style={styles.font}>Swipe It!</Text>
      <TouchableOpacity 
        style = {styles.beginbutton}
        onPress = {() => {
          clearTimeout(timer)
          navigation.push(commands[rng()], {
            time: time - 300
          })}}>
        <Text style = {styles.buttonfont}>Begin!</Text>
      </TouchableOpacity>
    </View>
  )
}

function TutorialScreen() {
  return (
    <View style={styles.tutorialscreen}>
      <Text style={styles.font}>Tutorialin</Text>
    </View>
  )
}

const Stack = createStackNavigator();

function App() {
  //const [count, setCount] = useState(0);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Home">
        <Stack.Screen 
          name = "Home" 
          component={HomeScreen} 
          options = {{
            headerStyle: {
              backgroundColor: 'black'
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        />
        <Stack.Screen 
          name = "Play" 
          component={PlayScreen}
          options = {{
            headerStyle: {
              backgroundColor: 'black'
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        />
        <Stack.Screen 
          name = "Tutorial" 
          component={TutorialScreen} 
          options = {{
            headerStyle: {
              backgroundColor: 'black'
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        />
        <Stack.Screen 
          name = "Thump It!" 
          component={ThumpScreen} 
          options = {{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name = "Shout It!" 
          component={ShoutScreen} 
          options = {{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name = "Shake It!" 
          component={ShakeScreen} 
          options = {{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name = "Swipe It!" 
          component={SwipeScreen} 
          options = {{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playscreen: {
    flex: 1,
    backgroundColor: 'salmon',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tutorialscreen: {
    flex: 1,
    backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center'
  },
  thumpscreen: {
    flex: 1,
    backgroundColor: '#ffff99',
    alignItems: 'center',
    justifyContent: 'center'
  },
  shoutscreen: {
    flex: 1,
    backgroundColor: '#ffb266',
    alignItems: 'center',
    justifyContent: 'center'
  },
  shakescreen: {
    flex: 1,
    backgroundColor: '#ccff99',
    alignItems: 'center',
    justifyContent: 'center'
  },
  swipescreen: {
    flex: 1,
    backgroundColor: '#c8a2c8',
    alignItems: 'center',
    justifyContent: 'center'
  },
  font: {
    fontFamily: 'Copperplate-Bold',
    fontSize: 30
  },
  buttonfont: {
    fontFamily: 'Copperplate-Bold',
    fontSize: 60
  },
  playbutton: {
    backgroundColor: "salmon", 
    padding: 10, 
    alignSelf: 'stretch', 
    alignItems: 'center',
    justifyContent: 'center',
    height: 305
  },
  tutorialbutton: {
    backgroundColor: "cyan",
    padding: 10, 
    alignSelf: 'stretch', 
    alignItems: 'center',
    justifyContent: 'center',
    height: 305
  },
  beginbutton: {
    backgroundColor: "salmon",
    padding: 10, 
    alignSelf: 'stretch', 
    alignItems: 'center',
    justifyContent: 'center',
    height: 170
  }
});
