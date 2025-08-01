"use client";

import styles from "./photo-gallery.module.css";
import Image from "next/image";
import { DialogTrigger, Modal, Dialog, Button } from "react-aria-components";
import { useState } from "react";

type StyleProps = {
  left?: string;
  top?: string;
  right?: string;
  bottom?: string;
  transform: string;
};

type Props = {
  images: string[];
  stylesArray: StyleProps[];
};

export const PhotoGallery = ({ images, stylesArray }: Props) => {
  const [openModal, setOpenModal] = useState<number | null>(null);

  return (
    <div className={styles.gallery}>
      {images.map((src: string, i: number) => {
        const style = stylesArray[i] ?? { transform: "rotate(0deg)" };
        return (
          <DialogTrigger
            key={i}
            isOpen={openModal === i}
            onOpenChange={(isOpen) => setOpenModal(isOpen ? i : null)}
          >
            <Button
              className={`${styles.polaroid} ${styles.square}`}
              style={{
                ...(style.left ? { left: style.left } : {}),
                ...(style.top ? { top: style.top } : {}),
                ...(style.right ? { right: style.right } : {}),
                ...(style.bottom ? { bottom: style.bottom } : {}),
                transform: style.transform,
                cursor: "pointer",
              }}
            >
              <Image
                src={src}
                alt={`写真 ${i + 1}枚目 - クリックして拡大表示`}
                width={400}
                height={400}
                loading="lazy"
                className={styles.image}
              />
            </Button>
            <Modal className={styles.modalOverlay}>
              <Dialog
                className={`${styles.polaroid} ${styles.square} ${styles.modal}`}
                style={{
                  transform: style.transform,
                }}
              >
                <Button onPress={() => setOpenModal(null)}>
                  <Image
                    src={src}
                    alt={`写真 ${i + 1}枚目の拡大表示 - クリックして閉じる`}
                    width={400}
                    height={400}
                    className={styles.image}
                  />
                </Button>
              </Dialog>
            </Modal>
          </DialogTrigger>
        );
      })}
    </div>
  );
};
