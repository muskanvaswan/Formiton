-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Form" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "redirect" TEXT,
    "conclusion" TEXT,
    "startText" TEXT,
    "password" TEXT,
    "owner" TEXT,
    "ownerEmail" TEXT
);
INSERT INTO "new_Form" ("conclusion", "description", "id", "owner", "ownerEmail", "password", "redirect", "startText", "title") SELECT "conclusion", "description", "id", "owner", "ownerEmail", "password", "redirect", "startText", "title" FROM "Form";
DROP TABLE "Form";
ALTER TABLE "new_Form" RENAME TO "Form";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
