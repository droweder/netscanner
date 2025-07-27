import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.286307de071b455cbe45692d8be8f91b',
  appName: 'netscanner',
  webDir: 'dist',
  server: {
    url: "https://286307de-071b-455c-be45-692d8be8f91b.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#0f172a",
      showSpinner: false
    }
  }
};

export default config;