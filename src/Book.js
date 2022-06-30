import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import RNFS from 'react-native-fs';

const Book = ({route, navigation}) => {
  const {item} = route.params;
  const filePath = RNFS.DownloadDirectoryPath + `/${item.name}`;
  const [fileData, setFileData] = useState();

  const readFile = async path => {
    const response = await RNFS.readFile(path);
    setFileData(response); //set the value of response to the fileData Hook.
  };

  useEffect(() => {
    readFile(filePath);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        {/* Display the value*/}
        <Text>{fileData}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Book;
