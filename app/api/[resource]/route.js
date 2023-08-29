import { NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";

// Routes
export async function GET(request, {params}) {
  const response = await getData(params?.resource);

  return NextResponse.json(
    response ? response : {error: "Unknown resource"},
    {status: response ? 200 : 404}
  );
}

export async function POST(request, {params}) {
  const {resource} = params;
  const isReset = resource === 'reset';
  const action = isReset ? resetSavedData : saveData;

  const body = await request.json();

  const response = await (action(resource, body)).then(async r => {
    return await getData(resource);
  });

  return NextResponse.json(
    response ? response : {error: "Unknown resource"},
    { status: response ? 200 : 404 }
  );
}

/**
 * This service is added for the delete item fro mresource
 *
 * @param {*} request
 * @param {String} resource reource name which will be processed
 * @returns
 */
export async function DELETE(request, {params}) {
  const {resource} = params;

  const body = await request.json();

  const response = await (deleteData(resource, body)).then(async r => {
    return await getData(resource);
  });

  return NextResponse.json(
    response ? response : {error: "Unknown resource"},
    {status: response ? 200 : 404}
  );
}

const getData = async (resource) => {
  return await new Promise(async (resolve, reject) => {
    let savedData = await readData("./src/data/savedData.json");

    const firstLoad = !Object.entries(savedData).length;
    const data = !firstLoad
      ? savedData
      : await readData("./src/data/initialData.json");

      if (firstLoad) await saveDataCopy(data);

      console.log({data, resource, r: data[resource]})
  
      resolve(resource && resource !== 'reset' ? data[resource] : data);
    });
  };

const saveData = async (resource, data) => {
  data = Array.isArray(data) ? data : [data];

  // Load
  const newData = {...await getData()};
  if (!Object.keys(newData).includes(resource)) return;

  const resourceData = newData[resource];

  // Insert
  data.forEach(item => {
    let newItem = resourceData.find(i => i.id === item.id);

    if (newItem) {
      resourceData[resourceData.indexOf(newItem)] = {...newItem, ...item};
    } else {
      //Added 0 if there is no data added before
      const newId = Math.max(0, ...resourceData.map(i => i.id)) + 1;
      const {id, ...rest} = item;
      newItem = {id: newId, ...rest};
      resourceData.push(newItem);
    }
  });

  newData[resource] = resourceData;

  // Write
  // await writeFile('./src/data/savedData.json', JSON.stringify(newData, null, "\t"));
  await saveDataCopy(newData);
};

/**
 * Delete data from and save to the json
 *
 * @param {string} resource which data is located in
 * @param {object} data contains id which will be deleted
 * @returns
 */
const deleteData = async (resource, data) => {
  if(!data?.id){
    return;
  }

  // Load
  const newData = {...await getData()};
  if (!Object.keys(newData).includes(resource)) return;

  const resourceData = newData[resource];

  //filter
  newData[resource] = resourceData.filter(item => item.id != data.id);

  // Write
  // await writeFile('./src/data/savedData.json', JSON.stringify(newData, null, "\t"));
  await saveDataCopy(newData);
};

const saveDataCopy = async (data) => {
  await writeFile('./src/data/savedData.json', JSON.stringify(data, null, "\t"));
}

const resetSavedData = async () => {
  await writeFile(`./src/data/savedData.json`, JSON.stringify({}));
};

const readData = async (url) => {
  if (!url) {
    return null;
  }

  const data = await readFile(url, "utf8");

  return data ? JSON.parse(data) : {};
};
