-- Приводим idea_vote.ip к типу inet
ALTER TABLE "idea_vote"
  ALTER COLUMN "ip" TYPE inet USING ip::inet;

-- Лимит: не более 10 голосов на один IP по всем идеям
CREATE OR REPLACE FUNCTION trg_check_ip_limit() RETURNS trigger AS $$
DECLARE
  cnt INTEGER;
BEGIN
  SELECT count(*) INTO cnt FROM "idea_vote" WHERE ip = NEW.ip;
  IF cnt >= 10 THEN
    RAISE EXCEPTION 'IP % превысил лимит голосов (10)', NEW.ip
      USING ERRCODE = '23514'; -- check_violation
  END IF;
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS check_ip_limit ON "idea_vote";
CREATE TRIGGER check_ip_limit
BEFORE INSERT ON "idea_vote"
FOR EACH ROW EXECUTE FUNCTION trg_check_ip_limit();

-- Кэш счётчика голосов
CREATE OR REPLACE FUNCTION trg_inc_votes_count() RETURNS trigger AS $$
BEGIN
  UPDATE "idea" SET votes_count = votes_count + 1 WHERE id = NEW.idea_id;
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION trg_dec_votes_count() RETURNS trigger AS $$
BEGIN
  UPDATE "idea" SET votes_count = GREATEST(votes_count - 1, 0) WHERE id = OLD.idea_id;
  RETURN OLD;
END
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS inc_votes_count ON "idea_vote";
CREATE TRIGGER inc_votes_count AFTER INSERT ON "idea_vote"
FOR EACH ROW EXECUTE FUNCTION trg_inc_votes_count();

DROP TRIGGER IF EXISTS dec_votes_count ON "idea_vote";
CREATE TRIGGER dec_votes_count AFTER DELETE ON "idea_vote"
FOR EACH ROW EXECUTE FUNCTION trg_dec_votes_count();

-- Подстраховка по индексам (если не создались ранее)
CREATE INDEX IF NOT EXISTS ix_idea_votes_ip          ON "idea_vote"(ip);
CREATE INDEX IF NOT EXISTS ix_idea_votes_idea_id     ON "idea_vote"("idea_id");
CREATE INDEX IF NOT EXISTS ix_idea_votes_created_at  ON "idea_vote"("created_at");
CREATE INDEX IF NOT EXISTS ix_idea_votes_count       ON "idea"(votes_count);
CREATE INDEX IF NOT EXISTS ix_idea_created_at        ON "idea"("created_at");
