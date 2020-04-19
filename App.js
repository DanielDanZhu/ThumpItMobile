import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View, Button, Alert } from 'react-native';
import { styles } from './Styles.js'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Audio } from 'expo-av';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import DoubleClick from 'react-native-double-tap'

const menusoundObject = new Audio.Sound();
menusoundObject.loadAsync(require('./assets/sounds/menu.m4a'));
const gamesoundObject = new Audio.Sound();
gamesoundObject.loadAsync(require('./assets/sounds/gamemusic2.mp3'));
const thumpsoundObject = new Audio.Sound();
thumpsoundObject.loadAsync(require('./assets/sounds/thumpit.m4a'));
const doublethumpsoundObject = new Audio.Sound();
doublethumpsoundObject.loadAsync(require('./assets/sounds/doublethump.m4a'));
const swipeupsoundObject = new Audio.Sound();
swipeupsoundObject.loadAsync(require('./assets/sounds/swipeup.m4a'));
const swipedownsoundObject = new Audio.Sound();
swipedownsoundObject.loadAsync(require('./assets/sounds/swipedown.m4a'));
const swipeleftsoundObject = new Audio.Sound();
swipeleftsoundObject.loadAsync(require('./assets/sounds/swipeleft.m4a'));
const swiperightsoundObject = new Audio.Sound();
swiperightsoundObject.loadAsync(require('./assets/sounds/swiperight.m4a'));
const losesoundObject = new Audio.Sound();
losesoundObject.loadAsync(require('./assets/sounds/losesound.mp3'));
const tutorialsoundObject = new Audio.Sound();
tutorialsoundObject.loadAsync(require('./assets/sounds/tutorial.m4a'));

