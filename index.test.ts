import assert from 'node:assert';
import { describe, it } from 'node:test';
import {
  CHANNEL_REGEX_EXACT,
  type ChannelMatchGroups,
  CLIP_REGEX_EXACT,
  type ClipMatchGroups,
  COLLECTION_REGEX_EXACT,
  type CollectionMatchGroups,
  VIDEO_REGEX_EXACT,
  type VideoMatchGroups,
} from './index.ts';

const CLIP_SLUG = 'CulturedAmazingKuduDatSheffy-TiZ_-ixAGYR3y2Uy';
const CLIP_CHANNEL = 'xqc';
// prettier-ignore
const CLIPS: [string, ClipMatchGroups][] = [
  ['https://clips.twitch.tv/CulturedAmazingKuduDatSheffy-TiZ_-ixAGYR3y2Uy',            { channel: undefined,    slug: CLIP_SLUG }],
  ['https://www.twitch.tv/xqc/clip/CulturedAmazingKuduDatSheffy-TiZ_-ixAGYR3y2Uy',     { channel: CLIP_CHANNEL, slug: CLIP_SLUG }],
  ['https://m.twitch.tv/xqc/clip/CulturedAmazingKuduDatSheffy-TiZ_-ixAGYR3y2Uy',       { channel: CLIP_CHANNEL, slug: CLIP_SLUG }],
  ['https://m.twitch.tv/clip/CulturedAmazingKuduDatSheffy-TiZ_-ixAGYR3y2Uy',           { channel: undefined,    slug: CLIP_SLUG }],
  ['https://go.twitch.tv/xqc/clip/CulturedAmazingKuduDatSheffy-TiZ_-ixAGYR3y2Uy',      { channel: CLIP_CHANNEL, slug: CLIP_SLUG }],
  ['https://clips.twitch.tv/embed?clip=CulturedAmazingKuduDatSheffy-TiZ_-ixAGYR3y2Uy', { channel: undefined,    slug: CLIP_SLUG }],
  ['https://clips.twitch.tv/embed?parent=example.com&clip=CulturedAmazingKuduDatSheffy-TiZ_-ixAGYR3y2Uy', { channel: undefined, slug: CLIP_SLUG }],
] as const;

// prettier-ignore
const VIDEOS: [string, VideoMatchGroups][] = [
  ['https://www.twitch.tv/videos/1816688726',                          { channel: undefined,  id: '1816688726',}],
  ['https://www.twitch.tv/videos/1816688726?filter=uploads&sort=time', { channel: undefined,  id: '1816688726',}],
  ['https://www.twitch.tv/twitch/v/1816688726?t=5m10s',                { channel: 'twitch',   id: '1816688726', }],
  ['https://www.twitch.tv/twitch/video/1816688726',                    { channel: 'twitch',   id: '1816688726', }],
  ['https://www.twitch.tv/tangotek/schedule?vodID=1822395420',         { channel: 'tangotek', id: '1822395420', }],
  ['https://m.twitch.tv/twitch/v/1816688726',                          { channel: 'twitch',   id: '1816688726', }],
  ['https://player.twitch.tv/?video=v1816688726&parent=example.com&autoplay=false', { channel: undefined , id: '1816688726',}],
  ['https://player.twitch.tv/?autoplay=false&video=v1816688726&parent=example.com', { channel: undefined , id: '1816688726',}],
] as const;

// prettier-ignore
const CHANNELS: [string, ChannelMatchGroups][] = [
  ['https://www.twitch.tv/summit1g',          { channel: 'summit1g' }],
  ['https://m.twitch.tv/xqc',                 { channel: 'xqc' }],
  ['https://go.twitch.tv/xqc',                { channel: 'xqc' }],
  ['https://player.twitch.tv/?channel=lirik', { channel: 'lirik' }],
  ['https://player.twitch.tv/?muted=true&channel=lirik&parent=example.com', { channel: 'lirik' }],
] as const;

// prettier-ignore
const COLLECTIONS: [string, CollectionMatchGroups][] = [
  ['https://www.twitch.tv/collections/KVe_rYFMGxiPsA', { id: 'KVe_rYFMGxiPsA' }],
  ['https://www.twitch.tv/collections/JJ-N82-m4BfH4A', { id: 'JJ-N82-m4BfH4A' }],
  ['https://player.twitch.tv/?collection=abcDeF1ghIJ2kL&parent=example.com', { id: 'abcDeF1ghIJ2kL' }],
  ['https://player.twitch.tv/?parent=example.com&collection=abcDeF1ghIJ2kL', { id: 'abcDeF1ghIJ2kL' }],
] as const;

describe('twitch-regex', () => {
  describe('clip regex', () => {
    it('should match clip links', () => {
      for (const [url, expected] of CLIPS) {
        const match = url.match(CLIP_REGEX_EXACT);
        assert.deepEqual(match?.groups, expected);
      }
    });

    it('should not match non-clip links', () => {
      for (const [url] of [...VIDEOS, ...CHANNELS, ...COLLECTIONS]) {
        assert.strictEqual(url.match(CLIP_REGEX_EXACT), null);
      }
    });
  });

  describe('video regex', () => {
    it('should match video links', () => {
      for (const [url, expected] of VIDEOS) {
        const match = url.match(VIDEO_REGEX_EXACT);
        assert.deepEqual(match?.groups, expected);
      }
    });

    it('should not match non-video links', () => {
      for (const [url] of [...CLIPS, ...CHANNELS, ...COLLECTIONS]) {
        assert.strictEqual(url.match(VIDEO_REGEX_EXACT), null);
      }
    });
  });

  describe('channel regex', () => {
    it('should match channel links', () => {
      for (const [url, expected] of CHANNELS) {
        const match = url.match(CHANNEL_REGEX_EXACT);
        assert.deepEqual(match?.groups, expected);
      }
    });

    it('should not match non-channel links', () => {
      for (const [url] of [...CLIPS, ...VIDEOS, ...COLLECTIONS]) {
        assert.strictEqual(url.match(CHANNEL_REGEX_EXACT), null);
      }
    });
  });

  describe('collection regex', () => {
    it('should match collection links', () => {
      for (const [url, expected] of COLLECTIONS) {
        const match = url.match(COLLECTION_REGEX_EXACT);
        assert.deepEqual(match?.groups, expected);
      }
    });

    it('should not match non-collection links', () => {
      for (const [url] of [...CLIPS, ...VIDEOS, ...CHANNELS]) {
        assert.strictEqual(url.match(COLLECTION_REGEX_EXACT), null);
      }
    });
  });
});
