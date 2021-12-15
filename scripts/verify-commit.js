import chalk from 'chalk';
import path from 'path';
import * as fs from 'fs';

const __dirname = path.resolve();

const msgPath = path.resolve(__dirname, '.git/COMMIT_EDITMSG');

const msg = fs.readFileSync(msgPath, 'utf-8').trim();
const rule = /^(revert: )?(feat|fix|docs|style|refactor|test|build|ci|chore|types|wip|release|perf)(\(.+\))?: .{1,50}/;

if (!rule.test(msg)) {
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`invalid commit message format.`)}\n\n` +
      chalk.red(`  Proper commit message format is required for automated changelog generation. \n  Examples:\n\n`) +
      `${chalk.green(`    feat(compiler): add 'comments' option`)}\n`
  );
  process.exit(1);
}
