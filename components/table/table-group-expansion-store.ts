/**
 * Onflo Design System — Table Group Expansion Store
 *
 * Persists AG Grid row group expansion state to localStorage so the user's
 * expanded/collapsed choices survive page navigations and browser refreshes.
 *
 * Usage (in your AG Grid host component):
 *
 *   import { DsTableGroupExpansionStore } from '@onflo/design-system';
 *
 *   private expansionStore = new DsTableGroupExpansionStore('my-table-groups');
 *
 *   gridOptions: GridOptions = {
 *     isGroupOpenByDefault: (params) =>
 *       this.expansionStore.isGroupOpenByDefault(params),
 *     onRowGroupOpened: (event) =>
 *       this.expansionStore.onRowGroupOpened(event),
 *   };
 *
 * The storageKey should be unique per grid/page so multiple grids on different
 * pages don't share expansion state.
 *
 * Groups default to collapsed. Only explicitly opened groups are stored.
 * Removing a group column clears its stored key automatically on next open/close
 * because the key is derived from the full ancestor path.
 */

/** Minimal row node surface needed for building a stable storage key. */
export interface DsGroupNode {
  /** The field (column) being grouped on at this level. */
  field: string | null;
  /** The grouped value at this level. */
  key: string | null;
  /** Parent node — used to build the full ancestor path key. */
  parent?: DsGroupNode | null;
}

export class DsTableGroupExpansionStore {
  private readonly _storageKey: string;

  constructor(storageKey: string) {
    this._storageKey = storageKey;
  }

  /**
   * Pass as `isGroupOpenByDefault` in AG Grid gridOptions.
   * Returns true for any group the user previously expanded.
   */
  isGroupOpenByDefault(params: { rowNode: DsGroupNode }): boolean {
    const store = this._read();
    return store[this._nodeKey(params.rowNode)] === true;
  }

  /**
   * Pass as `onRowGroupOpened` in AG Grid gridOptions.
   * Saves or clears the expanded state for the toggled group.
   */
  onRowGroupOpened(event: { node: DsGroupNode & { expanded: boolean } }): void {
    const store = this._read();
    const key = this._nodeKey(event.node);
    if (event.node.expanded) {
      store[key] = true;
    } else {
      delete store[key];
    }
    try {
      localStorage.setItem(this._storageKey, JSON.stringify(store));
    } catch {
      // Storage quota exceeded — silently ignore
    }
  }

  /** Removes all stored expansion state for this grid instance. */
  clear(): void {
    try {
      localStorage.removeItem(this._storageKey);
    } catch {
      // Silently ignore
    }
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  /**
   * Derives a stable key from the full ancestor path of the group node.
   * Example: "country:USA→department:Engineering"
   * Using → (U+2192) as separator to avoid collisions with common value chars.
   */
  private _nodeKey(node: DsGroupNode): string {
    const parts: string[] = [];
    let current: DsGroupNode | null | undefined = node;
    while (current && current.field != null) {
      parts.unshift(`${current.field}:${current.key ?? ''}`);
      current = current.parent;
    }
    return parts.join('\u2192');
  }

  private _read(): Record<string, true> {
    try {
      return JSON.parse(localStorage.getItem(this._storageKey) ?? '{}');
    } catch {
      return {};
    }
  }
}
