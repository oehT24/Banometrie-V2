// REVERSE — interactive parts of the site
// 1. Financial Decision Engine example (600 lei budget, 200 lei target reserve)
// 2. Budget explorer, data copied from REVERSE_Buget.xlsx (sheets "Sumar" and "Buget detaliat")

(function () {
  "use strict";

  /* ---------- 1. Simulator ---------- */

  var BUDGET = 600;
  var RESERVE = 200;

  var scenarios = {
    nou: { label: "Produs nou", cost: 500, check: "Utilizare, garantie, cost total" },
    recond: { label: "Produs reconditionat", cost: 340, check: "Stare, garantie, durata de viata" },
    imprumut: { label: "Imprumut de la scoala", cost: 40, check: "Disponibilitate, timp, compatibilitate" }
  };

  var buttons = document.querySelectorAll(".scenario");
  var els = {
    name: document.getElementById("res-name"),
    cost: document.getElementById("res-cost"),
    left: document.getElementById("res-left"),
    fill: document.getElementById("meter-fill"),
    verdict: document.getElementById("res-verdict"),
    check: document.getElementById("res-check")
  };

  function show(id) {
    var s = scenarios[id];
    if (!s) return;
    var left = BUDGET - s.cost;
    var ok = left >= RESERVE;

    els.name.textContent = s.label;
    els.cost.textContent = s.cost + " lei";
    els.left.textContent = left + " lei";
    els.fill.style.width = (s.cost / BUDGET) * 100 + "%";
    els.fill.classList.toggle("bad", !ok);
    els.verdict.classList.toggle("bad", !ok);
    els.verdict.textContent = ok
      ? "Respecta rezerva tinta de " + RESERVE + " lei"
      : "Nu respecta rezerva tinta de " + RESERVE + " lei";
    els.check.textContent = s.check;

    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.id === id));
    });
  }

  if (buttons.length) {
    buttons.forEach(function (b) {
      b.addEventListener("click", function () { show(b.dataset.id); });
    });
    show("recond");
  }

  /* ---------- 2. Budget explorer ---------- */

  var BUDGET_DATA = {
 "ceiling": 5000,
 "allocated": 4800,
 "unallocated": 200,
 "cats": [
  {
   "name": "Infrastructura digitala",
   "approved": 700
  },
  {
   "name": "Dezvoltare produs & UX",
   "approved": 850
  },
  {
   "name": "Cercetare & validare",
   "approved": 350
  },
  {
   "name": "Implementare pilot",
   "approved": 850
  },
  {
   "name": "Marketing & recrutare",
   "approved": 300
  },
  {
   "name": "Masurare impact & evaluare",
   "approved": 450
  },
  {
   "name": "Parteneriate & achizitii",
   "approved": 350
  },
  {
   "name": "Protectia datelor & accesibilitate",
   "approved": 250
  },
  {
   "name": "Logistica & operatiuni",
   "approved": 250
  },
  {
   "name": "Rezerva pentru cheltuieli neprevazute",
   "approved": 450
  }
 ],
 "items": [
  [
   "Infrastructura digitala",
   "Domeniu web",
   120,
   "Inregistrarea domeniului proiectului pentru perioada de implementare.",
   "Recomandata"
  ],
  [
   "Infrastructura digitala",
   "Hosting / gazduire",
   240,
   "Gazduirea platformei si mentinerea disponibilitatii acesteia.",
   "Esentiala"
  ],
  [
   "Infrastructura digitala",
   "Instrumente software",
   180,
   "Instrumente digitale necesare construirii si administrarii proiectului.",
   "Esentiala"
  ],
  [
   "Infrastructura digitala",
   "Backup si securitate",
   80,
   "Copii de siguranta si masuri de baza pentru protejarea datelor.",
   "Recomandata"
  ],
  [
   "Infrastructura digitala",
   "Testare tehnica",
   80,
   "Verificarea functionarii platformei pe dispozitive si browsere diferite.",
   "Esentiala"
  ],
  [
   "Dezvoltare produs & UX",
   "UX/UI si structurarea interfetei",
   350,
   "Proiectarea experientei utilizatorului si a aspectului platformei.",
   "Esentiala"
  ],
  [
   "Dezvoltare produs & UX",
   "Dezvoltarea MVP-ului interactiv",
   250,
   "Construirea versiunii minime functionale a produsului.",
   "Esentiala"
  ],
  [
   "Dezvoltare produs & UX",
   "User journey si fluxuri de utilizare",
   100,
   "Definirea pasilor parcursi de utilizator in platforma.",
   "Recomandata"
  ],
  [
   "Dezvoltare produs & UX",
   "Iteratii si imbunatatiri",
   100,
   "Corectarea problemelor si ajustarea produsului dupa feedback.",
   "Recomandata"
  ],
  [
   "Dezvoltare produs & UX",
   "Verificare accesibilitate initiala",
   50,
   "Verificari de baza privind lizibilitatea si usurinta utilizarii.",
   "Esentiala"
  ],
  [
   "Cercetare & validare",
   "Chestionare si instrumente de colectare",
   30,
   "Crearea si administrarea instrumentelor de cercetare.",
   "Esentiala"
  ],
  [
   "Cercetare & validare",
   "Stimulente simbolice pentru participanti",
   150,
   "Mici stimulente pentru incurajarea participarii la cercetare, daca regulile proiectului permit.",
   "Optionala"
  ],
  [
   "Cercetare & validare",
   "Analiza raspunsurilor",
   100,
   "Centralizarea si interpretarea datelor colectate.",
   "Esentiala"
  ],
  [
   "Cercetare & validare",
   "Materiale pentru validare",
   70,
   "Materiale suport pentru interviuri, testare si feedback.",
   "Recomandata"
  ],
  [
   "Implementare pilot",
   "Materiale pentru workshopuri",
   180,
   "Fise de lucru, exercitii, consumabile si materiale educationale.",
   "Esentiala"
  ],
  [
   "Implementare pilot",
   "Spatiu pentru activitati",
   200,
   "Costuri estimate pentru utilizarea unui spatiu, daca nu este oferit gratuit de parteneri.",
   "Optionala"
  ],
  [
   "Implementare pilot",
   "Echipamente si suport tehnic",
   150,
   "Inchiriere sau utilizare de echipamente necesare sesiunilor.",
   "Recomandata"
  ],
  [
   "Implementare pilot",
   "Facilitare / formator",
   200,
   "Sprijin pentru pregatirea si desfasurarea sesiunilor pilot.",
   "Recomandata"
  ],
  [
   "Implementare pilot",
   "Apa si gustari pentru participanti",
   80,
   "Consumabile de baza pentru desfasurarea activitatilor.",
   "Optionala"
  ],
  [
   "Implementare pilot",
   "Transport local pentru implementare",
   40,
   "Deplasari locale strict legate de activitatile pilot.",
   "Recomandata"
  ],
  [
   "Marketing & recrutare",
   "Elemente vizuale si machete",
   80,
   "Adaptarea identitatii vizuale pentru materialele de promovare.",
   "Recomandata"
  ],
  [
   "Marketing & recrutare",
   "Promovare online",
   100,
   "Buget limitat pentru promovarea activitatilor si recrutarea participantilor.",
   "Optionala"
  ],
  [
   "Marketing & recrutare",
   "Materiale tiparite",
   70,
   "Afise, flyere sau materiale informative.",
   "Optionala"
  ],
  [
   "Marketing & recrutare",
   "Foto-video / documentare",
   50,
   "Documentarea activitatilor pentru raportare si comunicare.",
   "Optionala"
  ],
  [
   "Masurare impact & evaluare",
   "Evaluare initiala si finala",
   120,
   "Instrumente si administrare pentru evaluarea progresului inainte si dupa program.",
   "Esentiala"
  ],
  [
   "Masurare impact & evaluare",
   "Urmarire la 30 de zile",
   100,
   "Chestionar de follow-up pentru masurarea mentinerii comportamentelor.",
   "Esentiala"
  ],
  [
   "Masurare impact & evaluare",
   "Prelucrarea datelor",
   100,
   "Curatarea, centralizarea si analiza rezultatelor.",
   "Esentiala"
  ],
  [
   "Masurare impact & evaluare",
   "Raport de impact",
   80,
   "Redactarea concluziilor si prezentarea rezultatelor masurate.",
   "Recomandata"
  ],
  [
   "Masurare impact & evaluare",
   "Dashboard / vizualizarea indicatorilor",
   50,
   "Reprezentarea clara a rezultatelor si KPI-urilor.",
   "Optionala"
  ],
  [
   "Parteneriate & achizitii",
   "Kituri informative pentru parteneri",
   100,
   "Materiale de prezentare si informare pentru organizatiile partenere.",
   "Recomandata"
  ],
  [
   "Parteneriate & achizitii",
   "Deplasari pentru intalniri",
   80,
   "Transport pentru intalniri si coordonarea parteneriatelor.",
   "Recomandata"
  ],
  [
   "Parteneriate & achizitii",
   "Documente si administrare parteneriate",
   50,
   "Pregatirea si gestionarea documentelor de colaborare.",
   "Esentiala"
  ],
  [
   "Parteneriate & achizitii",
   "Achizitii auxiliare pentru proiect",
   120,
   "Consumabile si materiale necesare colaborarilor si activitatilor comune.",
   "Recomandata"
  ],
  [
   "Protectia datelor & accesibilitate",
   "Revizuire documente de confidentialitate",
   100,
   "Verificarea documentelor si procedurilor de protectie a datelor.",
   "Esentiala"
  ],
  [
   "Protectia datelor & accesibilitate",
   "Formulare de informare si acord",
   30,
   "Materiale pentru informarea participantilor si obtinerea acordurilor necesare.",
   "Esentiala"
  ],
  [
   "Protectia datelor & accesibilitate",
   "Verificare accesibilitate",
   70,
   "Verificarea accesibilitatii materialelor si platformei.",
   "Recomandata"
  ],
  [
   "Protectia datelor & accesibilitate",
   "Gestionare sigura a datelor",
   50,
   "Masuri si instrumente de baza pentru acces controlat si pastrarea datelor.",
   "Esentiala"
  ],
  [
   "Logistica & operatiuni",
   "Transport operational",
   100,
   "Deplasari pentru transportul materialelor si coordonarea activitatilor.",
   "Recomandata"
  ],
  [
   "Logistica & operatiuni",
   "Livrare si expediere",
   40,
   "Costuri de livrare pentru materiale si consumabile.",
   "Recomandata"
  ],
  [
   "Logistica & operatiuni",
   "Depozitare temporara",
   30,
   "Pastrarea temporara a materialelor proiectului.",
   "Optionala"
  ],
  [
   "Logistica & operatiuni",
   "Papetarie si consumabile administrative",
   40,
   "Consumabile administrative pentru organizarea proiectului.",
   "Optionala"
  ],
  [
   "Logistica & operatiuni",
   "Cheltuieli operationale diverse",
   40,
   "Cheltuieli mici, direct legate de implementare si documentate.",
   "Optionala"
  ],
  [
   "Rezerva pentru cheltuieli neprevazute",
   "Ajustari tehnice neprevazute",
   150,
   "Rezerva pentru costuri tehnice suplimentare justificate.",
   "Rezerva conditionata"
  ],
  [
   "Rezerva pentru cheltuieli neprevazute",
   "Costuri suplimentare pentru pilot",
   150,
   "Rezerva pentru nevoi aparute in timpul activitatilor pilot.",
   "Rezerva conditionata"
  ],
  [
   "Rezerva pentru cheltuieli neprevazute",
   "Variatii de pret",
   100,
   "Acoperirea variatiilor de pret la bunuri si servicii.",
   "Rezerva conditionata"
  ],
  [
   "Rezerva pentru cheltuieli neprevazute",
   "Alte situatii justificate",
   50,
   "Rezerva utilizata numai cu justificare si aprobare.",
   "Rezerva conditionata"
  ]
 ]
};

  var PRIORITIES = [
    { key: "Esentiala", label: "Esentiala", cls: "es" },
    { key: "Recomandata", label: "Recomandata", cls: "rec" },
    { key: "Optionala", label: "Optionala", cls: "" },
    { key: "Rezerva conditionata", label: "Rezerva conditionata", cls: "res" }
  ];
  var prMap = {};
  PRIORITIES.forEach(function (p) { prMap[p.key] = p; });

  var items = BUDGET_DATA.items.map(function (r) {
    return { cat: r[0], name: r[1], cost: r[2], why: r[3], pr: r[4] };
  });

  var active = {};
  PRIORITIES.forEach(function (p) { active[p.key] = true; });
  var openCats = {};

  var rowsEl = document.getElementById("budget-rows");
  var chipsEl = document.getElementById("priority-chips");
  var totalEl = document.getElementById("b-total");
  var noteEl = document.getElementById("b-note");

  if (!rowsEl || !chipsEl) return;

  function fmt(n) {
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  var maxCat = Math.max.apply(null, BUDGET_DATA.cats.map(function (c) { return c.approved; }));

  function renderChips() {
    chipsEl.textContent = "";
    PRIORITIES.forEach(function (p) {
      var sum = items.filter(function (i) { return i.pr === p.key; })
        .reduce(function (a, i) { return a + i.cost; }, 0);
      var b = el("button", "chip", p.label + " · " + fmt(sum) + " €");
      b.type = "button";
      b.setAttribute("aria-pressed", String(active[p.key]));
      b.addEventListener("click", function () {
        active[p.key] = !active[p.key];
        renderChips();
        renderRows();
      });
      chipsEl.appendChild(b);
    });
  }

  function renderRows() {
    rowsEl.textContent = "";
    var total = 0;

    BUDGET_DATA.cats.forEach(function (c) {
      var lines = items.filter(function (i) { return i.cat === c.name && active[i.pr]; });
      var sum = lines.reduce(function (a, i) { return a + i.cost; }, 0);
      total += sum;

      var d = el("details", "cat" + (c.name.indexOf("Rezerva") === 0 ? " reserve" : ""));
      if (openCats[c.name]) d.open = true;
      d.addEventListener("toggle", function () { openCats[c.name] = d.open; });

      var s = el("summary");
      s.appendChild(el("span", "cname", c.name));
      var bar = el("div", "bar");
      var fill = el("i");
      fill.style.width = (sum / maxCat) * 100 + "%";
      bar.appendChild(fill);
      s.appendChild(bar);
      s.appendChild(el("span", "camt", fmt(sum) + " €"));
      d.appendChild(s);

      var box = el("div", "lines");
      if (!lines.length) {
        box.appendChild(el("p", "note", "Nicio cheltuiala in aceasta categorie cu prioritatile selectate."));
      }
      lines.forEach(function (i) {
        var row = el("div", "line");
        var t = el("div", "ltitle");
        t.appendChild(el("span", null, i.name));
        var p = prMap[i.pr];
        t.appendChild(el("span", "pr " + p.cls, p.label));
        row.appendChild(t);
        row.appendChild(el("div", "ldesc", i.why));
        row.appendChild(el("div", "lcost", fmt(i.cost) + " €"));
        box.appendChild(row);
      });
      d.appendChild(box);
      rowsEl.appendChild(d);
    });

    totalEl.textContent = fmt(total) + " €";
    var all = PRIORITIES.every(function (p) { return active[p.key]; });
    noteEl.textContent = all
      ? "din " + fmt(BUDGET_DATA.allocated) + " € alocati, toate prioritatile incluse"
      : "din " + fmt(BUDGET_DATA.allocated) + " € alocati; " + fmt(BUDGET_DATA.allocated - total) + " € sunt scosi din calcul";
  }

  renderChips();
  renderRows();
})();
