import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  PermissionsAndroid,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import RNFS from 'react-native-fs';

const requestReadStorage = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'Your app needs permission.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      console.log('Storage permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const App = () => {
  // const filePath = RNFS.DownloadDirectoryPath + '/sample_book 1.txt';
  // const [fileData, setFileData] = useState();
  // console.log('filepath', RNFS.DownloadDirectoryPath);

  // const readFile = async path => {
  //   const response = await RNFS.readFile(path);
  //   setFileData(response); //set the value of response to the fileData Hook.
  // };
  // useEffect(() => {
  //   requestReadStorage();
  //   readFile(filePath);
  // }, []);

  // return (
  //   <SafeAreaView>
  //     {/* Display the value*/}
  //     <Text>{fileData}</Text>
  //   </SafeAreaView>
  // );

  const [files, setFiles] = useState([]);

  const getFileContent = async path => {
    const reader = await RNFS.readDir(path);
    setFiles(reader);
  };
  useEffect(() => {
    getFileContent(RNFS.DownloadDirectoryPath); //run the function on the first render.
  }, []);
  //this component will render our list item to the UI

  const handleOnPress = () => {
    console.log('im being pressed');
  };

  const Item = ({name, isFile}) => {
    return (
      <View>
        <Text>Name: {name}</Text>
        <Text> {isFile ? 'It is a file' : "It's a folder"}</Text>
      </View>
    );
  };
  const renderItem = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity style={styles.button} onPress={handleOnPress}>
          <Text>{index}</Text>
          {/* The isFile method indicates whether the scanned content is a file or a folder*/}
          <Item name={item.name} isFile={item.isFile()} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <FlatList
        data={files}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 2,
  },
});

export default App;
