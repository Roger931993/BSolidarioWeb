export class FunctionObject {
  constructor() {}

  static getProgressPercentage(obj: Record<string, any>): number {
    const keys = Object.keys(obj).filter((key) => typeof obj[key] !== 'object'); // solo campos directos
    const total = keys.length;
    const filled = keys.filter(
      (key) => obj[key] !== null && obj[key] !== '' && obj[key] !== undefined
    ).length;
    return Math.round((filled / total) * 100);
  }

  static distinctBy<T>(
    array: T[],
    keySelector: (item: T) => string | number
  ): T[] {
    const seen = new Set<string | number>();
    return array.filter((item) => {
      const key = keySelector(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  static groupAndSumByKey<T extends Record<string, any>>(
    data: T[],
    groupKey: keyof T,
    sumFields: (keyof T)[]
  ): T[] {
    const grouped: Record<string, T> = {};

    for (const item of data) {
      const key = item[groupKey] as string;

      if (!grouped[key]) {
        grouped[key] = { ...item };
      } else {
        for (const field of sumFields) {
          (grouped[key][field] as number) += item[field] as number;
        }
      }
    }

    return Object.values(grouped);
  }

  static buildHierarchyTree<T>(
    items: T[],
    idField: keyof T,
    parentField: keyof T
  ): T[] {
    const map = new Map<any, T & { children: T[] }>();
    const roots: (T & { children: T[] })[] = [];

    // Crear nodos con children
    items.forEach((item) => {
      map.set(item[idField], { ...item, children: [] });
    });

    // Enlazar hijos con sus padres
    map.forEach((node) => {
      const parentId = node[parentField];
      if (parentId && map.has(parentId)) {
        map.get(parentId)!.children.push(node);
      } else {
        roots.push(node);
      }
    });

    return roots;
  }

  static flattenTree<T>(
    tree: (T & { children?: T[] })[],
    result: T[] = []
  ): T[] {
    tree.forEach((node) => {
      const { children, ...rest } = node;
      result.push(rest as T);
      if (children?.length) {
        this.flattenTree(children, result);
      }
    });
    return result;
  }
}
