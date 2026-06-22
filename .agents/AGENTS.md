# SpaceCraft Calculator Project

## Overview
This project is a crafting and value analysis calculator. It allows users to calculate base resources, intermediate crafting steps, and perform value analysis on crafting recipes.

## Technology Stack
- **Framework:** Vue 3 with Vite
- **Language:** TypeScript
- **State Management:** Pinia
- **UI Library:** PrimeVue and PrimeIcons
- **Styling:** Custom CSS with PrimeVue themes

## Project Structure
- `src/App.vue`: Main application layout with tabs for Calculator, Recipe Database, Prices, and Value Analysis.
- `src/components/`: Vue components for each of the main features (`RecipeCalculator.vue`, `RecipeDatabase.vue`, `PriceCalculator.vue`, `ProfitAnalyzer.vue`).
- `src/stores/`: Contains Pinia stores, specifically `craftingStore.ts` for managing application state, inventory, and crafting logic.
- `src/data/`: Static data files (e.g., `items.ts`).
- `recipes.json`: Master database file containing all the crafting recipes in JSON format.
- `src/types/`: TypeScript interfaces and type definitions.
- `src/utils/`: Helper functions.

## Context & Guidelines
- **Recipe Data**: Any additions or modifications to the recipes are typically handled in `recipes.json` or through the `RecipeDatabase` component/store. 
- **Crafting Flow**: The calculator manages raw materials and intermediate items needed to craft a target item. State is maintained in the Pinia store (`craftingStore.ts`), which calculates inventory subtractions, deficits, and crafting sequences.
- **Aesthetics**: The application uses dark mode, custom CSS themes, and PrimeVue components. When making UI changes, ensure they align with the modern, dark space-themed aesthetics. Use PrimeIcons for icons.
- **Build/Dev**: Run `npm run dev` to start the development server. Use `npm run build` to build.
