
﻿
const STORAGE_KEY = "albahnsawe_db";
const memoryStore = {};

const els = {
  sectionTitle: document.getElementById("section-title"),
  navItems: document.querySelectorAll(".nav-item"),
  sections: document.querySelectorAll(".section"),
  toast: document.getElementById("toast"),
  resetDemo: document.getElementById("reset-demo"),
  gbtForm: document.getElementById("gbt-form"),
  gbtId: document.getElementById("gbt-id"),
  gbtName: document.getElementById("gbt-name"),
  gbtPrice: document.getElementById("gbt-price"),
  gbtBagWeight: document.getElementById("gbt-bag-weight"),
  gbtReset: document.getElementById("gbt-reset"),
  gbtTable: document.getElementById("gbt-table"),
  rawForm: document.getElementById("raw-form"),
  rawId: document.getElementById("raw-id"),
  rawName: document.getElementById("raw-name"),
  rawPrice: document.getElementById("raw-price"),
  rawBagWeight: document.getElementById("raw-bag-weight"),
  rawBagCount: document.getElementById("raw-bag-count"),
  rawStoreType: document.getElementById("raw-store-type"),
  rawTotal: document.getElementById("raw-total"),
  rawDate: document.getElementById("raw-date"),
  rawFactoryTable: document.getElementById("raw-factory-table"),
  rawShopsTable: document.getElementById("raw-shops-table"),
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
  roastDestination: document.getElementById("roast-destination"),
  roastDestShop: document.getElementById("roast-dest-shop"),
  roastShopSelect: document.getElementById("roast-shop-select"),
  roastDestClient: document.getElementById("roast-dest-client"),
  roastClientSelect: document.getElementById("roast-client-select"),
  roastDestFinished: document.getElementById("roast-dest-finished"),
  roastFinishedSalePrice: document.getElementById("roast-finished-sale-price"),
  roastDate: document.getElementById("roast-date"),
  roastBreakdown: document.getElementById("roast-breakdown"),
  roastReportTable: document.getElementById("roast-report-table"),
  productForm: document.getElementById("product-form"),
  shopForm: document.getElementById("shop-form"),
  shopId: document.getElementById("shop-id"),
  shopName: document.getElementById("shop-name"),
  shopNotes: document.getElementById("shop-notes"),
  shopReset: document.getElementById("shop-reset"),
  shopTable: document.getElementById("shop-table"),
  clientForm: document.getElementById("client-form"),
  clientId: document.getElementById("client-id"),
  clientName: document.getElementById("client-name"),
  clientNotes: document.getElementById("client-notes"),
  clientReset: document.getElementById("client-reset"),
  clientTable: document.getElementById("client-table"),
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
  shopSalesSearch: document.getElementById("shop-sales-search"),
  reportShopSalesTable: document.getElementById("report-shop-sales-table"),
  clientSalesSearch: document.getElementById("client-sales-search"),
  reportClientSalesTable: document.getElementById("report-client-sales-table"),
  printSelectedRaw: document.getElementById("print-selected-raw"),
  printSelectedFinished: document.getElementById("print-selected-finished"),
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
      greenBeanTypes: [],
      shops: [],
      clients: [],
      externalSales: [],
      blends: [],
      roasts: [],
      production: [],
      finishedGoods: [],
      roastedStockByBlend: {},
      roastedCostByBlend: {},
      products: [],
      maintenance: [],
      multiPermitCounter: 90001,
    };
  }
  try {
    return JSON.parse(saved);
  } catch (err) {
    return {
      rawBeans: [],
      greenBeanTypes: [],
      shops: [],
      clients: [],
      externalSales: [],
      blends: [],
      roasts: [],
      production: [],
      finishedGoods: [],
      roastedStockByBlend: {},
      roastedCostByBlend: {},
      products: [],
      maintenance: [],
      multiPermitCounter: 90001,
    };
  }
}

function saveDB() {
  safeSetItem(STORAGE_KEY, JSON.stringify(db));
}

