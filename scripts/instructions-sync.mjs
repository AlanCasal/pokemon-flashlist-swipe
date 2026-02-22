#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const workspaceSourcePath = path.join(projectRoot, 'WORKSPACE_INSTRUCTIONS.md');
const projectSourcePath = path.join(projectRoot, 'AGENTS.md');
const targetPath = path.join(projectRoot, '.github', 'copilot-instructions.md');

const generatedHeader =
	'<!-- This file is auto-generated from WORKSPACE_INSTRUCTIONS.md and AGENTS.md. Do not edit directly. Run: bun run instructions:sync -->\n\n';

function readFile(filePath) {
	return fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
}

function buildGeneratedContent(workspaceSource, projectSource) {
	const workspaceContent = readFile(workspaceSource).trim();
	const projectContent = readFile(projectSource).trim();

	return `${generatedHeader}<!-- BEGIN WORKSPACE_INSTRUCTIONS.md -->\n${workspaceContent}\n<!-- END WORKSPACE_INSTRUCTIONS.md -->\n\n<!-- BEGIN AGENTS.md -->\n${projectContent}\n<!-- END AGENTS.md -->\n`;
}

const generatedContent = buildGeneratedContent(workspaceSourcePath, projectSourcePath);

fs.mkdirSync(path.dirname(targetPath), { recursive: true });
fs.writeFileSync(targetPath, generatedContent, 'utf8');

console.log(
	`Synced ${path.relative(projectRoot, targetPath)} from ${path.relative(projectRoot, workspaceSourcePath)} and ${path.relative(projectRoot, projectSourcePath)}.`,
);
