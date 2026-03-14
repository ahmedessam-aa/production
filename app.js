
const STORAGE_KEY = "albahnsawe_db";
const memoryStore = {};

const els = {
  sectionTitle: document.getElementById("section-title"),
  navItems: document.querySelectorAll(".nav-item"),
  sections: document.querySelectorAll(".section"),
  toast: document.getElementById("toast"),
  resetDemo: document.getElementById("reset-demo"),
  rawForm: document.getElementById("raw-form"),
  rawId: document.getElementById("raw-id"),
  rawName: document.getElementById("raw-name"),
  rawPrice: document.getElementById("raw-price"),
  rawBagWeight: document.getElementById("raw-bag-weight"),
  rawBagCount: document.getElementById("raw-bag-count"),
  rawTotal: document.getElementById("raw-total"),
  rawDate: document.getElementById("raw-date"),
  rawTable: document.getElementById("raw-table"),
  rawReportTable: document.getElementById("raw-report-table"),
  rawSearch: document.getElementById("raw-search"),
  rawReset: document.getElementById("raw-reset"),
  blendForm: document.getElementById("blend-form"),
  blendId: document.getElementById("blend-id"),
  blendName: document.getElementById("blend-name"),
  blendComponents: document.getElementById("blend-components"),
  blendCards: document.getElementById("blend-cards"),
  addComponent: document.getElementById("add-component"),
  blendReset: document.getElementById("blend-reset"),
  roastForm: document.getElementById("roast-form"),
  roastBlend: document.getElementById("roast-blend"),
  roastBefore: document.getElementById("roast-before"),
  roastLoss: document.getElementById("roast-loss"),
  roastAfter: document.getElementById("roast-after"),
  roastDate: document.getElementById("roast-date"),
  roastBreakdown: document.getElementById("roast-breakdown"),
  roastReportTable: document.getElementById("roast-report-table"),
  productForm: document.getElementById("product-form"),
  productId: document.getElementById("product-id"),
  productName: document.getElementById("product-name"),
  productPack: document.getElementById("product-pack"),
  productPackPerCarton: document.getElementById("product-pack-per-carton"),
  productBagsPerPack: document.getElementById("product-bags-per-pack"),
  productSale: document.getElementById("product-sale"),
  productReset: document.getElementById("product-reset"),
  productSearch: document.getElementById("product-search"),
  productTable: document.getElementById("product-table"),
  productionForm: document.getElementById("production-form"),
  prodProduct: document.getElementById("prod-product"),
  prodBlend: document.getElementById("prod-blend"),
  prodPack: document.getElementById("prod-pack"),
  prodPackPerCarton: document.getElementById("prod-pack-per-carton"),
  prodBagsPerPack: document.getElementById("prod-bags-per-pack"),
  prodCartons: document.getElementById("prod-cartons"),
  prodBags: document.getElementById("prod-bags"),
  prodTotal: document.getElementById("prod-total"),
  prodSale: document.getElementById("prod-sale"),
  prodDate: document.getElementById("prod-date"),
  finishedTable: document.getElementById("finished-table"),
  finishedSearch: document.getElementById("finished-search"),
  finishedEditForm: document.getElementById("finished-edit-form"),
  finishedId: document.getElementById("finished-id"),
  finishedName: document.getElementById("finished-name"),
  finishedPack: document.getElementById("finished-pack"),
  finishedPackPerCarton: document.getElementById("finished-pack-per-carton"),
  finishedBagsPerPack: document.getElementById("finished-bags-per-pack"),
  finishedCartons: document.getElementById("finished-cartons"),
  finishedBags: document.getElementById("finished-bags"),
  finishedTotal: document.getElementById("finished-total"),
  finishedSale: document.getElementById("finished-sale"),
  finishedCancel: document.getElementById("finished-cancel"),
  maintenanceForm: document.getElementById("maintenance-form"),
  maintenanceId: document.getElementById("maintenance-id"),
  maintenanceType: document.getElementById("maintenance-type"),
  maintenanceMachine: document.getElementById("maintenance-machine"),
  maintenanceDate: document.getElementById("maintenance-date"),
  maintenanceCost: document.getElementById("maintenance-cost"),
  maintenanceNotes: document.getElementById("maintenance-notes"),
  maintenanceReset: document.getElementById("maintenance-reset"),
  maintenanceSearch: document.getElementById("maintenance-search"),
  maintenanceTable: document.getElementById("maintenance-table"),
  maintenanceReportTable: document.getElementById("maintenance-report-table"),
  reportDailyTable: document.getElementById("report-daily-table"),
  reportBlendTable: document.getElementById("report-blend-table"),
  reportConsumptionTable: document.getElementById("report-consumption-table"),
  reportFinishedTable: document.getElementById("report-finished-table"),
  reportBlendSpecificTable: document.getElementById("report-blend-specific-table"),
  reportBlendConsumptionTable: document.getElementById("report-blend-consumption-table"),
  profitGrid: document.getElementById("profit-grid"),
  exportJson: document.getElementById("export-json"),
  importJson: document.getElementById("import-json"),
  statRaw: document.getElementById("stat-raw"),
  statRoasted: document.getElementById("stat-roasted"),
  statFinished: document.getElementById("stat-finished"),
  statCost: document.getElementById("stat-cost"),
  statProfit: document.getElementById("stat-profit"),
};

let db = loadDB();
let chartProduction;
let chartConsumption;
let chartStock;

init();

function init() {
  ensureDefaults();
  bindNav();
  bindForms();
  bindReports();
  initReportFilters();
  setTodayDefaults();
  renderAll();
}

function loadDB() {
  const saved = safeGetItem(STORAGE_KEY);
  if (!saved) {
    return {
      rawBeans: [],
      blends: [],
      roasts: [],
      production: [],
      finishedGoods: [],
      roastedStockByBlend: {},
      roastedCostByBlend: {},
      products: [],
      maintenance: [],
    };
  }
  try {
    return JSON.parse(saved);
  } catch (err) {
    return {
      rawBeans: [],
      blends: [],
      roasts: [],
      production: [],
      finishedGoods: [],
      roastedStockByBlend: {},
      roastedCostByBlend: {},
      products: [],
      maintenance: [],
    };
  }
}

function saveDB() {
  safeSetItem(STORAGE_KEY, JSON.stringify(db));
}

