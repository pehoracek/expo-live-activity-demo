// LiveActivityModule.swift
import Foundation
import React

@objc(LiveActivityModule)
class LiveActivityModule: NSObject {

  @objc
  func start(_ params: NSDictionary,
             resolver resolve: @escaping RCTPromiseResolveBlock,
             rejecter reject: @escaping RCTPromiseRejectBlock) {

    guard #available(iOS 16.1, *) else {
      reject("UNSUPPORTED", "Live Activities are only available on iOS 16.1 and above", nil)
      return
    }

    ActivityKitWrapper.shared.start(params: params, resolve: resolve, reject: reject)
  }

  @objc
  func update(_ activityId: String, heading: String) {
    guard #available(iOS 16.1, *) else {
      return
    }

    ActivityKitWrapper.shared.update(activityId: activityId, heading: heading)
  }

  @objc
  func end(_ activityId: String) {
    guard #available(iOS 16.1, *) else {
      return
    }

    ActivityKitWrapper.shared.end(activityId: activityId)
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    false
  }
}
