export type Config = Record<ConfigProperty, boolean>;

export enum ConfigProperty {
  MEME_STAT = 'meme_stat',
  RENAME = 'rename',
  DAILY = 'daily',
  TRASH_REPLY = 'trash_reply',
}

export enum ConfigAction {
  TURN_ON = 'turn_on',
  TURN_OFF = 'turn_off',
}

export const DEFAULT_CONFIG: Config = {
  meme_stat: false,
  rename: false,
  daily: true,
  trash_reply: true,
};