function ensureDefaults() {
  if (!db.rawBeans) db.rawBeans = [];
  if (!db.roasts) db.roasts = [];
  if (!db.production) db.production = [];
  if (!db.finishedGoods) db.finishedGoods = [];
  if (!db.products) db.products = [];
  if (!db.maintenance) db.maintenance = [];

  db.rawBeans = db.rawBeans.map((item) => ({
    ...item,
    nameKey: item.nameKey || normalizeBeanName(item.name || ""),
  }));

  if (!db.blends || db.blends.length === 0) {
    db.blends = [
      {
        id: createId(),
        name: "توليفة المصنع",
        components: [
          { bean: "برازيلي", percent: 40 },
          { bean: "كولومبي", percent: 30 },
          { bean: "حبشي", percent: 20 },
          { bean: "هندي", percent: 10 },
        ],
      },
      {
        id: createId(),
        name: "توليفة اسبيشيال",
        components: [
          { bean: "حبشي", percent: 35 },
          { bean: "كولومبي", percent: 35 },
          { bean: "إندونيسي", percent: 30 },
        ],
      },
      {
        id: createId(),
        name: "توليفة المحلات",
        components: [
          { bean: "برازيلي", percent: 50 },
          { bean: "هندي", percent: 30 },
          { bean: "كولومبي", percent: 20 },
        ],
      },
    ];
  }

  if (db.products.length === 0) {
    db.products = [
      {
        id: createId(),
        name: "بن محوج 250 جم",
        packWeightGrams: 250,
        packPerCarton: 10,
        bagsPerPack: 10,
        salePricePerKg: 260,
      },
      {
        id: createId(),
        name: "بن اسبريسو 200 جم",
        packWeightGrams: 200,
        packPerCarton: 10,
        bagsPerPack: 10,
        salePricePerKg: 300,
      },
      {
        id: createId(),
        name: "بن محلات 500 جم",
        packWeightGrams: 500,
        packPerCarton: 10,
        bagsPerPack: 10,
        salePricePerKg: 240,
      },
    ];
  }

  db.production = db.production.map((item) => ({
    packPerCarton: item.packPerCarton || 10,
    bagsPerPack: item.bagsPerPack || 10,
    bagCount: item.bagCount || 0,
    cartonCount: item.cartonCount || 0,
    ...item,
  }));

  db.finishedGoods = db.finishedGoods.map((item) => ({
    date: item.date || "",
    packPerCarton: item.packPerCarton || 10,
    bagsPerPack: item.bagsPerPack || 10,
    bagCount: item.bagCount || 0,
    cartonCount: item.cartonCount || 0,
    ...item,
  }));

  if (!db.roastedStockByBlend) db.roastedStockByBlend = {};
  if (!db.roastedCostByBlend) db.roastedCostByBlend = {};
  saveDB();
}

function bindNav() {
  els.navItems.forEach((item) => {
    item.addEventListener("click", () => {
      els.navItems.forEach((btn) => btn.classList.remove("active"));
      item.classList.add("active");
      const target = item.dataset.target;
      els.sections.forEach((section) => {
        section.classList.toggle("active", section.id === target);
      });
      const title = item.textContent.trim();
      els.sectionTitle.textContent = title;
    });
  });
}

function bindForms() {
  els.rawBagCount.addEventListener("input", updateRawTotal);
  els.rawBagWeight.addEventListener("input", updateRawTotal);
  els.rawForm.addEventListener("submit", handleRawSubmit);
  els.rawReset.addEventListener("click", resetRawForm);
  els.rawSearch.addEventListener("input", () => filterTable(els.rawTable, els.rawSearch.value));

  els.addComponent.addEventListener("click", () => addComponentRow());
  els.blendForm.addEventListener("submit", handleBlendSubmit);
  els.blendReset.addEventListener("click", resetBlendForm);

  els.roastBlend.addEventListener("change", updateRoastBreakdown);
  els.roastBefore.addEventListener("input", updateRoastBreakdown);
  els.roastLoss.addEventListener("input", updateRoastBreakdown);
  els.roastForm.addEventListener("submit", handleRoastSubmit);

  els.productForm.addEventListener("submit", handleProductSubmit);
  els.productReset.addEventListener("click", resetProductForm);
  els.productSearch.addEventListener("input", () => filterTable(els.productTable, els.productSearch.value));

  els.prodProduct.addEventListener("change", applyProductToProduction);
  [
    els.prodPack,
    els.prodPackPerCarton,
    els.prodBagsPerPack,
    els.prodCartons,
  ].forEach((input) => input.addEventListener("input", updateProductionTotals));
  els.productionForm.addEventListener("submit", handleProductionSubmit);

  els.finishedSearch.addEventListener("input", () => filterTable(els.finishedTable, els.finishedSearch.value));
  els.finishedEditForm.addEventListener("submit", handleFinishedEdit);
  els.finishedCancel.addEventListener("click", () => {
    els.finishedEditForm.classList.add("hidden");
  });
  [
    els.finishedPack,
    els.finishedPackPerCarton,
    els.finishedBagsPerPack,
    els.finishedCartons,
  ].forEach((input) => input.addEventListener("input", updateFinishedTotals));

  els.maintenanceForm.addEventListener("submit", handleMaintenanceSubmit);
  els.maintenanceReset.addEventListener("click", resetMaintenanceForm);
  els.maintenanceSearch.addEventListener("input", () => filterTable(els.maintenanceTable, els.maintenanceSearch.value));

  els.exportJson.addEventListener("click", exportData);
  els.importJson.addEventListener("change", importData);

  els.resetDemo.addEventListener("click", () => {
    if (confirm("سيتم حذف جميع البيانات الحالية. هل تريد المتابعة؟")) {
      safeRemoveItem(STORAGE_KEY);
      db = loadDB();
      ensureDefaults();
      renderAll();
      showToast("تمت إعادة ضبط البيانات.");
    }
  });
}

function bindReports() {
  document.querySelectorAll("[data-print]").forEach((btn) => {
    btn.addEventListener("click", () => printReport(btn.dataset.print));
  });
  document.querySelectorAll("[data-pdf]").forEach((btn) => {
    btn.addEventListener("click", () => exportPdf(btn.dataset.pdf));
  });
}

function initReportFilters() {
  document.querySelectorAll(".report-card").forEach((card) => {
    if (card.querySelector(".report-filter")) return;
    const filter = document.createElement("div");
    filter.className = "report-filter";
    filter.innerHTML = `
      <div>
        <label>من تاريخ</label>
        <input type="date" data-filter="from" />
      </div>
      <div>
        <label>إلى تاريخ</label>
        <input type="date" data-filter="to" />
      </div>
      <button type="button" class="ghost" data-filter="clear">مسح الفلتر</button>
    `;
    const header = card.querySelector(".report-header");
    header.insertAdjacentElement("afterend", filter);
    filter.querySelectorAll("input").forEach((input) => {
      input.addEventListener("change", () => renderReportsOnly());
    });
    filter.querySelector("[data-filter=\"clear\"]").addEventListener("click", () => {
      filter.querySelectorAll("input").forEach((input) => (input.value = ""));
      renderReportsOnly();
    });
  });
}

