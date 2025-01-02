import messaging from '@react-native-firebase/messaging';
import {Alert, Platform, Linking} from 'react-native';
import notifee from '@notifee/react-native';

class NotificationPermissionHandler {
  async checkAndRequestPermissions() {
    try {
      // For iOS, we need to request permissions
      if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (!enabled) {
          this.showPermissionDialog();
        }
        return enabled;
      }
      // For Android 13+ (API level 33 and above)
      else if (Platform.OS === 'android') {
        // Request permissions for Android 13+
        await notifee.requestPermission();

        // Check if permissions were granted
        const settings = await notifee.getNotificationSettings();

        if (
          settings.authorizationStatus !==
          messaging.AuthorizationStatus.AUTHORIZED
        ) {
          this.showPermissionDialog();
          return false;
        }
        return true;
      }
    } catch (error) {
      console.error('Permission request error:', error);
      return false;
    }
  }

  showPermissionDialog() {
    Alert.alert(
      'Enable Notifications',
      "We'd like to send you notifications for important updates and reminders.",
      [
        {
          text: 'Not Now',
          onPress: () => console.log('Permission denied'),
          style: 'cancel',
        },
        {
          text: 'Settings',
          onPress: () => this.openSettings(),
        },
      ],
      {cancelable: false},
    );
  }

  async openSettings() {
    try {
      if (Platform.OS === 'ios') {
        await Linking.openSettings();
      } else {
        await Linking.openSettings();
      }
    } catch (error) {
      console.error('Error opening settings:', error);
    }
  }

  // Check current permission status
  async checkPermissionStatus() {
    try {
      const authStatus = await messaging().hasPermission();
      return {
        authorized: authStatus === messaging.AuthorizationStatus.AUTHORIZED,
        provisional: authStatus === messaging.AuthorizationStatus.PROVISIONAL,
        status: authStatus,
      };
    } catch (error) {
      console.error('Error checking permission status:', error);
      return {
        authorized: false,
        provisional: false,
        status: null,
      };
    }
  }
}

export default new NotificationPermissionHandler();
