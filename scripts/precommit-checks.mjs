#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

function run(command, args) {
	execFileSync(command, args, { cwd: projectRoot, stdio: "inherit" });
}

function getStagedFiles() {
	const output = execFileSync(
		"git",
		["diff", "--cached", "--name-only", "--diff-filter=ACMR", "-z"],
		{ cwd: projectRoot },
	);

	return output
		.toString("utf8")
		.split("\u0000")
		.filter(Boolean)
		.map((filePath) => filePath.trim())
		.filter(Boolean);
}

const ignoredLintFiles = new Set(["metro.config.js", "babel.config.js", "todos.js"]);
const stagedLintFiles = getStagedFiles().filter((filePath) =>
	/\.(js|jsx|ts|tsx)$/.test(filePath) && !ignoredLintFiles.has(filePath),
);
const stagedTsFiles = stagedLintFiles.filter((filePath) =>
	/\.(ts|tsx)$/.test(filePath),
);

if (!stagedLintFiles.length) {
	console.log("No staged JS/TS files found. Skipping checks.");
	process.exit(0);
}

console.log("Linting staged JS/TS files...");
run("bunx", ["eslint", "--max-warnings=0", ...stagedLintFiles]);

if (!stagedTsFiles.length) {
	console.log("No staged TypeScript files found. Skipping TypeScript check.");
	process.exit(0);
}

const tempTsconfigPath = path.join(projectRoot, ".tsconfig.precommit.tmp.json");
const tsconfig = {
	extends: "./tsconfig.json",
	include: ["**/*.d.ts", ...stagedTsFiles],
};

try {
	fs.writeFileSync(tempTsconfigPath, JSON.stringify(tsconfig, null, 2));
	console.log("Type-checking staged TypeScript files...");
	run("bunx", ["tsc", "--noEmit", "--pretty", "false", "-p", tempTsconfigPath]);
} finally {
	if (fs.existsSync(tempTsconfigPath)) {
		fs.unlinkSync(tempTsconfigPath);
	}
}
