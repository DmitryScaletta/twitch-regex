import * as fsp from 'node:fs/promises';
import { PATHS, type SectionMatchGroups } from '../lib/utils.ts';

const parseGroupsToRustStruct = (name: string, groups: string) => {
  const inner = groups.slice(1, -1).trim();
  if (!inner) return '';
  const fields = inner
    .split(';')
    .map((f) => f.trim())
    .filter(Boolean);
  const structFields = fields.map((field) => {
    const optional = field.includes('?:');
    const [fName] = optional ? field.split('?:') : field.split(':');
    const n = fName!.trim();
    return optional ? `  pub ${n}: Option<String>,` : `  pub ${n}: String,`;
  });
  return `#[derive(Debug, Clone, PartialEq, Eq)]\npub struct ${name}MatchGroups {\n${structFields.join('\n')}\n}`;
};

const renderSection = (section: SectionMatchGroups) => {
  const nameUpper = section.name.toUpperCase();
  const struct = parseGroupsToRustStruct(section.name, section.groups);
  const regex = section.regex.replaceAll('\\/', '/');
  return [
    `// ${section.name.toLowerCase()}`,
    `// ${section.url}`,
    `pub const ${nameUpper}_REGEX_STRING: &str = r"${regex}";`,
    `pub static ${nameUpper}_REGEX_EXACT: std::sync::LazyLock<regex::Regex> = std::sync::LazyLock::new(|| {`,
    `  regex::Regex::new(&format!("^{}$", ${nameUpper}_REGEX_STRING)).unwrap()`,
    `});`,
    struct,
  ].join('\n');
};

export const generateRs = async (sections: SectionMatchGroups[], description: string) => {
  const sectionsContent = sections.map(renderSection).join('\n\n');
  const rsContent = `// generated\n\npub use regex;\n\n${sectionsContent}\n`;
  await fsp.writeFile(PATHS.RS_OUTPUT, rsContent);
  console.log(`rs:\tgen ${PATHS.RS_OUTPUT}`);

  const pkgContent = await fsp.readFile(PATHS.RS_PKG, 'utf-8');
  const updated = pkgContent.replace(/(description\s*=\s*")([^"]*)(")/, `$1${description}$3`);
  await fsp.writeFile(PATHS.RS_PKG, updated, 'utf-8');
  console.log(`rs:\tupd ${PATHS.RS_PKG}`);
};
