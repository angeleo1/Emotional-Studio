import { NextPage } from 'next';
import Head from 'next/head';
import FloatingBookButton from '../components/common/FloatingBookButton';
import OurElixirs from '../components/homepage/OurElixirs';

const ElixirsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Our Elixirs | Emotional Studio</title>
        <meta name="description" content="Discover our signature elixirs at Emotional Studio" />
      </Head>
      
      <OurElixirs />
    </>
  );
};

export default ElixirsPage; 