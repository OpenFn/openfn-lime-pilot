const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

each(
  $.encounters,
  get(
    'tracker/trackedEntities',
    {
      orgUnit: $.orgUnit,
      program: $.program,
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
          enrollments,
          enrollment: enrollments[0]?.enrollment,
        };
      }

      await delay(2000);
      return state;
    }
  )
);

const processAnswer = (
  answer,
  conceptUuid,
  dataElement,
  optsMap,
  optionSetKey
) => {
  // console.log('Has answer', conceptUuid, dataElement);
  return typeof answer.value === 'object'
    ? processObjectAnswer(
        answer,
        conceptUuid,
        dataElement,
        optsMap,
        optionSetKey
      )
    : processOtherAnswer(answer, conceptUuid, dataElement);
};

const processObjectAnswer = (
  answer,
  conceptUuid,
  dataElement,
  optsMap,
  optionSetKey
) => {
  if (isDiagnosisByPsychologist(conceptUuid, dataElement)) {
    return '' + answer.value.uuid === '278401ee-3d6f-4c65-9455-f1c16d0a7a98';
  }
  return findMatchingOption(answer, optsMap, optionSetKey);
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

const findMatchingOption = (answer, optsMap, optionSetKey) => {
  const optionKey = `${answer.formUuid}-${answer.concept.uuid}`; 

  //const matchingOptionSet = optionSetKey[answer.concept.uuid];
  const matchingOptionSet = optionSetKey[optionKey];
  console.log('optionKey', optionKey);
  console.log('conceptUid', answer.concept.uuid);
  console.log('value uid', answer.value.uuid);
  console.log('value', answer.value.display);
  console.log('matchingOptionSet', matchingOptionSet);

  //const answerKey = answerMappingUid

  const matchingOption = optsMap.find(
    o =>
      o['value.uuid - External ID'] === answer.value.uuid &&
      o['DHIS2 Option Set UID'] === matchingOptionSet
  )?.['DHIS2 Option Code'] || answer.value.display; //TODO: revisit this logic if optionSet not found

  console.log('matchingOption value', matchingOption)

  //TBD if we want to keep thse --> TODO: Revisit this logic!
  if (matchingOption?.toLowerCase() === 'no') {
    console.log('FALSE option', matchingOption)
    return 'FALSE';
  }
  if (matchingOption?.toLowerCase() === 'yes') {
    console.log('TRUE option', matchingOption)
    return 'TRUE';
  }
  //=========================================//

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

const dataValuesMapping = (data, dataValueMap, optsMap, optionSetKey) => {
  return Object.keys(dataValueMap)
    .map(dataElement => {
      const conceptUuid = dataValueMap[dataElement];
      const obsAnswer = data.obs.find(o => o.concept.uuid === conceptUuid);
      const answer = {
        ...obsAnswer,
        formUuid: data.form.uuid
      };
      const value = answer
        ? processAnswer(answer, conceptUuid, dataElement, optsMap, optionSetKey)
        : processNoAnswer(data, conceptUuid, dataElement);

      return { dataElement, value };
    })
    .filter(d => d);
};

// Prepare DHIS2 data model for create events
fn(state => {
  const createEvent = (data, state) => {
    const { trackedEntity, enrollment } = state.TEIs[data.patient.uuid] || {};

    if (!trackedEntity || !enrollment) {
      return null;
    }

    return {
      program: state.program,
      orgUnit: state.orgUnit,
      trackedEntity,
      enrollment,
      occurredAt: data.encounterDatetime.replace('+0000', ''),
    };
  };

  const handleMissingRecord = (data, state) => {
    const { uuid, display } = data.patient;

    console.log(uuid, 'Patient is missing trackedEntity && enrollment');

    state.missingRecords ??= {};
    state.missingRecords[uuid] ??= {
      encounters: [],
      patient: display,
    };

    state.missingRecords[uuid].encounters.push(data);
  };

  const processEncounter = (data, state) => {
    const event = createEvent(data, state);
    if (!event) {
      handleMissingRecord(data, state);
      return null;
    }

    const form = state.formMaps[data.form.uuid];
    if (!form?.dataValueMap) {
      return null;
    }

    return {
      ...event,
      programStage: form.programStage,
      dataValues: dataValuesMapping(
        data,
        form.dataValueMap,
        state.optsMap,
        state.optionSetKey
      ),
    };
  };

  state.encountersMapping = state.encounters
    .map(data => processEncounter(data, state))
    .filter(Boolean);

  return state;
});
// const findMatchingOption = (answer, optsMap, optionSetKey) => {
//   const answerKeyUid = optionSetKey[answer.concept.uuid];

//   const matchingOption = optsMap.find(
//     (o) => o["DHIS2 answerKeyUid"] === answerKeyUid
//   )?.["DHIS2 Option Code"];

//   //TBD if we want this.. TODO: revisit this logic
//   if (matchingOption === "no") {
//     return "FALSE";
//   }
//   if (matchingOption === "yes") {
//     return "TRUE";
//   }
//   //======//
//   return matchingOption || "";
// };

//=== Original logic modified on Nov 11 =========//
// const findMatchingOption = (answer, optsMap) => {
//   const matchingOption = optsMap.find(
//     o => o['value.uuid - External ID'] === answer.value.uuid
//   )?.['DHIS2 Option Code'];

//   if (matchingOption === 'no') {
//     return 'FALSE';
//   }
//   if (matchingOption === 'yes') {
//     return 'TRUE';
//   }
//   return matchingOption || '';
// };
