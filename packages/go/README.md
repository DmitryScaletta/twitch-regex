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

[TypeScript](../typescript/README.md) | [Python](../python/README.md) | [Rust](../rust/README.md) | Go

## Go

### Installation

```bash
go get github.com/DmitryScaletta/twitch-regex/packages/go
```

### Usage

```go
import (
  "fmt"
  "regexp"

  twitch_regex "github.com/DmitryScaletta/twitch-regex/packages/go"
)

// Exact match
const clip = "https://www.twitch.tv/xqc/clip/CulturedAmazingKuduDatSheffy-TiZ_-ixAGYR3y2Uy"
match := twitch_regex.CLIP_REGEX_EXACT.FindStringSubmatch(clip)
if match != nil {
  slug := match[twitch_regex.CLIP_REGEX_EXACT.SubexpIndex(twitch_regex.ClipGroups.Slug)]
  channel := match[twitch_regex.CLIP_REGEX_EXACT.SubexpIndex(twitch_regex.ClipGroups.Channel)]
  fmt.Printf("slug=%s channel=%s\n", slug, channel)
}
// slug=CulturedAmazingKuduDatSheffy-TiZ_-ixAGYR3y2Uy channel=xqc

// Custom regex (global)
const text = "Look at these videos https://www.twitch.tv/videos/1816688726\nand https://m.twitch.tv/twitch/v/1816688726?t=10s"
videoRegex := regexp.MustCompile(twitch_regex.VIDEO_REGEX_STRING)
for _, match := range videoRegex.FindAllStringSubmatch(text, -1) {
  id := match[videoRegex.SubexpIndex(twitch_regex.VideoGroups.ID)]
  channel := match[videoRegex.SubexpIndex(twitch_regex.VideoGroups.Channel)]
  fmt.Printf("id=%s channel=%s\n", id, channel)
}
// id=1816688726 channel=
// id=1816688726 channel=twitch

// Custom regex (exact, multi line)
const list = "https://www.twitch.tv/summit1g\nhttps://m.twitch.tv/xqc\nhttps://player.twitch.tv/?channel=lirik"
channelRegex := regexp.MustCompile("^" + twitch_regex.CHANNEL_REGEX_STRING + "$")
for _, match := range channelRegex.FindAllStringSubmatch(list, -1) {
  channel := match[channelRegex.SubexpIndex(twitch_regex.ChannelGroups.Channel)]
  fmt.Printf("channel=%s\n", channel)
}
// channel=summit1g
// channel=xqc
// channel=lirik
```
