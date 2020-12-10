import * as cheerio from "cheerio";

export type BookItem = {
  name: string
  author: string
  path: string
}

interface ParseSearchBooks {
  (html: string): BookItem[]
}

export const parseSearchBooks: ParseSearchBooks = (html: string) => {
  const result: BookItem[] = []
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
