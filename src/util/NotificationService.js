// First, install these dependencies:
// npm install @react-native-firebase/app @react-native-firebase/messaging
// npm install @notifee/react-native

import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

class NotificationService {
  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      return true;
    }
    return false;
  }

  async getFCMToken() {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('FCM Token:', fcmToken);
        // Send this token to your server
        return fcmToken;
      }
    } catch (error) {
      console.log('Error getting FCM token:', error);
      return null;
    }
  }

  async onDisplayNotification(title, body, data = {}) {
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display notification
    await notifee.displayNotification({
      title,
      body,
      data,
      android: {
        channelId,
        smallIcon: 'ic_launcher.png', // name of icon in drawable folder
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  setupNotificationListeners() {
    // Handle background messages
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background:', remoteMessage);
      this.onDisplayNotification(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
        remoteMessage.data,
      );
    });

    // Handle foreground messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Received foreground message:', remoteMessage);
      this.onDisplayNotification(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
        remoteMessage.data,
      );
    });

    // Handle notification press
    notifee.onBackgroundEvent(async ({type, detail}) => {
      if (type === 1) {
        // PRESS event
        console.log('User pressed notification:', detail.notification);
        // Handle notification press
      }
    });

    notifee.onForegroundEvent(({type, detail}) => {
      if (type === 1) {
        // PRESS event
        console.log('User pressed notification:', detail.notification);
        // Handle notification press
      }
    });

    return unsubscribe;
  }
}

export default new NotificationService();