function setTodayDefaults() {
  const today = new Date().toISOString().split("T")[0];
  els.rawDate.value = today;
  els.roastDate.value = today;
  els.prodDate.value = today;
  if (els.maintenanceDate) els.maintenanceDate.value = today;
}

function updateRawTotal() {
  const bagWeight = parseFloat(els.rawBagWeight.value) || 0;
  const bagCount = parseFloat(els.rawBagCount.value) || 0;
  els.rawTotal.value = roundNumber(bagWeight * bagCount);
}

function handleRawSubmit(event) {
  event.preventDefault();
  const entry = {
    id: els.rawId.value || createId(),
    name: els.rawName.value.trim(),
    nameKey: normalizeBeanName(els.rawName.value),
    pricePerKg: toNumber(els.rawPrice.value),
    bagWeightKg: toNumber(els.rawBagWeight.value),
    bagCount: toNumber(els.rawBagCount.value),
    totalWeightKg: toNumber(els.rawTotal.value),
    addedAt: els.rawDate.value,
  };

  if (!entry.name) {
    showToast("يرجى إدخال اسم البن.");
    return;
  }

  const index = db.rawBeans.findIndex((item) => item.id === entry.id);
  if (index >= 0) {
    db.rawBeans[index] = entry;
    showToast("تم تحديث بيانات البن الأخضر.");
  } else {
    db.rawBeans.push(entry);
    showToast("تمت إضافة البن الأخضر.");
  }
  saveDB();
  resetRawForm();
  renderAll();
}

function resetRawForm() {
  els.rawId.value = "";
  els.rawForm.reset();
  updateRawTotal();
  setTodayDefaults();
}

function handleBlendSubmit(event) {
  event.preventDefault();
  const name = els.blendName.value.trim();
  const components = collectComponents();
  if (!name) {
    showToast("يرجى إدخال اسم التوليفة.");
    return;
  }
  const percentSum = components.reduce((acc, item) => acc + item.percent, 0);
  if (Math.abs(percentSum - 100) > 0.5) {
    showToast("مجموع النسب يجب أن يساوي 100٪.");
    return;
  }

  const blend = {
    id: els.blendId.value || createId(),
    name,
    components,
  };

  const index = db.blends.findIndex((item) => item.id === blend.id);
  if (index >= 0) {
    db.blends[index] = blend;
    showToast("تم تحديث التوليفة.");
  } else {
    db.blends.push(blend);
    showToast("تم إضافة توليفة جديدة.");
  }
  saveDB();
  resetBlendForm();
  renderAll();
}

function resetBlendForm() {
  els.blendId.value = "";
  els.blendName.value = "";
  els.blendComponents.innerHTML = "";
  addComponentRow("برازيلي", 40);
  addComponentRow("كولومبي", 30);
  addComponentRow("حبشي", 20);
  addComponentRow("هندي", 10);
}

function addComponentRow(bean = "", percent = "") {
  const row = document.createElement("div");
  row.className = "component-row";
  row.innerHTML = `
    <input type="text" placeholder="نوع البن" value="${bean}" required />
    <input type="number" placeholder="النسبة %" value="${percent}" step="0.01" required />
    <button type="button" class="ghost"><i class="fa-solid fa-trash"></i></button>
  `;
  row.querySelector("button").addEventListener("click", () => row.remove());
  els.blendComponents.appendChild(row);
}

function collectComponents() {
  const rows = Array.from(els.blendComponents.querySelectorAll(".component-row"));
  return rows
    .map((row) => {
      const inputs = row.querySelectorAll("input");
      return {
        bean: inputs[0].value.trim(),
        percent: toNumber(inputs[1].value),
      };
    })
    .filter((item) => item.bean && item.percent > 0);
}

function updateRoastBreakdown() {
  const blendId = els.roastBlend.value;
  const blend = db.blends.find((item) => item.id === blendId);
  const weightBefore = toNumber(els.roastBefore.value);
  const loss = toNumber(els.roastLoss.value);
  const weightAfter = weightBefore * (1 - loss / 100);
  els.roastAfter.value = roundNumber(weightAfter);

  els.roastBreakdown.innerHTML = "";
  if (!blend) return;
  blend.components.forEach((comp) => {
    const kg = roundNumber((weightBefore * comp.percent) / 100);
    const card = document.createElement("div");
    card.className = "breakdown-card";
    card.innerHTML = `<strong>${comp.bean}</strong><div>${kg} كجم</div>`;
    els.roastBreakdown.appendChild(card);
  });
}

function handleRoastSubmit(event) {
  event.preventDefault();
  const blendId = els.roastBlend.value;
  const blend = db.blends.find((item) => item.id === blendId);
  if (!blend) {
    showToast("يرجى اختيار توليفة صحيحة.");
    return;
  }
  const weightBefore = toNumber(els.roastBefore.value);
  const lossPercent = toNumber(els.roastLoss.value);
  const weightAfter = toNumber(els.roastAfter.value);
  const date = els.roastDate.value;

  const components = blend.components.map((comp) => ({
    bean: comp.bean,
    percent: comp.percent,
    kg: roundNumber((weightBefore * comp.percent) / 100),
  }));

  const shortages = checkRawAvailability(components);
  if (shortages.length > 0) {
    showToast(`المخزون غير كافٍ للأنواع: ${shortages.join("، ")}`);
    return;
  }

  let costTotal = 0;
  components.forEach((item) => {
    const result = consumeRawBeans(item.bean, item.kg);
    costTotal += result.cost;
  });

  const roast = {
    id: createId(),
    blendId,
    blendName: blend.name,
    weightBeforeKg: weightBefore,
    lossPercent,
    weightAfterKg: weightAfter,
    components,
    date,
    costTotal: roundNumber(costTotal),
  };

  db.roasts.push(roast);
  db.roastedStockByBlend[blendId] = roundNumber(
    (db.roastedStockByBlend[blendId] || 0) + weightAfter
  );
  db.roastedCostByBlend[blendId] = roundNumber(
    (db.roastedCostByBlend[blendId] || 0) + costTotal
  );

  saveDB();
  els.roastForm.reset();
  setTodayDefaults();
  updateRoastBreakdown();
  renderAll();
  showToast("تم تسجيل عملية التحميص.");
}

