const processAnswer = (answer, conceptUuid, dataElement, optsMap) => {
  if (typeof answer.value === 'object') {
    return processObjectAnswer(answer.value, conceptUuid, dataElement, optsMap);
  } else {
    return processOtherAnswer(answer.value, conceptUuid, dataElement);
  }
};

const processObjectAnswer = (
  answerValue,
  conceptUuid,
  dataElement,
  optsMap
) => {
  const matchingOption = optsMap.find(
    o => o['value.uuid - External ID'] === answerValue.uuid
  );
  switch (true) {
    case isDiagnosisByPsychologist(answerValue.uuid, conceptUuid, dataElement):
      return 'TRUE';

    case matchingOption && Object.keys(matchingOption).length > 0:
      return matchingOption['DHIS2 Option Code'];
  }
};
const processOtherAnswer = (answerValue, conceptUuid, dataElement) => {
  switch (true) {
    case isPhq9Score(answerValue, conceptUuid, dataElement):
      return getRangePhq(answerValue);

    default:
      return answerValue;
  }
};

const isDiagnosisByPsychologist = (uuid, conceptUuid, dataElement) =>
  uuid === '278401ee-3d6f-4c65-9455-f1c16d0a7a98' &&
  conceptUuid === '722dd83a-c1cf-48ad-ac99-45ac131ccc96' &&
  dataElement === 'pN4iQH4AEzk';

const isPhq9Score = (value, conceptUuid, dataElement) =>
  typeof value === 'number' &&
  conceptUuid === '5f3d618e-5c89-43bd-8c79-07e4e98c2f23' &&
  dataElement === 'tsFOVnlc6lz';

const getRangePhq = input => {
  switch (true) {
    case input >= 0 && input <= 4:
      return '0_4';
    case input >= 5 && input <= 9:
      return '5_9';
    case input >= 10 && input <= 14:
      return '10_14';
    case input >= 15 && input <= 19:
      return '15_19';
    case input >= 20:
      return '>20';
  }
};

const dataValuesMapping = (data, dataValueMap, optsMap) => {
  return Object.keys(dataValueMap)
    .map(dataElement => {
      let value;
      const conceptUuid = dataValueMap[dataElement];
      const answer = data.obs.find(o => o.concept.uuid === conceptUuid);

      answer
        ? (value = processAnswer(answer, conceptUuid, dataElement, optsMap))
        : (value = '');

      return { dataElement, value };
    })
    .filter(d => d);
};

fn(state => {
  const { mhpssFollowup, mhpssMap, mhgapMap } = state;

  state.formMaps = {
    '82db23a1-4eb1-3f3c-bb65-b7ebfe95b19b': {
      //mhgap baseline*
      programStage: 'EZJ9FsNau7Q',
      dataValueMap: mhgapMap,
    },
    '6a3e1e0e-dd13-3465-b8f5-ee2d42691fe5': {
      programStage: 'MdTtRixaC1B',
      dataValueMap: mhpssMap,
    },
    'be8c12f9-e6fd-369a-9bc7-46a191866f15': {
      programStage: 'eUCtSH80vMe',
      dataValueMap: mhpssFollowup,
    },
  };
  return state;
});

// Prepare DHIS2 data model for create events
fn(state => {
  const optsMap = JSON.parse(state.optsMap);

  function getRangePhq(input) {
    if (typeof input !== 'number' || isNaN(input)) {
      return '';
    }

    switch (true) {
      case input >= 0 && input <= 4:
        return '0_4';
      case input >= 5 && input <= 9:
        return '5_9';
      case input >= 10 && input <= 14:
        return '10_14';
      case input >= 15 && input <= 19:
        return '15_19';
      case input >= 20:
        return '>20';
      default:
        return '';
    }
  }
  const dataValuesMapping = (data, formsMap) => {
    return Object.keys(formsMap)
      .map(k => {
        let value;
        const dataElement = k;
        const conceptUuid = mhpssMap[k];
        const answer = data.obs.find(o => o.concept.uuid === conceptUuid);

        if (answer) {
          if (typeof answer.value === 'object') {
            value = optsMap.find(
              o => o['value.uuid - External ID'] == answer?.value?.uuid
            )?.['DHIS2 Option Code']; //Changed from 'DHIS2 Option UID'
            if (
              //mapping: diagnosis done by psychologist

              conceptUuid === '722dd83a-c1cf-48ad-ac99-45ac131ccc96' &&
              dataElement === 'pN4iQH4AEzk'
            ) {
              if (
                answer.value.uuid === '278401ee-3d6f-4c65-9455-f1c16d0a7a98'
              ) {
                value = 'TRUE';
              } else {
                value = 'FALSE';
              }
            } else {
              value = optsMap.find(
                o => o['value.uuid - External ID'] == answer?.value?.uuid
              )?.['DHIS2 Option Code']; //Changed from 'DHIS2 Option UID'
              console.log(answer.value.uuid, {
                dataElement,
                value,
                conceptUuid,
              });
            }
          } else if (
            typeof answer.value === 'number' &&
            conceptUuid === '5f3d618e-5c89-43bd-8c79-07e4e98c2f23' &&
            dataElement === 'tsFOVnlc6lz' //mapping: phq9 score
          ) {
            value = getRangePhq(answer.value);
          } else if (!answer) {
            value = '';
          } else {
            value = answer.value;
          }
        }
        return { dataElement, value };
      })
      .filter(d => d);
  };

  state.encountersMapping = state.encounters.map(data => {
    const form = state.formMaps[data.form.uuid];
    const eventDate = data.encounterDatetime.replace('+0000', '');
    const { trackedEntityInstance, enrollment } = TEIs[data.patient.uuid];

    const event = {
      program: 'w9MSPn5oSqp',
      orgUnit: 'OPjuJMZFLop',
      trackedEntityInstance,
      enrollment,
      eventDate,
    };
    if (form) {
      return {
        ...event,
        programStage: form.programStage,
        dataValues: dataValuesMapping(data, form.dataValueMap, optsMap),
      };
    }
  });

  console.log(
    'dhis2 events to import:: ',
    JSON.stringify(state.encountersMapping, null, 2)
  );

  return state;
});

fn(
  ({
    data,
    references,
    optsMap,
    mhpssMap,
    mhgapMap,
    TEIs,
    mhpssFollowup,
    ...state
  }) => state
);

// Create events fore each encounter
// each(
//   '$.encountersMapping[*]',
//   create(
//     'events',
//     state => {
//       // console.log(state.data);
//       return state.data;
//     },
//     {
//       params: {
//         dataElementIdScheme: 'UID',
//       },
//     }
//   )
// );

// // Clean up state
// fn(({ data, references, ...state }) => state);
