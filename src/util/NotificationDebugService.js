import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

class NotificationDebugService {
  async checkNotificationSetup() {
    try {
      // Check FCM Token
      const fcmToken = await messaging().getToken();
      console.log('FCM Token:', fcmToken);

      // Check Permissions
      const authStatus = await messaging().hasPermission();
      console.log('Authorization Status:', authStatus);

      // Test foreground handler
      messaging().onMessage(async remoteMessage => {
        console.log('Received foreground message:', remoteMessage);
      });

      // Test background handler
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Received background message:', remoteMessage);
      });

      // Check if Android channel exists
      const channels = await notifee.getChannels();
      console.log('Notification Channels:', channels);

      return {
        fcmToken,
        authStatus,
        channels,
        success: true,
      };
    } catch (error) {
      console.error('Notification Setup Error:', error);
      return {
        error: error.message,
        success: false,
      };
    }
  }

  // Test local notification
  async testLocalNotification() {
    try {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      await notifee.displayNotification({
        title: 'Test Notification',
        body: 'This is a test local notification',
        android: {
          channelId,
        },
      });

      return {success: true, message: 'Local notification sent'};
    } catch (error) {
      console.error('Local Notification Error:', error);
      return {success: false, error: error.message};
    }
  }
}

export default new NotificationDebugService();
