import { Disposable } from 'vscode';
import { TreeNode } from './TreeNode';
// import { readerDriver } from '../reader';

const nodeList = Array.from(new Array(10).keys());

const defaultNode = nodeList.map((item: number):TreeNode => new TreeNode({
  type: '.txt',
  name: 'name-' + item,
  isDirectory: true,
  path: '/' + item
}))

class ExplorerNodeManager implements Disposable {
  public treeNode: TreeNode[] = defaultNode;

  public getChildren(): TreeNode[] {
    return this.treeNode;
  }
  // public getAllBooks(): Promise<TreeNode[]> {
  //   return new Promise((resolve) => {
  //     readerDriver.getAllBooks().then((treeNode: TreeNode[]) => {
  //       this.treeNode = treeNode;
  //       resolve(this.treeNode);
  //     });
  //   });
  // }

  public setTreeNode(treeNode: TreeNode[]) {
    this.treeNode = treeNode;
  }

  // // 获取
  // public getChapter(treeNode: TreeNode): Promise<TreeNode[]> {
  //   return readerDriver.getChapter(treeNode);
  // }
  // 获取
  public getChapter(treeNode: TreeNode): TreeNode[] {
    return [
      new TreeNode({
        type: '.txt',
        name: 'name-' + Date.now(),
        isDirectory: false,
        path: '/99090'
      })
    ];
  }
  public dispose(): void {
    this.treeNode = [];
  }
}

export const explorerNodeManager: ExplorerNodeManager = new ExplorerNodeManager();
