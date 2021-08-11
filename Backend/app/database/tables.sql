-- tmlcc Database Tables --

-- Create Users Table
CREATE TABLE IF NOT EXISTS Users(
  user_id                 VARCHAR(8)      NOT NULL,
  email                   VARCHAR(64)     NOT NULL  UNIQUE,
  displayName             VARCHAR(16)     NOT NULL  UNIQUE,
  password                VARCHAR(64)     NOT NULL,
  titleName               VARCHAR(8)      NOT NULL,
  firstName               VARCHAR(64)     NOT NULL,
  lastName                VARCHAR(64)     NOT NULL,
  phone                   VARCHAR(12)     NOT NULL,
  education               VARCHAR(16)     NOT NULL,
  institution             VARCHAR(255)    NOT NULL,
  organization            VARCHAR(255)    NOT NULL,
  address                 VARCHAR(255)    NOT NULL,
  country                 VARCHAR(64)     NOT NULL,
  works                   VARCHAR(1000)   NOT NULL,
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
  teamName                VARCHAR(64)     NOT NULL  UNIQUE,
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

-- Create Files Table
CREATE TABLE IF NOT EXISTS Files(
  file_id                 VARCHAR(8)      NOT NULL,
  fileName                VARCHAR(255)    NOT NULL,
  filePath                VARCHAR(255)    NOT NULL,
  type                    VARCHAR(8)      NOT NULL,
  status                  VARCHAR(8)      NOT NULL,
  createdAt               BIGINT          NOT NULL,
  updatedAt               BIGINT          NOT NULL,
  PRIMARY KEY (file_id)
);

-- Create Links Table
CREATE TABLE IF NOT EXISTS Links(
  link_id                 VARCHAR(8)      NOT NULL,
  linkName                VARCHAR(255)    NOT NULL,
  url                     VARCHAR(255)    NOT NULL,
  createdAt               BIGINT          NOT NULL,
  updatedAt               BIGINT          NOT NULL,
  PRIMARY KEY (link_id)
);
