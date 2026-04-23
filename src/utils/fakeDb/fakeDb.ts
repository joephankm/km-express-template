import { TableRef } from './mutationBuilders';
import { type Row } from './queryBuilder';

class FakeDb {
  private tableData = new Map<string, Row[]>();

  load(tableName: string, data: Row[]): this {
    if (!this.tableData.has(tableName)) {
      this.tableData.set(tableName, [...data]);
    }
    return this;
  }

  loadAll(tables: Record<string, Row[]>): this {
    for (const [name, data] of Object.entries(tables)) {
      this.load(name, data);
    }
    return this;
  }

  getTable<T extends Row = Row>(tableName: string): T[] {
    const table = this.tableData.get(tableName);
    if (!table) throw new Error(`Table "${tableName}" not registered`);
    return table as T[];
  }

  from<T extends Row = Row>(tableName: string): TableRef<T> {
    return new TableRef<T>(name => this.getTable(name), tableName);
  }
}

export default FakeDb;
