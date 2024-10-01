//Here we define the date cursor
//$.cursor at beggining of the project 2023-05-20T06:01:24.000+0000
cursor($.lastRunDateTime || $.manualCursor || '2023-05-20T06:01:24.000+0000');
// Update the lastRunDateTime for the next run
cursor('today', {
  key: 'lastRunDateTime',
  format: c => dateFns.format(new Date(c), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
});

searchPatient({ q: 'IQ', v: 'full', limit: '100' });
//searchPatient({ q: 'Katrina', v: 'full', limit: '100' });
//Query all patients (q=all) not supported on demo OpenMRS; needs to be configured
//...so we query all Patients with name "Patient" instead

fn(state => {
  const { cursor, data, lastRunDateTime } = state;
  console.log('Filtering patients since:', cursor);

  const patients = data.results.filter(({ auditInfo }) => {
    const lastModified = auditInfo?.dateChanged || auditInfo?.dateCreated;
    return lastModified > cursor;
  });
  console.log('# of patients to sync to dhis2 ::', patients.length);
  console.log(
    'uuids of patients to sync to dhis2 ::',
    patients.map(p => p.uuid)
  );

  return { cursor, lastRunDateTime, patients };
});
