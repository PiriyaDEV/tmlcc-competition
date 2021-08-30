-- tmlcc Database Tables --

-- Create Users Table
CREATE TABLE IF NOT EXISTS Users(
  user_id                 VARCHAR(8)      NOT NULL,
  email                   VARCHAR(64)     NOT NULL  UNIQUE,
  displayName             VARCHAR(16)     NOT NULL  UNIQUE,
  password                VARCHAR(100)    NOT NULL,
  titleName               VARCHAR(8)      NOT NULL,
  firstName               VARCHAR(32)     NOT NULL,
  lastName                VARCHAR(32)     NOT NULL,
  phone                   VARCHAR(16)     NOT NULL,
  education               VARCHAR(16)     NOT NULL,
  institution             VARCHAR(128)    NOT NULL,
  organization            VARCHAR(128)    NOT NULL,
  address                 VARCHAR(255)    NOT NULL,
  country                 VARCHAR(64)     NOT NULL,
  works                   VARCHAR(1028)   NOT NULL,
  isWorkInterest          BOOLEAN         NOT NULL,
  interestField           VARCHAR(255)    NULL,
  hasProgSkill            BOOLEAN         NOT NULL,
  progSkillLevel          VARCHAR(16)     NULL,
  progSkillList           VARCHAR(255)    NULL,
  hasChemSkill            BOOLEAN         NOT NULL,
  chemSkillLevel          VARCHAR(16)     NULL,
  chemSkillList           VARCHAR(255)    NULL,
  hasMachineLSkill        BOOLEAN         NOT NULL,
  machineLSkillLevel      VARCHAR(16)     NULL,
  machineLSkillList       VARCHAR(255)    NULL,
  hasOtherSkill           BOOLEAN         NOT NULL,
  otherSkillList          VARCHAR(255)    NULL,
  registerFor             VARCHAR(25)     NOT NULL,
  hasTeam                 BOOLEAN         NOT NULL,
  role                    VARCHAR(8)      NOT NULL,
  lastLogin               BIGINT          NOT NULL,
  createdAt               BIGINT          NOT NULL,
  updatedAt               BIGINT          NOT NULL,
  PRIMARY KEY (user_id)
);

-- Create Teams Table
CREATE TABLE IF NOT EXISTS Teams(
  team_id                 VARCHAR(8)      NOT NULL,
  teamName                VARCHAR(32)     NOT NULL  UNIQUE,
  leader_id               VARCHAR(8)      NOT NULL,
  status                  VARCHAR(8)      NOT NULL,
  createdAt               BIGINT          NOT NULL,
  updatedAt               BIGINT          NOT NULL,
  PRIMARY KEY (team_id)
);

-- Create TeamMembers Table
CREATE TABLE IF NOT EXISTS TeamMembers(
  team_id                 VARCHAR(8)      NOT NULL,
  member_id               VARCHAR(8)      NOT NULL,
  status                  VARCHAR(8)      NOT NULL,
  createdAt               BIGINT          NOT NULL,
  updatedAt               BIGINT          NOT NULL,
  PRIMARY KEY (team_id, member_id)
);

-- Create Materials Table
CREATE TABLE IF NOT EXISTS Materials(
  material_id             VARCHAR(8)      NOT NULL,
  folder_id               VARCHAR(8)      NOT NULL,
  fileName                VARCHAR(255)    NOT NULL,
  status                  VARCHAR(8)      NOT NULL,
  createdAt               BIGINT          NOT NULL,
  updatedAt               BIGINT          NOT NULL,
  PRIMARY KEY (material_id)
);

-- Create Videos Table
CREATE TABLE IF NOT EXISTS Videos(
  video_id                VARCHAR(8)      NOT NULL,
  videoName               VARCHAR(64)     NOT NULL,
  link                    VARCHAR(255)    NOT NULL,
  time                    BIGINT          NOT NULL,
  description             VARCHAR(255)    NULL,
  status                  VARCHAR(8)      NOT NULL,
  createdAt               BIGINT          NOT NULL,
  updatedAt               BIGINT          NOT NULL,
  PRIMARY KEY (video_id)
);

-- Create Folders Table
CREATE TABLE IF NOT EXISTS Folders(
  folder_id               VARCHAR(8)      NOT NULL,
  folderName              VARCHAR(64)     NOT NULL,
  description             VARCHAR(255)    NULL,
  status                  VARCHAR(8)      NOT NULL,
  createdAt               BIGINT          NOT NULL,
  updatedAt               BIGINT          NOT NULL,
  PRIMARY KEY (folder_id)
);

-- Create Subscribe Table
CREATE TABLE IF NOT EXISTS Subscribe(
  email                   VARCHAR(64)     NOT NULL,
  createdAt               TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (email)
);