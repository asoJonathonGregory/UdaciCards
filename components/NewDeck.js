import React, { Component } from "react";
import { connect } from "react-redux";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { saveDeckTitle } from "../actions";
import { blue, white, red } from "../utils/colors";

class NewDeck extends Component {
    state = {
        text: "",
        error: null
    };

    submit = () => {
        this.setState({ error: false });
        if (
            this.props.state &&
            Object.keys(this.props.state).indexOf(this.state.text) > -1
        ) {
            this.setState({
                error: true
            });
            return;
        }
        this.props.dispatch(saveDeckTitle(this.state.text));
        this.props.navigation.goBack();
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    What is the title of your new deck?
                </Text>
                {this.state.error && (
                    <Text style={styles.error}>
                        There is already a deck with this name, please choose a
                        different one.
                    </Text>
                )}
                <TextInput
                    style={styles.input}
                    placeholder="Deck Title"
                    onChangeText={text => this.setState({ text })}
                />
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
        fontSize: 40,
        textAlign: "center",
        marginHorizontal: 40,
        marginBottom: 40
    },
    error: {
        textAlign: "center",
        marginBottom: 20,
        marginHorizontal: 40,
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

export default connect(mapStateToProps)(NewDeck);
