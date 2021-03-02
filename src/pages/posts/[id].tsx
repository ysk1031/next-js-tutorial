import { Layout } from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import { Date } from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: { params: { id: string } }[] = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
};

const Post: React.FC<{
  postData: {
    date: string;
    title: string;
    id: string;
    contentHtml: string;
  };
}> = ({
  postData,
}: {
  postData: { date: string; title: string; id: string; contentHtml: string };
}) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
};
export default Post;
