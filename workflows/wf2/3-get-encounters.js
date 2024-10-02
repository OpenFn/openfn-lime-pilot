const formUuids = [
  '82db23a1-4eb1-3f3c-bb65-b7ebfe95b19b',
  '6a3e1e0e-dd13-3465-b8f5-ee2d42691fe5',
  'be8c12f9-e6fd-369a-9bc7-46a191866f15',
  '48577ac5-d9c0-3000-9bac-075409b38336',
  'ee6b1b06-3163-334a-8538-be69250af727',
];
// Fetch patient encounters then filter by cursor date
// OpenMRS demo instance does not support querying ALL records (q=all)
each(
  '$.patientUuids[*]',
  getEncounters({ patient: $.data, v: 'full' }, state => {
    const patientUuid = state.references.at(-1);
    const filteredEncounters = formUuids.map(formUuid =>
      state.data.results.filter(
        encounter =>
          encounter.encounterDatetime >= state.cursor &&
          encounter?.form?.uuid === formUuid
      )
    );

    state.encounters ??= [];
    state.encounters.push(
      filteredEncounters.map(encounters => encounters[0]).filter(e => e)
    );

    console.log(
      filteredEncounters.flat().length,
      `# of filtered encounters found in OMRS for ${patientUuid}`
    );

    return state;
  })
);

// Log filtered encounters
fn(state => {
  const {
    data,
    index,
    response,
    encounters,
    references,
    patientUuids,
    ...next
  } = state;
  next.encounters = encounters.flat();
  console.log(next.encounters.length, '# of new encounters to sync to dhis2');

  return next;
});
