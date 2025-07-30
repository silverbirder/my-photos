import styles from "./page.module.css";

import { api } from "@/trpc/server";
import Image from "next/image";

export default async function Home() {
  const { images } = await api.googlePhotos.getImages();
  return (
    <main className={styles.container}>
      <div className={styles.gallery}>
        {images.map((src: string, i: number) => {
          const isLarge = i % 10 === 0;
          return (
            <div
              key={i}
              className={
                `${styles.polaroid} ${styles.square} ${isLarge ? styles['gallery-item--large'] : ''}`
              }
            >
              <Image
                src={src}
                alt={`photo-${i}`}
                width={400}
                height={400}
                loading="lazy"
                className={styles.image}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