function handleProductSubmit(event) {
  event.preventDefault();
  const entry = {
    id: els.productId.value || createId(),
    name: els.productName.value.trim(),
    packWeightGrams: toNumber(els.productPack.value),
    packPerCarton: toNumber(els.productPackPerCarton.value) || 10,
    bagsPerPack: toNumber(els.productBagsPerPack.value) || 10,
    salePricePerKg: toNumber(els.productSale.value),
  };

  if (!entry.name) {
    showToast("يرجى إدخال اسم المنتج.");
    return;
  }

  const index = db.products.findIndex((item) => item.id === entry.id);
  if (index >= 0) {
    db.products[index] = entry;
    showToast("تم تحديث بيانات المنتج.");
  } else {
    db.products.push(entry);
    showToast("تم إضافة المنتج بنجاح.");
  }
  saveDB();
  resetProductForm();
  renderAll();
}

function resetProductForm() {
  els.productId.value = "";
  els.productForm.reset();
  els.productPackPerCarton.value = 10;
  els.productBagsPerPack.value = 10;
}

function applyProductToProduction() {
  const product = db.products.find((item) => item.id === els.prodProduct.value);
  if (!product) return;
  els.prodPack.value = product.packWeightGrams;
  els.prodPackPerCarton.value = product.packPerCarton || 10;
  els.prodBagsPerPack.value = product.bagsPerPack || 10;
  els.prodSale.value = product.salePricePerKg || 0;
  updateProductionTotals();
}

function updateProductionTotals() {
  const pack = toNumber(els.prodPack.value);
  const packPerCarton = toNumber(els.prodPackPerCarton.value);
  const bagsPerPack = toNumber(els.prodBagsPerPack.value);
  const cartons = toNumber(els.prodCartons.value);
  const totalBags = cartons * packPerCarton * bagsPerPack;
  const totalWeight = (pack * totalBags) / 1000;
  els.prodBags.value = roundNumber(totalBags);
  els.prodTotal.value = roundNumber(totalWeight);
}

function handleProductionSubmit(event) {
  event.preventDefault();
  const blendId = els.prodBlend.value;
  const blend = db.blends.find((item) => item.id === blendId);
  const product = db.products.find((item) => item.id === els.prodProduct.value);
  if (!blend || !product) {
    showToast("يرجى اختيار توليفة ومنتج.");
    return;
  }
  const totalWeight = toNumber(els.prodTotal.value);
  const available = db.roastedStockByBlend[blendId] || 0;
  if (totalWeight > available + 0.0001) {
    showToast("الكمية المتاحة في المخزون المحمص غير كافية.");
    return;
  }

  const costPool = db.roastedCostByBlend[blendId] || 0;
  const costPerKg = available > 0 ? costPool / available : 0;
  const costUsed = roundNumber(costPerKg * totalWeight);

  db.roastedStockByBlend[blendId] = roundNumber(available - totalWeight);
  db.roastedCostByBlend[blendId] = roundNumber(costPool - costUsed);

  const production = {
    id: createId(),
    productId: product.id,
    productName: product.name,
    blendId,
    blendName: blend.name,
    packWeightGrams: toNumber(els.prodPack.value),
    packPerCarton: toNumber(els.prodPackPerCarton.value),
    bagsPerPack: toNumber(els.prodBagsPerPack.value),
    cartonCount: toNumber(els.prodCartons.value),
    bagCount: toNumber(els.prodBags.value),
    totalWeightKg: totalWeight,
    salePricePerKg: toNumber(els.prodSale.value),
    totalValue: roundNumber(toNumber(els.prodSale.value) * totalWeight),
    costUsed,
    date: els.prodDate.value,
  };

  db.production.push(production);
  db.finishedGoods.push({
    id: createId(),
    productId: production.productId,
    productName: production.productName,
    blendName: production.blendName,
    packWeightGrams: production.packWeightGrams,
    packPerCarton: production.packPerCarton,
    bagsPerPack: production.bagsPerPack,
    cartonCount: production.cartonCount,
    bagCount: production.bagCount,
    totalWeightKg: production.totalWeightKg,
    salePricePerKg: production.salePricePerKg,
    totalValue: production.totalValue,
    date: production.date,
  });

  saveDB();
  els.productionForm.reset();
  updateProductionTotals();
  setTodayDefaults();
  renderAll();
  showToast("تم تسجيل الإنتاج وتحويله للمخزن.");
}

function handleFinishedEdit(event) {
  event.preventDefault();
  const id = els.finishedId.value;
  const item = db.finishedGoods.find((entry) => entry.id === id);
  if (!item) return;

  item.productName = els.finishedName.value.trim();
  item.packWeightGrams = toNumber(els.finishedPack.value);
  item.packPerCarton = toNumber(els.finishedPackPerCarton.value);
  item.bagsPerPack = toNumber(els.finishedBagsPerPack.value);
  item.cartonCount = toNumber(els.finishedCartons.value);
  item.bagCount = toNumber(els.finishedBags.value);
  item.totalWeightKg = toNumber(els.finishedTotal.value);
  item.salePricePerKg = toNumber(els.finishedSale.value);
  item.totalValue = roundNumber(item.salePricePerKg * item.totalWeightKg);

  saveDB();
  els.finishedEditForm.classList.add("hidden");
  renderAll();
  showToast("تم تحديث المنتج.");
}

function renderAll() {
  renderRawTable();
  renderBlends();
  renderBlendSelects();
  renderRoastReport();
  renderProducts();
  renderFinishedTable();
  renderMaintenanceTable();
  renderReports();
  ensureReportMeta();
  if (isSectionActive("dashboard")) {
    renderStats();
    renderCharts();
  }
}

function renderReportsOnly() {
  renderRawTable();
  renderRoastReport();
  renderMaintenanceTable();
  renderReports();
  ensureReportMeta();
}

function isSectionActive(id) {
  const section = document.getElementById(id);
  return section ? section.classList.contains("active") : false;
}

