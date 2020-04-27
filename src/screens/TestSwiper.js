import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Button, StyleSheet, Text, View } from 'react-native'
import FlashcardItSelf from '../components/FlashcardItSelf'

// demo purposes only
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i
  }
}

export default class Exemple extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      swipedAllCards: false,
      swipeDirection: '',
      cardIndex: 0,
      flip: false
    }
  }

  renderCard = (card, index) => {
    return (
      <View style={[styles.card, { top: -30 }]}>
        <Text style={styles.text}>{card} - {index}</Text>
      </View>
    )
  };

  onSwiped = (type) => {
    console.log(`on swiped ${type}`)
  }

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    })
  };

  swipeLeft = () => {
    this.swiper.swipeLeft()
  };

  flipCard = () => {

  }

  Flash = (card, index) => {
    console.log(card, '@@121')
    console.log(index)
    if (card) {
      return (
        <View style={{ ...styles.card, top: -30 }}>
          <Text>{card.number}</Text>
          <Text>{card.person}</Text>
          <FlashcardItSelf
            card={card}
            flip={this.state.flip}
          />
        </View>
      )
    } else {
      return (
        // <View style={{ ...styles.card, top: -30 }}>
        <Text>nope</Text>
        // <Text>no pao list...</Text>
        // </View>
      )
    }
  }

  render() {
    if (this.props.pao && this.state.cards !== this.props.pao) this.setState({ ...this.state, cards: this.props.pao })
    // console.log(this.state.cards)
    return (
      <View style={styles.container}>
        <Swiper
          // infinite
          ref={swiper => {
            this.swiper = swiper
          }}
          onSwiped={() => this.onSwiped('general')}
          onSwipedLeft={() => this.onSwiped('left')}
          onSwipedRight={() => this.onSwiped('right')}
          onSwipedTop={() => this.onSwiped('top')}
          onSwipedBottom={() => this.onSwiped('bottom')}
          onTapCard={() => console.log('on tapped')}
          cards={this.state.cards}
          cardIndex={this.state.cardIndex}
          cardVerticalMargin={80}
          renderCard={this.Flash}
          onSwipedAll={this.onSwipedAllCards}
          stackSize={2}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
        >
          <Button onPress={() => this.setState({...this.state, flip: !this.state.flip})} title='flip card' />
        </Swiper>
        <View style={{ height: 100 }}></View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent'
  }
})
