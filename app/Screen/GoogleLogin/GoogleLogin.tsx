// import React, { Component } from 'react'
// import { StyleSheet, Text, View, Alert, Button } from 'react-native'
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-community/google-signin'

// class GoogleLogin extends Component {
//   state = {
//     userInfo: null,
//     error: null,
//   }

//   async componentDidMount() {
//     this._configureGoogleSignIn()
//     await this._getCurrentUser()
//   }

//   _configureGoogleSignIn() {
//     GoogleSignin.configure({
//       webClientId:
//         '513180813098-j9craoej7c4sghhelguofue6js72g4lb.apps.googleusercontent.com',
//       offlineAccess: false,
//     })
//   }

//   async _getCurrentUser() {
//     try {
//       const userInfo = await GoogleSignin.signInSilently()

//       console.log(['userInfo', userInfo])
//       this.setState({ userInfo, error: null })
//     } catch (error: any) {
//       const errorMessage =
//         error?.code === statusCodes?.SIGN_IN_REQUIRED
//           ? 'Please sign in :)'
//           : error?.message
//       this.setState({
//         error: new Error(errorMessage),
//       })
//     }
//   }

//   render() {
//     const { userInfo } = this.state

//     const body = userInfo
//       ? this.renderUserInfo(userInfo)
//       : this.renderSignInButton()
//     return (
//       <View style={[styles.container, styles.pageContainer]}>
//         {this.renderIsSignedIn()}
//         {this.renderGetCurrentUser()}
//         {this.renderGetTokens()}
//         {body}
//       </View>
//     )
//   }

//   renderIsSignedIn() {
//     return (
//       <Button
//         onPress={async () => {
//           const isSignedIn = await GoogleSignin.isSignedIn()
//           Alert.alert(String(isSignedIn))
//         }}
//         title="is user signed in?"
//       />
//     )
//   }

//   renderGetCurrentUser() {
//     return (
//       <Button
//         onPress={async () => {
//           const userInfo = await GoogleSignin.getCurrentUser()
//           Alert.alert(
//             'current user',
//             userInfo ? JSON.stringify(userInfo.user) : 'null',
//           )
//         }}
//         title="get current user"
//       />
//     )
//   }

//   renderGetTokens() {
//     return (
//       <Button
//         onPress={async () => {
//           const isSignedIn = await GoogleSignin.getTokens()
//           Alert.alert('tokens', JSON.stringify(isSignedIn))
//         }}
//         title="get tokens"
//       />
//     )
//   }

//   renderUserInfo(userInfo: any) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.userInfo}>Welcome {userInfo.user.name}</Text>
//         <Text>Your user info: {JSON.stringify(userInfo.user)}</Text>
//         <Button onPress={this._signOut} title="Log out" />
//         {this.renderError()}
//       </View>
//     )
//   }

//   renderSignInButton() {
//     return (
//       <View style={styles.container}>
//         <GoogleSigninButton
//           size={GoogleSigninButton.Size.Standard}
//           // color={GoogleSigninButton.Color.Auto}
//           color={GoogleSigninButton.Color.Light}
//           onPress={this._signIn}
//         />
//         {this.renderError()}
//       </View>
//     )
//   }

//   renderError() {
//     const { error } = this.state
//     if (!error) {
//       return null
//     }
//     // @ts-ignore
//     const text = `${error.toString()} ${error.code ? error.code : ''}`
//     return <Text>{text}</Text>
//   }

//   _signIn = async () => {
//     try {
//       await GoogleSignin.hasPlayServices()
//       const userInfo = await GoogleSignin.signIn()
//       this.setState({ userInfo, error: null })
//     } catch (error: any) {
//       console.log(['error', error])
//       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//         // sign in was cancelled
//         Alert.alert('cancelled')
//       } else if (error.code === statusCodes.IN_PROGRESS) {
//         // operation in progress already
//         Alert.alert('in progress')
//       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//         Alert.alert('play services not available or outdated')
//       } else {
//         Alert.alert('Something went wrong', error.toString())
//         this.setState({
//           error,
//         })
//       }
//     }
//   }

//   _signOut = async () => {
//     try {
//       await GoogleSignin.revokeAccess()
//       await GoogleSignin.signOut()

//       this.setState({ userInfo: null, error: null })
//     } catch (error) {
//       this.setState({
//         error,
//       })
//     }
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   userInfo: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
//   pageContainer: { flex: 1 },
// })
// export default GoogleLogin
