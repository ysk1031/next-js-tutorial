import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export const getSortedPostsData = (): {date: string, id: string, title: string}[] => {
  const fileNames: string[] = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    const id: string = fileName.replace(/\.md$/, '');
    const fullPath: string = path.join(postsDirectory, fileName);
    const fileContents: string = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as {date: string, title: string}),
    }
  });

  return allPostsData.sort((a, b)=> {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
};

export const getAllPostIds = (): {params: {id: string}}[] => {
  const fileNames: string[] = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      }
    }
  });
};

export const getPostData = async (id: string): Promise<{date: string, title: string, id: string, contentHtml: string}> => {
  const fullPath: string = path.join(postsDirectory, `${id}.md`);
  const fileContents: string = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml: string = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as {date: string, title: string}),
  };
};