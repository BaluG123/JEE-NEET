import React, {useEffect, useState} from 'react';
import {AppState} from 'react-native';
import mobileAds, {AppOpenAd, TestIds} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.APP_OPEN
  : 'ca-app-pub-2627956667785383/4883083639'; // Replace with your actual ad unit ID

const AppOpenAdComponent = ({onAdDismissed}) => {
  const [appOpenAd, setAppOpenAd] = useState(null);
  const [isAdLoaded, setIsAdLoaded] = useState(false);

  useEffect(() => {
    // Initialize mobile ads SDK
    mobileAds()
      .initialize()
      .then(status => {
        console.log('Ads initialization status:', status);
      })
      .catch(error => {
        console.error('Ads initialization error:', error);
        // If ads fail to initialize, proceed with navigation
        onAdDismissed();
      });

    // Load the ad
    loadAd();

    // Handle app state changes
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        loadAd();
      }
    });

    return () => {
      subscription.remove();
      if (appOpenAd) {
        appOpenAd.destroy();
      }
    };
  }, []);

  const loadAd = async () => {
    try {
      const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['education', 'engineering', 'JEE'],
      });

      appOpenAd.addAdEventListener('loaded', () => {
        setIsAdLoaded(true);
        setAppOpenAd(appOpenAd);
        showAd();
      });

      appOpenAd.addAdEventListener('error', error => {
        console.error('App open ad error:', error);
        onAdDismissed();
      });

      appOpenAd.addAdEventListener('closed', () => {
        onAdDismissed();
      });

      await appOpenAd.load();
    } catch (error) {
      console.error('Failed to load app open ad:', error);
      onAdDismissed();
    }
  };

  const showAd = async () => {
    try {
      if (isAdLoaded && appOpenAd) {
        await appOpenAd.show();
      } else {
        onAdDismissed();
      }
    } catch (error) {
      console.error('Failed to show app open ad:', error);
      onAdDismissed();
    }
  };

  return null;
};

export default AppOpenAdComponent;
