import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  reporter: [ ['html', { open: 'always' }] ],
};
export default config;