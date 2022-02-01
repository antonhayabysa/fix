import React, { useState } from 'react';
import { SwipeablePanel } from 'rn-swipeable-panel';
import TextTruncate from 'react-native-text-truncate';
import { Text, View, Pressable, StyleSheet, Image } from 'react-native';

const Swiper = ({ items }) => {

    const [panelProps, setPanelProps] = useState({
      fullWidth: true,
      openSmall: true,
      closeOnTouchOutside: true,
      showCloseButton: false,
      noBackgroundOpacity: true,
      onClose: () => closePanel(),
      onPressCloseButton: () => closePanel(),
    });
    const [isPanelActive, setIsPanelActive] = useState(false);

    const openPanel = () => {
      setIsPanelActive(true);
    };

    const closePanel = () => {
      setIsPanelActive(false);
    };

    const renderExpandor = () => {
      return (
      <View>
        <Text> Читать полностью </Text>
        <Image source={ require('../assets/swiperArrowBottom.png')} />
      </View>
      );
    }

    return(
        <View>
        <SwipeablePanel {...panelProps} isActive={isPanelActive} style={ styles.boxswipe }>
          <Text style={styles.boxswipeTitle}>Улица Ленина</Text>
          <View styles={ styles.containerImageStreet }>
            <Image source={require('../assets/imageStreet.png')} style={styles.imageStreet} />
          </View>
          <View style={ styles.containerSwiper }>
            <View style={ styles.containerAccountSwiper }>
              <Image source={require('../assets/SwipeAvatar.png')} style={styles.SwipeAvatar} />
              <View>
                <Text style={ styles.SwipeAccountTitle }>Василий</Text>
                <Text style={ styles.SwipeAccountDescription }>Знаток города</Text>
              </View>
            </View>
            <View style={ styles.containerStars }>
                <Image source={require('../assets/RatingStar.png')} style={styles.ImageRating} />
              <Image source={require('../assets/RatingStar.png')} style={[styles.ImageRating, styles.ImageRatingCenter]} />
                <Image source={require('../assets/RatingStar.png')} style={styles.ImageRating} />
            </View>
          </View>
          <TextTruncate 
            style={{ fontSize: 10, fontWeight: '500', color: 'black', marginTop: 12, paddingHorizontal: 20 }}
            numberOfLines={2}
            renderExpandor={renderExpandor}
            expandorStyle={ styles.textButtonTransform }
            >
            <Text>
              {'This page will help you install and build your first React Native app. If you already have React Native installed, you can skip ahead to the Tutorial.If you are. If you already have React Native installed, you can skip ahead to the Tutorial.If you are'}
            </Text>
          </TextTruncate>

          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => navigation.navigate('CreateEvaluation')}
          >
            <Text style={styles.textStyle}>Оставить оценку</Text>
          </Pressable>

          <Pressable
            style={styles.buttonHistory}
            onPress={() => navigation.navigate('EvaluationHistory')}
          >
            <Text style={styles.headerCrownText}>История оценок</Text>
            <Image source={require('../assets/arrowRightHistory.png')} style={{ width: 8, height: 8 }} />
          </Pressable>
        </SwipeablePanel>
        <Pressable
          onPress={() => openPanel()}
         >
          <Text style={styles.headerCrownText}>Улица</Text>
          
         </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    boxswipe: {
        backgroundColor: '#F6F6F6'
    },
    boxswipeTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 8,
        paddingHorizontal: 20
    },
    imageStreet: {
        width: '100%',
        height: 103,
        borderRadius: 8,
        marginBottom: 16,
    },
    containerSwiper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    containerAccountSwiper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    SwipeAvatar: {
        width: 32,
        height: 32,
        borderRadius: 2,
        marginRight: 8
    },
    SwipeAccountTitle: {
        fontSize: 12,
        fontWeight: '700',
    },
    SwipeAccountDescription: {
        fontSize: 8,
        fontWeight: '500',
    },
    containerStars: {
        flexDirection: 'row'
    },
    ImageRating: {
        width: 12,
        height: 12
    },
    ImageRatingCenter: {
        marginHorizontal: 5
    },
    textButtonTransform: {
        marginBottom: 24
    },
    button: {
        borderRadius: 8,
        paddingVertical: 13,
    },
    buttonOpen: {
        backgroundColor: "#1E9D2D",
        marginBottom: 12,
        marginHorizontal: 20
    },
    textStyle: {
        color: "white",
        fontWeight: "400",
        textAlign: "center",
        fontSize: 16
    },
    buttonHistory: {
        paddingHorizontal: 20,
        paddingVertical: 13,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    headerCrownText: {
        marginLeft: 5,
        fontWeight: '700'
    },
})

export default Swiper