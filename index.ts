// clip
// https://regex101.com/r/Z5Ee64/3
export const CLIP_REGEX_STRING =
  'https?:\\/\\/(?:clips\\.twitch\\.tv\\/(?:embed\\?.*?\\bclip=|\\/*)|(?:(?:www|go|m)\\.)?twitch\\.tv\\/(?:(?<channel>[^/]+)\\/)?clip\\/)(?<slug>[\\w-]+)\\S*';
export const CLIP_REGEX_EXACT = new RegExp(`^${CLIP_REGEX_STRING}$`);
export type ClipMatchGroups = { slug: string; channel?: string };

// video
// https://regex101.com/r/ecmX1l/5
export const VIDEO_REGEX_STRING =
  'https?:\\/\\/(?:(?:(?:www|go|m)\\.)?twitch\\.tv\\/(?:videos|(?<channel>[^/]+)\\/v(?:ideo)?)\\/|player\\.twitch\\.tv\\/\\?.*?\\bvideo=v?|www\\.twitch\\.tv\\/([^/]+)\\/schedule\\?vodID=)(?<id>\\d+)\\S*';
export const VIDEO_REGEX_EXACT = new RegExp(`^${VIDEO_REGEX_STRING}$`);
export type VideoMatchGroups = { id: string; channel?: string };

// channel
// https://regex101.com/r/MAj4BQ/2
export const CHANNEL_REGEX_STRING =
  'https?:\\/\\/(?:(?:(?:www|go|m)\\.)?twitch\\.tv\\/|player\\.twitch\\.tv\\/\\?.*?\\bchannel=)(?<channel>\\w+)[^\\s/]*';
export const CHANNEL_REGEX_EXACT = new RegExp(`^${CHANNEL_REGEX_STRING}$`);
export type ChannelMatchGroups = { channel: string };

// collection
// https://regex101.com/r/lyLBUW/1
export const COLLECTION_REGEX_STRING =
  'https?:\\/\\/(?:(?:(?:www|go|m)\\.)?twitch\\.tv\\/collections\\/|player\\.twitch\\.tv\\/\\?.*?\\bcollection=)(?<id>[\\w-]+)\\S*';
// prettier-ignore
export const COLLECTION_REGEX_EXACT = new RegExp(`^${COLLECTION_REGEX_STRING}$`);
export type CollectionMatchGroups = { id: string };
