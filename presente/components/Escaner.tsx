"use client";
import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

/**
 * Lee un QR en vivo con la cámara del celular, dentro del navegador. Sin instalar nada.
 * Llama a onToken con el token de la URL leída. Una foto no sirve: el código de la pantalla cambia cada 10 s.
 */
export function Escaner({ actividadId, onToken, onError }: { actividadId: string; onToken: (t: string) => void; onError: (msg: string) => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let raf = 0;
    let vivo = true;

    async function start() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false });
        if (!vivo || !video.current) return;
        video.current.srcObject = stream;
        await video.current.play();
        setListo(true);
        loop();
      } catch {
        onError("No pudimos abrir la cámara. Permitile el acceso al navegador, o pedile a quien dicta que te marque.");
      }
    }

    function loop() {
      if (!vivo) return;
      const v = video.current, c = canvas.current;
      if (v && c && v.readyState === v.HAVE_ENOUGH_DATA) {
        c.width = v.videoWidth; c.height = v.videoHeight;
        const ctx = c.getContext("2d", { willReadFrequently: true })!;
        ctx.drawImage(v, 0, 0, c.width, c.height);
        const img = ctx.getImageData(0, 0, c.width, c.height);
        const code = jsQR(img.data, img.width, img.height, { inversionAttempts: "dontInvert" });
        if (code?.data) {
          try {
            const u = new URL(code.data);
            const t = u.searchParams.get("t");
            if (t && u.pathname.endsWith(`/p/${actividadId}`)) { vivo = false; onToken(t); return; }
          } catch {}
        }
      }
      raf = requestAnimationFrame(loop);
    }

    start();
    return () => {
      vivo = false;
      cancelAnimationFrame(raf);
      stream?.getTracks().forEach((tr) => tr.stop());
    };
  }, [actividadId, onToken, onError]);

  return (
    <div className="relative overflow-hidden rounded-xl bg-black">
      <video ref={video} className="aspect-square w-full object-cover" playsInline muted />
      <canvas ref={canvas} className="hidden" />
      <div className="pointer-events-none absolute inset-6 rounded-xl border-2 border-white/80" />
      {!listo && <div className="absolute inset-0 grid place-items-center text-sm text-white">Abriendo la cámara…</div>}
    </div>
  );
}
