# TrackMate

TrackMate is a premium, feature-rich travel assistant and memory tracking mobile application built with **React Native** and **Expo**. It allows travelers to plan trips, view bookings, organize photo collections, and manage their travel profiles seamlessly in a modern dark/light mode UI.

---

## 🚀 Key Features

* **Home Screen:** Discover popular destinations, read promotional carousels (with clickable coupons), and track system notifications.
* **Place Details:** View rich overview details of destinations, explore sub-locations, and initiate trip planning using the redesigned CTA button.
* **Memories & Collections:** Custom photo uploads (camera & gallery integration) associated with specific trips, viewed in a zoomable lightbox overlay.
* **Trip Dashboard:** Seamlessly track upcoming, active, completed, or cancelled bookings with comprehensive review summary cards.
* **Settings & Customization:** Configure notifications, interface appearance (Light/Dark themes), language preferences, payment methods, and help tickets.

---

## 🛠️ Technical Stack

* **Framework:** React Native (v0.86+)
* **Navigation:** React Navigation (v7)
* **Themes:** Custom theme engine with dynamic dark mode switching
* **Icons:** React Native Vector Icons (`Ionicons`) & SVG components
* **Typography:** `Lexend` typography tokens (`Light`, `Regular`, `Medium`, `SemiBold`)
* **Push Notifications:** Firebase Cloud Messaging (`@react-native-firebase/messaging`)
* **Linting:** ESLint & Prettier

---

## 🏃 Getting Started

### Prerequisites

Ensure you have completed the [React Native Environment Setup Guide](https://reactnative.dev/docs/set-up-your-environment) for Android and iOS.

### Step 1: Start Metro Bundler

Run the following command in the root folder to spin up the local Metro packager:
```bash
npm start
```

### Step 2: Run on Android Emulator / Device

Open a new terminal pane and run:
```bash
npm run android
```

### Step 3: Run on iOS Simulator / Device

1. Install CocoaPods dependencies:
   ```bash
   cd ios && bundle exec pod install && cd ..
   ```
2. Launch the application:
   ```bash
   npm run ios
   ```

---

## 📦 Building & Cleaning Android APK

If you make visual changes (such as typography adjustments or asset modifications), it is best to clean Gradle cache before compilation:

### Build a Release APK (Production)
```powershell
cd android; .\gradlew clean; .\gradlew assembleRelease
```
The compiled APK will be output to:
`android/app/build/outputs/apk/release/app-release.apk`

### Build a Debug APK (Local Testing)
```powershell
cd android; .\gradlew clean; .\gradlew assembleDebug
```
The compiled APK will be output to:
`android/app/build/outputs/apk/debug/app-debug.apk`

---

## 📝 Recent Updates & Redesigns

1. **Typography Alignment:** Resolved Outfit font missing issue by mapping all style hierarchies to the bundled `Lexend` typography tokens.
2. **Review Summary Cleanups:** Removed redundant rating stars display from the Dashboard review summary detail card.
3. **CTA Redesign:** Redesigned the Place Detail's bottom action button from a plain circular arrow to a premium orange (`#FF6B35`) "Plan Trip" pill button.
4. **Sub-Settings Theme Harmonization:** Replaced blue/teal styling on all sub-settings sheets (`Notification`, `Appearance`, `Payment Methods`, `Help & Support`, `Rate Us`) with brand orange highlights for toggles and icons.
5. **Interactive Promo Carousels:** Wrapped home page promo banners in touch containers that open informative coupon and offer codes (`SUMMER20`, `STAY15`, `WILDTOUR`) upon tap.
