import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './components/login/Login';
import SignUp from './components/register/SignUp';
import Home from './components/home/Home';

import {cometChatConfig} from './env';

import {showMessageWithActions} from './services/ui';

import Context from './context';

import Logout from './images/logout.svg';

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);

  const initCometChat = async () => {
    const appID = `${cometChatConfig.cometChatAppId}`;
    const region = `${cometChatConfig.cometChatRegion}`;
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .build();
    CometChat.init(appID, appSetting).then(
      () => {
        console.log('CometChat was initialized successfully');
      },
      (error) => {},
    );
  };

  const initAuthenticatedUser = async () => {
    const authenticatedUser = await AsyncStorage.getItem('auth');
    setUser(() => (authenticatedUser ? JSON.parse(authenticatedUser) : null));
  };

  useEffect(() => {
    initCometChat();
    initAuthenticatedUser();
  }, []);

  const logout = (navigation) => () => {
    showMessageWithActions({
      title: 'Confirm',
      message: 'Do you want to log out?',
      actions: [
        {text: 'Cancel'},
        {text: 'OK', onPress: () => handleLogout(navigation)},
      ],
    });
  };

  const handleLogout = async (navigation) => {
    await CometChat.logout();
    removeAuthedInfo();
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  const removeAuthedInfo = () => {
    AsyncStorage.removeItem('auth');
    setUser(null);
  };

  if (user) {
    return (
      <Context.Provider value={{user, setUser}}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={({navigation}) => ({
                headerStyle: {
                  backgroundColor: '#fff',
                },
                headerRight: () => (
                  <View style={styles.homeHeaderRight}>
                    <TouchableOpacity onPress={logout(navigation)}>
                      <Logout width={24} height={24} />
                    </TouchableOpacity>
                  </View>
                ),
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Context.Provider>
    );
  }

  return (
    <Context.Provider value={{user, setUser}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
};

const styles = StyleSheet.create({
  homeHeaderRight: {
    flexDirection: 'row',
  },
});

export default App;
