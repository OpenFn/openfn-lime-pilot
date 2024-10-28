const toCamelCase = text => {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
};

const sheets = [
  'OptionSets',
  'F01-MHPSS Baseline',
  'F02-MHPSS Follow-up',
  'F03-mhGAP Baseline',
  'F04-mhGAP Follow-up',
  'F05-MHPSS Closure',
];

fn(state => {
  state.siteId =
    'openfnorg.sharepoint.com,4724a499-afbc-4ded-a371-34ae40bf5d8d,1d20a7d4-a6f1-407c-aa77-76bd47bb0f32';
  return state;
});

getDrive(
  {
    id: $.siteId,
    owner: 'sites',
  },
  'default'
);

getFile('/msf-metadata/LIME EMR - Iraq Metadata - Release 1.xlsx', {
  metadata: true,
});

fn(state => {
  const itemId = state.data.id;
  const driveId = state.drives.default.id;
  state.workbookBase = `sites/${state.siteId}/drives/${driveId}/items/${itemId}/workbook`;
  return state;
});

each(
  sheets,
  get(`${$.workbookBase}/worksheets('${$.data}')/usedRange`, {}, state => {
    const sheetName = toCamelCase(state.references.at(-1));
    console.log('Fetched sheet: ', sheetName);
    state[sheetName] = state.data.values;
    return state;
  })
);

fn(state => {
  delete state.data;
  delete state.response;
  delete state.references;
  return state;
});
