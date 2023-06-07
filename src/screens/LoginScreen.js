import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {auth} from '../firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = () => {
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(_userCredential => {
        // User signed in successfully
        setLoading(false);
        setError(null);
      })
      .catch(_error => {
        setLoading(false);
        console.log(_error);
        setError(_error.message);
      });
  };

  const handleSignupLink = () => {
    navigation.navigate('Signup');
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
        onPress={handleLogin}
        loading={loading}
        style={styles.btn}
        disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </Button>
      {error && <Text style={styles.err}>{error}</Text>}
      <Button mode="text" onPress={handleSignupLink}>
        Dont have an account? Sign up
      </Button>
    </View>
  );
};

export default LoginScreen;

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
