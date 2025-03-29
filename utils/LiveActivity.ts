import { Platform, NativeModules } from "react-native";

const { LiveActivityModule } = NativeModules;

type LiveActivityParams = {
  heading: string;
};

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
