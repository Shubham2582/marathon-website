import React, { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Shirt, Wind, Feather } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const frameCount = 32;
const imagePath = "/imgAnimation/img";

const currentFrame = (index: number) => `${imagePath}${index}.webp`;

export function ProductShowcase() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedImagesCount = useRef(0);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const animationContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    contextRef.current = canvas.getContext("2d");
    const context = contextRef.current;
    if (!context) return;

    canvas.width = 1080;
    canvas.height = 1080;

    // Preload images
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedImagesCount.current += 1;
        imagesRef.current[i - 1] = img;
        if (loadedImagesCount.current === 1) {
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
        if (loadedImagesCount.current === frameCount) {
          setAllImagesLoaded(true);
        }
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${img.src}`);
      };
    }
  }, []);

  useEffect(() => {
    if (
      !allImagesLoaded ||
      !canvasRef.current ||
      !animationContainerRef.current
    )
      return;

    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!context) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const updateImage = (index: number) => {
      const img = imagesRef.current[index];
      if (img && context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    gsap.to(
      { frame: 0 },
      {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        onUpdate: function () {
          const frameIndex = Math.floor(this.targets()[0].frame);
          requestAnimationFrame(() => updateImage(frameIndex));
        },
        scrollTrigger: {
          trigger: animationContainerRef.current,
          scrub: 0.5,
          start: "top top",
          end: "+=2000px",
          pin: true,
          anticipatePin: 1,
          // markers: true,
        },
      },
    );

    // Initial draw (first frame)
    if (imagesRef.current.length > 0) {
      updateImage(0);
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenis.destroy();
    };
  }, [allImagesLoaded]);

  return (
    <div
      ref={animationContainerRef}
      className="relative w-full flex justify-center items-center overflow-hidden bg-neutral-100 text-neutral-900"
      style={{ height: "100vh" }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-neutral-200 pointer-events-none opacity-80" />

      {/* Left Content - Title & CTA */}
      <div className="absolute left-6 md:left-20 top-1/4 md:top-1/2 md:-translate-y-1/2 z-10 max-w-sm space-y-6 hidden md:block">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold font-sans tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-900 to-purple-600">
            Official <br /> Runner's Kit
          </h2>
          <div className="h-1 w-20 bg-purple-600 mt-4 rounded-full" />
        </div>
        <p className="text-neutral-600 font-serif text-lg leading-relaxed">
          Engineered for the challenging terrain of Abujhmaad. Experience
          ultimate comfort with our premium moisture-wicking fabric.
        </p>
        <Button size="lg" className="shadow-purple-900/20 shadow-lg mt-4 disabled:opacity-100" disabled>
          Registration Closed
        </Button>
      </div>

      {/* Mobile Title*/}
      <div className="absolute top-20 left-0 w-full text-center md:hidden px-4 z-10">
        <h2 className="text-3xl font-bold font-sans tracking-tighter text-neutral-900">
          Official Runner's Kit
        </h2>
        <p className="text-neutral-600 font-serif text-sm mt-2">
          Premium gear for the marathon
        </p>
      </div>

      {!allImagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 text-neutral-900 text-lg z-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-serif text-neutral-500">
              Loading Kit Experience...
            </p>
          </div>
        </div>
      )}

      {/* Center Animation */}
      <div className="relative z-0 w-full max-w-[500px] h-[70vh] flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain will-change-transform drop-shadow-2xl"
          style={{
            opacity: allImagesLoaded ? 1 : 0,
            transition: "opacity 0.8s ease-in-out",
          }}
        ></canvas>
      </div>

      {/* Right Content - Features */}
      <div className="absolute right-6 md:right-20 top-2/3 md:top-1/2 md:-translate-y-1/2 z-10 space-y-8 hidden md:block">
        <div className="flex items-center gap-4 justify-end group">
          <div className="text-right">
            <h3 className="text-lg font-bold font-sans text-neutral-900 group-hover:text-purple-600 transition-colors">
              Moisture Wicking
            </h3>
            <p className="text-sm font-serif text-neutral-500">
              Keeps you dry & cool
            </p>
          </div>
          <div className="p-3 rounded-full bg-white border border-neutral-200 shadow-sm group-hover:border-purple-300 group-hover:shadow-purple-100 transition-all duration-300">
            <Shirt className="w-6 h-6 text-neutral-400 group-hover:text-purple-600" />
          </div>
        </div>

        <div className="flex items-center gap-4 justify-end group">
          <div className="text-right">
            <h3 className="text-lg font-bold font-sans text-neutral-900 group-hover:text-purple-600 transition-colors">
              Ultra Lightweight
            </h3>
            <p className="text-sm font-serif text-neutral-500">
              Zero drag performance
            </p>
          </div>
          <div className="p-3 rounded-full bg-white border border-neutral-200 shadow-sm group-hover:border-purple-300 group-hover:shadow-purple-100 transition-all duration-300">
            <Feather className="w-6 h-6 text-neutral-400 group-hover:text-purple-600" />
          </div>
        </div>

        <div className="flex items-center gap-4 justify-end group">
          <div className="text-right">
            <h3 className="text-lg font-bold font-sans text-neutral-900 group-hover:text-purple-600 transition-colors">
              Breathable Mesh
            </h3>
            <p className="text-sm font-serif text-neutral-500">
              Maximum airflow
            </p>
          </div>
          <div className="p-3 rounded-full bg-white border border-neutral-200 shadow-sm group-hover:border-purple-300 group-hover:shadow-purple-100 transition-all duration-300">
            <Wind className="w-6 h-6 text-neutral-400 group-hover:text-purple-600" />
          </div>
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="absolute bottom-10 left-0 w-full flex justify-center md:hidden z-10">
        <Button className="rounded-full px-8 shadow-lg disabled:opacity-100" disabled>Registration Closed</Button>
      </div>
    </div>
  );
}
