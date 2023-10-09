import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  let dangNhap = {
    username: 'duyle',
    password: '123456'
  }

  const [ttDangNhap, setTTDangNhap] = useState('');

  return (
    <View style={styles.container}>
      <Text style ={{fontSize: 40}}>Thong tin dang nhap: {ttDangNhap}</Text>

      <Button title='Luu thong tin' onPress={
        async () => {
          try {
            const jsonValue = JSON.stringify(dangNhap);
            await AsyncStorage.setItem('dangnhap', jsonValue);

            console.log('Da luu')
          } catch (e) {
            // saving error
            console.log(e)
          }
        }
      } />

      <Button title='Lay thong tin' onPress={
        async () => {
          try {

            const jsonValue = await AsyncStorage.getItem('dangnhap');

            let tt = JSON.parse(jsonValue);
            setTTDangNhap(tt.username + " - " + tt.password)
            
          } catch (e) {
            // error reading value
          }

        }
      } />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
