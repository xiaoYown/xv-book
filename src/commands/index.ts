import { window } from 'vscode';
import { treeViewProvider } from '../explorer/treeViewProvider';
import { explorerNodeManager } from '../explorer/explorerNodeManager'

export const updateTreeView = async function () {
  treeViewProvider.fire();
  explorerNodeManager.createRandomNode();
  // const msg = await window.showInputBox({
  //   password: false,
  //   ignoreFocusOut: false,
  //   placeHolder: '请输入 cookie',
  //   prompt: ''
  // });
  // if (msg) {
  // }
}