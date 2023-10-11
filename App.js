import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayUsername, setDisplayUsername] = useState("");
  const [displayPassword, setDisplayPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSaveData = async () => {
    if (username.trim() === "" || password.trim() === "") {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("password", password);
      console.log("Dữ liệu đã được lưu trữ thành công.");
      setErrorMessage("");
    } catch (error) {
      console.log("Lỗi khi lưu trữ dữ liệu:", error);
    }
  };

  const handleGetData = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem("username");
      const storedPassword = await AsyncStorage.getItem("password");
      if (storedUsername && storedPassword) {
        setDisplayUsername(storedUsername);
        setDisplayPassword(storedPassword);
      } else {
        console.log("Không tìm thấy dữ liệu.");
      }
    } catch (error) {
      console.log("Lỗi khi lấy dữ liệu:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      {errorMessage !== "" && <Text style={styles.error}>{errorMessage}</Text>}
      <Button title="Lưu dữ liệu" onPress={handleSaveData} />
      <Button title="Lấy dữ liệu" onPress={handleGetData} />

      <Text>Username: {displayUsername}</Text>
      <Text>Password: {displayPassword}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default App;
