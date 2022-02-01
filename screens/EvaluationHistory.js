import React, { Component, useState } from 'react';
import {Text, View, Button, TextInput, StyleSheet, Image, Pressable, ScrollView, SafeAreaView, Platform } from 'react-native';
import { SwipeablePanel } from 'rn-swipeable-panel';
import GLOBAL from '../global.js'
import AuthStore from '../store/AuthStore.js';
import authParams from '../store/redux/auth/authParams.js';
import UserStore from '../store/UserStore.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
const EvaluationHistory = ({ navigation, route }) => {

    const { streetid, streetName } = route.params;

    const ALL_COMMENTS_URL = ` https://www.ecomap.onine/api/map/street-review/${streetid}/`
    const COMMET_REPORT_URL = 'https://www.ecomap.online/api/map/report/'
    // PanelSwiper selectReport
    const [comments, setComments] = React.useState([])
    const [commentId, setCommentId] = React.useState(null)
    const [loggedVia, setLoggedVia] = React.useState(null)
    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: false,
        closeOnTouchOutside: true,
        showCloseButton: true,
        onClose: () => closePanel(),
        onPressCloseButton: () => closePanel(),
        // ...or any prop you want
    });
    const [isPanelActive, setIsPanelActive] = useState(false);
    const openPanel = () => {
        setIsPanelActive(true);
    };
    const closePanel = () => {
        setIsPanelActive(false);
    };
    // PanelSwiper push report
    const [panelReportProps, setPaneReportlProps] = useState({
        fullWidth: true,
        openLarge: false,
        showCloseButton: true,
        onClose: () => closePanelReport(),
        onPressCloseButton: () => closePanelReport(),
        // ...or any prop you want
    });
    const [isPaneReportlActive, setIsPaneReportlActive] = useState(false);
    const openPanelReport = () => {
        setIsPanelActive(false);
        setIsPaneReportlActive(true);
    };
    const closePanelReport = () => {
        setIsPaneReportlActive(false);
    };

    const openReportSwiper = (idcom) => {
        setCommentId(idcom)
        openPanel()
    }
    const  loggedViaFunc = async() => {
        let loginVia = null
        loginVia = await AsyncStorage.getItem('loggedVia');
        setLoggedVia(loginVia)
    }
    const selectReport = async(textSelectReport) => {
        setIsPanelActive(false);
        let loginVia = null
        loginVia = await AsyncStorage.getItem('loggedVia');
        setIsPaneReportlActive(true);
        const response = await fetch(COMMET_REPORT_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
            },
            body: JSON.stringify({
                comment: commentId,
                text: textSelectReport
            })
        });
    }

    React.useEffect(() => {
        loggedViaFunc()
        fetch(ALL_COMMENTS_URL, {
            method: 'GET',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${loggedVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
            }
        }).then((response) => response.json())
        .then((json) => {
            console.log(json)
            setComments(json);
        })
        .catch((error) => {
            alert(error)
        });
    }, []);

    return (
        
        <SafeAreaView  style={{ flex: 1 }}>
            <SwipeablePanel {...panelReportProps} isActive={isPaneReportlActive} style={ styles.boxswipeReport }>
                <View style={styles.boxswipeView}>
                    <Image style={{ width: 45, height: 45 }} source={require('../assets/mesSend.png')} />
                    <Text style={styles.SwiperBoxReportTitle}>Спасибо что сообщили нам об этом</Text>
                    <Text style={styles.SwiperBoxReportSubTitle}>Ваша жалоба останется анонимной, если только вы не сообщаете о нарушении прав на интеллектуальную собственность.</Text>
                </View>
            </SwipeablePanel>
            <SwipeablePanel {...panelProps} isActive={isPanelActive} style={ styles.boxswipe }>
                <Text style={styles.SwiperBoxTitle}>Пожаловаться на отзыв</Text>
                <Text style={styles.SwiperBoxSubTitle}>Ваша жалоба останется анонимной, если только вы не сообщаете о нарушении прав на интеллектуальную собственность.</Text>
                <Pressable
                        style={styles.buttonHistorySwiper}
                        onPress={() => selectReport('Это спам')}
                    >
                        <Text style={styles.headerCrownText}>Это спам</Text>
                        <Image source={require('../assets/arrowRightHistory.png')} style={{ width: 8, height: 8 }} />
                </Pressable>
                <Pressable
                        style={styles.buttonHistorySwiper}
                        onPress={() => selectReport('Неуместный контент')}
                    >
                        <Text style={styles.headerCrownText}>Неуместный контент</Text>
                        <Image source={require('../assets/arrowRightHistory.png')} style={{ width: 8, height: 8 }} />
                </Pressable>
                <Pressable
                        style={styles.buttonHistorySwiper}
                        onPress={() => selectReport('Не тот адрес')}
                    >
                        <Text style={styles.headerCrownText}>Не тот адрес</Text>
                        <Image source={require('../assets/arrowRightHistory.png')} style={{ width: 8, height: 8 }} />
                </Pressable>
            </SwipeablePanel>
            <ScrollView style={ styles.container }>
                    {
                        comments.map((u, i) => {
                            return(
                                <View key={i} style={ styles.blockComment }>
                                    <Text style={styles.historuEvaluationTitle}>{streetName}</Text>
                                    <Image source={
                                        u.image !== undefined
                                            ? {uri: 'https://www.ecomap.online' + u.image}
                                            : require('../assets/imageStreet.png')
                                        } style={styles.imageStreet} />
                                    <View style={ styles.containerSwiper }>
                                        <View style={ styles.containerAccountSwiper }>
                                        <Image source={
                                            u.user.image !== null
                                                ? {uri: 'https://www.ecomap.online' + u.user.image}
                                                : require('../assets/SwipeAvatar.png')
                                            } style={styles.SwipeAvatar} />
                                        <View>
                                            <Text style={ styles.SwipeAccountTitle }>{u.user.username}</Text>
                                            <Text style={ styles.SwipeAccountDescription }>{u.user.rang}</Text>
                                        </View>
                                    </View>
                                    {u.rating == 3 ?
                                        <View style={ styles.containerStars }>
                                            <Image source={require('../assets/RatingStar.png')} style={styles.ImageRating} />
                                            <Image source={require('../assets/RatingStar.png')} style={[styles.ImageRating, styles.ImageRatingCenter]} />
                                            <Image source={require('../assets/RatingStar.png')} style={styles.ImageRating} />
                                        </View>
                                        : u.rating == 2 ?
                                        <View style={ styles.containerStars }>
                                            <Image source={require('../assets/RatingStarYelllow.png')} style={styles.ImageRating} />
                                            <Image source={require('../assets/RatingStarYelllow.png')} style={[styles.ImageRating, styles.ImageRatingCenter]} />
                                            <Image source={require('../assets/RatingStarGray.png')} style={styles.ImageRating} />
                                        </View>
                                        : 
                                        <View style={ styles.containerStars }>
                                            <Image source={require('../assets/RatingStarRed.png')} style={styles.ImageRating} />
                                            <Image source={require('../assets/RatingStarGray.png')} style={[styles.ImageRating, styles.ImageRatingCenter]} />
                                            <Image source={require('../assets/RatingStarGray.png')} style={styles.ImageRating} />
                                        </View>
                                    }
                                        
                                    </View>
                                    <Text style={ styles.EvaluationDescription }>{u.text}</Text>
                                    <Pressable
                                        style={styles.buttonHistory}
                                        onPress={() => openReportSwiper(u.id)}
                                    >
                                        <Text style={styles.headerCrownText}>Пожаловаться</Text>
                                        <Image source={require('../assets/arrowRightHistory.png')} style={{ width: 8, height: 8 }} />
                                    </Pressable>
                                </View>
                            )
                        })
                    }
            </ScrollView>
        </SafeAreaView>
    );
}

