import * as SQLite from "expo-sqlite";

export type QueueItem = {
  id: string;
  payload: Record<string, unknown>;
  createdAt: number;
};

export function openHubDatabase() {
  return SQLite.openDatabase("govsport-hub.db");
}

export function runMigrations() {
  const db = openHubDatabase();
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS queue (id TEXT PRIMARY KEY NOT NULL, payload TEXT, createdAt INTEGER);"
    );
  });
}

export async function enqueueItem(item: QueueItem) {
  const db = openHubDatabase();
  return new Promise<void>((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT OR REPLACE INTO queue (id, payload, createdAt) VALUES (?, ?, ?);",
        [item.id, JSON.stringify(item.payload), item.createdAt]
      );
    }, undefined, () => resolve());
  });
}

export function formatQueueDepth(count: number) {
  return `${count} queued events`;
}