function ensureDefaults() {
  if (!db.rawBeans) db.rawBeans = [];
  if (!db.greenBeanTypes) db.greenBeanTypes = [];
  if (!db.shops) db.shops = [];
  if (!db.clients) db.clients = [];
  if (!db.externalSales) db.externalSales = [];
  if (!db.roasts) db.roasts = [];
  if (!db.production) db.production = [];
  if (!db.finishedGoods) db.finishedGoods = [];
  if (!db.products) db.products = [];
  if (!db.maintenance) db.maintenance = [];


  db.rawBeans = db.rawBeans.map((item) => ({
    ...item,
    nameKey: item.nameKey || normalizeBeanName(item.name || ""),
    store: item.store || "factory",
  }));

  if (db.greenBeanTypes.length === 0) {
    db.greenBeanTypes = [
      { id: createId(), name: "برازيلي", pricePerKg: 200, bagWeightKg: 50 },
      { id: createId(), name: "كولومبي", pricePerKg: 220, bagWeightKg: 50 },
      { id: createId(), name: "حبشي", pricePerKg: 250, bagWeightKg: 60 },
      { id: createId(), name: "هندي", pricePerKg: 190, bagWeightKg: 60 },
      { id: createId(), name: "إندونيسي", pricePerKg: 210, bagWeightKg: 50 },
    ];
  }

  if (db.shops.length === 0) {
    db.shops = [
      { id: createId(), name: "محل البن الأول", notes: "فرع وسط البلد" },
      { id: createId(), name: "كافيتريا النجوم", notes: "" },
    ];
  }

  if (db.clients.length === 0) {
    db.clients = [
      { id: createId(), name: "عميل الجملة (أحمد)", notes: "01001234567" },
      { id: createId(), name: "عميل عادي (سارة)", notes: "" },
    ];
  }

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
  if (!db.multiPermitCounter) db.multiPermitCounter = 90001;
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
  els.gbtForm.addEventListener("submit", handleGreenBeanTypeSubmit);
  els.gbtReset.addEventListener("click", resetGbtForm);

  els.rawName.addEventListener("change", applyGbtToRawForm);
  els.rawBagCount.addEventListener("input", updateRawTotal);
  els.rawBagWeight.addEventListener("input", updateRawTotal);
  els.rawForm.addEventListener("submit", handleRawSubmit);
  els.rawReset.addEventListener("click", resetRawForm);
  els.rawSearch.addEventListener("input", () => {
    filterTable(els.rawFactoryTable, els.rawSearch.value);
    filterTable(els.rawShopsTable, els.rawSearch.value);
  });

  els.printSelectedRaw.addEventListener("click", handlePrintSelectedRaw);
  els.printSelectedFinished.addEventListener("click", handlePrintSelectedFinished);
  document.querySelectorAll('.select-all').forEach(checkbox => {
    checkbox.addEventListener('change', handleSelectAll);
  });


  els.addComponent.addEventListener("click", () => addComponentRow());
  els.blendForm.addEventListener("submit", handleBlendSubmit);
  els.blendReset.addEventListener("click", resetBlendForm);

  els.shopForm.addEventListener("submit", handleShopSubmit);
  els.shopReset.addEventListener("click", resetShopForm);

  els.clientForm.addEventListener("submit", handleClientSubmit);
  els.clientReset.addEventListener("click", resetClientForm);

  els.roastBlend.addEventListener("change", updateRoastBreakdown);
  els.roastBefore.addEventListener("input", updateRoastBreakdown);
  els.roastLoss.addEventListener("input", updateRoastBreakdown);
  els.roastForm.addEventListener("submit", handleRoastSubmit);

  els.productForm.addEventListener("submit", handleProductSubmit);
  els.roastDestination.addEventListener("change", toggleRoastDestinationInputs);
  els.productReset.addEventListener("click", resetProductForm);
  els.productSearch.addEventListener("input", () => filterTable(els.productTable, els.productSearch.value));
  els.shopSalesSearch.addEventListener("input", () => filterTable(els.reportShopSalesTable, els.shopSalesSearch.value));
  els.clientSalesSearch.addEventListener("input", () => filterTable(els.reportClientSalesTable, els.clientSalesSearch.value));

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

function handleGreenBeanTypeSubmit(event) {
  event.preventDefault();
  const entry = {
    id: els.gbtId.value || createId(),
    name: els.gbtName.value.trim(),
    pricePerKg: toNumber(els.gbtPrice.value),
    bagWeightKg: toNumber(els.gbtBagWeight.value),
  };

  if (!entry.name) {
    showToast("يرجى إدخال اسم نوع البن.");
    return;
  }

  const index = db.greenBeanTypes.findIndex((item) => item.id === entry.id);
  if (index >= 0) {
    db.greenBeanTypes[index] = entry;
    showToast("تم تحديث نوع البن.");
  } else {
    db.greenBeanTypes.push(entry);
    showToast("تمت إضافة نوع بن جديد.");
  }
  saveDB();
  resetGbtForm();
  renderAll();
}

function resetGbtForm() {
  els.gbtForm.reset();
  els.gbtId.value = "";
}

function applyGbtToRawForm() {
  const gbtId = els.rawName.value;
  const gbt = db.greenBeanTypes.find((item) => item.id === gbtId);
  if (gbt) {
    els.rawPrice.value = gbt.pricePerKg;
    els.rawBagWeight.value = gbt.bagWeightKg;
  } else {
    els.rawPrice.value = "";
    els.rawBagWeight.value = "";
  }
  updateRawTotal();
}

function handleRawSubmit(event) {
  event.preventDefault();
  const gbtId = els.rawName.value;
  const gbt = db.greenBeanTypes.find((t) => t.id === gbtId);

  if (!gbt) {
    showToast("يرجى اختيار نوع البن.");
    return;
  }

  let permitNumber;
  if (els.rawId.value) {
    const existing = db.rawBeans.find((i) => i.id === els.rawId.value);
    permitNumber = existing ? existing.permitNumber : undefined;
  } else {
    const maxPermit = db.rawBeans.reduce((max, item) => Math.max(max, item.permitNumber || 0), 0);
    permitNumber = maxPermit + 1;
  }

  const entry = {
    id: els.rawId.value || createId(),
    permitNumber,
    name: gbt.name,
    nameKey: normalizeBeanName(gbt.name),
    pricePerKg: toNumber(els.rawPrice.value),
    bagWeightKg: toNumber(els.rawBagWeight.value),
    bagCount: toNumber(els.rawBagCount.value),
    totalWeightKg: toNumber(els.rawTotal.value),
    addedAt: els.rawDate.value,
    store: els.rawStoreType.value,
  };

  const index = db.rawBeans.findIndex((item) => item.id === entry.id);
  if (index >= 0) {
    db.rawBeans[index] = entry;
    showToast("تم تحديث بيانات البن الأخضر.");
  } else {
    db.rawBeans.push(entry);
    showToast("تمت إضافة البن الأخضر.");
    if (confirm("هل تريد طباعة إذن الاستلام لهذه الطلبية؟")) {
      printRawPermit(entry);
    }
  }
  saveDB();
  resetRawForm();
  renderAll();
}

function resetRawForm() {
  els.rawId.value = "";
  els.rawForm.reset();
  updateRawTotal();
  applyGbtToRawForm();
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

function toggleRoastDestinationInputs() {
  const dest = els.roastDestination.value;
  els.roastDestShop.classList.toggle("hidden", dest !== "shop");
  els.roastDestClient.classList.toggle("hidden", dest !== "client");
  els.roastDestFinished.classList.toggle("hidden", dest !== "finished_goods");
}

function handleRoastSubmit(event) {
  event.preventDefault();
  const blendId = els.roastBlend.value;
  const blend = db.blends.find((item) => item.id === blendId);
  const destination = els.roastDestination.value;
  const storeToConsumeFrom = destination === "factory" ? "factory" : "shops";

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

  const shortages = checkRawAvailability(components, storeToConsumeFrom);
  if (shortages.length > 0) {
    showToast(
      `مخزون (${
        storeToConsumeFrom === "factory" ? "المصنع" : "المحلات"
      }) غير كافٍ للأنواع: ${shortages.join("، ")}`
    );
    return;
  }

  let costTotal = 0;
  components.forEach((item) => {
    const result = consumeRawBeans(item.bean, item.kg, storeToConsumeFrom);
    costTotal += result.cost;
  });

  let destName = "";
  if (destination === "shop") {
    const shop = db.shops.find((s) => s.id === els.roastShopSelect.value);
    destName = shop ? shop.name : "غير محدد";
  } else if (destination === "client") {
    const client = db.clients.find((c) => c.id === els.roastClientSelect.value);
    destName = client ? client.name : "غير محدد";
  }

  const roast = {
    id: createId(),
    blendId,
    blendName: blend.name,
    weightBeforeKg: weightBefore,
    lossPercent,
    weightAfterKg: weightAfter,
    components,
    date,
    destinationType: destination,
    destinationName: destName,
    costTotal: roundNumber(costTotal),
  };

  db.roasts.push(roast);

  if (destination === "factory") {
    // Current behavior: add to production stock
    db.roastedStockByBlend[blendId] = roundNumber(
      (db.roastedStockByBlend[blendId] || 0) + weightAfter
    );
    db.roastedCostByBlend[blendId] = roundNumber(
      (db.roastedCostByBlend[blendId] || 0) + costTotal
    );
    showToast("تم تسجيل التحميص وإضافته لرصيد الإنتاج.");
  } else if (destination === "finished_goods") {
    // Generate Permit Number for Finished Goods
    const maxPermit = db.finishedGoods.reduce((max, item) => Math.max(max, item.permitNumber || 0), 0);
    const permitNumber = maxPermit + 1;

    const salePrice = toNumber(els.roastFinishedSalePrice.value);
    const finishedItem = {
      id: createId(),
      permitNumber,
      isBulkRoast: true,
      productId: roast.id, // use roast id as a unique identifier
      productName: `بن محمص: ${blend.name}`,
      blendName: blend.name,
      packWeightGrams: roundNumber(weightAfter * 1000),
      packPerCarton: 1,
      bagsPerPack: 1,
      cartonCount: 1,
      bagCount: 1,
      totalWeightKg: weightAfter,
      salePricePerKg: salePrice,
      totalValue: roundNumber(salePrice * weightAfter),
      date: date,
    };
    db.finishedGoods.push(finishedItem);
    showToast("تم تسجيل التحميص وإضافته لمخزن المنتجات التامة.");
    if (confirm("هل تريد طباعة إذن استلام للمخزن؟")) {
      printFinishedPermit(finishedItem);
    }
  } else {
    // New behavior: log as an external sale
    db.externalSales.push({
      id: createId(),
      roastId: roast.id,
      blendName: blend.name,
      weightKg: weightAfter,
      destinationType: destination,
      destinationName: destName,
      date: date,
    });
    showToast("تم تسجيل التحميص كعملية بيع خارجية.");
  }

  saveDB();
  els.roastForm.reset();
  setTodayDefaults();
  updateRoastBreakdown();
  toggleRoastDestinationInputs();
  renderAll();
}

function handleShopSubmit(event) {
  event.preventDefault();
  const entry = {
    id: els.shopId.value || createId(),
    name: els.shopName.value.trim(),
    notes: els.shopNotes.value.trim(),
  };

  if (!entry.name) {
    showToast("يرجى إدخال اسم المحل.");
    return;
  }

  const index = db.shops.findIndex((item) => item.id === entry.id);
  if (index >= 0) {
    db.shops[index] = entry;
    showToast("تم تحديث بيانات المحل.");
  } else {
    db.shops.push(entry);
    showToast("تمت إضافة محل جديد.");
  }
  saveDB();
  resetShopForm();
  renderAll();
}

function resetShopForm() {
  els.shopForm.reset();
  els.shopId.value = "";
}

function handleClientSubmit(event) {
  event.preventDefault();
  const entry = {
    id: els.clientId.value || createId(),
    name: els.clientName.value.trim(),
    notes: els.clientNotes.value.trim(),
  };

  if (!entry.name) {
    showToast("يرجى إدخال اسم العميل.");
    return;
  }

  const index = db.clients.findIndex((item) => item.id === entry.id);
  if (index >= 0) {
    db.clients[index] = entry;
    showToast("تم تحديث بيانات العميل.");
  } else {
    db.clients.push(entry);
    showToast("تمت إضافة عميل جديد.");
  }
  saveDB();
  resetClientForm();
  renderAll();
}

function resetClientForm() {
  els.clientForm.reset();
  els.clientId.value = "";
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
  const totalPacks = cartons * packPerCarton;
  const totalBags = totalPacks * bagsPerPack;
  const totalWeight = (pack * totalPacks) / 1000;
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

  // Generate Permit Number
  const maxPermit = db.finishedGoods.reduce((max, item) => Math.max(max, item.permitNumber || 0), 0);
  const permitNumber = maxPermit + 1;

  const production = {
    id: createId(),
    productId: product.id,
    productName: product.name,
    permitNumber, // Link permit to production record
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
  
  const finishedItem = {
    id: createId(),
    productId: production.productId,
    permitNumber,
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
  };
  db.finishedGoods.push(finishedItem);

  saveDB();
  els.productionForm.reset();
  updateProductionTotals();
  setTodayDefaults();
  renderAll();
  showToast("تم تسجيل الإنتاج وتحويله للمخزن.");
  if (confirm("هل تريد طباعة إذن استلام للمخزن؟")) {
    printFinishedPermit(finishedItem);
  }
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
  renderGreenBeanTypes();
  renderRawTable();
  renderBlends();
  renderShops();
  renderClients();
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
  renderGreenBeanTypes();
  renderRawTable();
  renderClients();
  renderRoastReport();
  renderMaintenanceTable();
  renderReports();
  ensureReportMeta();
}

function isSectionActive(id) {
  const section = document.getElementById(id);
  return section ? section.classList.contains("active") : false;
}

function renderGreenBeanTypes() {
  els.gbtTable.innerHTML = "";
  db.greenBeanTypes.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${formatCurrency(item.pricePerKg)}</td>
      <td>${formatNumber(item.bagWeightKg)} كجم</td>
      <td class="actions">
        <button class="edit">تعديل</button>
        <button class="danger">حذف</button>
      </td>
    `;
    row.querySelector(".edit").addEventListener("click", () => editGbt(item.id));
    row.querySelector(".danger").addEventListener("click", () => deleteGbt(item.id));
    els.gbtTable.appendChild(row);
  });
}

function editGbt(id) {
  const item = db.greenBeanTypes.find((i) => i.id === id);
  if (!item) return;
  els.gbtId.value = item.id;
  els.gbtName.value = item.name;
  els.gbtPrice.value = item.pricePerKg;
  els.gbtBagWeight.value = item.bagWeightKg;
}

function deleteGbt(id) {
  if (!confirm("هل تريد حذف نوع البن هذا؟ سيؤثر هذا على قوائم الاختيار.")) return;
  db.greenBeanTypes = db.greenBeanTypes.filter((item) => item.id !== id);
  saveDB();
  renderAll();
}

function renderRawTable() {
  renderSpecificRawTable("factory", els.rawFactoryTable);
  renderSpecificRawTable("shops", els.rawShopsTable);

  // Re-implement global raw report
  els.rawReportTable.innerHTML = "";
  const reportRange = getReportRange("report-raw");
  const allEntries = db.rawBeans.filter((item) => item.totalWeightKg > 0.0001);
  const reportEntries = filterByDate(allEntries, "addedAt", reportRange);
  reportEntries.forEach((item) => {
    const value = item.totalWeightKg * item.pricePerKg;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name} (${item.store === 'factory' ? 'مصنع' : 'محلات'})</td>
      <td>${formatNumber(item.bagCount)}</td>
      <td>${formatNumber(item.bagWeightKg)}</td>
      <td>${formatNumber(item.totalWeightKg)}</td>
      <td>${formatCurrency(item.pricePerKg)}</td>
      <td>${formatCurrency(value)}</td>
    `;
    els.rawReportTable.appendChild(row);
  });
}

function renderSpecificRawTable(storeType, tableEl) {
  tableEl.innerHTML = "";
  const entries = db.rawBeans.filter((item) => item.store === storeType && item.totalWeightKg > 0.0001);
  entries.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input type="checkbox" class="select-item" data-id="${item.id}" /></td>
      <td>${item.name}</td>
      <td>${formatCurrency(item.pricePerKg)}</td>
      <td>${formatNumber(item.bagWeightKg)} كجم</td>
      <td>${formatNumber(item.bagCount)}</td>
      <td>${formatNumber(item.totalWeightKg)} كجم</td>
      <td>${item.addedAt}</td>
      <td class="actions">
        <button class="secondary print-permit" title="طباعة إذن"><i class="fa-solid fa-print"></i></button>
        <button class="edit">تعديل</button>
        <button class="danger">حذف</button>
      </td>
    `;
    row.querySelector(".print-permit").addEventListener("click", () => printRawPermit(item));
    row.querySelector(".edit").addEventListener("click", () => editRaw(item.id));
    row.querySelector(".danger").addEventListener("click", () => deleteRaw(item.id));
    tableEl.appendChild(row);
  });
}

function editRaw(id) {
  const item = db.rawBeans.find((entry) => entry.id === id);
  if (!item) return;
  const gbt = db.greenBeanTypes.find((t) => normalizeBeanName(t.name) === item.nameKey);

  els.rawId.value = item.id;
  els.rawName.value = gbt ? gbt.id : "";
  els.rawPrice.value = item.pricePerKg;
  els.rawBagWeight.value = item.bagWeightKg;
  els.rawBagCount.value = item.bagCount;
  els.rawTotal.value = item.totalWeightKg;
  els.rawDate.value = item.addedAt;
  els.rawStoreType.value = item.store;
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

function renderShops() {
  els.shopTable.innerHTML = "";
  db.shops.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.notes || "-"}</td>
      <td class="actions">
        <button class="edit">تعديل</button>
        <button class="danger">حذف</button>
      </td>
    `;
    row.querySelector(".edit").addEventListener("click", () => editShop(item.id));
    row.querySelector(".danger").addEventListener("click", () => deleteShop(item.id));
    els.shopTable.appendChild(row);
  });
}

