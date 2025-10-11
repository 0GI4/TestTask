/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `idea` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "idea_title_key" ON "idea"("title");
