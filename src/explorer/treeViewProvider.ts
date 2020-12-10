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

export class TreeViewProvider implements TreeDataProvider<TreeNode> {
  // 自动弹出的可以暂不理会
  // public onDidChangeTreeData?:
  //   | Event<TreeNode | null | undefined>
  //   | undefined;
  private onDidChangeTreeDataEvent: EventEmitter<TreeItem | undefined | null> = new EventEmitter<TreeItem | undefined | null>();

  fire(): void {
    this.onDidChangeTreeDataEvent.fire();
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
    // return await explorerNodeManager.getChapter(element);
    return [];
  }
}

export const treeViewProvider: TreeViewProvider = new TreeViewProvider();