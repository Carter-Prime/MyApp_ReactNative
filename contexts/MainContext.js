import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useFonts} from 'expo-font';

const MainContext = React.createContext({});

const MainProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [update, setUpdate] = useState(0);
  const [loaded, setLoaded] = useFonts({
    ProximaSoftMedium: require('../assets/fonts/ProximaSoft-Medium.ttf'),
    McLarenRegular: require('../assets/fonts/McLaren-Regular.ttf'),
    MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf'),
    MontserratSemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
  });

  return (
    <MainContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        loaded,
        setLoaded,
        update,
        setUpdate,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export {MainContext, MainProvider};
