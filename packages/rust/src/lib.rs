// generated

pub use regex;

/// Unanchored (without `^` and `$`) regex pattern as a raw string slice.
///
/// See <https://regex101.com/r/Z5Ee64/3>
pub const CLIP_REGEX_STRING: &str = r"https?://(?:clips\.twitch\.tv/(?:embed\?.*?\bclip=|/*)|(?:(?:www|go|m)\.)?twitch\.tv/(?:(?<channel>[^/]+)/)?clip/)(?<slug>[\w-]+)\S*";

/// Anchored (with `^` and `$`) compiled `regex::Regex` for exact matches.
///
/// Lazily initialized on first use.
///
/// See <https://regex101.com/r/Z5Ee64/3>
pub static CLIP_REGEX_EXACT: std::sync::LazyLock<regex::Regex> = std::sync::LazyLock::new(|| {
  regex::Regex::new(&format!("^{}$", CLIP_REGEX_STRING)).unwrap()
});
/// Capture group names for Clip URLs.
pub struct ClipGroups;
impl ClipGroups {
  /// Required
  pub const SLUG: &'static str = "slug";
  /// Optional
  pub const CHANNEL: &'static str = "channel";
}

/// Unanchored (without `^` and `$`) regex pattern as a raw string slice.
///
/// See <https://regex101.com/r/ecmX1l/5>
pub const VIDEO_REGEX_STRING: &str = r"https?://(?:(?:(?:www|go|m)\.)?twitch\.tv/(?:videos|(?<channel>[^/]+)/v(?:ideo)?)/|player\.twitch\.tv/\?.*?\bvideo=v?|www\.twitch\.tv/(?:[^/]+)/schedule\?vodID=)(?<id>\d+)\S*";

/// Anchored (with `^` and `$`) compiled `regex::Regex` for exact matches.
///
/// Lazily initialized on first use.
///
/// See <https://regex101.com/r/ecmX1l/5>
pub static VIDEO_REGEX_EXACT: std::sync::LazyLock<regex::Regex> = std::sync::LazyLock::new(|| {
  regex::Regex::new(&format!("^{}$", VIDEO_REGEX_STRING)).unwrap()
});
/// Capture group names for Video URLs.
pub struct VideoGroups;
impl VideoGroups {
  /// Required
  pub const ID: &'static str = "id";
  /// Optional
  pub const CHANNEL: &'static str = "channel";
}

/// Unanchored (without `^` and `$`) regex pattern as a raw string slice.
///
/// See <https://regex101.com/r/MAj4BQ/2>
pub const CHANNEL_REGEX_STRING: &str = r"https?://(?:(?:(?:www|go|m)\.)?twitch\.tv/|player\.twitch\.tv/\?.*?\bchannel=)(?<channel>\w+)[^\s/]*";

/// Anchored (with `^` and `$`) compiled `regex::Regex` for exact matches.
///
/// Lazily initialized on first use.
///
/// See <https://regex101.com/r/MAj4BQ/2>
pub static CHANNEL_REGEX_EXACT: std::sync::LazyLock<regex::Regex> = std::sync::LazyLock::new(|| {
  regex::Regex::new(&format!("^{}$", CHANNEL_REGEX_STRING)).unwrap()
});
/// Capture group names for Channel URLs.
pub struct ChannelGroups;
impl ChannelGroups {
  /// Required
  pub const CHANNEL: &'static str = "channel";
}

/// Unanchored (without `^` and `$`) regex pattern as a raw string slice.
///
/// See <https://regex101.com/r/lyLBUW/1>
pub const COLLECTION_REGEX_STRING: &str = r"https?://(?:(?:(?:www|go|m)\.)?twitch\.tv/collections/|player\.twitch\.tv/\?.*?\bcollection=)(?<id>[\w-]+)\S*";

/// Anchored (with `^` and `$`) compiled `regex::Regex` for exact matches.
///
/// Lazily initialized on first use.
///
/// See <https://regex101.com/r/lyLBUW/1>
pub static COLLECTION_REGEX_EXACT: std::sync::LazyLock<regex::Regex> = std::sync::LazyLock::new(|| {
  regex::Regex::new(&format!("^{}$", COLLECTION_REGEX_STRING)).unwrap()
});
/// Capture group names for Collection URLs.
pub struct CollectionGroups;
impl CollectionGroups {
  /// Required
  pub const ID: &'static str = "id";
}
