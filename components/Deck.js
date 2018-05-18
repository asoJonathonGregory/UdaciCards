import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import { white, blue } from "../utils/colors";

class Deck extends Component {
    handlePress = () => {
        const { navigation, deck } = this.props;
        navigation.navigate("QuizView", {
            key: deck.title
        });
    };

    render() {
        const { deck } = this.props;
        return (
            <View style={styles.container}>
                {deck && (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handlePress}
                    >
                        <Text style={[styles.text, styles.title]}>
                            {deck.title}
                        </Text>
                        <Text style={styles.text}>
                            {deck.questions.length}{" "}
                            {deck.questions.length === 1 ? "card" : "cards"}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginVertical: 10
    },
    button: {
        backgroundColor: blue,
        height: 120,
        borderRadius: 6,
        justifyContent: "space-around",
        paddingVertical: 10
    },
    text: {
        textAlign: "center",
        color: white
    },
    title: {
        fontSize: 30
    }
});

const mapStateToProps = state => {
    return {
        state
    };
};

export default connect(mapStateToProps)(Deck);