function editShop(id) {
  const item = db.shops.find((i) => i.id === id);
  if (!item) return;
  els.shopId.value = item.id;
  els.shopName.value = item.name;
  els.shopNotes.value = item.notes;
}

function deleteShop(id) {
  if (!confirm("هل تريد حذف هذا المحل؟")) return;
  db.shops = db.shops.filter((item) => item.id !== id);
  saveDB();
  renderAll();
}

function renderClients() {
  els.clientTable.innerHTML = "";
  db.clients.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.notes || "-"}</td>
      <td class="actions">
        <button class="edit">تعديل</button>
        <button class="danger">حذف</button>
      </td>
    `;
    row.querySelector(".edit").addEventListener("click", () => editClient(item.id));
    row.querySelector(".danger").addEventListener("click", () => deleteClient(item.id));
    els.clientTable.appendChild(row);
  });
}

function editClient(id) {
  const item = db.clients.find((i) => i.id === id);
  if (!item) return;
  els.clientId.value = item.id;
  els.clientName.value = item.name;
  els.clientNotes.value = item.notes;
}

function deleteClient(id) {
  if (!confirm("هل تريد حذف هذا العميل؟")) return;
  db.clients = db.clients.filter((item) => item.id !== id);
  saveDB();
  renderAll();
}

function renderBlendSelects() {
  const gbtOptions = db.greenBeanTypes
    .map((gbt) => `<option value="${gbt.id}">${gbt.name}</option>`)
    .join("");
  els.rawName.innerHTML = `<option value="">اختر نوع البن...</option>` + gbtOptions;
  applyGbtToRawForm();

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

  const shopOptions = db.shops
    .map((shop) => `<option value="${shop.id}">${shop.name}</option>`)
    .join("");
  els.roastShopSelect.innerHTML = shopOptions;

  const clientOptions = db.clients
    .map((client) => `<option value="${client.id}">${client.name}</option>`)
    .join("");
  els.roastClientSelect.innerHTML = clientOptions;
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

    let destText = "إنتاج المصنع";
    if (item.destinationType === 'shop') {
      destText = `محل: ${item.destinationName}`;
    } else if (item.destinationType === 'client') {
      destText = `عميل: ${item.destinationName}`;
    } else if (item.destinationType === 'finished_goods') {
      destText = 'مخزن المنتجات التامة';
    }
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.date}</td>
      <td>${item.blendName}</td>
      <td>${formatNumber(item.weightBeforeKg)} كجم</td>
      <td>${details}</td>
      <td>${formatNumber(item.lossPercent)}%</td>
      <td>${formatNumber(item.weightAfterKg)} كجم</td>
      <td>${destText}</td>
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
    const isBulk = item.isBulkRoast;
    const actionsHtml = isBulk
      ? `<button class="secondary print-permit" title="طباعة إذن"><i class="fa-solid fa-print"></i></button><button class="danger">حذف</button>`
      : `<button class="secondary print-permit" title="طباعة إذن"><i class="fa-solid fa-print"></i></button><button class="edit">تعديل</button><button class="danger">حذف</button>`;

    row.innerHTML = `
      <td><input type="checkbox" class="select-item" data-id="${item.id}" /></td>
      <td>${item.productName}</td>
      <td>${item.blendName || '-'}</td>
      <td>${isBulk ? '-' : `${formatNumber(item.packWeightGrams)} جم`}</td>
      <td>${isBulk ? '-' : formatNumber(item.cartonCount)}</td>
      <td>${isBulk ? '-' : formatNumber(item.bagCount)}</td>
      <td>${formatNumber(item.totalWeightKg)} كجم</td>
      <td>${formatCurrency(item.salePricePerKg)}</td>
      <td>${formatCurrency(item.totalValue)}</td>
      <td class="actions">
        ${actionsHtml}
      </td>
    `;
    row.querySelector(".print-permit").addEventListener("click", () => printFinishedPermit(item));
    if (!isBulk) {
      row.querySelector(".edit").addEventListener("click", () => openFinishedEdit(item.id));
    }
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
  const totalPacks = cartons * packPerCarton;
  const totalBags = totalPacks * bagsPerPack;
  const totalWeight = (pack * totalPacks) / 1000;
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
  renderShopSalesReport();
  renderClientSalesReport();
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

function renderShopSalesReport() {
  const range = getReportRange("report-shop-sales");
  const list = filterByDate(db.externalSales, "date", range).filter(i => i.destinationType === 'shop');
  els.reportShopSalesTable.innerHTML = "";
  list.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.date}</td>
      <td>${item.blendName}</td>
      <td>${formatNumber(item.weightKg)} كجم</td>
      <td>محل</td>
      <td>${item.destinationName}</td>
    `;
    els.reportShopSalesTable.appendChild(row);
  });
}

