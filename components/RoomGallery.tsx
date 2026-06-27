"use client";

import Image from "next/image";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

interface RoomGalleryProps {
  images: { src: string; alt: string }[];
}

export default function RoomGallery({ images }: RoomGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-8">
        {images.map((image, index) => (
          <ScrollReveal key={index} delay={index * 0.1}>
            <div 
              className="relative h-[150px] md:h-[200px] cursor-pointer group overflow-hidden"
              onClick={() => setSelectedImage(image.src)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white text-3xl hover:text-accent transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          >
            &times;
          </button>
          <div className="relative w-full max-w-5xl h-full max-h-[80vh]">
            <Image
              src={selectedImage}
              alt="Room view enlarged"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
