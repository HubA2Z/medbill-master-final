// Adsterra ad units. Paste new units here; the key comes from the Adsterra dashboard.
export const ADS = {
  banner300x250: { key: '211d28f747c74499089a4fa5233b0a27', width: 300, height: 250, host: 'https://bauval.org' },
} as const;

export type AdUnit = keyof typeof ADS;
