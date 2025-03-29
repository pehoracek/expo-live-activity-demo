// LiveActivityAttributes.swift
import ActivityKit
import Foundation

struct LiveActivityAttributes: ActivityAttributes {
  public struct ContentState: Codable, Hashable {
    var heading: String
  }

  var title: String
}