export default EvaluationHistory

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginBottom: 60
    },
    boxswipeReport: {
        backgroundColor: '#F6F6F6',
    },
    historuEvaluationTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginTop: 30,
        marginBottom: 8
    },
    imageStreet: {
        width: '100%',
        height: 103,
        borderRadius: 8,
        marginBottom: 12
    },
    containerSwiper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        fontWeight: '700'
    },
    SwipeAccountDescription: {
        fontSize: 8,
        fontWeight: '500'
    },
    ImageRating: {
        width: 12,
        height: 12
    },
    ImageRatingCenter: {
        marginHorizontal: 5
    },
    containerStars: {
        flexDirection: 'row'
    },
    EvaluationDescription: {
        fontSize: 13,
        marginTop: 8
    },
    buttonHistory: {
        paddingVertical: 13,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerCrownText: {
        marginTop: 5,
        // fontWeight: '700'
    },
    boxswipe: {
        // paddingHorizontal: 20,
        backgroundColor: '#F6F6F6'
    },
    buttonHistorySwiper: {
        paddingVertical: 13,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0'
    },
    SwiperBoxTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 8,
        paddingHorizontal: 20
    },
    SwiperBoxSubTitle: {
        fontSize: 10,
        color: "#444444",
        paddingHorizontal: 20,
        marginBottom: 16
    },
    SwiperBoxReportTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 8,
        marginTop: 16,
        paddingHorizontal: 20
    },
    SwiperBoxReportSubTitle: {
        fontSize: 10,
        color: "#444444",
        paddingHorizontal: 20,
        marginBottom: 16,
        textAlign: 'center'
    },
    boxswipeView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 18
    },
    blockComment: {
        marginBottom: 20
    }
})