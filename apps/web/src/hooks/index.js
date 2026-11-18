/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useState, useCallback } from 'react';

/**
 * Manage a value synchronized with window.localStorage.
 */
export function useLocalStorageState(key, fallbackValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : fallbackValue;
    } catch {
      return fallbackValue;
    }
  });

  const updateValue = useCallback(
    (nextValue) => {
      setValue((prev) => {
        const resolved =
          typeof nextValue === 'function' ? nextValue(prev) : nextValue;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          // Ignore storage quota or serialization errors in restricted contexts.
        }
        return resolved;
      });
    },
    [key],
  );

  return [value, updateValue];
}
