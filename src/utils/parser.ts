import { window } from 'vscode';
import * as cheerio from "cheerio";
import { isCookieInvalid } from './index';

export type BookItem = {
  name: string
  author: string
  path: string
}

export type ChapterItem = {
  name: string
  path: string
}

interface HtmlSearchBooks {
  (html: string): BookItem[]
}
interface HtmlBookIndex {
  (html: string): ChapterItem[]
}
/* 解析搜索列表 */
export const parseSearchBooks: HtmlSearchBooks = (html: string) => {
  const result: BookItem[] = [];
  
  if (isCookieInvalid(html)) {
    window.showInformationMessage('cookie 失效!');
    return result;
  }

  const $ = cheerio.load(html);
  $(".qm-pic-txt.pic-150-200 li").each((index: number, item: any) => {
    const name: string = $(item).find('.s-tit a').text()
    const path: string = $(item).find('.s-tit a').attr('href') || ''
    const author: string = $($(item).find('.s-txt').get(0)).find('a').text()
  
    result.push({
      name, author, path
    })
  })
  return result
}
/* 解析目录 */
export const parseBookIndex: HtmlBookIndex = (html: string) => {
  const result: ChapterItem[] = [];

  if (isCookieInvalid(html)) {
    window.showInformationMessage('cookie 失效!');
    return result;
  }

  const $ = cheerio.load(html);
  $(".js-sort-data span").each((index: number, item: any) => {
    const name: string = $(item).find('a').text()
    const path: string = $(item).find('a').attr('href') || ''
  
    result.push({
      name, path
    })
  })
  return result
}
