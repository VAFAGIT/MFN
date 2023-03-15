import React from 'react';
import { ActivityIndicator, View, ViewStyle } from 'react-native';

interface SplashScreenProps {}

const SplashScreen: React.FC<SplashScreenProps> = () => {
    const containerStyles: ViewStyle = {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black'
    };

    return (
        <View style={containerStyles}>
            <ActivityIndicator size="large" color="#ffffff" />
        </View>
    );
}

export default SplashScreen;
