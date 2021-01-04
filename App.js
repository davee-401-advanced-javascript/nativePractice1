import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

import { Container, Header, Content } from 'native-base';

import { Button } from 'native-base';

export default function App() {

  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [subscription, setSubscription] = useState(null);

  const [personScore, setPersonScore] = useState(0);

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(100);
  };

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };


  const startButton = () => {
    // create 3 second timer
      // find count down timer
      // find buzz
      // find sound
    
  }

  // useEffect(() => {
  //   // _subscribe();
  //   // return () => _unsubscribe();
  // }, []);

  const { x, y, z } = data;





  return (
    <View style={styles.container}>

      <View style={styles.titleArea}>
        <Text style={styles.titleText}>Measure your Punch Speed</Text>
      </View>

      <View style={styles.scoreArea}>
        <Text > Your Accelleration: </Text>
        <Text style={styles.score}> {personScore} </Text>
      </View>

      <View style={styles.recordArea}>
        <Text style={styles.text}> Press Start to Record</Text>
        <TouchableOpacity style={styles.button}>
          <Text>START</Text>
        </TouchableOpacity>
      </View>


      <Text style={styles.text}>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
      <Text style={styles.text}>
        x: {round(x)} y: {round(y)} z: {round(z)}
      </Text>
      
      <View style={styles.buttonContainer}>

        <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
          <Text>{subscription ? 'On' : 'Off'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
          <Text>Slow</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 1000) / 1000;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  titleArea: {
    marginTop: 80,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 50,
  },
  titleText: {
    fontSize: 24,
    textAlign: 'center',
  },
  scoreArea: {
    height: '25%',
    width: '60%',
    backgroundColor: 'lightgreen',
    alignItems: 'center',
    marginLeft: '20%'
  },
  score: {
    fontSize: 80
  },
  recordArea: {
    height: '10%',
    marginTop: 20,
    borderColor: 'black',
    marginBottom: 100
  },
  text: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
});