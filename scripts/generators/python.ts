import * as fsp from 'node:fs/promises';
import { PATHS, jsToPcre, type SectionMatchGroups } from '../lib/utils.ts';

const renderSection = (section: SectionMatchGroups) => {
  const nameUpper = section.name.toUpperCase();
  return [
    `# ${section.name.toLowerCase()}`,
    `# ${section.url}`,
    `${nameUpper}_REGEX_STRING = r'${jsToPcre(section.regex)}'`,
    `${nameUpper}_REGEX_EXACT = re.compile(f'^{${nameUpper}_REGEX_STRING}$')`,
  ].join('\n');
};

export const generatePy = async (sections: SectionMatchGroups[], description: string) => {
  const sectionsContent = sections.map(renderSection).join('\n\n');
  const pyContent = `# generated\n\nimport re\n\n${sectionsContent}\n`;
  await fsp.writeFile(PATHS.PY_OUTPUT, pyContent);
  console.log(`py:\tgen ${PATHS.PY_OUTPUT}`);

  const pkgContent = await fsp.readFile(PATHS.PY_PKG, 'utf-8');
  const updated = pkgContent.replace(/^(description\s*=\s*')([^']*)(')/m, `$1${description}$3`);
  await fsp.writeFile(PATHS.PY_PKG, updated, 'utf-8');
  console.log(`py:\tupd ${PATHS.PY_PKG}`);
};
