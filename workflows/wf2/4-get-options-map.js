get(
  'https://gist.githubusercontent.com/aleksa-krolls/2f309595110239cfcc8251017cf11592/raw/79bb85933038f305f19b77ace8d807e8e1751ac6/msf_wf2_optionsMap.json'
); //ak's gist

fn(state => {
  state.optsMap = JSON.parse(state.data);
  // console.log(JSON.stringify(state.optsMap, null, 2), 'Options Map');
  delete state.data;
  delete state.references;
  delete state.response;
  return state;
});

fn(state => {
  state.mhpssMap = {
    CXS4qAJH2qD: 'encounter-date', //encounterDate
    dfdv3SkeXKe: 'a6c5188c-29f0-4d3d-8cf5-7852998df86f', //Has the patient attempted suicide or tried to kill themselves?
    hWMBCCA2yy1: 'abede172-ba87-4ebe-8054-3afadb181ea3', //Is the patient currently at risk of hurting himself/herself or attempting suicide?
    TWuCY5r2wx7: 'ccc4f06c-b76a-440d-9b7e-c48ba2c4a0ab', //Is the patient currently at risk of hurting others?
    QHrIUMhjZlO: 'd516de07-979b-411c-b7e4-bd09cf7d9d91', //Does the patient regularly use alcohol / substances to become intoxicated?
    H1fMCaOzr8F: '3e97c2d0-15c1-4cfd-884f-7a4721079217', //Has the patient experienced an act of aggression or violence?
    yCwuZ0htrlH: '5f6e245c-83fc-421b-8d46-061ac773ae71', //Follow up session required?
    RiiH9A53rvG: '6d3876be-0a27-466d-ad58-92edcc8c31fb', //Referral done
    OZViJk8FPVd: 'c2664992-8a5a-4a6d-9238-5df591307d55', //Has the patient had thoughts of death or suicide?
    qgfKPlIHjcD: 'd8c84af2-bd9b-4bf3-a815-81652cb0b0bc', //Patient experienced an act of aggression or violence - What type(s) of violence?
    rSIazMFEBjD: '4dae5b12-070f-4153-b1ca-fbec906106e1', //Admission type
    KSBMR1BDGwx: '1a8bf24f-4f36-4971-aad9-ae77f3525738', //Type of consultation
    WDY6MkQWyHb: '722dd83a-c1cf-48ad-ac99-45ac131ccc96', //Consultation done by
    AuDPJg6gZE7: '82978311-bef9-46f9-9a9a-cc62254b00a6', //Location of intervention
    KeyiEPc4pII: '82978311-bef9-46f9-9a9a-cc62254b00a6', //Type of intervention
    qfYPXP76j8g: 'c3c86c1b-07be-4506-ab25-8f35f4389b19', //Patient referred by
    PCGI7EnvCQS: '45b39cbf-0fb2-4682-8544-8aaf3e07a744', //Current symptoms or complaints 1
    RnbiVrrSFdm: 'ee1b7973-e931-494e-a9cb-22b814b4d8ed', //Current symptoms or complaints 2
    CUdI1BJ5W8G: '92a92f62-3ff6-4944-9ea9-a7af23949bad', //Current symptoms or complaints 3
    YfcNA5bvkxT: '9a8204ca-d908-4157-9285-7c970dbb5287', //Main category of symptoms
    vC3bg9NwJ78: '3edcfddb-7988-4ce5-97a0-d4c46b267a04', //Duration of the main symptom
    RqsvaPH9vHt: '22809b19-54ca-4d88-8d26-9577637c184e', //Clinical diagnosis
    qacGXlyyQOS: 'a1a75011-0fef-460a-b666-dda2d171f39b', //CGI-S score
    S22iy8o0iLg: 'aae000c3-5242-4e3c-bd1f-7e922a6d3d34', //Patient experienced an act of aggression or violence - Time between violence event and consultation
    v0qFX0qv1tX: 'd5e3d927-f7ce-4fdd-ac4e-6ad0b510b608', //Main past or precipitating events - 1
    SsQqwDBGxjh: '54a9b20e-bce5-4d4a-8c9c-e0248a182586', //Main past or precipitating events - 2
    FLIlRjAwn4G: 'e0d4e006-85b5-41cb-8a21-e013b1978b8b', //Main past or precipitating events - 3
    JUabDHhT1wJ: 'c1a3ed2d-6d9a-453d-9d93-749164a76413', //Main category of precipitating event
    DlqJSA5VApl: '8fb3bb7d-c935-4b57-8444-1b953470e109', //Type of referral
    DMaLm9u4GCq: 'b87a93ff-a4a1-4601-b35d-1e42bfa7e194', //Total number of beneficiaries in family consultation
    CLGnlnFqqnk: '0a0c70d2-2ba5-4cb3-941f-b4a9a4a7ec6d', //Location of intervention - If Health Facility, specify
    f64XCwzJW02: '41e68dee-a2a3-4e6c-9d96-53def5caff52', //Location of intervention - If MSF Health Facility, specify
    YeaUNruqmca: '08cd4b4a-4b0b-4391-987b-b5b3d770d30f', //Location of intervention - If Mobile Clinic, specify
    KjgDauY9v4J: 'e08d532b-e56c-43dc-b831-af705654d2dc', //Location of intervention - If other, specify
    pj5hIE6iyAR: 'e08d532b-e56c-43dc-b831-af705654d2dc', //Current symptoms or complaints - If other, specify
    pj5hIE6iyAR: 'e08d532b-e56c-43dc-b831-af705654d2dc', //Current symptoms or complaints - If other, specify
    W7cPAi8iXLZ: '819f79e7-b9af-4afd-85d4-2ab677223113', //Clinical diagnosis - If other, specify
    MF3RML0HLbP: 'b2c5b6e0-66f0-4b9d-8576-b6f48e0a06df', //MHOS score
    m8qis4iUOTo: '790b41ce-e1e7-11e8-b02f-0242ac130002', //Past / Precipitating Events - If other, specify
    pN4iQH4AEzk: '722dd83a-c1cf-48ad-ac99-45ac131ccc96', //Consultation done by //TODO: Return BOOLEAN
    tsFOVnlc6lz: '5f3d618e-5c89-43bd-8c79-07e4e98c2f23', //PHQ9 Score
    //qptKDiv9uPl: 'ec42d68d-3e23-43de-b8c5-a03bb538e7c7', //Sex //TODO: Remove TEA?
    //sGEOde9q9p9: '0a0c70d2-2ba5-4cb3-941f-b4a9a4a7ec6d', //Location of intervention - If Health Facility, specify //should be?
  };

  state.mhgapMap = {
    I7phgLmRWQq: 'encounter-date', //encounterDate
    f6FhkzfZ5j3: '4dae5b12-070f-4153-b1ca-fbec906106e1', //Admission type
    R3g94vJ2yFR: '22809b19-54ca-4d88-8d26-9577637c184e', //Clinical diagnosis
    Yt4NhxZU5Vo: '819f79e7-b9af-4afd-85d4-2ab677223113', //Clinical diagnosis - If other, specify
    pHoZYTrR7N0: '2be92591-da1b-4418-ba49-43b3fc0e4ce5', //Pregnant / breastfeeding
    hMcCdEkhhjZ: 'f6cefc80-506a-44b0-ab5f-d6f5908cf7a5', //Child / adolescent
    VnXwFYqHNqM: '15748787-7372-4022-b5d4-81ff8d6887ca', //Older adult
    xRuC0NQRqZk: '99a8b512-17f9-4a5d-9fd4-80c27500995b', //Patient already on psychotropic / psychiatric medication (not prescribed by MSF)?
    DCEJHFQvPWa: '5f3d618e-5c89-43bd-8c79-07e4e98c2f23', //PHQ-9 score
    TZGKlSVIsN8: '5f6e245c-83fc-421b-8d46-061ac773ae71', //Follow-up required
  };

  state.mhpssFollowup = {
    yUT7HyjWurN: 'encounter-date', // encounterDate
    CcA8pc2YqWz: 'd9454e9c-6e3c-45ab-8a9a-834a9353ae11', //Session number
    d8Dok4D8Fl4: '1a8bf24f-4f36-4971-aad9-ae77f3525738', //Type of consultation
    E7MVMTTdvPi: 'b87a93ff-a4a1-4601-b35d-1e42bfa7e194', //Total number of beneficiaries in family consultation
    aCTIvKSNndK: '722dd83a-c1cf-48ad-ac99-45ac131ccc96', //Consultation done by
    UlSJrSD78HS: '82978311-bef9-46f9-9a9a-cc62254b00a6', //Location of intervention
    sGEOde9q9p9: '0a0c70d2-2ba5-4cb3-941f-b4a9a4a7ec6d', //Location of intervention - If Health Facility, specify //should be?
    LCdm2xe86ln: '41e68dee-a2a3-4e6c-9d96-53def5caff52', //Location of intervention - If MSF Health Facility, specify
    rGS6S4jyKu3: '08cd4b4a-4b0b-4391-987b-b5b3d770d30f', //Location of intervention - If Mobile Clinic, specify
    L6Jj7Tppr5q: 'e08d532b-e56c-43dc-b831-af705654d2dc', //Location of intervention - If other, specify
    vWWl7izQpqd: '82978311-bef9-46f9-9a9a-cc62254b00a6', //Type of intervention
    G0hLyxqgcO7: '54e8c1b6-6397-4822-89a4-cf81fbc68ce9', //The patient did not come
    tloy0Bd9qDf: 'd7410cd3-29be-4f8b-93d6-eb4de005db29', //Number of appointments missed
    AZUFlZzPN6V: '278d3d1e-c02a-4db1-8ab3-8db3b82eb9b5', //Patient rescheduled
    HNZHetAtowR: 'd34d5e93-03d6-494e-8f4c-2d7221227162', //Reason for missed appointment
    t4HoHWCYdvm: '790b41ce-e1e7-11e8-b02f-0242ac130002', //Reason for missed appointment - If other, specify
    C5XtlggtVmd: 'a1a75011-0fef-460a-b666-dda2d171f39b', //CGI-S score
    yTFUtaFJ1QU: 'f94de17e-9771-4711-aabb-c5bb0c022be2', //CGI-I score
    F6q03Gan7Ro: '22809b19-54ca-4d88-8d26-9577637c184e', //Clinical diagnosis
    OeA71vAyGZV: '819f79e7-b9af-4afd-85d4-2ab677223113', //Clinical diagnosis - If other, specify
    piKsOVnFIXO: 'a6c5188c-29f0-4d3d-8cf5-7852998df86f', //Has the patient attempted suicide or tried to kill themselves?
    llBTRwwM94C: 'abede172-ba87-4ebe-8054-3afadb181ea3', //Is the patient currently at risk of hurting himself/herself or attempting suicide?
    j8IYwKvxK4q: 'ccc4f06c-b76a-440d-9b7e-c48ba2c4a0ab', //Is the patient currently at risk of hurting others?
    Lw2Kkl2y6mj: 'd516de07-979b-411c-b7e4-bd09cf7d9d91', //Does the patient regularly use alcohol / substances to become intoxicated?
    a9J7luvOwhF: '3e97c2d0-15c1-4cfd-884f-7a4721079217', //Has the patient experienced an act of aggression or violence?
    EM4ouSS9Kxe: 'd8c84af2-bd9b-4bf3-a815-81652cb0b0bc', //Patient experienced an act of aggression or violence - What type(s) of violence?
    KjOAmUFJJgs: 'aae000c3-5242-4e3c-bd1f-7e922a6d3d34', //Patient experienced an act of aggression or violence - Time between violence event and consultation
    GVTXoz0VrAd: '5f6e245c-83fc-421b-8d46-061ac773ae71', //Follow up session required?
    N6GYmCjAhfh: '6d3876be-0a27-466d-ad58-92edcc8c31fb', //Referral done
    wvVn2LfmNDO: '8fb3bb7d-c935-4b57-8444-1b953470e109', //Type of referral
    //DEs not added to program stage
    //MF3RML0HLbP: 'b2c5b6e0-66f0-4b9d-8576-b6f48e0a06df', //MHOS score
    //tsFOVnlc6lz: '5f3d618e-5c89-43bd-8c79-07e4e98c2f23', //PHQ-9 score
    //OZViJk8FPVd: 'c2664992-8a5a-4a6d-9238-5df591307d55', //Has the patient had thoughts of death or suicide?
  };
  return state;
});
