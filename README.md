# Home Assistant for BMW iDrive 7 / MGU

<p align="center">
  <a href="https://buymeacoffee.com/makiidrajf0" target="_blank">
    <img src="https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Marko%20DEV-orange.svg?style=for-the-badge&logo=buy-me-a-coffee" alt="Buy Me A Coffee">
  </a>
  &nbsp;
  <img src="https://img.shields.io/badge/Platform-BMW%20MGU%20(iDrive%207)-blue.svg?style=for-the-badge" alt="Platform: BMW MGU">
  &nbsp;
  <img src="https://img.shields.io/badge/Home%20Assistant-Integration-41BDF5.svg?style=for-the-badge&logo=home-assistant&logoColor=white" alt="Home Assistant">
  &nbsp;
  <img src="https://img.shields.io/badge/Security-E2E%20Encrypted%20(AES--256--GCM)-red.svg?style=for-the-badge" alt="Security: E2E Encrypted">
  &nbsp;
  <img src="https://img.shields.io/badge/License-GPL--3.0-green.svg?style=for-the-badge" alt="License: GPL-3.0">
</p>

<h3 align="center">
  Created with passion by <strong>Marko DEV</strong> &bull; Entwickelt von <strong>Marko DEV</strong>
</h3>

<p align="center">
  <b>Sprachauswahl / Language:</b><br>
  <a href="#-deutsch">🇩🇪 <b>Deutsch</b> (Übersicht, Features, Lichtsteuerung, Sicherheit, Setup & Danksagung)</a> &nbsp;|&nbsp; 
  <a href="#-english">🇬🇧 <b>English</b> (Overview, Features, Light Tuning, Security, Setup & Credits)</a>
</p>

---

## 📸 Screenshots & Showcase

<table align="center" width="100%">
  <tr>
    <th align="center" width="50%">Home Dashboard (Kacheln & Live-Status)</th>
    <th align="center" width="50%">Licht-Detailsteuerung (Helligkeit, Kelvin & RGB)</th>
  </tr>
  <tr>
    <td align="center">
      <a href="docs/screenshots/01-home.png">
        <img src="docs/screenshots/01-home.png" width="100%" alt="Home Dashboard Kacheln">
      </a>
      <br><em>Dynamische Lampenfarben, Dimm-Anzeige und Schnellwahltasten</em>
    </td>
    <td align="center">
      <a href="docs/screenshots/02-light-settings.png">
        <img src="docs/screenshots/02-light-settings.png" width="100%" alt="Licht-Einstellungen Farbtemperatur Helligkeit RGB">
      </a>
      <br><em>Touch-Modal: 7 Helligkeitsstufen, 3 Weißtöne & 8 RGB-Farbfelder</em>
    </td>
  </tr>
  <tr>
    <th align="center" width="50%">Fahrzeugdaten an Home Assistant</th>
    <th align="center" width="50%">E2E-Verschlüsseltes Handy-Pairing</th>
  </tr>
  <tr>
    <td align="center">
      <a href="docs/screenshots/03-car-telemetry.png">
        <img src="docs/screenshots/03-car-telemetry.png" width="100%" alt="Fahrzeugdaten Live-Telemetrie">
      </a>
      <br><em>Tempo, Drehzahl, Öl- & Kühlwassertemperatur und Gang via Webhook</em>
    </td>
    <td align="center">
      <a href="docs/screenshots/04-pairing.png">
        <img src="docs/screenshots/04-pairing.png" width="100%" alt="QR-Code Handy Kopplung">
      </a>
      <br><em>Sichere Eingabe von URL & Token ohne Tastatur über QR-Code</em>
    </td>
  </tr>
</table>

<table align="center" width="100%">
  <tr>
    <th align="center">Geräte-Browser & Entitäten-Auswahl</th>
  </tr>
  <tr>
    <td align="center">
      <a href="docs/screenshots/05-devices.png">
        <img src="docs/screenshots/05-devices.png" width="85%" alt="Geräte Übersicht & Kategorien">
      </a>
      <br><em>Kompletter Katalog aller Home-Assistant-Entitäten mit Schnellfiltern</em>
    </td>
  </tr>
</table>

---

## 🇩🇪 Deutsch

