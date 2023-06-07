import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import {auth} from './src/firebase';
import {onAuthStateChanged} from 'firebase/auth';
import AppStack from './src/stacks/AppStack';
import AuthStack from './src/stacks/AuthStack';

const Stack = createStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, _user => {
      setUser(_user);
      if (initializing) {
        setInitializing(false);
      }
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, [initializing]);

  if (initializing) {
    return null; // Render a loading screen if Firebase initialization is in progress
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <Stack.Screen name="AppStack" component={AppStack} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
