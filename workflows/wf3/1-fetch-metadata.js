// get(
//   'https://raw.githubusercontent.com/OpenFn/openfn-lime-pilot/refs/heads/main/sample-data/sample_metadata_from_sharepoint_ms_graph.json'
// );
// fn(state => {
//   state.optionSetsXlsData = JSON.parse(state.data).values;
//   return state;
// });

// get(
//   'https://raw.githubusercontent.com/OpenFn/openfn-lime-pilot/refs/heads/main/sample-data/sample_metadata_from_sharepoint_ms_graph_ms_baseline.json'
// );
// fn(state => {
//   state.f01MphssBaselineXls = JSON.parse(state.data).values;

//   delete state.data;
//   delete state.references;
//   delete state.response;

//   return state;
// });

getDrive(
  {
    id: $.siteId,
    owner: 'sites',
  },
  'default'
);

getFile('/Metadata/metadata.xlsx', { metadata: true });

fn(state => {
  const itemId = state.data.id;
  const driveId = state.drives.default.id;
  state.metadataPath = `/sites/${state.siteId}/drives/${driveId}/items/${itemId}/workbook/worksheets('OptionSets')/usedRange `;
  return state;
});

get($.metadataPath);
