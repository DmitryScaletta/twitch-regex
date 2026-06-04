import * as fsp from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PATHS = {
  README: path.join(ROOT, 'README.md'),
  TS_OUTPUT: path.join(ROOT, 'packages', 'typescript', 'src', 'index.ts'),
  TS_PKG: path.join(ROOT, 'packages', 'typescript', 'package.json'),
};

type SectionMatchGroups = {
  name: string;
  regex: string;
  url: string;
  groups: string;
};

const parseReadme = (content: string) => {
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

const generateTs = async (sections: SectionMatchGroups[]) => {
  const renderSection = (section: SectionMatchGroups) => {
    const nameUpper = section.name.toUpperCase();
    return [
      `// ${section.name.toLowerCase()}`,
      `// ${section.url}`,
      `export const ${nameUpper}_REGEX_STRING =`,
      `  '${section.regex.replaceAll('\\', '\\\\')}';`,
      `export const ${nameUpper}_REGEX_EXACT = new RegExp(\`^\${${nameUpper}_REGEX_STRING}$\`);`,
      `export type ${section.name}MatchGroups = ${section.groups};`,
    ].join('\n');
  };
  const sectionsContent = sections.map(renderSection).join('\n\n');
  const tsContent = `// generated\n\n${sectionsContent}\n`;

  await fsp.writeFile(PATHS.TS_OUTPUT, tsContent);
  console.log(`TypeScript: Generated ${PATHS.TS_OUTPUT}`);
};

const updateMetaTs = async (description: string) => {
  const content = await fsp.readFile(PATHS.TS_PKG, 'utf-8');
  const updated = content.replace(
    /(\s*)"description":\s*"[^"]*"/,
    `$1"description": "${description}"`,
  );
  await fsp.writeFile(PATHS.TS_PKG, updated, 'utf-8');
  console.log(`TypeScript: Updated ${PATHS.TS_PKG}`);
};

const main = async () => {
  const readme = await fsp.readFile(PATHS.README, 'utf-8');
  const { description, sections } = parseReadme(readme);
  console.log(`Description: ${description}`);
  console.log(`Parsed: ${sections.map((s) => s.name).join(', ')}`);

  await Promise.all([generateTs(sections), updateMetaTs(description)]);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
