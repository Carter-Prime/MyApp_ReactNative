import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PropTypes from 'prop-types';

import {Home, Profile, Single, Login, Upload} from '../views/index';
import {MainContext} from '../contexts/MainContext';
import ActionBarIcon from '../components/ActionBarIcon';
import Icon from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HeaderOptions = ({navigation, route}) => {
  const backArrow = () => (
    <ActionBarIcon
      iconName={'arrow-left'}
      color="white"
      onBack={() => {
        navigation.goBack();
      }}
    />
  );

  if (route.name === 'Single') {
    return {
      headerTitle: getFocusedRouteNameFromRoute(route),
      headerStyle: {
        backgroundColor: '#55AAAA',
        height: 50,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: backArrow,
    };
  } else {
    return {
      headerTitle: getFocusedRouteNameFromRoute(route),
      headerStyle: {
        backgroundColor: '#55AAAA',
        height: 50,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  }
};

const TabScreen = () => {
  const screenOptions = ({route}) => ({
    tabBarIcon: function tabIcons({focused, color}) {
      let iconName;

      if (route.name === 'Home') {
        iconName = focused ? 'home' : 'home';
      } else if (route.name === 'Profile') {
        iconName = focused ? 'user' : 'user';
      } else if (route.name === 'Upload') {
        iconName = focused ? 'upload-cloud' : 'upload-cloud';
      }

      return <Icon name={iconName} size={30} color={color} />;
    },
  });

  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBarOptions={{
        activeTintColor: '#55AAAA',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Upload" component={Upload} />
    </Tab.Navigator>
  );
};
const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);
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
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
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

TabScreen.propTypes = {
  focused: PropTypes.string,
  color: PropTypes.string,
};

export default Navigator;
