import * as got from "got";
import { ReaderDriver as ReaderDriverImplements } from "../@types";
import { TreeNode } from "../explorer/TreeNode";
import { getCookie } from '../utils';
import {
  BookItem,
  ChapterItem,
  ChapterContent,
  parseSearchBooks,
  parseBookIndex,
  parseChapterContent
} from '../utils/parser';
import { Notification } from '../utils/notification';

const DOMAIN = "https://www.qimao.com";
// const DOMAIN = 'https://m.qidian.com';

class ReaderDriver implements ReaderDriverImplements {
  public hasChapter() {
    return true;
  }
  // public search(keyword: string) {
  //   console.log(keyword)
  // }
  public search(keyword: string): Promise<TreeNode[]> {
    return new Promise(function async (resolve, reject) {
      // got(DOMAIN + "/search/index/?keyword=" + encodeURI(keyword))
      const url: string= `${DOMAIN}/search/index/?keyword=${encodeURIComponent(keyword)}`
      got(url, {
        headers: {
          Cookie: getCookie()
        }
      }).then((res: any) => {
        const books = parseSearchBooks(res.body);

        const result: TreeNode[] = books.map((item: BookItem) => {
          return new TreeNode({
            type: '.qimao',
            name: item.name,
            isDirectory: true,
            path: item.path
          })
        });
        resolve(result);
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }
  // 获取章节数据
  public getChapter(chapter: TreeNode): Promise<TreeNode[]> {
    return new Promise(function async (resolve, reject) {
      // got(DOMAIN + "/search/index/?keyword=" + encodeURI(keyword))
      const url: string= `${DOMAIN}${chapter.path}`
      got(url, {
        headers: {
          Cookie: getCookie()
        }
      }).then((res: any) => {
        const chapterList = parseBookIndex(res.body);

        const result: TreeNode[] = chapterList.map((item: ChapterItem) => {
          return new TreeNode({
            type: '.qimao',
            name: item.name,
            isDirectory: false,
            path: item.path
          })
        });
        resolve(result);
      }).catch((reason: any) => {
        console.log(reason)
        reject(reason);
      });
    });
  }
  // 获取章节内容
  public getChapterContent(treeNode: TreeNode): Promise<ChapterContent> {
    const notification = new Notification(`正在加载: ${treeNode.name}`);
    return new Promise(function (resolve, reject) {
      // got(DOMAIN + "/search/index/?keyword=" + encodeURI(keyword))
      const url: string= `${DOMAIN}${treeNode.path}`
      got(url, {
        headers: {
          Cookie: getCookie()
        }
      }).then((res: any) => {
        const chapterContent = parseChapterContent(res.body);
        resolve(chapterContent);
        notification.stop();
      }).catch((reason: any) => {
        reject(reason);
        notification.stop();
      });
    });
  }
}

export const readerDriver: ReaderDriver = new ReaderDriver();
