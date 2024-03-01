import {StyleSheet, Text, View} from 'react-native';
import AuthScreen from "./src/screens/AuthScreen";
import PaymentScreen from "./src/screens/PaymentScreen";
import {useEffect, useState} from "react";
import * as LocalAuthentication from 'expo-local-authentication'
import {SecurityLevel} from "expo-local-authentication";

export default function App() {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible)
    })();
  }, []);

  const onAuthenticate = () => {
    const auth = LocalAuthentication.authenticateAsync({
      promptMessage: 'Please login to continue',
      cancelLabel: 'Cancelar',
      fallbackLabel:'Enter password',
      disableDeviceFallback: true
    });
    auth.then(result => {
      setIsAuthenticated(result.success);
      console.log('auth', result)
    })
  }
  return (
    <View style={styles.container}>
      {
        isAuthenticated ? <PaymentScreen setIsAuthenticated={setIsAuthenticated}/>
          : <AuthScreen onAuthenticate={onAuthenticate}/>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
