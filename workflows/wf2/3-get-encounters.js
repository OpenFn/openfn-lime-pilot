const formUuids = [
  '82db23a1-4eb1-3f3c-bb65-b7ebfe95b19b',
  '6a3e1e0e-dd13-3465-b8f5-ee2d42691fe5',
  'be8c12f9-e6fd-369a-9bc7-46a191866f15',
  '48577ac5-d9c0-3000-9bac-075409b38336',
  'ee6b1b06-3163-334a-8538-be69250af727',
];

// cursor('2024-09-29');

fhirGet('/ws/fhir2/R4/Encounter', {
  _count: 100,
  _lastUpdated: `ge${$.cursor}`,
});

fn(state => {
  state.encounterUuids = state.data.entry.map(p => p.resource.id);
  state.patientUuids = [
    ...new Set(
      state.data.entry.map(p =>
        p.resource.subject.reference.replace('Patient/', '')
      )
    ),
  ];

  return state;
});

each(
  $.patientUuids,
  getEncounters({ patient: $.data, v: 'full' }, state => {
    const patientUuid = state.references.at(-1);
    const filteredEncounters = formUuids.map(formUuid =>
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
  })
);

// Log filtered encounters
fn(state => {
  const { data, index, response, references, patientUuids, ...next } = state;

  console.log(next.encounters.length, '# of new encounters to sync to dhis2');
  return next;
});
