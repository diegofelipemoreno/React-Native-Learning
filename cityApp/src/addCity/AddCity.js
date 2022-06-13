import React, { useState } from 'react';
import {
 Text,
 View,
 StyleSheet,
 Button,
 TextInput
} from 'react-native';

import { colors } from '../theme';

const AddCity = ({onPress}) => {
    const [countryValue, setCountryValue] = React.useState('');
    const [cityValue, setCityValue] = useState('');

    const onSubmit = () => {
        console.log(countryValue, cityValue, "xxx>",onPress);
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
    
        <Button
          title="Add city"
          onPress={onSubmit}
        />
    </View>
    )
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    heading: {
        color: 'white',
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