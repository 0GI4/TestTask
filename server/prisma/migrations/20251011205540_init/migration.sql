-- CreateTable
CREATE TABLE "idea" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "votes_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "idea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "idea_vote" (
    "id" BIGSERIAL NOT NULL,
    "idea_id" INTEGER NOT NULL,
    "ip" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "idea_vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idea_votes_count_idx" ON "idea"("votes_count");

-- CreateIndex
CREATE INDEX "idea_created_at_idx" ON "idea"("created_at");

-- CreateIndex
CREATE INDEX "idea_vote_ip_idx" ON "idea_vote"("ip");

-- CreateIndex
CREATE INDEX "idea_vote_idea_id_idx" ON "idea_vote"("idea_id");

-- CreateIndex
CREATE INDEX "idea_vote_created_at_idx" ON "idea_vote"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "idea_vote_idea_id_ip_key" ON "idea_vote"("idea_id", "ip");

-- AddForeignKey
ALTER TABLE "idea_vote" ADD CONSTRAINT "idea_vote_idea_id_fkey" FOREIGN KEY ("idea_id") REFERENCES "idea"("id") ON DELETE CASCADE ON UPDATE CASCADE;
