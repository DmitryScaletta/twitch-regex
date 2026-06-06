<!-- generated -->

# twitch-regex

Regular expressions for Twitch clips, videos, channels and collections links

## Features

- Regexes for
  - Clips
  - Videos
  - Channels
  - Collections
- Regexes as strings (without `^` and `$`)
- Regexes for exact match (with `^` and `$`)
- Types for named capturing groups (TypeScript, Python)

## Packages

TypeScript | [Python](../python/README.md) | [Rust](../rust/README.md) | [Go](../go/README.md)

## TypeScript

### Installation

```bash
npm i twitch-regex
```

### Usage

```ts
import {
  CLIP_REGEX_EXACT,
  VIDEO_REGEX_STRING,
  CHANNEL_REGEX_STRING,
  type ClipMatchGroups,
  type VideoMatchGroups,
  type ChannelMatchGroups,
} from 'twitch-regex';

// Exact match
const clip = 'https://www.twitch.tv/xqc/clip/CulturedAmazingKuduDatSheffy-TiZ_-ixAGYR3y2Uy';
const match = clip.match(CLIP_REGEX_EXACT);
if (match) console.log(match.groups as ClipMatchGroups);
// { channel: 'xqc', slug: 'CulturedAmazingKuduDatSheffy-TiZ_-ixAGYR3y2Uy' }

// Custom regex (global)
const text = `Look at these videos https://www.twitch.tv/videos/1816688726
and https://m.twitch.tv/twitch/v/1816688726?t=10s`;
const videoRegex = new RegExp(VIDEO_REGEX_STRING, 'g');
for (const match of text.matchAll(videoRegex)) {
  console.log(match.groups as VideoMatchGroups);
}
// { channel: undefined, id: '1816688726' }
// { channel: 'twitch', id: '1816688726' }

// Custom regex (exact, global, multi line)
const list = `
https://www.twitch.tv/summit1g
https://m.twitch.tv/xqc
https://player.twitch.tv/?channel=lirik`;
const channelRegex = new RegExp(`^${CHANNEL_REGEX_STRING}$`, 'gm');
for (const match of list.matchAll(channelRegex)) {
  console.log(match.groups as ChannelMatchGroups);
}
// { channel: 'summit1g' }
// { channel: 'xqc' }
// { channel: 'lirik' }
```
