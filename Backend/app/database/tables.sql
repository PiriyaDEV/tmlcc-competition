-- tmlcc Database Tables --

-- Create User Table
CREATE TABLE IF NOT EXISTS User(
  username                VARCHAR(16)     NOT NULL,
  password                VARCHAR(64)     NOT NULL,
  firstname               VARCHAR(32)     NOT NULL,
  lastname                VARCHAR(32)     NOT NULL,
  email                   VARCHAR(64)     NOT NULL,
  phone                   VARCHAR(10)     NOT NULL,
  address                 VARCHAR(256)    NOT NULL,
  organization            VARCHAR(128)    NOT NULL,
  institute               VARCHAR(128)    NOT NULL,
  education               VARCHAR(32)     NOT NULL,
  offer_trainee           BOOLEAN         NOT NULL,
  works                   VARCHAR(256)    NOT NULL,
  role                    VARCHAR(6)      NOT NULL,
  created_at              BIGINT          NOT NULL,
  updated_at              BIGINT          NOT NULL,
  PRIMARY KEY (username),
  UNIQUE      (username)
);