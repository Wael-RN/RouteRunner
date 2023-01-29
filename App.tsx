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
  Button,
  Alert,
} from 'react-native';

import Crashes from 'appcenter-crashes';
import Analytics from 'appcenter-analytics';

import {Colors} from 'react-native/Libraries/NewAppScreen';

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
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

export default class App extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.checkPreviousSession();
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
            <Section title="Step One">
              Welcome to Route-Runner app, let's build amazing things!.
              <Button
                title="track event"
                onPress={() => {
                  Analytics.trackEvent('My custom event', {Internet: 'WIFI'});
                }}
              />
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
