const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

each(
  '$.encounters[*]',
  get(
    'tracker/trackedEntities',
    {
      orgUnit: 'OPjuJMZFLop',
      program: 'w9MSPn5oSqp',
      filter: [`AYbfTPYMNJH:Eq:${$.data.patient.uuid}`],
      fields: '*',
    },
    {},
    async state => {
      const encounter = state.references.at(-1);
      console.log(encounter.patient.uuid, 'Encounter patient uuid');

      const { trackedEntity, enrollments } = state.data?.instances?.[0] || {};
      if (trackedEntity && enrollments) {
        state.TEIs ??= {};
        state.TEIs[encounter.patient.uuid] = {
          trackedEntity,
          enrollment: enrollments[0]?.enrollment,
        };
      }

      await delay(2000);
      return state;
    }
  )
);
