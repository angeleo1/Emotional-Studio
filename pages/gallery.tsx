import { NextPage } from 'next';
import Head from 'next/head';
import FloatingBookButton from '@/components/common/FloatingBookButton';
import GalleryContent from '@/components/GalleryContent';

const Gallery: NextPage = () => {
  return (
    <>
      <Head>
        <title>Gallery | Emotional Studio - Self Photo Studio in Melbourne</title>
        <meta name="description" content="View our stunning photography gallery from Emotional Studio, Melbourne's premier self photo studio. Professional quality photos without a photographer." />
        <meta name="keywords" content="photo gallery, Melbourne photography, self photo studio gallery, professional photos, Emotional Studio gallery" />
        <link rel="canonical" href="https://emotionalstudio.com.au/gallery" />
      </Head>
      
      <GalleryContent />
      
      {/* Floating Book Button */}
      <FloatingBookButton />
    </>
  );
};

export default Gallery; 