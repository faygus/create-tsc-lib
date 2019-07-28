import * as fs from "fs";
import * as fsExtra from "fs-extra";
import * as path from "path";

const distPath = 'dist';
if (!fs.existsSync(distPath)) {
	console.error('no dist directory generated');
	process.exit(1);
}
const packageJSONFileName = 'package.json';
fs.copyFileSync(path.join(__dirname, 'files', packageJSONFileName), path.join(distPath, packageJSONFileName));

// copy resources
fsExtra.copySync('resources', path.join('dist', 'resources'));

const binPath = path.join(distPath, 'bin');
if (!fs.existsSync(binPath)) {
	fs.mkdirSync(binPath);
}
const binFileName = 'create-tsc-lib';
fs.copyFileSync(path.join(__dirname, 'files', binFileName), path.join(binPath, binFileName));
