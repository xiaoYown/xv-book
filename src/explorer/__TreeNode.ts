import {
  TreeItem,
  TreeItemCollapsibleState,
  TreeDataProvider,
  Uri,
  window,
} from "vscode";
import { join } from "path";

// 创建每一项 label 对应的图片名称
// 其实就是一个Map集合，用 ts 的写法
// const ITEM_ICON_MAP = new Map<string, string>([
//   ["pig1", "pig1.svg"],
//   ["pig2", "pig2.svg"],
//   ["pig3", "pig3.svg"],
// ]);

// 第一步：创建单项的节点(item)的类
export class TreeNode extends TreeItem {
  constructor(
    // readonly 只可读
    public readonly label: string,
    public readonly collapsibleState: TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
  }

  // command: 为每项添加点击事件的命令
  command = {
    title: this.label, // 标题
    command: "itemClick", // 命令 ID
    tooltip: this.label, // 鼠标覆盖时的小小提示框
    arguments: [
      // 向 registerCommand 传递的参数。
      this.label, // 目前这里我们只传递一个 label
    ],
  };

  // iconPath： 为该项的图标因为我们是通过上面的 Map 获取的，所以我额外写了一个方法，放在下面
  // iconPath = TreeNode.getIconUriForLabel(this.label);

  // __filename：当前文件的路径
  // 重点讲解 Uri.file(join(__filename,'..', '..') 算是一种固定写法
  // Uri.file(join(__filename,'..','assert', ITEM_ICON_MAP.get(label)+''));   写成这样图标出不来
  // 所以小伙伴们就以下面这种写法编写
  // static getIconUriForLabel(label: string): Uri {
  //   return Uri.file(
  //     join(
  //       __filename,
  //       "..",
  //       "..",
  //       "src",
  //       "assert",
  //       ITEM_ICON_MAP.get(label) + ""
  //     )
  //   );
  // }
}
