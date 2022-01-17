// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as child_process from 'child_process';
import * as path from 'path';
import * as glob from 'glob';


const USER: string = process.env["USER"]!;
const SCRIPTABLE_PATH = `/Users/${USER}/Library/Mobile Documents/iCloud~dk~simonbs~Scriptable/Documents`;

const getCurrentWorkspacePath = () => vscode.workspace.workspaceFolders![0].uri.path;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "scriptable" is now active!');

	context.subscriptions.push(
		vscode.commands.registerCommand('scriptable.initialize', () => {
			const command = `ln -s "${SCRIPTABLE_PATH}" sources`;
			const cwd = getCurrentWorkspacePath().toString();
			if (cwd) {
				child_process.exec(command, { cwd: cwd }, () => {
					vscode.window.showInformationMessage(`Sources are initialized!`, 'OK');
					vscode.commands.executeCommand('workbench.files.action.refreshFilesExplorer');
				});
			}
		})
	);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(
		vscode.commands.registerCommand('scriptable.importScript', () => {
			glob.glob(`${SCRIPTABLE_PATH}/*.js`, {}, (er, files) => {
				const fileNames = files.map(file => path.basename(file, ".js"))
				vscode.window.showQuickPick(fileNames).then(selected => {
					const command = `ln "${SCRIPTABLE_PATH}/${selected}.js" "${selected}.js"`;
					const cwd = getCurrentWorkspacePath().toString();
					if (cwd) {
						child_process.exec(command, { cwd: cwd }, function() {
							vscode.window.showInformationMessage(`${selected} Imported!`, 'OK');
							vscode.commands.executeCommand('workbench.files.action.refreshFilesExplorer');
						});
					}
				})
			});
		})
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
