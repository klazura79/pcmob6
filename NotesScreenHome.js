import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Animated, { SlideInLeft, SlideOutRight } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { API_STATUS, NOTES_SCREEN } from "../constants";
import { fetchPosts } from "../features/notesSlice";

export default function NotesScreenHome() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.notes.posts);
  const notesStatus = useSelector((state) => state.notes.status);
  const isLoading = notesStatus === API_STATUS.pending;

  useEffect(() => {
    if (notesStatus === API_STATUS.idle) {
      dispatch(fetchPosts());
    }
  }, [notesStatus, dispatch]);

  function renderItem({ item }) {
    return (
        <Animated.View
            entering = {SlideInLeft.delay(item.index * 100)}
            exiting = {SlideOutRight.delay(300)}
        >
            <TouchableOpacity 
                style={styles.noteCard} 
                onPress={() => navigation.navigate(NOTES_SCREEN.Details, item)}
                >
                <Text style={styles.noteCardTitle}>{item.title}</Text>
                <Text style={styles.noteCardBodyText}>
                {item.content.substring(0, 120)}
                </Text>
                <Text style={styles.noteCardPriceText}>{item.price}</Text>
                <Image source={require ('../assets/nasilemak.jpg')}
                style={{width: 50, height: 50}} />
            </TouchableOpacity>
        </Animated.View>
    );
  }
  return (
    <View style={styles.container}>
      <Image source={require ('../assets/HomeCook.png')}
       style={{width: 150, height: 150}} />
     
      
      {isLoading && <ActivityIndicator />}

      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(post) => post.id.toString()}
      />

      <View style={{ flex: 1 }} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(NOTES_SCREEN.Add)}
      >
        <Text style={styles.buttonText}>Add Food</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  noteCard: {
    borderColor: "#E1B086",
    backgroundColor: "#FCC992",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  noteCardTitle: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 7,
  },
  noteCardBodyText: {
    fontSize: 12,
    fontWeight: "300",
    fontStyle: 'italic',
  },
  noteCardPriceText: {
    fontSize: 12,
    fontWeight: "300",
    fontStyle: 'italic',
  },
  container: {
    flex: 1,
    backgroundColor: "#ffde59",
    paddingTop: 20,
    padding: 25,
  },
  title: {
    fontWeight: "bold",
    color: "#35251A",
    fontSize: 40,
    marginBottom: 20,
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
