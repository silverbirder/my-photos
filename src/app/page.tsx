import styles from "./page.module.css";

import { api } from "@/trpc/server";
import { PhotoGallery } from "@/components";

type Props = {
  left?: string;
  top?: string;
  right?: string;
  bottom?: string;
  transform: string;
};

function generateRandomStyles(count: number): Props[] {
  return Array.from({ length: count }, () => {
    const left =
      Math.random() > 0.5 ? `${Math.floor(Math.random() * 5)}px` : undefined;
    const top =
      Math.random() > 0.5 ? `${Math.floor(Math.random() * 5)}px` : undefined;
    const right =
      Math.random() > 0.5 ? `${Math.floor(Math.random() * 5)}px` : undefined;
    const bottom =
      Math.random() > 0.5 ? `${Math.floor(Math.random() * 5)}px` : undefined;
    const transform = `rotate(${Math.random() * 20 - 10}deg)`;

    return { left, top, right, bottom, transform };
  });
}

export default async function Home() {
  const { images } = await api.googlePhotos.getImages();
  const stylesArray = generateRandomStyles(images.length);
  return (
    <main className={styles.container}>
      <PhotoGallery images={images} stylesArray={stylesArray} />
    </main>
  );
}
