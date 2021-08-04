-- tmlcc Database Foreign Keys --

-- Add Foreign Key To Teams Table
ALTER TABLE Teams
  ADD FOREIGN KEY (leader_id) REFERENCES Users(user_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

-- Add Foreign Key To TeamMembers Table
ALTER TABLE TeamMembers
  ADD FOREIGN KEY (team_id)   REFERENCES Teams(team_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  ADD FOREIGN KEY (member_id) REFERENCES Users(user_id)
    ON UPDATE CASCADE ON DELETE CASCADE;