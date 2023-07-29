CREATE TABLE "TODO" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
	"due_date" DATE,
	"completed" BOOLEAN,
	"Description" VARCHAR(180) NOT NULL
  
);

INSERT INTO "TODO" ("task", "due_date", "completed", "Description")
VALUES 
  ('Buy groceries', '2023-08-15', FALSE, 'Milk, eggs, bread, and vegetables'),
  ('Pay electricity bill', '2023-08-15', FALSE, 'Use online banking to pay the electricity bill'),
  ('Finish weekend project', '2023-07-30', FALSE, 'Make sure project is done by 6:00 pm'),
  ('Feed tacocat', '2023-01-08', FALSE, 'He has not been fed in 20 years'),
  ('Workout', '2023-08-03', FALSE, 'Lower body');




    UPDATE "TODO" SET "completed" = TRUE WHERE "id" = 5;