function renderRawTable() {
  els.rawTable.innerHTML = "";
  const entries = db.rawBeans.filter((item) => item.totalWeightKg > 0.0001);
  entries.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${formatCurrency(item.pricePerKg)}</td>
      <td>${formatNumber(item.bagWeightKg)} كجم</td>
      <td>${formatNumber(item.bagCount)}</td>
      <td>${formatNumber(item.totalWeightKg)} كجم</td>
      <td>${item.addedAt}</td>
      <td class="actions">
        <button class="edit">تعديل</button>
        <button class="danger">حذف</button>
      </td>
    `;
    row.querySelector(".edit").addEventListener("click", () => editRaw(item.id));
    row.querySelector(".danger").addEventListener("click", () => deleteRaw(item.id));
    els.rawTable.appendChild(row);
  });

  els.rawReportTable.innerHTML = "";
  const reportRange = getReportRange("report-raw");
  const reportEntries = filterByDate(entries, "addedAt", reportRange);
  reportEntries.forEach((item) => {
    const value = item.totalWeightKg * item.pricePerKg;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${formatNumber(item.bagCount)}</td>
      <td>${formatNumber(item.bagWeightKg)}</td>
      <td>${formatNumber(item.totalWeightKg)}</td>
      <td>${formatCurrency(item.pricePerKg)}</td>
      <td>${formatCurrency(value)}</td>
    `;
    els.rawReportTable.appendChild(row);
  });
}

function editRaw(id) {
  const item = db.rawBeans.find((entry) => entry.id === id);
  if (!item) return;
  els.rawId.value = item.id;
  els.rawName.value = item.name;
  els.rawPrice.value = item.pricePerKg;
  els.rawBagWeight.value = item.bagWeightKg;
  els.rawBagCount.value = item.bagCount;
  els.rawTotal.value = item.totalWeightKg;
  els.rawDate.value = item.addedAt;
  showToast("تم تحميل بيانات البن للتعديل.");
}

function deleteRaw(id) {
  if (!confirm("هل تريد حذف هذا السجل؟")) return;
  db.rawBeans = db.rawBeans.filter((item) => item.id !== id);
  saveDB();
  renderAll();
}

function renderBlends() {
  els.blendCards.innerHTML = "";
  db.blends.forEach((blend) => {
    const card = document.createElement("div");
    card.className = "blend-card";
    const chips = blend.components
      .map((comp) => `<div class="blend-chip"><span>${comp.bean}</span><span>${comp.percent}%</span></div>`)
      .join("");
    card.innerHTML = `
      <h5>${blend.name}</h5>
      ${chips}
      <div class="actions">
        <button class="edit">تعديل</button>
        <button class="danger">حذف</button>
      </div>
    `;
    card.querySelector(".edit").addEventListener("click", () => editBlend(blend.id));
    card.querySelector(".danger").addEventListener("click", () => deleteBlend(blend.id));
    els.blendCards.appendChild(card);
  });
}

function editBlend(id) {
  const blend = db.blends.find((item) => item.id === id);
  if (!blend) return;
  els.blendId.value = blend.id;
  els.blendName.value = blend.name;
  els.blendComponents.innerHTML = "";
  blend.components.forEach((comp) => addComponentRow(comp.bean, comp.percent));
  showToast("تم تحميل بيانات التوليفة للتعديل.");
}

function deleteBlend(id) {
  if (!confirm("هل تريد حذف هذه التوليفة؟")) return;
  db.blends = db.blends.filter((item) => item.id !== id);
  saveDB();
  renderAll();
}

function renderBlendSelects() {
  const blendOptions = db.blends
    .map((blend) => `<option value="${blend.id}">${blend.name}</option>`)
    .join("");
  els.roastBlend.innerHTML = blendOptions;
  els.prodBlend.innerHTML = blendOptions;

  const productOptions = db.products
    .map((product) => `<option value="${product.id}">${product.name}</option>`)
    .join("");
  els.prodProduct.innerHTML = productOptions;
  if (db.products.length > 0) {
    els.prodProduct.value = db.products[0].id;
    applyProductToProduction();
  }
  updateRoastBreakdown();
}

function renderRoastReport() {
  els.roastReportTable.innerHTML = "";
  const range = getReportRange("report-roast");
  const list = filterByDate(db.roasts, "date", range);
  list.forEach((item) => {
    const details = item.components
      .map((comp) => `${comp.bean}: ${formatNumber(comp.kg)} كجم`)
      .join(" | ");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.date}</td>
      <td>${item.blendName}</td>
      <td>${formatNumber(item.weightBeforeKg)} كجم</td>
      <td>${details}</td>
      <td>${formatNumber(item.lossPercent)}%</td>
      <td>${formatNumber(item.weightAfterKg)} كجم</td>
    `;
    els.roastReportTable.appendChild(row);
  });
}

function renderProducts() {
  els.productTable.innerHTML = "";
  db.products.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${formatNumber(item.packWeightGrams)} جم</td>
      <td>${formatNumber(item.packPerCarton)}</td>
      <td>${formatNumber(item.bagsPerPack)}</td>
      <td>${formatCurrency(item.salePricePerKg)}</td>
      <td class="actions">
        <button class="edit">تعديل</button>
        <button class="danger">حذف</button>
      </td>
    `;
    row.querySelector(".edit").addEventListener("click", () => editProduct(item.id));
    row.querySelector(".danger").addEventListener("click", () => deleteProduct(item.id));
    els.productTable.appendChild(row);
  });
}

function editProduct(id) {
  const item = db.products.find((entry) => entry.id === id);
  if (!item) return;
  els.productId.value = item.id;
  els.productName.value = item.name;
  els.productPack.value = item.packWeightGrams;
  els.productPackPerCarton.value = item.packPerCarton;
  els.productBagsPerPack.value = item.bagsPerPack;
  els.productSale.value = item.salePricePerKg;
  showToast("تم تحميل بيانات المنتج للتعديل.");
}

function deleteProduct(id) {
  if (!confirm("هل تريد حذف هذا المنتج؟")) return;
  db.products = db.products.filter((item) => item.id !== id);
  saveDB();
  renderAll();
}

