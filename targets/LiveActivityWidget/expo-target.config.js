/** @type {import('@bacons/apple-targets/app.plugin').Config} */
module.exports = {
  type: 'widget',
  name: 'LiveActivityWidget',
  deploymentTarget: '16.1',
  bundleIdentifier: '.LiveActivityWidget',
  frameworks: ['ActivityKit', 'WidgetKit', 'SwiftUI'],
};
