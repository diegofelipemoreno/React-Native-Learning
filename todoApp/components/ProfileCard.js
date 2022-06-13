import {Platform, StyleSheet, View, Image, Text, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types'; 

const ProfileCard = (props) => {
    const {name, occupation, description, image, showThumbnail, onPress} = props;
    let containerStyles = [styles.cardContainer];

    if (showThumbnail) {
        containerStyles.push(styles.cardThumbnail);
    }

    return (
        <TouchableHighlight onPress={onPress}>
            <View style={styles.container}>
                <View style={[containerStyles]}>
                    <View style={styles.cardImageContainer}>
                        <Image 
                        style={styles.cardImage}
                        source={image}
                        />
                    </View>
                    <View style={styles.masthead}>
                        <Text style={styles.profileName}>
                            {name}
                        </Text>
                        <Text style={styles.profileTitle}>
                            {occupation}
                        </Text>
                        <Text style={styles.profileContent}>
                            {description}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );
};

ProfileCard.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    occupation: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    showThumbnail: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired
};

const profileCardColor = 'dodgerblue';
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    cardContainer: {
        alignItems: 'center',
        backgroundColor: profileCardColor,
        borderWidth: 3,
        borderColor: 'grey',
        borderRadius: 20,
        width: 300,
        height: 400,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {
                height: 10
            },
            shadowOpacity: 1
            },
            android: {
                elevation: 15
            }
        })
    },
    cardImageContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'black',
        borderRadius: 60,
        borderWidth: 3,
        height: 120,
        justifyContent: 'center',
        marginTop: 30,
        overflow: 'hidden',
        width: 120,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {
                height: 10,
            },
            shadowOpacity: 1
            },
            android: {
                borderWidth: 3,
                borderColor: 'black',
                elevation: 15
            }
        })
    },
    cardImage: {
        width: 120,
        height: 120,
        backgroundColor: 'grey',
        justifyContent: 'center'
    },
    masthead: {
        alignItems: 'center',
        margin: 40,
    },
    profileName: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 10,
        textShadowColor: 'black',
        textShadowOffset: {
            height: 2,
            width: 2
        },
        textShadowRadius: 3
    },
    profileTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginBottom: 10,
    },
    profileContent: {
        fontStyle: 'italic',
        ...Platform.select({
            ios: {  
                fontFamily: 'American Typewriter'
            },
            android: {
                fontFamily: 'monospace'
            },
        }),
    },
    cardThumbnail: {
        transform: [{scale: 0.2}]
    }
});

export default ProfileCard;