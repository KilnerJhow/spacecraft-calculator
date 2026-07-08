export interface Recipe {
  id: string;
  yield: number;
  inputs: Record<string, number>;
}

export interface Item {
  name: string;
  isBase: boolean;
  recipes?: Recipe[];
  description?: string;
  basePrice?: number;
  weight?: number;
}

export interface SupplyChainNode {
  id: string;
  name: string;
  quantity: number;
  fromInventory: number;
  crafted: number;
  gathered: number;
  isBase: boolean;
  runs?: number;
  yielded?: number;
  recipeDetails?: any;
  children: SupplyChainNode[];
}

export interface SupplyChainResult {
  baseResources: Record<string, number>;
  remainingInventory: Record<string, number>;
  tree: SupplyChainNode;
}

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  active: boolean;
}
