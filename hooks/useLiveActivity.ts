import { useCallback } from "react";
import { endLiveActivity, startLiveActivity } from "@/utils/LiveActivity";

import { MMKV } from "react-native-mmkv";

/**
 * Storage instance using MMKV for storing live activity ID.
 */
export const Storage = new MMKV();

/**
 * Key used to store the live activity ID in storage.
 */
const liveActivityKey = "liveActivityId";

/**
 * Custom hook to manage live activities.
 *
 * @returns {Object} An object containing functions to start and end live activities.
 */
const useLiveActivity = () => {
  /**
   * Starts a live activity and stores its ID in storage.
   */
  const handleStartActivity = useCallback(async () => {
    const id = await startLiveActivity({
      heading: "Activity in progress",
    });
    if (id) {
      Storage.set(liveActivityKey, id);
    }
  }, []);

  /**
   * Ends the live activity and removes its ID from storage.
   */
  const handleEndActivity = useCallback(async () => {
    const activityId = Storage.getString(liveActivityKey);
    if (activityId) {
      await endLiveActivity(activityId);
      Storage.delete(liveActivityKey);
    }
  }, []);

  return {
    handleStartActivity,
    handleEndActivity,
  };
};

export default useLiveActivity;
