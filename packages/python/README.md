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

[TypeScript](../typescript/README.md) | Python | [Rust](../rust/README.md) | [Go](../go/README.md)

## Python

### Installation

```bash
pip install twitch-regex
```

### Usage

```py
import re
from typing import cast
from twitch_regex import (
  CLIP_REGEX_EXACT,
  VIDEO_REGEX_STRING,
  CHANNEL_REGEX_STRING,
  ClipGroups,
  VideoGroups,
  ChannelGroups,
)

# Exact match
clip = 'https://www.twitch.tv/xqc/clip/CulturedAmazingKuduDatSheffy-TiZ_-ixAGYR3y2Uy'
match = CLIP_REGEX_EXACT.match(clip)
if match:
  print(cast(ClipGroups, match.groupdict()))
  print(match.group(ClipGroups.Names.channel))
# {'channel': 'xqc', 'slug': 'CulturedAmazingKuduDatSheffy-TiZ_-ixAGYR3y2Uy'}
# xqc

# Custom regex (global)
text = '''Look at these videos https://www.twitch.tv/videos/1816688726
and https://m.twitch.tv/twitch/v/1816688726?t=10s'''
for match in re.finditer(VIDEO_REGEX_STRING, text):
  print(cast(VideoGroups, match.groupdict()))
# {'channel': None, 'id': '1816688726'}
# {'channel': 'twitch', 'id': '1816688726'}

# Custom regex (exact, multi line)
list = '''
https://www.twitch.tv/summit1g
https://m.twitch.tv/xqc
https://player.twitch.tv/?channel=lirik'''
for match in re.finditer(f'^{CHANNEL_REGEX_STRING}$', list, re.M):
  print(cast(ChannelGroups, match.groupdict()))
# {'channel': 'summit1g'}
# {'channel': 'xqc'}
# {'channel': 'lirik'}
```
