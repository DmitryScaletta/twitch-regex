import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', '..');
export const PATHS = {
  README: path.join(ROOT, 'README.md'),
  TS_OUTPUT: path.join(ROOT, 'packages', 'typescript', 'src', 'index.ts'),
  TS_README: path.join(ROOT, 'packages', 'typescript', 'README.md'),
  TS_PKG: path.join(ROOT, 'packages', 'typescript', 'package.json'),
  PY_OUTPUT: path.join(ROOT, 'packages', 'python', 'twitch_regex', '__init__.py'),
  PY_README: path.join(ROOT, 'packages', 'python', 'README.md'),
  PY_PKG: path.join(ROOT, 'packages', 'python', 'pyproject.toml'),
  RS_OUTPUT: path.join(ROOT, 'packages', 'rust', 'src', 'lib.rs'),
  RS_README: path.join(ROOT, 'packages', 'rust', 'README.md'),
  RS_PKG: path.join(ROOT, 'packages', 'rust', 'Cargo.toml'),
  GO_OUTPUT: path.join(ROOT, 'packages', 'go', 'regex.go'),
  GO_README: path.join(ROOT, 'packages', 'go', 'README.md'),
};

export type SectionMatchGroups = {
  name: string;
  regex: string;
  url: string;
  groups: string;
};

export const parseReadme = (content: string) => {
  const DESC_REGEX = /^#\s+\S[^\n]*\n\n([\s\S]+?)\n\n/;
  const m = content.match(DESC_REGEX);
  if (!m) throw new Error('No description found in README');
  const description = m[1]!.trim();

  const SECTION_REGEX =
    /### (?<name>\w+)\s*\n+(?<url>https:\/\/regex101\.com\/r\/\S+)\s*\n`type \w+ = (?<groups>\{[^}]+\});`\s*\n+```regex\n(?<regex>[\s\S]+?)\n```/g;
  const sections: SectionMatchGroups[] = [];
  for (const m of content.matchAll(SECTION_REGEX)) {
    sections.push(m.groups as SectionMatchGroups);
  }
  if (sections.length === 0) throw new Error('No sections found in README');

  return { description, sections };
};

export const jsToPcre = (jsRegex: string) =>
  jsRegex.replaceAll(/\(\?<(\w+)>/g, '(?P<$1>').replaceAll('\\/', '/');

export const LANGUAGES = ['typescript', 'python', 'rust', 'go'] as const;
export type Language = (typeof LANGUAGES)[number];

const LANGUAGE_NAMES: Record<Language, string> = {
  typescript: 'TypeScript',
  python: 'Python',
  rust: 'Rust',
  go: 'Go',
};

export const languageName = (lang: Language): string => LANGUAGE_NAMES[lang];

const extractSection = (readme: string, heading: string): string => {
  const headingMarker = `## ${heading}\n`;
  const start = readme.indexOf(headingMarker);
  if (start === -1) throw new Error(`Section "${heading}" not found in README`);
  const after = start + headingMarker.length;
  const rest = readme.slice(after);
  const nextH2 = rest.search(/^## /m);
  const body = nextH2 === -1 ? rest : rest.slice(0, nextH2);
  return `${headingMarker}${body}`.replace(/\n+$/, '');
};

export const extractFeaturesBlock = (readme: string): string => extractSection(readme, 'Features');

export const extractLanguageSection = (readme: string, lang: Language): string =>
  extractSection(readme, languageName(lang));

export const rewritePackagesRow = (readme: string, current: Language): string => {
  const rowRe =
    /^\[TypeScript\]\(#typescript\)\s*\|\s*\[Python\]\(#python\)\s*\|\s*\[Rust\]\(#rust\)\s*\|\s*\[Go\]\(#go\)$/m;
  const m = readme.match(rowRe);
  if (!m) throw new Error('Packages link row not found in README');
  const parts = LANGUAGES.map((lang) => {
    const name = languageName(lang);
    if (lang === current) return name;
    return `[${name}](../${lang}/README.md)`;
  });
  return parts.join(' | ');
};
