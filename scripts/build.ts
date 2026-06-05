import * as fsp from 'node:fs/promises';
import { generateGo } from './generators/go.ts';
import { generatePy } from './generators/python.ts';
import { generateRs } from './generators/rust.ts';
import { generateTs } from './generators/typescript.ts';
import { PATHS, parseReadme } from './lib/utils.ts';

const main = async () => {
  const readme = await fsp.readFile(PATHS.README, 'utf-8');
  const { description, sections } = parseReadme(readme);
  console.log(`desc:\t${description}`);
  console.log(`parsed:\t${sections.map((s) => s.name).join(', ')}`);

  await Promise.all([
    generateTs(sections, description),
    generatePy(sections, description),
    generateRs(sections, description),
    generateGo(sections, description),
  ]);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
