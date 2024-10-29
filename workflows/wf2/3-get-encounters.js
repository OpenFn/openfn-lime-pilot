// Fetch patient encounters then filter by cursor date
// OpenMRS demo instance does not support querying ALL records (q=all)
each(
  '$.patientUuids[*]',
  getEncounters({ patient: $.data, v: 'full' }, state => {
    const patientUuid = state.references.at(-1);
    const filteredEncounters = state.formUuids.map(formUuid =>
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
