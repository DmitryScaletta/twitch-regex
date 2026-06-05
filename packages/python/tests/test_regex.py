import json
import unittest
from pathlib import Path

from twitch_regex import (
  CHANNEL_REGEX_EXACT,
  CLIP_REGEX_EXACT,
  COLLECTION_REGEX_EXACT,
  VIDEO_REGEX_EXACT,
)

TESTS_JSON = Path(__file__).resolve().parents[3] / 'tests.json'

with open(TESTS_JSON) as f:
  CASES = json.load(f)


def _urls_except(category: str):
  for cat, items in CASES.items():
    if cat != category:
      for url, _ in items:
        yield url


class TestClipRegex(unittest.TestCase):
  regex = CLIP_REGEX_EXACT
  category = 'clips'

  def test_positive(self):
    for url, expected_groups in CASES[self.category]:
      match = self.regex.search(url)
      self.assertIsNotNone(match, url)
      self.assertDictEqual(match.groupdict(), expected_groups, url)

  def test_negative(self):
    for url in _urls_except(self.category):
      self.assertIsNone(self.regex.search(url), url)


class TestVideoRegex(unittest.TestCase):
  regex = VIDEO_REGEX_EXACT
  category = 'videos'

  def test_positive(self):
    for url, expected_groups in CASES[self.category]:
      match = self.regex.search(url)
      self.assertIsNotNone(match, url)
      self.assertDictEqual(match.groupdict(), expected_groups, url)

  def test_negative(self):
    for url in _urls_except(self.category):
      self.assertIsNone(self.regex.search(url), url)


class TestChannelRegex(unittest.TestCase):
  regex = CHANNEL_REGEX_EXACT
  category = 'channels'

  def test_positive(self):
    for url, expected_groups in CASES[self.category]:
      match = self.regex.search(url)
      self.assertIsNotNone(match, url)
      self.assertDictEqual(match.groupdict(), expected_groups, url)

  def test_negative(self):
    for url in _urls_except(self.category):
      self.assertIsNone(self.regex.search(url), url)


class TestCollectionRegex(unittest.TestCase):
  regex = COLLECTION_REGEX_EXACT
  category = 'collections'

  def test_positive(self):
    for url, expected_groups in CASES[self.category]:
      match = self.regex.search(url)
      self.assertIsNotNone(match, url)
      self.assertDictEqual(match.groupdict(), expected_groups, url)

  def test_negative(self):
    for url in _urls_except(self.category):
      self.assertIsNone(self.regex.search(url), url)
