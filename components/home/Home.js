import React from 'react';
import {
  CometChatUI,
  CometChatUserListWithMessages,
  CometChatMessages,
} from '../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/index';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Home = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'CometChatUI'}>
      <Stack.Screen name="CometChatUI" component={CometChatUI} />
      <Stack.Screen
        name="UserListWithMessages"
        component={CometChatUserListWithMessages}
      />
      <Stack.Screen name="CometChatMessages" component={CometChatMessages} />
    </Stack.Navigator>
  );
};

export default Home;
