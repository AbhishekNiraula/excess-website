import React from 'react';
import View from '@/src/app/gallery/view';
import HeaderTop from '@/src/components/HeaderTop';
import Navbar from '@/src/components/Navbar';
import cloudinary from 'cloudinary';
import '@/src/app/gallery/gallery.css';
import '@/src/app/globals.css';
import ClientSideWrapper from '@/src/components/ClientSideWrapper';
import ErrorComponent from '@/src/app/error';
import { promises as fs } from 'fs';

interface Image {
	public_id: string;
	width: number;
	height: number;
	asset_folder: string;
}
export default async function Home() {
	let data;
	try {
		const file = await fs.readFile(
			process.cwd() + './src/app/gallery/galleryImages.json',
			'utf8'
		);
		data = JSON.parse(file);
		console.log(data);
	} catch (error) {
		console.error('Error reading the data.', error);
		return (
			<ErrorComponent message="There was an error fetching the gallery images. Please check your internet connection or try again later." />
		);
	}
	const images: Image[] = data.resources.map((value: any) => {
		return {
			public_id: value.public_id,
			width: value.width,
			height: value.height,
			asset_folder: value.asset_folder,
		};
	});
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
}
