import { useCallback } from "react";
import { endLiveActivity, startLiveActivity } from "@/utils/LiveActivity";

import { MMKV } from "react-native-mmkv";

export const Storage = new MMKV();

const liveActivityKey = "liveActivityId";

const useLiveActivity = () => {
  const handleStartActivity = useCallback(async () => {
    const id = await startLiveActivity({
      heading: "Activity in progress",
    });
    if (id) {
      Storage.set(liveActivityKey, id);
    }
  }, []);

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
