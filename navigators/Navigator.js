import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Home, Profile, Single} from '../views/index';
import ActionBarIcon from '../components/ActionBarIcon';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const menuIcon = () => {
  return <ActionBarIcon iconName={'menu'} />;
};
const loginIcon = () => {
  return <ActionBarIcon iconName={'log-in'} />;
};
const backIcon = () => {
  return <ActionBarIcon iconName={'arrow-left'} />;
};
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
      headerLeft: backIcon,
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
      headerLeft: menuIcon,
      headerRight: loginIcon,
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
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={TabScreen} options={HeaderOptions} />
      <Stack.Screen name="Single" component={Single} options={HeaderOptions} />
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