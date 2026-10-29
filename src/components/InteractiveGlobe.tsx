'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface LabelPoint {
  name: string;
  lat: number;
  lng: number;
}

const LABELS: LabelPoint[] = [
  { name: 'Atendimento', lat: 20, lng: -40 },
  { name: 'CRM', lat: -15, lng: -50 },
  { name: 'Automação', lat: 35, lng: 20 },
  { name: 'Vendas', lat: 5, lng: 80 },
  { name: 'Relacionamento', lat: -25, lng: 135 },
];

export const InteractiveGlobe: React.FC<{ className?: string }> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [projectedLabels, setProjectedLabels] = useState<
    Array<{ name: string; x: number; y: number; visible: boolean; opacity: number }>
  >([]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isVisible = true;
    let isDocumentVisible = true;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 640;

    // 1. Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = isMobile ? 280 : 260;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL initialization failed, falling back to static visual', e);
      setHasWebGL(false);
      return;
    }

    // 2. Globe Group (for rotation)
    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = 0.25;
    globeGroup.rotation.y = -0.5;
    scene.add(globeGroup);

    const radius = 95;

    // 3. Inner translucent sphere
    const sphereGeo = new THREE.SphereGeometry(radius * 0.99, isMobile ? 32 : 48, isMobile ? 32 : 48);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xecfdf5,
      transparent: true,
      opacity: 0.85,
    });
    const baseSphere = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(baseSphere);

    // Subtle atmospheric glow outline
    const glowGeo = new THREE.SphereGeometry(radius * 1.01, 24, 24);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xd0fae5,
      transparent: true,
      opacity: 0.35,
      wireframe: true,
    });
    const glowSphere = new THREE.Mesh(glowGeo, glowMat);
    globeGroup.add(glowSphere);

    // 4. Dot matrix on sphere surface (Fibonacci distribution for natural density)
    // Reduce point count on mobile to preserve CPU & GPU
    const pointCount = isMobile ? 700 : 1400;
    const positions = new Float32Array(pointCount * 3);
    const colors = new Float32Array(pointCount * 3);

    const primaryColor = new THREE.Color(0x007956);
    const mintColor = new THREE.Color(0x34d399);

    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < pointCount; i++) {
      const y = 1 - (i / (pointCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      positions[i * 3] = x * radius;
      positions[i * 3 + 1] = y * radius;
      positions[i * 3 + 2] = z * radius;

      const mixed = primaryColor.clone().lerp(mintColor, Math.random() * 0.4);
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointsGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pointsMat = new THREE.PointsMaterial({
      size: isMobile ? 2.6 : 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });

    const pointCloud = new THREE.Points(pointsGeo, pointsMat);
    globeGroup.add(pointCloud);

    // Helper: Lat/Lng to Vector3
    const latLngToVector3 = (lat: number, lng: number, r: number) => {
      const phiRad = (90 - lat) * (Math.PI / 180);
      const thetaRad = (lng + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -(r * Math.sin(phiRad) * Math.cos(thetaRad)),
        r * Math.cos(phiRad),
        r * Math.sin(phiRad) * Math.sin(thetaRad)
      );
    };

    // 5. Connection Arcs (Curved 3D Great-Circles)
    const arcPointsPairs: [LabelPoint, LabelPoint][] = [
      [LABELS[0], LABELS[1]],
      [LABELS[1], LABELS[2]],
      [LABELS[2], LABELS[3]],
      [LABELS[0], LABELS[2]],
      [LABELS[3], LABELS[4]],
    ];

    const arcsGroup = new THREE.Group();
    globeGroup.add(arcsGroup);

    arcPointsPairs.forEach(([p1, p2]) => {
      const v1 = latLngToVector3(p1.lat, p1.lng, radius);
      const v2 = latLngToVector3(p2.lat, p2.lng, radius);

      const mid = v1.clone().add(v2).multiplyScalar(0.5);
      const dist = v1.distanceTo(v2);
      mid.normalize().multiplyScalar(radius + dist * 0.28);

      const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
      const curvePoints = curve.getPoints(isMobile ? 30 : 50);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);

      const curveMat = new THREE.LineBasicMaterial({
        color: 0x007956,
        transparent: true,
        opacity: 0.65,
      });

      const line = new THREE.Line(curveGeo, curveMat);
      arcsGroup.add(line);

      [v1, v2].forEach((pos) => {
        const ringGeo = new THREE.RingGeometry(1.5, 3.2, 16);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x007956,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.7,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.position.copy(pos);
        ringMesh.lookAt(pos.clone().multiplyScalar(2));
        arcsGroup.add(ringMesh);
      });
    });

    // 6. Label 3D anchor points
    const labelAnchors = LABELS.map((item) => ({
      name: item.name,
      pos: latLngToVector3(item.lat, item.lng, radius * 1.02),
    }));

    // 7. Interactive dragging with mouse & touch
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let velocityX = 0;
    let velocityY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      velocityX = 0;
      velocityY = 0;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      globeGroup.rotation.y += deltaX * 0.006;
      globeGroup.rotation.x += deltaY * 0.006;

      velocityX = deltaX * 0.006;
      velocityY = deltaY * 0.006;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
        velocityX = 0;
        velocityY = 0;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;

      globeGroup.rotation.y += deltaX * 0.006;
      globeGroup.rotation.x += deltaY * 0.006;

      velocityX = deltaX * 0.006;
      velocityY = deltaY * 0.006;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseup', onMouseUp);

    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 8. IntersectionObserver to pause rendering when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const onVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // 9. Resize Observer
    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // 10. Main Animation Loop
    let pulseTime = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible || !isDocumentVisible || !renderer) return;

      pulseTime += 0.02;

      if (!isDragging) {
        velocityX *= 0.94;
        velocityY *= 0.94;
        globeGroup.rotation.y += velocityX;
        globeGroup.rotation.x += velocityY;

        if (!prefersReducedMotion && Math.abs(velocityX) < 0.001) {
          globeGroup.rotation.y += 0.0028;
        }
      }

      globeGroup.rotation.x = Math.max(-0.6, Math.min(0.6, globeGroup.rotation.x));
      glowSphere.scale.setScalar(1 + Math.sin(pulseTime) * 0.015);

      renderer.render(scene, camera);

      // 11. Project 3D labels to 2D screen positions
      const w = container.clientWidth;
      const h = container.clientHeight;

      const camDir = camera.position.clone().normalize();

      const updated = labelAnchors.map((anchor) => {
        const worldPos = anchor.pos.clone().applyMatrix4(globeGroup.matrixWorld);
        const normal = worldPos.clone().normalize();
        const dot = normal.dot(camDir);

        const screenPos = worldPos.project(camera);
        const x = (screenPos.x * 0.5 + 0.5) * w;
        const y = (-(screenPos.y * 0.5) + 0.5) * h;

        const visible = dot > 0.15;
        const opacity = Math.max(0, Math.min(1, (dot - 0.15) * 3));

        return {
          name: anchor.name,
          x,
          y,
          visible,
          opacity,
        };
      });

      setProjectedLabels(updated);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);

      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      if (container && renderer && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      sphereGeo.dispose();
      sphereMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      pointsGeo.dispose();
      pointsMat.dispose();
      renderer?.dispose();
    };
  }, []);

  if (!hasWebGL) {
    // Fallback if WebGL is unavailable
    return (
      <div className={`relative w-full h-full min-h-[340px] flex items-center justify-center p-6 ${className}`}>
        <div className="w-56 h-56 rounded-full bg-brand-pale border-2 border-brand-mint/80 flex items-center justify-center relative shadow-inner">
          <div className="w-40 h-40 rounded-full bg-white/80 border border-brand-border flex items-center justify-center">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">dot.Sales Hub</span>
          </div>
          {LABELS.map((l, i) => (
            <span
              key={i}
              className="absolute text-[11px] font-semibold bg-white px-2 py-0.5 rounded-full border border-brand-border shadow-xs"
              style={{
                top: `${20 + (i * 15)}%`,
                left: i % 2 === 0 ? '10%' : '75%',
              }}
            >
              {l.name}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full min-h-[340px] sm:min-h-[420px] select-none cursor-grab active:cursor-grabbing overflow-hidden ${className}`}
      aria-label="Globo 3D interativo de conexões dot.Sales"
    >
      {/* Projected 2D HTML Labels */}
      {projectedLabels.map((lbl, idx) => (
        <div
          key={idx}
          className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150 z-20"
          style={{
            left: `${lbl.x}px`,
            top: `${lbl.y}px`,
            opacity: lbl.opacity,
            display: lbl.visible ? 'block' : 'none',
          }}
        >
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs border border-brand-border shadow-xs text-xs font-semibold text-brand-dark">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse shrink-0" />
            <span>{lbl.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
