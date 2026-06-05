// generated

pub use regex;

// clip
// https://regex101.com/r/Z5Ee64/3
pub const CLIP_REGEX_STRING: &str = r"https?://(?:clips\.twitch\.tv/(?:embed\?.*?\bclip=|/*)|(?:(?:www|go|m)\.)?twitch\.tv/(?:(?<channel>[^/]+)/)?clip/)(?<slug>[\w-]+)\S*";
pub static CLIP_REGEX_EXACT: std::sync::LazyLock<regex::Regex> = std::sync::LazyLock::new(|| {
  regex::Regex::new(&format!("^{}$", CLIP_REGEX_STRING)).unwrap()
});
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ClipMatchGroups {
  pub slug: String,
  pub channel: Option<String>,
}

// video
// https://regex101.com/r/ecmX1l/5
pub const VIDEO_REGEX_STRING: &str = r"https?://(?:(?:(?:www|go|m)\.)?twitch\.tv/(?:videos|(?<channel>[^/]+)/v(?:ideo)?)/|player\.twitch\.tv/\?.*?\bvideo=v?|www\.twitch\.tv/(?:[^/]+)/schedule\?vodID=)(?<id>\d+)\S*";
pub static VIDEO_REGEX_EXACT: std::sync::LazyLock<regex::Regex> = std::sync::LazyLock::new(|| {
  regex::Regex::new(&format!("^{}$", VIDEO_REGEX_STRING)).unwrap()
});
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct VideoMatchGroups {
  pub id: String,
  pub channel: Option<String>,
}

// channel
// https://regex101.com/r/MAj4BQ/2
pub const CHANNEL_REGEX_STRING: &str = r"https?://(?:(?:(?:www|go|m)\.)?twitch\.tv/|player\.twitch\.tv/\?.*?\bchannel=)(?<channel>\w+)[^\s/]*";
pub static CHANNEL_REGEX_EXACT: std::sync::LazyLock<regex::Regex> = std::sync::LazyLock::new(|| {
  regex::Regex::new(&format!("^{}$", CHANNEL_REGEX_STRING)).unwrap()
});
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ChannelMatchGroups {
  pub channel: String,
}

// collection
// https://regex101.com/r/lyLBUW/1
pub const COLLECTION_REGEX_STRING: &str = r"https?://(?:(?:(?:www|go|m)\.)?twitch\.tv/collections/|player\.twitch\.tv/\?.*?\bcollection=)(?<id>[\w-]+)\S*";
pub static COLLECTION_REGEX_EXACT: std::sync::LazyLock<regex::Regex> = std::sync::LazyLock::new(|| {
  regex::Regex::new(&format!("^{}$", COLLECTION_REGEX_STRING)).unwrap()
});
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct CollectionMatchGroups {
  pub id: String,
}
