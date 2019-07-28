import * as fs from "fs";
import * as path from "path";

// create the library project folders

const args = process.argv.slice(2);
if (!args.length) {
	console.error('you must provide the name of the library');
	process.exit(1);
}
const libName = args[0];

fs.mkdirSync(libName);

const distFolderName = 'dist'; // TODO make this configurable ?

copyFile('package.json', {
	name: libName,
	outDir: distFolderName
});
copyFile('tsconfig.json', {
	outDir: distFolderName
});
copyFile('jest.config.js');
copyFile('.gitignore');
createFolder('tests');

function copyFile(fileName: string, replaceMap?: { [key: string]: string }): void {
	const filePath = path.join(__dirname, '..', 'resources', fileName);
	if (!fs.existsSync(filePath)) {
		console.error(`the file ${fileName} doesn\'t exist in resources folder`);
		process.exit(1);
	}
	const fileContent = fs.readFileSync(filePath, 'utf8');
	const newFileContent = replaceMap ? changeFileContent(fileContent, replaceMap) : fileContent;
	const dest = path.join(libName, fileName);
	fs.writeFileSync(dest, newFileContent, 'utf8');
}

function createFolder(name: string): void {
	const dest = path.join(libName, name);
	fs.mkdirSync(dest);
}

function changeFileContent(src: string, replaceMap: { [key: string]: string }): string {
	for (const key in replaceMap) {
		src = replace(src, key, replaceMap[key]);
	}
	return src;
}

function replace(src: string, pattern: string, value: string): string {
	const regex = new RegExp(`{{${pattern}}}`, 'g');
	return src.replace(regex, value);
}
