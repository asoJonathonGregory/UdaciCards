import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { connect } from "react-redux";
import { getDecks } from "../actions";
import Deck from "./Deck";
import { blue } from "../utils/colors";

class Home extends Component {
    componentDidMount() {
        this.props.dispatch(getDecks());
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.state === this.props.state) return false;
        return true;
    }

    render() {
        const decks = this.props.state || {};
        return (
            <View style={Object.keys(decks).length === 0 ? { flex: 1 } : null}>
                {Object.keys(decks).length > 0 ? (
                    <ScrollView contentContainerStyle={styles.container}>
                        {Object.keys(decks).map(deck => {
                            return (
                                <Deck
                                    navigation={this.props.navigation}
                                    key={decks[deck].title}
                                    deck={decks[deck]}
                                />
                            );
                        })}
                    </ScrollView>
                ) : (
                    <View style={styles.decklessContainer}>
                        <Text style={[styles.deckless, styles.topRow]}>
                            You have no saved decks.
                        </Text>
                        <Text style={styles.deckless}>
                            Add a deck to get started!
                        </Text>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "stretch",
        paddingHorizontal: 10
    },
    deckless: {
        paddingHorizontal: 30,
        textAlign: "center",
        fontSize: 20,
        color: blue
    },
    decklessContainer: {
        justifyContent: "center",
        flex: 1
    },
    topRow: {
        marginBottom: 20
    }
});

const mapStateToProps = state => ({
    state
});

export default connect(mapStateToProps)(Home);
