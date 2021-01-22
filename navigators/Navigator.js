import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Home, Profile, Single, Login} from '../views/index';
import {MainContext} from '../contexts/MainContext';
import ActionBarIcon from '../components/ActionBarIcon';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HeaderOptions = ({route}) => {
  if (route.name === 'Single') {
    return {
      headerTitle: getFocusedRouteNameFromRoute(route),
      headerStyle: {
        backgroundColor: '#560266',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: () => {
        <ActionBarIcon iconName={'arrow-left'} />;
      },
    };
  } else {
    return {
      headerTitle: getFocusedRouteNameFromRoute(route),
      headerStyle: {
        backgroundColor: '#560266',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: () => {
        <ActionBarIcon iconName={'menu'} />;
      },
    };
  }
};

const TabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const [isLoggedIn] = useContext(MainContext);
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Home"
            component={TabScreen}
            options={HeaderOptions}
          />
          <Stack.Screen
            name="Single"
            component={Single}
            options={HeaderOptions}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
        </>
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
