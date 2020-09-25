import React, { Component, useEffect, useState } from "react";
import { Text, View } from "react-native";
export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
    };
  }

  componentDidMount() {
    const { fullName, email } = this.props.extraData;
    this.setState({
      fullName: fullName,
      email: email,
    });
  }
  render() {
    return (
      <View>
        <Text>Welcome to profile screen</Text>
        <Text>Name:{this.state.fullName}</Text>
        <Text>Email ID:{this.state.email}</Text>
      </View>
    );
  }
}
