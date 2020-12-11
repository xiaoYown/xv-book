import * as Open from 'open';
import * as fs from 'fs';
import * as Path from 'path';
import { Uri } from 'vscode';
import { store } from './store';

export const open = (path: string) => {
  return Open(path, { wait: true });
};

export const template = (rootPath: string, htmlPath: string, data: any = false): any => {
  const AbsHtmlPath = Path.join(rootPath, htmlPath);
  const dirPath = Path.dirname(AbsHtmlPath);
  let result = fs.readFileSync(AbsHtmlPath, 'utf-8').replace(/(@)(.+?)"/g, (m, $1, $2) => {
    return Uri.file(Path.resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
  });
  if (data) {
    result = result.replace(/(\{\{)(.+?)(\}\})/g, (m, $1, $2) => {
      return data[$2.trim()];
    });
  }
  return result;
};

export const isCookieInvalid = (html: string): boolean => {
  return !/<body>/.test(html);
}

export const saveCookie = (cookie: string) => {
  fs.writeFileSync(`${store.extensionPath}/cookie.txt`, cookie);
}
export const getCookie = (): string => {
  let cookie = '';
  try {
    cookie = fs.readFileSync(`${store.extensionPath}/cookie.txt`, { encoding: 'utf8' });
  } catch (err) {
    console.error(err);
  }
  return cookie;
}
