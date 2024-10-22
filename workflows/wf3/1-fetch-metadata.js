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
