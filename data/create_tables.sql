BEGIN;
DROP TABLE IF EXISTS "user",
"booking",
"activity",
"category",
"activity_has_category";
CREATE TABLE "user" (
    "user_id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);
CREATE TABLE "booking" (
    "booking_id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "date" TIMESTAMPTZ NOT NULL,
    "status" TEXT NOT NULL,
    "nb_tickets" INTEGER,
    "client_id" INTEGER NOT NULL REFERENCES "user"("user_id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);
CREATE TABLE "activity" (
    "activity_id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "minimal_age" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);
CREATE TABLE "category" (
    "category_id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);
CREATE TABLE "activity_has_category" (
    "activity_id" INTEGER NOT NULL REFERENCES "activity"("activity_id"),
    "category_id" INTEGER NOT NULL REFERENCES "category"("category_id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);
CREATE TABLE IF NOT EXISTS "activity_category" (
    "activity_id" INT REFERENCES "activity"("activity_id") ON DELETE CASCADE,
    "category_id" INT REFERENCES "category"("category_id") ON DELETE CASCADE,
    PRIMARY KEY ("activity_id", "category_id")
);
COMMIT;