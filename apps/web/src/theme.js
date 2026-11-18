/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

// Central Color Theme definition based on ColorHunt palette:
// https://colorhunt.co/palette/e5cb90fff3c834a99d458393
// Iteration: Dominant Palette Architecture (Rich Ocean, Vibrant Teal, Warm Sand & Cream)

export const THEME = {
  // Core 4 Palette Hex Values
  cream: '#FFF3C8',
  sand: '#E5CB90',
  teal: '#34A99D',
  ocean: '#458393',

  // Deep Ocean Tones (TopBar, Code Editor & Terminal)
  oceanHeader: '#25505C',
  oceanDeep: '#1B3E48',
  oceanDarker: '#132B32',
  oceanTerminal: '#0D1E22',

  // Warm Sand & Cream Surfaces (Canvas & Panels)
  canvasWarm: '#F8F3E5',
  surfaceSand: '#FAF3E3',
  surfaceSandWarm: '#F5ECCF',
  surfaceCream: '#FFFDF7',
  surfaceCard: '#FFFFFF',

  // Semantic Typography
  textDark: '#14252D',
  textMuted: '#56727D',
  textOceanMuted: '#8EAAB2',
  textCream: '#FFF3C8',

  // Soft Palette Tints
  softTeal: '#E6F6F4',
  softOcean: '#EDF5F7',
  softSand: '#F5ECCF',
  softCream: '#FFF3C8',

  // Architectural Borders
  borderSand: '#E5CB90',
  borderSandSoft: 'rgba(229, 203, 144, 0.65)',
  borderTeal: 'rgba(52, 169, 157, 0.5)',
  borderOcean: 'rgba(69, 131, 147, 0.35)',

  // Palette Gradients
  tealOceanGradient: 'linear-gradient(135deg, #34A99D 0%, #458393 100%)',
  oceanHeaderGradient: 'linear-gradient(135deg, #1E444F 0%, #295764 50%, #458393 100%)',
  sandCreamGradient: 'linear-gradient(135deg, #FFF3C8 0%, #E5CB90 100%)',
  glassDockGradient: 'linear-gradient(135deg, rgba(255, 243, 200, 0.95) 0%, rgba(255, 253, 247, 0.98) 50%, rgba(255, 243, 200, 0.95) 100%)'
};
