// pages/index.tsx
import React from 'react';
import View from "@/src/app/gallery/view";
import HeaderTop from '@/src/components/HeaderTop';
import Navbar from '@/src/components/Navbar';
import { Cloudinary } from 'cloudinary-core'; // Adjusted import
import '@/src/app/gallery/gallery.css';
import '@/src/app/globals.css';
import ClientSideWrapper from '@/src/components/ClientSideWrapper';
import ErrorComponent from '@/src/app/error';

interface Image {
  public_id: string;
  width: number;
  height: number;
  asset_folder: string;
}

// Configure Cloudinary
const cloudinary = new Cloudinary({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  secure: true
});

// Fetch images from Cloudinary
export async function getStaticProps() {
  let res;
  try {
    const cloudinaryApi = require('cloudinary').v2;
    cloudinaryApi.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
      secure: true
    });
    
    res = await cloudinaryApi.search
      .expression('resource_type:image')
      .sort_by('public_id', 'desc')
      .max_results(150)
      .execute() as { resources: Image[] };
  } 
  catch (error) {
    return {
      props: {
        error: 'There was an error fetching the gallery images. Please check your internet connection or try again later.'
      }
    };
  }

  if (!res || res.resources.length === 0) {
    return {
      props: {
        error: 'No images found. Please check back later.'
      }
    };
  }

  return {
    props: {
      images: res.resources,
      error: null
    },
    revalidate: 60 // Optional: revalidate every 60 seconds
  };
}

const Home = ({ images, error }: { images: Image[]; error: string }) => {
  if (error) {
    return <ErrorComponent message={error} />;
  }

  return (
    <>
      <section id="header">
        <HeaderTop />
        <Navbar />
      </section>

      <ClientSideWrapper>
        <View initialSearch="" images={images} />
      </ClientSideWrapper>
    </>
  );
};

export default Home;
