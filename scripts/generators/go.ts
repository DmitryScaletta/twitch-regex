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
    const optional = field.includes('?:');
    const [fName] = optional ? field.split('?:') : field.split(':');
    const n = fName!.trim();
    return { goName: toPascalCase(n), name: n, optional };
  });
  const structDef = entries
    .map((e) => `  // ${e.optional ? 'Optional' : 'Required'}\n  ${e.goName} string`)
    .join('\n');
  const structVal = entries.map((e) => `${e.goName}: "${e.name}"`).join(', ');
  return [
    `// Maps capture group names to their field names for ${name} URLs.`,
    `var ${name}Groups = struct {`,
    structDef,
    `}{ ${structVal} }`,
  ].join('\n');
};

const renderSection = (section: SectionMatchGroups) => {
  const nameUpper = section.name.toUpperCase();
  const regex = jsToPcre(section.regex);
  const names = parseGroupsToGoNames(section.name, section.groups);
  const stringDoc = [
    `// Unanchored (without ^ and $) regex pattern as a plain string for ${section.name} URLs.`,
    `//`,
    `// See ${section.url}`,
  ].join('\n');
  const exactDoc = [
    `// Anchored (with ^ and $) compiled *regexp.Regexp for exact matches.`,
    `//`,
    `// See ${section.url}`,
  ].join('\n');
  return [
    stringDoc,
    `const ${nameUpper}_REGEX_STRING = \`${regex}\``,
    '',
    exactDoc,
    `var ${nameUpper}_REGEX_EXACT = regexp.MustCompile("^" + ${nameUpper}_REGEX_STRING + "$")`,
    '',
    names,
  ].join('\n');
};

export const generateGo = async (sections: SectionMatchGroups[], description: string) => {
  const sectionsContent = sections.map(renderSection).join('\n\n');
  const desc = description.charAt(0).toLowerCase() + description.slice(1);
  const goContent = [
    '// generated',
    '',
    `// Package twitch_regex provides ${desc}.`,
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
