import * as fsp from 'node:fs/promises';
import { PATHS, jsToPcre, type SectionMatchGroups } from '../lib/utils.ts';

const toPascalCase = (name: string) =>
  name === 'id' ? 'ID' : name.charAt(0).toUpperCase() + name.slice(1);

const parseGroupsToGoNames = (name: string, groups: string) => {
  const inner = groups.slice(1, -1).trim();
  if (!inner) return '';
  const fields = inner
    .split(';')
    .map((f) => f.trim())
    .filter(Boolean);
  const entries = fields.map((field) => {
    const [fName] = field.includes('?:') ? field.split('?:') : field.split(':');
    const n = fName!.trim();
    return { goName: toPascalCase(n), name: n };
  });
  const structDef = entries.map((e) => `  ${e.goName} string`).join('\n');
  const structVal = entries.map((e) => `${e.goName}: "${e.name}"`).join(', ');
  return `var ${name}Groups = struct {\n${structDef}\n}{ ${structVal} }`;
};

const renderSection = (section: SectionMatchGroups) => {
  const nameUpper = section.name.toUpperCase();
  const regex = jsToPcre(section.regex);
  const names = parseGroupsToGoNames(section.name, section.groups);
  return [
    `// ${section.name.toLowerCase()}`,
    `// ${section.url}`,
    `const ${nameUpper}_REGEX_STRING = \`${regex}\``,
    `var ${nameUpper}_REGEX_EXACT = regexp.MustCompile("^" + ${nameUpper}_REGEX_STRING + "$")`,
    names,
  ].join('\n');
};

export const generateGo = async (sections: SectionMatchGroups[], description: string) => {
  const sectionsContent = sections.map(renderSection).join('\n\n');
  const desc = description.charAt(0).toLowerCase() + description.slice(1);
  const goContent = [
    '// generated',
    '',
    `// Package twitch_regex ${desc}`,
    'package twitch_regex',
    '',
    'import "regexp"',
    '',
    sectionsContent,
    '',
  ].join('\n');
  await fsp.writeFile(PATHS.GO_OUTPUT, goContent);
  console.log(`go:\tgen ${PATHS.GO_OUTPUT}`);
};
