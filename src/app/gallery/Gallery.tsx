// components/Gallery.tsx
import React from 'react';
import cloudinary from 'cloudinary';
import View from "@/src/app/gallery/view"

interface Image {
  public_id: string;
}

const Gallery = async () => {

  let res = await cloudinary.v2.search
  .expression('resource_type:image')
  .sort_by('public_id','desc')
  .execute() as {resources:Image[]};

  return (
    <section className="bg-primaryBlue">
      <div className="h-1/3 bg-slate-900 flex justify-center text-center">
        <h1 className="text-3xl font-extrabold text-white p-3">Gallery</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {res.resources.map((item, i) => {
          return (
            <div key={i} className="group cursor-pointer relative">
              <View src={item.public_id} />
            </div>
          )
        })}
      </div>
    </section>
  );
};

export default Gallery;
