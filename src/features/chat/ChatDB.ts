import { TChatItem } from './TChatItem';

export interface TChatRecord extends TChatItem {
  id: number;
}

export class ChatDB {
  private static readonly DB_NAME = 'chatbot-db';
  private static readonly STORE_NAME = 'chat-history';
  private static readonly DB_VERSION = 1;

  private db: IDBDatabase | null = null;

  private async openDB(): Promise<IDBDatabase> {
    if (this.db) return this.db;

    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(ChatDB.DB_NAME, ChatDB.DB_VERSION);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(ChatDB.STORE_NAME)) {
          const store = db.createObjectStore(ChatDB.STORE_NAME, {
            keyPath: 'id',
            autoIncrement: true,
          });
          store.createIndex('scenarioId', 'scenarioId', { unique: true });
          store.createIndex('when', 'when', { unique: false });
        }
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  /** Add a single TChatItem to the store. Returns the auto-generated id. */
  async add(item: TChatItem): Promise<number> {
    const db = await this.openDB();
    return new Promise<number>((resolve, reject) => {
      const tx = db.transaction(ChatDB.STORE_NAME, 'readwrite');
      const store = tx.objectStore(ChatDB.STORE_NAME);
      const record: Omit<TChatRecord, 'id'> = item;
      const request = store.put(record);

      request.onsuccess = () => resolve(request.result as number);
      request.onerror = () => reject(request.error);
    });
  }

  /** Add multiple TChatItems in a single transaction. */
  async addMany(items: TChatItem[]): Promise<number[]> {
    const db = await this.openDB();
    return new Promise<number[]>((resolve, reject) => {
      const tx = db.transaction(ChatDB.STORE_NAME, 'readwrite');
      const store = tx.objectStore(ChatDB.STORE_NAME);
      const ids: number[] = [];

      tx.oncomplete = () => resolve(ids);

      for (const item of items) {
        const record: Omit<TChatRecord, 'id'> = item;
        const request = store.put(record);
        request.onsuccess = () => ids.push(request.result as number);
      }

      tx.onerror = () => reject(tx.error);
    });
  }

  /** Retrieve all chat records ordered by when ascending. */
  async getAll(): Promise<TChatRecord[]> {
    const db = await this.openDB();
    return new Promise<TChatRecord[]>((resolve, reject) => {
      const tx = db.transaction(ChatDB.STORE_NAME, 'readonly');
      const store = tx.objectStore(ChatDB.STORE_NAME);
      const index = store.index('when');
      const request = index.getAll();

      request.onsuccess = () => resolve(request.result as TChatRecord[]);
      request.onerror = () => reject(request.error);
    });
  }

  /** Retrieve records for a specific scenarioId. */
  async getByScenario(scenarioId: string): Promise<TChatRecord[]> {
    const db = await this.openDB();
    return new Promise<TChatRecord[]>((resolve, reject) => {
      const tx = db.transaction(ChatDB.STORE_NAME, 'readonly');
      const store = tx.objectStore(ChatDB.STORE_NAME);
      const index = store.index('scenarioId');
      const request = index.getAll(scenarioId);

      request.onsuccess = () => resolve(request.result as TChatRecord[]);
      request.onerror = () => reject(request.error);
    });
  }

  /** Get a single record by its id. */
  async get(id: number): Promise<TChatRecord | undefined> {
    const db = await this.openDB();
    return new Promise<TChatRecord | undefined>((resolve, reject) => {
      const tx = db.transaction(ChatDB.STORE_NAME, 'readonly');
      const store = tx.objectStore(ChatDB.STORE_NAME);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result as TChatRecord | undefined);
      request.onerror = () => reject(request.error);
    });
  }

  /** Delete a single record by id. */
  async delete(id: number): Promise<void> {
    const db = await this.openDB();
    return new Promise<void>((resolve, reject) => {
      const tx = db.transaction(ChatDB.STORE_NAME, 'readwrite');
      const store = tx.objectStore(ChatDB.STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /** Delete all records. */
  async clear(): Promise<void> {
    const db = await this.openDB();
    return new Promise<void>((resolve, reject) => {
      const tx = db.transaction(ChatDB.STORE_NAME, 'readwrite');
      const store = tx.objectStore(ChatDB.STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /** Get the total number of records. */
  async count(): Promise<number> {
    const db = await this.openDB();
    return new Promise<number>((resolve, reject) => {
      const tx = db.transaction(ChatDB.STORE_NAME, 'readonly');
      const store = tx.objectStore(ChatDB.STORE_NAME);
      const request = store.count();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /** Close the database connection. */
  close(): void {
    this.db?.close();
    this.db = null;
  }
}

/** Singleton instance for use across the app. */
export const chatDB = new ChatDB();
