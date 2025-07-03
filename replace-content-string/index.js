const { zesty } = require('./zestyConfig');
require('dotenv').config();

const fieldToEdit = "content_body";
const termToReplace = "works";
const regExp = new RegExp(`\\b${termToReplace}\\b`, "g");
const replaceWith = "workshop";

const getItem = async (model_zuid, item_zuid) => {
  try {
    const apiReturn = await zesty.instance.getItem(model_zuid, item_zuid);
    return apiReturn;
  } catch (error) {
    console.error(`Error fetching item ${item_zuid}:`, error);
    throw error;
  }
};

const publishLatestVersion = async (itemZUID, modelZUID) => {
  const item = await getItem(modelZUID, itemZUID);
  const latest_version_to_publish = item.data.meta.version;
  await publish(itemZUID, modelZUID, latest_version_to_publish);
  return item;
};

const publish = async (itemZUID, modelZUID, versionNumber = 1) => {
  try {
    const publishResponse = await zesty.instance.publishItem(
      modelZUID,
      itemZUID,
      versionNumber
    );
    return publishResponse;
  } catch (error) {
    console.error(`Error publishing item ${itemZUID} version ${versionNumber}:`, error);
    throw error;
  }
};

const getItems = async () => {
  try {
    return zesty.instance.getItems(process.env.ZESTY_ARTICLES_ZUID);
  } catch (error) {
    console.error(`Error fetching items from model ${process.env.ZESTY_ARTICLES_ZUID}:`, error);
    throw error;
  }
};

const updateItem = async (zuid, updatePayload) => {
  try {
    await zesty.instance.patchItem(process.env.ZESTY_ARTICLES_ZUID, zuid, {
      data: updatePayload,
    });
    const latestPublishedVersion = publishLatestVersion(
      zuid,
      process.env.ZESTY_ARTICLES_ZUID
    );
    return latestPublishedVersion;
  } catch (error) {
    console.error(`Error updating item ${zuid}:`, error);
    throw error;
  }
};

const main = async () => {
  const items = await getItems();

  const operations = items.data
    .filter(item => item.data?.[fieldToEdit]?.match(regExp))
    .map(async item => {
      try {
        await updateItem(item.meta.ZUID, {
          [fieldToEdit]: item.data[fieldToEdit].replace(regExp, replaceWith),
        });
    
        await publishLatestVersion(item.meta.ZUID, process.env.ZESTY_ARTICLES_ZUID);
      } catch (error) {
        console.error(`Failed to process item ${item.meta.ZUID}:`, error);
      }
    });

  await Promise.all(operations);
};

main();