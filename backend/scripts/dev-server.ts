// Local dev: MEMORY_DB=1 ADMIN_EMAIL=a@b.c ADMIN_PASSWORD=x npx tsx scripts/dev-server.ts
import app from '../src/server';
const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`API on http://localhost:${port}`));
