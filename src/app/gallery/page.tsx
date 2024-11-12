import React from 'react';
import View from '@/src/app/gallery/view';
import HeaderTop from '@/src/components/HeaderTop';
import Navbar from '@/src/components/Navbar';
import cloudinary from 'cloudinary';
import '@/src/app/gallery/gallery.css';
import '@/src/app/globals.css';
import ClientSideWrapper from '@/src/components/ClientSideWrapper';
import ErrorComponent from '@/src/app/error';
import { Images } from '@/src/app/gallery/galleryImages';

export default async function Home() {
	return (
		<>
			<section id="header">
				<HeaderTop />
				<Navbar />
			</section>

			<ClientSideWrapper>
				<View initialSearch="" images={Images} />
			</ClientSideWrapper>
		</>
	);
}
