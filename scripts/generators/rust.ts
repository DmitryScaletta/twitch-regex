import * as fsp from 'node:fs/promises';
import { PATHS, type SectionMatchGroups } from '../lib/utils.ts';

const parseGroupsToRustNames = (name: string, groups: string) => {
  const inner = groups.slice(1, -1).trim();
  if (!inner) return '';
  const fields = inner
    .split(';')
    .map((f) => f.trim())
    .filter(Boolean);
  const consts = fields.map((field) => {
    const optional = field.includes('?:');
    const [fName] = optional ? field.split('?:') : field.split(':');
    const n = fName!.trim();
    const doc = `  /// ${optional ? 'Optional' : 'Required'}`;
    return `${doc}\n  pub const ${n.toUpperCase()}: &'static str = "${n}";`;
  });
  return [
    `/// Capture group names for ${name} URLs.`,
    `pub struct ${name}Groups;`,
    `impl ${name}Groups {`,
    consts.join('\n'),
    `}`,
  ].join('\n');
};

const renderSection = (section: SectionMatchGroups) => {
  const nameUpper = section.name.toUpperCase();
  const struct = parseGroupsToRustNames(section.name, section.groups);
  const regex = section.regex.replaceAll('\\/', '/');
  const stringDoc = [
    `/// Unanchored (without \`^\` and \`$\`) regex pattern as a raw string slice.`,
    `///`,
    `/// See <${section.url}>`,
  ].join('\n');
  const exactDoc = [
    `/// Anchored (with \`^\` and \`$\`) compiled \`regex::Regex\` for exact matches.`,
    `///`,
    `/// Lazily initialized on first use.`,
    `///`,
    `/// See <${section.url}>`,
  ].join('\n');
  return [
    stringDoc,
    `pub const ${nameUpper}_REGEX_STRING: &str = r"${regex}";`,
    '',
    exactDoc,
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
