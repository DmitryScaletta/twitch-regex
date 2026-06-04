import * as fsp from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PATHS = {
  README: path.join(ROOT, 'README.md'),
  TS_OUTPUT: path.join(ROOT, 'packages', 'typescript', 'src', 'index.ts'),
};

type SectionMatchGroups = {
  name: string;
  regex: string;
  url: string;
  groups: string;
};

const parseReadme = (content: string) => {
  const SECTION_REGEX =
    /### (?<name>\w+)\s*\n+(?<url>https:\/\/regex101\.com\/r\/\S+)\s*\n`type \w+ = (?<groups>\{[^}]+\});`\s*\n+```regex\n(?<regex>[\s\S]+?)\n```/g;
  const sections: SectionMatchGroups[] = [];
  for (const m of content.matchAll(SECTION_REGEX)) {
    sections.push(m.groups as SectionMatchGroups);
  }
  return sections;
};

const generateTs = (sections: SectionMatchGroups[]) => {
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
  return `// generated\n\n${sectionsContent}\n`;
};

const main = async () => {
  const readme = await fsp.readFile(PATHS.README, 'utf-8');
  const sections = parseReadme(readme);
  console.log(`Parsed: ${sections.map((s) => s.name).join(', ')}`);
  if (sections.length === 0) throw new Error('No sections found in README');

  await fsp.writeFile(PATHS.TS_OUTPUT, generateTs(sections), 'utf-8');
  console.log(`Generated TypeScript: ${PATHS.TS_OUTPUT}`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
