import type { Item } from '../types';

export const itemsData: Record<string, Item> = {
  "wire": {
    "name": "Wire",
    "isBase": false,
    "basePrice": 2.08,
    "recipes": [
      {
        "id": "wire_from_ingot",
        "yield": 4,
        "inputs": {
          "copper_ingot": 1
        }
      }
    ],
    "weight": 0.5
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
    ],
    "basePrice": 8,
    "weight": 1
  },
  "copper_ore": {
    "name": "Copper Ore",
    "isBase": true,
    "basePrice": 3,
    "weight": 5
  },
  "copper_nugget": {
    "name": "Copper Nugget",
    "isBase": true,
    "basePrice": 1.6,
    "weight": 1
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
    ],
    "basePrice": 5.8,
    "weight": 1
  },
  "iron_ore": {
    "name": "Iron Ore",
    "isBase": true,
    "basePrice": 2.16,
    "weight": 5
  },
  "iron_nugget": {
    "name": "Iron Nugget",
    "isBase": true,
    "basePrice": 1.14,
    "weight": 1
  },
  "quartz": {
    "name": "Quartz",
    "isBase": true,
    "basePrice": 11,
    "weight": 0.5
  },
  "silicone_gel": {
    "name": "Silicone Gel",
    "isBase": false,
    "recipes": [
      {
        "id": "silicone_gel_recipe",
        "yield": 20,
        "inputs": {
          "silicium_ingot": 1
        }
      }
    ],
    "basePrice": 0.52,
    "weight": 0.5
  },
  "motor": {
    "name": "Motor",
    "isBase": false,
    "recipes": [
      {
        "id": "motor_recipe",
        "yield": 1,
        "inputs": {
          "silicone_gel": 5,
          "coil": 5,
          "metal_sheet_1": 1
        }
      }
    ],
    "basePrice": 59,
    "weight": 2
  },
  "concrete": {
    "name": "Concrete",
    "isBase": false,
    "recipes": [
      {
        "id": "concrete_recipe",
        "yield": 5,
        "inputs": {
          "sandstone": 2
        }
      }
    ],
    "basePrice": 0.25,
    "weight": 1
  },
  "sulfur": {
    "name": "Sulfur",
    "isBase": true,
    "basePrice": 0.7,
    "weight": 0.1
  },
  "solar_cell": {
    "name": "Solar Cell",
    "isBase": false,
    "recipes": [
      {
        "id": "solar_cell_recipe",
        "yield": 5,
        "inputs": {
          "wire": 5,
          "plate_1": 1,
          "semiconductor": 1
        }
      }
    ],
    "basePrice": 6.2,
    "weight": 0.5
  },
  "calcite": {
    "name": "Calcite",
    "isBase": true,
    "basePrice": 3.74,
    "weight": 5
  },
  "hematite": {
    "name": "Hematite",
    "isBase": true,
    "basePrice": 7,
    "weight": 0.5
  },
  "carbon": {
    "name": "a-Carbon",
    "isBase": true,
    "basePrice": 1.5,
    "weight": 1
  },
  "graphite_crystal": {
    "name": "Graphite Crystal",
    "isBase": true,
    "basePrice": 9,
    "weight": 0.5
  },
  "diamond": {
    "name": "Diamond",
    "isBase": true,
    "basePrice": 400,
    "weight": 0.5
  },
  "azurite_stone": {
    "name": "Azurite Stone",
    "isBase": true,
    "basePrice": 45,
    "weight": 0.5
  },
  "malachite_stone": {
    "name": "Malachite Stone",
    "isBase": true,
    "basePrice": 40,
    "weight": 0.5
  },
  "zirconium_ore": {
    "name": "Zirconium Ore",
    "isBase": true,
    "basePrice": 10.5,
    "weight": 5
  },
  "zirconium_nugget": {
    "name": "Zirconium Nugget",
    "isBase": true,
    "basePrice": 5.6,
    "weight": 1
  },
  "sandstone": {
    "name": "Silicate",
    "isBase": true,
    "basePrice": 0.62,
    "weight": 5
  },
  "kaolinite": {
    "name": "Kaolinite",
    "isBase": true,
    "basePrice": 5,
    "weight": 1
  },
  "quartz_shavings": {
    "name": "Quartz Powder",
    "isBase": true,
    "basePrice": 0.37,
    "weight": 0.1
  },
  "titanium_ore": {
    "name": "Titanium Ore",
    "isBase": true,
    "basePrice": 3.36,
    "weight": 5
  },
  "titanium_nugget": {
    "name": "Titanium Nugget",
    "isBase": true,
    "basePrice": 1.8,
    "weight": 1
  },
  "aluminium_ore": {
    "name": "Aluminum Ore",
    "isBase": true,
    "basePrice": 3.58,
    "weight": 5
  },
  "aluminium_nugget": {
    "name": "Aluminum Nugget",
    "isBase": true,
    "basePrice": 1.92,
    "weight": 1
  },
  "turquoise": {
    "name": "Turquoise",
    "isBase": true,
    "basePrice": 15,
    "weight": 1
  },
  "aquamarine": {
    "name": "Aquamarine",
    "isBase": true,
    "basePrice": 12,
    "weight": 0.5
  },
  "emerald": {
    "name": "Emerald",
    "isBase": true,
    "basePrice": 130,
    "weight": 0.5
  },
  "pyrite": {
    "name": "Pyrite",
    "isBase": true,
    "basePrice": 10,
    "weight": 0.5
  },
  "cinnabar": {
    "name": "Cinnabar",
    "isBase": true,
    "basePrice": 21.4,
    "weight": 1
  },
  "vanadium_ore": {
    "name": "Vanadium Ore",
    "isBase": true,
    "basePrice": 5.6,
    "weight": 5
  },
  "silver_nugget": {
    "name": "Silver Nugget",
    "isBase": true,
    "basePrice": 4,
    "weight": 1
  },
  "platinum_ore": {
    "name": "Platinum Ore",
    "isBase": true,
    "basePrice": 6,
    "weight": 5
  },
  "platinum_nugget": {
    "name": "Platinum Nugget",
    "isBase": true,
    "basePrice": 3.2,
    "weight": 1
  },
  "tungsten_ore": {
    "name": "Tungsten Ore",
    "isBase": true,
    "basePrice": 6,
    "weight": 5
  },
  "tungsten_nugget": {
    "name": "Tungsten Nugget",
    "isBase": true,
    "basePrice": 3.2,
    "weight": 1
  },
  "uranium_nugget": {
    "name": "Uranium Nugget",
    "isBase": true,
    "basePrice": 1,
    "weight": 1
  },
  "elmerium_nugget": {
    "name": "Elmerium Nugget",
    "isBase": true,
    "basePrice": 5.3,
    "weight": 1
  },
  "elmerium_shavings": {
    "name": "Elmerium Dust",
    "isBase": false,
    "basePrice": 0.3,
    "recipes": [
      {
        "id": "elmerium_shavings_recipe",
        "yield": 15,
        "inputs": {
          "rockwood_dreamwood_fruit": 1
        }
      }
    ],
    "weight": 0.1
  },
  "low_crystal": {
    "name": "Cloudy Gemstone",
    "isBase": true,
    "basePrice": 3,
    "weight": 0.1
  },
  "crystal": {
    "name": "Fair Gemstone",
    "isBase": true,
    "basePrice": 10,
    "weight": 0.1
  },
  "big_crystal": {
    "name": "Beautiful Gemstone",
    "isBase": true,
    "basePrice": 35,
    "weight": 0.1
  },
  "hudge_crystal": {
    "name": "Marvelous Gemstone",
    "isBase": true,
    "basePrice": 100,
    "weight": 0.1
  },
  "turquoise_bead": {
    "name": "Turquoise Bead",
    "isBase": true,
    "basePrice": 5,
    "weight": 0.1
  },
  "calcified_invariant": {
    "name": "Calcified Invariant",
    "isBase": true,
    "basePrice": 100,
    "weight": 2
  },
  "space_wheat_seed": {
    "name": "Spacekorn Seed",
    "isBase": false,
    "recipes": [
      {
        "id": "space_wheat_seed_recipe",
        "yield": 1,
        "inputs": {
          "space_wheat_wooly_korn": 1
        }
      }
    ],
    "weight": 0.1
  },
  "space_wheat_plain_pulp": {
    "name": "Plain Pulp",
    "isBase": true,
    "basePrice": 4,
    "weight": 1
  },
  "space_wheat_sour_pulp": {
    "name": "Sour Pulp",
    "isBase": true,
    "basePrice": 12,
    "weight": 1
  },
  "space_wheat_wooly_korn": {
    "name": "Wooly Korn",
    "isBase": true,
    "weight": 0.1
  },
  "space_wheat_frost_pulp": {
    "name": "Frost Pulp",
    "isBase": true,
    "basePrice": 7.6,
    "weight": 1
  },
  "rockwood_seed": {
    "name": "Rockwood Nut",
    "isBase": true,
    "weight": 0.1
  },
  "rockwood_dreamwood_fruit": {
    "name": "Dream Sporule",
    "isBase": true,
    "basePrice": 5.5,
    "weight": 0.1
  },
  "rockwood_glowwood_fruit": {
    "name": "Glowing Nodule",
    "isBase": true,
    "weight": 0.1
  },
  "rockwood_glowwood_bark": {
    "name": "Rough Bark",
    "isBase": true,
    "weight": 1
  },
  "water": {
    "name": "Water",
    "isBase": false,
    "basePrice": 0.4,
    "recipes": [
      {
        "id": "water_recipe",
        "yield": 1,
        "inputs": {
          "water_brine": 1
        }
      }
    ],
    "weight": 1
  },
  "water_brine": {
    "name": "Brine Water",
    "isBase": true,
    "basePrice": 0.3,
    "weight": 1
  },
  "water_waste": {
    "name": "Polluted Water",
    "isBase": true,
    "basePrice": 0.2,
    "weight": 1
  },
  "ethanol": {
    "name": "Ethanol",
    "isBase": false,
    "basePrice": 2.5,
    "recipes": [
      {
        "id": "ethanol_recipe",
        "yield": 6,
        "inputs": {
          "space_wheat_sour_pulp": 1
        }
      }
    ],
    "weight": 1
  },
  "xenic_oil": {
    "name": "Xenic Oil",
    "isBase": false,
    "basePrice": 16,
    "recipes": [
      {
        "id": "xenic_oil_recipe",
        "yield": 1,
        "inputs": {
          "space_wheat_seed": 1
        }
      }
    ],
    "weight": 1
  },
  "thermal_paste": {
    "name": "Thermal Paste",
    "isBase": false,
    "basePrice": 3,
    "recipes": [
      {
        "id": "thermal_paste_recipe",
        "yield": 4,
        "inputs": {
          "space_wheat_frost_pulp": 1,
          "water": 5
        }
      }
    ],
    "weight": 1
  },
  "mercury": {
    "name": "Mercury",
    "isBase": false,
    "basePrice": 6,
    "recipes": [
      {
        "id": "mercury_recipe",
        "yield": 1,
        "inputs": {
          "water_brine": 40
        }
      }
    ],
    "weight": 1
  },
  "vitriol": {
    "name": "Sulphuric Acid",
    "isBase": false,
    "basePrice": 0.54,
    "recipes": [
      {
        "id": "vitriol_recipe",
        "yield": 2,
        "inputs": {
          "water": 1,
          "sulfur": 1
        }
      }
    ],
    "weight": 1
  },
  "helium": {
    "name": "Helium",
    "isBase": true,
    "weight": 1
  },
  "radon": {
    "name": "Radon",
    "isBase": true,
    "weight": 1
  },
  "ftoi_l": {
    "name": "Mag-Plasma",
    "isBase": true,
    "basePrice": 0.2,
    "weight": 1
  },
  "bottle_empty": {
    "name": "Stainless Bottle",
    "isBase": false,
    "basePrice": 34,
    "recipes": [
      {
        "id": "bottle_empty_recipe",
        "yield": 1,
        "inputs": {
          "plate_1": 2,
          "silicone_gel": 4
        }
      }
    ],
    "weight": 5
  },
  "bottle_water": {
    "name": "Water Bottle",
    "isBase": false,
    "basePrice": 38,
    "recipes": [
      {
        "id": "bottle_water_recipe",
        "yield": 1,
        "inputs": {
          "bottle_empty": 1,
          "water": 10
        }
      }
    ],
    "weight": 5
  },
  "bottle_water_brine": {
    "name": "Brine Water Bottle",
    "isBase": false,
    "basePrice": 37,
    "recipes": [
      {
        "id": "bottle_water_brine_recipe",
        "yield": 1,
        "inputs": {
          "bottle_empty": 1,
          "water_brine": 10
        }
      }
    ],
    "weight": 5
  },
  "bottle_ethanol": {
    "name": "Ethanol Bottle",
    "isBase": false,
    "basePrice": 59,
    "recipes": [
      {
        "id": "bottle_ethanol_recipe",
        "yield": 1,
        "inputs": {
          "bottle_empty": 1,
          "ethanol": 10
        }
      }
    ],
    "weight": 5
  },
  "bottle_xenic_oil": {
    "name": "Xenic Oil Bottle",
    "isBase": false,
    "basePrice": 194,
    "recipes": [
      {
        "id": "bottle_xenic_oil_recipe",
        "yield": 1,
        "inputs": {
          "bottle_empty": 1,
          "xenic_oil": 10
        }
      }
    ],
    "weight": 5
  },
  "bottle_thermal_paste": {
    "name": "Thermal Paste Bottle",
    "isBase": false,
    "basePrice": 64,
    "recipes": [
      {
        "id": "bottle_thermal_paste_recipe",
        "yield": 1,
        "inputs": {
          "bottle_empty": 1,
          "thermal_paste": 10
        }
      }
    ],
    "weight": 5
  },
  "bottle_vitriol": {
    "name": "Sulphuric Acid Bottle",
    "isBase": false,
    "basePrice": 39.4,
    "recipes": [
      {
        "id": "bottle_vitriol_recipe",
        "yield": 1,
        "inputs": {
          "bottle_empty": 1,
          "vitriol": 10
        }
      }
    ],
    "weight": 5
  },
  "bottle_mercury": {
    "name": "Mercury Bottle",
    "isBase": false,
    "basePrice": 94,
    "recipes": [
      {
        "id": "bottle_mercury_recipe",
        "yield": 1,
        "inputs": {
          "bottle_empty": 1,
          "mercury": 10
        }
      }
    ],
    "weight": 5
  },
  "bottle_plasma_empty": {
    "name": "Confinement Bottle",
    "isBase": false,
    "basePrice": 387,
    "recipes": [
      {
        "id": "bottle_plasma_empty_recipe",
        "yield": 1,
        "inputs": {
          "plate_1": 10,
          "magnetic_chamber": 1
        }
      }
    ],
    "weight": 25
  },
  "bottle_plasma_ftoi_l": {
    "name": "Mag-Plasma Bottle",
    "isBase": true,
    "basePrice": 397,
    "weight": 25
  },
  "graphene": {
    "name": "Graphene",
    "isBase": false,
    "basePrice": 2.34,
    "recipes": [
      {
        "id": "graphene_recipe",
        "yield": 4,
        "inputs": {
          "graphite_crystal": 1
        }
      }
    ],
    "weight": 0.1
  },
  "zirconium_ingot": {
    "name": "Zirconium Ingot",
    "isBase": false,
    "basePrice": 28,
    "recipes": [
      {
        "id": "zirconium_ingot_recipe",
        "yield": 1,
        "inputs": {
          "zirconium_ore": 2
        }
      }
    ],
    "weight": 1
  },
  "titanium_ingot": {
    "name": "Titanium Ingot",
    "isBase": false,
    "basePrice": 9,
    "recipes": [
      {
        "id": "titanium_ingot_recipe",
        "yield": 1,
        "inputs": {
          "titanium_ore": 2
        }
      },
      {
        "id": "titanium_ingot_from_nugget",
        "yield": 1,
        "inputs": {
          "titanium_nugget": 4
        }
      }
    ],
    "weight": 1
  },
  "silicium_ingot": {
    "name": "Silicon Ingot",
    "isBase": false,
    "basePrice": 10,
    "recipes": [
      {
        "id": "silicium_ingot_recipe",
        "yield": 2,
        "inputs": {
          "aquamarine": 3
        }
      },
      {
        "id": "silicium_ingot_from_quartz",
        "yield": 1,
        "inputs": {
          "quartz": 1
        }
      }
    ],
    "weight": 1
  },
  "aluminium_ingot": {
    "name": "Aluminum Ingot",
    "isBase": false,
    "basePrice": 9.6,
    "recipes": [
      {
        "id": "aluminium_ingot_recipe",
        "yield": 1,
        "inputs": {
          "aluminium_ore": 2
        }
      },
      {
        "id": "aluminium_ingot_from_nugget",
        "yield": 1,
        "inputs": {
          "aluminium_nugget": 4
        }
      }
    ],
    "weight": 1
  },
  "vanadium_ingot": {
    "name": "Vanadium Ingot",
    "isBase": false,
    "basePrice": 15,
    "recipes": [
      {
        "id": "vanadium_ingot_recipe",
        "yield": 1,
        "inputs": {
          "vanadium_ore": 2
        }
      }
    ],
    "weight": 1
  },
  "silver_ingot": {
    "name": "Silver Ingot",
    "isBase": false,
    "basePrice": 20,
    "recipes": [
      {
        "id": "silver_ingot_recipe",
        "yield": 1,
        "inputs": {
          "silver_nugget": 4
        }
      }
    ],
    "weight": 1
  },
  "platinum_ingot": {
    "name": "Platinum Ingot",
    "isBase": false,
    "basePrice": 16,
    "recipes": [
      {
        "id": "platinum_ingot_recipe",
        "yield": 1,
        "inputs": {
          "platinum_ore": 2
        }
      }
    ],
    "weight": 1
  },
  "tungsten_ingot": {
    "name": "Tungsten Ingot",
    "isBase": false,
    "basePrice": 16,
    "recipes": [
      {
        "id": "tungsten_ingot_recipe",
        "yield": 1,
        "inputs": {
          "tungsten_ore": 2
        }
      }
    ],
    "weight": 1
  },
  "steel": {
    "name": "Steel Ingot",
    "isBase": false,
    "basePrice": 10.5,
    "recipes": [
      {
        "id": "steel_recipe",
        "yield": 3,
        "inputs": {
          "iron_ingot": 4,
          "carbon": 4
        }
      }
    ],
    "weight": 1
  },
  "alu_k": {
    "name": "Alu-K Ingot",
    "isBase": false,
    "basePrice": 12.1,
    "recipes": [
      {
        "id": "alu_k_recipe",
        "yield": 3,
        "inputs": {
          "aluminium_ingot": 3,
          "kaolinite": 1
        }
      }
    ],
    "weight": 1
  },
  "btitanium": {
    "name": "B-Titanium Ingot",
    "isBase": false,
    "basePrice": 18.3,
    "recipes": [
      {
        "id": "btitanium_recipe",
        "yield": 3,
        "inputs": {
          "titanium_ingot": 4,
          "vanadium_ingot": 1
        }
      }
    ],
    "weight": 1
  },
  "levinium": {
    "name": "Levinium Ingot",
    "isBase": false,
    "basePrice": 47.6,
    "recipes": [
      {
        "id": "levinium_recipe",
        "yield": 3,
        "inputs": {
          "mercury": 15,
          "aluminium_ingot": 2,
          "titanium_ingot": 2
        }
      }
    ],
    "weight": 1
  },
  "unbendinium": {
    "name": "Unbendinium Ingot",
    "isBase": false,
    "basePrice": 25.8,
    "recipes": [
      {
        "id": "unbendinium_recipe",
        "yield": 6,
        "inputs": {
          "platinum_ingot": 4,
          "tungsten_ingot": 4,
          "silicium_ingot": 1
        }
      }
    ],
    "weight": 1
  },
  "elmerium": {
    "name": "Elmerium Core",
    "isBase": false,
    "basePrice": 20,
    "recipes": [
      {
        "id": "elmerium_recipe",
        "yield": 1,
        "inputs": {
          "elmerium_nugget": 3
        }
      }
    ],
    "weight": 1
  },
  "pipe_1": {
    "name": "Watertight Pipe",
    "isBase": false,
    "basePrice": 4.16,
    "recipes": [
      {
        "id": "pipe_1_recipe",
        "yield": 2,
        "inputs": {
          "copper_ingot": 1
        }
      }
    ],
    "weight": 1
  },
  "pipe_2": {
    "name": "Pressure-tight Pipe",
    "isBase": true,
    "basePrice": 12.9,
    "weight": 1
  },
  "coil": {
    "name": "Magnetic Coil",
    "isBase": false,
    "basePrice": 9.5,
    "recipes": [
      {
        "id": "coil_recipe",
        "yield": 2,
        "inputs": {
          "wire": 5,
          "iron_ingot": 1,
          "metal_bolt": 1
        }
      }
    ],
    "weight": 1
  },
  "pump": {
    "name": "Pump",
    "isBase": false,
    "basePrice": 102,
    "recipes": [
      {
        "id": "pump_recipe",
        "yield": 1,
        "inputs": {
          "motor": 1,
          "pipe_1": 2,
          "metal_sheet_2": 3
        }
      }
    ],
    "weight": 2
  },
  "actuator": {
    "name": "Hydraulic Actuator",
    "isBase": false,
    "basePrice": 970,
    "recipes": [
      {
        "id": "actuator_recipe",
        "yield": 1,
        "inputs": {
          "xenic_oil": 50,
          "pipe_1": 5,
          "plate_1": 3
        }
      }
    ],
    "weight": 2
  },
  "elmerium_engine": {
    "name": "Elmerium Engine",
    "isBase": false,
    "basePrice": 214,
    "recipes": [
      {
        "id": "elmerium_engine_recipe",
        "yield": 1,
        "inputs": {
          "metal_sheet_1": 6,
          "coil": 14,
          "elmerium": 2
        }
      }
    ],
    "weight": 2
  },
  "focuser": {
    "name": "Crystalline Focuser",
    "isBase": false,
    "basePrice": 23.1,
    "recipes": [
      {
        "id": "focuser_recipe",
        "yield": 1,
        "inputs": {
          "quartz": 1,
          "wire": 5
        }
      },
      {
        "id": "focuser_from_h_crystal",
        "yield": 1,
        "inputs": {
          "crystal_lattice_h": 9,
          "wire": 3
        }
      },
      {
        "id": "focuser_from_m_crystal",
        "yield": 2,
        "inputs": {
          "crystal_lattice_m": 6,
          "wire": 6
        }
      }
    ],
    "weight": 1
  },
  "focuser_2": {
    "name": "Hyper Lens",
    "isBase": false,
    "basePrice": 179,
    "recipes": [
      {
        "id": "focuser_2_recipe",
        "yield": 1,
        "inputs": {
          "focuser": 3,
          "silicium_ingot": 6,
          "crystal_lattice_h": 12,
          "crystal_lattice_m": 4,
          "crystal_lattice_c": 3
        }
      }
    ],
    "weight": 1
  },
  "focuser_3": {
    "name": "Ciliary Lens",
    "isBase": false,
    "basePrice": 2840,
    "recipes": [
      {
        "id": "focuser_3_recipe",
        "yield": 1,
        "inputs": {
          "focuser_2": 5,
          "xenic_oil": 80,
          "graphene": 150
        }
      }
    ],
    "weight": 1
  },
  "graphenoid": {
    "name": "Quantic Graphenoid",
    "isBase": false,
    "basePrice": 296,
    "recipes": [
      {
        "id": "graphenoid_recipe",
        "yield": 1,
        "inputs": {
          "graphene": 40,
          "crystal_lattice_h": 15,
          "crystal_lattice_m": 35,
          "crystal_lattice_c": 50
        }
      }
    ],
    "weight": 1
  },
  "alternator": {
    "name": "Hall Alternator",
    "isBase": false,
    "basePrice": 50,
    "recipes": [
      {
        "id": "alternator_recipe",
        "yield": 1,
        "inputs": {
          "semiconductor": 3,
          "coil": 3,
          "metal_sheet_1": 3
        }
      }
    ],
    "weight": 1
  },
  "grating": {
    "name": "Diffraction Grating",
    "isBase": false,
    "basePrice": 6.3,
    "recipes": [
      {
        "id": "grating_recipe",
        "yield": 5,
        "inputs": {
          "silicium_ingot": 1,
          "aluminium_ingot": 2
        }
      }
    ],
    "weight": 1
  },
  "magnetic_chamber": {
    "name": "Confinement Chamber",
    "isBase": false,
    "basePrice": 211,
    "recipes": [
      {
        "id": "magnetic_chamber_recipe",
        "yield": 1,
        "inputs": {
          "coil": 4,
          "mag_sheet": 15
        }
      }
    ],
    "weight": 5
  },
  "metal_bolt": {
    "name": "Nut and Bolt",
    "isBase": false,
    "basePrice": 0.74,
    "recipes": [
      {
        "id": "metal_bolt_recipe",
        "yield": 8,
        "inputs": {
          "iron_ingot": 1
        }
      }
    ],
    "weight": 0.1
  },
  "metal_sheet_1": {
    "name": "Metal Sheet",
    "isBase": false,
    "basePrice": 3,
    "recipes": [
      {
        "id": "metal_sheet_1_recipe",
        "yield": 2,
        "inputs": {
          "iron_ingot": 1
        }
      },
      {
        "id": "metal_sheet_1_from_iron_ingot",
        "yield": 1,
        "inputs": {
          "iron_ingot": 1
        }
      }
    ],
    "weight": 1
  },
  "metal_sheet_2": {
    "name": "Strong Metal Sheet",
    "isBase": false,
    "basePrice": 8,
    "recipes": [
      {
        "id": "metal_sheet_2_recipe",
        "yield": 2,
        "inputs": {
          "titanium_ingot": 1,
          "iron_ingot": 1
        }
      }
    ],
    "weight": 1
  },
  "metal_sheet_3": {
    "name": "High-Grade Metal Sheet",
    "isBase": false,
    "basePrice": 20.2,
    "recipes": [
      {
        "id": "metal_sheet_3_recipe",
        "yield": 2,
        "inputs": {
          "unbendinium": 1,
          "iron_ingot": 2
        }
      }
    ],
    "weight": 1
  },
  "mag_sheet": {
    "name": "Monomagnetic Sheet",
    "isBase": false,
    "basePrice": 10.5,
    "recipes": [
      {
        "id": "mag_sheet_recipe",
        "yield": 3,
        "inputs": {
          "iron_ingot": 1,
          "graphene": 1,
          "elmerium": 1
        }
      }
    ],
    "weight": 1
  },
  "thermal_sheet": {
    "name": "Thermal Sheet",
    "isBase": false,
    "basePrice": 6.2,
    "recipes": [
      {
        "id": "thermal_sheet_recipe",
        "yield": 2,
        "inputs": {
          "alu_k": 1
        }
      }
    ],
    "weight": 1
  },
  "plate_1": {
    "name": "Stainless Plate",
    "isBase": false,
    "basePrice": 14.7,
    "recipes": [
      {
        "id": "plate_1_recipe",
        "yield": 2,
        "inputs": {
          "aluminium_ingot": 2,
          "copper_ingot": 1
        }
      },
      {
        "id": "plate_1_from_copper_ingot_and_aluminium_ingot",
        "yield": 1,
        "inputs": {
          "copper_ingot": 1,
          "aluminium_ingot": 2
        }
      }
    ],
    "weight": 2
  },
  "plate_2": {
    "name": "Inert Plate",
    "isBase": false,
    "basePrice": 38,
    "recipes": [
      {
        "id": "plate_2_recipe",
        "yield": 1,
        "inputs": {
          "btitanium": 2
        }
      }
    ],
    "weight": 2
  },
  "plate_light": {
    "name": "Very Light Plate",
    "isBase": false,
    "basePrice": 99,
    "recipes": [
      {
        "id": "plate_light_recipe",
        "yield": 1,
        "inputs": {
          "levinium": 2
        }
      }
    ],
    "weight": 2
  },
  "beam_1": {
    "name": "Structural Beam",
    "isBase": false,
    "basePrice": 21.8,
    "recipes": [
      {
        "id": "beam_1_recipe",
        "yield": 1,
        "inputs": {
          "steel": 2
        }
      }
    ],
    "weight": 2
  },
  "beam_2": {
    "name": "Heavy-Duty Beam",
    "isBase": false,
    "basePrice": 50,
    "recipes": [
      {
        "id": "beam_2_recipe",
        "yield": 1,
        "inputs": {
          "btitanium": 2,
          "steel": 1
        }
      }
    ],
    "weight": 2
  },
  "beam_3": {
    "name": "Unbending Beam",
    "isBase": false,
    "basePrice": 106,
    "recipes": [
      {
        "id": "beam_3_recipe",
        "yield": 1,
        "inputs": {
          "unbendinium": 3,
          "steel": 2
        }
      }
    ],
    "weight": 2
  },
  "semiconductor": {
    "name": "Semiconductor Substrate",
    "isBase": false,
    "basePrice": 2.6,
    "recipes": [
      {
        "id": "semiconductor_recipe",
        "yield": 4,
        "inputs": {
          "silicium_ingot": 1
        }
      }
    ],
    "weight": 0.5
  },
  "micro_chip": {
    "name": "Microchip",
    "isBase": false,
    "basePrice": 1.34,
    "recipes": [
      {
        "id": "micro_chip_recipe",
        "yield": 2,
        "inputs": {
          "semiconductor": 1
        }
      }
    ],
    "weight": 0.5
  },
  "gunpowder": {
    "name": "Solid Explosive",
    "isBase": false,
    "basePrice": 1.4,
    "recipes": [
      {
        "id": "gunpowder_recipe",
        "yield": 5,
        "inputs": {
          "sulfur": 5,
          "carbon": 2
        }
      },
      {
        "id": "gunpowder_from_sulfur_and_carbon",
        "yield": 1,
        "inputs": {
          "sulfur": 5,
          "carbon": 2
        }
      }
    ],
    "weight": 0.5
  },
  "alu_powder": {
    "name": "Aluminum Powder",
    "isBase": true,
    "basePrice": 0.5,
    "weight": 0.1
  },
  "fertilizer_neutral": {
    "name": "Neutral Fertilizer",
    "isBase": false,
    "basePrice": 1.36,
    "recipes": [
      {
        "id": "fertilizer_neutral_recipe",
        "yield": 10,
        "inputs": {
          "vitriol": 5,
          "lime": 10
        }
      }
    ],
    "weight": 0.1
  },
  "fertilizer_acidic": {
    "name": "Acidic Fertilizer",
    "isBase": false,
    "basePrice": 1.36,
    "recipes": [
      {
        "id": "fertilizer_acidic_recipe",
        "yield": 10,
        "inputs": {
          "vitriol": 5,
          "protein": 10
        }
      }
    ],
    "weight": 0.1
  },
  "fertilizer_carbonic": {
    "name": "Carbonic Fertilizer",
    "isBase": false,
    "basePrice": 1.5,
    "recipes": [
      {
        "id": "fertilizer_carbonic_recipe",
        "yield": 10,
        "inputs": {
          "water": 5,
          "carbon": 1,
          "protein": 10
        }
      }
    ],
    "weight": 0.1
  },
  "fertilizer_metallic": {
    "name": "Metallic Fertilizer",
    "isBase": false,
    "basePrice": 1.94,
    "recipes": [
      {
        "id": "fertilizer_metallic_recipe",
        "yield": 10,
        "inputs": {
          "water": 5,
          "iron_ingot": 1,
          "aluminium_ingot": 1
        }
      }
    ],
    "weight": 0.1
  },
  "activated_coal": {
    "name": "Activated Charcoal",
    "isBase": false,
    "basePrice": 3.78,
    "recipes": [
      {
        "id": "activated_coal_recipe",
        "yield": 1,
        "inputs": {
          "lime": 2,
          "carbon": 1
        }
      }
    ],
    "weight": 0.5
  },
  "carbonic_fuel": {
    "name": "Carbonic Superfuel",
    "isBase": false,
    "basePrice": 0.72,
    "recipes": [
      {
        "id": "carbonic_fuel_recipe",
        "yield": 28,
        "inputs": {
          "carbon": 10,
          "water": 10
        }
      }
    ],
    "weight": 0.1
  },
  "battery": {
    "name": "Chemical Battery",
    "isBase": false,
    "basePrice": 57,
    "recipes": [
      {
        "id": "battery_recipe",
        "yield": 1,
        "inputs": {
          "vitriol": 20,
          "plate_1": 1,
          "graphite_crystal": 1,
          "vanadium_ingot": 1
        }
      }
    ],
    "weight": 2
  },
  "thermal_isolant": {
    "name": "Thermal Wool",
    "isBase": false,
    "basePrice": 1.72,
    "recipes": [
      {
        "id": "thermal_isolant_recipe",
        "yield": 3,
        "inputs": {
          "kaolinite": 1
        }
      }
    ],
    "weight": 0.5
  },
  "antimatter_empty": {
    "name": "Antimatter Core (empty)",
    "isBase": true,
    "basePrice": 19.7,
    "weight": 2
  },
  "antimatter_full": {
    "name": "Antimatter Core (full)",
    "isBase": true,
    "basePrice": 20.4,
    "weight": 2
  },
  "missile_airframe_small": {
    "name": "Small Missile Airframe",
    "isBase": false,
    "basePrice": 1.42,
    "recipes": [
      {
        "id": "missile_airframe_small_recipe",
        "yield": 5,
        "inputs": {
          "metal_sheet_1": 1,
          "silicone_gel": 1,
          "gunpowder": 2
        }
      }
    ],
    "weight": 0.1
  },
  "protein": {
    "name": "Xenic Protein",
    "isBase": false,
    "basePrice": 1,
    "recipes": [
      {
        "id": "protein_recipe",
        "yield": 3,
        "inputs": {
          "space_wheat_plain_pulp": 1
        }
      }
    ],
    "weight": 0.1
  },
  "lime": {
    "name": "Lime",
    "isBase": false,
    "basePrice": 1,
    "recipes": [
      {
        "id": "lime_recipe",
        "yield": 5,
        "inputs": {
          "calcite": 1
        }
      }
    ],
    "weight": 0.1
  },
  "crystal_lattice_m": {
    "name": "m-Crystal Matrix",
    "isBase": false,
    "basePrice": 1.5,
    "recipes": [
      {
        "id": "crystal_lattice_m_recipe",
        "yield": 18,
        "inputs": {
          "azurite_stone": 1
        }
      },
      {
        "id": "crystal_lattice_m_from_malachite",
        "yield": 16,
        "inputs": {
          "malachite_stone": 1
        }
      }
    ],
    "weight": 0.1
  },
  "crystal_lattice_h": {
    "name": "h-Crystal Matrix",
    "isBase": false,
    "basePrice": 0.5,
    "recipes": [
      {
        "id": "crystal_lattice_h_recipe",
        "yield": 12,
        "inputs": {
          "aquamarine": 1
        }
      }
    ],
    "weight": 0.1
  },
  "crystal_lattice_c": {
    "name": "c-Crystal Matrix",
    "isBase": false,
    "basePrice": 2,
    "recipes": [
      {
        "id": "crystal_lattice_c_recipe",
        "yield": 130,
        "inputs": {
          "diamond": 1
        }
      },
      {
        "id": "crystal_lattice_c_from_pyrite",
        "yield": 3,
        "inputs": {
          "pyrite": 1
        }
      }
    ],
    "weight": 0.1
  },
  "steel_scraps": {
    "name": "Steel Scraps",
    "isBase": true,
    "basePrice": 7.8,
    "weight": 5
  },
  "alu_scraps": {
    "name": "Aluminum Scraps",
    "isBase": true,
    "basePrice": 7.2,
    "weight": 5
  },
  "iron_scraps": {
    "name": "Iron Scraps",
    "isBase": true,
    "basePrice": 4.34,
    "weight": 5
  },
  "titanium_scraps": {
    "name": "Titanium Scraps",
    "isBase": true,
    "basePrice": 6.7,
    "weight": 5
  },
  "building_scraps": {
    "name": "Industrial Rubble",
    "isBase": true,
    "basePrice": 5.3,
    "weight": 5
  },
  "system_scraps": {
    "name": "Huge Electronics Scraps",
    "isBase": true,
    "basePrice": 8.1,
    "weight": 5
  },
  "steel_hull_scraps": {
    "name": "Wrecked Hull",
    "isBase": true,
    "basePrice": 7.8,
    "weight": 5
  },
  "module_casing_1": {
    "name": "Small Module Kit",
    "isBase": false,
    "basePrice": 38.5,
    "recipes": [
      {
        "id": "module_casing_1_recipe",
        "yield": 1,
        "inputs": {
          "metal_bolt": 20,
          "wire": 10
        }
      }
    ],
    "weight": 10
  },
  "module_casing_2": {
    "name": "Module Kit",
    "isBase": false,
    "basePrice": 405,
    "recipes": [
      {
        "id": "module_casing_2_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_1": 4,
          "graphene": 20,
          "metal_sheet_2": 20
        }
      }
    ],
    "weight": 25
  },
  "module_casing_3": {
    "name": "Large Module Kit",
    "isBase": false,
    "basePrice": 9800,
    "recipes": [
      {
        "id": "module_casing_3_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_2": 10,
          "actuator": 4,
          "metal_sheet_3": 40
        }
      }
    ],
    "weight": 50
  },
  "support_casing": {
    "name": "Support Hardware",
    "isBase": false,
    "basePrice": 28.4,
    "recipes": [
      {
        "id": "support_casing_recipe",
        "yield": 1,
        "inputs": {
          "wire": 12,
          "micro_chip": 1
        }
      }
    ],
    "weight": 10
  },
  "steel_casing_mk_1": {
    "name": "Small Steel Part Casing",
    "isBase": false,
    "basePrice": 346,
    "recipes": [
      {
        "id": "steel_casing_mk_1_recipe",
        "yield": 1,
        "inputs": {
          "beam_1": 6,
          "plate_1": 4
        }
      }
    ],
    "weight": 10
  },
  "titanium_casing_mk_1": {
    "name": "Small Titanium Part Casing",
    "isBase": false,
    "basePrice": 810,
    "recipes": [
      {
        "id": "titanium_casing_mk_1_recipe",
        "yield": 1,
        "inputs": {
          "beam_2": 8,
          "plate_2": 4
        }
      }
    ],
    "weight": 10
  },
  "titanium_casing_mk_2": {
    "name": "Titanium Part Casing",
    "isBase": false,
    "basePrice": 4150,
    "recipes": [
      {
        "id": "titanium_casing_mk_2_recipe",
        "yield": 1,
        "inputs": {
          "titanium_casing_mk_1": 4,
          "beam_2": 12
        }
      }
    ],
    "weight": 25
  },
  "platinum_casing_mk_1": {
    "name": "Small Solid Frame Casing",
    "isBase": false,
    "basePrice": 1540,
    "recipes": [
      {
        "id": "platinum_casing_mk_1_recipe",
        "yield": 1,
        "inputs": {
          "beam_3": 12,
          "plate_2": 4
        }
      }
    ],
    "weight": 10
  },
  "platinum_casing_mk_2": {
    "name": "Solid Frame Casing",
    "isBase": false,
    "basePrice": 8000,
    "recipes": [
      {
        "id": "platinum_casing_mk_2_recipe",
        "yield": 1,
        "inputs": {
          "platinum_casing_mk_1": 4,
          "beam_3": 12
        }
      }
    ],
    "weight": 25
  },
  "levinium_casing_mk_1": {
    "name": "Small Levinium Part Casing",
    "isBase": false,
    "basePrice": 1660,
    "recipes": [
      {
        "id": "levinium_casing_mk_1_recipe",
        "yield": 1,
        "inputs": {
          "beam_2": 1,
          "plate_light": 15
        }
      }
    ],
    "weight": 10
  },
  "alloy_xcasing_mk_1": {
    "name": "Small Alloy X Part Casing",
    "isBase": true,
    "weight": 10
  },
  "alloy_xcasing_mk_2": {
    "name": "Alloy X Part Casing",
    "isBase": false,
    "recipes": [
      {
        "id": "alloy_xcasing_mk_2_recipe",
        "yield": 1,
        "inputs": {
          "alloy_xcasing_mk_1": 2
        }
      }
    ],
    "weight": 25
  },
  "control_base_kit": {
    "name": "Base Deploy Kit",
    "isBase": false,
    "basePrice": 322,
    "recipes": [
      {
        "id": "control_base_kit_recipe",
        "yield": 1,
        "inputs": {
          "control_base_core": 1,
          "plate_1": 4,
          "metal_sheet_1": 20,
          "wire": 20,
          "concrete": 20
        }
      }
    ],
    "weight": 10
  },
  "control_base_core": {
    "name": "Base Core Drive",
    "isBase": true,
    "basePrice": 100,
    "weight": 5
  },
  "hull_mk_1_004": {
    "name": "Steel 4x3x1",
    "isBase": false,
    "basePrice": 800,
    "recipes": [
      {
        "id": "hull_mk_1_004_recipe",
        "yield": 1,
        "inputs": {
          "steel_casing_mk_1": 2,
          "support_casing": 2
        }
      }
    ],
    "weight": 20
  },
  "wing_01": {
    "name": "\"Nimbus\" Spoiler",
    "isBase": false,
    "basePrice": 202,
    "recipes": [
      {
        "id": "wing_01_recipe",
        "yield": 2,
        "inputs": {
          "steel_casing_mk_1": 1,
          "support_casing": 1
        }
      }
    ],
    "weight": 5
  },
  "wing_02": {
    "name": "\"Catfin\" Spoiler",
    "isBase": false,
    "basePrice": 202,
    "recipes": [
      {
        "id": "wing_02_recipe",
        "yield": 2,
        "inputs": {
          "steel_casing_mk_1": 1,
          "support_casing": 1
        }
      }
    ],
    "weight": 5
  },
  "wing_03": {
    "name": "\"Warden\" Wing",
    "isBase": false,
    "basePrice": 404,
    "recipes": [
      {
        "id": "wing_03_recipe",
        "yield": 1,
        "inputs": {
          "steel_casing_mk_1": 1,
          "support_casing": 1
        }
      }
    ],
    "weight": 10
  },
  "hull_mk_1_005": {
    "name": "Steel 6x3x1",
    "isBase": false,
    "basePrice": 1210,
    "recipes": [
      {
        "id": "hull_mk_1_005_recipe",
        "yield": 1,
        "inputs": {
          "steel_casing_mk_1": 3,
          "support_casing": 3
        }
      }
    ],
    "weight": 20
  },
  "hull_mk_1_006": {
    "name": "Steel 8x3x1",
    "isBase": false,
    "basePrice": 1610,
    "recipes": [
      {
        "id": "hull_mk_1_006_recipe",
        "yield": 1,
        "inputs": {
          "steel_casing_mk_1": 4,
          "support_casing": 4
        }
      }
    ],
    "weight": 20
  },
  "hull_mk_1_001": {
    "name": "Steel 4x3x2",
    "isBase": false,
    "basePrice": 870,
    "recipes": [
      {
        "id": "hull_mk_1_001_recipe",
        "yield": 1,
        "inputs": {
          "steel_casing_mk_1": 2,
          "support_casing": 4
        }
      }
    ],
    "weight": 20
  },
  "hull_mk_1_002": {
    "name": "Steel 6x3x2",
    "isBase": false,
    "basePrice": 1300,
    "recipes": [
      {
        "id": "hull_mk_1_002_recipe",
        "yield": 1,
        "inputs": {
          "steel_casing_mk_1": 3,
          "support_casing": 6
        }
      }
    ],
    "weight": 20
  },
  "hull_mk_1_003": {
    "name": "Steel 8x3x2",
    "isBase": false,
    "basePrice": 1740,
    "recipes": [
      {
        "id": "hull_mk_1_003_recipe",
        "yield": 1,
        "inputs": {
          "steel_casing_mk_1": 4,
          "support_casing": 8
        }
      }
    ],
    "weight": 20
  },
  "hull_mk_1_004_steel_alu_k": {
    "name": "Thermal Steel 4x3x1",
    "isBase": false,
    "basePrice": 890,
    "recipes": [
      {
        "id": "hull_mk_1_004_steel_alu_k_recipe",
        "yield": 1,
        "inputs": {
          "hull_mk_1_004": 1,
          "thermal_sheet": 4
        }
      }
    ],
    "weight": 20
  },
  "wing_01_steel_alu_k": {
    "name": "Thermal \"Nimbus\" Spoiler",
    "isBase": false,
    "basePrice": 225,
    "recipes": [
      {
        "id": "wing_01_steel_alu_k_recipe",
        "yield": 1,
        "inputs": {
          "wing_01": 1,
          "thermal_sheet": 1
        }
      }
    ],
    "weight": 5
  },
  "wing_02_steel_alu_k": {
    "name": "Thermal \"Catfin\" Spoiler",
    "isBase": false,
    "basePrice": 225,
    "recipes": [
      {
        "id": "wing_02_steel_alu_k_recipe",
        "yield": 1,
        "inputs": {
          "wing_02": 1,
          "thermal_sheet": 1
        }
      }
    ],
    "weight": 5
  },
  "wing_03_steel_alu_k": {
    "name": "Thermal \"Warden\" Spoiler",
    "isBase": false,
    "basePrice": 450,
    "recipes": [
      {
        "id": "wing_03_steel_alu_k_recipe",
        "yield": 1,
        "inputs": {
          "wing_03": 1,
          "thermal_sheet": 2
        }
      }
    ],
    "weight": 5
  },
  "hull_mk_1_005_steel_alu_k": {
    "name": "Thermal Steel 6x3x1",
    "isBase": false,
    "basePrice": 1340,
    "recipes": [
      {
        "id": "hull_mk_1_005_steel_alu_k_recipe",
        "yield": 1,
        "inputs": {
          "hull_mk_1_005": 1,
          "thermal_sheet": 6
        }
      }
    ],
    "weight": 20
  },
  "hull_mk_1_006_steel_alu_k": {
    "name": "Thermal Steel 8x3x1",
    "isBase": false,
    "basePrice": 1790,
    "recipes": [
      {
        "id": "hull_mk_1_006_steel_alu_k_recipe",
        "yield": 1,
        "inputs": {
          "hull_mk_1_006": 1,
          "thermal_sheet": 8
        }
      }
    ],
    "weight": 20
  },
  "hull_mk_1_001_steel_alu_k": {
    "name": "Thermal Steel 4x3x2",
    "isBase": false,
    "basePrice": 980,
    "recipes": [
      {
        "id": "hull_mk_1_001_steel_alu_k_recipe",
        "yield": 1,
        "inputs": {
          "hull_mk_1_001": 1,
          "thermal_sheet": 6
        }
      }
    ],
    "weight": 20
  },
  "hull_mk_1_002_steel_alu_k": {
    "name": "Thermal Steel 6x3x2",
    "isBase": false,
    "basePrice": 1460,
    "recipes": [
      {
        "id": "hull_mk_1_002_steel_alu_k_recipe",
        "yield": 1,
        "inputs": {
          "hull_mk_1_002": 1,
          "thermal_sheet": 9
        }
      }
    ],
    "weight": 20
  },
  "hull_mk_1_003_steel_alu_k": {
    "name": "Thermal Steel 8x3x2",
    "isBase": false,
    "basePrice": 1960,
    "recipes": [
      {
        "id": "hull_mk_1_003_steel_alu_k_recipe",
        "yield": 1,
        "inputs": {
          "hull_mk_1_003": 1,
          "thermal_sheet": 12
        }
      }
    ],
    "weight": 20
  },
  "hull_mk_1_004_tit": {
    "name": "Titanium 4x3x1",
    "isBase": false,
    "basePrice": 1810,
    "recipes": [
      {
        "id": "hull_mk_1_004_tit_recipe",
        "yield": 1,
        "inputs": {
          "titanium_casing_mk_1": 2,
          "support_casing": 2
        }
      }
    ],
    "weight": 20
  },
  "hull_mk_1_005_tit": {
    "name": "Titanium 6x3x1",
    "isBase": false,
    "basePrice": 2720,
    "recipes": [
      {
        "id": "hull_mk_1_005_tit_recipe",
        "yield": 1,
        "inputs": {
          "titanium_casing_mk_1": 3,
          "support_casing": 3
        }
      }
    ],
    "weight": 20
  },
  "hull_mk_1_006_tit": {
    "name": "Titanium 8x3x1",
    "isBase": false,
    "basePrice": 3620,
    "recipes": [
      {
        "id": "hull_mk_1_006_tit_recipe",
        "yield": 1,
        "inputs": {
          "titanium_casing_mk_1": 4,
          "support_casing": 4
        }
      }
    ],
    "weight": 20
  },
  "hull_mk_1_001_tit": {
    "name": "Titanium 4x3x2",
    "isBase": false,
    "basePrice": 1870,
    "recipes": [
      {
        "id": "hull_mk_1_001_tit_recipe",
        "yield": 1,
        "inputs": {
          "titanium_casing_mk_1": 2,
          "support_casing": 4
        }
      }
    ],
    "weight": 20
  },
  "hull_mk_1_002_tit": {
    "name": "Titanium 6x3x2",
    "isBase": false,
    "basePrice": 2810,
    "recipes": [
      {
        "id": "hull_mk_1_002_tit_recipe",
        "yield": 1,
        "inputs": {
          "titanium_casing_mk_1": 3,
          "support_casing": 6
        }
      }
    ],
    "weight": 20
  },
  "hull_mk_1_003_tit": {
    "name": "Titanium 8x3x2",
    "isBase": false,
    "basePrice": 3750,
    "recipes": [
      {
        "id": "hull_mk_1_003_tit_recipe",
        "yield": 1,
        "inputs": {
          "titanium_casing_mk_1": 4,
          "support_casing": 8
        }
      }
    ],
    "weight": 20
  },
  "hull_mk_2_004_tit": {
    "name": "Titanium 8x6x2",
    "isBase": false,
    "basePrice": 9200,
    "recipes": [
      {
        "id": "hull_mk_2_004_tit_recipe",
        "yield": 1,
        "inputs": {
          "titanium_casing_mk_2": 2,
          "support_casing": 8
        }
      }
    ],
    "weight": 50
  },
  "wing_04": {
    "name": "\"Condor\" Wing",
    "isBase": false,
    "basePrice": 9200,
    "recipes": [
      {
        "id": "wing_04_recipe",
        "yield": 1,
        "inputs": {
          "titanium_casing_mk_2": 2,
          "support_casing": 8
        }
      }
    ],
    "weight": 50
  },
  "hull_mk_2_005_tit": {
    "name": "Titanium 12x6x2",
    "isBase": false,
    "basePrice": 13800,
    "recipes": [
      {
        "id": "hull_mk_2_005_tit_recipe",
        "yield": 1,
        "inputs": {
          "titanium_casing_mk_2": 3,
          "support_casing": 12
        }
      }
    ],
    "weight": 50
  },
  "hull_mk_2_006_tit": {
    "name": "Titanium 16x6x2",
    "isBase": false,
    "basePrice": 18400,
    "recipes": [
      {
        "id": "hull_mk_2_006_tit_recipe",
        "yield": 1,
        "inputs": {
          "titanium_casing_mk_2": 4,
          "support_casing": 16
        }
      }
    ],
    "weight": 50
  },
  "hull_mk_1_004_tit_alu_k": {
    "name": "Thermal Titanium 4x3x1",
    "isBase": false,
    "basePrice": 1980,
    "recipes": [
      {
        "id": "hull_mk_1_004_tit_alu_k_recipe",
        "yield": 1,
        "inputs": {
          "hull_mk_1_004_tit": 1,
          "thermal_sheet": 4
        }
      }
    ],
    "weight": 20
  },
  "hull_mk_1_005_tit_alu_k": {
    "name": "Thermal Titanium 6x3x1",
    "isBase": false,
    "basePrice": 2980,
    "recipes": [
      {
        "id": "hull_mk_1_005_tit_alu_k_recipe",
        "yield": 1,
        "inputs": {
          "hull_mk_1_005_tit": 1,
          "thermal_sheet": 6
        }
      }
    ],
    "weight": 20
  },
  "hull_mk_1_006_tit_alu_k": {
    "name": "Thermal Titanium 8x3x1",
    "isBase": false,
    "basePrice": 3960,
    "recipes": [
      {
        "id": "hull_mk_1_006_tit_alu_k_recipe",
        "yield": 1,
        "inputs": {
          "hull_mk_1_006_tit": 1,
          "thermal_sheet": 8
        }
      }
    ],
    "weight": 20
  },
  "hull_mk_1_001_tit_alu_k": {
    "name": "Thermal Titanium 4x3x2",
    "isBase": false,
    "basePrice": 2060,
    "recipes": [
      {
        "id": "hull_mk_1_001_tit_alu_k_recipe",
        "yield": 1,
        "inputs": {
          "hull_mk_1_001_tit": 1,
          "thermal_sheet": 6
        }
      }
    ],
    "weight": 20
  },
  "hull_mk_1_002_tit_alu_k": {
    "name": "Thermal Titanium 6x3x2",
    "isBase": false,
    "basePrice": 3090,
    "recipes": [
      {
        "id": "hull_mk_1_002_tit_alu_k_recipe",
        "yield": 1,
        "inputs": {
          "hull_mk_1_002_tit": 1,
          "thermal_sheet": 9
        }
      }
    ],
    "weight": 20
  },
  "hull_mk_1_003_tit_alu_k": {
    "name": "Thermal Titanium 8x3x2",
    "isBase": false,
    "basePrice": 4130,
    "recipes": [
      {
        "id": "hull_mk_1_003_tit_alu_k_recipe",
        "yield": 1,
        "inputs": {
          "hull_mk_1_003_tit": 1,
          "thermal_sheet": 12
        }
      }
    ],
    "weight": 20
  },
  "hull_mk_2_004_tit_alu_k": {
    "name": "Thermal Titanium 8x6x2",
    "isBase": false,
    "basePrice": 10000,
    "recipes": [
      {
        "id": "hull_mk_2_004_tit_alu_k_recipe",
        "yield": 1,
        "inputs": {
          "hull_mk_2_004_tit": 1,
          "thermal_sheet": 16
        }
      }
    ],
    "weight": 50
  },
  "wing_04_tit_alu_k": {
    "name": "Thermal \"Condor\" Wing",
    "isBase": false,
    "basePrice": 10000,
    "recipes": [
      {
        "id": "wing_04_tit_alu_k_recipe",
        "yield": 1,
        "inputs": {
          "wing_04": 1,
          "thermal_sheet": 16
        }
      }
    ],
    "weight": 50
  },
  "hull_mk_2_005_tit_alu_k": {
    "name": "Thermal Titanium 12x6x2",
    "isBase": false,
    "basePrice": 15000,
    "recipes": [
      {
        "id": "hull_mk_2_005_tit_alu_k_recipe",
        "yield": 1,
        "inputs": {
          "hull_mk_2_005_tit": 1,
          "thermal_sheet": 24
        }
      }
    ],
    "weight": 50
  },
  "hull_mk_2_006_tit_alu_k": {
    "name": "Thermal Titanium 16x6x2",
    "isBase": false,
    "basePrice": 20100,
    "recipes": [
      {
        "id": "hull_mk_2_006_tit_alu_k_recipe",
        "yield": 1,
        "inputs": {
          "hull_mk_2_006_tit": 1,
          "thermal_sheet": 32
        }
      }
    ],
    "weight": 50
  },
  "hull_mk_1_001_pla": {
    "name": "Platinium 4x3x2 [DEPRECATED BUT STILL USED IN SHIPWRECK]",
    "isBase": true,
    "weight": 1
  },
  "hull_mk_1_002_pla": {
    "name": "Platinium 6x3x2 [DEPRECATED BUT STILL USED IN SHIPWRECK]",
    "isBase": true,
    "weight": 1
  },
  "hull_mk_1_003_pla": {
    "name": "Platinium 8x3x2 [DEPRECATED BUT STILL USED IN SHIPWRECK]",
    "isBase": true,
    "weight": 1
  },
  "hull_mk_2_001_pla": {
    "name": "Platinium 8x6x4 [DEPRECATED BUT STILL USED IN SHIPWRECK]",
    "isBase": true,
    "weight": 1
  },
  "hull_mk_2_002_pla": {
    "name": "Platinium 12x6x4 [DEPRECATED BUT STILL USED IN SHIPWRECK]",
    "isBase": true,
    "weight": 1
  },
  "hull_mk_2_003_pla": {
    "name": "Platinium 16x6x4 [DEPRECATED BUT STILL USED IN SHIPWRECK]",
    "isBase": true,
    "weight": 1
  },
  "hull_mk_1_006_lev": {
    "name": "Levinium 8x3x1[DEPRECATED BUT STILL USED IN SHIPWRECK]",
    "isBase": true,
    "weight": 1
  },
  "hull_mk_1_005_lev": {
    "name": "Levinium 6x3x1[DEPRECATED BUT STILL USED IN SHIPWRECK]",
    "isBase": true,
    "weight": 1
  },
  "hull_mk_1_004_lev": {
    "name": "Levinium 4x3x1 [DEPRECATED BUT STILL USED IN SHIPWRECK]",
    "isBase": true,
    "weight": 20
  },
  "hull_mk_1_001_lev": {
    "name": "Levinium 4x3x2",
    "isBase": false,
    "basePrice": 3710,
    "recipes": [
      {
        "id": "hull_mk_1_001_lev_recipe",
        "yield": 1,
        "inputs": {
          "levinium_casing_mk_1": 2,
          "support_casing": 4
        }
      }
    ],
    "weight": 20
  },
  "hull_mk_1_002_lev": {
    "name": "Levinium 6x3x2",
    "isBase": false,
    "basePrice": 5500,
    "recipes": [
      {
        "id": "hull_mk_1_002_lev_recipe",
        "yield": 1,
        "inputs": {
          "levinium_casing_mk_1": 3,
          "support_casing": 6
        }
      }
    ],
    "weight": 20
  },
  "hull_mk_1_003_lev": {
    "name": "Levinium 8x3x2",
    "isBase": false,
    "basePrice": 7400,
    "recipes": [
      {
        "id": "hull_mk_1_003_lev_recipe",
        "yield": 1,
        "inputs": {
          "levinium_casing_mk_1": 4,
          "support_casing": 8
        }
      }
    ],
    "weight": 20
  },
  "hull_mk_1_004_plat": {
    "name": "Solid Frame 4x3x1",
    "isBase": false,
    "basePrice": 6400,
    "recipes": [
      {
        "id": "hull_mk_1_004_plat_recipe",
        "yield": 1,
        "inputs": {
          "platinum_casing_mk_1": 4
        }
      }
    ],
    "weight": 20
  },
  "hull_mk_1_005_plat": {
    "name": "Solid Frame 6x3x1",
    "isBase": false,
    "basePrice": 9600,
    "recipes": [
      {
        "id": "hull_mk_1_005_plat_recipe",
        "yield": 1,
        "inputs": {
          "platinum_casing_mk_1": 6
        }
      }
    ],
    "weight": 20
  },
  "hull_mk_1_006_plat": {
    "name": "Solid Frame 8x3x1",
    "isBase": false,
    "basePrice": 12800,
    "recipes": [
      {
        "id": "hull_mk_1_006_plat_recipe",
        "yield": 1,
        "inputs": {
          "platinum_casing_mk_1": 8
        }
      }
    ],
    "weight": 20
  },
  "hull_mk_2_004_plat": {
    "name": "Solid Frame 8x6x2",
    "isBase": false,
    "basePrice": 33200,
    "recipes": [
      {
        "id": "hull_mk_2_004_plat_recipe",
        "yield": 1,
        "inputs": {
          "platinum_casing_mk_2": 4
        }
      }
    ],
    "weight": 50
  },
  "hull_mk_2_005_plat": {
    "name": "Solid Frame 12x6x2",
    "isBase": false,
    "basePrice": 49900,
    "recipes": [
      {
        "id": "hull_mk_2_005_plat_recipe",
        "yield": 1,
        "inputs": {
          "platinum_casing_mk_2": 6
        }
      }
    ],
    "weight": 50
  },
  "hull_mk_2_006_plat": {
    "name": "Solid Frame 16x6x2",
    "isBase": false,
    "basePrice": 66000,
    "recipes": [
      {
        "id": "hull_mk_2_006_plat_recipe",
        "yield": 1,
        "inputs": {
          "platinum_casing_mk_2": 8
        }
      }
    ],
    "weight": 50
  },
  "hull_mk_1_004_ax": {
    "name": "Alloy X 4x3x1",
    "isBase": false,
    "basePrice": 61,
    "recipes": [
      {
        "id": "hull_mk_1_004_ax_recipe",
        "yield": 1,
        "inputs": {
          "alloy_xcasing_mk_1": 2,
          "support_casing": 2
        }
      }
    ],
    "weight": 1
  },
  "hull_mk_1_005_ax": {
    "name": "Alloy X 6x3x1",
    "isBase": false,
    "basePrice": 92,
    "recipes": [
      {
        "id": "hull_mk_1_005_ax_recipe",
        "yield": 1,
        "inputs": {
          "alloy_xcasing_mk_1": 3,
          "support_casing": 3
        }
      }
    ],
    "weight": 1
  },
  "hull_mk_1_006_ax": {
    "name": "Alloy X 8x3x1",
    "isBase": false,
    "basePrice": 122,
    "recipes": [
      {
        "id": "hull_mk_1_006_ax_recipe",
        "yield": 1,
        "inputs": {
          "alloy_xcasing_mk_1": 4,
          "support_casing": 4
        }
      }
    ],
    "weight": 1
  },
  "hull_mk_1_001_ax": {
    "name": "Alloy X 4x3x2",
    "isBase": false,
    "basePrice": 122,
    "recipes": [
      {
        "id": "hull_mk_1_001_ax_recipe",
        "yield": 1,
        "inputs": {
          "alloy_xcasing_mk_1": 2,
          "support_casing": 4
        }
      }
    ],
    "weight": 1
  },
  "hull_mk_1_002_ax": {
    "name": "Alloy X 6x3x2",
    "isBase": false,
    "basePrice": 184,
    "recipes": [
      {
        "id": "hull_mk_1_002_ax_recipe",
        "yield": 1,
        "inputs": {
          "alloy_xcasing_mk_1": 3,
          "support_casing": 6
        }
      }
    ],
    "weight": 1
  },
  "hull_mk_1_003_ax": {
    "name": "Alloy X 8x3x2",
    "isBase": false,
    "basePrice": 245,
    "recipes": [
      {
        "id": "hull_mk_1_003_ax_recipe",
        "yield": 1,
        "inputs": {
          "alloy_xcasing_mk_1": 4,
          "support_casing": 8
        }
      }
    ],
    "weight": 1
  },
  "hull_mk_2_004_ax": {
    "name": "Alloy X 8x6x2",
    "isBase": false,
    "basePrice": 245,
    "recipes": [
      {
        "id": "hull_mk_2_004_ax_recipe",
        "yield": 1,
        "inputs": {
          "alloy_xcasing_mk_2": 2,
          "support_casing": 8
        }
      }
    ],
    "weight": 1
  },
  "hull_mk_2_005_ax": {
    "name": "Alloy X 12x6x2",
    "isBase": false,
    "basePrice": 368,
    "recipes": [
      {
        "id": "hull_mk_2_005_ax_recipe",
        "yield": 1,
        "inputs": {
          "alloy_xcasing_mk_2": 3,
          "support_casing": 12
        }
      }
    ],
    "weight": 1
  },
  "hull_mk_2_006_ax_1": {
    "name": "Alloy X 12x6x4",
    "isBase": true,
    "weight": 1
  },
  "hull_mk_2_007_ax": {
    "name": "Alloy X 16x6x2",
    "isBase": false,
    "basePrice": 491,
    "recipes": [
      {
        "id": "hull_mk_2_007_ax_recipe",
        "yield": 1,
        "inputs": {
          "alloy_xcasing_mk_2": 4,
          "support_casing": 16
        }
      }
    ],
    "weight": 1
  },
  "hull_mk_2_008_ax_1": {
    "name": "Alloy X 16x6x4",
    "isBase": true,
    "weight": 1
  },
  "cockpit_lr_1": {
    "name": "LR \"Interceptor\" Cockpit",
    "isBase": false,
    "basePrice": 1300,
    "recipes": [
      {
        "id": "cockpit_lr_1_recipe",
        "yield": 1,
        "inputs": {
          "steel_casing_mk_1": 3,
          "support_casing": 6
        }
      }
    ],
    "weight": 20
  },
  "cockpit_lr_2": {
    "name": "LR \"Raptor\" Cockpit",
    "isBase": false,
    "basePrice": 18900,
    "recipes": [
      {
        "id": "cockpit_lr_2_recipe",
        "yield": 1,
        "inputs": {
          "titanium_casing_mk_2": 4,
          "support_casing": 32
        }
      }
    ],
    "weight": 50
  },
  "cockpit_lr_3": {
    "name": "LR \"Marauder\" Deck",
    "isBase": false,
    "basePrice": 18900,
    "recipes": [
      {
        "id": "cockpit_lr_3_recipe",
        "yield": 1,
        "inputs": {
          "titanium_casing_mk_2": 4,
          "support_casing": 32
        }
      }
    ],
    "weight": 1
  },
  "cockpit_ae_1": {
    "name": "\"Pathfinder\" Cockpit",
    "isBase": false,
    "basePrice": 1550,
    "recipes": [
      {
        "id": "cockpit_ae_1_recipe",
        "yield": 1,
        "inputs": {
          "steel_casing_mk_1": 3,
          "support_casing": 6,
          "wire": 20,
          "coil": 8
        }
      }
    ],
    "weight": 20
  },
  "cockpit_ae_2": {
    "name": "\"Wanderback\" Cockpit",
    "isBase": false,
    "basePrice": 21700,
    "recipes": [
      {
        "id": "cockpit_ae_2_recipe",
        "yield": 1,
        "inputs": {
          "titanium_casing_mk_2": 4,
          "support_casing": 16,
          "beacon": 1,
          "elmerium": 20,
          "grating": 50
        }
      }
    ],
    "weight": 50
  },
  "cockpit_ae_3": {
    "name": "AE \"Skygazer\" Deck",
    "isBase": false,
    "basePrice": 18900,
    "recipes": [
      {
        "id": "cockpit_ae_3_recipe",
        "yield": 1,
        "inputs": {
          "titanium_casing_mk_2": 4,
          "support_casing": 32
        }
      }
    ],
    "weight": 1
  },
  "cockpit_tc_1": {
    "name": "\"Brick\" Cockpit",
    "isBase": false,
    "basePrice": 415,
    "recipes": [
      {
        "id": "cockpit_tc_1_recipe",
        "yield": 1,
        "inputs": {
          "plate_1": 10,
          "wire": 50,
          "motor": 2
        }
      }
    ],
    "weight": 20
  },
  "cockpit_mk_1": {
    "name": "\"Beaver\" Cockpit",
    "isBase": false,
    "basePrice": 1510,
    "recipes": [
      {
        "id": "cockpit_mk_1_recipe",
        "yield": 1,
        "inputs": {
          "steel_casing_mk_1": 3,
          "support_casing": 6,
          "metal_sheet_1": 20,
          "metal_bolt": 40
        }
      }
    ],
    "weight": 20
  },
  "cockpit_mk_2": {
    "name": "\"Anvil\" Cockpit",
    "isBase": false,
    "basePrice": 22900,
    "recipes": [
      {
        "id": "cockpit_mk_2_recipe",
        "yield": 1,
        "inputs": {
          "titanium_casing_mk_2": 4,
          "support_casing": 16,
          "concrete": 80,
          "beam_1": 50,
          "plate_1": 50
        }
      }
    ],
    "weight": 50
  },
  "cockpit_mk_3": {
    "name": "M&K \"Foreman\" Deck",
    "isBase": false,
    "basePrice": 18900,
    "recipes": [
      {
        "id": "cockpit_mk_3_recipe",
        "yield": 1,
        "inputs": {
          "titanium_casing_mk_2": 4,
          "support_casing": 32
        }
      }
    ],
    "weight": 1
  },
  "cockpit_da_1": {
    "name": "\"Cocoon\" Cockpit",
    "isBase": false,
    "basePrice": 1490,
    "recipes": [
      {
        "id": "cockpit_da_1_recipe",
        "yield": 1,
        "inputs": {
          "steel_casing_mk_1": 3,
          "support_casing": 6,
          "thermal_sheet": 20
        }
      }
    ],
    "weight": 20
  },
  "cockpit_da_2": {
    "name": "\"Reality\" Cockpit",
    "isBase": true,
    "weight": 50
  },
  "cockpit_da_3": {
    "name": "DA \"PlaceholderName\" Deck",
    "isBase": true,
    "weight": 1
  },
  "deco_01": {
    "name": "Round Hatch",
    "isBase": true,
    "weight": 0
  },
  "deco_04": {
    "name": "Intake Vent",
    "isBase": true,
    "weight": 0
  },
  "deco_05": {
    "name": "Big Intake Vent",
    "isBase": true,
    "weight": 0
  },
  "light_01": {
    "name": "Spot Light",
    "isBase": false,
    "basePrice": 13.2,
    "recipes": [
      {
        "id": "light_01_recipe",
        "yield": 1,
        "inputs": {
          "metal_sheet_1": 2,
          "wire": 3
        }
      }
    ],
    "weight": 1
  },
  "light_02": {
    "name": "Light Strip",
    "isBase": false,
    "basePrice": 13.2,
    "recipes": [
      {
        "id": "light_02_recipe",
        "yield": 1,
        "inputs": {
          "metal_sheet_1": 2,
          "wire": 3
        }
      }
    ],
    "weight": 1
  },
  "light_03": {
    "name": "Headlight",
    "isBase": false,
    "basePrice": 13.2,
    "recipes": [
      {
        "id": "light_03_recipe",
        "yield": 1,
        "inputs": {
          "metal_sheet_1": 2,
          "wire": 3
        }
      }
    ],
    "weight": 1
  },
  "thruster_0": {
    "name": "\"Cart Pusher\" Thruster",
    "isBase": false,
    "basePrice": 315,
    "recipes": [
      {
        "id": "thruster_0_recipe",
        "yield": 1,
        "inputs": {
          "plate_1": 10,
          "wire": 40,
          "alternator": 1
        }
      }
    ],
    "weight": 20
  },
  "thruster_1": {
    "name": "\"Long Haul Booster\"",
    "isBase": true,
    "basePrice": 14400,
    "weight": 1
  },
  "thruster_2": {
    "name": "\"Silent Thruster\"",
    "isBase": true,
    "basePrice": 9600,
    "weight": 1
  },
  "thruster_ae_1": {
    "name": "\"Quiet Breeze\" Thruster",
    "isBase": false,
    "basePrice": 1250,
    "recipes": [
      {
        "id": "thruster_ae_1_recipe",
        "yield": 1,
        "inputs": {
          "steel_casing_mk_1": 2,
          "support_casing": 4,
          "alternator": 3,
          "motor": 2
        }
      }
    ],
    "weight": 20
  },
  "thruster_mk_1": {
    "name": "\"Grasshopper\" Thruster",
    "isBase": false,
    "basePrice": 1270,
    "recipes": [
      {
        "id": "thruster_mk_1_recipe",
        "yield": 1,
        "inputs": {
          "steel_casing_mk_1": 2,
          "support_casing": 4,
          "alternator": 3,
          "wire": 15,
          "pipe_1": 15
        }
      }
    ],
    "weight": 20
  },
  "thruster_da_1": {
    "name": "\"Voidseeker\" Thruster",
    "isBase": false,
    "basePrice": 1230,
    "recipes": [
      {
        "id": "thruster_da_1_recipe",
        "yield": 1,
        "inputs": {
          "steel_casing_mk_1": 2,
          "support_casing": 4,
          "alternator": 3,
          "thermal_sheet": 6,
          "hematite": 3
        }
      }
    ],
    "weight": 20
  },
  "storage_1": {
    "name": "Small Cargo Hold",
    "isBase": false,
    "basePrice": 65,
    "recipes": [
      {
        "id": "storage_1_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_1": 1,
          "metal_sheet_1": 6,
          "silicone_gel": 4
        }
      }
    ],
    "weight": 10
  },
  "storage_2": {
    "name": "Cargo Hold",
    "isBase": false,
    "basePrice": 560,
    "recipes": [
      {
        "id": "storage_2_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_2": 1,
          "metal_sheet_1": 30,
          "silicone_gel": 20
        }
      }
    ],
    "weight": 25
  },
  "storage_3": {
    "name": "Large Cargo Hold",
    "isBase": false,
    "basePrice": 15800,
    "recipes": [
      {
        "id": "storage_3_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_3": 1,
          "metal_sheet_1": 500,
          "metal_sheet_3": 100,
          "silicone_gel": 400
        }
      }
    ],
    "weight": 50
  },
  "liquid_storage_1": {
    "name": "Small Liquid Tank",
    "isBase": false,
    "basePrice": 442,
    "recipes": [
      {
        "id": "liquid_storage_1_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_1": 1,
          "pipe_1": 25,
          "plate_1": 15,
          "silicone_gel": 30
        }
      }
    ],
    "weight": 10
  },
  "liquid_storage_2": {
    "name": "Medium Liquid Tank",
    "isBase": false,
    "basePrice": 1880,
    "recipes": [
      {
        "id": "liquid_storage_2_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_2": 1,
          "pipe_1": 100,
          "plate_1": 50,
          "silicone_gel": 100
        }
      }
    ],
    "weight": 25
  },
  "liquid_storage_3_ph": {
    "name": "Large Liquid Tank",
    "isBase": false,
    "basePrice": 23000,
    "recipes": [
      {
        "id": "liquid_storage_3_ph_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_3": 1,
          "pipe_1": 500,
          "plate_2": 200,
          "silicone_gel": 500
        }
      }
    ],
    "weight": 50
  },
  "pressure_storage_1": {
    "name": "Small Pressure Chamber",
    "isBase": true,
    "basePrice": 620,
    "weight": 10
  },
  "pressure_storage_2_ph": {
    "name": "Medium Pressure Chamber",
    "isBase": true,
    "weight": 10
  },
  "pressure_storage_3_ph": {
    "name": "Large Pressure Chamber",
    "isBase": true,
    "weight": 10
  },
  "ftlengine_1": {
    "name": "FTL Engine - Eco",
    "isBase": false,
    "basePrice": 90,
    "recipes": [
      {
        "id": "ftlengine_1_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_1": 1,
          "focuser": 1,
          "wire": 7,
          "silicone_gel": 2
        }
      }
    ],
    "weight": 10
  },
  "ftlengine_2_light": {
    "name": "FTL Engine - Light",
    "isBase": false,
    "basePrice": 460,
    "recipes": [
      {
        "id": "ftlengine_2_light_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_1": 1,
          "focuser": 1,
          "graphenoid": 1,
          "coil": 2,
          "silicone_gel": 3
        }
      }
    ],
    "weight": 10
  },
  "ftlengine_2_medium": {
    "name": "FTL Engine - Mid-weight",
    "isBase": false,
    "basePrice": 1300,
    "recipes": [
      {
        "id": "ftlengine_2_medium_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_2": 1,
          "focuser": 1,
          "graphenoid": 2,
          "coil": 5,
          "silicone_gel": 10
        }
      }
    ],
    "weight": 25
  },
  "ftlengine_2_heavy": {
    "name": "FTL Engine - Heavy",
    "isBase": false,
    "basePrice": 13200,
    "recipes": [
      {
        "id": "ftlengine_2_heavy_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_3": 1,
          "focuser": 1,
          "graphenoid": 3,
          "coil": 14,
          "silicone_gel": 30
        }
      }
    ],
    "weight": 50
  },
  "ftlengine_3_solo": {
    "name": "Advanced FTL Engine - Solo",
    "isBase": true,
    "weight": 10
  },
  "ftlengine_3_support": {
    "name": "Advanced FTL Engine - Support",
    "isBase": true,
    "weight": 50
  },
  "ftltank_1": {
    "name": "Small Mag-Plasma Tank",
    "isBase": false,
    "basePrice": 269,
    "recipes": [
      {
        "id": "ftltank_1_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_1": 1,
          "magnetic_chamber": 1
        }
      }
    ],
    "weight": 10
  },
  "ftltank_2": {
    "name": "Mag-Plasma Tank",
    "isBase": false,
    "basePrice": 1570,
    "recipes": [
      {
        "id": "ftltank_2_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_2": 1,
          "magnetic_chamber": 5
        }
      }
    ],
    "weight": 25
  },
  "ftltank_3": {
    "name": "Big Mag-Plasma Tank",
    "isBase": false,
    "basePrice": 11900,
    "recipes": [
      {
        "id": "ftltank_3_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_3": 1,
          "pressure_storage_1": 1,
          "magnetic_chamber": 1
        }
      }
    ],
    "weight": 50
  },
  "navigator": {
    "name": "Cosmic Navigator",
    "isBase": false,
    "basePrice": 48.8,
    "recipes": [
      {
        "id": "navigator_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_1": 1,
          "micro_chip": 5
        }
      }
    ],
    "weight": 10
  },
  "battery_0": {
    "name": "Crude Battery",
    "isBase": true,
    "basePrice": 65,
    "weight": 10
  },
  "battery_1": {
    "name": "Battery Module",
    "isBase": false,
    "basePrice": 740,
    "recipes": [
      {
        "id": "battery_1_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_2": 1,
          "battery": 5
        }
      }
    ],
    "weight": 10
  },
  "battery_2": {
    "name": "BESS Module",
    "isBase": false,
    "basePrice": 14400,
    "recipes": [
      {
        "id": "battery_2_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_3": 1,
          "battery": 40,
          "malachite_stone": 20
        }
      }
    ],
    "weight": 25
  },
  "rbattery_0": {
    "name": "Flywheel Battery",
    "isBase": false,
    "basePrice": 110,
    "recipes": [
      {
        "id": "rbattery_0_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_1": 1,
          "motor": 1,
          "concrete": 2
        }
      }
    ],
    "weight": 10
  },
  "pbattery": {
    "name": "Paradoxical Battery",
    "isBase": false,
    "basePrice": 62,
    "recipes": [
      {
        "id": "pbattery_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_1": 1,
          "coil": 2
        }
      }
    ],
    "weight": 10
  },
  "isotopic_generator": {
    "name": "Isotopic Generator",
    "isBase": false,
    "basePrice": 62,
    "recipes": [
      {
        "id": "isotopic_generator_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_1": 1,
          "coil": 2
        }
      }
    ],
    "weight": 10
  },
  "fusion_generator": {
    "name": "Fusion Generator",
    "isBase": false,
    "basePrice": 62,
    "recipes": [
      {
        "id": "fusion_generator_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_1": 1,
          "coil": 2
        }
      }
    ],
    "weight": 1
  },
  "power_sharer_ph": {
    "name": "Power Projector",
    "isBase": false,
    "basePrice": 62,
    "recipes": [
      {
        "id": "power_sharer_ph_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_1": 1,
          "coil": 2
        }
      }
    ],
    "weight": 1
  },
  "nitrogenerator": {
    "name": "LR Nitrogenerator",
    "isBase": true,
    "weight": 10
  },
  "carbon_generator": {
    "name": "Small Fuel Generator",
    "isBase": false,
    "basePrice": 880,
    "recipes": [
      {
        "id": "carbon_generator_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_1": 1,
          "motor": 10,
          "pipe_1": 4,
          "beam_1": 5
        }
      }
    ],
    "weight": 10
  },
  "carbon_generator_2": {
    "name": "Large Fuel Generator",
    "isBase": true,
    "weight": 25
  },
  "heater": {
    "name": "Electric Heater",
    "isBase": false,
    "basePrice": 56,
    "recipes": [
      {
        "id": "heater_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_1": 1,
          "wire": 5,
          "thermal_isolant": 1
        }
      }
    ],
    "weight": 10
  },
  "heater_2": {
    "name": "Boiler Heater",
    "isBase": false,
    "basePrice": 1190,
    "recipes": [
      {
        "id": "heater_2_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_2": 1,
          "heater": 5,
          "pump": 1,
          "pipe_1": 10,
          "thermal_paste": 50
        }
      }
    ],
    "weight": 25
  },
  "heat_recouper": {
    "name": "Heat Condenser",
    "isBase": true,
    "basePrice": 1390,
    "weight": 10
  },
  "kinetic_shield_1": {
    "name": "Small Reactive Shield",
    "isBase": false,
    "basePrice": 284,
    "recipes": [
      {
        "id": "kinetic_shield_1_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_1": 1,
          "elmerium_engine": 1,
          "crystal_lattice_h": 1
        }
      }
    ],
    "weight": 10
  },
  "kinetic_shield_2": {
    "name": "Reactive Shield",
    "isBase": false,
    "basePrice": 1490,
    "recipes": [
      {
        "id": "kinetic_shield_2_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_2": 1,
          "elmerium_engine": 4,
          "crystal_lattice_h": 16,
          "crystal_lattice_c": 3
        }
      }
    ],
    "weight": 25
  },
  "kinetic_shield_3": {
    "name": "Hyper Reactive Shield",
    "isBase": false,
    "basePrice": 17400,
    "recipes": [
      {
        "id": "kinetic_shield_3_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_3": 1,
          "elmerium_engine": 20,
          "crystal_lattice_h": 160,
          "crystal_lattice_c": 28,
          "emerald": 1
        }
      }
    ],
    "weight": 50
  },
  "barrier_shield_1": {
    "name": "Small Barrier Shield",
    "isBase": false,
    "basePrice": 285,
    "recipes": [
      {
        "id": "barrier_shield_1_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_1": 1,
          "elmerium_engine": 1,
          "crystal_lattice_m": 1
        }
      }
    ],
    "weight": 10
  },
  "barrier_shield_2": {
    "name": "Barrier Shield",
    "isBase": false,
    "basePrice": 1500,
    "recipes": [
      {
        "id": "barrier_shield_2_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_2": 1,
          "elmerium_engine": 4,
          "crystal_lattice_m": 14,
          "crystal_lattice_h": 5
        }
      }
    ],
    "weight": 25
  },
  "barrier_shield_3": {
    "name": "Large Barrier Shield",
    "isBase": false,
    "basePrice": 17500,
    "recipes": [
      {
        "id": "barrier_shield_3_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_3": 1,
          "elmerium_engine": 20,
          "crystal_lattice_m": 135,
          "crystal_lattice_h": 53,
          "azurite_stone": 2
        }
      }
    ],
    "weight": 50
  },
  "heavy_shield_2": {
    "name": "Heavy Shield",
    "isBase": false,
    "basePrice": 1510,
    "recipes": [
      {
        "id": "heavy_shield_2_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_2": 1,
          "elmerium_engine": 4,
          "crystal_lattice_c": 15,
          "crystal_lattice_m": 4
        }
      }
    ],
    "weight": 25
  },
  "heavy_shield_3": {
    "name": "Large Heavy Shield",
    "isBase": false,
    "basePrice": 18000,
    "recipes": [
      {
        "id": "heavy_shield_3_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_3": 1,
          "elmerium_engine": 20,
          "crystal_lattice_c": 148,
          "crystal_lattice_m": 40,
          "diamond": 1
        }
      }
    ],
    "weight": 50
  },
  "kinetic_shield_group": {
    "name": "Kinetic Shield Projector",
    "isBase": false,
    "basePrice": 1390,
    "recipes": [
      {
        "id": "kinetic_shield_group_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_2": 1,
          "pressure_storage_1": 1,
          "magnetic_chamber": 1
        }
      }
    ],
    "weight": 1
  },
  "heat_shield": {
    "name": "Thermal Shield",
    "isBase": false,
    "basePrice": 1390,
    "recipes": [
      {
        "id": "heat_shield_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_2": 1,
          "pressure_storage_1": 1,
          "magnetic_chamber": 1
        }
      }
    ],
    "weight": 1
  },
  "mag_shield": {
    "name": "Magnetokinetic Shield Generator",
    "isBase": true,
    "weight": 1
  },
  "stealth_module_personnal": {
    "name": "Stealth Micro-Projector",
    "isBase": false,
    "basePrice": 62,
    "recipes": [
      {
        "id": "stealth_module_personnal_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_1": 1,
          "coil": 2
        }
      }
    ],
    "weight": 1
  },
  "stealth_module_group": {
    "name": "Stealth Macro-Projector",
    "isBase": false,
    "basePrice": 62,
    "recipes": [
      {
        "id": "stealth_module_group_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_1": 1,
          "coil": 2
        }
      }
    ],
    "weight": 1
  },
  "auto_boost_module": {
    "name": "Booster Control Mod",
    "isBase": false,
    "basePrice": 98,
    "recipes": [
      {
        "id": "auto_boost_module_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_1": 1,
          "micro_chip": 1,
          "coil": 5
        }
      }
    ],
    "weight": 10
  },
  "auto_mine_module": {
    "name": "Mining Laser Control Mod",
    "isBase": false,
    "basePrice": 44.5,
    "recipes": [
      {
        "id": "auto_mine_module_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_1": 1,
          "micro_chip": 2
        }
      }
    ],
    "weight": 10
  },
  "engine_booster": {
    "name": "LR \"Speedster\"",
    "isBase": true,
    "basePrice": 115,
    "weight": 10
  },
  "solar_panel_1": {
    "name": "Small Solar Panel",
    "isBase": false,
    "basePrice": 202,
    "recipes": [
      {
        "id": "solar_panel_1_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_1": 1,
          "solar_cell": 24
        }
      }
    ],
    "weight": 10
  },
  "solar_panel_2": {
    "name": "Medium Solar Panel",
    "isBase": false,
    "basePrice": 1040,
    "recipes": [
      {
        "id": "solar_panel_2_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_2": 1,
          "solar_cell": 90
        }
      }
    ],
    "weight": 25
  },
  "solar_panel_3": {
    "name": "Large Solar Panel",
    "isBase": false,
    "basePrice": 15600,
    "recipes": [
      {
        "id": "solar_panel_3_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_3": 1,
          "solar_cell": 600,
          "graphene": 150
        }
      }
    ],
    "weight": 50
  },
  "radiator": {
    "name": "Small Radiator",
    "isBase": false,
    "basePrice": 195,
    "recipes": [
      {
        "id": "radiator_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_1": 1,
          "thermal_sheet": 5,
          "wire": 50
        }
      }
    ],
    "weight": 10
  },
  "radiator_1": {
    "name": "Medium Radiator",
    "isBase": false,
    "basePrice": 1250,
    "recipes": [
      {
        "id": "radiator_1_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_2": 1,
          "thermal_sheet": 25,
          "wire": 100,
          "pump": 2,
          "thermal_paste": 20
        }
      }
    ],
    "weight": 25
  },
  "radar_0": {
    "name": "Crude Resource Detector",
    "isBase": true,
    "basePrice": 50,
    "weight": 10
  },
  "radar_mk_1": {
    "name": "Simple Resource Detector",
    "isBase": false,
    "basePrice": 62,
    "recipes": [
      {
        "id": "radar_mk_1_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_1": 1,
          "coil": 2
        }
      }
    ],
    "weight": 10
  },
  "radar_sniffer": {
    "name": "Mimetic Detector",
    "isBase": false,
    "basePrice": 168,
    "recipes": [
      {
        "id": "radar_sniffer_recipe",
        "yield": 1,
        "inputs": {
          "radar_mk_1": 2,
          "grating": 2,
          "micro_chip": 1,
          "wire": 3
        }
      }
    ],
    "weight": 10
  },
  "radar_smart": {
    "name": "Spectral Resource Detector",
    "isBase": false,
    "basePrice": 116,
    "recipes": [
      {
        "id": "radar_smart_recipe",
        "yield": 1,
        "inputs": {
          "radar_mk_1": 1,
          "focuser": 1,
          "grating": 3
        }
      }
    ],
    "weight": 10
  },
  "gravite_detector": {
    "name": "Gravitron",
    "isBase": false,
    "basePrice": 790,
    "recipes": [
      {
        "id": "gravite_detector_recipe",
        "yield": 1,
        "inputs": {
          "radar_mk_1": 1,
          "diamond": 1,
          "calcified_invariant": 2,
          "grating": 3
        }
      }
    ],
    "weight": 10
  },
  "scanner_0": {
    "name": "Scanalyzer Alpha",
    "isBase": false,
    "basePrice": 51,
    "recipes": [
      {
        "id": "scanner_0_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_1": 1,
          "metal_bolt": 4,
          "wire": 2
        }
      }
    ],
    "weight": 10
  },
  "scanner_1": {
    "name": "Scanalyzer Beta",
    "isBase": false,
    "basePrice": 95,
    "recipes": [
      {
        "id": "scanner_1_recipe",
        "yield": 1,
        "inputs": {
          "scanner_0": 1,
          "grating": 5,
          "crystal_lattice_c": 1
        }
      }
    ],
    "weight": 10
  },
  "mining_tool_0": {
    "name": "Crude Mining Laser",
    "isBase": true,
    "basePrice": 50,
    "weight": 10
  },
  "mining_tool_1": {
    "name": "Simple Mining Laser",
    "isBase": false,
    "basePrice": 91,
    "recipes": [
      {
        "id": "mining_tool_1_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_1": 1,
          "focuser": 2
        }
      }
    ],
    "weight": 10
  },
  "mining_tool_1_oc": {
    "name": "Overclocked Mining Laser",
    "isBase": false,
    "basePrice": 212,
    "recipes": [
      {
        "id": "mining_tool_1_oc_recipe",
        "yield": 1,
        "inputs": {
          "mining_tool_1": 1,
          "focuser": 3,
          "coil": 3
        }
      }
    ],
    "weight": 10
  },
  "mining_tool_cold": {
    "name": "Cooling Laser",
    "isBase": false,
    "basePrice": 162,
    "recipes": [
      {
        "id": "mining_tool_cold_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_1": 1,
          "focuser": 2,
          "aquamarine": 5
        }
      }
    ],
    "weight": 10
  },
  "mining_tool_2": {
    "name": "Hi-Pi Laser",
    "isBase": false,
    "basePrice": 1010,
    "recipes": [
      {
        "id": "mining_tool_2_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_2": 1,
          "focuser_2": 3
        }
      }
    ],
    "weight": 25
  },
  "mining_tool_2_oc": {
    "name": "Overclocked Hi-Pi Laser",
    "isBase": false,
    "basePrice": 2240,
    "recipes": [
      {
        "id": "mining_tool_2_oc_recipe",
        "yield": 1,
        "inputs": {
          "mining_tool_2": 1,
          "focuser_2": 5,
          "coil": 10
        }
      }
    ],
    "weight": 25
  },
  "mining_tool_3": {
    "name": "Giant Laser",
    "isBase": true,
    "weight": 50
  },
  "mining_tool_3_oc": {
    "name": "Overclocked Giant Laser",
    "isBase": true,
    "weight": 50
  },
  "fluid_pumping_tool_1": {
    "name": "Simple Hose Pump",
    "isBase": false,
    "basePrice": 289,
    "recipes": [
      {
        "id": "fluid_pumping_tool_1_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_1": 1,
          "pump": 2,
          "plate_1": 1
        }
      }
    ],
    "weight": 10
  },
  "exploding_tool_mk_1": {
    "name": "Single-Tube Missile Launcher",
    "isBase": false,
    "basePrice": 61,
    "recipes": [
      {
        "id": "exploding_tool_mk_1_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_1": 1,
          "metal_sheet_1": 3,
          "metal_bolt": 10
        }
      }
    ],
    "weight": 10
  },
  "exploding_tool_mk_2": {
    "name": "8-Tube Missile Launcher",
    "isBase": true,
    "weight": 10
  },
  "gun_turret_tool": {
    "name": "Small Gun Turret",
    "isBase": true,
    "basePrice": 100,
    "weight": 10
  },
  "gun_turret_tool_1": {
    "name": "Gun Turret",
    "isBase": true,
    "weight": 10
  },
  "pathway_puncher": {
    "name": "Spacetime Puncher",
    "isBase": false,
    "basePrice": 1860,
    "recipes": [
      {
        "id": "pathway_puncher_recipe",
        "yield": 1,
        "inputs": {
          "module_casing_2": 1,
          "graphenoid": 3,
          "focuser_2": 1,
          "grating": 20
        }
      }
    ],
    "weight": 10
  },
  "seeker_missile_0": {
    "name": "Seeker Missile",
    "isBase": true,
    "basePrice": 7.3,
    "weight": 0.1
  },
  "blast_missile_0": {
    "name": "Blasting Missile",
    "isBase": false,
    "basePrice": 3.94,
    "recipes": [
      {
        "id": "blast_missile_0_recipe",
        "yield": 5,
        "inputs": {
          "gunpowder": 8,
          "missile_airframe_small": 5
        }
      }
    ],
    "weight": 0.1
  },
  "combat_missile_anti_matter": {
    "name": "Anti-matter Torpedo",
    "isBase": false,
    "basePrice": 7.8,
    "recipes": [
      {
        "id": "combat_missile_anti_matter_recipe",
        "yield": 3,
        "inputs": {
          "antimatter_full": 1,
          "missile_airframe_small": 1
        }
      }
    ],
    "weight": 0.1
  },
  "beacon": {
    "name": "Quantum Beacon",
    "isBase": false,
    "basePrice": 128,
    "recipes": [
      {
        "id": "beacon_recipe",
        "yield": 1,
        "inputs": {
          "coil": 2,
          "calcified_invariant": 1
        }
      }
    ],
    "weight": 1
  },
  "pathway_ammo": {
    "name": "Pathway Kernel",
    "isBase": false,
    "basePrice": 197,
    "recipes": [
      {
        "id": "pathway_ammo_recipe",
        "yield": 1,
        "inputs": {
          "elmerium": 2,
          "crystal_lattice_m": 5,
          "beacon": 1
        }
      }
    ],
    "weight": 1
  },
  "hypergate_beacon": {
    "name": "Hypergate Beacon",
    "isBase": false,
    "basePrice": 19.7,
    "recipes": [
      {
        "id": "hypergate_beacon_recipe",
        "yield": 1,
        "inputs": {
          "coil": 2
        }
      }
    ],
    "weight": 0.1
  },
  "locked_capsule": {
    "name": "Personal Capsule",
    "isBase": false,
    "basePrice": 19.7,
    "recipes": [
      {
        "id": "locked_capsule_recipe",
        "yield": 1,
        "inputs": {
          "coil": 2
        }
      }
    ],
    "weight": 0.1
  },
  "nitro_capsule": {
    "name": "Nitro Capsule",
    "isBase": true,
    "weight": 1
  },
  "cartridge_iron": {
    "name": "Small Cartridge",
    "isBase": false,
    "basePrice": 0.03,
    "recipes": [
      {
        "id": "cartridge_iron_recipe",
        "yield": 120,
        "inputs": {
          "gunpowder": 1,
          "metal_sheet_1": 1
        }
      }
    ],
    "weight": 0.01
  },
  "p_multi_tool": {
    "name": "Debug Machine",
    "isBase": true,
    "weight": 0.1
  },
  "p_construction_tool": {
    "name": "Construction Tool",
    "isBase": false,
    "basePrice": 13.7,
    "recipes": [
      {
        "id": "p_construction_tool_recipe",
        "yield": 1,
        "inputs": {
          "aluminium_ingot": 1,
          "wire": 1,
          "silicone_gel": 1
        }
      }
    ],
    "weight": 0.1
  },
  "p_dismentling_tool": {
    "name": "Construction Tool 2.0",
    "isBase": false,
    "basePrice": 88,
    "recipes": [
      {
        "id": "p_dismentling_tool_recipe",
        "yield": 1,
        "inputs": {
          "p_construction_tool": 1,
          "focuser": 2,
          "coil": 2
        }
      }
    ],
    "weight": 0.1
  },
  "p_moving_tool": {
    "name": "Construction Tool 3.0",
    "isBase": false,
    "basePrice": 478,
    "recipes": [
      {
        "id": "p_moving_tool_recipe",
        "yield": 1,
        "inputs": {
          "p_dismentling_tool": 1,
          "drone_0": 2,
          "focuser_2": 1
        }
      }
    ],
    "weight": 0.1
  },
  "p_farming_tool": {
    "name": "Farming Tool",
    "isBase": false,
    "basePrice": 85,
    "recipes": [
      {
        "id": "p_farming_tool_recipe",
        "yield": 1,
        "inputs": {
          "metal_sheet_2": 5,
          "focuser": 1,
          "pipe_1": 3
        }
      }
    ],
    "weight": 0.1
  },
  "p_jetpack": {
    "name": "Jetpack",
    "isBase": true,
    "weight": 0.1
  },
  "p_jetpack_v_2": {
    "name": "Jetpack v2",
    "isBase": true,
    "weight": 0.1
  },
  "p_critter_pheromon": {
    "name": "Pheromone Mix",
    "isBase": true,
    "basePrice": 13.7,
    "weight": 1
  },
  "p_thermo_suit": {
    "name": "Thermo Suit Chip",
    "isBase": false,
    "basePrice": 21.8,
    "recipes": [
      {
        "id": "p_thermo_suit_recipe",
        "yield": 1,
        "inputs": {
          "metal_sheet_1": 1,
          "thermal_isolant": 10
        }
      }
    ],
    "weight": 1
  },
  "p_heat_suit": {
    "name": "Heat-Protec Suit Chip",
    "isBase": false,
    "basePrice": 99,
    "recipes": [
      {
        "id": "p_heat_suit_recipe",
        "yield": 1,
        "inputs": {
          "thermal_sheet": 10,
          "thermal_paste": 10
        }
      }
    ],
    "weight": 1
  },
  "p_cold_suit": {
    "name": "Cold-Protec Suit Chip",
    "isBase": false,
    "basePrice": 71,
    "recipes": [
      {
        "id": "p_cold_suit_recipe",
        "yield": 1,
        "inputs": {
          "metal_sheet_2": 2,
          "thermal_isolant": 10,
          "thermal_paste": 10
        }
      }
    ],
    "weight": 1
  },
  "p_rad_suit": {
    "name": "Rad Suit Chip",
    "isBase": false,
    "basePrice": 23.1,
    "recipes": [
      {
        "id": "p_rad_suit_recipe",
        "yield": 1,
        "inputs": {
          "metal_sheet_1": 1,
          "alu_powder": 5,
          "activated_coal": 4
        }
      }
    ],
    "weight": 1
  },
  "access_corpo_1": {
    "name": "CPAF Pass (Test Subject)",
    "isBase": true,
    "weight": 1
  },
  "access_corpo_2": {
    "name": "CPAF Pass (Designer)",
    "isBase": true,
    "weight": 1
  },
  "access_warehouse": {
    "name": "Warehouse Pass",
    "isBase": true,
    "weight": 1
  },
  "access_prospecting": {
    "name": "Prospecting Hub Pass",
    "isBase": true,
    "weight": 1
  },
  "access_mine_1": {
    "name": "Administrative Quarter Pass",
    "isBase": true,
    "weight": 1
  },
  "access_mine_2": {
    "name": "Elevator Pass",
    "isBase": true,
    "weight": 1
  },
  "access_lab_monsters": {
    "name": "Janitor Pass",
    "isBase": true,
    "weight": 1
  },
  "access_dark_2": {
    "name": "[TODO] Director Pass",
    "isBase": true,
    "weight": 1
  },
  "access_dark_4": {
    "name": "[TODO] Maintenance Key",
    "isBase": true,
    "weight": 1
  },
  "drone_0": {
    "name": "Drone",
    "isBase": false,
    "basePrice": 79,
    "recipes": [
      {
        "id": "drone_0_recipe",
        "yield": 1,
        "inputs": {
          "motor": 1,
          "micro_chip": 1,
          "metal_sheet_1": 1,
          "metal_bolt": 6
        }
      }
    ],
    "weight": 1
  },
  "shuttle_0": {
    "name": "Shuttle",
    "isBase": false,
    "basePrice": 3090,
    "recipes": [
      {
        "id": "shuttle_0_recipe",
        "yield": 1,
        "inputs": {
          "thruster_0": 1,
          "storage_2": 1,
          "steel_casing_mk_1": 4,
          "support_casing": 6,
          "micro_chip": 1,
          "carbonic_fuel": 20
        }
      }
    ],
    "weight": 50
  },
  "shuttle_1": {
    "name": "Freighter",
    "isBase": false,
    "basePrice": 2820,
    "recipes": [
      {
        "id": "shuttle_1_recipe",
        "yield": 1,
        "inputs": {
          "steel_casing_mk_1": 6,
          "support_casing": 6,
          "storage_1": 1,
          "semiconductor": 2,
          "wire": 3
        }
      }
    ],
    "weight": 1
  },
  "pshuttle": {
    "name": "Power Shuttle",
    "isBase": false,
    "basePrice": 2820,
    "recipes": [
      {
        "id": "pshuttle_recipe",
        "yield": 1,
        "inputs": {
          "steel_casing_mk_1": 6,
          "support_casing": 6,
          "storage_1": 1,
          "semiconductor": 2,
          "wire": 3
        }
      }
    ],
    "weight": 1
  },
  "fps_instance_entrance": {
    "name": "FPS_Instance_Entrance",
    "isBase": true,
    "weight": 1
  },
  "space_station_0": {
    "name": "Threshold Station",
    "isBase": true,
    "weight": 1
  },
  "space_station_1": {
    "name": "Solar Alpha Station",
    "isBase": true,
    "weight": 1
  },
  "space_station_4": {
    "name": "Justice Station",
    "isBase": true,
    "weight": 1
  },
  "space_station_5": {
    "name": "Horizon Station",
    "isBase": true,
    "weight": 1
  },
  "space_station_2": {
    "name": "Terminus Station",
    "isBase": true,
    "weight": 1
  },
  "space_station_3": {
    "name": "Cairn Station",
    "isBase": true,
    "weight": 1
  },
  "b_control_base": {
    "name": "Base Command Center",
    "isBase": false,
    "basePrice": 334,
    "recipes": [
      {
        "id": "b_control_base_recipe",
        "yield": 1,
        "inputs": {
          "control_base_kit": 1
        }
      }
    ],
    "weight": 1
  },
  "b_control_base_2": {
    "name": "Command Tower",
    "isBase": false,
    "basePrice": 2450,
    "recipes": [
      {
        "id": "b_control_base_2_recipe",
        "yield": 1,
        "inputs": {
          "plate_1": 50,
          "beam_1": 25,
          "coil": 80,
          "concrete": 250
        }
      }
    ],
    "weight": 1
  },
  "b_control_base_3_ph": {
    "name": "Command Relay",
    "isBase": true,
    "weight": 1
  },
  "b_control_base_corpo_1": {
    "name": "Corporation Command Center",
    "isBase": false,
    "basePrice": 306000,
    "recipes": [
      {
        "id": "b_control_base_corpo_1_recipe",
        "yield": 1,
        "inputs": {
          "plate_1": 2000,
          "plate_2": 2000,
          "beam_1": 4000,
          "coil": 6000,
          "concrete": 10000
        }
      }
    ],
    "weight": 1
  },
  "b_extractor": {
    "name": "Extractor",
    "isBase": false,
    "basePrice": 64,
    "recipes": [
      {
        "id": "b_extractor_recipe",
        "yield": 1,
        "inputs": {
          "motor": 1,
          "concrete": 4
        }
      }
    ],
    "weight": 1
  },
  "b_liquid_extractor": {
    "name": "Liquid Extractor",
    "isBase": false,
    "basePrice": 3710,
    "recipes": [
      {
        "id": "b_liquid_extractor_recipe",
        "yield": 1,
        "inputs": {
          "beam_1": 4,
          "plate_1": 40,
          "concrete": 10,
          "pump": 20,
          "pipe_1": 80
        }
      }
    ],
    "weight": 1
  },
  "b_extractor_1_ph": {
    "name": "Advanced Extractor",
    "isBase": false,
    "basePrice": 1180,
    "recipes": [
      {
        "id": "b_extractor_1_ph_recipe",
        "yield": 1,
        "inputs": {
          "beam_2": 4,
          "plate_2": 10,
          "mining_tool_1": 3,
          "motor": 2,
          "concrete": 20
        }
      }
    ],
    "weight": 1
  },
  "b_solar_panel": {
    "name": "Solar Plant",
    "isBase": false,
    "basePrice": 424,
    "recipes": [
      {
        "id": "b_solar_panel_recipe",
        "yield": 1,
        "inputs": {
          "beam_1": 1,
          "plate_1": 9,
          "solar_cell": 36
        }
      }
    ],
    "weight": 1
  },
  "b_warehouse": {
    "name": "Warehouse",
    "isBase": false,
    "basePrice": 352,
    "recipes": [
      {
        "id": "b_warehouse_recipe",
        "yield": 1,
        "inputs": {
          "metal_sheet_1": 50,
          "beam_1": 4,
          "plate_1": 4,
          "concrete": 20
        }
      }
    ],
    "weight": 1
  },
  "b_organiser": {
    "name": "Drone Dispatcher",
    "isBase": false,
    "basePrice": 19.1,
    "recipes": [
      {
        "id": "b_organiser_recipe",
        "yield": 1,
        "inputs": {
          "metal_sheet_1": 1,
          "plate_1": 1
        }
      }
    ],
    "weight": 1
  },
  "b_chest": {
    "name": "Trading Box",
    "isBase": false,
    "basePrice": 31.2,
    "recipes": [
      {
        "id": "b_chest_recipe",
        "yield": 1,
        "inputs": {
          "metal_sheet_1": 10
        }
      }
    ],
    "weight": 1
  },
  "b_cistern": {
    "name": "Cistern",
    "isBase": false,
    "basePrice": 3240,
    "recipes": [
      {
        "id": "b_cistern_recipe",
        "yield": 1,
        "inputs": {
          "pump": 10,
          "concrete": 20,
          "pipe_1": 100,
          "plate_1": 80,
          "silicone_gel": 100
        }
      }
    ],
    "weight": 1
  },
  "b_ftlcistern": {
    "name": "Mag-Plasma Cistern",
    "isBase": false,
    "basePrice": 2660,
    "recipes": [
      {
        "id": "b_ftlcistern_recipe",
        "yield": 1,
        "inputs": {
          "plate_1": 4,
          "concrete": 20,
          "magnetic_chamber": 10,
          "mag_sheet": 10
        }
      }
    ],
    "weight": 1
  },
  "b_ftlgatherer": {
    "name": "Cosmic Condenser",
    "isBase": false,
    "basePrice": 142,
    "recipes": [
      {
        "id": "b_ftlgatherer_recipe",
        "yield": 1,
        "inputs": {
          "beam_1": 4,
          "plate_1": 3
        }
      }
    ],
    "weight": 1
  },
  "b_crystaliser": {
    "name": "Crystallizer",
    "isBase": false,
    "basePrice": 274,
    "recipes": [
      {
        "id": "b_crystaliser_recipe",
        "yield": 1,
        "inputs": {
          "beam_1": 2,
          "plate_1": 10,
          "concrete": 10,
          "pipe_1": 10
        }
      }
    ],
    "weight": 1
  },
  "b_farm": {
    "name": "Xenic Farm",
    "isBase": false,
    "basePrice": 1250,
    "recipes": [
      {
        "id": "b_farm_recipe",
        "yield": 1,
        "inputs": {
          "beam_1": 10,
          "plate_1": 10,
          "concrete": 50,
          "pump": 4,
          "pipe_1": 60
        }
      }
    ],
    "weight": 1
  },
  "b_antimatter_synth_ph": {
    "name": "Antimatter Synthesizer",
    "isBase": false,
    "basePrice": 394,
    "recipes": [
      {
        "id": "b_antimatter_synth_ph_recipe",
        "yield": 1,
        "inputs": {
          "beam_1": 10,
          "plate_1": 10
        }
      }
    ],
    "weight": 1
  },
  "b_labo_ph": {
    "name": "Laboratory",
    "isBase": false,
    "basePrice": 3360,
    "recipes": [
      {
        "id": "b_labo_ph_recipe",
        "yield": 1,
        "inputs": {
          "focuser_3": 1,
          "plate_1": 2,
          "motor": 2
        }
      }
    ],
    "weight": 1
  },
  "b_connector": {
    "name": "Cable",
    "isBase": false,
    "basePrice": 2.16,
    "recipes": [
      {
        "id": "b_connector_recipe",
        "yield": 1,
        "inputs": {
          "wire": 1
        }
      }
    ],
    "weight": 1
  },
  "b_electric_pillar": {
    "name": "Pylon",
    "isBase": false,
    "basePrice": 9.8,
    "recipes": [
      {
        "id": "b_electric_pillar_recipe",
        "yield": 1,
        "inputs": {
          "coil": 1
        }
      }
    ],
    "weight": 1
  },
  "b_generator": {
    "name": "Fuel Power Plant",
    "isBase": false,
    "basePrice": 830,
    "recipes": [
      {
        "id": "b_generator_recipe",
        "yield": 1,
        "inputs": {
          "beam_1": 5,
          "plate_1": 1,
          "concrete": 5,
          "motor": 10
        }
      }
    ],
    "weight": 1
  },
  "b_generator_2": {
    "name": "Advanced Fuel Power Plant",
    "isBase": true,
    "basePrice": 251,
    "weight": 1
  },
  "b_fusion_generator": {
    "name": "Fusion Plant",
    "isBase": false,
    "basePrice": 2120,
    "recipes": [
      {
        "id": "b_fusion_generator_recipe",
        "yield": 1,
        "inputs": {
          "beam_1": 1,
          "plate_1": 36,
          "solar_cell": 216
        }
      }
    ],
    "weight": 1
  },
  "b_heat_recouper": {
    "name": "Heat Capacitor",
    "isBase": true,
    "basePrice": 2120,
    "weight": 1
  },
  "b_power_transmitter": {
    "name": "Power Transmitter",
    "isBase": false,
    "basePrice": 510,
    "recipes": [
      {
        "id": "b_power_transmitter_recipe",
        "yield": 1,
        "inputs": {
          "beam_1": 2,
          "plate_1": 5,
          "concrete": 25,
          "crystal_lattice_c": 2,
          "graphenoid": 1
        }
      }
    ],
    "weight": 1
  },
  "b_battery": {
    "name": "Battery Array",
    "isBase": false,
    "basePrice": 6800,
    "recipes": [
      {
        "id": "b_battery_recipe",
        "yield": 1,
        "inputs": {
          "beam_1": 4,
          "plate_1": 4,
          "battery": 100,
          "coil": 4
        }
      }
    ],
    "weight": 1
  },
  "b_factory_1": {
    "name": "Assembler",
    "isBase": false,
    "basePrice": 458,
    "recipes": [
      {
        "id": "b_factory_1_recipe",
        "yield": 1,
        "inputs": {
          "beam_1": 4,
          "plate_1": 8,
          "concrete": 40,
          "motor": 3
        }
      }
    ],
    "weight": 1
  },
  "b_factory_2": {
    "name": "Factory",
    "isBase": false,
    "basePrice": 7500,
    "recipes": [
      {
        "id": "b_factory_2_recipe",
        "yield": 1,
        "inputs": {
          "beam_1": 40,
          "plate_1": 40,
          "concrete": 200,
          "motor": 10,
          "micro_chip": 10,
          "actuator": 4
        }
      }
    ],
    "weight": 1
  },
  "b_smelter": {
    "name": "Smelter",
    "isBase": false,
    "basePrice": 18.6,
    "recipes": [
      {
        "id": "b_smelter_recipe",
        "yield": 1,
        "inputs": {
          "plate_1": 1,
          "concrete": 10
        }
      }
    ],
    "weight": 1
  },
  "b_smelter_sa": {
    "name": "Micro-Furnace",
    "isBase": false,
    "basePrice": 38.6,
    "recipes": [
      {
        "id": "b_smelter_sa_recipe",
        "yield": 1,
        "inputs": {
          "plate_1": 2,
          "concrete": 5,
          "calcite": 1
        }
      }
    ],
    "weight": 1
  },
  "b_chemical": {
    "name": "Chemical Factory",
    "isBase": false,
    "basePrice": 2880,
    "recipes": [
      {
        "id": "b_chemical_recipe",
        "yield": 1,
        "inputs": {
          "beam_1": 8,
          "plate_1": 80,
          "concrete": 40,
          "pump": 5,
          "pipe_1": 120
        }
      }
    ],
    "weight": 1
  },
  "b_bottling_plant": {
    "name": "Bottling Plant",
    "isBase": false,
    "basePrice": 403,
    "recipes": [
      {
        "id": "b_bottling_plant_recipe",
        "yield": 1,
        "inputs": {
          "pump": 1,
          "plate_1": 10,
          "pipe_1": 10,
          "metal_sheet_2": 5,
          "concrete": 5
        }
      }
    ],
    "weight": 1
  },
  "b_recycling_plant": {
    "name": "Recycling Plant",
    "isBase": false,
    "basePrice": 900,
    "recipes": [
      {
        "id": "b_recycling_plant_recipe",
        "yield": 1,
        "inputs": {
          "beam_1": 8,
          "plate_1": 20,
          "concrete": 50,
          "motor": 5
        }
      }
    ],
    "weight": 1
  },
  "b_shuttle_pad": {
    "name": "Shuttle Landing Pad",
    "isBase": false,
    "basePrice": 377,
    "recipes": [
      {
        "id": "b_shuttle_pad_recipe",
        "yield": 1,
        "inputs": {
          "metal_sheet_1": 25,
          "beam_1": 2,
          "plate_1": 4,
          "concrete": 20,
          "beacon": 1
        }
      }
    ],
    "weight": 1
  },
  "b_landing_pad": {
    "name": "Landing Pad",
    "isBase": false,
    "basePrice": 138,
    "recipes": [
      {
        "id": "b_landing_pad_recipe",
        "yield": 1,
        "inputs": {
          "plate_1": 8,
          "concrete": 40
        }
      }
    ],
    "weight": 1
  },
  "b_shipyard": {
    "name": "Shipyard",
    "isBase": false,
    "basePrice": 810,
    "recipes": [
      {
        "id": "b_shipyard_recipe",
        "yield": 1,
        "inputs": {
          "beam_1": 12,
          "plate_1": 30,
          "concrete": 90
        }
      }
    ],
    "weight": 1
  },
  "b_standalone_foundation": {
    "name": "Stand-alone Foundation",
    "isBase": true,
    "weight": 1
  },
  "b_pathway_holder": {
    "name": "Pathway Stand",
    "isBase": false,
    "basePrice": 990,
    "recipes": [
      {
        "id": "b_pathway_holder_recipe",
        "yield": 1,
        "inputs": {
          "beam_1": 12,
          "plate_1": 30,
          "concrete": 90,
          "beacon": 1
        }
      }
    ],
    "weight": 1
  },
  "b_atmo_dome": {
    "name": "Atmo-dome Generator",
    "isBase": false,
    "basePrice": 142,
    "recipes": [
      {
        "id": "b_atmo_dome_recipe",
        "yield": 1,
        "inputs": {
          "beam_1": 4,
          "plate_1": 3
        }
      }
    ],
    "weight": 1
  },
  "b_observatory": {
    "name": "Observatory",
    "isBase": false,
    "basePrice": 142,
    "recipes": [
      {
        "id": "b_observatory_recipe",
        "yield": 1,
        "inputs": {
          "beam_1": 4,
          "plate_1": 3
        }
      }
    ],
    "weight": 1
  },
  "b_hypergate": {
    "name": "Hypergate",
    "isBase": false,
    "basePrice": 640,
    "recipes": [
      {
        "id": "b_hypergate_recipe",
        "yield": 1,
        "inputs": {
          "b_landing_pad": 1,
          "beam_1": 12,
          "plate_1": 12
        }
      }
    ],
    "weight": 1
  },
  "b_sun_station": {
    "name": "Sun Station",
    "isBase": false,
    "basePrice": 2120,
    "recipes": [
      {
        "id": "b_sun_station_recipe",
        "yield": 1,
        "inputs": {
          "beam_1": 1,
          "plate_1": 36,
          "solar_cell": 216
        }
      }
    ],
    "weight": 1
  },
  "b_deco_test": {
    "name": "Test deco",
    "isBase": true,
    "weight": 1
  },
  "b_deco_pirate": {
    "name": "Pirate Hologram",
    "isBase": true,
    "weight": 1
  },
  "b_deco_transcendance": {
    "name": "Transcendance Hologram",
    "isBase": true,
    "weight": 1
  },
  "b_deco_planet": {
    "name": "Planet Hologram",
    "isBase": true,
    "weight": 1
  },
  "b_deco_sakura": {
    "name": "Sakura Hologram",
    "isBase": true,
    "weight": 1
  },
  "b_deco_snake": {
    "name": "Snake Hologram",
    "isBase": true,
    "weight": 1
  },
  "b_deco_diver": {
    "name": "Diver Hologram",
    "isBase": true,
    "weight": 1
  },
  "unknown": {
    "name": "???",
    "isBase": true,
    "weight": 5
  },
  "instance_entrance": {
    "name": "InstanceEntrance",
    "isBase": true,
    "weight": 1
  },
  "instance_building": {
    "name": "InstanceBuilding",
    "isBase": true,
    "weight": 1
  },
  "station_floor": {
    "name": "StationFloor",
    "isBase": true,
    "weight": 1
  },
  "foundation": {
    "name": "Foundation",
    "isBase": true,
    "weight": 1
  }
};
