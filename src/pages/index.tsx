import Head from 'next/head';
import { Layout } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import { Date } from '../components/date';
import { GetStaticProps } from 'next';
import React from 'react';

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

const Home: React.FC<{
  allPostsData: { date: string; id: string; title: string }[];
}> = ({
  allPostsData,
}: {
  allPostsData: { date: string; id: string; title: string }[];
}) => {
  return (
    <Layout home>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hello, I&apos;m Yusuke. I&apos;m working at Atrae, Inc. as a software
          engineer.
        </p>
        <p>
          (This is a sample website - you&apos;ll be building a site like this
          on <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};
export default Home;
