get(
  'https://raw.githubusercontent.com/OpenFn/openfn-lime-pilot/refs/heads/next-staging/metadata/collections.json',
  { parseAs: 'json' },
  state => {
    const { cursor, lastRunDateTime, patients, data } = state;

    return {
      ...data,
      cursor,
      patients,
      lastRunDateTime,
    };
  }
);

// Validates if a string matches UUID v4 format
const isValidUUID = id => {
  if (!id || typeof id !== 'string') return false;

  const UUID_PATTERN =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return UUID_PATTERN.test(id);
};

fn(state => {
  const { formMetadata, ...rest } = state;
  const formUuids = formMetadata
    .filter(form => {
      const uuid = form['OMRS form.uuid'];
      return isValidUUID(uuid);
    })
    .map(form => form['OMRS form.uuid']);

  return {
    ...rest,
    formUuids,
  };
});

fn(state => {
  state.placeOflivingMap = {
    'Al Ayadya': 'lon42.423409_lat36.481517',
    'Al Bosaif': 'lon43.159987_lat36.27218',
    'Al Jazaer': 'lon43.164382_lat36.354178',
    'Al Karama': 'lon43.203229_lat36.341201',
    'Al Mothana': 'lon43.171821_lat36.37478',
    'Al Nabi Younis': 'lon43.165939_lat36.348147',
    'Al Qawsyat': 'lon43.103793_lat36.440127',
    'Al Rashedia': 'lon43.092499_lat36.405267',
    'Al Sahaji': 'lon42.94467_lat36.280869',
    'Al Salamya': 'lon43.314713_lat36.142365',
    'Al Shora': 'lon43.223899_lat35.994031',
    'Al Sokar': 'lon43.169151_lat36.389263',
    'Al Zahra': 'lon43.209061_lat36.384103',
    'Al-Abar': 'lon43.097359_lat36.337313',
    'Al-Adba': 'lon43.107228_lat36.228804',
    Alamel: 'lon43.095958_lat36.324676',
    'Al-Araby': 'lon43.116613_lat36.405873',
    Alathba: 'lon43.107062_lat36.228771',
    'Al-Auraiby': 'lon43.092403_lat36.35815',
    'Al-Baaj': 'lon41.715935_lat36.04154',
    'Al-Bakeer': 'lon43.2005_lat36.372429',
    'Al-Dandan': 'lon43.146081_lat36.33257',
    'Al-Ekhaa': 'lon43.216323_lat36.353175',
    'Al-Ektasadeen': 'lon43.086044_lat36.361673',
    'Al-Entesar': 'lon43.213825_lat36.326253',
    Aleslaah: 'lon43.082506_lat36.350517',
    'Al-Faroak': 'lon43.128901_lat36.337586',
    Alflah: 'lon43.183338_lat36.394155',
    Algosq: 'lon43.150265_lat36.327732',
    Algzlany: 'lon43.137129_lat36.320443',
    'Al-Hadbaa': 'lon43.15051_lat36.394474',
    Alhrmat: 'lon43.072674_lat36.362245',
    'Al-Humaidat': 'lon42.978138_lat36.403105',
    Aljazeera: 'lon42.268108_lat35.764664',
    'Al-Kadasia': 'lon43.200525_lat36.380719',
    'Al-Kuba': 'lon43.072704_lat36.410733',
    'Al-Ma`Mun': 'lon43.10664_lat36.310099',
    'Al-Maghrab': 'lon43.079798_lat36.334318',
    Almalayeen: 'lon43.103821_lat36.424167',
    'Al-Masarf': 'lon43.179613_lat36.38814',
    'Al-Matahen': 'lon43.09246_lat36.338635',
    Almnsoor: 'lon43.11188_lat36.318691',
    Almoaly: 'lon42.838777_lat36.324391',
    Almohalabya: 'lon42.703975_lat36.265162',
    Almshahda: 'lon43.120709_lat36.343216',
    'Al-Mualamin': 'lon42.923458_lat36.31039',
    Almuhandseen: 'lon43.137239_lat36.367498',
    Alngar: 'lon43.100449_lat36.357173',
    Alnuor: 'lon43.187796_lat36.365769',
    Alobor: 'lon43.059863_lat36.313292',
    Alquds: 'lon43.22851_lat36.344222',
    'Al-Qyaraa': 'lon43.29582_lat35.798215',
    Alresala: 'lon43.090091_lat36.322804',
    'Al-Rifa`I': 'lon43.102846_lat36.360217',
    'Al-Saaha': 'lon43.097854_lat36.34371',
    'Al-Sahaji': 'lon42.94396_lat36.280114',
    'Al-Samah': 'lon43.212253_lat36.35825',
    'Al-Sekak': 'lon43.100669_lat36.339441',
    'Al-Shefaa': 'lon43.121928_lat36.352',
    Alshohadaa: 'lon43.101322_lat36.318532',
    Alshykhan: 'lon43.350052_lat36.691541',
    'Alsinaa Alkadema': 'lon43.071956_lat36.347428',
    Alsmood: 'lon43.111796_lat36.320265',
    'Al-Tahrer': 'lon43.201287_lat36.390342',
    'Al-Taiaran': 'lon43.140315_lat36.325341',
    Altank: 'lon43.069844_lat36.334344',
    Althoraa: 'lon43.110259_lat36.343145',
    'Al-Wahdaa': 'lon43.184839_lat36.331538',
    'Al-Warshan': 'lon43.097102_lat36.350075',
    Alyrmoq: 'lon43.082273_lat36.336458',
    Alzngly: 'lon43.109626_lat36.353944',
    'Aski Mousl': 'lon42.73514_lat36.513471',
    Auenat: 'lon42.399071_lat36.67976',
    'Bab Al-Bead': 'lon43.127605_lat36.334953',
    Badush: 'lon42.967959_lat36.41445',
    Bartella: 'lon43.380304_lat36.349597',
    Basheeka: 'lon43.342171_lat36.451798',
    Dohok: 'lon42.9842_lat36.859369',
    Gogjali: 'lon43.246833_lat36.353981',
    'Hamaam Alaleel': 'lon43.260379_lat36.160157',
    'Hawi Al-Kanisa': 'lon43.085152_lat36.381247',
    'Mosul Algdida': 'lon43.104377_lat36.331809',
    'Mosul Al-Kadema': 'lon43.126541_lat36.342823',
    Msherfa: 'lon43.179668_lat36.387648',
    Nablus: 'lon43.084701_lat36.328359',
    Rabeaa: 'lon42.08276_lat36.808678',
    'Ragm Hadid': 'lon43.076396_lat36.326236',
    Sadam: 'lon43.208775_lat36.383105',
    Sanjar: 'lon41.864538_lat36.316244',
    Somer: 'lon43.200918_lat36.301028',
    Sumeel: 'lon42.847606_lat36.857084',
    'Tal Abta': 'lon42.563028_lat35.94226',
    'Tal Afer': 'lon42.450003_lat36.374589',
    'Tal Alroman': 'lon43.089466_lat36.316493',
    'Tal Keef': 'lon43.120284_lat36.489935',
    'Tal Zalt': 'lon42.829782_lat36.282837',
    Tmooz: 'lon43.084933_lat36.365008',
    'Twim & Mjarin': 'lon42.692998_lat36.363335',
    'Wady Alaen': 'lon43.103452_lat36.325881',
    'Wady Hagr': 'lon43.126976_lat36.320946',
    Zakho: 'lon42.688446_lat37.146393',
    Zumar: 'lon42.603252_lat36.655901',
    Other: 'lon0.0_lat0.0',
  };
  return state;
});
fn(state => {
  state.genderOptions = {
    M: 'male',
    F: 'female',
    U: 'unknown',
    O: 'prefer_not_to_answer',
  };

  return state;
});
