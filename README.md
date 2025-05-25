# twitch-regex

Regular expressions for twitch clips, videos, channels and collections links

## Features

- Regexes as strings (without `^` and `$`)
  - `CLIP_REGEX_STRING`, `VIDEO_REGEX_STRING`, `CHANNEL_REGEX_STRING`, `COLLECTION_REGEX_STRING`
- Regexes for exact match (with `^` and `$`)
  - `CLIP_REGEX_EXACT`, `VIDEO_REGEX_EXACT`, `CHANNEL_REGEX_EXACT`, `COLLECTION_REGEX_EXACT`
- Types for named capturing groups
  - `ClipMatchGroups`, `VideoMatchGroups`, `ChannelMatchGroups`, `CollectionMatchGroups`

## Installation

```bash
npm i twitch-regex

yarn add twitch-regex

pnpm i twitch-regex
```

## Usage

### Exact match

```ts
import { CLIP_REGEX_EXACT, type ClipMatchGroups } from 'twitch-regex';

const URLS = [
  'https://clips.twitch.tv/CulturedAmazingKuduDatSheffy-TiZ_-ixAGYR3y2Uy',
  'https://www.twitch.tv/xqc/clip/CulturedAmazingKuduDatSheffy-TiZ_-ixAGYR3y2Uy',
];

for (const url of URLS) {
  const match = url.match(CLIP_REGEX_EXACT);
  if (!match) continue;
  const groups = match.groups as ClipMatchGroups;
  console.log(groups);
}

// { channel: undefined, id: 'CulturedAmazingKuduDatSheffy-TiZ_-ixAGYR3y2Uy' }
// { channel: 'xqc', id: 'CulturedAmazingKuduDatSheffy-TiZ_-ixAGYR3y2Uy' }
```

### Custom regex

```ts
import { VIDEO_REGEX_STRING, type VideoMatchGroups } from 'twitch-regex';

const text = `Look at these videos https://www.twitch.tv/videos/1816688726
and https://m.twitch.tv/twitch/v/1816688726?t=10s`;

for (const match of text.matchAll(new RegExp(VIDEO_REGEX_STRING, 'g'))) {
  const groups = match.groups as VideoMatchGroups;
  console.log(groups);
}

// { channel: undefined, id: '1816688726' }
// { channel: 'twitch', id: '1816688726' }
```
