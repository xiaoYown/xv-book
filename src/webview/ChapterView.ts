import {
  ExtensionContext,
  ViewColumn,
  WebviewPanel,
  window,
  commands,
} from "vscode";
import { TreeNode } from '../explorer/TreeNode';
import { readerDriver } from '../reader/qimao';
import {
  BookItem,
  ChapterItem,
  ChapterContent,
  parseSearchBooks,
  parseBookIndex,
  parseChapterContent
} from '../utils/parser';
// 创建一个全局变量，类型为：WebviewPanel 或者 undefined
let webviewPanel: WebviewPanel | undefined;

export class ChapterView {
  constructor (
    context: ExtensionContext, // 上面的代码刚介绍过，可忽略
    viewColumn: ViewColumn, // 窗口编辑器
    chapter: TreeNode // 传递进来的一个 label 值，就是点击树视图项 showInformationMessage 的值
  ) {
    // 上面重点讲解了 createWebviewPanel 传递4个参数
    webviewPanel = window.createWebviewPanel(
      chapter.path, // 标识，随意命名
      chapter.name, // 面板标题
      viewColumn, // 展示在哪个面板上
      {
        retainContextWhenHidden: true, // 控制是否保持webview面板的内容（iframe），即使面板不再可见。
        enableScripts: true, // 下面的 html 页可以使用 Scripts
      }
    );

    // onDidDispose: 如果关闭该面板，将 webviewPanel 置 undefined
    webviewPanel.onDidDispose(() => {
      webviewPanel = undefined;
    });
    this.webviewPanel = webviewPanel
  }
  public webviewPanel: WebviewPanel
  public updateChapter(treeNode: TreeNode) {
    this.webviewPanel.title = treeNode.name;
    readerDriver.getChapterContent(treeNode).then((chapterContent: ChapterContent) => {
      this.webviewPanel.webview.html = getIframeHtml(chapterContent);
      this.webviewPanel.reveal(); // Webview面板一次只能显示在一列中。如果它已经显示，则此方法将其移动到新列。
    });
  }
}

// 创建一个可导出的方法,并且带上参数
export function createWebView(
  context: ExtensionContext, // 上面的代码刚介绍过，可忽略
  viewColumn: ViewColumn, // 窗口编辑器
  chapter: TreeNode // 传递进来的一个 label 值，就是点击树视图项 showInformationMessage 的值
) {
  return new ChapterView(context, viewColumn, chapter);
}

// 这个方法没什么了，就是一个 最简单的嵌入 iframe 的 html 页面
export function getIframeHtml(chapterContent: ChapterContent) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    * {
      padding: 0;
      margin: 0;
    }
    html,
    body {
      margin: 0 !important;
      padding: 30px !important;
    }
    section {
      max-width: 800px;
      margin: 0 auto;
      line-height: 30px;
    }
  </style>
  </head>

  <body>
    <section>
      <h3>${chapterContent.title}</h3>
      <br>
      <div>${chapterContent.content}<div>
    </section>
  </body>
</html>
    `;
}
