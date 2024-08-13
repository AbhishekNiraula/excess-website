"use client";
import React, { useState } from 'react';
import { CldImage } from "next-cloudinary";
import { FaXmark, FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import '@/src/app/gallery/gallery.css';
import Filter from '@/src/app/gallery/filter';
import { motion } from 'framer-motion';

interface Image {
  public_id: string;
  width: number;
  height: number;
  asset_folder: string;
}

const View = ({ images, initialSearch }: { images: Image[], initialSearch: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredImages, setFilteredImages] = useState(images);

  const filters = ["All", "CS50xNepal", "CLI Training", "XTech 1.0", "XTech 3.0", "XTech 4.0", "Robotics Workshop", "Hardware Hackathon", "Handover Ceremony", "Python Training", "IOT Training", "Web Scraping", "Libre Office"];

  const openImage = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeImage = () => {
    setIsOpen(false);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent closing when clicking the buttons
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredImages.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent closing when clicking the buttons
    setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: (index: number) => ({
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
      },
    }),
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const handleFilterChange = (filter: string) => {
    if (filter === "All") {
      setFilteredImages(images);
    } else {
        setFilteredImages(images.filter(image => image.asset_folder === (filter)));
    }
  };

  return (
    <>
      <section className={`w-screen h-auto mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8 ${isOpen ? 'hidden' : ''}`}>
        <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl font-extrabold text-primaryBlue"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Our Story in Picture
          </motion.h2>
          <motion.p
            className="mt-4 text-md text-offBlack"
            initial="hidden"
            animate="visible"
            variants={textVariants}
            transition={{ delay: 0.2 }}
          >
            Our gallery is a testament to the experiences and milestones that shape us. Delve into a visual narrative that reflects our unique journey.
          </motion.p>
        </div>
        
        <div className="mt-10 lg:mt-16 gallery">
          <div className="gallery-menu">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`text-sm ${filter === initialSearch ? 'gallery-active' : ''}`}
                onClick={() => handleFilterChange(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {filteredImages.map((image, idx) => (
            <motion.div
              key={idx}
              className="h-auto max-w-full rounded-lg cursor-pointer"
              initial="hidden"
              animate="visible"
              variants={imageVariants}
              custom={idx}
            >
              <CldImage
                src={image.public_id}
                alt="Gallery Image"
                width="300"
                height="300"
                crop="fill"
                loading="eager"
                onClick={() => openImage(idx)}
              />
              <p className='text-center text-xs mt-2 text-offBlack'>{image.asset_folder}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {isOpen && (
        <section className='w-screen relative h-[100%] top-0 items-center justify-center z-50'>
          <div
            className="m-10 inset-0 z-50 flex items-center justify-center w-[80vh] bg-black bg-opacity-90"
            onClick={closeImage}
            onKeyDown={(e) => e.key === 'Escape' && closeImage()}
            tabIndex={0}
          >
            <button className="absolute top-0 mt-2 md:mt-4 scroll-button cross z-50" onClick={closeImage}>
              <FaXmark />
            </button>
            <button className="scroll-button absolute left-0 ml-4 md:ml-14 z-50" onClick={(e) => handlePrev(e)}>
              <FaArrowLeftLong />
            </button>

            <CldImage
              className="object-contain"
              src={filteredImages[currentIndex].public_id}
              alt={`Fullscreen Image ${currentIndex + 1}`}
              width={1200}
              height={400}
              preserveTransformations
              loading="eager"
            />

            <button className='scroll-button absolute right-0 mr-4 md:mr-14' onClick={(e) => handleNext(e)}>
              <FaArrowRightLong />
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default View;
