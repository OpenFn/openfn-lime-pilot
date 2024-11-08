const processAnswer = (answer, conceptUuid, dataElement, optsMap) => {
  // console.log('Has answer', conceptUuid, dataElement);
  return typeof answer.value === 'object'
    ? processObjectAnswer(answer, conceptUuid, dataElement, optsMap)
    : processOtherAnswer(answer, conceptUuid, dataElement);
};

const processObjectAnswer = (answer, conceptUuid, dataElement, optsMap) => {
  if (isDiagnosisByPsychologist(conceptUuid, dataElement)) {
    return '' + answer.value.uuid === '278401ee-3d6f-4c65-9455-f1c16d0a7a98';
  }
  return findMatchingOption(answer, optsMap);
};

const processOtherAnswer = (answer, conceptUuid, dataElement) => {
  if (isPhq9Score(answer.value, conceptUuid, dataElement)) {
    return getRangePhq(answer.value);
  }
  return answer.value;
};

const processNoAnswer = (data, conceptUuid, dataElement) => {
  // console.log('No answer', conceptUuid, dataElement);
  if (isEncounterDate(conceptUuid, dataElement)) {
    return data.encounterDatetime.replace('+0000', '');
  }
  return '';
};

const findMatchingOption = (answer, optsMap) => {
  const matchingOption = optsMap.find(
    o => o['value.uuid - External ID'] === answer.value.uuid
  )?.['DHIS2 Option Code'];

  return matchingOption || '';
};

const isEncounterDate = (conceptUuid, dataElement) => {
  return (
    conceptUuid === 'encounter-date' &&
    ['CXS4qAJH2qD', 'I7phgLmRWQq', 'yUT7HyjWurN'].includes(dataElement)
  );
};

const isDiagnosisByPsychologist = (conceptUuid, dataElement) =>
  conceptUuid === '722dd83a-c1cf-48ad-ac99-45ac131ccc96' &&
  dataElement === 'pN4iQH4AEzk';

const isPhq9Score = (value, conceptUuid, dataElement) =>
  typeof value === 'number' &&
  conceptUuid === '5f3d618e-5c89-43bd-8c79-07e4e98c2f23' &&
  dataElement === 'tsFOVnlc6lz';

const getRangePhq = input => {
  if (input >= 20) return '>20';
  if (input >= 15) return '15_19';
  if (input >= 10) return '10_14';
  if (input >= 5) return '5_9';
  return '0_4';
};

const dataValuesMapping = (data, dataValueMap, optsMap) => {
  return Object.keys(dataValueMap)
    .map(dataElement => {
      const conceptUuid = dataValueMap[dataElement];
      const answer = data.obs.find(o => o.concept.uuid === conceptUuid);
      const value = answer
        ? processAnswer(answer, conceptUuid, dataElement, optsMap)
        : processNoAnswer(data, conceptUuid, dataElement);

      return { dataElement, value };
    })
    .filter(d => d);
};

// Prepare DHIS2 data model for create events
fn(state => {
  state.encountersMapping = state.encounters
    .map(data => {
      const form = state.formMaps[data.form.uuid];
      const occurredAt = data.encounterDatetime.replace('+0000', '');
      const { trackedEntity, enrollment } = state.TEIs[data.patient.uuid] || {};

      const event = {
        program: state.program,
        orgUnit: state.orgUnit,
        trackedEntity,
        enrollment,
        occurredAt,
      };
      if (!form.dataValueMap) {
        console.log(data.patient);
      }
      if (form && form.dataValueMap) {
        return {
          ...event,
          programStage: form.programStage,
          dataValues: dataValuesMapping(data, form.dataValueMap, state.optsMap),
        };
      }
    })
    .filter(e => e);

  return state;
});

// Create events for each encounter
create(
  'tracker',
  {
    events: $.encountersMapping,
  },
  {
    params: {
      async: false,
      dataElementIdScheme: 'UID',
      importStrategy: 'CREATE_AND_UPDATE',
    },
  }
);

fn(state => {
  const latestGenderUpdate = state.encounters.reduce((acc, e) => {
    const answer = e.obs.find(
      o => o.concept.uuid === 'ec42d68d-3e23-43de-b8c5-a03bb538e7c7'
    );
    if (answer) {
      const personUuid = answer.person.uuid;
      if (
        !acc[personUuid] ||
        new Date(answer.obsDatetime) > new Date(acc[personUuid].obsDatetime)
      ) {
        acc[personUuid] = answer;
      }
    }
    return acc;
  }, {});

  state.genderUpdated = Object.values(latestGenderUpdate);

  return state;
});

// Return only lastRunDateTime
fnIf(
  state => state.genderUpdated.length === 0,
  ({ lastRunDateTime }) => ({ lastRunDateTime })
);
