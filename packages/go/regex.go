// generated

// Package twitch_regex regular expressions for Twitch clips, videos, channels and collections links
package twitch_regex

import "regexp"

// clip
// https://regex101.com/r/Z5Ee64/3
const CLIP_REGEX_STRING = `https?://(?:clips\.twitch\.tv/(?:embed\?.*?\bclip=|/*)|(?:(?:www|go|m)\.)?twitch\.tv/(?:(?P<channel>[^/]+)/)?clip/)(?P<slug>[\w-]+)\S*`
var CLIP_REGEX_EXACT = regexp.MustCompile("^" + CLIP_REGEX_STRING + "$")
var ClipGroups = struct {
  Slug string
  Channel string
}{ Slug: "slug", Channel: "channel" }

// video
// https://regex101.com/r/ecmX1l/5
const VIDEO_REGEX_STRING = `https?://(?:(?:(?:www|go|m)\.)?twitch\.tv/(?:videos|(?P<channel>[^/]+)/v(?:ideo)?)/|player\.twitch\.tv/\?.*?\bvideo=v?|www\.twitch\.tv/(?:[^/]+)/schedule\?vodID=)(?P<id>\d+)\S*`
var VIDEO_REGEX_EXACT = regexp.MustCompile("^" + VIDEO_REGEX_STRING + "$")
var VideoGroups = struct {
  ID string
  Channel string
}{ ID: "id", Channel: "channel" }

// channel
// https://regex101.com/r/MAj4BQ/2
const CHANNEL_REGEX_STRING = `https?://(?:(?:(?:www|go|m)\.)?twitch\.tv/|player\.twitch\.tv/\?.*?\bchannel=)(?P<channel>\w+)[^\s/]*`
var CHANNEL_REGEX_EXACT = regexp.MustCompile("^" + CHANNEL_REGEX_STRING + "$")
var ChannelGroups = struct {
  Channel string
}{ Channel: "channel" }

// collection
// https://regex101.com/r/lyLBUW/1
const COLLECTION_REGEX_STRING = `https?://(?:(?:(?:www|go|m)\.)?twitch\.tv/collections/|player\.twitch\.tv/\?.*?\bcollection=)(?P<id>[\w-]+)\S*`
var COLLECTION_REGEX_EXACT = regexp.MustCompile("^" + COLLECTION_REGEX_STRING + "$")
var CollectionGroups = struct {
  ID string
}{ ID: "id" }
