import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, Button, Text, Switch} from 'react-native-paper';
import {auth, db} from '../firebase';
import {doc, getDoc, setDoc} from 'firebase/firestore';
import {signOut} from 'firebase/auth';
import DatePicker from 'react-native-date-picker';

const ProfileScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [answer, setAnswer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userId = auth.currentUser.uid;

        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setName(userData.name || '');
          setDateOfBirth(
            userData.dateOfBirth ? userData.dateOfBirth.toDate() : new Date(),
          );
          setAnswer(userData.answer || false);
        }
        setLoading(false);
      } catch (error) {
        // Handle error while fetching user data
        console.log(error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // User signed out successfully
        navigation.replace('Login');
      })
      .catch(error => {
        console.log(error);
        // Handle logout error
      });
  };

  const handleSave = () => {
    const userId = auth.currentUser.uid;

    setLoading(true);

    setDoc(doc(db, 'users', userId), {
      name,
      dateOfBirth: dateOfBirth,
      answer,
    })
      .then(() => {
        console.log('User data saved successfully!');
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        // Handle error while saving data
      });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <Button onPress={handleLogout} color="#fff" mode="text">
          Log out
        </Button>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  return (
    <View style={styles.main}>
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
      />
      <View style={styles.dobwrap}>
        <Text> Select date of birth</Text>
        <Button
          mode="outlined"
          style={styles.dob}
          onPress={() => setOpen(true)}>
          {dateOfBirth.toDateString()}
        </Button>
        <DatePicker
          modal
          open={open}
          date={dateOfBirth}
          onConfirm={date => {
            setOpen(false);
            setDateOfBirth(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
      <View style={styles.switch}>
        <Text>Answer (Yes/No):</Text>
        <Switch value={answer} onValueChange={setAnswer} color="#6200EE" />
      </View>
      <Button
        loading={loading}
        disabled={loading}
        onPress={handleSave}
        mode="contained">
        {loading ? 'Loading' : 'Save'}
      </Button>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  switch: {
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  dobwrap: {
    width: '100%',
    marginBottom: 20,
  },
  dob: {
    borderRadius: 4,
    alignItems: 'flex-start',
  },
});
