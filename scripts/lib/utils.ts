import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', '..');
export const PATHS = {
  README: path.join(ROOT, 'README.md'),
  TS_OUTPUT: path.join(ROOT, 'packages', 'typescript', 'src', 'index.ts'),
  TS_PKG: path.join(ROOT, 'packages', 'typescript', 'package.json'),
  PY_OUTPUT: path.join(ROOT, 'packages', 'python', 'twitch_regex', '__init__.py'),
  PY_PKG: path.join(ROOT, 'packages', 'python', 'pyproject.toml'),
  RS_OUTPUT: path.join(ROOT, 'packages', 'rust', 'src', 'lib.rs'),
  RS_PKG: path.join(ROOT, 'packages', 'rust', 'Cargo.toml'),
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
