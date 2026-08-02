import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} — Full-Stack Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(join(process.cwd(), "public/logo-portfolio.png"), "base64");
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 36,
          backgroundColor: "#0a0a0b",
          backgroundImage:
            "radial-gradient(circle at 22% 20%, rgba(74,111,224,0.4), transparent 55%), radial-gradient(circle at 80% 25%, rgba(56,189,248,0.3), transparent 50%), radial-gradient(circle at 65% 85%, rgba(168,85,247,0.35), transparent 55%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse (Satori) requires a raw <img>, next/image is unusable here */}
        <img src={logoSrc} width={148} height={148} style={{ borderRadius: 36 }} alt="" />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <div
            style={{
              fontSize: 66,
              fontWeight: 700,
              color: "#f5f5f7",
              letterSpacing: -1.5,
            }}
          >
            {siteConfig.name}
          </div>
          <div style={{ fontSize: 30, fontWeight: 500, color: "#7aa2ff" }}>
            Full-Stack Developer
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
