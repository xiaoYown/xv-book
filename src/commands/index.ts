import { window } from 'vscode';
import { readerDriver } from '../reader/qimao';
import { explorerNodeManager } from '../explorer/explorerNodeManager';
import { treeViewProvider } from '../explorer/treeViewProvider';
import { Notification } from '../utils/notification';

const _searchOnline = async function (msg: string) {
  const notification = new Notification(`搜索: ${msg}`);
  try {
    // const vConfig = workspace.getConfiguration('z-reader');
    // const onlineSite: string = vConfig.get('onlineSite', '起点');
    const treeNode = await readerDriver.search(msg);
    explorerNodeManager.setTreeNode(treeNode);
    treeViewProvider.fire();
  } catch (error) {
    console.warn(error);
  }
  notification.stop();
};

export const searchOnline = async function () {
  try {
    const msg = await window.showInputBox({
      password: false,
      ignoreFocusOut: false,
      placeHolder: '请输入小说的名字',
      prompt: ''
    });
    if (msg) {
      _searchOnline(msg);
    }
  } catch (error) {
    console.warn(error);
  }
};