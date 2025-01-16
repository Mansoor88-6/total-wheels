import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import styled from "styled-components";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { Suspense, useState, useEffect, useCallback, useRef } from "react";
import { Group } from "three";

const ModelContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #242424;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: rgba(36, 36, 36, 0.9);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const LoaderSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid transparent;
  border-top: 3px solid var(--primary-color);
  border-right: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border: 3px solid transparent;
    border-top: 3px solid #0077ff;
    border-radius: 50%;
    animation: spin 1.5s linear infinite reverse;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoaderText = styled.div`
  text-align: center;
  color: var(--text-primary);
  font-family: "Rajdhani", sans-serif;

  h4 {
    margin-bottom: 8px;
    color: var(--primary-color);
    font-family: "Orbitron", sans-serif;
  }

  p {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
`;

const ModelInfo = styled.div<{ $isLoading: boolean }>`
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(36, 36, 36, 0.8);
  padding: 15px;
  border-radius: 10px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  font-family: "Rajdhani", sans-serif;
  opacity: ${(props) => (props.$isLoading ? 0 : 1)};
  transform: translateY(${(props) => (props.$isLoading ? "20px" : "0")});
  transition: all 0.3s ease;
  z-index: 10;
`;

const InteractionTip = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  font-size: 0.9rem;
  color: var(--text-secondary);

  svg {
    width: 16px;
    height: 16px;
    fill: var(--primary-color);
  }
`;

const ModelTitle = styled.h3`
  font-family: "Orbitron", sans-serif;
  color: var(--primary-color);
  margin-bottom: 5px;
  font-size: 1.2rem;
`;

interface CarProps {
  modelId: string;
  handleLoading: (loading: boolean) => void;
}

const carModels = {
  audi: { loader: FBXLoader, path: "/Audi.fbx", scale: 0.025 },
  truck: { loader: FBXLoader, path: "/Truck.fbx", scale: 0.025 },
  challenger: { loader: FBXLoader, path: "/Challenger.fbx", scale: 0.025 },
  range: { loader: FBXLoader, path: "/Range.fbx", scale: 0.025 },
  supra: { loader: FBXLoader, path: "/Supra.fbx", scale: 0.025 },
  gtr: { loader: FBXLoader, path: "/GTR.fbx", scale: 0.025 },
};

// Cache for loaded models
const modelCache = new Map();

async function loadAndCacheModel(modelId: string) {
  const modelConfig = carModels[modelId as keyof typeof carModels];
  const loader = new FBXLoader();
  const model = await loader.loadAsync(modelConfig.path);
  model.scale.setScalar(modelConfig.scale);
  model.position.set(0, -1, 0);
  model.rotation.set(0, Math.PI / 4, 0);
  modelCache.set(modelId, model);
  return model;
}

function ModelLoader({ modelId, handleLoading }: CarProps) {
  const { scene } = useThree();
  const modelRef = useRef<Group | null>(null);
  const rotationSpeed = 0.005;

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += rotationSpeed;
    }
  });

  const loadModel = useCallback(async () => {
    try {
      handleLoading(true);

      // Clear existing model
      scene.children
        .filter((child) => child instanceof Group)
        .forEach((child) => scene.remove(child));

      // Get cached model or load if not cached
      let model;
      if (modelCache.has(modelId)) {
        model = modelCache.get(modelId).clone();
      } else {
        model = await loadAndCacheModel(modelId);
        model = model.clone();
      }

      modelRef.current = model;
      scene.add(model);
      handleLoading(false);
    } catch (error) {
      console.error("Error loading model:", error);
      handleLoading(false);
    }
  }, [handleLoading, scene, modelId]);

  useEffect(() => {
    loadModel();
    return () => {
      if (modelRef.current) {
        scene.remove(modelRef.current);
        modelRef.current = null;
      }
    };
  }, [loadModel, scene]);

  return null;
}

interface CarModelProps {
  selectedModel: string;
  onLoadingChange: (loading: boolean) => void;
}

function CarModel({ selectedModel, onLoadingChange }: CarModelProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);

  const handleLoading = useCallback(
    (loading: boolean) => {
      setIsLoading(loading);
      onLoadingChange(loading);
    },
    [onLoadingChange]
  );

  const getModelName = () => {
    const modelMap: { [key: string]: string } = {
      audi: "Audi RS7 Sportback",
      challenger: "Dodge Challenger SRT",
      truck: "Ford F-150 Raptor",
      range: "Range Rover Sport SVR",
      supra: "Toyota GR Supra",
      gtr: "Nissan GT-R Nismo",
    };
    return modelMap[selectedModel] || selectedModel;
  };

  return (
    <ModelContainer>
      {isLoading && (
        <LoaderContainer>
          <LoaderSpinner />
          <LoaderText>
            <h4>Loading {selectedModel.toUpperCase()}</h4>
            <p>Please wait, this 3D model will only be loaded once</p>
          </LoaderText>
        </LoaderContainer>
      )}
      <ModelInfo $isLoading={isLoading}>
        <ModelTitle>{getModelName()}</ModelTitle>
        <InteractionTip>
          <svg viewBox="0 0 24 24">
            <path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z" />
          </svg>
          Drag to rotate
        </InteractionTip>
        <InteractionTip>
          <svg viewBox="0 0 24 24">
            <path d="M12,20C4,20 4,12 4,12C4,12 4,4 12,4C20,4 20,12 20,12C20,12 20,20 12,20M12,14C13.1046,14 14,13.1046 14,12C14,10.8954 13.1046,10 12,10C10.8954,10 10,10.8954 10,12C10,13.1046 10.8954,14 12,14Z" />
          </svg>
          Scroll to zoom
        </InteractionTip>
      </ModelInfo>
      <Canvas>
        <PerspectiveCamera makeDefault position={[8, 5, 8]} fov={50} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <ModelLoader
            key={selectedModel}
            modelId={selectedModel}
            handleLoading={handleLoading}
          />
        </Suspense>
        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={15}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          autoRotate={autoRotate}
          autoRotateSpeed={2}
          onChange={() => setAutoRotate(false)}
        />
      </Canvas>
    </ModelContainer>
  );
}

export default CarModel;
