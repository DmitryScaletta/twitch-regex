# generated

import re
from enum import Enum
from typing import TypedDict

# clip
# https://regex101.com/r/Z5Ee64/3
CLIP_REGEX_STRING = r'https?://(?:clips\.twitch\.tv/(?:embed\?.*?\bclip=|/*)|(?:(?:www|go|m)\.)?twitch\.tv/(?:(?P<channel>[^/]+)/)?clip/)(?P<slug>[\w-]+)\S*'
CLIP_REGEX_EXACT = re.compile(f'^{CLIP_REGEX_STRING}$')

class ClipGroupNames(str, Enum):
  slug = 'slug'
  channel = 'channel'

class ClipGroups(TypedDict, total=False):
  slug: str
  channel: str
ClipGroups.Names = ClipGroupNames # type: ignore

# video
# https://regex101.com/r/ecmX1l/5
VIDEO_REGEX_STRING = r'https?://(?:(?:(?:www|go|m)\.)?twitch\.tv/(?:videos|(?P<channel>[^/]+)/v(?:ideo)?)/|player\.twitch\.tv/\?.*?\bvideo=v?|www\.twitch\.tv/(?:[^/]+)/schedule\?vodID=)(?P<id>\d+)\S*'
VIDEO_REGEX_EXACT = re.compile(f'^{VIDEO_REGEX_STRING}$')

class VideoGroupNames(str, Enum):
  id = 'id'
  channel = 'channel'

class VideoGroups(TypedDict, total=False):
  id: str
  channel: str
VideoGroups.Names = VideoGroupNames # type: ignore

# channel
# https://regex101.com/r/MAj4BQ/2
CHANNEL_REGEX_STRING = r'https?://(?:(?:(?:www|go|m)\.)?twitch\.tv/|player\.twitch\.tv/\?.*?\bchannel=)(?P<channel>\w+)[^\s/]*'
CHANNEL_REGEX_EXACT = re.compile(f'^{CHANNEL_REGEX_STRING}$')

class ChannelGroupNames(str, Enum):
  channel = 'channel'

class ChannelGroups(TypedDict):
  channel: str
ChannelGroups.Names = ChannelGroupNames # type: ignore

# collection
# https://regex101.com/r/lyLBUW/1
COLLECTION_REGEX_STRING = r'https?://(?:(?:(?:www|go|m)\.)?twitch\.tv/collections/|player\.twitch\.tv/\?.*?\bcollection=)(?P<id>[\w-]+)\S*'
COLLECTION_REGEX_EXACT = re.compile(f'^{COLLECTION_REGEX_STRING}$')

class CollectionGroupNames(str, Enum):
  id = 'id'

class CollectionGroups(TypedDict):
  id: str
CollectionGroups.Names = CollectionGroupNames # type: ignore
