import { NextPage } from 'next';
import Head from 'next/head';
import ParticleTextEffect from "@/components/ParticleTextEffect";

const PoseGuide: NextPage = () => {
  return (
    <div className="relative min-h-screen bg-black">
      <Head>
        <title>e.st - Pose Guide</title>
        <meta name="description" content="Pose Guide for e.st photography" />
      </Head>
      <ParticleTextEffect
        text={"Capture the moment\nSip the Magic"}
        className="absolute inset-0 w-full h-full"
      />
      <main className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-4 text-center">
          {/* Pose Guide content can be added here if needed over the particle effect */}
        </div>
      </main>
    </div>
  );
};

export default PoseGuide; 