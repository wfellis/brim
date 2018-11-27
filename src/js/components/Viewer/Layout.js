/* @flow */

import ColumnWidths from "./ColumnWidths"
import AutoLayout from "./AutoLayout"
import FixedLayout from "./FixedLayout"
import Columns from "../../models/Columns"

export type Width = number | "auto"

export interface Layout {
  width: number;
  height: number;
  size: number;
  rowH: number;
  columnWidths?: ColumnWidths;
  columnsRename: Columns;

  viewHeight(): number;
  viewWidth(): number;
  listHeight(): number;
  listWidth(): Width;
  rowHeight(): number;
  rowWidth(): Width;
  cellHeight(): number;
  cellWidth(string): Width;
}

export const create = (args: $ReadOnly<Layout>) => {
  const {columnWidths} = args
  if (columnWidths) {
    return new FixedLayout({columnWidths, ...args})
  } else {
    return new AutoLayout(args)
  }
}
