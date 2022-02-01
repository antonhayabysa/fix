import React from 'react';
import { Text, View, StyleSheet, Image, Pressable, ScrollView, Platform } from 'react-native';
import GLOBAL from '../global.js'
import {vw, vh, vmin, vmax} from 'react-native-expo-viewport-units';
import UserStore from '../store/UserStore.js';
import authParams from '../store/redux/auth/authParams.js';
import AuthStore from '../store/AuthStore.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

function EvaluationUserDetail({ route, navigation }) {
    const { commentId } = route.params;

    const [CommentStrretTitle, setUserCommentDetail] = React.useState()
    const [CommentUserName, setCommentUserName] = React.useState()
    const [CommentText, setCommentText] = React.useState()
    const [CommentRating, setCommentRating] = React.useState()
    const [ImgRating, setImgRating] = React.useState()
    const [CommentGeojsId, setCommentGeojsId] = React.useState()
    const [loggedVia, setloggedVia] = React.useState('')
    const loggedViaFunc = async() =>{
        let loginVia = null
        loginVia = await AsyncStorage.getItem('loggedVia');
        setloggedVia(loginVia)
    }

    const COMMENT_DETAIL_URL = `https://www.ecomap.online/api/map/review/${commentId}`
    const COMMENT_DELET_URl = `https://www.ecomap.online/api/map/review/${commentId}`
    console.log(commentId)
    console.log(commentId)

    console.log("Login via from evaluation screen"+loggedVia)

        React.useEffect(() => {
            loggedViaFunc()
            fetch(COMMENT_DETAIL_URL, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `${loggedVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
                }
            })
                .then(response => response.json())
                .then(json => {
                    console.log(json)
                    setUserCommentDetail(json.street.title)
                    setCommentGeojsId(json.street.geo_json_id)
                    setCommentUserName(json.user.username)
                    setCommentText(json.text)
                    setCommentRating(json.rating)
                    setImgRating(json.image)
                })
                .catch(error => {
                    console.error(error);
                });
        }, [])

    const deleteReview = async () => {
        let loginVia = null
        loginVia = await AsyncStorage.getItem('loggedVia');
        fetch(COMMENT_DELET_URl, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
            }
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)            
        })
        .catch(error => {
            console.log(error);
        });
        navigation.navigate('HomeScreen')
    }

    return(
        <View style={styles.container}>
            <Text style={styles.titlePage}>{CommentStrretTitle}</Text>
            <Image style={styles.imageStreet} source={
                  ImgRating !== null
                    ? {uri: 'https://www.ecomap.online' + ImgRating}
                    : require('../assets/imageStreet.png')
                  } />
            <View>
                <View style={styles.userData}>
                    <Text style={styles.userName}>{CommentUserName}</Text>
                    <Text style={styles.userDate}>10 сентября 2020</Text>
                </View>

                <View style={styles.commentTextBlock}>
                    <Text>{CommentText}</Text>
                </View>

                <View style={styles.ratingBlock}>
                {CommentRating == 3 ?
                    <View style={ styles.containerStars }>
                        <Image source={require('../assets/RatingStar.png')} style={styles.ImageRating} />
                        <Image source={require('../assets/RatingStar.png')} style={[styles.ImageRating, styles.ImageRatingCenter]} />
                        <Image source={require('../assets/RatingStar.png')} style={styles.ImageRating} />
                    </View>
                    : CommentRating == 2 ?
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
                <Pressable
                    style={[styles.button, styles.buttonEdit]}
                    onPress={() => navigation.navigate('EvaluationEdit', {
                        streetName: CommentStrretTitle,
                        streetid: CommentGeojsId,
                        commentIdunic: commentId
                    })}
                >
                    <Text style={styles.editProfileText}>Редактировать</Text>
                </Pressable>
                <Pressable
                    onPress={() => deleteReview()}
                >
                    <Text style={styles.deletComment}>Удалить отзыв</Text>
                </Pressable>
                <Text style={styles.deletProfileText} >Редактировать отзыв вы можете в течение 7 дней после публикации.</Text>
            </View>
        </View>
    )
    
}

export default EvaluationUserDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 24,
        marginBottom: 60
    },
    containerStars: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ImageRating: {
        width: 75,
        height: 75
    },
    ratingBlock: {
        marginBottom: 25
    },
    ImageRatingCenter: {
        marginHorizontal: 5
    },
    imageStreet: {
        width: '100%',
        height: 103,
        borderRadius: 8,
        marginBottom: 16,
    },
    userData: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4
    },
    deletProfileText: {
        color: '#B2B2B2',
        fontSize: 12,
        fontWeight: '400',
        textAlign: 'center'
    },
    deletComment: {
        color: '#B2B2B2',
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        marginBottom: 16
    },
    titlePage: {
        fontWeight: '700',
        fontSize: 20
    },
    userName: {
        fontSize: 18,
        marginRight: 17,
        fontWeight: '700'
    },
    userDate: {
        fontSize: 11,
        fontWeight: '300'
    },
    commentTextBlock: {
        marginBottom: 16
    },
    button: {
        borderRadius: 8,
        paddingVertical: 13,
    },
    buttonEdit: {
        borderWidth: 1,
        borderColor: '#1E9D2D',
        marginBottom: 20
    },
    editProfileText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black',
        textAlign: 'center'
    },
})