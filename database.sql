CREATE TABLE "TODO" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
	"completed" BOOLEAN,
	"Description" VARCHAR(180) NOT NULL
  
);

INSERT INTO "TODO" ("task", "completed", "Description")
VALUES 
  ('Buy groceries', FALSE, 'Milk, eggs, bread, and vegetables'),
  ('Pay electricity bill',  FALSE, 'Use online banking to pay the electricity bill'),
  ('Finish weekend project',  FALSE, 'Make sure project is done by 6:00 pm'),
  ('Feed tacocat', FALSE, 'He has not been fed in 20 years'),
  ('Workout', FALSE, 'Lower body');
  
  
  
  UPDATE "TODO" SET "completed" = TRUE WHERE "id" = 5;
  DELETE FROM "TODO" WHERE id = 7;
  SELECT * FROM "TODO"
  ORDER BY "task" DESC;