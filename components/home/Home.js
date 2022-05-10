import React from 'react';
import {View, StyleSheet} from 'react-native';
import {CometChatUI} from '../../cometchat-pro-react-native-ui-kit-3/src/index';

const Home = () => {
  return (
    <View style={styles.container}>
      <CometChatUI />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1EFE3',
    flex: 1,
    position: 'relative',
  },
});

export default Home;
