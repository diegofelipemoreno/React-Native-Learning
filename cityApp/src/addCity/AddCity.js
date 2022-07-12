import React, { useState } from 'react';
import {
 Platform,
 Text,
 View,
 StyleSheet,
 TextInput,
 TouchableOpacity
} from 'react-native';
import uuidV4 from 'uuid/v4';

import { colors } from '../theme';

const AddCity = ({onNavigateHandler, props: {navigation}}) => {
    const [countryValue, setCountryValue] = React.useState('');
    const [cityValue, setCityValue] = useState('');

    const onSubmit = () => {
        if (!cityValue || !countryValue) {
            alert('please complete form');

            return;
        }
    
        const city = {
            city: cityValue,
            country: countryValue,
            id: uuidV4(),
            locations: []
        }

        setCountryValue(countryValue);
        setCityValue(cityValue);
        onNavigateHandler(city);
        navigation.navigate('Cities');
    }

    return (
    <View style={styles.container}>
        <Text style={styles.heading}>Cities</Text>
        <TextInput
        placeholder='Country'
        style={styles.input}
        onChangeText={setCountryValue}
        value={countryValue}
        />

        <TextInput
        placeholder='City'
        style={styles.input}
        onChangeText={setCityValue}
        value={cityValue}
        />
        <TouchableOpacity onPress={onSubmit}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>Add city</Text>
            </View>
        </TouchableOpacity>
    </View>
    )
};

const styles = StyleSheet.create({
    button: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.secondary,
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
        color: colors.white,
      },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: colors.white,
    },
    heading: {
        color: colors.white,
        fontSize: 40,
        marginBottom: 10,
        alignSelf: 'center'
    },
    container: {
        backgroundColor: colors.primary,
        flex: 1,
        justifyContent: 'center'
    },
});
  

export default AddCity;