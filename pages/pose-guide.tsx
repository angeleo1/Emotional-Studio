import { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { AppleHelloEffect } from '@/components/AppleHelloEffect';

const PoseGuide: NextPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Head>
        <title>e.st - Pose Guide</title>
        <meta name="description" content="Pose Guide for e.st photography" />
      </Head>
      <Navbar />
      <AppleHelloEffect />
      <main className="pt-24 pb-20 relative z-10">
        <div className="container mx-auto px-4">
          {/* Pose Guide content will go here */}
          <h1 className="text-white text-4xl text-center mt-20">Pose Guide Content</h1>
        </div>
      </main>
    </div>
  );
};

export default PoseGuide; 