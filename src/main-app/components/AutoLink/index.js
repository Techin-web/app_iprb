import React from 'react';
import {Text, Linking, StyleSheet} from 'react-native';

function Link(props) {
  const openUrl = url => {
    const supported = Linking.canOpenURL(url);

    if (supported) {
      Linking.openURL(url);
    } else {
      console.log('O formato do link não demonstra ser válido.');
    }
  };

  const linkStyle = props.dark ? styles.DarkLink : styles.LightLink;

  return (
    <Text style={linkStyle} onPress={() => openUrl(props.url)}>
      {props.children}
    </Text>
  );
}

export default function HyperText(props) {
  const words = props.children.split(/(https?:\/\/[^\s]+)/g);

  const contents = words.map((word, i) => {
    if (word.match(/^https?\:\//) || word.match(/^http?\:\//)) {
        return (
            <Link key={i} url={word} dark={props.dark}>
                <Text style={{ color: "#0000a3", fontWeight: "700", textDecorationLine: "underline" }}>CLIQUE AQUI!</Text>
            </Link>
        );
    } else {
      return word;
    }
  });

  return <Text>{contents}</Text>;
}

const styles = StyleSheet.create({
  LightLink: {
    color: '#ADC8F3',
  },
  DarkLink: {
    color: '#1060B3',
  },
});
