/**
 * Onflo Design System — AG Grid Theme
 *
 * Pre-configured AG Grid theme for use with all Onflo tables.
 * Built on Quartz (AG Grid's modern default) with:
 *   - Material icon set — matches Onflo's Material Symbols Rounded usage
 *   - Standard density row/header height (56px)
 *   - Onflo spacing base unit (8px)
 *   - AG Grid's native borders disabled — ds-table-header-cell and
 *     ds-table-row-cell manage their own borders via Onflo tokens
 *
 * Color, typography, and surface tokens are applied separately via CSS custom
 * properties in _table-ag-theme.scss — they cannot be set programmatically
 * because they reference CSS variables that resolve at runtime.
 *
 * Usage:
 *   import { onfloTheme } from '@onflo/design-system';
 *
 *   gridOptions: GridOptions = {
 *     theme: onfloTheme,
 *     defaultColDef: DS_TABLE_DEFAULT_COL_DEF,
 *     // ...
 *   };
 *
 * Density variants:
 *   The default density is 56px (standard). To switch density, set
 *   --ag-row-height and --ag-header-height on the grid's host element.
 *   These CSS custom properties override the withParams() defaults:
 *
 *   Comfortable (68px):
 *     .your-grid-host { --ag-row-height: 68px; --ag-header-height: 68px; }
 *
 *   Compact (42px):
 *     .your-grid-host { --ag-row-height: 42px; --ag-header-height: 42px; }
 *
 *   Note: also update ds-table-header-cell and ds-table-row-cell host heights
 *   to match — those components manage their own cell height independently.
 */

import { iconSetMaterial, themeQuartz } from 'ag-grid-community';
import type { Theme } from 'ag-grid-community';

export const onfloTheme: Theme = themeQuartz
  .withPart(iconSetMaterial)
  .withParams({

    // ── Sizing — must be set here for AG Grid's virtual row height ──────────
    // AG Grid uses these values for DOM virtualisation (row count in viewport,
    // scroll height, row positioning). Setting height only in CSS is not enough.
    rowHeight: 56,        // standard density; tokens: --color-table-cell-height-standard-height
    headerHeight: 56,     // matches ds-table-header-cell $cell-height
    iconSize: 20,         // matches ds-icon--sm (20px / opsz 20)
    spacing: 8,           // matches --spacing-sm — base unit for AG Grid internal spacing

    // ── Cell padding — zeroed; custom renderers own all internal layout ────
    // The Quartz base theme injects --ag-cell-horizontal-padding:
    // calc(var(--ag-grid-size) * 3) = 24px per side when spacing is 8.
    // ds-table-header-cell and ds-table-row-cell fill 100% of the AG Grid
    // cell container and manage their own internal padding via Onflo tokens.
    // Leaving the Quartz default in place creates 48px of dead space per
    // column and causes the gap-between-columns and last-column-width issues.
    cellHorizontalPadding: 0,

    // ── Borders — disabled; our custom renderers own all border rendering ───
    // ds-table-header-cell and ds-table-row-cell each apply their own
    // border-bottom via Onflo tokens. Disabling AG Grid's borders prevents
    // double-border artifacts on cells and headers.
    rowBorder: false,
    columnBorder: false,
    headerRowBorder: false,
    headerColumnBorder: false,
    wrapperBorder: false,

  });
