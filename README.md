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
- Types for named capturing groups

## Packages

- [TypeScript](#typescript)
- [Python](#python)
- [Rust](#rust)
- [Go](#go)

## Regexes

Flavor: JavaScript

### Clip

https://regex101.com/r/Z5Ee64/3
`type ClipGroups = { slug: string; channel?: string };`

```regex
https?:\/\/(?:clips\.twitch\.tv\/(?:embed\?.*?\bclip=|\/*)|(?:(?:www|go|m)\.)?twitch\.tv\/(?:(?<channel>[^/]+)\/)?clip\/)(?<slug>[\w-]+)\S*
```

### Video

https://regex101.com/r/ecmX1l/5
`type VideoGroups = { id: string; channel?: string };`

```regex
https?:\/\/(?:(?:(?:www|go|m)\.)?twitch\.tv\/(?:videos|(?<channel>[^/]+)\/v(?:ideo)?)\/|player\.twitch\.tv\/\?.*?\bvideo=v?|www\.twitch\.tv\/(?:[^/]+)\/schedule\?vodID=)(?<id>\d+)\S*
```

### Channel

https://regex101.com/r/MAj4BQ/2
`type ChannelGroups = { channel: string };`

```regex
https?:\/\/(?:(?:(?:www|go|m)\.)?twitch\.tv\/|player\.twitch\.tv\/\?.*?\bchannel=)(?<channel>\w+)[^\s/]*
```

### Collection

https://regex101.com/r/lyLBUW/1
`type CollectionGroups = { id: string };`

```regex
https?:\/\/(?:(?:(?:www|go|m)\.)?twitch\.tv\/collections\/|player\.twitch\.tv\/\?.*?\bcollection=)(?<id>[\w-]+)\S*
```

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

## Python

TODO

## Rust

TODO

## Go

TODO
