import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Cities from './cities/Cities';
import City from './cities/City';
import AddCity from './addCity/AddCity'; 

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

const Tabs = (props) => {
    const CitiesWrapper = () => <Cities {...props} />;

	return (
		<Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
			<Tab.Screen name="Cities" component={CitiesWrapper} />
			<Tab.Screen name="AddCity" component={AddCity} />
		</Tab.Navigator>
	);
}

const Nav = (props) => {
    const TabsWrapper = () => <Tabs {...props} />;

    return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Tabs">
				<Stack.Screen name="Tabs" component={TabsWrapper} />
                <Stack.Screen name="City" component={City} />
			</Stack.Navigator>
		</NavigationContainer>
    )
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