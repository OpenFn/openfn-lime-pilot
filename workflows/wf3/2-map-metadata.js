const isValidValue = value => value !== '' && value !== 'NA';

const mapArrayToObject = (item, keys) => {
  return item.reduce((acc, value, idx) => {
    acc[keys[idx]] = value;
    return acc;
  }, {});
};
fn(state => {
  const { optionsets } = state;
  const keys = optionsets[1];

  const optsMap = optionsets.slice(2).map(item => mapArrayToObject(item, keys));

  state.optionSets = optsMap
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
  const { f01MhpssBaseline } = state;
  const keys = f01MhpssBaseline[1];

  const mphssBaselineXls = f01MhpssBaseline
    .slice(2)
    .map(item => mapArrayToObject(item, keys));

  state.f01MhpssBaseline = mphssBaselineXls
    .filter(
      o => isValidValue(o['External ID']) && isValidValue(o['DHIS2 DE UID'])
    )
    .reduce((acc, value) => {
      acc[value['DHIS2 DE UID']] = value['External ID'];
      return acc;
    }, {});
  return state;
});

fn(({ optionSets, f01MhpssBaseline }) => ({ optionSets, f01MhpssBaseline }));
