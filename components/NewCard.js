import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { saveNewCard } from "../actions";
import { red, white, blue } from "../utils/colors";

class NewCard extends Component {
    state = {
        question: "",
        answer: "",
        error: false
    };

    submit = () => {
        this.setState({ error: false });
        const { question, answer } = this.state;
        const { deck } = this.props.navigation.state.params;

        if (question.trim() === "" || answer.trim() === "") {
            this.setState({ error: true });
            return;
        }
        this.props.dispatch(saveNewCard({ question, answer }, deck));
        this.props.navigation.goBack();
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 30, textAlign: "center" }}>
                    New Card For: {this.props.navigation.state.params.deck}
                </Text>
                <Text style={styles.text}>Question</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Question"
                    onChangeText={question => this.setState({ question })}
                />
                <Text style={styles.text}>Answer</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Answer"
                    onChangeText={answer => this.setState({ answer })}
                />
                {this.state.error && (
                    <Text style={styles.error}>
                        Please include a question and an answer
                    </Text>
                )}
                <TouchableOpacity style={styles.button} onPress={this.submit}>
                    <Text style={{ color: white, fontSize: 20 }}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    text: {
        fontSize: 25,
        textAlign: "center",
        marginTop: 40
    },
    error: {
        textAlign: "center",
        marginTop: 40,
        color: red,
        fontWeight: "bold"
    },
    input: {
        marginHorizontal: 20,
        paddingHorizontal: 10,
        height: 40,
        borderRadius: 6,
        borderWidth: 1
    },
    button: {
        backgroundColor: blue,
        alignSelf: "center",
        padding: 10,
        borderRadius: 6,
        marginTop: 40
    }
});

const mapStateToProps = state => ({
    state
});

export default connect(mapStateToProps)(NewCard);
