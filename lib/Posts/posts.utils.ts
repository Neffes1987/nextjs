import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import {POSTS_IDS} from "./posts.contants";
import {PostItem} from "./posts.interface";

const postsDirectory = path.join(process.cwd(), 'posts')

export function getAllPostData(): Omit<PostItem, 'contentHtml'>[] {
  return POSTS_IDS.map(({params}) => {
    const {id} = params;

    const fileName = `${id}.md`;

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date
    }
  })
}

export async function getPostData(id?: string): Promise<PostItem | null> {
  if(!id) {
    return null;
  }

  const fileName = `${id}.md`;

  // Read markdown file as string
  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id
  return {
    id,
    title: matterResult.data.title,
    contentHtml,
    date: matterResult.data.date
  }
}
