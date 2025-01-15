# Anlagen des Projekts

### stage Umgebung

https://foxbaseai-stage.maxoverlack.dev/

### Figma Board

https://www.figma.com/design/kDtdJAlwppDFAL0fTpwsNM/FoxBase-AI-Platform?node-id=4-2&t=MjXy6yqfxvTdj1Me-1

### Figma Prototyp

https://www.figma.com/proto/kDtdJAlwppDFAL0fTpwsNM/FoxBase-AI-Platform?node-id=114-85&t=MjXy6yqfxvTdj1Me-0&scaling=scale-down&content-scaling=fixed&page-id=4%3A2&starting-point-node-id=114%3A85

### Abschlusspräsentation

https://nico-puelacher-presentations.netlify.app/foxbaseaifinal

# Installation und Inbetriebnahme

Das lokale Betreiben der Software Umgebung ist auf zwei Wege möglich.
Beide Wege setzen voraus, dass sich das Repository über ein

```bash
git clone
```

auf die lokale Umgebung geholt wird.

Daraufhin müssen die Dependencies des Projekts installiert werden, was über den gewohnten Weg möglich ist.

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

Um die Anwendung nun zu starten kann entweder eine Docker Umgebung gestartet werden oder der Dev Server gestartet werden.

## Docker Umgebung

```bash
docker compose up
```

## Dev Server

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

---

Beide Commands öfnnen die Anwendung auf `http://localhost:3000`.
