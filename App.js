import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, YellowBox } from "react-native";
import {
    createBottomTabNavigator,
    createStackNavigator
} from "react-navigation";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import reducer from "./reducers";
import Home from "./components/Home";
import NewDeck from "./components/NewDeck";
import QuizView from "./components/QuizView";
import NewCard from "./components/NewCard";
import { white, purple, gray, blue } from "./utils/colors";
import { setDailyReminder } from "./utils/notifications";

YellowBox.ignoreWarnings([
    "Warning: isMounted(...) is deprecated",
    "Module RCTImageLoader"
]);

const Tabs = createBottomTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: "Deck List",
                tabBarIcon: () => (
                    <MaterialCommunityIcons
                        name="cards"
                        size={30}
                        color={blue}
                    />
                )
            }
        },
        NewDeck: {
            screen: NewDeck,
            navigationOptions: {
                tabBarLabel: "New Deck",
                tabBarIcon: () => (
                    <MaterialCommunityIcons
                        name="book-plus"
                        size={30}
                        color={blue}
                    />
                )
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: blue,
            style: {
                height: 56,
                backgroundColor: white,
                shadowColor: "rgba(0,0,0,0.24)",
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1
            }
        }
    }
);

const MainNavigator = createStackNavigator({
    HomeView: {
        screen: Tabs,
        navigationOptions: {
            title: "Deck List"
        }
    },
    QuizView: {
        screen: QuizView
    },
    NewCard: {
        screen: NewCard
    }
});

const logger = store => next => action => {
    console.group(action.type);
    console.info("dispatching", action);
    let result = next(action);
    console.log("next state", store.getState());
    console.groupEnd(action.type);
    return result;
};

const middleware = [thunk, logger];

const store = createStore(reducer, compose(applyMiddleware(...middleware)));

export default class App extends Component {
    componentDidMount() {
        setDailyReminder();
    }

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <MainNavigator />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
