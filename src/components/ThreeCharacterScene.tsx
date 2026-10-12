import { useRef, useEffect, useState, Suspense, Component, ReactNode, ErrorInfo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture, ContactShadows, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { CharacterItem } from '../data/characters';

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Catches any 3D asset loader errors and seamlessly displays the reference model
class ModelErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('3D Model not available or failed to parse, falling back to reference turntable:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Replace reference viewer with Justin GLB when available.
function JustinGltfModel({ modelUrl }: { modelUrl: string }) {
  const gltf = useGLTF(modelUrl);
  const modelRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (gltf.scene) {
      gltf.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [gltf]);

  return (
    <group ref={modelRef} position={[0, -1.1, 0]}>
      <primitive object={gltf.scene} scale={1.8} />
    </group>
  );
}


// Interactive Turnaround Character Display Plate in 3D
function ActionFigureReferenceModel({ character }: { character: CharacterItem }) {
  const groupRef = useRef<THREE.Group>(null);

  // Load front, side, and back turnaround textures
  const frontTex = useTexture(character.views?.front || character.thumbnail || '');
  const sideTex = useTexture(character.views?.side || character.thumbnail || '');
  const backTex = useTexture(character.views?.back || character.thumbnail || '');

  // Configure texture filtering for crispness
  [frontTex, sideTex, backTex].forEach((tex) => {
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
  });

  const [activeTexture, setActiveTexture] = useState<THREE.Texture>(frontTex);

  // Cross-angle texture update based on turntable angle relative to camera
  useFrame(({ camera }) => {
    if (!groupRef.current) return;

    // Calculate world angle relative to camera
    const worldPos = new THREE.Vector3();
    groupRef.current.getWorldPosition(worldPos);

    const camPos = camera.position.clone().sub(worldPos);
    const angleRad = Math.atan2(camPos.x, camPos.z);
    let deg = (angleRad * (180 / Math.PI) - groupRef.current.rotation.y * (180 / Math.PI)) % 360;
    if (deg < 0) deg += 360;

    // Turnaround quadrant mapping:
    // Front: 315° to 45°
    // Side Right: 45° to 135°
    // Back: 135° to 225°
    // Side Left: 225° to 315°
    if (deg >= 315 || deg < 45) {
      if (activeTexture !== frontTex) setActiveTexture(frontTex);
    } else if (deg >= 45 && deg < 135) {
      if (activeTexture !== sideTex) setActiveTexture(sideTex);
    } else if (deg >= 135 && deg < 225) {
      if (activeTexture !== backTex) setActiveTexture(backTex);
    } else {
      if (activeTexture !== sideTex) setActiveTexture(sideTex);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.05, 0]}>
      {/* Action Figure Display Cutout Card */}
      <mesh position={[0, 0.45, 0]}>
        <planeGeometry args={[1.5, 2.0]} />
        <meshBasicMaterial
          map={activeTexture}
          transparent={true}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* Collectible Action Figure Base Pedestal */}
      <group position={[0, -0.65, 0]}>
        {/* Main Base Cylinder */}
        <mesh receiveShadow>
          <cylinderGeometry args={[0.95, 1.05, 0.16, 48]} />
          <meshStandardMaterial
            color="#222222"
            metalness={0.7}
            roughness={0.25}
          />
        </mesh>

        {/* Top Rim Ring */}
        <mesh position={[0, 0.085, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.015, 48]} />
          <meshStandardMaterial
            color="#E83E7A"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Inner Stand Inset */}
        <mesh position={[0, 0.09, 0]}>
          <cylinderGeometry args={[0.82, 0.82, 0.01, 48]} />
          <meshStandardMaterial
            color="#F9DCE7"
            metalness={0.2}
            roughness={0.6}
          />
        </mesh>

        {/* Gold Border Detail Ring */}
        <mesh position={[0, 0.092, 0]}>
          <ringGeometry args={[0.74, 0.77, 48]} />
          <meshStandardMaterial
            color="#E6C875"
            metalness={0.9}
            roughness={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}

interface SceneProps {
  character: CharacterItem;
  viewAngle: 'front' | 'side' | 'back' | 'auto';
  isAutoRotating: boolean;
  onUserInteraction: () => void;
}

function SceneContent({
  character,
  viewAngle,
  isAutoRotating,
  onUserInteraction,
}: SceneProps) {
  const controlsRef = useRef<any>(null);
  const [modelAvailable, setModelAvailable] = useState<boolean>(false);
  const targetCamPos = useRef<THREE.Vector3 | null>(null);

  // Probe whether Justin GLB exists and is valid binary glb (not Vite HTML fallback)
  useEffect(() => {
    if (!character.modelUrl) {
      setModelAvailable(false);
      return;
    }

    let isMounted = true;
    fetch(character.modelUrl, { method: 'GET' })
      .then(async (res) => {
        if (!isMounted) return;
        const contentType = res.headers.get('content-type') || '';
        // If not OK or server returns HTML (SPA fallback), then not a model
        if (!res.ok || contentType.includes('text/html')) {
          setModelAvailable(false);
          return;
        }

        // Verify buffer magic or text
        const buffer = await res.arrayBuffer().catch(() => null);
        if (!buffer || buffer.byteLength < 4) {
          setModelAvailable(false);
          return;
        }

        const uint8 = new Uint8Array(buffer);
        // GLB magic number is 0x46546C67 (ASCII: 'glTF')
        const isGlb =
          uint8[0] === 0x67 && uint8[1] === 0x6c && uint8[2] === 0x54 && uint8[3] === 0x46;

        // Or if glTF JSON (starts with '{')
        const isJson = uint8[0] === 0x7b;

        if (isGlb || isJson) {
          setModelAvailable(true);
        } else {
          setModelAvailable(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setModelAvailable(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [character.modelUrl]);

  // Handle angle change animations
  useEffect(() => {
    if (!controlsRef.current) return;

    if (viewAngle === 'front') {
      targetCamPos.current = new THREE.Vector3(0, 0.3, 3.8);
    } else if (viewAngle === 'side') {
      targetCamPos.current = new THREE.Vector3(3.8, 0.3, 0.01);
    } else if (viewAngle === 'back') {
      targetCamPos.current = new THREE.Vector3(0, 0.3, -3.8);
    } else {
      targetCamPos.current = null;
    }
  }, [viewAngle]);

  // Smooth lerping to camera target
  useFrame(({ camera }) => {
    if (targetCamPos.current && controlsRef.current) {
      camera.position.lerp(targetCamPos.current, 0.07);
      controlsRef.current.target.lerp(new THREE.Vector3(0, 0.2, 0), 0.07);
      controlsRef.current.update();

      if (camera.position.distanceTo(targetCamPos.current) < 0.02) {
        targetCamPos.current = null;
      }
    }
  });

  return (
    <>
      {/* Studio Lighting */}
      <ambientLight intensity={0.9} color="#FFF8FA" />
      <directionalLight
        position={[3, 4, 3]}
        intensity={1.2}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-3, 2, -2]} intensity={0.5} color="#F9DCE7" />
      <pointLight position={[0, 3, -3]} intensity={0.7} color="#FFFFFF" />

      {/* R3F OrbitControls */}
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={true}
        minDistance={2.0}
        maxDistance={5.8}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2 + 0.05}
        enableDamping={true}
        dampingFactor={0.06}
        autoRotate={isAutoRotating}
        autoRotateSpeed={1.4}
        onStart={onUserInteraction}
        target={[0, 0.2, 0]}
      />

      {/* Model or Polished Reference Presentation */}
      <Suspense fallback={null}>
        <ModelErrorBoundary
          fallback={<ActionFigureReferenceModel character={character} />}
        >
          {modelAvailable && character.modelUrl ? (
            <JustinGltfModel modelUrl={character.modelUrl} />
          ) : (
            <ActionFigureReferenceModel character={character} />
          )}
        </ModelErrorBoundary>
      </Suspense>

      {/* Floor Contact Shadows */}
      <ContactShadows
        position={[0, -0.76, 0]}
        opacity={0.35}
        scale={6}
        blur={2.0}
        far={3}
        color="#222222"
      />
    </>
  );
}

export default function ThreeCharacterScene(props: SceneProps) {
  const [webglError, setWebglError] = useState(false);

  if (webglError) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
        <p className="text-xs font-bold tracking-widest text-[#E83E7A] uppercase">
          CHARACTER MODEL UNAVAILABLE
        </p>
        <p className="mt-1 text-sm text-[#777777]">
          Showing official orthographic turnaround view below.
        </p>
      </div>
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0.3, 3.8], fov: 42 }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault();
          setWebglError(true);
        });
      }}
      className="h-full w-full"
    >
      <SceneContent {...props} />
    </Canvas>
  );
}
