import {
  TreeDataProvider,
  TreeItem,
  TreeItemCollapsibleState,
  ProviderResult
} from "vscode";
import { TreeNode } from "./TreeNode";

export class TreeViewProvider implements TreeDataProvider<TreeNode> {
  // private onDidChangeTreeDataEvent: EventEmitter<TreeItem | undefined | null> = new EventEmitter<TreeItem | undefined | null>();

  // fire(): void {
  //   this.onDidChangeTreeDataEvent.fire();
  // }
  // 自动弹出
  // 获取树视图中的每一项 item,所以要返回 element
  getTreeItem(element: TreeNode): TreeItem | Thenable<TreeItem> {
    // return element;
    return {
      label: element.name,
      tooltip: element.name,
      iconPath: '',
      collapsibleState: element.isDirectory ? TreeItemCollapsibleState.Collapsed : TreeItemCollapsibleState.None,
      command: !element.isDirectory ? element.previewCommand : undefined
    };
  }

  // 自动弹出，但是我们要对内容做修改
  // 给每一项都创建一个 TreeNode
  getChildren(element?: TreeNode | undefined): import("vscode").ProviderResult<TreeNode[]> {
    return [
      new TreeNode({
        type: '.txt',
        name: 'name-1',
        isDirectory: true,
        path: '/99090'
      })
    ];
  }
}

export const treeViewProvider: TreeViewProvider = new TreeViewProvider();