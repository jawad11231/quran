/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/_sitemap` | `/azkarPage` | `/prayersPage` | `/qiblaPage` | `/quranPage` | `/sabhaPage`;
      DynamicRoutes: `/azkar/${Router.SingleRoutePart<T>}` | `/surah/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/azkar/[category]` | `/surah/[id]`;
    }
  }
}
