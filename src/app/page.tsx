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
          const left =
            Math.random() > 0.5
              ? `${Math.floor(Math.random() * 5)}px`
              : undefined;
          const top =
            Math.random() > 0.5
              ? `${Math.floor(Math.random() * 5)}px`
              : undefined;
          const right =
            Math.random() > 0.5
              ? `${Math.floor(Math.random() * 5)}px`
              : undefined;
          const bottom =
            Math.random() > 0.5
              ? `${Math.floor(Math.random() * 5)}px`
              : undefined;
          const transforms = [`rotate(${Math.random() * 20 - 10}deg)`];
          const transform = transforms[0];
          return (
            <div
              key={i}
              className={`${styles.polaroid} ${styles.square} ${isLarge ? styles["gallery-item--large"] : ""}`}
              style={{
                ...(left ? { left } : {}),
                ...(top ? { top } : {}),
                ...(right ? { right } : {}),
                ...(bottom ? { bottom } : {}),
                transform,
              }}
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
