fn(state => {
  if (state.newPatientUuid.length === 0) {
    console.log('No data fetched in step prior to sync.');
  }

  console.log(
    'newPatientUuid ::',
    JSON.stringify(state.newPatientUuid, null, 2)
  );
  return state;
});

// Update TEI on DHIS2
each(
  $.newPatientUuid,
  upsert(
    'trackedEntityInstances',
    {
      ou: $.orgUnit,
      program: $.program,
      filter: [`${$.dhis2PatientNumber}:Eq:${$.data.patient_number}`],
    },
    {
      orgUnit: $.orgUnit,
      program: $.program,
      trackedEntityType: 'cHlzCA2MuEF',
      attributes: [
        {
          attribute: `${$.dhis2PatientNumberAttributeId}`,
          value: `${$.data.patient_number}`,
        }, //DHIS2 patient number to use as lookup key
        { attribute: 'AYbfTPYMNJH', value: `${$.data.patient.uuid}` }, //OMRS patient uuid
        {
          attribute: `${$.openmrsAutoIdAttributeId}`,
          value: `${$.data.patient.identifier[0].identifier}`,
        }, //id generated in wf1-2 e.g., "IQ146-24-000-027"
      ],
    }
  )
);
