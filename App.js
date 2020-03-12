/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import {createStackNavigator, createAppContainer} from 'react-navigation';

import HomeScreen from './_components/_home/HomeScreen'
import PlayerDetails from './_components/_playerdetails/PlayerDetails'
import ChooseGame2 from './_components/_selectgame/ChooseGame'
import Waiver from './_components/_waiver/Waiver'
import ThankYou from './_components/_thankyou/ThankYou'
import Login from './_components/login/Login'
import Settings from './_components/_settings/Settings'


const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  PlayerDetails: {screen: PlayerDetails},
  ChooseGame: {screen: ChooseGame2},
  Waiver: {screen: Waiver},
  ThankYou: {screen: ThankYou},
  Login: {screen: Login},
  Settings: {screen: Settings}
});

const App = createAppContainer(MainNavigator);

export default App;
