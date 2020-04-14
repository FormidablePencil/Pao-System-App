import React, { Component } from 'react'
import { View, Text } from 'react-native-tailwind'
import { Image, Animated, Button } from 'react-native';

export default class AnimComp extends Component {
  constructor() {
    super();
    this.springValue = new Animated.Value(0);
    this.state = {
      widthImg: 0,
      height: 0
    }
  }

  spring() {
    this.springValue.setValue(0.3)
    Animated.spring( //~ this is the data the jsx element is using for transform scaling purposes
      this.springValue,
      {
        toValue: 1,
        friction: 1,

      }
    ).start();

    this.setState({
      widthImg: 300,
      heightImg: 300,
    })
  }

  componentDidMount() {
    this.springValue.setValue(0)
  }

  render() {

    return (
      <View classNmae="self-center">
        <Animated.Image onPress={this.spring.bind(this)} style={{ width: this.state.widthImg, height: this.state.widthImg, transform: [{ scale: this.springValue }] }} source={require('../assets/gear-option.png')} />
        <Button style={{ marginBottom: 100 }} onPress={this.spring.bind(this)} title='Spring' />
        <Text>heyroogo</Text>
      </View>

    )
  }
}

