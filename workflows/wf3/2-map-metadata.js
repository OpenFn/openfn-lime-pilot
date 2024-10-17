const isValidValue = value => value !== '' && value !== 'NA';

fn(state => {
  const { f01MphssBaselineXls } = state;
  const keys = f01MphssBaselineXls[1];

  const mphssBaselineXls = f01MphssBaselineXls.slice(2).map(item => {
    const obj = item.reduce((acc, value, idx) => {
      acc[keys[idx]] = value;
      return acc;
    }, {});

    return obj;
  });

  state.f01MphssBaseline = mphssBaselineXls
    .filter(
      o =>
        isValidValue(o['External ID']) && isValidValue(o['DHIS2 DE full name'])
    )
    .map(o => {
      return {
        'value.display - Answers': o['Answers'],
        'value.uuid - External ID': o['External ID'],
        'DHIS2 DE full name': o['DHIS2 DE full name'],
        'DHIS2 DE UID': o['DHIS2 DE UID'],
        'OptionSet name': o['OptionSet name'],
        'DHIS2 Option Set UID': o['DHIS2 Option Set name'],
        'DHIS2 Option name': o['DHIS2 Option name'],
        'DHIS2 Option UID': o['DHIS2 Option UID'],
        'DHIS2 Option Code': o['DHIS2 Option code'],
      };
    });

  return state;
});

fn(state => {
  const { optionSetsXlsData } = state;
  const keys = optionSetsXlsData[1];

  const optsMap = optionSetsXlsData.slice(2).map(item => {
    const obj = item.reduce((acc, value, idx) => {
      acc[keys[idx]] = value;
      return acc;
    }, {});

    return obj;
  });

  state.optionSets = optsMap
    .filter(
      o => isValidValue(o['External ID']) && isValidValue(o['DHIS2 DE UID'])
    )
    .reduce((acc, value) => {
      acc[value['DHIS2 DE UID']] = value['External ID'];
      return acc;
    }, {});
  return state;
});

fn(({ optionSets, f01MphssBaseline }) => ({ optionSets, f01MphssBaseline }));
