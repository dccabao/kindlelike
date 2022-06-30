import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  PermissionsAndroid,
  TouchableOpacity,
  StyleSheet,
  Touchable,
} from 'react-native';
import RNFS from 'react-native-fs';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const [files, setFiles] = useState([]);
  const [permission, setPermission] = useState(false);

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
        setPermission(true);
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

  const getFileContent = async path => {
    const reader = await RNFS.readDir(path);
    setFiles(reader);
  };
  useEffect(() => {
    requestReadStorage();
    if (permission) {
      getFileContent(RNFS.DownloadDirectoryPath); //run the function if permission is true
    }
  }, [permission]);
  //this component will render our list item to the UI

  const handleOnPress = name => {
    console.log('im being pressed', name);
    navigation.navigate('Book');
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
    console.log('item', item)
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Book', {item})}>
        <View>
          <Text>{index}</Text>
          {/* The isFile method indicates whether the scanned content is a file or a folder*/}
          <Item name={item.name} isFile={item.isFile()} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={files}
        renderItem={renderItem}
        keyExtractor={item => item.name}
      />
    </View>
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

export default Home;
