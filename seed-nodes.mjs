import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  connectionLimit: 1,
  host: process.env.DATABASE_URL?.split('@')[1]?.split('/')[0] || 'localhost',
  user: process.env.DATABASE_URL?.split('://')[1]?.split(':')[0] || 'root',
  password: process.env.DATABASE_URL?.split(':')[2]?.split('@')[0] || '',
  database: process.env.DATABASE_URL?.split('/').pop() || 'unscaled',
});

const nodes = [
  { label: 'Github', url: 'https://github.com/massif-01', order: 1, visible: true, posX: null, posY: null },
  { label: 'Podcast', url: 'https://unscaled.podcast.xyz', order: 2, visible: true, posX: null, posY: null },
  { label: 'AI', url: '/ai', order: 3, visible: true, posX: null, posY: null },
  { label: 'Info', url: '/info', order: 4, visible: true, posX: null, posY: null },
  { label: 'AuraCAP', url: 'https://github.com/massif-01/AuraCap', order: 5, visible: true, posX: null, posY: null },
];

async function seed() {
  const conn = await pool.getConnection();
  try {
    console.log('Clearing existing nav_nodes...');
    await conn.execute('DELETE FROM nav_nodes');
    
    console.log('Inserting nodes...');
    for (const node of nodes) {
      await conn.execute(
        'INSERT INTO nav_nodes (label, url, `order`, visible, posX, posY) VALUES (?, ?, ?, ?, ?, ?)',
        [node.label, node.url, node.order, node.visible, node.posX, node.posY]
      );
    }
    
    console.log('✓ Successfully seeded nav_nodes');
    const [rows] = await conn.execute('SELECT * FROM nav_nodes ORDER BY `order`');
    console.log('Current nodes:', rows);
  } catch (err) {
    console.error('Error seeding:', err);
  } finally {
    await conn.release();
    await pool.end();
  }
}

seed();
