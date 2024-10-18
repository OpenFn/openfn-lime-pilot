const metadataPath =
  'repos/OpenFn/openfn-lime-pilot/contents/metadata/metadata_mapping.json';

get(metadataPath, {
  headers: {
    'user-agent': 'OpenFn',
  },
});

fn(state => {
  const { f01MphssBaseline, optionSets, data } = state;

  state.body = {
    message: 'Update metadata content',
    committer: {
      name: 'Emmanuel Evance',
      email: 'mtuchidev@gmail.com',
    },
    content: util.encode(
      JSON.stringify({
        optionSets,
        f01MphssBaseline,
      })
    ),
    sha: data.sha,
  };

  return state;
});

put(metadataPath, {
  body: $.body,
  headers: {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'user-agent': 'OpenFn',
  },
});
