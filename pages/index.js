import Head from 'next/head'
import { Layout, siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

const Home = () => {
  return (
    <Layout home>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello, I'm Yusuke. I'm working at Atrae, Inc. as a software engineer.</p>
        <p>
          (This is a sample website - you'll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  )
};
export default Home;
