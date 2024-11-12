const isValidValue = value => value !== '' && value !== 'NA';

const mapArrayToObject = (item, keys) => {
  return item.reduce((acc, value, idx) => {
    acc[keys[idx]] = value;
    return acc;
  }, {});
};

const safeKeyValuePairs = arr => {
  if (arr === null || arr === undefined) {
    return arr;
  }
  const mappedArr = arr.slice(2).map(item => mapArrayToObject(item, arr[1]));
  try {
    return mappedArr
      .filter(
        o => isValidValue(o['External ID']) && isValidValue(o['DHIS2 DE UID'])
      )
      .reduce((acc, value) => {
        acc[value['DHIS2 DE UID']] = value['External ID'];
        return acc;
      }, {});
  } catch (error) {
    console.error(`Error processing ${arr}:`, error);
    return arr; // Return original value if processing fails
  }
};

//New OptionSet Mappping
const questionKeyValuePairs = arr => {
  if (arr === null || arr === undefined) {
    return arr;
  }
  const mappedArr = arr.slice(2).map(item => mapArrayToObject(item, arr[1]));
  try {
    return mappedArr
      .filter(
        o => isValidValue(o['External ID']) && isValidValue(o['DHIS2 Option Set UID'])
      )
      .reduce((acc, value) => {
        acc[value['DHIS2 Option Set UID']] = value['External ID'];
        return acc;
      }, {});
  } catch (error) {
    console.error(`Error processing ${arr}:`, error);
    return arr; // Return original value if processing fails
  }
};


// //=== NEW section to create Uid for DHIS2 answers =====//
// const answerKeyPairs = arr => {
//   if (arr === null || arr === undefined) {
//     return arr;
//   }
//   const mappedArr = arr.slice(2).map(item => mapArrayToObject(item, arr[1]));
//   try {
//     return mappedArr
//       .filter(
//         o => isValidValue(o['External ID']) && isValidValue(o['DHIS2 DE UID'])
//       )
//       .reduce((acc, value) => {
//         //find the OptionSetUid --> this will return empty string if not an option question
//         const optionSetUid = value['DHIS2 Option Set UID']=='NA' ? '' : value['DHIS2 Option Set UID']; 
//         ////then build an answerKeyUid = DEuid + OptionSetUid
//         //const answerKeyUid = `${value['DHIS2 DE UID']}${optionSetUid}`; 
//         const answerKeyUid = `${value['DHIS2 DE UID']}${optionSetUid}`; 
        
//         //map omrs Concept Uid to dhis2 answerKeyUid
//         //acc[answerKeyUid] = value['External ID']; //OLD
//         acc[optionSetUid] = value['External ID']; //NEW to match on optionSetUid

//         return acc;
//       }, {});
//   } catch (error) {
//     console.error(`Error processing ${arr}:`, error);
//     return arr; // Return original value if processing fails
//   }
// };
//=====================//

fn(state => {
  const { OptionSets, identifiers } = state;
  const keys = OptionSets[1];

  state.optsMap = OptionSets.slice(2)
    .map(item => mapArrayToObject(item, keys))
    .filter(
      o =>
        (isValidValue(o['External ID']) &&
          isValidValue(o['DHIS2 DE full name'])) ||
        (isValidValue(o['value.display - Answers']) &&
          isValidValue(o['DHIS2 Option code']))
    )
    .map(o => {
       const optionSetUid = o['DHIS2 Option Set UID']=='NA' ? '' : `-${o['DHIS2 Option Set UID']}`; 
        //then build an answerKeyUid = DEuid + OptionSetUid
      const answerKeyUid = `${o['DHIS2 DE UID']}${optionSetUid}`; 

      return {
        'DHIS2 Option Set UID': o['DHIS2 Option Set UID'],
        'DHIS2 Option name': o['DHIS2 Option name'],
        'DHIS2 Option UID': o['DHIS2 Option UID'],
        'DHIS2 Option Code': o['DHIS2 Option code'],
        'value.display - Answers': o['Answers'],
        'value.uuid - External ID': o['External ID'],
        'DHIS2 answerKeyUid': answerKeyUid,
        'DHIS2 DE full name': o['DHIS2 DE full name'],
        'DHIS2 DE UID': o['DHIS2 DE UID'],
        'OptionSet name': o['OptionSet name'],
        'DHIS2 Option Set name': o['DHIS2 Option Set name'],
      };
    });

  const [iheaders, ...irows] = identifiers;
  state.identifiers = irows
    .map(row =>
      row.reduce((obj, value, index) => {
        if (value != null && value !== '') {
          obj[iheaders[index]] = value;
        }
        return obj;
      }, {})
    )
    .filter(obj => Object.keys(obj).length > 0);
  return state;
});


fn(state => {
  const { formMetadata, optsMap, identifiers } = state;

  const formMaps = formMetadata.reduce((acc, form) => {
    const formName = form['OMRS form sheet name'];
    acc[form['OMRS form.uuid']] = {
      formName,
      orgUnit: form['DHIS2 orgUnit ID'],
      programId: form['DHIS2 program ID'],
      programStage: form['DHIS2 programStage ID'],
      dataValueMap: safeKeyValuePairs(state[formName]),
      optionSetMap: questionKeyValuePairs(state[formName]),
      // optionKey_dhis2_omrs: answerKeyPairs(state[formName]),
      // optionKey_omrs_dhis2: Object.fromEntries(
      //   Object.entries(answerKeyPairs(state[formName])).map(([key, value]) => [value, key])
      // )
    };

    return acc;
  }, {});

  //create master optionSetKey to map omrs concept Uids to their unique DHIS2 optionset + dataElement combos
  const optionSetKey =Object.values(formMaps).reduce((acc, form) => {
    return { ...acc, ...form.optionSetMap };
  }, {});

  return { formMaps, formMetadata, optsMap, optionSetKey, identifiers };
});
