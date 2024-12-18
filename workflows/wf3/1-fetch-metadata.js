fn(state => {
  state.sheets = ['OptionSets', 'identifiers', 'Places of living'];
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

get(
  `${$.workbookBase}/worksheets('omrs-form-metadata')/usedRange`,
  {},
  state => {
    const [headers, ...rows] = state.data.values;
    state.formMetadata = rows
      .map(row =>
        row.reduce((obj, value, index) => {
          if (value) {
            obj[headers[index]] = value;
          }
          return obj;
        }, {})
      )
      .filter(obj => Object.keys(obj).length > 0 && obj['Active']);

    state.sheets.push(
      ...state.formMetadata.map(obj => obj['OMRS form sheet name'])
    );
    return state;
  }
);

each(
  $.sheets,
  get(`${$.workbookBase}/worksheets('${$.data}')/usedRange`, {}, state => {
    const sheetName = state.references.at(-1);
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
