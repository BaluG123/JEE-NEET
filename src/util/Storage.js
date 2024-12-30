import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  COMPLETED_LEVELS: '@completed_levels',
  CURRENT_LEVEL: '@current_level',
  USER_PROGRESS: '@user_progress',
};

export const StorageService = {
  saveCompletedLevel: async levelId => {
    try {
      const completed = await AsyncStorage.getItem(
        STORAGE_KEYS.COMPLETED_LEVELS,
      );
      const completedLevels = completed ? JSON.parse(completed) : [];
      if (!completedLevels.includes(levelId)) {
        completedLevels.push(levelId);
        await AsyncStorage.setItem(
          STORAGE_KEYS.COMPLETED_LEVELS,
          JSON.stringify(completedLevels),
        );
      }
    } catch (error) {
      console.error('Error saving completed level:', error);
    }
  },

  getCompletedLevels: async () => {
    try {
      const completed = await AsyncStorage.getItem(
        STORAGE_KEYS.COMPLETED_LEVELS,
      );
      return completed ? JSON.parse(completed) : [];
    } catch (error) {
      console.error('Error getting completed levels:', error);
      return [];
    }
  },

  clearProgress: async () => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.COMPLETED_LEVELS,
        STORAGE_KEYS.CURRENT_LEVEL,
        STORAGE_KEYS.USER_PROGRESS,
      ]);
    } catch (error) {
      console.error('Error clearing progress:', error);
    }
  },
};