### ☕ Unterstütze meine Arbeit / Buy Me a Coffee
Die Entwicklung nativer Apps für das BMW iDrive 7 (MGU) System erfordert spezialisiertes Reverse-Engineering, akribische Canvas-Optimierung für automobile Hardware und unzählige Teststunden. Wenn dir dieses Projekt gefällt und du zukünftige Updates, neue Features und weitere Automotive-Designs unterstützen möchtest, freue ich mich riesig über deine Unterstützung:

👉 **[https://buymeacoffee.com/makiidrajf0](https://buymeacoffee.com/makiidrajf0)**

<p align="center">
  <a href="https://buymeacoffee.com/makiidrajf0" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" width="220">
  </a>
</p>

*Vielen Dank für jeden Support – jede Unterstützung hilft, das Projekt kontinuierlich weiterzuentwickeln und mit der Community zu teilen!*

---

### 🚀 Was die App kann (Funktionsumfang)

* **🏠 Home Dashboard:**
  * Übersichtliche Kacheln für Lichter, Schalter, Szenen, Skripte, Schlösser, Rollläden und Sensoren.
  * **Dynamisches Lampen-Glühen:** Eingeschaltete Lichter leuchten im Icon exakt in ihrer aktuellen RGB- bzw. Warmweiß-Farbe.
  * **Dimm-Anzeige:** Kacheln zeigen den aktuellen Helligkeitswert (`AN · 80 %`).
  * Einfaches Antippen schaltet das Gerät (sofern für Schaltung freigegeben).

* **💡 Licht-Detailsteuerung (Farbe, Helligkeit & Farbtemperatur):**
  * Jede dimmbare oder farbige Lampe besitzt eine dedizierte `Farbe`- bzw. `Dimmen`-Schaltfläche direkt auf der Kachel.
  * **7 Helligkeits-Presets:** Schnellwahl für `10%`, `25%`, `50%`, `75%`, `100%` sowie Feineinstellung via `-10%` und `+10%`.
  * **Weißtöne (Kelvin):** Ein-Klick-Auswahl für `Warmweiss (2700K)`, `Neutralweiss (4000K)` und `Kaltweiss (6000K)`.
  * **8 RGB-Farbfelder:** Schnellauswahl für Rot, Orange, Gelb, Grün, Türkis, Blau, Lila und Pink.
  * Touch-Priorisierung: Klicks im Modal verhindern Fehlbedienungen im Hintergrund; einfaches Tippen auf den abgedunkelten Hintergrund schließt die Ansicht wieder.

* **🏎️ Fahrzeugdaten an Home Assistant (Automotive Telemetry):**
  * Liest Live-Sensoren über das BMW CAN/CDS-Bussystem: Geschwindigkeit, Motordrehzahl, Motoröltemperatur, Kühlmitteltemperatur und eingelegter Getriebegang.
  * Sendet die Telemetrie zyklisch per HTTPS-Webhook an Home Assistant.
  * Ermöglicht geniale Automationen zu Hause (z. B. Außenbeleuchtung anschalten bei Ankunft, Garagentor-Vorbereitung bei Annäherung, etc.).

* **🔐 Ende-zu-Ende verschlüsselte Handy-Kopplung (Zero-Touch):**
  * Keine mühsame Passworteingabe auf dem iDrive-Touchscreen nötig!
  * Die App generiert einen flüchtigen 256-Bit-Schlüssel und zeigt einen QR-Code auf dem BMW-Display.
  * Beim Scannen öffnet sich die Web-Kopplungsseite auf dem Smartphone: Server-Adresse und Langzeit-Token eingeben – die Daten werden direkt im Browser mit **AES-256-GCM** verschlüsselt und über einen temporären Relay-Kanal an das Auto übertragen.
  * Weder das Token noch Passwörter werden jemals auf Drittanbieter-Servern unverschlüsselt gespeichert.

* **📋 Geräte-Browser & Entitäten-Verwaltung:**
  * Durchsuche alle in Home Assistant registrierten Entitäten direkt im Fahrzeug.
  * Schnelle Filterung nach Domänen: Lichter, Schalter, Szenen, Skripte, Sensoren und Abdeckungen.
  * Ausgewählte Entitäten können mit einem Klick auf die Startseite gelegt werden.

---

### 🔒 Sicherheit & Datenschutz (Security by Design)

Das Bedienen von Heimautomationssystemen aus einem Fahrzeug verlangt höchste Sicherheitsstandards:

1. **Standardmäßig nur Lesen (Read-Only):**
   * Geräte werden im Auslieferungszustand nur angezeigt. Ein Schalten aus dem Fahrzeug erfordert in `ha.json` explizit `"control": true` **und** `"allow": true` für das jeweilige Gerät.
2. **Zwei-Stufen-Bestätigung (2-Tap Confirmation):**
   * Sensible Geräte wie Garagentore und Schlösser erfordern ein zweites Bestätigungs-Tippen (`"confirm": true`), um unbeabsichtigtes Öffnen während der Fahrt zu verhindern.
   * Alarmanlagen können aus Sicherheitsgründen niemals über die App unscharf geschaltet werden.
3. **Schutz der Zugangsdaten:**
   * Das Smartphone überträgt nur die Zugangsdaten an das Fahrzeug, kann aber **niemals** Schaltthemen freigeben. Die Sicherheitsregeln verbleiben immer fest auf dem Fahrzeug (`ha.json`).
   * Replay-Schutz: Jede verschlüsselte Nachricht nutzt eine einmalige Initialisierungs-Nonce (IV) und Zeitstempel-Verifikation.

---

### 📱 Schritt-für-Schritt Einrichtung

1. **Langzeit-Token in Home Assistant generieren:**
   * In Home Assistant auf dein Profil klicken &rarr; Tab *Sicherheit* &rarr; ganz unten auf *Langlebige Zugriffs-Token erstellen*.
2. **Kopplung via QR-Code:**
   * In der BMW-App den Tab **Verbinden** öffnen.
   * QR-Code mit der Smartphone-Kamera scannen (öffnet die gesicherte Seite auf [GitHub Pages](https://markoni1408.github.io/mgu-homeassistant/pair.html)).
   * Deine Home-Assistant-URL (z. B. `https://mein-ha.example.org`) und das erstellte Token eintragen und auf *Senden* tippen.
3. **Geräte freigeben:**
   * Entitäten in `apps/mdev_homeassistant/ha.json` eintragen oder über den Geräte-Browser auswählen.
   * Bei Bedarf `"control": true` und `"allow": true` aktivieren, um das Schalten zu gestatten.
4. **Fahrzeugdaten per Webhook empfangen:**
   * In Home Assistant eine Automation mit Webhook-Auslöser anlegen (`lokal_only: false`, wenn das Auto von unterwegs sendet).
   * Die Webhook-ID beim Koppeln eintragen und im Tab *Auto an HA* das Senden aktivieren.

---

### 🛠️ Technische Architektur

* **Kompatibilität:** BMW MGU Head Unit (BMW Operating System 7.0 / iDrive 7).
* **Render-Engine:** 60 FPS HTML5 Canvas Compositor über das MGU App Kit.
* **Touch-Target-Manager:** Hierarchische Touchevent-Auflösung mit Prioritäts-Layer für Sub-Buttons (Farb-Pills) und Modal-Backdrop-Sperre gegen Ghost-Clicks.
* **Krypto-Stack:** Web Crypto API mit AES-256-GCM und HKDF-SHA256 für bidirektionale Bestätigung (`pair_ack`).

---

### 🙏 Danksagung & Open-Source-Referenzen

Dieses Projekt basiert auf den Arbeiten herausragender Open-Source-Entwickler:

* **[Home Assistant](https://www.home-assistant.io/):** Dem gesamten Home-Assistant-Team für die offene, mächtige Smart-Home-Plattform.
* **[cauliflowermossgrape](https://github.com/cauliflowermossgrape/idrive7-apps):** Für das MGU App Kit Framework und die Lifecycle-Schnittstellen.
* **[hexlay](https://github.com/hexlay/idrive7-custom-apps):** Für die Referenzimplementierung des kryptografischen Relay-Pairings (GPL-3.0).
* **[Project Nayuki](https://www.nayuki.io/page/qr-code-generator-library):** Für die kompakte QR-Code-Generierungs-Engine (MIT).

---

### ⚖️ Rechtlicher Hinweis & Disclaimer (Deutsch)

> **WICHTIGER HINWEIS:**  
> Dieses Software-Projekt ist ein **inoffizielles Fan- und Forschungsprojekt von Marko DEV**.  
> 
> 1. **Markenrechte:** Die Bezeichnungen „BMW“, „iDrive“, „MGU“ sowie das BMW-Logo sind eingetragene Marken der **Bayerische Motoren Werke AG (BMW AG)**. „Home Assistant“ ist eine eingetragene Marke der **Open Home Foundation**. Dieses Projekt steht in **keinerlei Verbindung, offizieller Partnerschaft oder Unterstützung durch die BMW AG oder die Open Home Foundation**.
> 2. **Kein BMW-Proprietärcode:** Dieses Repository enthält **keinen urheberrechtlich geschützten BMW-Originalcode**, keine internen BMW-Firmware-Dateien und keine proprietären BMW SDKs.
> 3. **Verkehrssicherheit & Haftung:** Die Bedienung von Infotainment-Systemen während der Fahrt darf den Fahrer zu keinem Zeitpunkt ablenken. Die Nutzung erfolgt **vollständig auf eigene Gefahr**. Der Entwickler übernimmt keinerlei Haftung für Fehlfunktionen, Schäden am Fahrzeug oder an Smart-Home-Komponenten.

---
---

## 🇬🇧 English

### ☕ Support My Work / Buy Me a Coffee
Developing standalone automotive applications for the BMW iDrive 7 (MGU) infotainment platform requires extensive reverse engineering, hardware-constrained canvas optimization, and rigorous testing. If you appreciate this Home Assistant integration and would like to support continuous improvements, new features, and future automotive projects:

👉 **[https://buymeacoffee.com/makiidrajf0](https://buymeacoffee.com/makiidrajf0)**

<p align="center">
  <a href="https://buymeacoffee.com/makiidrajf0" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" width="220">
  </a>
</p>

*Thank you so much for your support – it directly fuels further open innovation and development for our community!*

---

### 🚀 Features & Capabilities

* **🏠 Home Dashboard:**
  * Clean, high-contrast tiles tailored for in-car touchscreens (Lights, Switches, Scenes, Scripts, Locks, Covers, Sensors).
  * **Dynamic Light Glow:** When active, lamp icons illuminate dynamically in their real-time RGB or warm-white color.
  * **Brightness Indicator:** Live status display showing exact dim levels (`ON · 80 %`).
  * Instant single-tap toggling (when explicitly enabled for control).

* **💡 Advanced Light Controls (Brightness, Color Temperature & RGB):**
  * Dedicated `Color` / `Dim` button right on the tile to avoid unwanted toggle actions.
  * **7 Brightness Presets:** Instant access to `10%`, `25%`, `50%`, `75%`, `100%`, plus precision `-10%` and `+10%` stepping.
  * **White Temperatures (Kelvin):** One-tap presets for `Warm White (2700K)`, `Neutral White (4000K)`, and `Cold White (6000K)`.
  * **8 RGB Swatches:** Instant color selector chips (Red, Orange, Yellow, Green, Cyan, Blue, Purple, Pink).
  * Modal touch lock: Background targets are temporarily suppressed while modal is active; tapping the backdrop safely dismisses the overlay.

* **🏎️ Vehicle Telemetry to Home Assistant:**
  * Reads real-time automotive sensors via the BMW CAN/CDS bus: Vehicle Speed, Engine RPM, Engine Oil Temperature, Coolant Temperature, and Transmission Gear.
  * Periodically dispatches telemetry to your Home Assistant instance via a secure HTTPS webhook.
  * Triggers smart home automations (e.g. driveway lighting upon car arrival, pre-heating the house when driving home, etc.).

* **🔐 End-to-End Encrypted Phone Pairing (Zero-Touch):**
  * No cumbersome password or token typing on the car display!
  * The car generates an ephemeral 256-bit symmetric key and presents a QR code.
  * Scanning opens the pairing tool on your smartphone: Enter your URL and Long-Lived Token, which are sealed using **AES-256-GCM** client-side and relayed to the car.
  * Zero-knowledge: No plaintext passwords or tokens are stored on third-party relay servers.

* **📋 Device Browser & Entity Manager:**
  * Explore all entities exposed by your Home Assistant server directly from the center screen.
  * Fast filtering by domain: Lights, Switches, Scenes, Scripts, Sensors, and Covers.
  * Pin your favorite entities directly to the Home dashboard with one tap.

---

### 🔒 Security & Privacy by Design

Controlling home automation hardware from a connected vehicle demands uncompromising security:

1. **Read-Only by Default:**
   * Out of the box, all devices are strictly read-only. Actuating requires both `"control": true` **and** `"allow": true` explicitly defined per entity in `ha.json`.
2. **Two-Tap Confirmation:**
   * High-security devices (garage doors, locks) require a second confirmation tap (`"confirm": true`) to prevent accidental triggering.
   * Alarm control panels can never be disarmed through the app.
3. **Credential Isolation:**
   * The mobile pairing interface only provides credentials to the car; it cannot grant switching permissions. Access control policies always reside securely on the vehicle (`ha.json`).
   * Replay Protection: Employs unique initialization vectors (IVs) and timestamp checks on all cryptograms.

---

### 📱 Step-by-Step Setup Guide

1. **Create a Long-Lived Access Token in Home Assistant:**
   * Open Home Assistant &rarr; click on your User Profile &rarr; navigate to *Security* &rarr; scroll to *Long-Lived Access Tokens* &rarr; create a new token.
2. **Pair with your Smartphone:**
   * Open the **Pair** tab inside the BMW app.
   * Scan the displayed QR code with your mobile camera (opens [GitHub Pages](https://markoni1408.github.io/mgu-homeassistant/pair.html)).
   * Input your Home Assistant address (e.g., `https://my-ha.example.org`) and token, then tap *Send to Car*.
3. **Configure Devices:**
   * Specify preferred entities in `ha.json` or add them via the in-car Device Browser.
   * Set `"control": true` and `"allow": true` for devices you wish to toggle.
4. **Enable Car Telemetry Webhook:**
   * In Home Assistant, create an Automation triggered by a Webhook (`local_only: false` if transmitting on the go).
   * Enter the webhook ID in the pairing interface and turn telemetry sending **ON** in the app settings.

---

### 🛠️ Architecture & Specifications

* **Target Hardware:** BMW MGU Head Unit (BMW Operating System 7.0 / iDrive 7).
* **Render Pipeline:** 60 FPS HTML5 Canvas engine managed by the MGU App Kit.
* **Target Resolution:** Hierarchical hit testing prioritizing nested buttons and shielding background tiles during modal presentations.
* **Cryptographic Protocol:** Web Crypto API using AES-256-GCM and HKDF-SHA256 for authenticated two-way handshakes (`pair_ack`).

---

### 🙏 Acknowledgments & Credits

This project stands on the shoulders of remarkable open-source engineering:

* **[Home Assistant](https://www.home-assistant.io/):** The Home Assistant development team for building the world's most versatile smart home platform.
* **[cauliflowermossgrape](https://github.com/cauliflowermossgrape/idrive7-apps):** For the MGU App Kit architecture and vehicle lifecycle bindings.
* **[hexlay](https://github.com/hexlay/idrive7-custom-apps):** For the E2E encrypted relay pairing design (GPL-3.0).
* **[Project Nayuki](https://www.nayuki.io/page/qr-code-generator-library):** For the lightweight QR code generation library (MIT).

---

### ⚖️ Legal Disclaimer & License

> **IMPORTANT NOTICE:**  
> This software is an **independent fan and research project by Marko DEV**.  
> 
> 1. **Trademarks:** "BMW", "iDrive", "MGU", and related brand assets are registered trademarks of **Bayerische Motoren Werke AG (BMW AG)**. "Home Assistant" is a registered trademark of the **Open Home Foundation**. This project is **not affiliated with, endorsed by, or sponsored by BMW AG or the Open Home Foundation**.
> 2. **No Proprietary Code:** This repository contains **no proprietary BMW source code**, internal vehicle firmware binaries, or commercial BMW SDKs.
> 3. **Road Safety & Liability:** Operating infotainment systems must never distract the driver. Usage is entirely **at your own risk**. The author assumes no responsibility for any malfunction, vehicle damages, or smart home incidents.

---

<p align="center">
  <b>Developed by Marko DEV</b> &bull; <a href="https://buymeacoffee.com/makiidrajf0">buymeacoffee.com/makiidrajf0</a>
</p>
