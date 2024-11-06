fn(state => {
  const { optionSets, genderUpdated, TEIs } = state;
  const genderMap = optionSets
    .filter(o => o['DHIS2 DE UID'] === 'qptKDiv9uPl')
    .reduce((acc, obj) => {
      acc[obj['value.display - Answers']] = obj['DHIS2 Option Code'];
      return acc;
    }, {});

  state.teisToUpdate = genderUpdated.map(answer => {
    const { trackedEntity } = TEIs[answer.person.uuid];
    return {
      trackedEntity,
      program: state.program,
      orgUnit: state.orgUnit,
      trackedEntityType: 'cHlzCA2MuEF',
      attributes: [
        {
          attribute: 'qptKDiv9uPl', //gender
          value: genderMap[answer.value.display],
        },
        {
          attribute: 'AYbfTPYMNJH', //OpenMRS Patient UID to use to upsert TEI
          value: answer.person.uuid,
        },
      ],
    };
  });
  return state;
});

// Update TEIs
create(
  'tracker',
  { trackedEntities: $.teisToUpdate },
  { params: { async: false, importStrategy: 'UPDATE' } }
);
// Return only lastRunDateTime
fn(({ lastRunDateTime }) => ({ lastRunDateTime }));
