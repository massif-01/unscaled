UPDATE `nav_nodes`
SET
  `label` = 'arXiv',
  `url` = 'https://arxiv.org/a/shi_y_8.html',
  `updatedAt` = cast((julianday('now') - 2440587.5) * 86400000 as integer)
WHERE `label` = 'CoPing'
   OR `url` = 'https://github.com/massif-01/CoPing';
