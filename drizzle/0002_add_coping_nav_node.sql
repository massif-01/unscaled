INSERT INTO `nav_nodes` (`label`, `url`, `sortOrder`, `visible`)
SELECT 'CoPing', 'https://github.com/massif-01/CoPing', 60, 1
WHERE NOT EXISTS (
  SELECT 1
  FROM `nav_nodes`
  WHERE `label` = 'CoPing'
     OR `url` = 'https://github.com/massif-01/CoPing'
);
