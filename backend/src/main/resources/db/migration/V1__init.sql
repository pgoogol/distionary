-- Initial schema placeholder.
-- Real tables (dictionaries, entries, users, …) will be added in later migrations.

CREATE TABLE IF NOT EXISTS schema_bootstrap (
    id          SMALLINT PRIMARY KEY,
    applied_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

INSERT INTO schema_bootstrap (id) VALUES (1) ON CONFLICT DO NOTHING;
