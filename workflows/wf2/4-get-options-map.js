// state.mhgapClosure = { //Waiting on form
//   yUT7HyjWurN: 'encounter-date', // encounterDate
// };
get(
  'https://raw.githubusercontent.com/OpenFn/openfn-lime-pilot/refs/heads/main/metadata/metadata_mapping.json'
);

fn(state => {
  const {
    optionSets,
    f01MhpssBaseline,
    f02MhpssFollowUp,
    f03MhgapBaseline,
    f04MhgapFollowUp,
    f05MhpssClosure,
  } = JSON.parse(state.data);

  return {
    optionSets,
    mhpssMap: f01MhpssBaseline,
    mhpssFollowup: f02MhpssFollowUp,
    mhgapMap: f03MhgapBaseline,
    mhgapFollowup: f04MhgapFollowUp,
    mhpssClosure: f05MhpssClosure,
  };
});

fn(state => {
  const {
    mhpssMap,
    mhgapMap,
    mhpssFollowup,
    mhgapFollowup,
    mhpssClosure,
    ...next
  } = state;
  next.formMaps = {
    '6a3e1e0e-dd13-3465-b8f5-ee2d42691fe5': {
      //formName: mhpss baseline
      programStage: 'MdTtRixaC1B',
      dataValueMap: mhpssMap,
    },
    '82db23a1-4eb1-3f3c-bb65-b7ebfe95b19b': {
      ////formName: mhgap baseline
      programStage: 'EZJ9FsNau7Q',
      dataValueMap: mhgapMap,
    },
    'be8c12f9-e6fd-369a-9bc7-46a191866f15': {
      //formName: mhpss followup
      programStage: 'eUCtSH80vMe',
      dataValueMap: mhpssFollowup,
    },
    '48577ac5-d9c0-3000-9bac-075409b38336': {
      //formName: mhgap followup
      programStage: 'hjHwYnSfJnX',
      dataValueMap: mhgapFollowup,
    },
    'ee6b1b06-3163-334a-8538-be69250af727': {
      //formName: mhpss closure
      programStage: 'xrCTheIzyDV',
      dataValueMap: mhpssClosure,
    },
  };
  return next;
});
