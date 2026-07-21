UPDATE `nav_nodes`
SET
  `label` = 'Hugging Face',
  `url` = 'https://huggingface.co/massif',
  `updatedAt` = cast((julianday('now') - 2440587.5) * 86400000 as integer)
WHERE `label` = 'Podcast' AND `url` = '/podcast';
