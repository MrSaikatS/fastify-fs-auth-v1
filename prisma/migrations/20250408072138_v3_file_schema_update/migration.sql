/*
  Warnings:

  - Added the required column `fileName` to the `FileAsset` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FileAsset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fileName" TEXT NOT NULL
);
INSERT INTO "new_FileAsset" ("id") SELECT "id" FROM "FileAsset";
DROP TABLE "FileAsset";
ALTER TABLE "new_FileAsset" RENAME TO "FileAsset";
CREATE UNIQUE INDEX "FileAsset_id_key" ON "FileAsset"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
