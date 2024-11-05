// Get teis that are "active" in the target program
get(
  'tracker/trackedEntities',
  {
    orgUnit: $.orgUnit, //'OPjuJMZFLop',
    program: $.program, //'w9MSPn5oSqp',
    programStatus: 'ACTIVE',
  },
  {},
  state => {
    const teis = state.data.instances.filter(
      tei => tei.updatedAt >= state.cursor
    );
    //for testing
    //.filter(tei => tei.createdAt > state.cursor) //for prod
    //.slice(0, 1); //to limit 1 for testing

    console.log(
      '# of TEIs found before filter ::',
      state.data.instances.length
    );
    console.log('# of TEIs to migrate to OMRS ::', teis.length);

    return {
      ...state,
      data: {},
      references: [],
      teis,
    };
  }
);
