import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Platform
 } from 'react-native';

import CenterMessage from '../components/CenterMessage'
import { colors } from '../theme'

const City = ({onNavigateHandler, props}) => {
    const city = props?.route?.params?.city || null;
    const [locationInfo, setLocationInfo] = React.useState({ name: '', info: '' });

    const onChangeText = (key, value) => {
        setLocationInfo({...locationInfo, [key]: value});
    }

    const setLocation = () => {
        if (!locationInfo.name || !locationInfo.info) {
            alert('Please complete the location name and info');

            return;
        }

        const location = {
          name: locationInfo.name,
          info: locationInfo.info
        }

        console.log(location, city, props);
        onNavigateHandler(location, city);
        setLocationInfo({ name: '', info: '' });
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={[!city?.locations?.length && { flex: 1 }]}>
                <View style={[styles.locationsContainer, !city?.locations?.length && { flex: 1, justifyContent: 'center' }]}>
                    {
                        !city?.locations?.length && <CenterMessage message='No locations for this city!' />
                    }
                    {
                        city?.locations && city.locations.map((location, index) => (
                            <View key={index} style={styles.locationContainer}>
                                <Text style={styles.locationName}>{location.name}</Text>
                                <Text style={styles.locationInfo}>{location.info}</Text>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
            <TextInput
            onChangeText={val => onChangeText('name', val)}
            placeholder='Location name'
            value={locationInfo.name || ''}
            style={styles.input}
            placeholderTextColor='white'
            />
            <TextInput
            onChangeText={val => onChangeText('info', val)}
            placeholder='Location info'
            value={locationInfo.info || ''}
            style={[styles.input, styles.input2]}
            placeholderTextColor='white'
            />
            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={setLocation}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Add Location</Text>
                </View>
            </TouchableOpacity>
            </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    locationsContainer: {
      paddingBottom: 104
    },
    input: {
      height: 50,
      backgroundColor: colors.primary,
      color: colors.white,
      paddingHorizontal: 8,
      position: 'absolute',
      width: '100%',
      bottom: 104,
      left: 0
    },
    input2: {
      bottom: 52
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%'
    },
    button: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.secondary,
      color: colors.white,
      ...Platform.select({
        ios: {
          backgroundColor: colors.secondaryIos,
        },
        android: {
          backgroundColor: colors.secondaryAndroid,
        }
     })
    },
    buttonText: {
      color: colors.white
    },
    locationContainer: {
      padding: 10,
      borderBottomColor: colors.primary,
      borderBottomWidth: 2
    },
    locationName: {
      fontSize: 20
    },
    locationInfo: {
      color: 'rgba(0, 0, 0, .5)'
    }
});

export default City;