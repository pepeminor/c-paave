/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import App from './src/screens/App';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state.']);
AppRegistry.registerComponent(appName, () => App);
