import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addNewPost } from "../features/notesSlice";

export default function NotesScreenAdd() {
  const navigation = useNavigation();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [notePrice, setNotePrice] = useState("");
  const dispatch = useDispatch();	
  const canSave = [noteTitle, noteBody].every(Boolean);	
  
  async function savePost() {	
    if (canSave) {	
      try {	
        const post = {	
          id: nanoid(),	
          title: noteTitle,	
          content: noteBody,
          price: notePrice,	
        };	
        await dispatch(addNewPost(post));	
      } catch (error) {	
        console.error("Failed to save the post: ", error);	
      } finally {	
        navigation.goBack();	
      }	
    }	
  }
  return (
     <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome name={"arrow-left"} size={24} color={"black"} />
      </TouchableOpacity>
      <TextInput
        style={styles.noteTitle}
        placeholder={"Your food name"}
        value={noteTitle}
        onChangeText={(text) => setNoteTitle(text)}
        selectionColor={"gray"}
      />
      <TextInput
        style={styles.noteBody}
        placeholder={"Describe your food"}
        value={noteBody}
        onChangeText={(text) => setNoteBody(text)}
        selectionColor={"gray"}
        multiline={true}
      />
      <TextInput
        style={styles.notePrice}
        placeholder={"Set the price of your food"}
        value={notePrice}
        onChangeText={(text) => setNotePrice(text)}
        selectionColor={"gray"}
        multiline={true}
      />

      
      <TouchableOpacity	
        style={styles.outlinedButton}	
        onPress={() => navigation.navigate(CAMERA_SCREEN)}	
      >	
        <Text style={styles.outlinedButtonText}>Upload Photo</Text>	
      </TouchableOpacity>



      <View style={{ flex: 1 }} />
      <TouchableOpacity 
        style={styles.button} 
        onPress={async () => await savePost()}
        >
        <Text style={styles.buttonText}>Add Food</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffde59",
    paddingTop: 60,
    padding: 25,
  },
  noteTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 25,
  },
  noteBody: {
    fontSize: 15,
    fontWeight: "400",
  },
  notePrice: {
    fontSize: 15,
    fontWeight: "400",
  },
  button: {
    backgroundColor: "#ED2227",
    borderRadius: 15,
    width: "100%",
    marginBottom: 20,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 17,
    padding: 20,
    color: "white",
  },
  outlinedButtonText: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 12,
    padding: 15,
    color: "white",
    backgroundColor: "#E1B086",
    borderRadius: 15,
  },
});