function renderFinishedTable() {
  els.finishedTable.innerHTML = "";
  db.finishedGoods.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.productName}</td>
      <td>${item.blendName}</td>
      <td>${item.packWeightGrams} جم</td>
      <td>${item.cartonCount}</td>
      <td>${item.bagCount}</td>
      <td>${formatNumber(item.totalWeightKg)} كجم</td>
      <td>${formatCurrency(item.salePricePerKg)}</td>
      <td>${formatCurrency(item.totalValue)}</td>
      <td class="actions">
        <button class="edit">تعديل</button>
        <button class="danger">حذف</button>
      </td>
    `;
    row.querySelector(".edit").addEventListener("click", () => openFinishedEdit(item.id));
    row.querySelector(".danger").addEventListener("click", () => deleteFinished(item.id));
    els.finishedTable.appendChild(row);
  });
}

function openFinishedEdit(id) {
  const item = db.finishedGoods.find((entry) => entry.id === id);
  if (!item) return;
  els.finishedId.value = item.id;
  els.finishedName.value = item.productName;
  els.finishedPack.value = item.packWeightGrams;
  els.finishedPackPerCarton.value = item.packPerCarton || 10;
  els.finishedBagsPerPack.value = item.bagsPerPack || 10;
  els.finishedCartons.value = item.cartonCount;
  updateFinishedTotals();
  els.finishedSale.value = item.salePricePerKg;
  els.finishedEditForm.classList.remove("hidden");
  els.finishedEditForm.scrollIntoView({ behavior: "smooth" });
}

function updateFinishedTotals() {
  const pack = toNumber(els.finishedPack.value);
  const packPerCarton = toNumber(els.finishedPackPerCarton.value);
  const bagsPerPack = toNumber(els.finishedBagsPerPack.value);
  const cartons = toNumber(els.finishedCartons.value);
  const totalBags = cartons * packPerCarton * bagsPerPack;
  const totalWeight = (pack * totalBags) / 1000;
  els.finishedBags.value = roundNumber(totalBags);
  els.finishedTotal.value = roundNumber(totalWeight);
}

function deleteFinished(id) {
  if (!confirm("هل تريد حذف هذا المنتج؟")) return;
  db.finishedGoods = db.finishedGoods.filter((item) => item.id !== id);
  saveDB();
  renderAll();
}

function handleMaintenanceSubmit(event) {
  event.preventDefault();
  const entry = {
    id: els.maintenanceId.value || createId(),
    type: els.maintenanceType.value,
    machine: els.maintenanceMachine.value.trim(),
    date: els.maintenanceDate.value,
    cost: toNumber(els.maintenanceCost.value),
    notes: els.maintenanceNotes.value.trim(),
  };
  if (!entry.machine) {
    showToast("يرجى إدخال اسم الماكينة.");
    return;
  }
  const index = db.maintenance.findIndex((item) => item.id === entry.id);
  if (index >= 0) {
    db.maintenance[index] = entry;
    showToast("تم تحديث سجل الصيانة.");
  } else {
    db.maintenance.push(entry);
    showToast("تم إضافة سجل الصيانة.");
  }
  saveDB();
  resetMaintenanceForm();
  renderAll();
}

function resetMaintenanceForm() {
  els.maintenanceId.value = "";
  els.maintenanceForm.reset();
  setTodayDefaults();
}

function renderMaintenanceTable() {
  els.maintenanceTable.innerHTML = "";
  els.maintenanceReportTable.innerHTML = "";
  db.maintenance.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.type}</td>
      <td>${item.machine}</td>
      <td>${item.date}</td>
      <td>${formatCurrency(item.cost)}</td>
      <td>${item.notes || "-"}</td>
      <td class="actions">
        <button class="edit">تعديل</button>
        <button class="danger">حذف</button>
      </td>
    `;
    row.querySelector(".edit").addEventListener("click", () => editMaintenance(item.id));
    row.querySelector(".danger").addEventListener("click", () => deleteMaintenance(item.id));
    els.maintenanceTable.appendChild(row);
  });

  const range = getReportRange("report-maintenance");
  const list = filterByDate(db.maintenance, "date", range);
  list.forEach((item) => {
    const reportRow = document.createElement("tr");
    reportRow.innerHTML = `
      <td>${item.type}</td>
      <td>${item.machine}</td>
      <td>${item.date}</td>
      <td>${formatCurrency(item.cost)}</td>
      <td>${item.notes || "-"}</td>
    `;
    els.maintenanceReportTable.appendChild(reportRow);
  });
}

function editMaintenance(id) {
  const item = db.maintenance.find((entry) => entry.id === id);
  if (!item) return;
  els.maintenanceId.value = item.id;
  els.maintenanceType.value = item.type;
  els.maintenanceMachine.value = item.machine;
  els.maintenanceDate.value = item.date;
  els.maintenanceCost.value = item.cost;
  els.maintenanceNotes.value = item.notes;
  showToast("تم تحميل بيانات الصيانة للتعديل.");
}

function deleteMaintenance(id) {
  if (!confirm("هل تريد حذف هذا السجل؟")) return;
  db.maintenance = db.maintenance.filter((item) => item.id !== id);
  saveDB();
  renderAll();
}

function renderReports() {
  renderDailyReport();
  renderBlendReport();
  renderConsumptionReport();
  renderFinishedReport();
  renderProfitReport();
  renderBlendSpecificReport();
  renderBlendConsumptionReport();
}

function renderDailyReport() {
  const range = getReportRange("report-production-daily");
  const list = filterByDate(db.production, "date", range).slice().sort((a, b) => {
    return (b.date || "").localeCompare(a.date || "");
  });
  els.reportDailyTable.innerHTML = "";
  list.forEach((item) => {
    const packs = item.packPerCarton * item.cartonCount;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.date}</td>
      <td>${item.productName}</td>
      <td>${item.blendName}</td>
      <td>${formatNumber(item.cartonCount)}</td>
      <td>${formatNumber(packs)}</td>
      <td>${formatNumber(item.bagCount)}</td>
      <td>${formatNumber(item.totalWeightKg)} كجم</td>
    `;
    els.reportDailyTable.appendChild(row);
  });
}

function renderBlendReport() {
  const range = getReportRange("report-production-blend");
  const list = filterByDate(db.production, "date", range);
  const grouped = groupBy(list, (item) => item.blendName);
  els.reportBlendTable.innerHTML = "";
  Object.keys(grouped).forEach((name) => {
    const items = grouped[name];
    const totalWeight = sum(items, "totalWeightKg");
    const totalBags = sum(items, "bagCount");
    const totalCartons = sum(items, "cartonCount");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${name}</td>
      <td>${formatNumber(totalWeight)} كجم</td>
      <td>${formatNumber(totalBags)}</td>
      <td>${formatNumber(totalCartons)}</td>
    `;
    els.reportBlendTable.appendChild(row);
  });
}

