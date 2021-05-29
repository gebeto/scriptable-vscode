// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';
import { allowedNodeEnvironmentFlags } from 'process';

const USER: string = process.env["USER"]!;
const SCRIPTABLE_PATH = `/Users/${USER}/Library/Mobile Documents/iCloud~dk~simonbs~Scriptable/Documents`

const getCurrentWorkspacePath = () => vscode.workspace.workspaceFolders![0].uri.path;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "scriptable" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('scriptable.importScript', () => {
		glob.glob(`${SCRIPTABLE_PATH}/*.js`, {}, (er, files) => {
			const fileNames = files.map(file => path.basename(file, ".js"))
			vscode.window.showQuickPick(fileNames).then(res => {
				vscode.window.showInformationMessage(`Selected: ${res}`);
			})
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
