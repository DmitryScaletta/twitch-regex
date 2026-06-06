// generated

// Package twitch_regex provides regular expressions for Twitch clips, videos, channels and collections links.
package twitch_regex

import "regexp"

// Unanchored (without ^ and $) regex pattern as a plain string for Clip URLs.
//
// See https://regex101.com/r/Z5Ee64/3
const CLIP_REGEX_STRING = `https?://(?:clips\.twitch\.tv/(?:embed\?.*?\bclip=|/*)|(?:(?:www|go|m)\.)?twitch\.tv/(?:(?P<channel>[^/]+)/)?clip/)(?P<slug>[\w-]+)\S*`

// Anchored (with ^ and $) compiled *regexp.Regexp for exact matches.
//
// See https://regex101.com/r/Z5Ee64/3
var CLIP_REGEX_EXACT = regexp.MustCompile("^" + CLIP_REGEX_STRING + "$")

// Maps capture group names to their field names for Clip URLs.
var ClipGroups = struct {
  // Required
  Slug string
  // Optional
  Channel string
}{ Slug: "slug", Channel: "channel" }

// Unanchored (without ^ and $) regex pattern as a plain string for Video URLs.
//
// See https://regex101.com/r/ecmX1l/5
const VIDEO_REGEX_STRING = `https?://(?:(?:(?:www|go|m)\.)?twitch\.tv/(?:videos|(?P<channel>[^/]+)/v(?:ideo)?)/|player\.twitch\.tv/\?.*?\bvideo=v?|www\.twitch\.tv/(?:[^/]+)/schedule\?vodID=)(?P<id>\d+)\S*`

// Anchored (with ^ and $) compiled *regexp.Regexp for exact matches.
//
// See https://regex101.com/r/ecmX1l/5
var VIDEO_REGEX_EXACT = regexp.MustCompile("^" + VIDEO_REGEX_STRING + "$")

// Maps capture group names to their field names for Video URLs.
var VideoGroups = struct {
  // Required
  ID string
  // Optional
  Channel string
}{ ID: "id", Channel: "channel" }

// Unanchored (without ^ and $) regex pattern as a plain string for Channel URLs.
//
// See https://regex101.com/r/MAj4BQ/2
const CHANNEL_REGEX_STRING = `https?://(?:(?:(?:www|go|m)\.)?twitch\.tv/|player\.twitch\.tv/\?.*?\bchannel=)(?P<channel>\w+)[^\s/]*`

// Anchored (with ^ and $) compiled *regexp.Regexp for exact matches.
//
// See https://regex101.com/r/MAj4BQ/2
var CHANNEL_REGEX_EXACT = regexp.MustCompile("^" + CHANNEL_REGEX_STRING + "$")

// Maps capture group names to their field names for Channel URLs.
var ChannelGroups = struct {
  // Required
  Channel string
}{ Channel: "channel" }

// Unanchored (without ^ and $) regex pattern as a plain string for Collection URLs.
//
// See https://regex101.com/r/lyLBUW/1
const COLLECTION_REGEX_STRING = `https?://(?:(?:(?:www|go|m)\.)?twitch\.tv/collections/|player\.twitch\.tv/\?.*?\bcollection=)(?P<id>[\w-]+)\S*`

// Anchored (with ^ and $) compiled *regexp.Regexp for exact matches.
//
// See https://regex101.com/r/lyLBUW/1
var COLLECTION_REGEX_EXACT = regexp.MustCompile("^" + COLLECTION_REGEX_STRING + "$")

// Maps capture group names to their field names for Collection URLs.
var CollectionGroups = struct {
  // Required
  ID string
}{ ID: "id" }
