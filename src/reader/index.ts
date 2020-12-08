import { TreeNode } from '../explorer/TreeNode';

class ReaderDriver {
  public getChapter(treeNode: TreeNode): Promise<TreeNode[]> {
    return new Promise(function (resolve) {
      // import('./driver/' + treeNode.type.substr(1))
      //   .then(({ readerDriver }) => {
      //     resolve(readerDriver.getChapter(treeNode.path));
      //   })
      //   .catch(() => {
      //     resolve([]);
      //   });
    });
  } 
}

export const readerDriver: ReaderDriver = new ReaderDriver();