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
];

getDrive(
  {
    id: $.siteId,
    owner: 'sites',
  },
  'default'
);

getFile('/msf-metadata/LIME EMR - Iraq Metadata - Release 1 2024-08-21.xlsx', {
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
