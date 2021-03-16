<p align="center">
  <a href="https://virocommunity.github.io/">
    <img src="viro-logo.png" alt="ViroReact logo">
  </a>

  <h2 align="center">ViroReact</h2>

  <p align="center">
    The best AR/VR library for React Native!
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Installation instructions »</strong></a>
    <br />
    <br />
    <a href="https://discord.gg/YfxDBGTxvG">Community Discord Server</a>
    ·
    <a href="https://github.com/ViroCommunity/starter-kit">Starter Kit Project</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a>
  </p>
</p>


## About ViroReact
ViroReact is a platform for developers to rapidly build augmented reality (AR) and virtual reality (VR) experiences. Developers write in React Native, and Viro runs their code natively across all mobile VR (including Google Daydream, Samsung Gear VR, and Google Cardboard for iOS and Android) and AR (iOS ARKit and Android ARCore) platforms.

The project has gotten abandoned by the original authors, but a new group of maintainers got together on [Discord](https://discord.gg/YfxDBGTxvG) and ported ViroReact to the newest React Native version. So yes, ViroReact is again being actively developed.

The platform is free to use with no limits on distribution. It is licensed under the MIT license.


## Installation instructions
The best way to create a new React Native project with ViroReact is to start from the [Starter Kit](https://github.com/ViroCommunity/starter-kit). The steps below are for manually installing and linking the library to an existing React Native project.

1. Install the latest stable `@viro-community/react-viro` package with the `react-viro` alias:
   ```console
   $ npm install --save react-viro@npm:@viro-community/react-viro
   ```

Now it's needed to manually link the library to the iOS and Android projects. If you're unsure about which file to edit or where to put specified lines, click the link and it opens the correct part of code in our [starter-kit](https://github.com/ViroCommunity/starter-kit) repo.

### iOS linking
In the directory [`ios/`](https://github.com/ViroCommunity/starter-kit/tree/master/ios):

1. Add the following lines to your [`Podfile`](https://github.com/ViroCommunity/starter-kit/blob/master/ios/Podfile) below `use_react_native!(:path => config["reactNativePath"])`:
   ```yaml
   pod 'ViroReact', :path => '../node_modules/react-viro/ios/'
   pod 'ViroKit_static_lib', :path => '../node_modules/react-viro/ios/dist/ViroRenderer/static_lib'
   ```

2. Run
   ```console
   $ pod install
   ```

3. You're done! You can now run `npx react-native start` in one terminal window and `npx react-native run-android` in another to upload the app to your phone.

### Android linking
In the directory [`android/`](https://github.com/ViroCommunity/starter-kit/tree/master/android):

1. [`build.gradle`](https://github.com/ViroCommunity/starter-kit/blob/master/android/build.gradle): Bump the minimum SDK version to level 24 and the gradle plugin to the latest:
   ```groovy
   buildscript{
     ext{
       ...
       minSdkVersion = 24
       ...
     }
     ...
     dependencies{
       classpath('com.android.tools.build:gradle:4.1.1')
     }
   }
   ```

2. [`app/build.gradle`](https://github.com/ViroCommunity/starter-kit/blob/master/android/app/build.gradle): Add the following lines to the dependencies section below `implementation "com.facebook.react:react-native:+" // From node_modules`:
   ```groovy
   implementation project(':gvr_common')
   implementation project(':arcore_client')
   implementation project(path: ':react_viro')
   implementation project(path: ':viro_renderer')
   implementation 'com.google.android.exoplayer:exoplayer:2.7.1'
   implementation 'com.google.protobuf.nano:protobuf-javanano:3.0.0-alpha-7'
   ```

3. [`settings.gradle`](https://github.com/ViroCommunity/starter-kit/blob/master/android/settings.gradle): Add the following lines to the end:
   ```groovy
   include ':react_viro', ':arcore_client', ':gvr_common', ':viro_renderer'
   project(':arcore_client').projectDir = new File('../node_modules/react-viro/android/arcore_client')
   project(':gvr_common').projectDir = new File('../node_modules/react-viro/android/gvr_common')
   project(':viro_renderer').projectDir = new File('../node_modules/react-viro/android/viro_renderer')
   project(':react_viro').projectDir = new File('../node_modules/react-viro/android/react_viro')
   ```

4. [`gradle/wrapper/gradle-wrapper.properties`](https://github.com/ViroCommunity/starter-kit/blob/master/android/gradle/wrapper/gradle-wrapper.properties): set the `distributionUrl` to the latest version:
   ```groovy
   distributionUrl=https\://services.gradle.org/distributions/gradle-6.5-bin.zip
   ```

5. [`app/src/main/java/com/YOUR_APP/MainApplication.java`](https://github.com/ViroCommunity/starter-kit/blob/master/android/app/src/main/java/com/myviroapp/MainApplication.java):
    1. Add the following line to the end of the import list:
       ```java
       import com.viromedia.bridge.ReactViroPackage;
       ```
    2. Add the following line below `List<ReactPackage> packages = new PackageList(this).getPackages();`:
       ```java
       packages.add(new ReactViroPackage(ReactViroPackage.ViroPlatform.valueOf("AR")));
       ```
       You can replace the string `AR` with one of the following depending on your needs: `GVR`, `OVR_MOBILE`, `AR`.

6. [`app/src/main/AndroidManifest.xml`](https://github.com/ViroCommunity/starter-kit/blob/master/android/app/src/main/AndroidManifest.xml): These steps are for AR, steps for VR are in the [old documentation](https://docs.viromedia.com/docs/integrating-existing-projects-android#updating-your-androidmanifestxml):
    1. Add the following line as an argument to the `<application>` node. This is only used when debugging and is not recommended for production.
      ```xml
      android:usesCleartextTraffic="true"
      ```
    2. Add the camera permission to the `<manifest>` node below other permissions:
         ```xml
         <uses-permission android:name="android.permission.CAMERA" />
         ```
    3. Add the following line to the `<application>` node, this enables ARCore:
         ```xml
         <meta-data android:name="com.google.ar.core" android:value="optional" />
         ```

7. You're done! You can now run `npx react-native start` in one terminal window and `npx react-native run-android` in another to upload the app to your phone.


### Troubleshooting
Having troubles with the installation? Reach us on our [Discord server](https://discord.gg/YfxDBGTxvG)!



---


## Instructions for using a CI-built ViroReact platform from Mainline:
> **Warning:** these instructions might be out-dated. They are kept here just as a reference.

You can also try the latest mainline build containing bleeding edge features and fixes. Please keep in mind that mainline builds may not be as stable as release builds. To do so, simply:

1. Go to the [Viro Actions Workflows](https://github.com/ViroCommunity/viro/actions) for this project.
2. You should see a list of "Viro Bridge CI Pipeline" workflows.
3. Click on the latest successfully built workflow pipeline (should be a checkmark next to it).
4. Download the latest built ViroReact.tgz artiface.
4. Clone this repo into your workspace with git: `git clone https://github.com/ViroCommunity/viro.git`.
5. Go into the code-samples directory.
6. Run `npm install` from the root of this project.
7. Remove the ViroReact framework that was pulled down from the npm install (you are going to use the pre-built one).
8. npm install ../path/to/your/downloadedArtifact.tgz

## Instructions for manually building the ViroReact platform:
> **Warning:** these instructions might be out-dated. They are kept here just as a reference.

### Building iOS ViroReact:

1. Follow directions on our [Quick start guide](https://docs.viromedia.com/docs/quick-start) to setup dependencies.
2. Clone the repo into your workspace with git: `git clone https://github.com/ViroCommunity/viro.git`.
3. Build our iOS renderer using build instructions outlined in our [Virocore](https://github.com/ViroCommunity/virocore/blob/master/README.md) repo.
4. Verify you see new files created in `ios/dist` folder.
5. Install pods in `ios/` folder:
   ```
   cd ios
   pod install
   ```
6. Install node_modules in test folder:
   ```
   cd test
   npm install
   ```
7. Install pods in the `ViroExample` folder:
   ```
   cd test/ios/ViroExample
   pod install
   ```
8. Open `ViroExample.xcworkspace` in Xcode. (Make sure you open the .xcworkpace file, and **not*** the .xcodeproj file!)
9. Select Product->Scheme. If you don't see a `React` scheme, hit `Manage Schemes...`. In the dialog box, add `React` scheme.
10. Go through build configuration (Debug vs Release) for schemes `React`, `ViroReact` and `ViroExample` and ensure they are all either Release or Debug, depending on what you are trying to build.
11. That's it! Now build React scheme for `Generic iOS Device`, followed by ViroReact scheme for the same target.
Note:
    ```
    11.a If you want the ability to run on Simulator,
         change target to any of the `iOS Simulator` targets instead of `Generic iOS Device`.
    11.b If in your own app project setup, you prefer to include ViroReact as a static library
         rather than relying on `use_frameworks!` - build scheme `ViroReact_static_lib`
         instead of `ViroReact` as mentioned above in step #11.
    ```
12. You should see a new file `libViroReact.a` at `ios/dist/lib/libViroReact.a`.
13. To run ViroReact tests, run `ViroExample` scheme on your plugged in iOS device.

### Building Android ViroReact:
1. Under the viro directory, run `./prepareRelease.sh`.
2. Your android bridge should now be built under release.
3. You should see a new file created at android/react_viro/react_viro-release.aar
4. To build android release tests:
   ```
   $ cd test/android
   $ ./gradlew assembleGvrRelease
   ```
5. Install app-gvr-release.apk from `test/android/app/build/output/gvr/app-gvr-release.apk` onto your plugged in Android device.


### Bundling and using built iOS and Android into a single npm tar package:
1. The `./prepareRelease.sh` you ran above builds android react bridge and bundles both iOS and Android bridge into a `react-viro-*.tgz` file. * for current version from `package.json` file.

## More information

Check out our [website](http://www.viromedia.com/).

Look at our [documentation](http://docs.viromedia.com/).

Join our Slack group [here](https://join.slack.com/t/virodevelopers/shared_invite/enQtMzI3MzgwNDM2NDM5LTdhMjg5OTJkZGEwYmI0Yzg0N2JkMzJhODVmNmY4YmUyOGY4YjMyZmFmMGFhMTMyMzZiYzU0MGUxMGIzZDFiNjY).

## Sample Code
> **Note:** these code samples might be out-dated. They are kept here just as a reference. Better code samples are coming soon!

### [Figment AR (Complete Open Source App)](https://github.com/ViroCommunity/figment-ar)
A repository containing the entire source code, built using ViroReact and React Native, for Viro Media's award winning Figment AR App. Available on [Google Play](https://play.google.com/store/apps/details?id=com.viro.figment) and [App Store](https://itunes.apple.com/us/app/figment-ar/id1270018902?mt=8).

<a href="https://github.com/ViroCommunity/figment-ar"><img src="code-samples/screenshots/figment_1.png" width="200"/> <img src="code-samples/screenshots/figment_2.png" width="200"/> <img src="code-samples/screenshots/figment_3.png" width="200"/> <img src="code-samples/screenshots/figment_4.png" width="200"/></a>

#### Download complete source at https://github.com/ViroCommunity/figment-ar

### Sample Code Overview

A scene with a 360 photo that displays "Hello World".

### [360 Photo Tour](https://github.com/viromedia/viro/tree/master/code-samples/js/360PhotoTour)

<a href="https://github.com/viromedia/viro/tree/master/code-samples/js/HelloWorld">
<img src="https://raw.githubusercontent.com/viromedia/viro/master/code-samples/js/360PhotoTour/360_photo_tour.gif">
</a>

360 photo tour example that shows you how to display a 360 photo with clickable hot spots.

### [Human Body](https://github.com/viromedia/viro/tree/master/code-samples/js/HumanBody)

<a href="https://github.com/viromedia/viro/tree/master/code-samples/js/HumanBody">
<img src="https://raw.githubusercontent.com/viromedia/viro/master/code-samples/js/HumanBody/heart_demo.gif">
</a>

This example showcases 3d objects. Orbit around a 3d Heart to see it from different angles!

### [VR MediaPlayer](https://github.com/viromedia/viro/tree/master/code-samples/js/ViroMediaPlayer)

<a href="https://github.com/viromedia/viro/tree/master/code-samples/js/ViroMediaPlayer">
<img src="https://raw.githubusercontent.com/viromedia/viro/master/code-samples/js/ViroMediaPlayer/movie_theater.gif">
</a>

Learn how to display and play 2d and 360 video with interactive play controls that can play, pause and stop.

### [Product Showcase](https://github.com/viromedia/viro/tree/master/code-samples/js/ProductShowcase)

<a href="https://github.com/viromedia/viro/tree/master/code-samples/js/ProductShowcase">
<img src="https://raw.githubusercontent.com/viromedia/viro/master/code-samples/js/ProductShowcase/product_showcase.gif">
</a>

Learn how to display and play 2d and 360 video with interactive play controls that can play, pause and stop.
A demonstration on how to do an interactive shopping app for TV's. Uses flexbox for UI and 3d objects with animations.

### [AR Sample](https://github.com/viromedia/viro/tree/master/code-samples/js/ARSample)

<a href="https://github.com/viromedia/viro/tree/master/code-samples/js/ARSample">
<img src="https://raw.githubusercontent.com/viromedia/viro/master/code-samples/js/ARSample/ar_sample.gif">
</a>

A scene with objects, text and animation displayed on ARKit planes detected in the scene.

### [AR Car Marker Demo](https://github.com/viromedia/viro/tree/master/code-samples/js/ARCarDemo)

<a href="https://github.com/viromedia/viro/tree/master/code-samples/js/ARCarDemo">
<img src="https://raw.githubusercontent.com/viromedia/viro/master/code-samples/js/ARCarDemo/viro_car_marker_demo.gif">
</a>

An ARScene that looks for this [image](https://github.com/viromedia/viro/tree/master/code-samples/js/ARCarDemo/res/logo.png) and adds a model of a car with the ability to change its colors.

### [AR Driving Car Demo](https://github.com/viromedia/viro/tree/master/js/ARDrivingCarDemo)

<a href="https://github.com/viromedia/viro/tree/master/js/ARDrivingCarDemo">
<img src="https://raw.githubusercontent.com/viromedia/viro/master/code-samples/js/ARDrivingCarDemo/ARDrivingCarDemo.gif">
</a>

An ARScene that lets the user place a car on a surface and drive it around the world. See instructions in the project directory to enable the demo.

### [AR Poster Demo](https://github.com/viromedia/viro/tree/master/code-samples/js/ARPosterDemo)

<a href="https://github.com/viromedia/viro/tree/master/code-samples/js/ARPosterDemo">
<img src="https://raw.githubusercontent.com/viromedia/viro/master/code-samples/js/ARPosterDemo/viro_black_panther_marker_demo.gif">
</a>

An ARScene that searches for this vertical [marker](https://github.com/viromedia/viro/tree/master/code-samples/js/ARPosterDemo/res/blackpanther.jpg) and renders Black Panther jumping out of the marker.

### [AR Tracking Business Card Demo - iOS Only](https://github.com/viromedia/viro/tree/master/code-samples/js/ARBusinessCard)
<a href="https://github.com/viromedia/viro/tree/master/code-samples/js/ARBusinessCard">
<img src="https://github.com/vnovick/armonster-arkit2-businesscard/raw/master/business_card.gif">
</a>

An ARScene that tracks this [business card](https://github.com/viromedia/viro/blob/master/code-samples/js/ARBusinessCard/res/business_card.png) continously using image tracking.

### [AR Full Sample App](https://github.com/viromedia/ViroARSampleApp)
A complete React Native w/Viro AR Sample App. Demonstrates how to place, drag, and scale objects in the real world while providing 2D UI feedback.

<a href="https://github.com/viromedia/ViroARSampleApp">
<img src="https://raw.githubusercontent.com/viromedia/viro/master/code-samples/js/ViroARSampleApp/ar_sample_app.gif">
</a>

## Tutorials
> **Warning:** these tutorials might be out-dated. They are kept here just as a reference. Better tutorials are coming soon!

### [How to build an interactive AR app in 5 minutes](https://blog.viromedia.com/how-to-build-an-interactive-ar-app-in-5-mins-w-react-native-viro-ar-e420147e1612)

<a href="https://blog.viromedia.com/how-to-build-an-interactive-ar-app-in-5-mins-w-react-native-viro-ar-e420147e1612">
<img src="https://cdn-images-1.medium.com/max/1600/1*IwW479jvJFOwbZ7OgDJT3A.gif" />
</a>

### [How to build AR Portals in 5 minutes](https://blog.viromedia.com/how-to-build-ar-portals-in-5-mins-w-react-native-viro-ar-b939850def94)

<a href="https://blog.viromedia.com/how-to-build-ar-portals-in-5-mins-w-react-native-viro-ar-b939850def94">
<img src="https://cdn-images-1.medium.com/max/1600/1*YnWurSj2n-AtU26AvbXxVA.gif"/>
</a>

### [Add Snapchat-like AR Lenses to any app](https://blog.viromedia.com/add-snapchat-ar-lenses-to-any-app-w-react-native-viro-ar-9d4053769782)

<a href="https://blog.viromedia.com/add-snapchat-ar-lenses-to-any-app-w-react-native-viro-ar-9d4053769782">
<img src="https://cdn-images-1.medium.com/max/1600/1*iTkW2kiLIwOwJ5e_HHxI6Q.gif" />
</a>
