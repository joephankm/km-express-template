import { SelectBuilder, matchWhere, type Row, type WhereInput, type Resolver } from './queryBuilder';

// ─── UpdateBuilder ────────────────────────────────────────────────────────────

export class UpdateBuilder<T extends Row = Row> {
  private resolve: Resolver;
  private tableName: string;
  private data: Record<string, unknown>;
  private _where?: WhereInput;

  constructor(resolve: Resolver, tableName: string, data: Record<string, unknown>) {
    this.resolve = resolve;
    this.tableName = tableName;
    this.data = data;
  }

  where(condition: WhereInput): UpdateBuilder<T> {
    this._where = condition;
    return this;
  }

  execute(): Promise<T | null> {
    const condition = this._where;
    if (condition === undefined) return Promise.resolve(null);

    const table = this.resolve(this.tableName);
    const index = table.findIndex(r => matchWhere(r, condition));
    if (index !== -1) {
      table[index] = { ...table[index], ...this.data };
      return Promise.resolve(table[index] as T);
    }
    return Promise.resolve(null);
  }
}

// ─── DeleteBuilder ────────────────────────────────────────────────────────────

export class DeleteBuilder<T extends Row = Row> {
  private resolve: Resolver;
  private tableName: string;
  private _where?: WhereInput;

  constructor(resolve: Resolver, tableName: string) {
    this.resolve = resolve;
    this.tableName = tableName;
  }

  where(condition: WhereInput): DeleteBuilder<T> {
    this._where = condition;
    return this;
  }

  execute(): Promise<T | null> {
    const condition = this._where;
    if (condition === undefined) return Promise.resolve(null);

    const table = this.resolve(this.tableName);
    const index = table.findIndex(r => matchWhere(r, condition));
    if (index !== -1) {
      const [removed] = table.splice(index, 1);
      return Promise.resolve(removed as T);
    }
    return Promise.resolve(null);
  }
}

// ─── TableRef ─────────────────────────────────────────────────────────────────

export class TableRef<T extends Row = Row> {
  private resolve: Resolver;
  private tableName: string;

  constructor(resolve: Resolver, tableName: string) {
    this.resolve = resolve;
    this.tableName = tableName;
  }

  select(): SelectBuilder<T> {
    return new SelectBuilder<T>(this.resolve, this.tableName);
  }

  insert(data: Record<string, unknown>): Promise<T> {
    const table = this.resolve(this.tableName);
    const record = { id: crypto.randomUUID(), ...data } as unknown as T;
    table.push(record);
    return Promise.resolve(record);
  }

  update(data: Record<string, unknown>): UpdateBuilder<T> {
    return new UpdateBuilder<T>(this.resolve, this.tableName, data);
  }

  delete(): DeleteBuilder<T> {
    return new DeleteBuilder<T>(this.resolve, this.tableName);
  }
}
