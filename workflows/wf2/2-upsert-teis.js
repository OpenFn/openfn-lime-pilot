const buildPatientsUpsert = (state, patient, isNewPatient) => {
  const { placeOflivingMap, genderOptions } = state;
  const DHIS2_PATIENT_NUMBER = state.identifiers.find(
    i => i.type === 'DHIS2_PATIENT_NUMBER'
  )?.['omrs identifierType']; //DHIS2 ID or DHIS2 Patient Number
  const OPENMRS_AUTO_ID = state.identifiers.find(
    i => i.type === 'OPENMRS_AUTO_ID'
  )?.['omrs identifierType']; //MSF ID or OpenMRS Patient Number
  const dateCreated = patient.auditInfo.dateCreated.substring(0, 10);
  const findIdentifierByUuid = (identifiers, targetUuid) =>
    identifiers.find(i => i.identifierType.uuid === targetUuid)?.identifier;

  const enrollments = [
    {
      orgUnit: 'OPjuJMZFLop',
      program: 'w9MSPn5oSqp',
      programStage: 'MdTtRixaC1B',
      enrollmentDate: dateCreated,
    },
  ];

  const findOptsUuid = uuid =>
    patient.person.attributes.find(a => a.attributeType.uuid === uuid)?.value
      ?.uuid;

  const findOptCode = optUuid =>
    state.optsMap.find(o => o['value.uuid - External ID'] === optUuid)?.[
      'DHIS2 Option Code'
    ];

  const patientMap = state.formMaps.patient.dataValueMap;
  const statusAttrMaps = Object.keys(patientMap).map(d => {
    const optUid = findOptsUuid(patientMap[d]);
    return {
      attribute: d,
      value: findOptCode(optUid),
    };
  });

  const payload = {
    query: {
      ou: 'OPjuJMZFLop',
      program: 'w9MSPn5oSqp',
      filter: [`AYbfTPYMNJH:Eq:${patient.uuid}`], //upsert on omrs.patient.uid
    },
    data: {
      program: 'w9MSPn5oSqp',
      orgUnit: 'OPjuJMZFLop',
      trackedEntityType: 'cHlzCA2MuEF',
      attributes: [
        {
          attribute: 'fa7uwpCKIwa',
          value: patient.person?.names[0]?.givenName,
        },
        {
          attribute: 'Jt9BhFZkvP2',
          value: patient.person?.names[0]?.familyName,
        },
        {
          attribute: 'P4wdYGkldeG', //DHIS2 ID ==> "Patient Number"
          value:
            findIdentifierByUuid(patient.identifiers, DHIS2_PATIENT_NUMBER) ||
            findIdentifierByUuid(patient.identifiers, OPENMRS_AUTO_ID), //map OMRS ID if no DHIS2 id
        },
        {
          attribute: 'ZBoxuExmxcZ', //MSF ID ==> "OpenMRS Patient Number"
          value: findIdentifierByUuid(patient.identifiers, OPENMRS_AUTO_ID),
        },
        {
          attribute: 'AYbfTPYMNJH', //"OpenMRS Patient UID"
          value: patient.uuid,
        },
        {
          attribute: 'qptKDiv9uPl',
          value: genderOptions[patient.person.gender],
        },
        {
          attribute: 'T1iX2NuPyqS',
          value: patient.person.age,
        },
        {
          attribute: 'WDp4nVor9Z7',
          value: patient.person.birthdate.slice(0, 10),
        },
        {
          attribute: 'rBtrjV1Mqkz', //Place of living
          value: placeOflivingMap[patient.person?.addresses[0]?.cityVillage],
        },
        ...statusAttrMaps,
      ],
    },
  };

  // TODO: AK do we need this log👇🏾?
  // console.log('mapped dhis2 payloads:: ', JSON.stringify(payload, null, 2));

  if (isNewPatient) {
    console.log('create enrollment');
    payload.data.enrollments = enrollments;
  }

  return payload;
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

each(
  $.patients,
  get(
    'tracker/trackedEntities',
    {
      orgUnit: 'OPjuJMZFLop',
      filter: [`AYbfTPYMNJH:Eq:${$.data?.uuid}`],
      program: 'w9MSPn5oSqp',
    },
    {},
    async state => {
      const patient = state.references.at(-1);
      console.log(patient.uuid, 'patient uuid');

      const isNewPatient = state.data.instances.length === 0;

      state.patientsUpsert ??= [];
      state.patientsUpsert.push(
        buildPatientsUpsert(state, patient, isNewPatient)
      );
      await delay(2000);
      return state;
    }
  )
);

// Upsert TEIs to DHIS2
each(
  $.patientsUpsert,
  upsert('trackedEntityInstances', $.data.query, state => {
    // Uncomment👇🏾 for inspecting input payload
    // console.log('Upserting', state.data.data);
    return state.data.data;
  })
);
fn(state => {
  const {
    data,
    response,
    references,
    patients,
    patientsUpsert,
    placeOflivingMap,
    genderOptions,
    identifiers,
    ...next
  } = state;

  next.patientUuids = patients.map(p => p.uuid);
  return next;
});
