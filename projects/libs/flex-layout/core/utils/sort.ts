interface WithPriority {
  priority?: number;
}

/** HOF to sort the breakpoints by descending priority */
export function sortDescendingPriority<T extends WithPriority>(
  a: T | null,
  b: T | null,
): number {
  const priorityA = a ? a.priority || 0 : 0;
  const priorityB = b ? b.priority || 0 : 0;
  return priorityB - priorityA;
}

/** HOF to sort the breakpoints by ascending priority */
export function sortAscendingPriority<T extends WithPriority>(
  a: T,
  b: T,
): number {
  const pA = a.priority || 0;
  const pB = b.priority || 0;
  return pA - pB;
}
