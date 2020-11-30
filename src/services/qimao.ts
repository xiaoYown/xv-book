import * as got from "got";
import * as cheerio from "cheerio";
import { ReaderDriver as ReaderDriverImplements } from "../@types";
import { TreeNode, defaultProblem } from "../explorer/TreeNode";

const DOMAIN = "https://www.qimao.com";
// const DOMAIN = 'https://m.qidian.com';

function setCookie(name, value) {
  var expiredate = new Date();
  expiredate.setTime(expiredate.getTime() + 3600 * 1000);
  document.cookie =
    name +
    "=" +
    value +
    ";expires=" +
    expiredate.toGMTString() +
    ";max-age=3600;path=/";
}
function reload(x) {
  setCookie("acw_sc__v2", x);
  document.location.reload();
}

class ReaderDriver implements ReaderDriverImplements {
  public hasChapter() {
    return true;
  }
  public search(keyword: string): Promise<TreeNode[]> {
    return new Promise(function (resolve, reject) {
      // got(DOMAIN + "/search/index/?keyword=" + encodeURI(keyword))
      got("https://www.qimao.com/search/index/?keyword=%E6%B1%9F%E6%B9%96")
        .then((res: any) => {
          resolve(res);
          const result: TreeNode[] = [];
          const $ = cheerio.load(res.body);
          console.log(res.body);
          $(".qm-pic-txt li").each((i: number, item: any) => {
            console.log(i, item);
          });
          // $(".book-li").each(function (i: number, elem: any) {
          //   const title = $(elem).find(".book-title").text();
          //   const author = (
          //     $(elem).find(".book-author").children()[0].next.data || ""
          //   ).replace(/[\s]/g, "");
          //   const bookId = $(elem)
          //     .find(".book-layout")
          //     .attr()
          //     .href.replace(/\/book\//g, "");
          //   result.push(
          //     new TreeNode(
          //       Object.assign({}, defaultProblem, {
          //         type: ".qidian",
          //         name: `${title} - ${author}`,
          //         isDirectory: true,
          //         path: JSON.stringify({ bookId }),
          //       })
          //     )
          //   );
          // });
          // resolve(result);
        })
        .catch((reason: any) => {
          reject(reason);
        });
    });
  }
}

export const readerDriver = new ReaderDriver();
