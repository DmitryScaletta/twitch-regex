import assert from 'node:assert';
import { describe, it } from 'node:test';
import {
  CHANNEL_REGEX_EXACT,
  CLIP_REGEX_EXACT,
  COLLECTION_REGEX_EXACT,
  VIDEO_REGEX_EXACT,
} from './index.ts';
import casesJson from '../../../tests.json' with { type: 'json' };

type Groups = Record<string, string | null>;
type Case = [url: string, groups: Groups];
type Category = keyof typeof casesJson;
type Cases = Record<Category, Case[]>;

const cases = casesJson as Cases;

for (const catName of Object.keys(cases)) {
  for (const [_, groups] of cases[catName as Category]) {
    for (const key in groups) {
      if (groups[key] === null) (groups[key] as any) = undefined;
    }
  }
}

const urlsExcept = (category: Category) =>
  Object.entries(cases)
    .filter(([catName]) => catName !== category)
    .flatMap(([, catCases]) => catCases.map(([url]) => url));

describe('twitch-regex', () => {
  describe('clip regex', () => {
    it('should match clip links', () => {
      for (const [url, groups] of cases.clips) {
        const match = url.match(CLIP_REGEX_EXACT);
        assert.deepEqual(match?.groups, groups);
      }
    });

    it('should not match non-clip links', () => {
      for (const url of urlsExcept('clips')) {
        assert.strictEqual(url.match(CLIP_REGEX_EXACT), null);
      }
    });
  });

  describe('video regex', () => {
    it('should match video links', () => {
      for (const [url, groups] of cases.videos) {
        const match = url.match(VIDEO_REGEX_EXACT);
        assert.deepEqual(match?.groups, groups);
      }
    });

    it('should not match non-video links', () => {
      for (const url of urlsExcept('videos')) {
        assert.strictEqual(url.match(VIDEO_REGEX_EXACT), null);
      }
    });
  });

  describe('channel regex', () => {
    it('should match channel links', () => {
      for (const [url, groups] of cases.channels) {
        const match = url.match(CHANNEL_REGEX_EXACT);
        assert.deepEqual(match?.groups, groups);
      }
    });

    it('should not match non-channel links', () => {
      for (const url of urlsExcept('channels')) {
        assert.strictEqual(url.match(CHANNEL_REGEX_EXACT), null);
      }
    });
  });

  describe('collection regex', () => {
    it('should match collection links', () => {
      for (const [url, groups] of cases.collections) {
        const match = url.match(COLLECTION_REGEX_EXACT);
        assert.deepEqual(match?.groups, groups);
      }
    });

    it('should not match non-collection links', () => {
      for (const url of urlsExcept('collections')) {
        assert.strictEqual(url.match(COLLECTION_REGEX_EXACT), null);
      }
    });
  });
});
