import React, { Component } from 'react';
import { Animated, Image, Easing, Button } from 'react-native';
import { View, Text } from 'react-native-tailwind'
import AnimComp from '../animationEperimentation/AnimComp';

//~ Creating our own wrapper
export class TestingAnimationsScreen extends Component {
  constructor() {
    super();
    this.spinValue = new Animated.Value(0); //@ magic word. The value simply changes from 0 to 1
    this.anotherValue = new Animated.Value(0);
    this.state = {
      toggleJsxCode: false,
      toggleJsxCode2: false,
    }
  };

  spin() {
    this.spinValue.setValue(0)
    Animated.timing( //~ this is where we tell the animation how long, to what value and to what effect 
      this.spinValue,
      {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear
      }
    ).start(() => this.spin())
  }

  anotherAnimation() {
    this.anotherValue.setValue(0)
    Animated.timing(
      this.anotherValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear
      }
    ).start(() => this.anotherAnimation())
  }

  componentDidMount() { //~ When component mounts then fire the spin function
    this.spin()
    this.anotherAnimation()
  }



  render() {
    const spin = this.spinValue.interpolate({ //~ this is where we tell it to change from what to what 
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    const marginLeft = this.anotherValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 300]
    })
    const opacity = this.anotherValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    })
    const movingMargin = this.anotherValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 300, 0]
    })
    const textSize = this.anotherValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [18, 32, 18]
    })
    const rotateX = this.anotherValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['0deg', '180deg', '0deg']
    })

    let toggleJsxCode = this.state.toggleJsxCode;
    let toggleJsxCode2 = this.state.toggleJsxCode2;

    return (
      <View>
        {
          !toggleJsxCode && !toggleJsxCode2 ? (
            <View className="flex h-full justify-around items-center">

              <AnimComp />
              <Button onPress={() => this.setState({ toggleJsxCode: !this.state.toggleJsxCode })} title='open animations' />
            </View>
          ) : (
              <View>


                {/* //~ implement a movement on the y axis */}
                <View className="flex w-full items-center pt-8">
                  <Animated.View style={{ width: 50, height: 20, transform: [{ rotate: spin }], }}>
                    <Animated.View style={{ backgroundColor: 'blue', borderRadius: 100 }}>
                      <Text> hh</Text>
                    </Animated.View>
                  </Animated.View>
                </View>

                <Animated.View
                  style={{
                    marginLeft,
                    height: 30,
                    width: 40,
                    backgroundColor: 'red'
                  }} />
                <Animated.View
                  style={{
                    opacity,
                    marginTop: 10,
                    height: 30,
                    width: 40,
                    backgroundColor: 'blue'
                  }} />
                <Animated.View
                  style={{
                    marginLeft: movingMargin,
                    marginTop: 10,
                    height: 30,
                    width: 40,
                    backgroundColor: 'orange'
                  }} />
                <Animated.Text
                  style={{
                    fontSize: textSize,
                    marginTop: 10,
                    color: 'green'
                  }} >
                  Animated Text!
                </Animated.Text>
                <Animated.View
                  style={{
                    transform: [{ rotateX }],
                    marginTop: 50,
                    height: 30,
                    width: 40,
                    backgroundColor: 'black'
                  }}>
                  <Text style={{ color: 'white' }}>Hello from TransformX</Text>
                </Animated.View>

                {/* //~ this is where we it to spin. */}
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                  <View className="h-64 w-64">

                    <Text className='bg-pink p-8 rounded-full text-white text-2xl'>Animation experimenting</Text>
                  </View>
                </Animated.View>
                <Button onPress={() => this.setState({ toggleJsxCode: !this.state.toggleJsxCode })} title='open animations' />
              </View>

            )

        }
      </View>
    );
  }
}

export default TestingAnimationsScreen