'use strict';
/**
 * ui.js - the Home Assistant screens, a PURE draw(cv, G, t, v, act) (renders on the car and in the PC emulator).
 *
 *   Home        tiles: lights, switches, scenes, scripts, sensors, lock / garage door (guarded)
 *   Auto an HA  the car's data and the "send to Home Assistant" switch
 *   Status      connection, mode, the safety rules
 *
 * v = { page, pages, pageIdx, mode ('demo' | 'live' | 'error'), readOnly, tiles[], tilePage, tilePages, armed (tile index or -1),
 *       statusLine, statusBad, car{}, send{}, info{} }     act = { tile(i), pager(), reload(), toggleSend() }
 */
const W = 1600;
const L = { literal: true };
const TR = { 'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'Ä': 'Ae', 'Ö': 'Oe', 'Ü': 'Ue', 'ß': 'ss' };
// the kit fonts have no umlauts (113 glyphs): write them out
const de = (x) => String(x).replace(/[äöüÄÖÜß]/g, (c) => TR[c]);
const txt = (c, str, x, y, size, col, o) => c.text(de(str), x, y, size, col, o);
const tww = (c, str, size, o) => c.textWidth(de(str), size, o);

const ON = ['on', 'unlocked', 'open', 'heat', 'cool', 'playing', 'home'];
const isOn = (tl) => ON.indexOf(tl.state) >= 0;

function stateText(tl) {
    if (!tl.available) return 'nicht verfügbar';
    if (tl.domain === 'sensor' || tl.domain === 'binary_sensor' || tl.domain === 'climate') return tl.state + (tl.unit ? ' ' + tl.unit : '');
    const m = { on: 'AN', off: 'AUS', locked: 'verriegelt', unlocked: 'offen', open: 'offen', closed: 'zu', scening: 'Szene' };
    return m[tl.state] || tl.state;
}

/* ---- little icons from lines and circles ---- */
function icon(cv, G, t, tl, cx, cy, on) {
    const c = on ? (tl.domain === 'light' ? '#f5b942' : '#4aa3ff') : G.withAlpha('#ffffff', 0.55), dim = G.withAlpha('#ffffff', 0.18);
    const d = tl.domain;
    if (d === 'light') {
        if (on) cv.circle(cx, cy - 2, 15, c); else cv.arc(cx, cy - 2, 12, 15, 0, 360, c);
        cv.fillRect(cx - 7, cy + 15, 14, 5, c);
        for (let i = 0; i < 8; i++) {
            const a = i * Math.PI / 4, r0 = 22, r1 = 30;
            if (on) cv.line(cx + Math.sin(a) * r0, cy - 2 - Math.cos(a) * r0, cx + Math.sin(a) * r1, cy - 2 - Math.cos(a) * r1, 3, c);
        }
    } else if (d === 'switch' || d === 'input_boolean' || d === 'fan') {
        cv.roundRect(cx - 30, cy - 15, 60, 30, 15, on ? c : dim);
        cv.circle(cx + (on ? 15 : -15), cy, 11, on ? '#ffffff' : G.withAlpha('#ffffff', 0.7));
    } else if (d === 'scene' || d === 'script' || d === 'button') {
        cv.circle(cx, cy, 26, dim);
        cv.quad([[cx - 8, cy - 14], [cx - 8, cy + 14], [cx + 15, cy], [cx + 3.5, cy - 7]], c);   // a triangle: the 4th point sits on an edge
    } else if (d === 'lock') {
        cv.strokeRoundRect(cx - 13, cy - 28, 26, 24, 12, 4, c);
        cv.roundRect(cx - 20, cy - 8, 40, 32, 6, c);
        cv.circle(cx, cy + 6, 4, G.withAlpha('#000000', 0.6));
    } else if (d === 'cover') {
        cv.roundRect(cx - 28, cy - 20, 56, 44, 5, dim);
        for (let i = 0; i < 4; i++) cv.fillRect(cx - 24, cy - 14 + i * 10, 48, 4, on ? G.withAlpha(c, 0.35) : c);
    } else {
        cv.arc(cx, cy, 20, 25, 0, 360, c);
        cv.fillRect(cx - 2, cy - 14, 4, 16, c);
        cv.circle(cx, cy + 6, 4, c);
    }
}

function tile(cv, G, t, x, y, w, h, tl, i, v, act) {
    const on = isOn(tl), armed = v.armed === i;
    const accent = tl.domain === 'light' ? '#f5b942' : '#4aa3ff';   // warm for lights, blue for the rest (red is for warnings)
    cv.roundRect(x, y, w, h, 20, on ? G.withAlpha(accent, 0.26) : G.withAlpha('#ffffff', 0.07));
    cv.strokeRoundRect(x, y, w, h, 20, armed ? 3 : 2, armed ? (t.crit || '#ef2b2d') : on ? accent : G.withAlpha('#ffffff', 0.16));
    txt(cv, tl.name, x + 24, y + 46, 30, t.text, { font: 'bold', literal: true });
    const dimmed = !tl.available;
    txt(cv, armed ? 'Nochmal tippen' : stateText(tl), x + 24, y + h - 26, 27, armed ? (t.crit || '#ef2b2d') : dimmed ? t.dim : on ? t.text : t.dim, L);
    icon(cv, G, t, tl, x + w - 64, y + h / 2 + 2, on);
    if (tl.why && tl.why !== 'nur lesen') {
        const tw = tww(cv, tl.why, 18, L) + 22;
        cv.roundRect(x + w - tw - 14, y + 12, tw, 28, 14, G.withAlpha('#ffffff', 0.12));
        txt(cv, tl.why, x + w - 14 - tw / 2, y + 32, 18, t.dim, { align: 'center', literal: true });
    } else if (tl.needsConfirm && tl.canAct) {
        txt(cv, 'geschützt', x + w - 20, y + 32, 18, t.warn || '#d29922', { align: 'right', literal: true });
    }
    if (cv.own && cv.target && act && act.tile && tl.available !== undefined) cv.target(x, y, w, h, () => act.tile(i), 'tile' + i);
}

function drawHome(cv, G, t, v, act, bottom) {
    const x0 = 52, y0 = G.TOP + 22, cols = 4, gap = 18, inner = W - 104;
    const tw = (inner - gap * (cols - 1)) / cols;
    const areaH = bottom - y0 - 82, th = (areaH - gap) / 2;
    const per = cols * 2, first = v.tilePage * per;
    if (!v.tiles.length) {
        txt(cv, v.mode === 'error' ? 'Konfiguration prüfen' : 'Keine Einträge', W / 2, y0 + 110, 36, t.text, { align: 'center', font: 'bold', literal: true });
        txt(cv, v.mode === 'error' ? v.statusLine : 'Im Tab "Geraete" Geraete auswaehlen.', W / 2, y0 + 160, 26, t.dim, { align: 'center', literal: true });
    }
    for (let k = 0; k < per; k++) {
        const tl = v.tiles[first + k];
        if (!tl) break;
        tile(cv, G, t, x0 + (k % cols) * (tw + gap), y0 + Math.floor(k / cols) * (th + gap), tw, th, tl, first + k, v, act);
    }
    // bottom row: pager, status line, reload
    const by = bottom - 62;
    let bx = x0;
    if (v.tilePages > 1) bx += G.button(cv, t, bx, by, 0, 52, 'Seite ' + (v.tilePage + 1) + '/' + v.tilePages, act.pager, { key: 'pager' }) + 22;
    txt(cv, v.statusLine, bx, by + 36, 26, v.statusBad ? (t.crit || '#ef2b2d') : t.dim, L);
    const rw = tww(cv, 'NEU LADEN', 21, { font: 'bold', spacing: 1.5 }) + 62;
    G.button(cv, t, W - 52 - rw, by, rw, 52, 'Neu laden', act.reload, { key: 'reload' });
}

function line(cv, G, t, x, y, w, label, value, hot) {
    txt(cv, label, x, y, 26, t.dim, L);
    txt(cv, value, x + w, y, 30, hot ? (t.accent2 || '#81c4ff') : t.text, { align: 'right', font: 'bold', literal: true });
    cv.fillRect(x, y + 14, w, 1, G.withAlpha('#ffffff', 0.1));
}

function drawCar(cv, G, t, v, act, bottom) {
    const c = v.car || {}, s = v.send || {}, f = (n, d) => (Number.isFinite(n) ? n.toFixed(d || 0) : '—');
    const x0 = 64, y0 = G.TOP + 56, w = 640;
    txt(cv, 'Fahrzeugdaten', x0, G.TOP + 40, 24, t.dim, { font: 'bold', spacing: 2, literal: true });
    line(cv, G, t, x0, y0 + 30, w, 'Geschwindigkeit', f(c.speed) + ' km/h');
    line(cv, G, t, x0, y0 + 90, w, 'Drehzahl', f(c.rpm) + ' U/min');
    line(cv, G, t, x0, y0 + 150, w, 'Öltemperatur', f(c.oil) + ' °C');
    line(cv, G, t, x0, y0 + 210, w, 'Kühlwasser', f(c.coolant) + ' °C');
    line(cv, G, t, x0, y0 + 270, w, 'Gang', c.gear === undefined || c.gear === null ? '—' : String(c.gear < 0 ? 'R' : c.gear === 0 ? 'N/P' : c.gear));
    if (c.demo) txt(cv, 'Demo-Fahrt: simulierte Werte', x0, y0 + 330, 22, t.warn || '#d29922', L);

    const x1 = 790, w1 = 740;
    txt(cv, 'An Home Assistant senden', x1, G.TOP + 40, 24, t.dim, { font: 'bold', spacing: 2, literal: true });
    G.button(cv, t, x1, y0 + 6, 300, 64, s.on ? 'Senden: AN' : 'Senden: AUS', act.toggleSend, { key: 'send', primary: !!s.on });
    txt(cv, 'alle ' + s.every + ' s', x1 + 326, y0 + 48, 28, t.text, L);
    line(cv, G, t, x1, y0 + 120, w1, 'Ziel', s.target || 'nicht eingerichtet');
    line(cv, G, t, x1, y0 + 180, w1, 'Letzter Versand', s.last || '—');
    line(cv, G, t, x1, y0 + 240, w1, 'Ergebnis', s.text || '—', s.ok === true);
    line(cv, G, t, x1, y0 + 300, w1, 'Gesendet', String(s.count || 0) + ' Mal');
    txt(cv, 'In Home Assistant: Automation mit Auslöser "Webhook" und der webhookId aus ha.json.', x1, y0 + 350, 20, t.dim, L);
}

function drawStatus(cv, G, t, v) {
    const i = v.info || {}, x0 = 64, w = 1470, y0 = G.TOP + 100;
    txt(cv, 'Verbindung', x0, G.TOP + 40, 24, t.dim, { font: 'bold', spacing: 2, literal: true });
    line(cv, G, t, x0, y0, w, 'Modus', i.mode);
    line(cv, G, t, x0, y0 + 56, w, 'Home Assistant', i.host || '—');
    line(cv, G, t, x0, y0 + 112, w, 'Erreichbar', i.reachable);
    line(cv, G, t, x0, y0 + 168, w, 'Einträge', String(i.entities));
    line(cv, G, t, x0, y0 + 224, w, 'Letzte Abfrage', i.poll || '—');
    if (i.error) txt(cv, i.error, x0, y0 + 270, 26, t.crit || '#ef2b2d', L);
    txt(cv, 'Schutz: ohne "control": true wird nichts geschaltet. Schloss, Garagentor und Alarm nur mit "confirm": true und zweitem Tippen.', x0, y0 + 316, 22, t.dim, L);
}

function drawPair(cv, G, t, v, act, bottom) {
    const p = v.pair || {}, x0 = 64, y0 = G.TOP + 34, S = 360, card = S + 40;
    cv.roundRect(x0, y0, card, card, 18, '#ffffff');
    if (p.qr) {
        const m = Math.max(1, Math.floor(S / p.qr.size)), off = Math.floor((card - m * p.qr.size) / 2);
        p.qr.runs.forEach((r) => cv.fillRect(x0 + off + r.x * m, y0 + off + r.y * m, r.w * m, m, '#000000'));
    } else if (v.page === 'Verbinden') txt(cv, 'QR-Code nicht verfügbar', x0 + card / 2, y0 + card / 2, 24, '#555555', { align: 'center', literal: true });
    const x1 = x0 + card + 50;
    txt(cv, 'Mit dem Handy verbinden', x1, G.TOP + 40, 24, t.dim, { font: 'bold', spacing: 2, literal: true });
    txt(cv, '1   QR-Code mit der Handy-Kamera scannen', x1, y0 + 62, 30, t.text, { font: 'bold', literal: true });
    txt(cv, '2   Adresse und Token von Home Assistant eingeben', x1, y0 + 118, 30, t.text, { font: 'bold', literal: true });
    txt(cv, '3   Senden. Das Auto uebernimmt die Daten', x1, y0 + 174, 30, t.text, { font: 'bold', literal: true });
    txt(cv, 'Seite auf dem Handy: ' + (p.page || ''), x1, y0 + 226, 22, t.dim, L);
    txt(cv, 'Code ' + (p.code || ''), x1, y0 + 262, 22, t.dim, L);
    const last = p.last || {};
    const col = last.ok === true ? (t.accent2 || '#4aa3ff') : last.ok === false ? (t.crit || '#ef2b2d') : t.dim;
    txt(cv, last.ok === null || !last.at ? (p.paired ? 'Verbunden. Neu koppeln ersetzt die Zugangsdaten.' : 'Warte auf das Handy ...') : last.text + ' (' + p.ago + ')', x1, y0 + 312, 28, col, { font: 'bold', literal: true });
    txt(cv, 'Das Handy setzt nur Adresse, Token und Webhook-ID. Schalten gibst du nie vom Handy aus frei.', x1, y0 + 352, 20, t.dim, L);
    G.button(cv, t, x1, bottom - 62, 0, 52, 'Neu koppeln', act.resetPair, { key: 'resetpair', confirm: true });
}

function drawDevices(cv, G, t, v, act, bottom) {
    const dv = v.dev || {}, x0 = 52, inner = W - 104, cols = 4, gap = 18;
    let fx = x0;
    (dv.filters || []).forEach((name, i) => { fx += G.button(cv, t, fx, G.TOP + 14, 0, 44, name, () => act.devFilter(i), { key: 'flt' + i, primary: i === dv.filter }) + 12; });
    const y0 = G.TOP + 74, areaH = bottom - y0 - 82, th = (areaH - gap) / 2, tw = (inner - gap * (cols - 1)) / cols;
    if (dv.loading) txt(cv, 'Lade Geraete ...', W / 2, y0 + 110, 32, t.dim, { align: 'center', literal: true });
    else if (!dv.items || !dv.items.length) txt(cv, dv.error || 'Keine Geraete in dieser Gruppe', W / 2, y0 + 110, 30, dv.error ? (t.crit || '#ef2b2d') : t.dim, { align: 'center', literal: true });
    (dv.items || []).forEach((it, k) => {
        const x = x0 + (k % cols) * (tw + gap), y = y0 + Math.floor(k / cols) * (th + gap), on = it.onHome;
        cv.roundRect(x, y, tw, th, 20, on ? G.withAlpha('#4aa3ff', 0.22) : G.withAlpha('#ffffff', 0.07));
        cv.strokeRoundRect(x, y, tw, th, 20, 2, on ? '#4aa3ff' : G.withAlpha('#ffffff', 0.16));
        txt(cv, it.name, x + 22, y + 42, 28, t.text, { font: 'bold', literal: true });
        txt(cv, it.domainLabel + ' · ' + it.stateText, x + 22, y + th - 56, 22, t.dim, L);
        txt(cv, on ? 'auf Home  (tippen = entfernen)' : 'tippen = auf Home', x + 22, y + th - 20, 22, on ? '#4aa3ff' : t.dim, L);
        if (cv.own && cv.target) cv.target(x, y, tw, th, () => act.devToggle(k), 'dev' + k);
    });
    const by = bottom - 62;
    let bx = x0;
    if (dv.pages > 1) bx += G.button(cv, t, bx, by, 0, 52, 'Seite ' + (dv.page + 1) + '/' + dv.pages, act.devPager, { key: 'devpager' }) + 22;
    txt(cv, (dv.note || (dv.onHomeCount + ' Geraete auf Home, neue sind nur lesend')), bx, by + 36, 26, dv.noteBad ? (t.crit || '#ef2b2d') : t.dim, L);
    const rw = tww(cv, 'NEU LADEN', 21, { font: 'bold', spacing: 1.5 }) + 62;
    G.button(cv, t, W - 52 - rw, by, rw, 52, 'Neu laden', act.devRefresh, { key: 'devreload' });
}

function draw(cv, G, t, v, act) {
    cv.clear(t.bg);
    const badges = [];
    if (v.mode === 'demo') badges.push({ text: 'DEMO' });
    else if (v.mode === 'error') badges.push({ text: 'KONFIG', color: t.crit || '#ef2b2d' });
    else badges.push(v.readOnly ? { text: 'NUR LESEN', color: 'dim' } : { text: 'STEUERUNG AN', color: t.warn || '#d29922' });
    G.frame(cv, t, v.pages, v.pageIdx, badges);
    G.panel(cv, t, 24, G.TOP, W - 48, G.BOTTOM - G.TOP, null);
    const bottom = G.pageBottom(cv) - (cv.own ? G.MARGIN : 0);
    act = act || {};
    if (v.page === 'Home') drawHome(cv, G, t, v, act, bottom);
    else if (v.page === 'Auto an HA') drawCar(cv, G, t, v, act, bottom);
    else if (v.page === 'Verbinden') drawPair(cv, G, t, v, act, bottom);
    else if (v.page === 'Geraete') drawDevices(cv, G, t, v, act, bottom);
    else drawStatus(cv, G, t, v);
}

module.exports = { draw, W, H: 520 };