function renderConsumptionReport() {
  const range = getReportRange("report-consumption");
  const list = filterByDate(db.roasts, "date", range);
  const consumption = {};
  list.forEach((roast) => {
    roast.components.forEach((comp) => {
      consumption[comp.bean] = (consumption[comp.bean] || 0) + comp.kg;
    });
  });
  els.reportConsumptionTable.innerHTML = "";
  Object.entries(consumption).forEach(([bean, kg]) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${bean}</td><td>${formatNumber(kg)} كجم</td>`;
    els.reportConsumptionTable.appendChild(row);
  });
}

function renderFinishedReport() {
  els.reportFinishedTable.innerHTML = "";
  const range = getReportRange("report-finished");
  const list = filterByDate(db.finishedGoods, "date", range);
  list.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.productName}</td>
      <td>${item.blendName}</td>
      <td>${formatNumber(item.totalWeightKg)} كجم</td>
      <td>${formatCurrency(item.totalValue)}</td>
    `;
    els.reportFinishedTable.appendChild(row);
  });
}

function renderProfitReport() {
  const range = getReportRange("report-profit");
  const list = filterByDate(db.production, "date", range);
  const totalCost = sum(list, "costUsed");
  const totalValue = sum(list, "totalValue");
  const profit = totalValue - totalCost;

  els.profitGrid.innerHTML = "";
  const cards = [
    { title: "تكلفة البن المستخدم", value: formatCurrency(totalCost) },
    { title: "قيمة المنتجات الناتجة", value: formatCurrency(totalValue) },
    { title: "صافي الربح التقريبي", value: formatCurrency(profit) },
  ];
  cards.forEach((card) => {
    const div = document.createElement("div");
    div.className = "profit-card";
    div.innerHTML = `<h5>${card.title}</h5><p>${card.value}</p>`;
    els.profitGrid.appendChild(div);
  });
}

function renderBlendSpecificReport() {
  const range = getReportRange("report-blend-specific");
  const list = filterByDate(db.production, "date", range);
  const grouped = groupBy(list, (item) => item.blendName);
  els.reportBlendSpecificTable.innerHTML = "";
  Object.keys(grouped).forEach((name) => {
    const items = grouped[name];
    const totalWeight = sum(items, "totalWeightKg");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${name}</td>
      <td>${formatNumber(totalWeight)} كجم</td>
      <td>${items.length}</td>
    `;
    els.reportBlendSpecificTable.appendChild(row);
  });
}

function renderBlendConsumptionReport() {
  const range = getReportRange("report-blend-consumption");
  const roastList = filterByDate(db.roasts, "date", range);
  const productionList = filterByDate(db.production, "date", range);
  const blendConsumption = {};
  roastList.forEach((roast) => {
    if (!blendConsumption[roast.blendName]) {
      blendConsumption[roast.blendName] = { beans: {}, totalKg: 0 };
    }
    roast.components.forEach((comp) => {
      blendConsumption[roast.blendName].beans[comp.bean] =
        (blendConsumption[roast.blendName].beans[comp.bean] || 0) + comp.kg;
      blendConsumption[roast.blendName].totalKg += comp.kg;
    });
  });

  els.reportBlendConsumptionTable.innerHTML = "";
  Object.entries(blendConsumption).forEach(([blend, data]) => {
    const beansText = Object.entries(data.beans)
      .map(([bean, kg]) => `${bean} (${formatNumber(kg)} كجم)`)
      .join(" | ");
    const produced = sum(
      productionList.filter((item) => item.blendName === blend),
      "totalWeightKg"
    );
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${blend}</td>
      <td>${beansText}</td>
      <td>${formatNumber(data.totalKg)} كجم</td>
      <td>${formatNumber(produced)} كجم</td>
    `;
    els.reportBlendConsumptionTable.appendChild(row);
  });
}

function renderStats() {
  const rawTotal = sum(db.rawBeans, "totalWeightKg");
  const roastedTotal = Object.values(db.roastedStockByBlend).reduce((acc, val) => acc + val, 0);
  const finishedTotal = sum(db.finishedGoods, "totalWeightKg");
  const totalCost = sum(db.production, "costUsed");
  const totalValue = sum(db.finishedGoods, "totalValue");
  const profit = totalValue - totalCost;

  els.statRaw.textContent = `${formatNumber(rawTotal)} كجم`;
  els.statRoasted.textContent = `${formatNumber(roastedTotal)} كجم`;
  els.statFinished.textContent = `${formatNumber(finishedTotal)} كجم`;
  els.statCost.textContent = formatCurrency(totalCost);
  els.statProfit.textContent = formatCurrency(profit);
}

function renderCharts() {
  const daily = getLastDaysData(7, db.production, "totalWeightKg");
  const consumption = getConsumptionData();
  const stock = getStockMovement();

  if (!chartProduction) {
    chartProduction = new Chart(document.getElementById("chart-production"), {
      type: "line",
      data: {
        labels: daily.labels,
        datasets: [{
          label: "الإنتاج",
          data: daily.values,
          borderColor: "#bf7b4b",
          backgroundColor: "rgba(191,123,75,0.2)",
          tension: 0.3,
          fill: true,
        }],
      },
      options: { responsive: true, plugins: { legend: { display: false } } },
    });
  } else {
    chartProduction.data.labels = daily.labels;
    chartProduction.data.datasets[0].data = daily.values;
    chartProduction.update();
  }

  if (!chartConsumption) {
    chartConsumption = new Chart(document.getElementById("chart-consumption"), {
      type: "bar",
      data: {
        labels: consumption.labels,
        datasets: [{
          label: "استهلاك البن",
          data: consumption.values,
          backgroundColor: "rgba(45,95,93,0.6)",
        }],
      },
      options: { responsive: true, plugins: { legend: { display: false } } },
    });
  } else {
    chartConsumption.data.labels = consumption.labels;
    chartConsumption.data.datasets[0].data = consumption.values;
    chartConsumption.update();
  }

  if (!chartStock) {
    chartStock = new Chart(document.getElementById("chart-stock"), {
      type: "doughnut",
      data: {
        labels: ["بن أخضر", "بن محمص", "منتجات جاهزة"],
        datasets: [{
          data: stock.values,
          backgroundColor: ["#bf7b4b", "#2d5f5d", "#e0a86c"],
        }],
      },
      options: { responsive: true, plugins: { legend: { position: "bottom" } } },
    });
  } else {
    chartStock.data.datasets[0].data = stock.values;
    chartStock.update();
  }
}

function getLastDaysData(days, list, field) {
  const labels = [];
  const values = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const key = date.toISOString().split("T")[0];
    labels.push(key);
    const total = list
      .filter((item) => item.date === key)
      .reduce((acc, item) => acc + (item[field] || 0), 0);
    values.push(roundNumber(total));
  }
  return { labels, values };
}

