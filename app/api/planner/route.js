import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";

/**
 * This service is added for the returns all data to the frontend
 * @returns All data
 */
export async function GET() {
  const response = await getData();

  return NextResponse.json(
    response ? response : { error: "Unknown resource" },
    { status: response ? 200 : 404 }
  );
}

/**
 * This service is added to make a plan and return all updated data to the frontend
 *
 * @param {*} request
 * @returns
 */
export async function POST(request) {
  const body = await request.json();

  const { saladIds } = body;

  if (!saladIds || saladIds.length < 3) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 500 });
  }

  const response = await planner(saladIds).then(async (r) => {
    return await getData();
  });

  return NextResponse.json(
    response ? response : { error: "Unknown resource" },
    { status: response ? 200 : 404 }
  );
}

/**
 * This method calculates how much salad, ingredients we need and find optimized order plan
 * And save updated data.
 *
 * This method is written in the backend side because:
 *  - all udpated data is reacheable
 *  - data safety
 *  - decrease network load
 *
 * Mappers are used for the act like join/lookup database behaviour
 *
 * @param {Array<string>} saladIds
 */
const planner = async (saladIds) => {
  const data = await getData();

  // Map<id, salad> : Will be used for faster reach to salad by id
  let saladMapper = data.salads
    .filter((item) => saladIds.includes(item.id))
    .reduce((saladObject, item) => {
      saladObject[item.size] = item;

      // Clear week of the salad
      saladObject[item.size].targetStockByWeekday = [0, 0, 0, 0, 0];
      return saladObject;
    }, {});

  // Map<id, ingredient> : Will be used for faster reach to ingredient by id
  let ingredientMapper = data.ingredients.reduce((ingredientObject, item) => {
    ingredientObject[item.id] = item;
    return ingredientObject;
  }, {});

  // Map<id, supplier> : Will be used for faster reach to supplier by id
  let supplierMapper = data.suppliers.reduce((supplierObject, item) => {
    supplierObject[item.id] = item;

    // Clear week of the supplier
    supplierObject[item.id].productsToOrder = [];
    return supplierObject;
  }, {});

  // Check all weekdays of subscriptions
  data.subscriptions.forEach((subscription) => {
    subscription.weekdays.forEach((day) => {
      // Salad value is increased 1 for the detected day.
      // Subscriptions weekdays are valued with 1-5. So salad targetStockByWeekday
      // set with day-1
      saladMapper[subscription.type].targetStockByWeekday[day - 1]++;

      // Required salad ingredients should be added to the daily order of supplier
      saladMapper[subscription.type].ingredients.forEach((ingredient) => {
        // Calculate ingredient weight
        const ingredientWeight =
          ingredientMapper[ingredient.id].weightPerServing *
          ingredient.numOfServings;

        // Initialize day value of supplier
        let dayOfSupplier =
          supplierMapper[ingredientMapper[ingredient.id].supplierId]
            .productsToOrder[day - 1] || {};

        // Initialize ingredient value for the day
        dayOfSupplier[ingredient.id] = dayOfSupplier[ingredient.id] || {
          id: ingredient.id,
          hoursFresh: ingredientMapper[ingredient.id].hoursFresh,
          value: 0,
        };

        // Add new amount to the existing
        dayOfSupplier[ingredient.id].value =
          dayOfSupplier[ingredient.id].value + ingredientWeight;

        // Set day of supplier
        supplierMapper[
          ingredientMapper[ingredient.id].supplierId
        ].productsToOrder[day - 1] = dayOfSupplier;
      });
    });
  });

  // Optimize supplier orders.
  const suppliers = Object.entries(supplierMapper).map(
    ([supplierId, supplier]) => {
      const supplierOrders = [];

      // Check all days of supplier
      supplier.productsToOrder.forEach(
        (productsOfDay, index, productsToOrderArray) => {
          const dayOfSupplier = [];

          // Check all products in a day
          Object.entries(productsOfDay).forEach(([productId, product]) => {
            // Transform hours to day
            const daysFresh = product.hoursFresh / 24;

            // If dayFresh is more than 1, orders can be merged
            if (daysFresh > 1) {
              let totalValue = product.value;

              // Upcoming days which are in range with daysFresh will be merge
              for (
                let upcomingDaysIndex = 1;
                upcomingDaysIndex < daysFresh &&
                index + upcomingDaysIndex < productsToOrderArray.length;
                upcomingDaysIndex++
              ) {
                // Product which are in upcoming days will be added to current day
                // And delete items from upcaming days data
                if (
                  productsToOrderArray[index + upcomingDaysIndex][productId]
                ) {
                  totalValue +=
                    productsToOrderArray[index + upcomingDaysIndex][productId]
                      .value;
                  delete productsToOrderArray[index + upcomingDaysIndex][
                    productId
                  ];
                }
              }

              // Push product value to supplier daily array
              dayOfSupplier.push({
                ...product,
                value: totalValue,
              });
            } else {
              // Push product to the daily array without merge
              dayOfSupplier.push(product);
            }
          });

          // Push day to the suppliers order
          supplierOrders.push(dayOfSupplier);
        }
      );

      // Set order of the supplier
      supplier.productsToOrder = supplierOrders;

      return supplier;
    }
  );

  // Set salad target stock if salad selected to the plan.
  const salads = data.salads.map((salad) => ({
    ...salad,
    targetStockByWeekday:
      saladMapper[salad.size] && saladMapper[salad.size].id == salad.id
        ? saladMapper[salad.size].targetStockByWeekday
        : [],
  }));

  // Save data
  await saveData({
    suppliers,
    salads,
  });
};

const getData = async () => {
  return await new Promise(async (resolve, reject) => {
    let savedData = await import("@/data/savedData.json");

    const firstLoad = !Object.entries(savedData).length;
    const data = !firstLoad
      ? savedData
      : await import("@/data/initialData.json");

    if (firstLoad) await saveDataCopy(data);

    resolve(data);
  });
};

const saveData = async (data = {}) => {
  // Load
  const newData = { ...(await getData()) };

  Object.keys(data).forEach((resource) => {
    if (!Object.keys(newData).includes(resource)) return;

    const resourceData = newData[resource];

    data[resource].forEach((item) => {
      let newItem = resourceData.find((i) => i.id === item.id);

      if (newItem) {
        resourceData[resourceData.indexOf(newItem)] = { ...newItem, ...item };
      } else {
        const newId = Math.max(0, ...resourceData.map((i) => i.id)) + 1;
        const { id, ...rest } = item;
        newItem = { id: newId, ...rest };
        resourceData.push(newItem);
      }
    });

    newData[resource] = resourceData;
  });

  // Write
  await writeFile(
    "./src/data/savedData.json",
    JSON.stringify(newData, null, "\t")
  );
};

const saveDataCopy = async (data) => {
  await writeFile(
    "./src/data/savedData.json",
    JSON.stringify(data, null, "\t")
  );
};
