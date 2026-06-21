import type { Item } from '../types';

export const itemsData: Record<string, Item> = {
  "wire": {
    "name": "Wire",
    "isBase": false,
    "recipes": [
      {
        "id": "wire_from_ingot",
        "yield": 4,
        "inputs": {
          "copper_ingot": 1
        }
      }
    ]
  },
  "copper_ingot": {
    "name": "Copper Ingot",
    "isBase": false,
    "recipes": [
      {
        "id": "ingot_from_ore",
        "yield": 1,
        "inputs": {
          "copper_ore": 2
        }
      },
      {
        "id": "ingot_from_nugget",
        "yield": 1,
        "inputs": {
          "copper_nugget": 4
        }
      }
    ]
  },
  "copper_ore": {
    "name": "Copper Ore",
    "isBase": true
  },
  "copper_nugget": {
    "name": "Copper Nugget",
    "isBase": true
  },
  "nut_and_bolt": {
    "name": "Nut and Bolt",
    "isBase": false,
    "recipes": [
      {
        "id": "nut_and_bolt_from_iron",
        "yield": 8,
        "inputs": {
          "iron_ingot": 1
        }
      }
    ]
  },
  "iron_ingot": {
    "name": "Iron Ingot",
    "isBase": false,
    "recipes": [
      {
        "id": "iron_ingot_from_ore",
        "yield": 1,
        "inputs": {
          "iron_ore": 2
        }
      },
      {
        "id": "iron_ingot_from_nugget",
        "yield": 1,
        "inputs": {
          "iron_nugget": 4
        }
      }
    ]
  },
  "iron_ore": {
    "name": "Iron Ore",
    "isBase": true
  },
  "iron_nugget": {
    "name": "Iron Nugget",
    "isBase": true
  },
  "crystalline_focuser": {
    "name": "Crystalline Focuser",
    "isBase": false,
    "recipes": [
      {
        "id": "crystalline_focuser_recipe",
        "yield": 1,
        "inputs": {
          "quartz": 1,
          "wire": 5
        }
      }
    ]
  },
  "quartz": {
    "name": "Quartz",
    "isBase": true
  },
  "small_module_kit": {
    "name": "Small Module Kit",
    "isBase": false,
    "recipes": [
      {
        "id": "small_module_kit_recipe",
        "yield": 1,
        "inputs": {
          "nut_and_bolt": 20,
          "wire": 10
        }
      }
    ]
  },
  "simple_mining_laser": {
    "name": "Simple Mining Laser",
    "isBase": false,
    "recipes": [
      {
        "id": "simple_mining_laser_recipe",
        "yield": 1,
        "inputs": {
          "small_module_kit": 1,
          "crystalline_focuser": 2
        }
      }
    ]
  },
  "magnetic_coil": {
    "name": "Magnetic Coil",
    "isBase": false,
    "recipes": [
      {
        "id": "magnetic_coil_recipe",
        "yield": 2,
        "inputs": {
          "wire": 5,
          "iron_ingot": 1,
          "nut_and_bolt": 1
        }
      }
    ]
  },
  "overclocked_mining_laser": {
    "name": "Overclocked Mining Laser",
    "isBase": false,
    "recipes": [
      {
        "id": "overclocked_mining_laser_recipe",
        "yield": 1,
        "inputs": {
          "simple_mining_laser": 1,
          "crystalline_focuser": 3,
          "magnetic_coil": 3
        }
      }
    ]
  },
  "silicone_gel": {
    "name": "Silicone Gel",
    "isBase": true
  },
  "metal_sheet": {
    "name": "Metal Sheet",
    "isBase": false,
    "recipes": [
      {
        "id": "metal_sheet_recipe",
        "yield": 1,
        "inputs": {
          "iron_ingot": 1
        }
      }
    ]
  },
  "motor": {
    "name": "Motor",
    "isBase": false,
    "recipes": [
      {
        "id": "motor_recipe",
        "yield": 1,
        "inputs": {
          "metal_sheet": 1,
          "magnetic_coil": 5,
          "silicone_gel": 5
        }
      }
    ]
  },
  "silicate": {
    "name": "Silicate",
    "isBase": true
  },
  "concrete": {
    "name": "Concrete",
    "isBase": false,
    "recipes": [
      {
        "id": "concrete_recipe",
        "yield": 1,
        "inputs": {
          "silicate": 2
        }
      }
    ]
  },
  "flywheel_battery": {
    "name": "Flywheel Battery",
    "isBase": false,
    "recipes": [
      {
        "id": "flywheel_battery_recipe",
        "yield": 1,
        "inputs": {
          "small_module_kit": 1,
          "motor": 1,
          "concrete": 2
        }
      }
    ]
  },
  "small_cargo_hold": {
    "name": "Small Cargo Hold",
    "isBase": false,
    "recipes": [
      {
        "id": "small_cargo_hold_recipe",
        "yield": 1,
        "inputs": {
          "small_module_kit": 1,
          "metal_sheet": 6,
          "silicone_gel": 4
        }
      }
    ]
  },
  "single_tube_missile_launcher": {
    "name": "Single-Tube Missile Launcher",
    "isBase": false,
    "recipes": [
      {
        "id": "single_tube_missile_launcher_recipe",
        "yield": 1,
        "inputs": {
          "small_module_kit": 1,
          "metal_sheet": 3,
          "nut_and_bolt": 10
        }
      }
    ]
  },
  "sulfur": {
    "name": "Sulfur",
    "isBase": true
  },
  "a_carbon": {
    "name": "a-Carbon",
    "isBase": true,
    "description": "Found in Coal Clump (an ore node) and siderite (also an ore node)"
  },
  "solid_explosive": {
    "name": "Solid Explosive",
    "isBase": false,
    "recipes": [
      {
        "id": "solid_explosive_recipe",
        "yield": 1,
        "inputs": {
          "sulfur": 5,
          "a_carbon": 2
        }
      }
    ]
  },
  "small_missile_airframe": {
    "name": "Small Missile Airframe",
    "isBase": false,
    "recipes": [
      {
        "id": "small_missile_airframe_recipe",
        "yield": 5,
        "inputs": {
          "metal_sheet": 1,
          "silicone_gel": 1,
          "solid_explosive": 2
        }
      }
    ]
  },
  "blasting_missile": {
    "name": "Blasting Missile",
    "isBase": false,
    "recipes": [
      {
        "id": "blasting_missile_recipe",
        "yield": 5,
        "inputs": {
          "solid_explosive": 8,
          "small_missile_airframe": 5
        }
      }
    ]
  },
  "stainless_plate": {
    "name": "Stainless Plate",
    "isBase": false,
    "recipes": [
      {
        "id": "stainless_plate_recipe",
        "yield": 1,
        "inputs": {
          "aluminum_ingot": 2,
          "copper_ingot": 1
        }
      }
    ]
  },
  "semicondutor_substrate": {
    "name": "Semicondutor Substrate",
    "isBase": true
  },
  "hall_alternator": {
    "name": "Hall Alternator",
    "isBase": false,
    "recipes": [
      {
        "id": "hall_alternator_recipe",
        "yield": 1,
        "inputs": {
          "semicondutor_substrate": 3,
          "magnetic_coil": 3,
          "metal_sheet": 3
        }
      }
    ]
  },
  "cart_pusher_thruster": {
    "name": "\"Cart Pusher\" Thruster",
    "isBase": false,
    "recipes": [
      {
        "id": "cart_pusher_thruster_recipe",
        "yield": 1,
        "inputs": {
          "stainless_plate": 10,
          "wire": 40,
          "hall_alternator": 1
        }
      }
    ]
  },
  "base_core_drive": {
    "name": "Base Core Drive",
    "isBase": true
  },
  "base_deploy_kit": {
    "name": "Base Deploy Kit",
    "isBase": false,
    "recipes": [
      {
        "id": "base_deploy_kit_recipe",
        "yield": 1,
        "inputs": {
          "base_core_drive": 1,
          "stainless_plate": 4,
          "metal_sheet": 20,
          "wire": 20,
          "concrete": 20
        }
      }
    ]
  },
  "aluminum_ore": {
    "name": "Aluminum Ore",
    "isBase": true
  },
  "aluminum_nugget": {
    "name": "Aluminum Nugget",
    "isBase": true
  },
  "aluminum_ingot": {
    "name": "Aluminum Ingot",
    "isBase": false,
    "recipes": [
      {
        "id": "aluminum_ingot_from_ore",
        "yield": 1,
        "inputs": {
          "aluminum_ore": 2
        }
      },
      {
        "id": "aluminum_ingot_from_nugget",
        "yield": 1,
        "inputs": {
          "aluminum_nugget": 4
        }
      }
    ]
  },
  "construction_tool": {
    "name": "Construction Tool",
    "isBase": false,
    "recipes": [
      {
        "id": "construction_tool_recipe",
        "yield": 1,
        "inputs": {
          "aluminum_ingot": 1,
          "wire": 1,
          "silicone_gel": 1
        }
      }
    ]
  },
  "steel_ingot": {
    "name": "Steel Ingot",
    "isBase": false,
    "recipes": [
      {
        "id": "steel_ingot_recipe",
        "yield": 3,
        "inputs": {
          "iron_ingot": 4,
          "a_carbon": 4
        }
      }
    ]
  },
  "structural_beam": {
    "name": "Structural Beam",
    "isBase": false,
    "recipes": [
      {
        "id": "structural_beam_recipe",
        "yield": 1,
        "inputs": {
          "steel_ingot": 2
        }
      }
    ]
  },
  "microchip": {
    "name": "Microchip",
    "isBase": false,
    "recipes": [
      {
        "id": "microchip_recipe",
        "yield": 2,
        "inputs": {
          "semicondutor_substrate": 1
        }
      }
    ]
  },
  "drone_dispatcher": {
    "name": "Drone Dispatcher",
    "isBase": false,
    "recipes": [
      {
        "id": "drone_dispatcher_recipe",
        "yield": 1,
        "inputs": {
          "metal_sheet": 1,
          "stainless_plate": 1
        }
      }
    ]
  },
  "drone": {
    "name": "Drone",
    "isBase": false,
    "recipes": [
      {
        "id": "drone_recipe",
        "yield": 1,
        "inputs": {
          "motor": 1,
          "microchip": 1,
          "metal_sheet": 1,
          "nut_and_bolt": 6
        }
      }
    ]
  },
  "landing_pad": {
    "name": "Landing Pad",
    "isBase": false,
    "recipes": [
      {
        "id": "landing_pad_recipe",
        "yield": 1,
        "inputs": {
          "stainless_plate": 8,
          "concrete": 40
        }
      }
    ]
  },
  "warehouse": {
    "name": "Warehouse",
    "isBase": false,
    "recipes": [
      {
        "id": "warehouse_recipe",
        "yield": 1,
        "inputs": {
          "metal_sheet": 50,
          "structural_beam": 4,
          "stainless_plate": 4,
          "concrete": 20
        }
      }
    ]
  },
  "assembler": {
    "name": "Assembler",
    "isBase": false,
    "recipes": [
      {
        "id": "assembler_recipe",
        "yield": 1,
        "inputs": {
          "structural_beam": 4,
          "stainless_plate": 8,
          "concrete": 40,
          "motor": 3
        }
      }
    ]
  },
  "solar_cell": {
    "name": "Solar Cell",
    "isBase": false,
    "recipes": [
      {
        "id": "solar_cell_recipe",
        "yield": 5,
        "inputs": {
          "stainless_plate": 1,
          "semicondutor_substrate": 1,
          "wire": 5
        }
      }
    ]
  },
  "solar_plant": {
    "name": "Solar Plant",
    "isBase": false,
    "recipes": [
      {
        "id": "solar_plant_recipe",
        "yield": 1,
        "inputs": {
          "structural_beam": 1,
          "stainless_plate": 9,
          "solar_cell": 36
        }
      }
    ]
  },
  "micro_furnace": {
    "name": "Micro-Furnace",
    "isBase": false,
    "recipes": [
      {
        "id": "micro_furnace_recipe",
        "yield": 1,
        "inputs": {
          "stainless_plate": 2,
          "concrete": 5
        }
      }
    ]
  }
};




