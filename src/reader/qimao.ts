import * as got from "got";
import { ReaderDriver as ReaderDriverImplements } from "../@types";
import { TreeNode } from "../explorer/TreeNode";
import { BookItem, ChapterItem, parseSearchBooks, parseBookIndex } from '../utils/parser';
import { getCookie } from '../utils';

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
        console.log(chapterList)

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
}

export const readerDriver: ReaderDriver = new ReaderDriver();
