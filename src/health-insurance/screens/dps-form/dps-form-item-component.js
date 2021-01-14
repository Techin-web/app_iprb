import React, {Component} from 'react';
import { View, TouchableOpacity } from 'react-native';
import { CheckBox, Text } from 'native-base';

import styles from './style';


class DPSFormQuestionItemComponent extends Component{

    state = {};

    constructor(props){
        super(props);
        const hasAnswer = typeof props.answer !== 'undefined';

        if(hasAnswer){
            this.state.id = props.answer === true ? 'y' : 'n';
        };
    }

    onChecked = (id) => {
        this.setState({id});
        this.props.onChecked(this.props.id, id === 'y');
    };

    render(){
        const props = this.props;

        return (
            <>
                <View style={styles.itemQuestion}>
                    <Text style={styles.itemQuestionNumber}>{props.id}.</Text>
                    <Text style={styles.itemQuestionText}>{props.question}</Text>
                </View>

                <View style={styles.itemAnswer}>
                    <TouchableOpacity
                        style={[styles.row, styles.rowSpacing]}
                        onPress={() => {
                            this.onChecked('y');
                        }}>
                        <CheckBox
                            checked={this.state.id === 'y'}
                            onPress={() => {
                                this.onChecked('y');
                            }}/>
                        <Text style={styles.itemAnswerText}>
                            Sim
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.row, styles.rowSpacing]}
                        onPress={() => {
                            this.onChecked('n');
                        }}>
                        <CheckBox
                            checked={this.state.id === 'n'}
                            onPress={() => {
                                this.onChecked('n');
                            }} />
                        <Text
                            style={styles.itemAnswerText}>
                            Não
                        </Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }


}

export {DPSFormQuestionItemComponent};
