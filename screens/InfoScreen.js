import React from 'react';
import {Text, View, StyleSheet, ScrollView, Platform} from 'react-native';

const InfoScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.blockfaq}>
        <Text style={styles.faqTitle}>Что?</Text>
        <Text style={styles.faqText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
          purus sit amet luctus venenatis, lectus magna fringilla urna,
          porttitor rhoncus dolor purus non enim praesent elementum facilisis
          leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim
          diam quis enim lobortis scelerisque fermentum dui faucibus in ornare
          quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet
          massa vitae tortor condimentum lacinia quis vel eros donec ac odio
          tempor orci dapibus ultrices in iaculis nunc sed augue lacus, viverra
          vitae congue eu, consequat ac felis donec et odio pellentesque diam
          volutpat commodo sed egestas egestas fringilla phasellus faucibus
        </Text>
      </View>

      <View style={styles.blockfaq}>
        <Text style={styles.faqTitle}>Как?</Text>
        <Text style={styles.faqText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
          purus sit amet luctus venenatis, lectus magna fringilla urna,
          porttitor rhoncus dolor purus non enim praesent elementum facilisis
          leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim
          diam quis enim lobortis scelerisque fermentum dui faucibus in ornare
          quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet
          massa vitae tortor condimentum lacinia quis vel eros donec ac odio
          tempor orci dapibus ultrices in iaculis nunc sed augue lacus, viverra
          vitae congue eu, consequat ac felis donec et odio pellentesque diam
          volutpat commodo sed egestas egestas fringilla phasellus faucibus
        </Text>
      </View>

      <View style={styles.blockfaq}>
        <Text style={styles.faqTitle}>Поддержка</Text>
        <Text style={styles.faqText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
          purus sit amet luctus venenatis, lectus magna fringilla urna,
          porttitor rhoncus dolor purus non enim praesent elementum facilisis
          leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim
          diam quis enim lobortis scelerisque fermentum dui faucibus in ornare
          quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet
          massa vitae tortor condimentum lacinia quis vel eros donec ac odio
          tempor orci dapibus ultrices in iaculis nunc sed augue lacus, viverra
          vitae congue eu, consequat ac felis donec et odio pellentesque diam
          volutpat commodo sed egestas egestas fringilla phasellus faucibus
        </Text>
      </View>
    </ScrollView>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginVertical: 20,
    marginBottom: 60,
  },
  blockfaq: {
    marginBottom: Platform.OS === 'android'? 35: 16,
  },
  faqTitle: {
    color: '#1E9D2D',
    fontSize: 18,
    fontWeight: '700',
  },
  faqText: {
    fontSize: 16,
    fontWeight: '400',
  },
});
