import { NextPage } from 'next';
import Head from 'next/head';
import FloatingBookButton from '@/components/common/FloatingBookButton';
import GalleryContent from '@/components/GalleryContent';

const Gallery: NextPage = () => {
  return (
    <>
      <Head>
        <title>Gallery | Emotional Studio</title>
        <meta name="description" content="Explore our photography gallery" />
      </Head>
      
      <GalleryContent />
      
      {/* Floating Book Button */}
      <FloatingBookButton />
    </>
  );
};

export default Gallery; 