import { NextPage } from 'next';
import Head from 'next/head';
import { AppleHelloEffect } from '@/components/AppleHelloEffect';
import Image from 'next/image';

const PoseGuide: NextPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]">
      <Head>
        <title>e.st - Pose Guide</title>
        <meta name="description" content="Pose Guide for e.st photography" />
      </Head>
      <main className="relative z-10 pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Pose Guide content will go here */}
          <h1 className="text-white text-4xl text-center mt-20">Pose Guide Content</h1>
        </div>
      </main>
    </div>
  );
};

export default PoseGuide; 