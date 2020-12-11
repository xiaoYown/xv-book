// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as Path from 'path';
import { store } from './utils/store';
import { treeViewProvider } from './explorer/treeViewProvider';
import { searchOnline, setCookie } from './commands';
import { Commands } from './config';
import { TreeNode } from './explorer/TreeNode';
import { createWebView, ChapterView } from './webview/ChapterView';

let webView: ChapterView | undefined;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  store.extensionPath = context.extensionPath;
  store.booksPath = Path.join(context.extensionPath, 'book');
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "xv-book" is now active!');

  treeViewProvider.initTreeView();
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json

  context.subscriptions.push(
    vscode.commands.registerCommand(Commands.setCookie, setCookie),
    vscode.commands.registerCommand(Commands.searchOnline, searchOnline),
    vscode.commands.registerCommand(Commands.openChapterWebView, (treeNode: TreeNode) => {
			if (!webView) {
				webView = createWebView(context, vscode.ViewColumn.Active, treeNode);
				context.subscriptions.push(webView.webviewPanel);
			}
      webView.updateChapter(treeNode);
		})
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
