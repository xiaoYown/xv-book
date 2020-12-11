// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { treeViewProvider } from './explorer/treeViewProvider';
import { createWebView, ChapterView } from './webview/ChapterView';
import { Commands } from './config';
import { TreeNode } from './explorer/TreeNode';
import { updateTreeView } from './commands';

let webView: ChapterView | undefined;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "e-test" is now active!');

	treeViewProvider.initTreeView();
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = ;

	context.subscriptions.push(
		vscode.commands.registerCommand('e-test.helloWorld', () => {
			vscode.window.showInformationMessage('Hello World from e-test!');
		}),
		vscode.commands.registerCommand(Commands.updateTreeNode, updateTreeView),
		vscode.commands.registerCommand(Commands.openReaderWebView, (treeNode: TreeNode) => {
			if (!webView) {
				webView = createWebView(context, vscode.ViewColumn.Active, treeNode);
				context.subscriptions.push(webView.webviewPanel);
			} else {
				webView.updateChapter(treeNode);
			}
		})
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
