import * as vscode from "vscode";
import { template } from "../../utils";
import { TemplatePath } from '../../config';
import { store } from '../../utils/store';

import { readerDriver } from '../../reader/qimao';

interface Message {
  command: string
  data: any
}

function receiveMessage (panel:vscode.WebviewPanel) {
  return function (message:Message) {
    // const { postMessage } = panel.webview;
    const { command, data } = message;
    switch (command) {
      case 'searchBooks':
        readerDriver.search(data)
        // readerDriver.search(data).then((res: any) => {
        //   // console.log(res.body);
        //   // panel.webview.postMessage({
        //   //   command: 'searchSuccess',
        //   //   data: res
        //   // });
        // }).catch((err: any) => {
        //   console.log(err);
        //   panel.webview.postMessage({
        //     command: 'searchFail',
        //     data: err
        //   });
        // });
        break;
      default:
        panel.webview.postMessage({ commond: 'eventError', data: 'not exit this command ' + command });
    }
  }
}

export function getContent () {
  const html = template(store.extensionPath, TemplatePath.templateHtml, {
    contentType: 'html',
    content: ''
  });
  return html;
}

export function openIndex(context: vscode.ExtensionContext) {
  // 1. 使用 createWebviewPanel 创建一个 panel，然后给 panel 放入 html 即可展示 web view
  const panel = vscode.window.createWebviewPanel(
    'helloWorld',
    'Hello world',
    vscode.ViewColumn.One, // web view 显示位置
    {
      enableScripts: true, // 允许 JavaScript
      retainContextWhenHidden: true // 在 hidden 的时候保持不关闭
    }
  );
  panel.webview.html = getContent();
  panel.webview.onDidReceiveMessage(receiveMessage(panel));

  // 2. 周期性改变 html 中的内容，因为是直接给 webview.html 赋值，所以是刷新整个内容
  // function changeWebView() {
  //   const newData = Math.ceil(Math.random() * 100);
  //   panel.webview.html = getWebViewContent(`${innerHtml}<p>${newData}</p>`);
  // }
  // const interval = setInterval(changeWebView, 1000);

  // 3. 可以通过设置 panel.onDidDispose，让 webView 在关闭时执行一些清理工作。
  panel.onDidDispose(
    () => {
      console.log('destroy');
    },
    null,
    context.subscriptions
  );
}
