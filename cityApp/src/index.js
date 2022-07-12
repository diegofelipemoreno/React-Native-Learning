import * as React from 'react';
import { Platform, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Cities from './cities/Cities';
import City from './cities/City';
import AddCity from './addCity/AddCity'; 

import { colors } from './theme';

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={`tabBar-${index}`}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems:"center" }}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Tabs = ({screenProps}) => {
  const {cities, addCity} = screenProps;

  const onNavigateCallback = (city) => {
    addCity(city);
  }

	return (
		<Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
			<Tab.Screen 
      name="Cities" 
      options={tabTitleStyles}
      >
      {props => <Cities cities={cities} props={props}/>}
      </Tab.Screen>
			<Tab.Screen 
      name="AddCity" 
      options={tabTitleStyles}
      >
        {props => <AddCity onNavigateHandler={onNavigateCallback} props={props}/>}
      </Tab.Screen>
		</Tab.Navigator>
	);
}

const Nav = ({screenProps}) => {
    const TabsWrapper = () => <Tabs screenProps={screenProps} />;

    const onNavigateCallback = (location, city) => {
      const {addLocation} = screenProps;

      addLocation(location, city);
    }

    return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Tabs">
				<Stack.Screen name="Tabs" component={TabsWrapper} />
        <Stack.Screen 
        name="City" 
        options={({ route }) => ({
           title: `City ${route.params.city.city}`,
           ...tabTitleStyles
        })}
        >
          {props => <City onNavigateHandler={onNavigateCallback} props={props}/>}
        </Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
    )
}


const tabTitleStyles = {
  headerStyle: {
    backgroundColor: colors.secondary,
    color: 'white',
    ...Platform.select({
      ios: {
        backgroundColor: colors.secondaryIos,
      },
      android: {
        backgroundColor: colors.secondaryAndroid,
      }
   })
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}
const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 50,
        borderRadius:50,
        justifyContent: "center",
        alignItems: "center"
    },
  });

export {Nav};