function getConsumptionData() {
  const consumption = {};
  db.roasts.forEach((roast) => {
    roast.components.forEach((comp) => {
      consumption[comp.bean] = (consumption[comp.bean] || 0) + comp.kg;
    });
  });
  const labels = Object.keys(consumption);
  const values = labels.map((label) => roundNumber(consumption[label]));
  return { labels, values };
}

function getStockMovement() {
  const rawTotal = sum(db.rawBeans, "totalWeightKg");
  const roastedTotal = Object.values(db.roastedStockByBlend).reduce((acc, val) => acc + val, 0);
  const finishedTotal = sum(db.finishedGoods, "totalWeightKg");
  return { values: [roundNumber(rawTotal), roundNumber(roastedTotal), roundNumber(finishedTotal)] };
}

function checkRawAvailability(components) {
  const shortages = [];
  components.forEach((comp) => {
    const compKey = normalizeBeanName(comp.bean);
    const available = db.rawBeans
      .filter((item) => item.nameKey === compKey)
      .reduce((acc, item) => acc + item.totalWeightKg, 0);
    if (available + 0.0001 < comp.kg) shortages.push(comp.bean);
  });
  return shortages;
}

function consumeRawBeans(beanName, kgNeeded) {
  let remaining = kgNeeded;
  let cost = 0;
  const beanKey = normalizeBeanName(beanName);
  const entries = db.rawBeans
    .filter((item) => item.nameKey === beanKey)
    .sort((a, b) => (a.addedAt || "").localeCompare(b.addedAt || ""));

  entries.forEach((entry) => {
    if (remaining <= 0) return;
    const available = entry.totalWeightKg;
    const take = Math.min(available, remaining);
    entry.totalWeightKg = roundNumber(available - take);
    entry.bagCount = entry.bagWeightKg ? roundNumber(entry.totalWeightKg / entry.bagWeightKg) : entry.bagCount;
    cost += take * entry.pricePerKg;
    remaining = roundNumber(remaining - take);
  });
  return { cost };
}

function groupBy(list, keyFn) {
  return list.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}

function sum(list, field) {
  return list.reduce((acc, item) => acc + (item[field] || 0), 0);
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString("en-US", { maximumFractionDigits: 2 });
}

function formatCurrency(value) {
  return `${formatNumber(value)} ج`;
}

function toNumber(value) {
  return Number.parseFloat(value) || 0;
}

function roundNumber(value) {
  return Math.round((Number(value) || 0) * 100) / 100;
}

function createId() {
  return Math.random().toString(36).slice(2, 9);
}

function normalizeBeanName(name) {
  return String(name || "")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[إأآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/ـ/g, "")
    .toLowerCase();
}

function normalizeDigits(value) {
  return String(value || "")
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
}

function safeGetItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (err) {
    return Object.prototype.hasOwnProperty.call(memoryStore, key) ? memoryStore[key] : null;
  }
}

function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    memoryStore[key] = value;
  }
}

function safeRemoveItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    delete memoryStore[key];
  }
}

function filterTable(tableBody, query) {
  const term = query.trim().toLowerCase();
  Array.from(tableBody.querySelectorAll("tr")).forEach((row) => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(term) ? "" : "none";
  });
}

function getReportRange(reportId) {
  const card = document.getElementById(reportId);
  if (!card) return null;
  const from = card.querySelector("[data-filter=\"from\"]")?.value || "";
  const to = card.querySelector("[data-filter=\"to\"]")?.value || "";
  if (!from && !to) return null;
  return { from, to };
}

function filterByDate(list, field, range) {
  if (!range) return list;
  const fromDate = range.from ? new Date(range.from) : null;
  const toDate = range.to ? new Date(range.to) : null;
  return list.filter((item) => {
    const value = item[field];
    if (!value) return false;
    const date = new Date(value);
    if (fromDate && date < fromDate) return false;
    if (toDate && date > toDate) return false;
    return true;
  });
}

function printReport(id) {
  const section = document.getElementById(id);
  if (!section) return;
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html dir="rtl">
      <head>
        <title>تقرير - مصنع البهنساوي للبن</title>
        <style>
          body { font-family: Cairo, sans-serif; padding: 24px; font-size: 14px; }
          h4 { margin-bottom: 16px; font-size: 18px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: center; font-size: 14px; }
          thead { background: #f0e7da; }
          .report-actions { display: none; }
          .report-filter { display: none; }
          .report-title { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
          .report-logo { width: 48px; height: 48px; border-radius: 10px; object-fit: cover; }
          .report-sub { display: block; font-size: 12px; color: #666; }
          .report-meta { border: 1px dashed #ddd; padding: 8px 12px; border-radius: 10px; margin-bottom: 12px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        ${section.innerHTML}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

async function exportPdf(id) {
  const element = document.getElementById(id);
  if (!element) return;
  const canvas = await html2canvas(element, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new window.jspdf.jsPDF({ orientation: "p", unit: "pt", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth - 40;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let position = 20;
  pdf.addImage(imgData, "PNG", 20, position, imgWidth, imgHeight);
  if (imgHeight > pageHeight) {
    while (position + imgHeight > pageHeight) {
      position -= pageHeight - 40;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 20, position, imgWidth, imgHeight);
    }
  }
  pdf.save("report.pdf");
}

function exportData() {
  const dataStr = JSON.stringify(db, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "albahnsawe_backup.json";
  link.click();
  URL.revokeObjectURL(url);
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      db = JSON.parse(e.target.result);
      ensureDefaults();
      saveDB();
      renderAll();
      showToast("تم استيراد البيانات بنجاح.");
    } catch (err) {
      showToast("حدث خطأ أثناء الاستيراد.");
    }
  };
  reader.readAsText(file);
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  setTimeout(() => els.toast.classList.remove("show"), 2500);
}

function ensureReportMeta() {
  const now = new Date();
  const dateText = now.toLocaleDateString("en-GB");
  const timeText = now.toLocaleTimeString("en-GB");
  document.querySelectorAll(".report-card").forEach((card) => {
    let meta = card.querySelector(".report-meta");
    if (!meta) {
      meta = document.createElement("div");
      meta.className = "report-meta";
      const tableWrapper = card.querySelector(".table-wrapper");
      if (tableWrapper) {
        card.insertBefore(meta, tableWrapper);
      } else {
        card.appendChild(meta);
      }
    }
    meta.textContent = `تاريخ التقرير: ${dateText} | الوقت: ${timeText}`;
  });
}

resetBlendForm();
resetProductForm();
updateProductionTotals();
updateFinishedTotals();
