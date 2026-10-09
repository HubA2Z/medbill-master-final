// Adsterra ad units. Keys come from the Adsterra dashboard (Websites → Get code).
export const ADS = {
  banner300x250: { key: '211d28f747c74499089a4fa5233b0a27', width: 300, height: 250, host: 'https://bauval.org' },
} as const;

export const NATIVE = { src: 'https://bauval.org/21/865407913d69e27346ce83f7746c0fce', container: 'container-865407913d69e27346ce83f7746c0fce' };
export const POPUNDER_SRC = 'https://abscloud.org/1/d93f95166e81bf83f4492b8bc25c6a8d';
export const SMARTLINK_URL = 'https://araplhn.org/4/cf5c79da0090afc6d0c3016c14c1a6ef';

export type AdUnit = keyof typeof ADS;
