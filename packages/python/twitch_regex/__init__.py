# generated

"""Regular expressions for Twitch clips, videos, channels and collections links"""

import re
from enum import Enum
from typing import TypedDict

CLIP_REGEX_STRING = r'https?://(?:clips\.twitch\.tv/(?:embed\?.*?\bclip=|/*)|(?:(?:www|go|m)\.)?twitch\.tv/(?:(?P<channel>[^/]+)/)?clip/)(?P<slug>[\w-]+)\S*'
"""Unanchored (without ^ and $) regex pattern as a plain string. See https://regex101.com/r/Z5Ee64/3"""

CLIP_REGEX_EXACT = re.compile(f'^{CLIP_REGEX_STRING}$')
"""Anchored (with ^ and $) pre-compiled re.Pattern for exact matches. See https://regex101.com/r/Z5Ee64/3"""

class ClipGroupNames(str, Enum):
  """str-based Enum of capture group names for the Clip regex"""
  slug = 'slug'
  channel = 'channel'

class ClipGroups(TypedDict, total=False):
  """TypedDict of capture group values for the Clip regex"""
  slug: str
  channel: str
ClipGroups.Names = ClipGroupNames # type: ignore

VIDEO_REGEX_STRING = r'https?://(?:(?:(?:www|go|m)\.)?twitch\.tv/(?:videos|(?P<channel>[^/]+)/v(?:ideo)?)/|player\.twitch\.tv/\?.*?\bvideo=v?|www\.twitch\.tv/(?:[^/]+)/schedule\?vodID=)(?P<id>\d+)\S*'
"""Unanchored (without ^ and $) regex pattern as a plain string. See https://regex101.com/r/ecmX1l/5"""

VIDEO_REGEX_EXACT = re.compile(f'^{VIDEO_REGEX_STRING}$')
"""Anchored (with ^ and $) pre-compiled re.Pattern for exact matches. See https://regex101.com/r/ecmX1l/5"""

class VideoGroupNames(str, Enum):
  """str-based Enum of capture group names for the Video regex"""
  id = 'id'
  channel = 'channel'

class VideoGroups(TypedDict, total=False):
  """TypedDict of capture group values for the Video regex"""
  id: str
  channel: str
VideoGroups.Names = VideoGroupNames # type: ignore

CHANNEL_REGEX_STRING = r'https?://(?:(?:(?:www|go|m)\.)?twitch\.tv/|player\.twitch\.tv/\?.*?\bchannel=)(?P<channel>\w+)[^\s/]*'
"""Unanchored (without ^ and $) regex pattern as a plain string. See https://regex101.com/r/MAj4BQ/2"""

CHANNEL_REGEX_EXACT = re.compile(f'^{CHANNEL_REGEX_STRING}$')
"""Anchored (with ^ and $) pre-compiled re.Pattern for exact matches. See https://regex101.com/r/MAj4BQ/2"""

class ChannelGroupNames(str, Enum):
  """str-based Enum of capture group names for the Channel regex"""
  channel = 'channel'

class ChannelGroups(TypedDict):
  """TypedDict of capture group values for the Channel regex"""
  channel: str
ChannelGroups.Names = ChannelGroupNames # type: ignore

COLLECTION_REGEX_STRING = r'https?://(?:(?:(?:www|go|m)\.)?twitch\.tv/collections/|player\.twitch\.tv/\?.*?\bcollection=)(?P<id>[\w-]+)\S*'
"""Unanchored (without ^ and $) regex pattern as a plain string. See https://regex101.com/r/lyLBUW/1"""

COLLECTION_REGEX_EXACT = re.compile(f'^{COLLECTION_REGEX_STRING}$')
"""Anchored (with ^ and $) pre-compiled re.Pattern for exact matches. See https://regex101.com/r/lyLBUW/1"""

class CollectionGroupNames(str, Enum):
  """str-based Enum of capture group names for the Collection regex"""
  id = 'id'

class CollectionGroups(TypedDict):
  """TypedDict of capture group values for the Collection regex"""
  id: str
CollectionGroups.Names = CollectionGroupNames # type: ignore
