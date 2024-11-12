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
  const { formMaps, formMetadata, optsMap, data, identifiers, answerKeyMap } =
    state;

  state.body = {
    message: 'Update metadata content',
    committer: {
      name: 'Emmanuel Evance',
      email: 'mtuchidev@gmail.com',
    },
    content: util.encode(
      JSON.stringify({
        answerKeyMap,
        optsMap,
        formMaps,
        identifiers,
        formMetadata,
      })
    ),
    sha: data.sha,
    branch: 'collections',
  };

  return state;
});

put(
  metadataPath,
  {
    body: $.body,
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'user-agent': 'OpenFn',
    },
  },
  ({ body, data, references, response, ...state }) => state
);
