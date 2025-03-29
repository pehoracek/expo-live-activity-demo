# Live Activity Demo - RN with Expo

This is a demo project that shows how to implement live activity in an [Expo](https://expo.dev) app created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. **Install dependencies**

   Run the following command to install all necessary dependencies:

   ```bash
   npm install
   ```

2. **Set your Apple team ID**

   To configure your app for iOS, you need to set the `appleTeamId` in your `app.json` file. Alternatively, you can select your personal team in Xcode after prebuilding the app.

   Add the `appleTeamId` to your `app.json` under the `plugins` configuration:

   ```json
   {
     "expo": {
       "plugins": [
         [
           "@bacons/apple-targets",
           {
             "appleTeamId": "YOUR_APPLE_TEAM_ID"
           }
         ]
       ]
     }
   }
   ```

   Alternatively, after prebuilding the app, you can manually select your team in Xcode for both the app and widget targets.

3. **Prebuild the app**

   To prepare the app for native code and set up the necessary iOS files, prebuild the app using:

   ```bash
   npx expo prebuild --platform ios
   ```

   This step is necessary to generate the native code for iOS and ensure that everything is correctly set up for building and running on an iOS device or simulator.

4. **Start the app**

   Once everything is set up, you can start the app with the following command:

   ```bash
    npx expo start
   ```

## Learn more

To learn more about developing your project with Expo, explore the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn the fundamentals or dive into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps:

- [Expo on GitHub](https://github.com/expo/expo): View our open-source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
