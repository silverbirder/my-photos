import { api } from "@/trpc/server";
import Image from "next/image";

export default async function Home() {
  const { images } = await api.googlePhotos.getImages();
  return (
    <main
      style={{ minHeight: "100vh", background: "#111", margin: 0, padding: 0 }}
    >
      <h1
        style={{
          color: "#fff",
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: 700,
          margin: "0",
          padding: "2rem 0 1rem 0",
          letterSpacing: "0.05em",
        }}
      >
        My Google Photos Gallery
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "16px",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 1rem 2rem 1rem",
        }}
      >
        {images.map((src: string, i: number) => (
          <div
            key={i}
            style={{
              background: "#222",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              aspectRatio: "1/1",
            }}
          >
            <Image
              src={src}
              alt={`photo-${i}`}
              width={400}
              height={400}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                background: "#333",
              }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
