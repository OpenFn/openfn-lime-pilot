const metadataPath =
  'repos/OpenFn/openfn-lime-pilot/contents/metadata/collections.json';

get(metadataPath, {
  headers: {
    'user-agent': 'OpenFn',
  },
  query: {
    ref: 'next-staging',
  },
});

fn(state => {
  const { formMaps, formMetadata, optsMap, data } = state;

  state.body = {
    message: 'Update metadata content',
    committer: {
      name: 'Emmanuel Evance',
      email: 'mtuchidev@gmail.com',
    },
    content: util.encode(
      JSON.stringify({
        optsMap,
        formMaps,
        formMetadata,
      })
    ),
    sha: data.sha,
    branch: 'next-staging',
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
