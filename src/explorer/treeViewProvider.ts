import {
  TreeDataProvider,
  TreeItem,
  TreeItemCollapsibleState,
  ProviderResult,
  window,
  Event,
  EventEmitter,
  
} from "vscode";
import { TreeNode } from "./TreeNode";
import { explorerNodeManager } from './explorerNodeManager';
import { TREEVIEW_ID } from '../config';

export class TreeViewProvider implements TreeDataProvider<TreeNode> {
  // 自动弹出的可以暂不理会
  // public onDidChangeTreeData?:
  //   | Event<TreeNode | null | undefined>
  //   | undefined;
  // private onDidChangeTreeDataEvent: EventEmitter<TreeItem | undefined | null> = new EventEmitter<TreeItem | undefined | null>();

  private _onDidChangeTreeData: EventEmitter<TreeItem | undefined | null | void> = new EventEmitter<TreeItem | undefined | null | void>();

  fire(): void {
    this._onDidChangeTreeData.fire();
  }
  // 自动弹出
  // 获取树视图中的每一项 item,所以要返回 element
  getTreeItem(element: TreeNode): TreeItem | Thenable<TreeItem> {
    // return element;
    // 这里要返回最终显示的
    return {
      label: element.name,
      tooltip: element.name,
      iconPath: '',
      collapsibleState: element.isDirectory ? TreeItemCollapsibleState.Collapsed : TreeItemCollapsibleState.None,
      command: !element.isDirectory ? element.previewCommand : undefined
      // contextValue
    };
  }

  public children: string[] = [];
  // 自动弹出，但是我们要对内容做修改
  // 给每一项都创建一个 TreeNode
  public async getChildren(element?: TreeNode | undefined): Promise<TreeNode[]> {
    if (!element) {
      return explorerNodeManager.getChildren();
    }
    return await explorerNodeManager.getChapter(element);
  }
  public initTreeView(){
    // 实例化 TreeViewProvider
    const treeViewProvider = new TreeViewProvider();
    // registerTreeDataProvider：注册树视图
    // 你可以类比 registerCommand(上面注册 Hello World)
    window.registerTreeDataProvider(TREEVIEW_ID, treeViewProvider);
  }
}

export const treeViewProvider: TreeViewProvider = new TreeViewProvider();