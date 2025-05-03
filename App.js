/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { createContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './RouteNavigation';
import Store from './src/Store';

import Home from './src/screens/Home';
import NotesList from './src/screens/NotesList';
import AddNote from './src/screens/AddNote';

const App = ()=>{
  const [store, setStore] = useState({});
  const Stack = createNativeStackNavigator();

  return(
    <Store.Provider value={{ store, setStore }}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
          <Stack.Screen name="NotesList" component={NotesList} options={{headerShown:false}}/>
          <Stack.Screen name="AddNote" component={AddNote} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Store.Provider>
  )
}

export default App;
