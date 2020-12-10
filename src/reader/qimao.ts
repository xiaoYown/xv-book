import * as got from "got";
import { ReaderDriver as ReaderDriverImplements } from "../@types";
import { TreeNode } from "../explorer/TreeNode";
import { cookieData } from "./cookie";
import { BookItem, parseSearchBooks } from '../utils/parser'

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
          Cookie: cookieData
        }
      }).then((res: any) => {
        const books = parseSearchBooks(res.body);
        console.log(books)

        const result: TreeNode[] = books.map((item: BookItem) => {
          return {
            type: '.qimao',
            name: item.name,
            isDirectory: true,
            path: item.path
          }
        });
        resolve(result);
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }
}

export const readerDriver: ReaderDriver = new ReaderDriver();
