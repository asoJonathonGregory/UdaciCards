import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { blue, white, red, green } from "../utils/colors";
import { setDailyReminder, clearDailyReminder } from "../utils/notifications";

class QuizView extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.key
    });

    state = {
        screen: "home",
        card: null,
        deck: null,
        place: 0,
        correct: 0,
        incorrect: 0,
        showing: "question"
    };

    backToList = () => {
        this.props.navigation.goBack();
    };

    componentDidMount() {
        const { key } = this.props.navigation.state.params;
        const deck = this.props.state[key];
        const cardTotal = deck ? deck.questions.length : 0;
        this.setState({ deck });
    }

    componentDidUpdate() {
        const { key } = this.props.navigation.state.params;
        const deck = this.props.state[key];
        const cardTotal = deck ? deck.questions.length : 0;
        if (this.state.deck !== deck) this.setState({ deck });
        if (this.refs.touch) {
            if (cardTotal === 0) this.refs.touch.setOpacityTo(0.5);
        }
    }

    addCard = () => {
        this.props.navigation.navigate("NewCard", {
            deck: this.state.deck.title
        });
    };

    nextCard = () => {
        if (this.state.place + 1 === this.state.deck.questions.length) {
            this.setState({ screen: "results" });
            clearDailyReminder().then(setDailyReminder);
            return;
        }
        this.setState({
            card: this.state.deck.questions[this.state.place + 1],
            place: this.state.place + 1,
            showing: "question"
        });
    };

    resetQuiz = () => {
        this.setState({
            screen: "home",
            card: null,
            place: 0,
            correct: 0,
            incorrect: 0,
            showing: "question"
        });
    };

    startQuiz = () => {
        const { deck } = this.state;
        this.setState({
            screen: "quiz",
            card: deck.questions[this.state.place]
        });
    };

    tallyCorrect = () => {
        this.setState({
            correct: this.state.correct + 1
        });
        this.nextCard();
    };

    tallyIncorrect = () => {
        this.setState({
            incorrect: this.state.incorrect + 1
        });
        this.nextCard();
    };

    toggleQuestion = () => {
        this.state.showing === "question"
            ? this.setState({ showing: "answer" })
            : this.setState({ showing: "question" });
    };

    render() {
        const { card, deck } = this.state;

        if (!deck) return <View>Loading</View>;
        const total = deck.questions.length;

        return (
            <View style={{ flex: 1 }}>
                {this.state.screen === "home" && (
                    <View style={styles.container}>
                        <View>
                            <Text style={[styles.text, styles.title]}>
                                {deck.title}
                            </Text>
                            <Text style={styles.text}>
                                {total} {total === 1 ? "card" : "cards"}
                            </Text>
                            {total === 0 && (
                                <Text style={[styles.text, styles.emptyDeck]}>
                                    Add some more cards to take the quiz
                                </Text>
                            )}
                        </View>
                        <View>
                            <TouchableOpacity
                                disabled={total > 0 ? false : true}
                                ref="touch"
                                style={styles.button}
                                onPress={this.startQuiz}
                            >
                                <Text style={[styles.buttonText, styles.text]}>
                                    Start Quiz
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={this.addCard}
                            >
                                <Text style={[styles.buttonText, styles.text]}>
                                    Add New Card
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                {this.state.screen === "quiz" && (
                    <View style={styles.container}>
                        <Text>
                            {deck.questions.length - this.state.place}{" "}
                            {deck.questions.length - this.state.place === 1
                                ? "card"
                                : "cards"}{" "}
                            left
                        </Text>
                        <View>
                            {this.state.showing === "question" && (
                                <Text style={styles.content}>
                                    {card.question}
                                </Text>
                            )}
                            {this.state.showing === "answer" && (
                                <Text style={styles.content}>
                                    {card.answer}
                                </Text>
                            )}
                            <TouchableOpacity onPress={this.toggleQuestion}>
                                {this.state.showing === "question" && (
                                    <Text style={styles.toggle}>
                                        Show Answer
                                    </Text>
                                )}
                                {this.state.showing === "answer" && (
                                    <Text style={styles.toggle}>
                                        Show Question
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={[styles.button, styles.correctBtn]}
                                onPress={this.tallyCorrect}
                            >
                                <Text
                                    style={{
                                        color: white,
                                        textAlign: "center",
                                        fontSize: 20
                                    }}
                                >
                                    Correct
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.incorrectBtn]}
                                onPress={this.tallyIncorrect}
                            >
                                <Text
                                    style={{
                                        color: white,
                                        textAlign: "center",
                                        fontSize: 20
                                    }}
                                >
                                    Incorrect
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                {this.state.screen === "results" && (
                    <View style={styles.resultsContainer}>
                        <Text
                            style={{
                                color: green,
                                fontSize: 30,
                                marginBottom: 20
                            }}
                        >
                            {this.state.correct} - correct
                        </Text>
                        <Text
                            style={{
                                color: red,
                                fontSize: 30,
                                marginBottom: 20
                            }}
                        >
                            {this.state.incorrect} - incorrect
                        </Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.backToList}
                        >
                            <Text style={styles.buttonText}>
                                Back To Deck List
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.resetQuiz}
                        >
                            <Text style={styles.buttonText}>
                                Take the Quiz Again
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around"
    },
    resultsContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        backgroundColor: blue,
        padding: 10,
        borderRadius: 6,
        marginBottom: 20
    },
    buttonText: {
        color: white
    },
    correctBtn: {
        backgroundColor: green
    },
    incorrectBtn: {
        backgroundColor: red,
        marginBottom: 40
    },
    emptyDeck: {
        color: red,
        marginTop: 20
    },
    content: {
        fontSize: 25,
        marginBottom: 20,
        textAlign: "center"
    },
    text: {
        textAlign: "center",
        fontSize: 20
    },
    title: {
        fontSize: 40
    },
    toggle: {
        fontSize: 15,
        textAlign: "center",
        color: blue
    },
    toggleBtn: {
        backgroundColor: blue
    }
});

const mapStateToProps = state => {
    console.log(state);
    return {
        state
    };
};

export default connect(mapStateToProps)(QuizView);
