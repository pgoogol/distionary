CREATE TABLE dictionary (
    id                 BIGSERIAL PRIMARY KEY,
    api_key            VARCHAR(64)              NOT NULL UNIQUE,
    name               VARCHAR(255)             NOT NULL,
    description        TEXT,
    icon               VARCHAR(64),
    data_source        VARCHAR(32)              NOT NULL,
    status             VARCHAR(32)              NOT NULL,
    created_at         TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    last_modified_at   TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    last_modified_by   VARCHAR(255),

    CONSTRAINT dictionary_api_key_format CHECK (api_key ~ '^[a-z][a-z0-9_-]{1,63}$'),
    CONSTRAINT dictionary_status_values CHECK (status IN ('DRAFT', 'ACTIVE', 'ARCHIVED')),
    CONSTRAINT dictionary_source_values CHECK (data_source IN ('INTERNAL', 'ISO', 'SYNC'))
);

CREATE INDEX dictionary_status_idx ON dictionary (status);
CREATE INDEX dictionary_last_modified_idx ON dictionary (last_modified_at DESC);
