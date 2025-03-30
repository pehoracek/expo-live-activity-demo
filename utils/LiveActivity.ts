import { Platform, NativeModules } from "react-native";

const { LiveActivityModule } = NativeModules;

type LiveActivityParams = {
  heading: string;
};

/**
 * Starts a live activity on iOS.
 *
 * @param {LiveActivityParams} params - The parameters for the live activity.
 * @returns {Promise<string | null | undefined>} - The ID of the started live activity, or null if it failed.
 */
export const startLiveActivity = async (
  params: LiveActivityParams,
): Promise<string | null | undefined> => {
  if (Platform.OS === "ios") {
    try {
      const activityId = await LiveActivityModule.start(params);
      console.log("✅ Live Activity started with ID:", activityId);
      return activityId;
    } catch (e) {
      console.log("❌ Failed to start Live Activity:", e);
      return null;
    }
  }
};

/**
 * Updates an existing live activity on iOS.
 *
 * @param {string} activityId - The ID of the live activity to update.
 * @param {string} heading - The new heading for the live activity.
 * @returns {Promise<void>} - A promise that resolves when the update is complete.
 */
export const updateLiveActivity = async (
  activityId: string,
  heading: string,
): Promise<void> => {
  if (Platform.OS === "ios") {
    try {
      await LiveActivityModule.update(activityId, heading);
      console.log("🔄 Live Activity updated");
    } catch (e) {
      console.log("❌ Failed to update Live Activity:", e);
    }
  }
};

/**
 * Ends an existing live activity on iOS.
 *
 * @param {string} activityId - The ID of the live activity to end.
 * @returns {Promise<void>} - A promise that resolves when the live activity is ended.
 */
export const endLiveActivity = async (activityId: string): Promise<void> => {
  if (Platform.OS === "ios") {
    try {
      await LiveActivityModule.end(activityId);
      console.log("🛑 Live Activity ended");
    } catch (e) {
      console.log("❌ Failed to end Live Activity:", e);
    }
  }
};
