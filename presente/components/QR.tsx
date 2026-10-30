"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode";

export function QR({ value, size = 280, className = "" }: { value: string; size?: number; className?: string }) {
  const [src, setSrc] = useState<string>("");
  useEffect(() => {
    let alive = true;
    QRCode.toDataURL(value, { width: size, margin: 1, errorCorrectionLevel: "M", color: { dark: "#14213d", light: "#ffffff" } })
      .then((d) => alive && setSrc(d))
      .catch(() => alive && setSrc(""));
    return () => { alive = false; };
  }, [value, size]);
  if (!src) return <div style={{ width: size, height: size }} className={`animate-pulse rounded-xl bg-line ${className}`} />;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} width={size} height={size} alt="Código QR" className={`rounded-xl ${className}`} />;
}
