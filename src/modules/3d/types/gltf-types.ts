import {
  Object3D,
  Material,
  BufferGeometry,
  AnimationClip,
  Camera,
} from 'three'

// Tipo base para um nó GLTF
export interface GLTFNode extends Object3D {
  geometry: BufferGeometry
  material?: Material | Material[]
}
// Tipo para os materiais GLTF
export interface GLTFMaterials {
  [key: string]: Material
}
// Tipo para os nós GLTF
export interface GLTFNodes {
  [key: string]: GLTFNode
}

// Tipo completo do useGLTF
export interface GLTFResult {
  nodes: GLTFNodes
  materials: GLTFMaterials
  scene: Object3D
  scenes: Object3D[]
  animations: AnimationClip[]
  cameras: Camera[]
  asset: {
    generator?: string
    version?: string
    copyright?: string
    [key: string]: unknown
  }
  parser: {
    json: unknown
    [key: string]: unknown
  }
  userData: Record<string, unknown>
}

// Tipo para as props dos componentes de mobília
export interface FurnitureProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number]
  visible?: boolean
  userData?: Record<string, unknown>
  [key: string]: unknown
}

// Tipos específicos para cada modelo
export interface SofaGLTF extends GLTFResult {
  nodes: {
    sofa: GLTFNode
  }
  materials: {
    sofa: Material
  }
}

export interface BedGLTF extends GLTFResult {
  nodes: {
    model: GLTFNode
  }
  materials: {
    model: Material
  }
}
export interface ChairGLTF extends GLTFResult {
  nodes: {
    model: GLTFNode
  }
  materials: {
    model: Material
  }
}

export interface ClosetGLTF extends GLTFResult {
  nodes: {
    closet: GLTFNode
  }
  materials: {
    closet: Material
  }
}

export interface DeskTableGLTF extends GLTFResult {
  nodes: {
    'desk-table': GLTFNode
  }
  materials: {
    'desk-table': Material
  }
}

export interface CaseGLTF extends GLTFResult {
  nodes: {
    case: GLTFNode
  }
  materials: {
    case: Material
  }
}

export interface GrayMatterGLTF extends GLTFResult {
  nodes: {
    model: GLTFNode
  }
  materials: {
    model: Material
  }
}
