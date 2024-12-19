// Fetch all encounters
get(
  '/ws/fhir2/R4/Encounter',
  { query: { _count: 100, _lastUpdated: `ge${$.cursor}` }, parseAs: 'json' },
  state => {
    const { link, total } = state.data;
    state.nextUrl = link
      .find(l => l.relation === 'next')
      ?.url.replace(/(_count=)\d+/, `$1${total}`);

    state.allResponse = state.data;
    return state;
  }
);

fnIf(
  $.nextUrl,
  get($.nextUrl, { parseAs: 'json' }, state => {
    delete state.allResponse.link;
    state.allResponse.entry.push(...state.data.entry);
    console.log(state.allResponse.entry.length);
    return state;
  })
);

fn(state => {
  state.encounterUuids = state.allResponse.entry.map(p => p.resource.id);
  state.patientUuids = [
    ...new Set(
      state.allResponse.entry.map(p =>
        p.resource.subject.reference.replace('Patient/', '')
      )
    ),
  ];

  return state;
});

// Fetch patient encounters
each(
  $.patientUuids,
  get(
    '/ws/rest/v1/encounter/',
    { query: { patient: $.data, v: 'full' }, parseAs: 'json' },
    state => {
      const patientUuid = state.references.at(-1);
      const filteredEncounters = state.formUuids.map(formUuid =>
        state.data.results.filter(
          e => e.encounterDatetime >= state.cursor && e?.form?.uuid === formUuid
        )
      );

      const encounters = filteredEncounters.map(e => e[0]).filter(e => e);
      state.encounters ??= [];
      state.encounters.push(...encounters);

      console.log(
        encounters.length,
        `# of filtered encounters found in OMRS for ${patientUuid}`
      );

      return state;
    }
  )
);

fn(state => {
  const {
    data,
    index,
    response,
    references,
    allResponse,
    patientUuids,
    ...next
  } = state;
  console.log(next.encounters.length, '# of new encounters to sync to dhis2');

  return next;
});
