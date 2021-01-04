import React, { useState, useEffect, Component, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';


export default function App() {

  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const { x, y, z } = data;

  const [subscription, setSubscription] = useState(null);
  const [personScore, setPersonScore] = useState(0);

  const xRef = useRef([]);
  const yRef = useRef([]);
  const zRef = useRef([]);

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(50);
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


  // create 3 second timer
    // find count down timer
    // find buzz
    // find sound

  const startButton = () => {

    xRef.current = [];
    yRef.current = [];
    zRef.current = [];

    console.log('Starting Subscription');
    console.log('Start xRef:', xRef);
    console.log('Start yRef:', yRef);
    console.log('Start zRef:', zRef);

    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData);
        xRef.current = [...xRef.current, accelerometerData.x];
        yRef.current = [...yRef.current, accelerometerData.y];
        zRef.current = [...zRef.current, accelerometerData.z];

      })
    );

 
    setTimeout(() => {
      console.log('Ending Subscription');
      Accelerometer.removeAllListeners();

      console.log('xArray:', xRef.current);
      console.log('yArray:', yRef.current);
      console.log('zArray:', zRef.current);

      let highest = findHighestValue(xRef.current, yRef.current, zRef.current).toFixed(2);
      setPersonScore(highest);
    }, 3000);

  }


  function findHighestValue(arr1, arr2, arr3) {

    let highest = 0;

    for(let i = 0; i < arr1.length; i++) {
      if(Math.abs(arr1[i]) > highest) {
        highest = Math.abs(arr1[i]);
      }
      if(Math.abs(arr2[i]) > highest) {
        highest = Math.abs(arr1[i]);
      }
      if(Math.abs(arr3[i]) > highest) {
        highest = Math.abs(arr1[i]);
      }
    }
    return highest;
  }



  


  return (
    <View style={styles.container}>

      <View style={styles.titleArea}>
        <Text style={styles.titleText}>Measure your Punch Speed</Text>
      </View>


      <View style={styles.scoreArea}>
        <Text style={styles.scoreText}> Your MAX Acceleration: </Text>
        <Text style={styles.score}> {personScore} g</Text>
      </View>

      <View style={styles.recordArea}>
        <Text style={styles.text}> Press Start to Record</Text>
        <TouchableOpacity onPress={startButton} style={styles.button}>
          <Text>START</Text>
        </TouchableOpacity>
      </View>


      <Text style={styles.text}>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
      <Text style={styles.text}>
        x: {round(x)} y: {round(y)} z: {round(z)}
      </Text>
      
      <View style={styles.buttonContainer}>

        {/* <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
          <Text>{subscription ? 'On' : 'Off'}</Text>
        </TouchableOpacity> */}

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
    height: '20%',
    width: '80%',
    backgroundColor: 'lightgreen',
    alignItems: 'center',
    marginLeft: '10%'
  },
  scoreText: {
    marginTop: 25
  },
  score: {
    fontSize: 80
  },
  recordArea: {
    height: '10%',
    marginTop: 40,
    borderColor: 'black',
    marginBottom: 100
  },
  text: {
    textAlign: 'center',
    margin: 10
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