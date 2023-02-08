/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
} from 'react-native';

import Crashes from 'appcenter-crashes';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Input} from './src/components/Input';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      {children}
    </View>
  );
}

type AppProps = {};
type AppState = {enteredText: string};

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.checkPreviousSession();
    this.state = {
      enteredText: '',
    };
  }

  async checkPreviousSession() {
    const didCrashed = await Crashes.hasCrashedInLastSession();
    if (didCrashed) {
      // const report = await Crashes.lastSessionCrashReport(); // use this report to know more about the crash
      Alert.alert("Sorry about that crash, we're working on a solution");
    }
  }

  render() {
    const backgroundStyle = {
      backgroundColor: Colors.lighter,
    };

    return (
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View
            style={{
              backgroundColor: Colors.white,
            }}>
            <Section title="Text Input">
              <Text>Let's try TextInput with Typescript!{'\n'}</Text>

              <Input
                placeholder="type anything..."
                value={this.state.enteredText}
                onChange={event =>
                  this.setState({enteredText: event.nativeEvent.text})
                }
              />
              <Text>you typed: {this.state.enteredText}</Text>
            </Section>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
});