function renderClientSalesReport() {
  const range = getReportRange("report-client-sales");
  const list = filterByDate(db.externalSales, "date", range).filter(i => i.destinationType === 'client');
  els.reportClientSalesTable.innerHTML = "";
  list.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.date}</td>
      <td>${item.blendName}</td>
      <td>${formatNumber(item.weightKg)} كجم</td>
      <td>${item.destinationName}</td>
    `;
    els.reportClientSalesTable.appendChild(row);
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

function checkRawAvailability(components, storeType) {
  const shortages = [];
  components.forEach((comp) => {
    const compKey = normalizeBeanName(comp.bean);
    const available = db.rawBeans
      .filter((item) => item.nameKey === compKey && item.store === storeType)
      .reduce((acc, item) => acc + item.totalWeightKg, 0);
    if (available + 0.0001 < comp.kg) shortages.push(comp.bean);
  });
  return shortages;
}

function consumeRawBeans(beanName, kgNeeded, storeType) {
  let remaining = kgNeeded;
  let cost = 0;
  const beanKey = normalizeBeanName(beanName);
  const entries = db.rawBeans
    .filter((item) => item.nameKey === beanKey && item.store === storeType)
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

function getPermitCss() {
  return `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap');
      body { 
        font-family: 'Cairo', sans-serif; 
        -webkit-print-color-adjust: exact; 
        background-color: #f9f9f9; 
        margin: 0;
        padding: 20px;
      }
      .permit-container {
        border: 1px solid #ddd;
        padding: 40px;
        max-width: 800px;
        margin: 20px auto;
        background: #fff;
        box-shadow: 0 0 20px rgba(0,0,0,0.07);
        position: relative;
      }
      .permit-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding-bottom: 20px;
        border-bottom: 4px solid #333;
        margin-bottom: 25px;
      }
      .permit-header .logo {
        width: 90px;
        height: auto;
        border-radius: 8px;
      }
      .permit-header .company-details h1 {
        margin: 0;
        font-size: 28px;
        font-weight: 700;
        color: #111;
      }
      .permit-header .company-details p {
        margin: 5px 0 0;
        font-size: 16px;
        color: #555;
      }
      .permit-info {
        text-align: left;
      }
      .permit-info h2 {
        margin: 0;
        font-size: 24px;
        font-weight: 700;
        color: #bf7b4b;
      }
      .permit-info p {
        margin: 8px 0 0;
        font-size: 16px;
        font-weight: bold;
        background: #f5f5f5;
        padding: 5px 10px;
        border-radius: 4px;
      }
      .permit-details {
        margin-top: 30px;
        margin-bottom: 40px;
      }
      .permit-details table {
        width: 100%;
        border-collapse: collapse;
      }
      .permit-details th, .permit-details td {
        border: 1px solid #e0e0e0;
        padding: 14px;
        text-align: center;
        font-size: 16px;
      }
      .permit-details th {
        background-color: #333;
        color: #fff;
        font-weight: 600;
      }
      .permit-details tr:nth-child(even) {
        background-color: #f9f9f9;
      }
      .permit-footer {
        margin-top: 80px;
        display: flex;
        justify-content: space-around;
      }
      .signature-block {
        text-align: center;
        width: 250px;
      }
      .signature-block p {
        font-size: 17px;
        font-weight: 600;
        margin-bottom: 60px;
      }
      .signature-block span {
        border-top: 1px dotted #555;
        padding-top: 5px;
        display: block;
        color: #777;
        font-size: 14px;
      }
      @media print {
        body { padding: 0; background-color: #fff; }
        .permit-container {
          box-shadow: none;
          border: none;
          margin: 0;
          padding: 10px;
        }
      }
    </style>
  `;
}

function handleSelectAll(event) {
    const sourceCheckbox = event.target;
    const tableId = sourceCheckbox.dataset.table;
    const table = document.getElementById(tableId);
    if (table) {
        table.querySelectorAll('input[type="checkbox"].select-item').forEach(checkbox => {
            checkbox.checked = sourceCheckbox.checked;
        });
    }
}

function handlePrintSelectedRaw() {
    const selectedIds = [];
    document.querySelectorAll('#raw-factory-table .select-item:checked, #raw-shops-table .select-item:checked').forEach(checkbox => {
        selectedIds.push(checkbox.dataset.id);
    });

    if (selectedIds.length === 0) {
        showToast("يرجى تحديد عنصر واحد على الأقل للطباعة.");
        return;
    }

    const selectedItems = db.rawBeans.filter(item => selectedIds.includes(item.id));
    printMultiRawPermit(selectedItems);
}

function handlePrintSelectedFinished() {
    const selectedIds = [];
    document.querySelectorAll('#finished-table .select-item:checked').forEach(checkbox => {
        selectedIds.push(checkbox.dataset.id);
    });

    if (selectedIds.length === 0) {
        showToast("يرجى تحديد عنصر واحد على الأقل للطباعة.");
        return;
    }

    const selectedItems = db.finishedGoods.filter(item => selectedIds.includes(item.id));
    printMultiFinishedPermit(selectedItems);
}

function printMultiFinishedPermit(items) {
  const printWindow = window.open("", "_blank");
  
  if (!db.multiPermitCounter) db.multiPermitCounter = 90001;
  const permitNo = db.multiPermitCounter;
  db.multiPermitCounter++;
  saveDB();

  const tableRows = items.map(item => {
    const isBulk = item.isBulkRoast;
    const cartons = isBulk ? '-' : formatNumber(item.cartonCount);
    const packs = isBulk ? '-' : formatNumber(item.packPerCarton);
    return `
      <tr>
        <td>${item.date}</td>
        <td>${item.productName}</td>
        <td>${cartons}</td>
        <td>${packs}</td>
        <td>${formatNumber(item.totalWeightKg)}</td>
      </tr>
    `;
  }).join('');

  printWindow.document.write(`
    <html dir="rtl">
      <head><title>إذن استلام مجمع - منتجات تامة</title>${getPermitCss()}</head>
      <body>
        <div class="permit-container">
          <div class="permit-header">
            <div class="company-details">
              <h1>مصنع البهنساوي للبن</h1>
              <p>الإدارة العامة للمخازن والإنتاج</p>
            </div>
            <div class="permit-info">
              <h2>إذن استلام مجمع</h2>
              <p>رقم الإذن: ${permitNo}</p>
            </div>
            <img src="5.jpg" class="logo" alt="logo" />
          </div>
          <div class="permit-details">
            <table>
              <thead>
                <tr>
                  <th>تاريخ الإنتاج</th>
                  <th>اسم المنتج</th>
                  <th>عدد الكراتين</th>
                  <th>العبوات / كرتونة</th>
                  <th>إجمالي الوزن (كجم)</th>
                </tr>
              </thead>
              <tbody>
                ${tableRows}
              </tbody>
            </table>
          </div>
          <div class="permit-footer">
            <div class="signature-block">
              <p>مدير الإنتاج</p>
              <span>التوقيع</span>
            </div>
            <div class="signature-block">
              <p>مدير المخزن</p>
              <span>التوقيع</span>
            </div>
          </div>
        </div>
        <script>window.onload = function() { window.print(); }</script>
      </body>
    </html>
  `);
  printWindow.document.close();
}

function printMultiRawPermit(items) {
  const printWindow = window.open("", "_blank");
  
  if (!db.multiPermitCounter) db.multiPermitCounter = 90001;
  const permitNo = db.multiPermitCounter;
  db.multiPermitCounter++;
  saveDB();
  
  const tableRows = items.map(item => `
      <tr>
          <td>${item.addedAt}</td>
          <td>${item.name}</td>
          <td>${item.store === 'factory' ? 'محمصة المصنع' : 'محمصة للمحلات'}</td>
          <td>${formatNumber(item.bagCount)}</td>
          <td>${formatNumber(item.totalWeightKg)}</td>
      </tr>
  `).join('');

  printWindow.document.write(`
    <html dir="rtl">
      <head><title>إذن استلام مجمع - بن أخضر</title>${getPermitCss()}</head>
      <body>
        <div class="permit-container">
          <div class="permit-header">
            <div class="company-details">
              <h1>مصنع البهنساوي للبن</h1>
              <p>الإدارة العامة للمخازن</p>
            </div>
            <div class="permit-info">
              <h2>إذن استلام مجمع (بن أخضر)</h2>
              <p>رقم الإذن: ${permitNo}</p>
            </div>
            <img src="5.jpg" class="logo" alt="logo" />
          </div>
          <div class="permit-details">
            <table>
              <thead>
                <tr>
                  <th>تاريخ الورود</th>
                  <th>نوع البن</th>
                  <th>المخزن</th>
                  <th>عدد الشوالات</th>
                  <th>إجمالي الوزن (كجم)</th>
                </tr>
              </thead>
              <tbody>
                ${tableRows}
              </tbody>
            </table>
          </div>
          <div class="permit-footer">
            <div class="signature-block">
              <p>مدير الإنتاج</p>
              <span>التوقيع</span>
            </div>
            <div class="signature-block">
              <p>مدير مخزن البن الأخضر</p>
              <span>التوقيع</span>
            </div>
          </div>
        </div>
        <script>window.onload = function() { window.print(); }</script>
      </body>
    </html>
  `);
  printWindow.document.close();
}

function printFinishedPermit(item) {
  const printWindow = window.open("", "_blank");
  const permitNo = item.permitNumber || "N/A";
  
  const tableHeader = item.isBulkRoast 
    ? `<th>التوليفة</th>` 
    : `<th>عدد الكراتين</th><th>العبوات / كرتونة</th>`;
  
  const tableBody = item.isBulkRoast 
    ? `<td>${item.blendName}</td>` 
    : `<td>${formatNumber(item.cartonCount)}</td><td>${formatNumber(item.packPerCarton)}</td>`;

  printWindow.document.write(`
    <html dir="rtl">
      <head><title>إذن استلام منتجات تامة - رقم ${permitNo}</title>${getPermitCss()}</head>
      <body>
        <div class="permit-container">
          <div class="permit-header">
            <div class="company-details">
              <h1>مصنع البهنساوي للبن</h1>
              <p>الإدارة العامة للمخازن والإنتاج</p>
            </div>
            <div class="permit-info">
              <h2>إذن استلام منتجات تامة</h2>
              <p>رقم الإذن: ${permitNo}</p>
            </div>
            <img src="5.jpg" class="logo" alt="logo" />
          </div>
          <div class="permit-details">
            <table>
              <thead>
                <tr>
                  <th>تاريخ الإنتاج</th>
                  <th>اسم المنتج</th>
                  ${tableHeader}
                  <th>إجمالي الوزن (كجم)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${item.date}</td>
                  <td>${item.productName}</td>
                  ${tableBody}
                  <td>${formatNumber(item.totalWeightKg)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="permit-footer">
            <div class="signature-block">
              <p>مدير الإنتاج</p>
              <span>التوقيع</span>
            </div>
            <div class="signature-block">
              <p>مدير المخزن</p>
              <span>التوقيع</span>
            </div>
          </div>
        </div>
        <script>window.onload = function() { window.print(); }</script>
      </body>
    </html>
  `);
  printWindow.document.close();
}

function printRawPermit(item) {
  const storeName = item.store === "factory" ? "مخزن محمصة المصنع" : "مخزن محمصة للمحلات";
  const printWindow = window.open("", "_blank");
  const permitNo = item.permitNumber || item.id.substring(0, 8); // Fallback for old records

  printWindow.document.write(`
    <html dir="rtl">
      <head><title>إذن استلام بن أخضر - رقم ${permitNo}</title>${getPermitCss()}</head>
      <body>
        <div class="permit-container">
          <div class="permit-header">
            <div class="company-details">
              <h1>مصنع البهنساوي للبن</h1>
              <p>الإدارة العامة للمخازن</p>
            </div>
            <div class="permit-info">
              <h2>إذن استلام بن أخضر</h2>
              <p>رقم الإذن: ${permitNo}</p>
            </div>
            <img src="5.jpg" class="logo" alt="logo" />
          </div>
          <div class="permit-details">
            <table>
              <thead>
                <tr>
                  <th>تاريخ الورود</th>
                  <th>المخزن المستلم</th>
                  <th>نوع البن</th>
                  <th>عدد الشوالات</th>
                  <th>إجمالي الوزن (كجم)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${item.addedAt}</td>
                  <td>${storeName}</td>
                  <td>${item.name}</td>
                  <td>${formatNumber(item.bagCount)}</td>
                  <td>${formatNumber(item.totalWeightKg)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="permit-footer">
            <div class="signature-block">
              <p>مدير الإنتاج</p>
              <span>التوقيع</span>
            </div>
            <div class="signature-block">
              <p>مدير مخزن البن الأخضر</p>
              <span>التوقيع</span>
            </div>
          </div>
        </div>
        <script>window.onload = function() { window.print(); }</script>
      </body>
    </html>
  `);
  printWindow.document.close();
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

resetGbtForm();
resetClientForm();
resetBlendForm();
resetProductForm();
updateProductionTotals();
updateFinishedTotals();
