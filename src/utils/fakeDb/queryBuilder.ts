export type Row = Record<string, unknown>;
export type WhereInput = string | number | Record<string, unknown>;
export type Resolver = (tableName: string) => Row[];

type JoinType = 'inner' | 'left' | 'outer';

export interface JoinSpec {
  type: JoinType;
  table: string;
  localKey: string;
  foreignKey: string;
}

interface OrderSpec {
  column: string;
  direction: 'asc' | 'desc';
}

// ─── Where ────────────────────────────────────────────────────────────────────

export function matchWhere(row: Row, condition: WhereInput): boolean {
  if (typeof condition === 'string' || typeof condition === 'number') {
    return String(row.id) === String(condition);
  }
  return Object.entries(condition).every(([k, v]) => row[k] === v);
}

// ─── Order ────────────────────────────────────────────────────────────────────

function compareValues(a: unknown, b: unknown): number {
  if (a === b) return 0;
  if (a == null) return -1;
  if (b == null) return 1;
  if (typeof a === 'string' && typeof b === 'string') return a.localeCompare(b);
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return String(a as any) < String(b as any) ? -1 : 1;
}

// ─── Joins ────────────────────────────────────────────────────────────────────

function innerJoin(left: Row[], right: Row[], localKey: string, foreignKey: string): Row[] {
  const result: Row[] = [];
  for (const row of left) {
    for (const jr of right) {
      if (row[localKey] === jr[foreignKey]) result.push({ ...row, ...jr });
    }
  }
  return result;
}

function leftJoin(left: Row[], right: Row[], localKey: string, foreignKey: string): Row[] {
  const result: Row[] = [];
  for (const row of left) {
    const matches = right.filter(jr => row[localKey] === jr[foreignKey]);
    if (matches.length > 0) {
      for (const jr of matches) result.push({ ...row, ...jr });
    } else {
      result.push({ ...row });
    }
  }
  return result;
}

function outerJoin(left: Row[], right: Row[], localKey: string, foreignKey: string): Row[] {
  const result: Row[] = [];
  const matched = new Set<Row>();
  for (const row of left) {
    const matches = right.filter(jr => row[localKey] === jr[foreignKey]);
    if (matches.length > 0) {
      for (const jr of matches) {
        result.push({ ...row, ...jr });
        matched.add(jr);
      }
    } else {
      result.push({ ...row });
    }
  }
  for (const jr of right) {
    if (!matched.has(jr)) result.push({ ...jr });
  }
  return result;
}

export function applyJoin(left: Row[], right: Row[], spec: JoinSpec): Row[] {
  const { type, localKey, foreignKey } = spec;
  if (type === 'inner') return innerJoin(left, right, localKey, foreignKey);
  if (type === 'left') return leftJoin(left, right, localKey, foreignKey);
  return outerJoin(left, right, localKey, foreignKey);
}

// ─── SelectBuilder ────────────────────────────────────────────────────────────

export class SelectBuilder<T extends Row = Row> {
  private resolve: Resolver;
  private tableName: string;
  private _where?: WhereInput;
  private _limit?: number;
  private _offset?: number;
  private _orderBy: OrderSpec[] = [];
  private _joins: JoinSpec[] = [];

  constructor(resolve: Resolver, tableName: string) {
    this.resolve = resolve;
    this.tableName = tableName;
  }

  where(condition: WhereInput): SelectBuilder<T> {
    this._where = condition;
    return this;
  }

  limit(n: number): SelectBuilder<T> {
    this._limit = n;
    return this;
  }

  offset(n: number): SelectBuilder<T> {
    this._offset = n;
    return this;
  }

  orderBy(column: string, direction: 'asc' | 'desc' = 'asc'): SelectBuilder<T> {
    this._orderBy.push({ column, direction });
    return this;
  }

  join(table: string, localKey: string, foreignKey: string): SelectBuilder<T> {
    this._joins.push({ type: 'inner', table, localKey, foreignKey });
    return this;
  }

  leftJoin(table: string, localKey: string, foreignKey: string): SelectBuilder<T> {
    this._joins.push({ type: 'left', table, localKey, foreignKey });
    return this;
  }

  outerJoin(table: string, localKey: string, foreignKey: string): SelectBuilder<T> {
    this._joins.push({ type: 'outer', table, localKey, foreignKey });
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/require-await -- Fake Promise return
  async findMany(): Promise<T[]> {
    let rows: Row[] = this.resolve(this.tableName);

    for (const spec of this._joins) {
      rows = applyJoin(rows, this.resolve(spec.table), spec);
    }

    if (this._where !== undefined) {
      const condition = this._where;
      rows = rows.filter(r => matchWhere(r, condition));
    }

    if (this._orderBy.length > 0) {
      rows = [...rows].sort((a, b) => {
        for (const { column, direction } of this._orderBy) {
          const cmp = compareValues(a[column], b[column]);
          if (cmp !== 0) return direction === 'asc' ? cmp : -cmp;
        }
        return 0;
      });
    }

    if (this._offset !== undefined) rows = rows.slice(this._offset);
    if (this._limit !== undefined) rows = rows.slice(0, this._limit);

    return rows as T[];
  }

  async findOne(): Promise<T | null> {
    return (await this.findMany())[0] ?? null;
  }
}
