post('repos/OpenFn/openfn-lime-pilot/contents/metadata/metadata_mapping.json', {
  body: ({ f01MphssBaseline, optionSets }) => ({
    optionSets,
    f01MphssBaseline,
  }),
  headers: {
    'content-type': 'application/json',
    'X-GitHub-Api-Version': '2022-11-28',
    accept: 'application/vnd.github+json',
  },
});
