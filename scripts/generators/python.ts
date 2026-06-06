import * as fsp from 'node:fs/promises';
import { PATHS, jsToPcre, parseGroups, type SectionMatchGroups } from '../lib/utils.ts';

const renderTypes = (section: SectionMatchGroups) => {
  const fields = parseGroups(section.groups);
  const groupNamesClass = `${section.name}GroupNames`;
  const groupsClass = `${section.name}Groups`;
  const hasOptional = fields.some((f) => f.optional);
  const totalClause = hasOptional ? ', total=False' : '';

  const enumLines = [
    `class ${groupNamesClass}(str, Enum):`,
    `  """str-based Enum of capture group names for the ${section.name} regex"""`,
    ...fields.map((f) => `  ${f.name} = '${f.name}'`),
  ];
  const typedDictLines = [
    `class ${groupsClass}(TypedDict${totalClause}):`,
    `  """TypedDict of capture group values for the ${section.name} regex"""`,
    ...fields.map((f) => `  ${f.name}: ${f.pyType}`),
  ];
  return [
    '',
    ...enumLines,
    '',
    ...typedDictLines,
    `${groupsClass}.Names = ${groupNamesClass} # type: ignore`,
  ].join('\n');
};

const renderSection = (section: SectionMatchGroups) => {
  const nameUpper = section.name.toUpperCase();
  return [
    `${nameUpper}_REGEX_STRING = r'${jsToPcre(section.regex)}'`,
    `"""Unanchored (without ^ and $) regex pattern as a plain string. See ${section.url}"""`,
    '',
    `${nameUpper}_REGEX_EXACT = re.compile(f'^{${nameUpper}_REGEX_STRING}$')`,
    `"""Anchored (with ^ and $) pre-compiled re.Pattern for exact matches. See ${section.url}"""`,
    renderTypes(section),
  ].join('\n');
};

export const generatePy = async (sections: SectionMatchGroups[], description: string) => {
  const sectionsContent = sections.map(renderSection).join('\n\n');
  const pyContent = `# generated\n\n"""${description}"""\n\nimport re\nfrom enum import Enum\nfrom typing import TypedDict\n\n${sectionsContent}\n`;
  await fsp.writeFile(PATHS.PY_OUTPUT, pyContent);
  console.log(`py:\tgen ${PATHS.PY_OUTPUT}`);

  const pkgContent = await fsp.readFile(PATHS.PY_PKG, 'utf-8');
  const updated = pkgContent.replace(/^(description\s*=\s*')([^']*)(')/m, `$1${description}$3`);
  await fsp.writeFile(PATHS.PY_PKG, updated, 'utf-8');
  console.log(`py:\tupd ${PATHS.PY_PKG}`);
};
