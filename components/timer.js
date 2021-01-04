// import React from 'react';
// import { StyleSheet,  View } from 'react-native';

// import ReactDOM from "react-dom";
// import { CountdownCircleTimer } from "react-countdown-circle-timer";


// const renderTime = ({ remainingTime }) => {
//   if (remainingTime === 0) {
//     return <View style={styles.timer}>RECORDING</View>;
//   }

//   return (
//     <View style={styles.timer}>
//       <View style={styles.text}>Recording in:</View>
//       <View style={styles.value}>{remainingTime}</View>
//       <View style={styles.text}>seconds</View>
//     </View>
//   );
// };

// export default function Timer() {
//   return (
//     <View style={styles.timerWrapper}>
//       <CountdownCircleTimer
//         isPlaying
//         duration={3}
//         colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
//         onComplete={() => [true, 1000]}
//       >
//         {renderTime}
//       </CountdownCircleTimer>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   timerWrapper: {
//     display: 'flex',
//     justifyContent: 'center'
//   },
//   timer: {
//     fontFamily: "Montserrat",
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   text: {
//     color: '#aaa'
//   },
//   value: {
//     fontSize: 40,
//   }
// })