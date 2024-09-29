/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/azkar` | `/(tabs)/prayers` | `/(tabs)/qibla` | `/(tabs)/sabha` | `/_sitemap` | `/azkar` | `/azkarPage` | `/prayers` | `/prayersPage` | `/qibla` | `/qiblaPage` | `/sabha`;
      DynamicRoutes: `/azkar/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/azkar/[category]`;
    }
  }
}
