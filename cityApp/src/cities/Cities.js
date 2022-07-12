import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    ScrollView
 } from 'react-native';

 import CenterMessage from '../components/CenterMessage';
import { colors } from '../theme';

const Cities = ({cities, props: {navigation}}) => {
    const navigate = (item) => {
      navigation.navigate('City', { city: item })
    }

    const onPressHandler = (item) => {
        navigate(item);
    }

    return(
        <ScrollView contentContainerStyle={[!cities.length && { flex: 1 }]}>
            <View style={[!cities.length && { justifyContent: 'center', flex: 1 }]}>
                {
                    !cities.length && <CenterMessage message='No saved cities!'/>
                }

                {
                    cities.map((item, index) => (
                        <TouchableWithoutFeedback
                            onPress={() => onPressHandler(item)} key={index} >
                        <View style={styles.cityContainer}>
                            <Text style={styles.city}>{item.city}</Text>
                            <Text style={styles.country}>{item.country}</Text>
                        </View>
                        </TouchableWithoutFeedback>
                    ))
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    cityContainer: {
      padding: 10,
      borderBottomWidth: 2,
      borderBottomColor: colors.primary
    },
    city: {
      fontSize: 20,
    },
    country: {
      color: 'rgba(0, 0, 0, .5)'
    },  
  })

export default Cities;