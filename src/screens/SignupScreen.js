import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {auth} from '../firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignup = () => {
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // User signed up successfully
        setLoading(false);
        console.log(userCredential.user);
        setError(null);
        // Redirect or perform any desired action
      })
      .catch(_error => {
        setLoading(false);
        console.log(_error);
        setError(_error.message);
      });
  };

  const handleLoginLink = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.main}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleSignup}
        loading={loading}
        style={styles.btn}
        disabled={loading}>
        {loading ? 'Signing up...' : 'Sign Up'}
      </Button>
      {error && <Text style={styles.err}>{error}</Text>}
      <Button mode="text" onPress={handleLoginLink}>
        Already have an account? Login
      </Button>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  main: {
    marginHorizontal: 20,
    marginTop: 50,
  },
  input: {
    marginBottom: 10,
  },
  btn: {
    marginBottom: 50,
  },
  err: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
});
