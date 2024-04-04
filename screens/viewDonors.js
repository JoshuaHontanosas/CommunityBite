import React, {useEffect, useState, useLayoutEffect} from 'react'
import { StyleSheet, Text, View, Image, Pressable, Button } from 'react-native';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import * as geoLib from 'geolib'
import { getFoodListings } from "../database.js"
import { useGlobalState } from '../globalContext';

const ViewDonors = () => {

    const [state, dispatch] = useGlobalState(); // Global state
    const [foodListings, setFoodListings] = useState(state.foodListingsList) // Stores food listings
    const [retrieveFoodListings, setRetrieveFoodListings] = useState(state.getFoodListings) // Tells when to get food listings
    
    const [errorMsg, setErrorMsg] = useState();
    const [location, setLocation] = useState();
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    // const testMarkers = [
    //     {latitude: 41.874489, longitude: -87.650581, address: "940 W Harrison St, Chicago, IL 60607", name: "Rob Johnson"},  // UIC ARC
    //     {latitude: 41.864510, longitude: -87.647070, address: "1328 S Halsted St, Chicago, IL 60608", name: "Melissa Miles"},  // University Village Starbucks
    //     {latitude: 41.867970, longitude: -87.642090, address: "1141 S Jefferson St, Chicago, IL 60607", name: "Bob Jones"}, // Manny's Cafeteria & Delicatessen
    //     {latitude: 42.055809, longitude: -87.687408, address: "2100 Ridge Ave, Evanston, IL 60201", name: "Davy Jones"}
    // ]
    const testMarkers = foodListings
    
    let lat = 41.871300
    let long = -87.649230
    
    //Function refreshMarkers() - Updates foodListingsList to get all food listings from the database.
      const refreshMarkers = () => {
        //console.log("Calling refreshMarkers")
        //if (state.getFoodListings == true){   // If-statement here if calling function infinitely
        console.log("Refreshing food listings...")
        foodListingArray = []
        getFoodListings().then(function(result){
            // Each element in foodListingArray is contained in an array: [latitude, longitude, fullName, phoneNumber]
            foodListingArray = result
            foodListingArray.forEach(element => console.log(element))

            dispatch({foodListingsList: foodListingArray, getFoodListings: false})
            setRetrieveFoodListings(false);
            setFoodListings(foodListingArray)
        }).catch(function(error){
            console.log(error)
        });
        console.log("Refreshed food listings!")
        //}
    }

    useEffect(() => {

        const getPermissions = async () => {

            let { status } = await Location.requestForegroundPermissionsAsync()

            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let currentLocation = await Location.getCurrentPositionAsync({})
            setLocation(currentLocation);
            setLatitude(currentLocation.coords.latitude);
            setLongitude(currentLocation.coords.longitude);
            //console.log(location)
        }

        getPermissions();
    }, [location])

    if(errorMsg){
        console.log("Error!");
    }
    else if(latitude && longitude){
        lat = latitude
        long = longitude
    }

    return(
    
        <View style={styles.mapContainer}>
            <MapView 
                style={styles.mapStyle} 
                provider={PROVIDER_GOOGLE} 
                showsUserLocation={true}
                showsMyLocationButton={true}
                zoomEnabled={true}  
                initialRegion={{

                    latitude: lat,
                    longitude: long,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05
                    
                }} 
                
            >
            {testMarkers.map((marker) =>(

                geoLib.isPointWithinRadius({latitude: marker.latitude, longitude: marker.longitude},{latitude: lat, longitude: long},5000) ?

                <Marker 
                    coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                    title = {marker.name}
                /> : null
                

            ))}
            <Circle 

                center={{latitude: lat, longitude: long}}
                radius={5000}

            />
            </MapView>
            <Button 
                onPress={() => refreshMarkers()}
                title="Refresh"
            >
            </Button>
            <View style={styles.locationsList}>
                {testMarkers.map((marker, index) => 
                    <View style={styles.foodListingContainer}>
                        <Text>{index+1}. {marker.name} - {marker.address}</Text>
                        <Text>{geoLib.getDistance({latitude: lat, longitude: long}, {latitude: marker.latitude, longitude: marker.longitude})} meters away</Text>
                    </View>
                )}
            </View>
                  
        </View>

    )
}

const styles = StyleSheet.create({
    mapContainer: {
        
        padding: 10,
        alignItems: "center",
        shadowOpacity: 0.4,
        shadowOffset: {
            width: 0,
            height: 0   
        },
        shadowRadius: 2,
        //height: "100%",
        
    },
    mapStyle: {
        width: '100%',
        height: "60%",
        borderRadius: 20,
        

    },
    locationsList: {

        backgroundColor: "white",
        borderRadius: 20,
        width: '100%',
        height: "38.5%",
        marginTop: 10,
        alignItems: "center",
       
    },
    foodListingContainer: {
        marginTop: 10,
    }

})

export default ViewDonors