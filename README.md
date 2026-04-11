# PHANTOM — Field Intelligence System

**A mobile-first PWA for data center technicians.**

Built by [John Hamilton](https://github.com/Darkmatter024) — Data Center Technician at CoreWeave.

> *"Most companies show a PowerPoint about their data center. We built a tool you can walk into the hall with."*

**License:** GPL-3.0 — open source, must credit author, modifications must stay open source.

---

## What It Does

PHANTOM is a single-file Progressive Web App (~10,000 lines) that gives data center technicians instant access to the reference data, diagnostic tools, and field intelligence they need during live troubleshooting — without leaving the floor.

### 6 Tabs

| Tab | What It Does |
|-----|-------------|
| **Triage** | Down-link troubleshooting protocol. Step-by-step from physical layer through DOM, FEC, and config. Quick actions for voice assistant, optic selector, port map validator, CLI parser. |
| **Fiber** | Complete fiber optics reference — connector types (LC, MPO, SC), DOM/DDM thresholds, fiber standards (OM3/OM4/OS2), cable types (DAC, AOC), cleaning standards (IEC 61300-3-35). |
| **CLI** | Platform-specific CLI commands — Arista EOS, Cisco NX-OS, NVIDIA/Mellanox, InfiniBand NDR, OOB/BMC management, console cable reference, Fluke cable certification. |
| **Power/HW** | GPU fault codes (XID errors), PDU phase-balance diagrams, DLC cooling reference, hardware LED patterns, NVMe hot-swap, thermal management. |
| **OPS** | SOPs (create/save/search field procedures), Rack Map (visual rack elevation builder with AI parsing), Port Map Validator (AI-powered error detection), Fiber Burndown Tracker (job progress tracking with SLA timers). |
| **Phantom** | Failure memory engine — input a fault (LOS, FEC, flapping, etc.) and Phantom analyzes it against your Ghost Echo history, builds ranked hypotheses, shows a topology graph, suggests next actions, and surfaces similar past incidents. |

### Key Features

- **Ghost Echo** — Log every fix you attempt with outcome tracking. Over time, PHANTOM learns which actions resolve which faults on which racks and suggests the most effective fix first.
- **Voice Assistant** — Hands-free Q&A powered by Claude API. Ask technical questions while your hands are on the cable plant.
- **Optic Selector** — Pick a platform + distance, get the exact optic, part number, fiber type, connector, DOM thresholds, and vendor lock warnings.
- **Port Map Validator** — Paste any port map (spreadsheet, CSV, plain text) and Claude parses it, detects duplicate ports, speed mismatches, fiber conflicts, and produces a clean sorted map with escalation recommendations.
- **QR / Barcode Scanner** — Scan asset tags and QR codes with the phone camera. Auto-searches racks, SOPs, and deep-links into the app.
- **Shift Handoff** — Export a structured handoff report with open burndown jobs, recent Ghost Echo entries, and shift notes.
- **Full Backup/Restore** — Export all data (SOPs, rack maps, burndown jobs, Ghost Echo history) as JSON. Import on a new device or share with teammates.

---

## Tech Stack

- **Single HTML file** — no build tools, no bundler, no framework. Opens in any browser.
- **Vanilla JS** — zero dependencies at runtime (html5-qrcode and pdf.js loaded on demand from CDN only when needed)
- **CSS custom properties** — full design token system with elevation surfaces, glass controls, and dark tactical aesthetic
- **IndexedDB** — Ghost Echo incident database with transactional integrity
- **localStorage** — SOPs, rack maps, burndown jobs, settings, crash logs
- **Web Speech API** — voice recognition for hands-free assistant
- **Canvas 2D** — ambient node mesh background, boot particle field, Phantom topology graph, cosmic button effects
- **Claude API** — powers voice assistant, port map validator, CLI parser AI mode, rack elevation parser (requires API key)

---

## Platforms Supported

### Optic Database (14 platforms)
- Arista 7050CX3-32S, 7060CX2-32S, 7800R3, 7280R3
- NVIDIA Quantum-2 QM9700, Quantum-2 QM8790
- NVIDIA ConnectX-7, BlueField-3
- Mellanox SN4600C, SN2201
- Cisco Nexus 93180YC-FX, 9336C-FX2
- NVIDIA GB300 NVL72, H100 SXM5

### CLI Reference
- Arista EOS
- Cisco NX-OS
- NVIDIA/Mellanox (mlxlink, mst, ethtool)
- InfiniBand NDR (ibstat, perfquery, opensm)
- OOB/BMC (ipmitool, racadm, Redfish)
- Console cable reference (baud rates, pinouts, USB serial adapters)
- Fluke DTX cable certification

---

## Installation

### Option 1: GitHub Pages (recommended)
Visit: **[darkmatter024.github.io/nexus01/dct-ios.html](https://darkmatter024.github.io/nexus01/dct-ios.html)**

On iPhone: Share → Add to Home Screen for offline PWA with camera access.

### Option 2: Local File
Download `dct-ios.html` and open it in any browser. All features work except camera (QR scanner requires HTTPS).

### Option 3: Local Server
```bash
python3 -m http.server 8000
# Open http://localhost:8000/dct-ios.html
```

---

## API Key Setup

Some features require a Claude API key from Anthropic:
- Voice Assistant
- Port Map Validator
- CLI Parser (AI mode)
- Rack Elevation Parser

To configure:
1. Open PHANTOM
2. Tap the ⋮ menu → API KEY
3. Enter your `sk-ant-api03-...` key
4. The key is stored only in your device's localStorage — never transmitted anywhere except directly to api.anthropic.com

---

## Architecture

```
┌─────────────────────────────────────────┐
│              DESIGN TOKENS              │
│  Colors, typography, spacing, surfaces  │
├─────────────────────────────────────────┤
│              DATA LAYER                 │
│  OPTIC_DB, PDU_CONFIGS, INCIDENTS,      │
│  SEARCH_INDEX, STAB_GROUPS              │
├─────────────────────────────────────────┤
│            DATA HELPERS                 │
│  getOpticResult(), getPDUConfig(),       │
│  getPlatforms(), escHtml()              │
├─────────────────────────────────────────┤
│            ENGINE LAYER                 │
│  Parsers: DOM, Errors, PortChan, IB,    │
│  nvidia-smi, AI, Port Map Validator     │
│  Engines: Ghost Echo, Phantom, Rack Map,│
│  SOP, Burndown, Optic Selector, Voice   │
├─────────────────────────────────────────┤
│            STORAGE LAYER                │
│  localStorage: SOPs, racks, burndown,   │
│  settings, crash log, API key           │
│  IndexedDB: Ghost Echo incidents        │
├─────────────────────────────────────────┤
│              UI SHELL                   │
│  iOS PWA shell, bottom tab nav,         │
│  sheets, search, boot screen            │
└─────────────────────────────────────────┘
```

---

## Roadmap

### ✅ Complete
- [x] 6-tab field operations app
- [x] 14-platform optic database with DOM thresholds
- [x] Ghost Echo — fix logging with outcome tracking and pattern matching
- [x] Phantom — failure memory engine with hypothesis ranking
- [x] Port Map Validator with AI-powered error detection
- [x] Fiber Burndown Tracker with SLA timers
- [x] Rack Map visual elevation builder with AI parsing
- [x] Voice assistant (Claude-powered)
- [x] QR/barcode scanner with deep-link search
- [x] Full data export/import/backup system
- [x] Shift handoff report generator
- [x] PWA with offline support
- [x] iOS-optimized (safe areas, momentum scroll, haptics)

### 🔜 Next
- [ ] **Site Profile System** — select your data center on first launch (AUS-01, ORD-02, DFW-01, etc.) and the app auto-configures switch models, GPU platforms, standard optics, rack naming conventions, PDU types, and escalation contacts for that site. One app URL works for every technician at every site. Site profiles are lightweight JSON (~100 lines each) — 30 sites adds ~3KB, not bloat.
- [ ] **SOP Edit** — edit saved SOPs in place (currently create and delete only)
- [ ] **Merge-on-Import** — offer "merge" vs "replace" when restoring from backup
- [ ] **Ghost Echo Team Sharing** — export/import incident history between teammates to build shared field intelligence
- [ ] **Phantom AI Mode** — connect hypothesis engine to Claude API for real-time analysis powered by your Ghost Echo history

### 🔮 Future
- [ ] NFC tag scanning for rack identification
- [ ] Photo attachment on Ghost Echo entries
- [ ] Offline AI inference (on-device model for basic triage)
- [ ] Dashboard mode for NOC wall displays
- [ ] Integration with ticketing systems (ServiceNow, Freshservice)

---

## Data Privacy

- All data stays on your device (localStorage + IndexedDB)
- API key stored only in localStorage — transmitted only to api.anthropic.com
- No analytics, no tracking, no telemetry
- No server, no database, no accounts
- Camera access used only for QR scanning — no images are stored or transmitted

---

## License

**GPL-3.0** — see [LICENSE](LICENSE)

You may use, modify, and distribute this software. You must credit the original author and release any modifications under the same license. You may not take this code and distribute it as a closed-source proprietary product.

---

## Author

**John Hamilton** — Data Center Technician at CoreWeave (US-AUS01)

- GitHub: [@Darkmatter024](https://github.com/Darkmatter024)

Built from real field experience. Every triage step, every CLI command, every optic recommendation comes from actual data center operations — not documentation scraped off the internet.
