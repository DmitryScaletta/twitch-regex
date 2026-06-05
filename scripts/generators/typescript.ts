import * as fsp from 'node:fs/promises';
import { PATHS, type SectionMatchGroups } from '../lib/utils.ts';

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

export const generateTs = async (sections: SectionMatchGroups[], description: string) => {
  const sectionsContent = sections.map(renderSection).join('\n\n');
  const tsContent = `// generated\n\n${sectionsContent}\n`;
  await fsp.writeFile(PATHS.TS_OUTPUT, tsContent);
  console.log(`ts:\tgen ${PATHS.TS_OUTPUT}`);

  const pkgContent = await fsp.readFile(PATHS.TS_PKG, 'utf-8');
  const updated = pkgContent.replace(
    /(\s*)"description":\s*"[^"]*"/,
    `$1"description": "${description}"`,
  );
  await fsp.writeFile(PATHS.TS_PKG, updated, 'utf-8');
  console.log(`ts:\tupd ${PATHS.TS_PKG}`);
};
