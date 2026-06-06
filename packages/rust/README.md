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

[TypeScript](../typescript/README.md) | [Python](../python/README.md) | Rust | [Go](../go/README.md)

## Rust

### Installation

```toml
[dependencies]
twitch-regex = "0.1"
```

### Usage

```rust
use twitch_regex::{
  CLIP_REGEX_EXACT, ClipGroups,
  VIDEO_REGEX_STRING, VideoGroups,
  CHANNEL_REGEX_STRING, ChannelGroups,
};

// Exact match
let clip = "https://www.twitch.tv/xqc/clip/CulturedAmazingKuduDatSheffy-TiZ_-ixAGYR3y2Uy";
let caps = CLIP_REGEX_EXACT.captures(clip).unwrap();
let slug = caps.name(ClipGroups::SLUG).unwrap().as_str();
let channel = caps.name(ClipGroups::CHANNEL).map_or("", |m| m.as_str());
println!("slug={slug} channel={channel}");
// slug=CulturedAmazingKuduDatSheffy-TiZ_-ixAGYR3y2Uy channel=xqc

// Custom regex (global)
let text = "Look at these videos https://www.twitch.tv/videos/1816688726\nand https://m.twitch.tv/twitch/v/1816688726?t=10s";
let video_re = twitch_regex::regex::Regex::new(VIDEO_REGEX_STRING).unwrap();
for caps in video_re.captures_iter(text) {
  let id = caps.name(VideoGroups::ID).unwrap().as_str();
  let channel = caps.name(VideoGroups::CHANNEL).map_or("", |m| m.as_str());
  println!("id={id} channel={channel}");
}
// id=1816688726 channel=
// id=1816688726 channel=twitch

// Custom regex (exact, multi line)
let list = "https://www.twitch.tv/summit1g\nhttps://m.twitch.tv/xqc\nhttps://player.twitch.tv/?channel=lirik";
let channel_re = twitch_regex::regex::Regex::new(&format!("^{}$", CHANNEL_REGEX_STRING)).unwrap();
for caps in channel_re.captures_iter(list) {
  let channel = caps.name(ChannelGroups::CHANNEL).unwrap().as_str();
  println!("channel={channel}");
}
// channel=summit1g
// channel=xqc
// channel=lirik
```
