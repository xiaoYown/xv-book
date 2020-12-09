// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as Path from 'path';
import { store } from './utils/store';
import { openIndex } from './views/main';
// import { treeDataProvider } from './explorer/treeDataProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  store.extensionPath = context.extensionPath;
  store.booksPath = Path.join(context.extensionPath, 'book');
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "xv-book" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("xv-book.xvLook", () => {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    vscode.window.showInformationMessage("Hello World from xv-book!");
    openIndex(context);
  });

  context.subscriptions.push(
    disposable,
    // treeDataProvider
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
