import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Image, ActivityIndicator } from 'react-native';
/**
 * "StAuth10244: I Gabriel Diaconu, 000799618 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."
 * Main component representing the entire application.
 */
export default function App() {
  //States
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [content, setContent] = useState('Click buttons to find show name');
  const [textInputValue, setTextInputValue] = useState('');

  /**
   * Fetches show details from TVMaze API by ID.
   * @param {number} id - ID of the show to fetch.
   * @param {string} info - Additional information about the show.
   */
  async function getShow(id, info) {
    try {
      const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
      const json = await response.json();
      console.log(json);
      setContent(`${info}: ${json.name}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
/**
   * Handler function for fetching show by ID from user input.
   */
  const fetchShow = () => {
    const id = parseInt(textInputValue);
    if (!isNaN(id)) {
      getShow(id, `Show ${id}`);
    } else {
      setContent('Invalid input. Please enter a valid ID.');
    }
  };
/**
   * Renders each individual show item.
   * @param {object} item - The show item to render.
   */
  const renderShowItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image source={require('./assets/shows.jpg')} style={styles.image} />
      <Text style={styles.title}>Show the top 5 TV shows ranked from highest to lowest:</Text>
      <View style={styles.buttonContainer}>
        <Button onPress={() => { getShow(169, 'Show 1') }} title="Highest ranked" />
        <Button onPress={() => { getShow(82, 'Show 2') }} title="Second highest" />
        <Button onPress={() => { getShow(179, 'Show 3') }} title="Third Highest" />
        <Button onPress={() => { getShow(73, 'Show 4') }} title="Fourth Highest" />
        <Button onPress={() => { getShow(5, 'Show 5') }} title="Fifth Highest" />
      </View>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setTextInputValue(text)}
        value={textInputValue}
        placeholder="Enter show ID"
        keyboardType="numeric"
      />
      <Button onPress={fetchShow} title="Fetch Show By Id" />
      <Text style={styles.content}>{content}</Text>
      <FlatList
        data={data}
        renderItem={renderShowItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>© Gabriel Diaconu 000799618 {new Date().getFullYear()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#FAEBD7',
    padding: 20,
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  image: {
    width: 200,
    height: 100,
    marginBottom: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    marginBottom: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  footerText: {
    fontSize: 12,
  },
});
