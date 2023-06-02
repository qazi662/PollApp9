import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import firebase from 'react-native-firebase';
//import * as firebase from "firebase/app";
class LoginScreen extends Component {

  state = {
    username: '',
    password: '',
  };

  onSignIn = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
      .then(() => {
        this.props.navigation.navigate('Profile');
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <View>
        <Text>Login</Text>
        <TextInput
          placeholder="Username"
          onChangeText={(username) => this.setState({ username })}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(password) => this.setState({ password })}
          secureTextEntry={true}
        />
        <Button
          title="Sign In"
          onPress={this.onSignIn}
        />
      </View>
    );
  }
}

class ProfileScreen extends Component {

  state = {
    name: '',
    nick: '',
    birthday: '',
    gender: '',
    agree: false,
    about: '',
  };

  render() {
    return (
      <View>
        <Text>Profile</Text>
        <TextInput
          placeholder="Name"
          onChangeText={(name) => this.setState({ name })}
        />
        <TextInput
          placeholder="Nick"
          onChangeText={(nick) => this.setState({ nick })}
        />
        <TextInput
          placeholder="Birthday"
          onChangeText={(birthday) => this.setState({ birthday })}
        />
        <TextInput
          placeholder="Gender"
          onChangeText={(gender) => this.setState({ gender })}
        />
        <Switch
          value={this.state.agree}
          onChange={(agree) => this.setState({ agree })}
        />
        <TextInput
          placeholder="About"
          multiline={true}
          onChangeText={(about) => this.setState({ about })}
        />
      </View>
    );
  }
}

export default class App extends Component {

  render() {
    return (
      <View>
        <LoginScreen />
        <ProfileScreen />
      </View>
    );
  }
}
