# Unscaled — TODO

## Database & Backend
- [x] 设计 nav_nodes 表（id, label, url, icon, order, visible, created_at）
- [x] 设计 content_items 表（id, category, title, description, url, cover_url, published_at, visible, order）
- [x] 运行 pnpm db:push 推送 schema
- [x] 实现 nodes tRPC router（list public, CRUD admin）
- [x] 实现 content tRPC router（list public by category, CRUD admin）
- [x] 首页 SignalField 改为从 API 动态加载节点

## Admin Panel
- [x] /admin 路由，受 owner 保护
- [x] 节点管理页：增删改排序
- [x] 内容管理页：增删改，按 category 筛选
- [x] 修复升级后 Home.tsx 冲突（恢复原始设计）
