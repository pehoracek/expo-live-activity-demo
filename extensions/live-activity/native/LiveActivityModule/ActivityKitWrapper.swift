import React

#if canImport(ActivityKit)
import ActivityKit

@available(iOS 16.1, *)
class ActivityKitWrapper {
  static let shared = ActivityKitWrapper()

  private var currentActivity: Activity<LiveActivityAttributes>?

  func start(params: NSDictionary,
             resolve: @escaping RCTPromiseResolveBlock,
             reject: @escaping RCTPromiseRejectBlock) {

    guard ActivityAuthorizationInfo().areActivitiesEnabled else {
      reject("NOT_ENABLED", "Live Activities are not enabled", nil)
      return
    }

    let heading = params["heading"] as? String
    if heading == nil {
      reject("INVALID_PARAMS", "Missing 'heading' parameter", nil)
      return
    }

    let attributes = LiveActivityAttributes(title: heading!)
    let contentState = LiveActivityAttributes.ContentState(
      heading: heading!
    )

    do {
      let activity = try Activity<LiveActivityAttributes>.request(
        attributes: attributes,
        contentState: contentState,
        pushType: nil
      )
      self.currentActivity = activity
      resolve(activity.id)
    } catch {
      reject("START_FAILED", "Failed to start Live Activity", error)
    }
  }

  func update(activityId: String, heading: String) {
    Task {
      if let activity = Activity<LiveActivityAttributes>.activities.first(where: { $0.id == activityId }) {
        let updatedState = LiveActivityAttributes.ContentState(
          heading: heading
        )
        await activity.update(using: updatedState)
      }
    }
  }

  func end(activityId: String) {
    Task {
      if let activity = Activity<LiveActivityAttributes>.activities.first(where: { $0.id == activityId }) {
        await activity.end(dismissalPolicy: .immediate)
        self.currentActivity = nil
      }
    }
  }
}
#endif
