"use client";

import { useRef, useEffect, useState } from "react";

const DEFAULT_COLOR = "#ffffff";

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255]
    : [1, 1, 1];
};

type Origin = "top-left" | "top-center" | "top-right" | "left" | "right" | "bottom-left" | "bottom-center" | "bottom-right";

const getAnchorAndDir = (origin: Origin, w: number, h: number) => {
  const outside = 0.2;
  switch (origin) {
    case "top-left": return { anchor: [0, -outside * h], dir: [0, 1] };
    case "top-right": return { anchor: [w, -outside * h], dir: [0, 1] };
    case "left": return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };
    case "right": return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };
    case "bottom-left": return { anchor: [0, (1 + outside) * h], dir: [0, -1] };
    case "bottom-center": return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };
    case "bottom-right": return { anchor: [w, (1 + outside) * h], dir: [0, -1] };
    default: return { anchor: [0.5 * w, -outside * h], dir: [0, 1] };
  }
};

interface LightRaysProps {
  raysOrigin?: Origin;
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  pulsating?: boolean;
  fadeDistance?: number;
  saturation?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
  className?: string;
}

export function LightRays({
  raysOrigin = "top-center",
  raysColor = DEFAULT_COLOR,
  raysSpeed = 1,
  lightSpread = 1,
  rayLength = 2,
  pulsating = false,
  fadeDistance = 1.0,
  saturation = 1.0,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0.0,
  distortion = 0.0,
  className = "",
}: LightRaysProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const animationIdRef = useRef<number | null>(null);
  const meshRef = useRef<any>(null);
  const cleanupFunctionRef = useRef<(() => void) | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    observerRef.current = new IntersectionObserver(
      (entries) => { setIsVisible(entries[0].isIntersecting); },
      { threshold: 0.1 }
    );
    observerRef.current.observe(containerRef.current);
    return () => { observerRef.current?.disconnect(); };
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;
    if (cleanupFunctionRef.current) { cleanupFunctionRef.current(); cleanupFunctionRef.current = null; }

    const initializeWebGL = async () => {
      if (!containerRef.current) return;
      let oglMod: typeof import("ogl");
      try {
        oglMod = await import("ogl");
      } catch (err) {
        // Chunk load failed — decorative effect, fail silently
        console.warn("LightRays: failed to load WebGL library", err);
        return;
      }
      const { Renderer, Program, Triangle, Mesh } = oglMod;
      if (!containerRef.current) return;

      const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), alpha: true });
      rendererRef.current = renderer;
      const gl = renderer.gl;
      gl.canvas.style.width = "100%";
      gl.canvas.style.height = "100%";
      while (containerRef.current.firstChild) containerRef.current.removeChild(containerRef.current.firstChild);
      containerRef.current.appendChild(gl.canvas);

      const vert = `attribute vec2 position;varying vec2 vUv;void main(){vUv=position*0.5+0.5;gl_Position=vec4(position,0.0,1.0);}`;
      const frag = `precision highp float;
uniform float iTime;uniform vec2 iResolution;uniform vec2 rayPos;uniform vec2 rayDir;uniform vec3 raysColor;
uniform float raysSpeed;uniform float lightSpread;uniform float rayLength;uniform float pulsating;
uniform float fadeDistance;uniform float saturation;uniform vec2 mousePos;uniform float mouseInfluence;
uniform float noiseAmount;uniform float distortion;varying vec2 vUv;
float noise(vec2 st){return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);}
float rayStrength(vec2 src,vec2 dir,vec2 coord,float sA,float sB,float spd){
vec2 sc=coord-src;vec2 dn=normalize(sc);float ca=dot(dn,dir);
float da=ca+distortion*sin(iTime*2.0+length(sc)*0.01)*0.2;
float sf=pow(max(da,0.0),1.0/max(lightSpread,0.001));float d=length(sc);
float md=iResolution.x*rayLength;float lf=clamp((md-d)/md,0.0,1.0);
float ff=clamp((iResolution.x*fadeDistance-d)/(iResolution.x*fadeDistance),0.5,1.0);
float p=pulsating>0.5?(0.8+0.2*sin(iTime*spd*3.0)):1.0;
float bs=clamp((0.45+0.15*sin(da*sA+iTime*spd))+(0.3+0.2*cos(-da*sB+iTime*spd)),0.0,1.0);
return bs*lf*ff*sf*p;}
void mainImage(out vec4 fc,in vec2 fragCoord){
vec2 coord=vec2(fragCoord.x,iResolution.y-fragCoord.y);vec2 fd=rayDir;
if(mouseInfluence>0.0){vec2 mp=mousePos*iResolution.xy;vec2 md=normalize(mp-rayPos);fd=normalize(mix(rayDir,md,mouseInfluence));}
vec4 r1=vec4(1.0)*rayStrength(rayPos,fd,coord,36.2214,21.11349,1.5*raysSpeed);
vec4 r2=vec4(1.0)*rayStrength(rayPos,fd,coord,22.3991,18.0234,1.1*raysSpeed);
fc=r1*0.5+r2*0.4;
if(noiseAmount>0.0){float n=noise(coord*0.01+iTime*0.1);fc.rgb*=(1.0-noiseAmount+noiseAmount*n);}
float b=1.0-(coord.y/iResolution.y);fc.x*=0.1+b*0.8;fc.y*=0.3+b*0.6;fc.z*=0.5+b*0.5;
if(saturation!=1.0){float g=dot(fc.rgb,vec3(0.299,0.587,0.114));fc.rgb=mix(vec3(g),fc.rgb,saturation);}
fc.rgb*=raysColor;}
void main(){vec4 c;mainImage(c,gl_FragCoord.xy);gl_FragColor=c;}`;

      const uniforms: any = {
        iTime: { value: 0 }, iResolution: { value: [1, 1] },
        rayPos: { value: [0, 0] }, rayDir: { value: [0, 1] },
        raysColor: { value: hexToRgb(raysColor) }, raysSpeed: { value: raysSpeed },
        lightSpread: { value: lightSpread }, rayLength: { value: rayLength },
        pulsating: { value: pulsating ? 1.0 : 0.0 }, fadeDistance: { value: fadeDistance },
        saturation: { value: saturation }, mousePos: { value: [0.5, 0.5] },
        mouseInfluence: { value: mouseInfluence }, noiseAmount: { value: noiseAmount },
        distortion: { value: distortion },
      };
      uniformsRef.current = uniforms;

      const geometry = new Triangle(gl);
      const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });
      const mesh = new Mesh(gl, { geometry, program });
      meshRef.current = mesh;

      const updatePlacement = () => {
        if (!containerRef.current || !renderer) return;
        renderer.dpr = Math.min(window.devicePixelRatio, 2);
        const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
        renderer.setSize(wCSS, hCSS);
        const dpr = renderer.dpr;
        const w = wCSS * dpr; const h = hCSS * dpr;
        uniforms.iResolution.value = [w, h];
        const { anchor, dir } = getAnchorAndDir(raysOrigin, w, h);
        uniforms.rayPos.value = anchor; uniforms.rayDir.value = dir;
      };

      const loop = (t: number) => {
        if (!rendererRef.current || !uniformsRef.current || !meshRef.current) return;
        uniforms.iTime.value = t * 0.001;
        if (followMouse && mouseInfluence > 0.0) {
          const s = 0.92;
          smoothMouseRef.current.x = smoothMouseRef.current.x * s + mouseRef.current.x * (1 - s);
          smoothMouseRef.current.y = smoothMouseRef.current.y * s + mouseRef.current.y * (1 - s);
          uniforms.mousePos.value = [smoothMouseRef.current.x, smoothMouseRef.current.y];
        }
        try { renderer.render({ scene: mesh }); animationIdRef.current = requestAnimationFrame(loop); }
        catch { return; }
      };

      window.addEventListener("resize", updatePlacement);
      updatePlacement();
      animationIdRef.current = requestAnimationFrame(loop);

      cleanupFunctionRef.current = () => {
        if (animationIdRef.current) { cancelAnimationFrame(animationIdRef.current); animationIdRef.current = null; }
        window.removeEventListener("resize", updatePlacement);
        if (renderer) {
          try {
            const loseCtx = renderer.gl.getExtension("WEBGL_lose_context");
            if (loseCtx) loseCtx.loseContext();
            const canvas = renderer.gl.canvas;
            if (canvas?.parentNode) canvas.parentNode.removeChild(canvas);
          } catch {}
        }
        rendererRef.current = null; uniformsRef.current = null; meshRef.current = null;
      };
    };

    initializeWebGL();
    return () => { cleanupFunctionRef.current?.(); cleanupFunctionRef.current = null; };
  }, [isVisible, raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, pulsating, fadeDistance, saturation, followMouse, mouseInfluence, noiseAmount, distortion]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height };
    };
    if (followMouse) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [followMouse]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    />
  );
}
