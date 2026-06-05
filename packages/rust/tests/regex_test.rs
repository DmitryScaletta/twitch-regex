use std::collections::BTreeMap;

use serde::Deserialize;
use twitch_regex::*;

#[derive(Deserialize)]
struct TestCase {
  url: String,
  groups: BTreeMap<String, Option<String>>,
}

type Cases = BTreeMap<String, Vec<TestCase>>;

fn load_cases() -> Cases {
  serde_json::from_str(include_str!("../../../tests.json")).unwrap()
}

fn urls_except<'a>(
  cases: &'a Cases,
  category: &'a str,
) -> impl Iterator<Item = &'a str> + 'a {
  cases
    .iter()
    .filter(move |(cat, _)| cat.as_str() != category)
    .flat_map(|(_, items)| items.iter().map(|c| c.url.as_str()))
}

fn check(regex: &regex::Regex, cases: &Cases, category: &str) {
  for case in &cases[category] {
    let caps = regex
      .captures(&case.url)
      .unwrap_or_else(|| panic!("no match: {}", case.url));
    for (key, expected) in &case.groups {
      let actual = caps.name(key).map(|m| m.as_str());
      assert_eq!(actual, expected.as_deref(), "key={key}, url={}", case.url);
    }
  }
  for url in urls_except(cases, category) {
    assert!(regex.captures(url).is_none(), "unexpected match: {url}");
  }
}

#[test]
fn clip() { check(&CLIP_REGEX_EXACT, &load_cases(), "clips"); }

#[test]
fn video() { check(&VIDEO_REGEX_EXACT, &load_cases(), "videos"); }

#[test]
fn channel() { check(&CHANNEL_REGEX_EXACT, &load_cases(), "channels"); }

#[test]
fn collection() { check(&COLLECTION_REGEX_EXACT, &load_cases(), "collections"); }
