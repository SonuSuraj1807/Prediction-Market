import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.eventix.app',
  appName: 'Eventix',
  webDir: 'out',
  server: {
    url: "http://172.21.46.201:3000",
    cleartext: true,
    allowNavigation: ['*']
  }
};

export default config;
