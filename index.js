/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App );
