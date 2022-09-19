import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState, useEffect } from "react";

import {
    ActivityIndicator,
    Keyboard,
    LayoutAnimation,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    UIManager,
    View,
  } from "react-native";
import {API, API_LOGIN, API_SIGNUP, HOME_STACK} from "../constants";
  
if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
 
  
  //import { PROFILE_SCREEN, API, API_LOGIN, API_SIGNUP } from "../constants";
  
  export default function AuthScreen() {
    const navigation = useNavigation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");
    const [loading, setLoading] = useState(false);
    const [isLoginScreen, setIsLoginScreen] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
      return () => setLoading(false);
    }, []);
  


    function resetTextInputs(){
      setUsername ('')
      setConfirmPassword ('')
      setPassword ('')


    }
    async function signUp() {	
      setLoading(true);	
      if (password != confirmPassword) {	
        setErrorText("Your passwords don't match. Check and try again.");	
      } else {	
        try {	
          const response = await axios.post(API + API_SIGNUP, {	
            username,	
            password,	
          });	
          if (response.data.Error) {	
            // We have an error message for if the user already exists	
            setLoading(false);
            setErrorText(response.data.Error);	
          } else {	
            login();	
          }	
        } catch (error) {	
          console.log("Failed logging in. Error: ", error.response);	
          setErrorText(error.response.data.description);	
        }	finally {
          setLoading(false);
          LayoutAnimation.spring();
        }
      }	
    }

    async function login() {
      setLoading(true);
      Keyboard.dismiss();
      try {
        const response = await axios.post(API + API_LOGIN, {
          username,
          password,
        });
        await AsyncStorage.setItem("token", response.data.access_token);
        resetTextInputs()
        navigation.navigate(HOME_STACK);
      } catch (error) {
        console.log(error.response);
        setErrorText(error.response.data.description);
      }	finally {
        setLoading(false);
        LayoutAnimation.spring();
      }
    }
    return (
      
      <View style={styles.container}>
         
        <Text style={styles.title}>
          
          {isLoginScreen ? "Login to your account" : "Register new account"}
          </Text>
  
        <TextInput
          style={styles.inputView}
          placeholder="Email"
          value={username}
          onChangeText={(username) => setUsername(username)}
        />
  
        <TextInput
          style={styles.inputView}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(pw) => setPassword(pw)}
        />
  
      {!isLoginScreen && (
        <View style={styles.inputView}>
          <TextInput
          style={styles.TextInput}
          placeholder="Password Confirm"
          secureTextEntry = {true}
          onChangeText={(pw) => setConfirmPassword(pw)} 
          />
          </View>

      )}

        <TouchableOpacity
          style={loading ? styles.buttonLoading : styles.button}
          onPress={async () => {
            LayoutAnimation.spring();
            setErrorText("");
            isLoginScreen ? await login() : await signUp();
          }}
        >
          {loading ? (
            <ActivityIndicator style={styles.buttonText} />
          ) : (
            <Text style={styles.buttonText}>
              {isLoginScreen ? "Login" : "Register"}
            </Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity	
        onPress={() => {	
          LayoutAnimation.easeInEaseOut();
          setIsLoginScreen(!isLoginScreen);	
          setErrorText("");	
        }}	
      >	
        <Text style={styles.switchText}>	
          {isLoginScreen	
            ? "No account? Sign up now."	
            : "Already have an account? Log in here."}	
        </Text>	
      </TouchableOpacity>
      
        <Text style={styles.errorText}>{errorText}</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    buttonLoading: {
      backgroundColor: "#35251A",
      borderRadius: 15,
      width: "20%",
      marginHorizontal: "40%",
    },
    
    
    switchText: {	
      fontSize: 20,	
      marginTop: 20,	
      color: "gray",	
    },
    errorText: {
      marginTop: 20,
      fontSize: 15,
      color: "red",
    },
    container: {
      flex: 1,
      backgroundColor: "#FFDE59",
      paddingTop: 100,
      padding: 25,
    },
    title: {
      fontWeight: "bold",
      fontSize: 40,
      marginBottom: 50,
    },
    inputView: {
      backgroundColor: "#F1F0F5",
      borderRadius: 5,
      marginBottom: 30,
      padding: 20,
    },
    button: {
      backgroundColor: "#ED2227",
      borderRadius: 15,
      width: "100%",
    },
    buttonText: {
      textAlign: "center",
      fontWeight: "400",
      fontSize: 17,
      padding: 20,
      color: "white",
    },
  });