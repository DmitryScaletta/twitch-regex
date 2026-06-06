import * as fsp from 'node:fs/promises';
import { PATHS, type SectionMatchGroups } from '../lib/utils.ts';

const renderSection = (section: SectionMatchGroups) => {
  const nameUpper = section.name.toUpperCase();
  return [
    `/**`,
    ` * Unanchored (without ^ and $) regex pattern as a plain string.`,
    ` * @see ${section.url}`,
    ` */`,
    `export const ${nameUpper}_REGEX_STRING =`,
    `  '${section.regex.replaceAll('\\', '\\\\')}';`,
    `/**`,
    ` * Anchored (with ^ and $) RegExp for exact matches.`,
    ` * @see ${section.url}`,
    ` */`,
    `export const ${nameUpper}_REGEX_EXACT = new RegExp(\`^\${${nameUpper}_REGEX_STRING}$\`);`,
    `/** Type of the named capture groups for the ${section.name} regex. */`,
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
