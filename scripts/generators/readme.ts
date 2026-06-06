import * as fsp from 'node:fs/promises';
import {
  LANGUAGES,
  PATHS,
  extractFeaturesBlock,
  extractLanguageSection,
  languageName,
  type Language,
  rewritePackagesRow,
} from '../lib/utils.ts';

const README_PATHS: Record<Language, string> = {
  typescript: PATHS.TS_README,
  python: PATHS.PY_README,
  rust: PATHS.RS_README,
  go: PATHS.GO_README,
};

const parseReadme = (readme: string) => {
  const descRe = /^#\s+\S[^\n]*\n\n([\s\S]+?)\n\n/;
  const m = readme.match(descRe);
  if (!m) throw new Error('No description found in README');
  return m[1]!.trim();
};

export const generateReadme = async (lang: Language) => {
  const readme = await fsp.readFile(PATHS.README, 'utf-8');
  const title = `# twitch-regex\n\n${parseReadme(readme)}\n\n`;
  const features = `${extractFeaturesBlock(readme)}\n\n`;
  const packagesSection = `## Packages\n\n${rewritePackagesRow(readme, lang)}\n\n`;
  const languageSection = extractLanguageSection(readme, lang);
  const content = `<!-- generated -->\n\n${title}${features}${packagesSection}${languageSection}\n`;
  await fsp.writeFile(README_PATHS[lang], content);
  console.log(`readme:\tgen ${README_PATHS[lang]} (${languageName(lang)})`);
};

export const generateAllReadmes = async () => {
  await Promise.all(LANGUAGES.map(generateReadme));
};
