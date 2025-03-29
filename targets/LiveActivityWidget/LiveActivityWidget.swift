import SwiftUI
import WidgetKit
import ActivityKit
import Foundation

struct LiveActivityWidget: Widget {
  var body: some WidgetConfiguration {
    ActivityConfiguration(for: LiveActivityAttributes.self) { context in
      HStack {
        VStack(alignment: .leading, spacing: 4) {
          Text(context.state.heading)
            .font(.system(size: 20, weight: .bold))
        }

        Spacer()

        Image("activityIcon")
          .resizable()
          .renderingMode(.original)
          .aspectRatio(contentMode: .fit)
          .frame(width: 60, height: 60)
          .clipShape(RoundedRectangle(cornerRadius: 10))
      }
      .padding()
      .background(Color(UIColor.systemGray6))
    } dynamicIsland: { context in
      DynamicIsland {
        DynamicIslandExpandedRegion(.leading) {
          VStack {
            Image("activityIcon")
              .resizable()
              .renderingMode(.original)
              .aspectRatio(contentMode: .fit)
              .frame(width: 42, height: 42)
              .clipShape(RoundedRectangle(cornerRadius: 8))
          }
          .frame(maxHeight: .infinity, alignment: .center)
        }

        DynamicIslandExpandedRegion(.trailing) {
          VStack {
            Text(context.state.heading)
              .font(.system(size: 36, weight: .semibold))
              .monospacedDigit()
          }
          .frame(maxHeight: .infinity, alignment: .center)
        }
      } compactLeading: {
        Image("activityIcon")
          .resizable()
          .renderingMode(.original)
          .aspectRatio(contentMode: .fit)
          .frame(width: 20, height: 20)
          .clipShape(RoundedRectangle(cornerRadius: 6))
          .fixedSize()
      } compactTrailing: {
        HStack(spacing: 2) {
          Spacer(minLength: 0)
          Text(context.state.heading)
            .font(.system(size: 14, weight: .semibold))
            .lineLimit(1)
            .minimumScaleFactor(0.8)
        }
        .padding(.trailing, 2)
        .frame(maxHeight: .infinity, alignment: .trailing)
      } minimal: {
        Text("")
      }
    }
  }
}
