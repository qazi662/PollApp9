// ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { Text, TextInput, Button, View, Switch } from 'react-native';
import auth from '@react-native-firebase/auth';

function ProfileScreen() {
  const [userEmail, setUserEmail] = useState('');
  const [name, setName] = useState('');
  const [nick, setNick] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [agree, setAgree] = useState(false);
  const [about, setAbout] = useState('');

  useEffect(() => {
    const user = auth().currentUser;
    if (user !== null) {
      setUserEmail(user.email);
    }
  }, []);

  function signOut() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  return (
    <View>
      <Text>Welcome, {userEmail}</Text>
      <TextInput placeholder="Name" onChangeText={setName} value={name} />
      <TextInput placeholder="Nick" onChangeText={setNick} value={nick} />
      <TextInput placeholder="Birthday" onChangeText={setBirthday} value={birthday} />
      <TextInput placeholder="Gender" onChangeText={setGender} value={gender} />
      <View>
        <Text>Agree to terms?</Text>
        <Switch value={agree} onValueChange={setAgree} />
      </View>
      <TextInput placeholder="About" onChangeText={setAbout} value={about} multiline />
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}

export default ProfileScreen;
