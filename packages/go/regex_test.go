package twitch_regex

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"runtime"
	"testing"
)

type testCase struct {
	URL    string
	Groups map[string]*string
}

func (c *testCase) UnmarshalJSON(data []byte) error {
	var tuple []json.RawMessage
	if err := json.Unmarshal(data, &tuple); err != nil {
		return err
	}
	if len(tuple) != 2 {
		return fmt.Errorf("expected 2 elements, got %d", len(tuple))
	}
	if err := json.Unmarshal(tuple[0], &c.URL); err != nil {
		return err
	}
	return json.Unmarshal(tuple[1], &c.Groups)
}

type testCases map[string][]testCase

func loadCases(t *testing.T) testCases {
	t.Helper()
	_, thisFile, _, ok := runtime.Caller(0)
	if !ok {
		t.Fatal("runtime.Caller failed")
	}
	path := filepath.Join(filepath.Dir(thisFile), "..", "..", "tests.json")
	data, err := os.ReadFile(path)
	if err != nil {
		t.Fatalf("read tests.json: %v", err)
	}
	var cases testCases
	if err := json.Unmarshal(data, &cases); err != nil {
		t.Fatalf("unmarshal tests.json: %v", err)
	}
	return cases
}

func urlsExcept(cases testCases, category string) []string {
	var urls []string
	for cat, items := range cases {
		if cat == category {
			continue
		}
		for _, c := range items {
			urls = append(urls, c.URL)
		}
	}
	return urls
}

func checkPositive(t *testing.T, re *regexp.Regexp, category string, cases testCases) {
	t.Helper()
	for _, c := range cases[category] {
		match := re.FindStringSubmatch(c.URL)
		if match == nil {
			t.Fatalf("expected match for %q", c.URL)
		}
		for name, expected := range c.Groups {
			idx := re.SubexpIndex(name)
			if idx < 0 {
				t.Errorf("regex has no group %q (url=%q)", name, c.URL)
				continue
			}
			actual := match[idx]
			want := ""
			if expected != nil {
				want = *expected
			}
			if actual != want {
				t.Errorf("group %q: expected %q, got %q (url=%q)", name, want, actual, c.URL)
			}
		}
	}
}

func checkNegative(t *testing.T, re *regexp.Regexp, category string, cases testCases) {
	t.Helper()
	for _, url := range urlsExcept(cases, category) {
		if re.MatchString(url) {
			t.Errorf("unexpected match for %q", url)
		}
	}
}

func TestClipRegex(t *testing.T) {
	cases := loadCases(t)
	t.Run("should match clip links", func(t *testing.T) {
		checkPositive(t, CLIP_REGEX_EXACT, "clips", cases)
	})
	t.Run("should not match non-clip links", func(t *testing.T) {
		checkNegative(t, CLIP_REGEX_EXACT, "clips", cases)
	})
}

func TestVideoRegex(t *testing.T) {
	cases := loadCases(t)
	t.Run("should match video links", func(t *testing.T) {
		checkPositive(t, VIDEO_REGEX_EXACT, "videos", cases)
	})
	t.Run("should not match non-video links", func(t *testing.T) {
		checkNegative(t, VIDEO_REGEX_EXACT, "videos", cases)
	})
}

func TestChannelRegex(t *testing.T) {
	cases := loadCases(t)
	t.Run("should match channel links", func(t *testing.T) {
		checkPositive(t, CHANNEL_REGEX_EXACT, "channels", cases)
	})
	t.Run("should not match non-channel links", func(t *testing.T) {
		checkNegative(t, CHANNEL_REGEX_EXACT, "channels", cases)
	})
}

func TestCollectionRegex(t *testing.T) {
	cases := loadCases(t)
	t.Run("should match collection links", func(t *testing.T) {
		checkPositive(t, COLLECTION_REGEX_EXACT, "collections", cases)
	})
	t.Run("should not match non-collection links", func(t *testing.T) {
		checkNegative(t, COLLECTION_REGEX_EXACT, "collections", cases)
	})
}
