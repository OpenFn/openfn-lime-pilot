get('optionGroups/kdef7pUey9f', {
  fields: 'id,displayName,options[id,displayName,code]',
});

fn(({ data, ...state }) => {
  state.locations = data;
  return state;
});

fn(state => {
  state.nationalityMap = {
    afghanistan: '84066564-253e-43d8-b141-76730cffa878',
    albania: 'db21f4f9-faf2-4358-8297-0ae76627b3b8',
    algeria: '5f6c017f-074c-46b3-92d0-d055e2094366',
    angola: '8a2e5a03-8a74-41ae-9a98-2310f9ce400d',
    anguilla: 'c911af8a-171c-4ee9-b1ff-934373e8a819',
    argentina: 'b83d24e8-34d8-4920-83c0-8ba014467ff4',
    armenia: '39f1652a-f2b7-4b65-a7e1-7097ac6cdef0',
    aruba: 'f3f1cba1-7c1e-4234-86a2-f27bb5964fee',
    azerbaijan: '29750013-0e35-47ca-8f77-9192a923fb07',
    bangladesh: 'a99de53c-ce76-4b1e-91b2-461094baf79e',
    belarus: '664baba4-c552-47b9-97c0-ff67dafd27d6',
    benin: 'cf863e31-bb38-48ed-90dd-f3dedcac304c',
    bhutan: 'd45a57c9-994f-4deb-8845-9b785860a2ec',
    bolivia: 'd8800d10-862b-42f1-8e22-cac1ce1bbcae',
    bosnia_and_herzegovina: '05d8f4ef-45eb-463d-b2f3-8a5a613ee6b9',
    botswana: '1304a0de-5b70-4d36-a873-e72a82963316',
    brazil: '353ff388-64e6-434c-b78f-ca9636390389',
    british_virgin_islands: 'b02c6d20-83a2-4947-8a7d-91d1f9c4d8a2',
    bulgaria: '91c85a62-2b02-483a-aefd-e29d368565fe',
    burkina_faso: '6c90c1ae-17a4-4e94-a267-4fba4c94efd8',
    burundi: '8a2ed0db-eaad-44bc-bf06-5cb1b2a3db0b',
    cambodia: '4fd14df8-8279-4dfa-bdd3-e1ab26bc0264',
    cameroon: '873552ac-9850-4cc1-ae09-17eb0fccf405',
    cape_verde: 'cfbc220a-1d6c-4469-bb6d-a8e3deb4f7e7',
    central_african_republic: '61a4c4a4-25c2-4459-a874-ec1d24f8323a',
    chad: '9e41e71c-f5d5-456c-a6f9-2129b8055bfc',
    chile: '05333883-44e9-4f57-836a-041391803007',
    china: '15016874-3e20-484a-baa8-9b94e1a3d358',
    colombia: 'a008dff8-ce96-4662-bf8a-372e43d424f0',
    comoros: '9d8738c8-40c2-4c66-aabb-ef176a20ffe8',
    costa_rica: 'fb52f8c9-40ec-4dc4-92a4-d465612de2ff',
    cote_divoire: '513cb36a-3f67-46ea-a789-fcdaca0e26f5',
    cuba: '147c2434-5d7e-420c-8053-ba623301f3f5',
    djibouti: 'cf5b334f-1c0f-41fc-ab54-53ff1e942830',
    dominica: 'f70e51e5-b76c-4c38-9bf2-ef8e1f308ce1',
    dominican_republic: 'ce72fc9b-619b-4c32-b865-600e888ad814',
    drc_congo: '8f6d3d2a-e09f-473b-99c9-e539f97ceab6',
    east_timor: '854f2f66-40e1-4a6a-9dee-09c832a52289',
    ecuador: 'f9810f9a-78a7-42a2-99e6-19c629642386',
    egypt: 'cc7343f8-9243-4d09-b378-58363850d624',
    el_salvador: '9a34935e-5a8a-45be-8ccd-cb23192e420f',
    equatorial_guinea: '7e591605-d723-4398-982a-8737af63a2dc',
    eritrea: 'c61f03c2-0d1f-444f-a974-0a61063aff71',
    ethiopia: '7478d375-014e-410e-a355-090143e88f5b',
    gabon: '9f46ae06-114a-47fa-8f8d-e9749f04da25',
    gambia: '5ec7ddd7-14a5-48ec-9e7c-8896d1010655',
    georgia: 'bc71788f-db69-4b6f-8d1c-57a74395bdd2',
    ghana: '2eb4ff46-d908-4148-9b0d-40ccfc1a655a',
    greece: 'b75d6bcc-fadf-4141-8d0f-2463154b89f7',
    guam: '51fa502b-98a3-4c42-b5fd-7b4d64489bb9',
    guatemala: '3725a4d2-b28f-466b-905a-bafeaeb75855',
    guinea: 'eeaff39c-8afd-43f7-b9a0-53729f5df1d8',
    guinea_bissau: '14e90203-9197-42ea-9222-acafd2fd6984',
    guyana: 'ba4dfa7e-f3cd-4e94-8ca7-6b96a93378a8',
    haiti: 'f76f7dcb-f82e-4257-a627-1685ff3f3586',
    honduras: 'cdd1336e-495b-4868-aace-57a84442d6fd',
    india: '378d0107-eb43-485d-930c-0704b4e5aa11',
    indonesia: '1cbe17e6-adc2-4680-bee0-54d94af75ebf',
    iran: 'b422270e-d8af-4a32-b523-742545a17a3f',
    iraq: '03aa7d6e-7656-48e4-8dc0-5e27706722c0',
    jordan: '842f963c-f84d-4076-a8db-337295fd9b91',
    kazakhstan: '6f6d0e78-2c81-411d-8d13-367e250dc110',
    kenya: 'ad351a33-8846-4cad-8195-b07b6041d4a5',
    kuwait: '4aee7a88-cda9-454e-9f25-4a6420270417',
    kyrgyzstan: 'ace3b851-042b-46a6-8fea-68aae042d614',
    laos: 'dfb01b39-c224-459e-b045-dd9461b9a1e5',
    lebanon: '7de78f22-f53e-48d2-923f-ae1e4d814f46',
    lesotho: 'b35b29c5-9bb7-4b40-ad33-29eecd28a9e6',
    liberia: 'a5fd61b4-fd27-433d-8428-7e88a7f27921',
    libya: '600c6af4-b767-423c-b942-7f06ca467258',
    macedonia: '5837cc40-9ab5-4088-91c8-ca6e4b57e903',
    madagascar: '3782bf3c-380e-4b60-b21a-38199073f112',
    malawi: 'e8b5f188-6a5c-43ae-b4a5-200abb13153e',
    malaysia: '3facca11-fbaa-4c40-8fac-4751d45c3f1b',
    mali: '3e844a47-526a-46f9-afea-1af9ff8690aa',
    martinique: '051ce04e-05e8-4430-8b75-3e499bbffbc8',
    mauritania: '8acb006b-8596-4a98-8177-acb4cb575956',
    mauritius: '17ced083-eb2a-4046-a713-26cabc7af95d',
    mayotte: '1af148fe-2698-4b89-bf7f-87e5c48b6848',
    mexico: '8381208f-01ca-4ed3-8f2c-f73ed1c316e3',
    moldova: 'f0e9c8b5-69b5-48df-8cb9-2d089ba04e46',
    mongolia: '9f341cb1-dcb5-4f6c-bd21-b57db01b4193',
    morocco: 'ef467a17-91e8-4124-a136-7ed8ff7c7d15',
    mozambique: '0916133b-4d93-4d60-9c20-e7ee3936f391',
    myanmar: 'e81ba700-f9fc-4ed0-b248-578a25717cdb',
    namibia: '0cb123dc-8810-4840-b6ab-6a527c5a79ef',
    nauru: '3386fe63-2158-4040-a502-9f65fd2079d3',
    nepal: 'fb01b01a-6775-423c-8012-7d43f587cb6c',
    new_caledonia: 'e67c072b-7707-491f-8c2e-13c914216b61',
    nicaragua: 'f6a9521c-596b-49f9-b914-67138e8c17e6',
    niger: '7561db90-a866-4443-93f4-95cac1d47e9c',
    nigeria: '4134651a-7f53-45fb-8bc6-7fed9cf36f51',
    north_korea: '4d3079e4-8568-48e6-9342-665896875a38',
    oman: '9b0af037-99d1-43b8-ac06-82137ec4b06d',
    other: 'Other',
    pakistan: 'f45d93c3-c9b0-4333-a5e6-299b7c425812',
    palestine: 'e2a19948-49aa-44c0-98ef-67ae1160ef43',
    panama: '1ef5a828-9d0d-4336-91ab-880d5dc0151c',
    papua_new_guinea: 'e1e6b451-d7fe-4954-b225-99b2de82a4c0',
    paraguay: 'd8412016-82f5-4801-a026-1bdc429850b7',
    peru: 'e74fa87f-8469-46b0-975f-6cb37c394564',
    philippines: 'bdbd5c9f-1f28-4f4d-a254-4a84f8bb2c8f',
    puerto_rico: '39fca1d0-d2e7-4b13-82bd-626fbec71252',
    republic_of_congo: '5db9afa5-b57e-4f45-8b1c-af766f14fc58',
    reunion: '1dae4b2d-50c9-4bf1-b25a-7063600a5e74',
    romania: '457e745e-ae97-463d-95a9-8d5689d3ca2b',
    rwanda: '6bc925a1-7699-496a-85b0-c290699381db',
    samoa: 'e03b381b-a7f4-40eb-964f-51571dc3c48c',
    sao_tome_and_principe: 'f66bbb42-684f-42d7-bfcd-95d586eb7dc9',
    saudi_arabia: 'fdf495a4-e60c-46f7-a8a2-61a216849086',
    senegal: 'ad948f1b-0733-4f8d-b049-d64289b43a10',
    serbia: 'd2e69cef-3bff-4220-ba91-a6a678fb606b',
    sierra_leone: 'ffba9caf-b6aa-4078-845e-578f7a7fd566',
    somalia: '99c8dccc-4dfa-4d30-86be-42a309ab431f',
    south_africa: '75882d62-1c55-480d-b411-8ca40c3307df',
    south_korea: '0603d6b9-334f-4443-ab60-7c5d457b95fc',
    south_sudan: 'f113e24e-2ea9-49a2-9b28-59241b9adb21',
    sri_lanka: 'b0031c01-d242-4410-b98b-cc1511590b85',
    sudan: '2f03a932-2b75-4e8b-9f44-0fcd83c75dc4',
    suriname: 'c65d3329-98d4-4dd7-89d3-141b70d00eb2',
    swaziland: '06a2703b-af17-4e44-83f5-6cc9a8a75320',
    switzerland: 'dcdcdc70-a006-4b0a-bac2-7de89b022b65',
    syria: '1e34ee55-ef9f-4386-bae6-6995555ded75',
    tajikistan: '34836c60-5449-48d6-b3c9-c0b3361b9f2c',
    tanzania: '050a8eb1-0d77-4f65-a2da-776a13bcd2a4',
    thailand: '289ac5bd-6434-4837-86bf-b54d22970ac8',
    togo: '6a583e64-869d-477d-a1c1-746320d45fc4',
    tonga: 'd381f06d-2365-4f40-948b-cfe90d8cb532',
    tunisia: '56be7864-fde6-4db3-8fa5-b9dd42cd9c53',
    turkey: '7429c779-1d3a-4aec-8256-d0b1637e1bd1',
    turkmenistan: '3ef17df5-299b-4385-9ea6-572df4b6f9ca',
    uganda: 'be3d11d3-446d-440c-a582-d01c7cbb0eda',
    ukraine: '38c99c8d-2b93-4848-a537-b1865a260bb2',
    unknown: 'Unknown',
    uruguay: 'c2e45baf-748b-4d7b-a391-ed6b802b6f94',
    uzbekistan: '60512350-d79b-41aa-aff0-1b28ca4aa5f1',
    venezuela: '557cea4a-0049-4b7a-b373-ed63f294a2a0',
    vietnam: '49509c5f-e533-48a8-bf06-86935e3376b2',
    western_sahara: '4086dfd2-f4f5-4107-93e8-07bee235af8f',
    yemen: '6a3214e0-f94b-414c-8148-968e24386671',
    zambia: '3ec0432d-ea37-4159-a658-29d6f07fe21a',
    zimbabwe: 'ce1b0d8d-0a2d-4f93-a6ed-64aca2fd0f45',
  };
  state.statusMap = {
    asylum_seeker: 'f921ffdd-72ca-4d58-a89b-1fa2e959d110',
    no_status: '2bacead2-f280-457c-9d28-e80e106f7d25',
    refugee: 'MSF-AAAAAA000000000000001929',
    single: '20b8524e-4c26-4fa0-81f0-fa23ebacc54d',
    married: 'MSF-AAAAAA000000000000001863',
    widowed: 'MSF-AAAAAA000000000000001864',
    divorced_separated: 'MSF-AAAAAA000000000000001865',
    concubine: '1060AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    not_applicable: 'MSF-AAAAAA000000000000001823',
    student: 'MSF-AAAAAA000000000000001871',
    permanent_employee: '4a18a820-f3a1-4bb7-9138-558a9ecc81da',
    occasional_employee: '2cb73bee-7f94-4695-89c7-c81187dbc90c',
    unemployed: 'MSF-AAAAAA000000000000001870',
    housewife: '9b14b4d4-b749-4acf-acfe-79c480f3c4b3',
    other: 'MSF-AAAAAA000000000000001329',
    unknown: '1067AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    idp: 'MSF-AAAAAA000000000000001930',
    internationally_displaced: '515c5abe-4172-4d0c-a991-0de2888228d7',
    non_displaced: 'bbdb287c-4ba1-4944-bd87-eb126c5f9d92',
    returnee: 'fc49acaa-ece2-4365-9dfb-70c2105de8b1',
  };
  return state;
});
