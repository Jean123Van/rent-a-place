# Add new package dependency
Run this on root. Workspace value is either api or web

```bash
npm install <package> --workspace=<workspace>
```
# Run project
1. Run this on root.

```bash
npm install
```
2. Run both FE and BE
```bash
npm run dev
```

3. Run only FE
- Access at localhost:5173
```bash
npm run dev --workspace=web
```

4. Run only BE
- Access at localhost:3000
```bash
npm run dev --workspace=api
```
