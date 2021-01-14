import React from 'react';
import { Text } from 'react-native';

import styles from '../screens/defaultStyle';

export const TextDivisor = (props) => (
    <>
        <Text style={styles.textBlue}>
            { props.text }
        </Text>
        <Text style={styles.divisor} />
    </>
);