function HomeScreen({ navigation }) {
  useEffect(() => {
    gamesoundObject.stopAsync();
    menusoundObject.playAsync();
  });
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

function rng() {
  return Math.floor(Math.random()*6);
}
let commands = ['Thump It!', 'Double Thump It!', "Swipe Up!", "Swipe Down!", "Swipe Left!", "Swipe Right!"];
let timer = null

function PlayScreen({ navigation }) {
  //game music
  useEffect(() => {
    menusoundObject.stopAsync();
    gamesoundObject.playAsync();
    return function cleanup() {
      gamesoundObject.stopAsync();
    }
  });

  return (
    <View style={styles.playscreen}>
      <Text style={styles.font}>Ready?</Text>
      <TouchableOpacity 
        style = {styles.beginbutton}
        //onPress = {() => navigation.push(commands[rng()])}>
        onPress = {() => navigation.push(commands[0], {
          time: 5000,
          score: 0
        })}>
        <Text style = {styles.buttonfont}>Begin!</Text>
      </TouchableOpacity>
    </View>
  )
} 

function ThumpScreen({ route, navigation }) {
  const { time } = route.params;
  const { score } = route.params;
  useEffect(() => {
    thumpsoundObject.stopAsync();
    thumpsoundObject.playAsync();
    doublethumpsoundObject.stopAsync();
    swipeupsoundObject.stopAsync();
    swipedownsoundObject.stopAsync();
    swipeleftsoundObject.stopAsync();
    swiperightsoundObject.stopAsync();
    timer = setTimeout(function(){
      navigation.push('LoseScreen', {
        score: score
      });
    }, time)
  })
  return (
    <View style={styles.thumpscreen}>
      <DoubleClick
        style = {styles.thumpbutton}
        singleTap = {() => {
          clearTimeout(timer);
          navigation.push(commands[rng()], {
            time: time - 300,
            score: score + 1
          })
        }}
        doubleTap = {() => {
          clearTimeout(timer);
          navigation.push('LoseScreen', {
            score: score
          });
        }}
        delay={200}
        >
        <Text style = {styles.buttonfont}>Thump It!</Text>
      </DoubleClick>
    </View>
  )
}

function DoubleThumpScreen({ route, navigation }) {
  const { time } = route.params;
  const { score }  = route.params;
  useEffect(() => {
    doublethumpsoundObject.stopAsync();
    doublethumpsoundObject.playAsync();
    thumpsoundObject.stopAsync();
    swipeupsoundObject.stopAsync();
    swipedownsoundObject.stopAsync();
    swipeleftsoundObject.stopAsync();
    swiperightsoundObject.stopAsync();
    timer = setTimeout(function(){
      navigation.push('LoseScreen', {
        score: score
      });
    }, time)
  })
  return (
    <View style={styles.doublethumpscreen}>
      <DoubleClick
        style = {styles.thumpbutton}
        doubleTap = {() => {
          clearTimeout(timer);
          navigation.push(commands[rng()], {
            time: time - 300,
            score: score + 1
          })
        }}
        singleTap = {() => {
          clearTimeout(timer);
          navigation.push('LoseScreen', {
            score: score
          });
        }}
        delay={200}
        >
        <Text style = {styles.buttonfont}>Double Thump It!</Text>
      </DoubleClick>
    </View>
  )
}

function SwipeUpScreen({ route, navigation }) {
  const { time } = route.params;
  const { score } = route.params
  useEffect(() => {
    swipeupsoundObject.stopAsync();
    swipeupsoundObject.playAsync();
    thumpsoundObject.stopAsync();
    doublethumpsoundObject.stopAsync();
    swipedownsoundObject.stopAsync();
    swipeleftsoundObject.stopAsync();
    swiperightsoundObject.stopAsync();
    timer = setTimeout(function(){
      navigation.push('LoseScreen', {
        score: score
      });
    }, time)
  });
  return (
    <View style={styles.swipeupscreen}>
      <GestureRecognizer 
        onSwipe = {(direction) => {
          if (direction == "SWIPE_UP") {
            clearTimeout(timer);
            navigation.push(commands[rng()], {
              time: time - 300,
              score: score + 1
            })
          }
          else {
            clearTimeout(timer);
            navigation.push('LoseScreen', {
              score: score
            });
          }
        }}
        config={{
          velocityThreshold: 0.1,
          directionalOffsetThreshold: 50,
        }}
        style = {SwipeUpScreen}
      >
        <Text style = {styles.buttonfont}>Swipe Up!</Text>
      </GestureRecognizer>
    </View>
  )
}

function SwipeDownScreen({ route, navigation }) {
  const { time } = route.params;
  const { score } = route.params
  useEffect(() => {
    swipedownsoundObject.stopAsync();
    swipedownsoundObject.playAsync();
    thumpsoundObject.stopAsync();
    doublethumpsoundObject.stopAsync();
    swipeupsoundObject.stopAsync();
    swipeleftsoundObject.stopAsync();
    swiperightsoundObject.stopAsync();
    timer = setTimeout(function(){
      navigation.push('LoseScreen', {
        score: score
      });
    }, time)
  });
  return (
    <View style={styles.swipedownscreen}>
      <GestureRecognizer 
        onSwipe = {(direction) => {
          if (direction == "SWIPE_DOWN") {
            clearTimeout(timer);
            navigation.push(commands[rng()], {
              time: time - 300,
              score: score + 1
            })
          }
          else {
            clearTimeout(timer);
            navigation.push('LoseScreen', {
              score: score
            });
          }
        }}
        config={{
          velocityThreshold: 0.1,
          directionalOffsetThreshold: 50,
        }}
        style = {SwipeDownScreen}
      >
        <Text style = {styles.buttonfont}>Swipe Down!</Text>
      </GestureRecognizer>
    </View>
  )
}

function SwipeLeftScreen({ route, navigation }) {
  const { time } = route.params;
  const { score } = route.params
  useEffect(() => {
    swipeleftsoundObject.stopAsync();
    swipeleftsoundObject.playAsync();
    thumpsoundObject.stopAsync();
    doublethumpsoundObject.stopAsync();
    swipeupsoundObject.stopAsync();
    swipedownsoundObject.stopAsync();
    swiperightsoundObject.stopAsync();
    timer = setTimeout(function(){
      navigation.push('LoseScreen', {
        score: score
      });
    }, time)
  });
  return (
    <View style={styles.swipeleftscreen}>
      <GestureRecognizer 
        onSwipe = {(direction) => {
          if (direction == "SWIPE_LEFT") {
            clearTimeout(timer);
            navigation.push(commands[rng()], {
              time: time - 300,
              score: score + 1
            })
          }
          else {
            clearTimeout(timer);
            navigation.push('LoseScreen', {
              score: score
            });
          }
        }}
        config={{
          velocityThreshold: 0.1,
          directionalOffsetThreshold: 50,
        }}
        style = {SwipeLeftScreen}
      >
        <Text style = {styles.buttonfont}>Swipe Left!</Text>
      </GestureRecognizer>
    </View>
  )
}

function SwipeRightScreen({ route, navigation }) {
  const { time } = route.params;
  const { score } = route.params
  useEffect(() => {
    swiperightsoundObject.stopAsync();
    swiperightsoundObject.playAsync();
    thumpsoundObject.stopAsync();
    doublethumpsoundObject.stopAsync();
    swipeupsoundObject.stopAsync();
    swipedownsoundObject.stopAsync();
    swipeleftsoundObject.stopAsync();
    timer = setTimeout(function(){
      navigation.push('LoseScreen', {
        score: score
      });
    }, time)
  });
  return (
    <View style={styles.swiperightscreen}>
      <GestureRecognizer 
        onSwipe = {(direction) => {
          if (direction == "SWIPE_RIGHT") {
            clearTimeout(timer);
            navigation.push(commands[rng()], {
              time: time - 300,
              score: score + 1
            })
          }
          else {
            clearTimeout(timer);
            navigation.push('LoseScreen', {
              score: score
            });
          }
        }}
        config={{
          velocityThreshold: 0.1,
          directionalOffsetThreshold: 50,
        }}
        style = {SwipeRightScreen}
      >
        <Text style = {styles.buttonfont}>Swipe Right!</Text>
      </GestureRecognizer>
    </View>
  )
}

function LoseScreen({route, navigation}) {
  useEffect(() => {
    losesoundObject.playAsync();
    gamesoundObject.stopAsync();
    thumpsoundObject.stopAsync();
    doublethumpsoundObject.stopAsync();
    swipeupsoundObject.stopAsync();
    swipedownsoundObject.stopAsync();
    swipeleftsoundObject.stopAsync();
    swiperightsoundObject.stopAsync();

    return function cleanup() {
      losesoundObject.stopAsync();
    }
  });
  const { score } = route.params
  return (
    <View style={styles.playscreen}>
      <TouchableOpacity 
        style = {styles.beginbutton}
        //onPress = {() => navigation.push(commands[rng()])}>
        onPress = {() =>  navigation.dispatch(StackActions.popToTop())}>
        <Text style={styles.font}>You Lost!</Text>
        <Text style={styles.font}>You scored: {score}</Text>
        <Text style = {styles.buttonfont}>Home</Text>
      </TouchableOpacity>
    </View>
  )
}

function TutorialScreen({ navigation }) {
  useEffect(() => {
    menusoundObject.stopAsync();
    tutorialsoundObject.playAsync();
    return function cleanup() {
      tutorialsoundObject.stopAsync();
    }
  })
  return (
    <View style={styles.tutorialscreen}>
      <TouchableOpacity
        onPress = {() =>  navigation.dispatch(StackActions.popToTop())}>
        <Text style={styles.font}>
        Welcome to Thump It! An accessible mobile game!{"\n"} {"\n"}
        When you tap PLAY and then BEGIN! A command will both be spoken to you as well as appear on the screen. 
        You only have a certain amount of time to complete the command, and if you do the wrong thing, you lose! {"\n"} {"\n"}
        The catch is: every time you complete a command, the amount of time you have to do the next one decreases. {"\n"} {"\n"}
        Try to complete as many as you can before the time runs out!{"\n"} {"\n"}
        Tap anywhere to return
        </Text>
      </TouchableOpacity>
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
          name = "LoseScreen" 
          component={LoseScreen} 
          options = {{
            headerShown: false,
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
          name = "Double Thump It!" 
          component={DoubleThumpScreen} 
          options = {{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name = "Swipe Up!" 
          component={SwipeUpScreen} 
          options = {{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name = "Swipe Down!" 
          component={SwipeDownScreen} 
          options = {{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name = "Swipe Left!" 
          component={SwipeLeftScreen} 
          options = {{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name = "Swipe Right!" 
          component={SwipeRightScreen} 
          options = {{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
