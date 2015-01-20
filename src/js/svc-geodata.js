angular.module("risevision.common.geodata", [])
.value("COUNTRIES",
        [["Afghanistan", "AF"],
        ["Albania", "AL"],
        ["Algeria", "DZ"],
        ["American Samoa", "AS"],
        ["Andorra", "AD"],
        ["Angola", "AO"],
        ["Anguilla", "AI"],
        ["Antarctica", "AQ"],
        ["Antigua and Barbuda", "AG"],
        ["Argentina", "AR"],
        ["Armenia", "AM"],
        ["Aruba", "AW"],
        ["Australia", "AU"],
        ["Austria", "AT"],
        ["Azerbaijan", "AZ"],
        ["Bahamas", "BS"],
        ["Bahrain", "BH"],
        ["Bangladesh", "BD"],
        ["Barbados", "BB"],
        ["Belarus", "BY"],
        ["Belgium", "BE"],
        ["Belize", "BZ"],
        ["Benin", "BJ"],
        ["Bermuda", "BM"],
        ["Bhutan", "BT"],
        ["Bolivia", "BO"],
        ["Bosnia and Herzegovina", "BA"],
        ["Botswana", "BW"],
        ["Bouvet Island", "BV"],
        ["Brazil", "BR"],
        ["British Indian Ocean Territory", "IO"],
        ["British Virgin Islands", "VG"],
        ["Brunei Darussalam", "BN"],
        ["Bulgaria", "BG"],
        ["Burkina Faso", "BF"],
        ["Burundi", "BI"],
        ["Cambodia", "KH"],
        ["Cameroon", "CM"],
        ["Canada", "CA"],
        ["Cape Verde", "CV"],
        ["Cayman Islands", "KY"],
        ["Central African Republic", "CF"],
        ["Chad", "TD"],
        ["Chile", "CL"],
        ["China", "CN"],
        ["Christmas Island", "CX"],
        ["Cocos", "CC"],
        ["Colombia", "CO"],
        ["Comoros", "KM"],
        ["Congo", "CG"],
        ["Cook Islands", "CK"],
        ["Costa Rica", "CR"],
        ["Croatia", "HR"],
        ["Cuba", "CU"],
        ["Cyprus", "CY"],
        ["Czech Republic", "CZ"],
        ["Denmark", "DK"],
        ["Djibouti", "DJ"],
        ["Dominica", "DM"],
        ["Dominican Republic", "DO"],
        ["Ecuador", "EC"],
        ["Egypt", "EG"],
        ["El Salvador", "SV"],
        ["Equatorial Guinea", "GQ"],
        ["Eritrea", "ER"],
        ["Estonia", "EE"],
        ["Ethiopia", "ET"],
        ["Falkland Islands", "FK"],
        ["Faroe Islands", "FO"],
        ["Fiji", "FJ"],
        ["Finland", "FI"],
        ["France", "FR"],
        ["French Guiana", "GF"],
        ["French Polynesia", "PF"],
        ["French Southern Territories", "TF"],
        ["Gabon", "GA"],
        ["Gambia", "GM"],
        ["Georgia", "GE"],
        ["Germany", "DE"],
        ["Ghana", "GH"],
        ["Gibraltar", "GI"],
        ["Greece", "GR"],
        ["Greenland", "GL"],
        ["Grenada", "GD"],
        ["Guadeloupe", "GP"],
        ["Guam", "GU"],
        ["Guatemala", "GT"],
        ["Guinea", "GN"],
        ["Guinea-Bissau", "GW"],
        ["Guyana", "GY"],
        ["Haiti", "HT"],
        ["Heard and McDonald Islands", "HM"],
        ["Honduras", "HN"],
        ["Hong Kong", "HK"],
        ["Hungary", "HU"],
        ["Iceland", "IS"],
        ["India", "IN"],
        ["Indonesia", "ID"],
        ["Iran", "IR"],
        ["Iraq", "IQ"],
        ["Ireland", "IE"],
        ["Israel", "IL"],
        ["Italy", "IT"],
        ["Ivory Coast", "CI"],
        ["Jamaica", "JM"],
        ["Japan", "JP"],
        ["Jordan", "JO"],
        ["Kazakhstan", "KZ"],
        ["Kenya", "KE"],
        ["Kiribati", "KI"],
        ["Kuwait", "KW"],
        ["Kyrgyzstan", "KG"],
        ["Laos", "LA"],
        ["Latvia", "LV"],
        ["Lebanon", "LB"],
        ["Lesotho", "LS"],
        ["Liberia", "LR"],
        ["Libya", "LY"],
        ["Liechtenstein", "LI"],
        ["Lithuania", "LT"],
        ["Luxembourg", "LU"],
        ["Macau", "MO"],
        ["Macedonia", "MK"],
        ["Madagascar", "MG"],
        ["Malawi", "MW"],
        ["Malaysia", "MY"],
        ["Maldives", "MV"],
        ["Mali", "ML"],
        ["Malta", "MT"],
        ["Marshall Islands", "MH"],
        ["Martinique", "MQ"],
        ["Mauritania", "MR"],
        ["Mauritius", "MU"],
        ["Mayotte", "YT"],
        ["Mexico", "MX"],
        ["Micronesia", "FM"],
        ["Moldova", "MD"],
        ["Monaco", "MC"],
        ["Mongolia", "MN"],
        ["Montserrat", "MS"],
        ["Morocco", "MA"],
        ["Mozambique", "MZ"],
        ["Myanmar", "MM"],
        ["Namibia", "NA"],
        ["Nauru", "NR"],
        ["Nepal", "NP"],
        ["Netherlands", "NL"],
        ["Netherlands Antilles", "AN"],
        ["New Caledonia", "NC"],
        ["New Zealand", "NZ"],
        ["Nicaragua", "NI"],
        ["Niger", "NE"],
        ["Nigeria", "NG"],
        ["Niue", "NU"],
        ["Norfolk Island", "NF"],
        ["North Korea", "KP"],
        ["Northern Mariana Islands", "MP"],
        ["Norway", "NO"],
        ["Oman", "OM"],
        ["Pakistan", "PK"],
        ["Palau", "PW"],
        ["Panama", "PA"],
        ["Papua New Guinea", "PG"],
        ["Paraguay", "PY"],
        ["Peru", "PE"],
        ["Philippines", "PH"],
        ["Pitcairn", "PN"],
        ["Poland", "PL"],
        ["Portugal", "PT"],
        ["Puerto Rico", "PR"],
        ["Qatar", "QA"],
        ["Reunion", "RE"],
        ["Romania", "RO"],
        ["Russian Federation", "RU"],
        ["Rwanda", "RW"],
        ["S. Georgia and S. Sandwich Islands", "GS"],
        ["Saint Kitts and Nevis", "KN"],
        ["Saint Lucia", "LC"],
        ["Saint Vincent and The Grenadines", "VC"],
        ["Samoa", "WS"],
        ["San Marino", "SM"],
        ["Sao Tome and Principe", "ST"],
        ["Saudi Arabia", "SA"],
        ["Serbia", "RS"],
        ["Senegal", "SN"],
        ["Seychelles", "SC"],
        ["Sierra Leone", "SL"],
        ["Singapore", "SG"],
        ["Slovakia", "SK"],
        ["Slovenia", "SI"],
        ["Solomon Islands", "SB"],
        ["Somalia", "SO"],
        ["South Africa", "ZA"],
        ["South Korea", "KR"],
        ["Spain", "ES"],
        ["Sri Lanka", "LK"],
        ["St. Helena", "SH"],
        ["St. Pierre and Miquelon", "PM"],
        ["Sudan", "SD"],
        ["Suriname", "SR"],
        ["Svalbard and Jan Mayen Islands", "SJ"],
        ["Swaziland", "SZ"],
        ["Sweden", "SE"],
        ["Switzerland", "CH"],
        ["Syria", "SY"],
        ["Taiwan", "TW"],
        ["Tajikistan", "TJ"],
        ["Tanzania", "TZ"],
        ["Thailand", "TH"],
        ["Togo", "TG"],
        ["Tokelau", "TK"],
        ["Tonga", "TO"],
        ["Trinidad and Tobago", "TT"],
        ["Tunisia", "TN"],
        ["Turkey", "TR"],
        ["Turkmenistan", "TM"],
        ["Turks and Caicos Islands", "TC"],
        ["Tuvalu", "TV"],
        ["Uganda", "UG"],
        ["Ukraine", "UA"],
        ["United Arab Emirates", "AE"],
        ["United Kingdom", "UK"],
        ["United States", "US"],
        ["Uruguay", "UY"],
        ["US Minor Outlying Islands", "UM"],
        ["US Virgin Islands", "VI"],
        ["Uzbekistan", "UZ"],
        ["Vanuatu", "VU"],
        ["Venezuela", "VE"],
        ["Viet Nam", "VN"],
        ["Wallis and Futuna Islands", "WF"],
        ["Western Sahara", "EH"],
        ["Yemen", "YE"],
        ["Zambia", "ZM"],
        ["Zimbabwe", "ZW"]])

    .value("REGIONS_CA", [
        ["Alberta", "AB"],
        ["British Columbia", "BC"],
        ["Manitoba", "MB"],
        ["New Brunswick", "NB"],
        ["Newfoundland and Labrador", "NL"],
        ["Northwest Territories", "NT"],
        ["Nova Scotia", "NS"],
        ["Nunavut", "NV"],
        ["Ontario", "ON"],
        ["Prince Edward Island", "PE"],
        ["Quebec", "QC"],
        ["Saskatchewan", "SK"],
        ["Yukon Territory", "YT"]])

    .value("REGIONS_US", [
        ["Alabama", "AL"],
        ["Alaska", "AK"],
        ["Arizona", "AZ"],
        ["Arkansas", "AR"],
        ["California", "CA"],
        ["Colorado", "CO"],
        ["Connecticut", "CT"],
        ["Delaware", "DE"],
        ["District of Columbia", "DC"],
        ["Florida", "FL"],
        ["Georgia", "GA"],
        ["Hawaii", "HI"],
        ["Idaho", "ID"],
        ["Illinois", "IL"],
        ["Indiana", "IN"],
        ["Iowa", "IA"],
        ["Kansas", "KS"],
        ["Kentucky", "KY"],
        ["Louisiana", "LA"],
        ["Maine", "ME"],
        ["Maryland", "MD"],
        ["Massachusetts", "MA"],
        ["Michigan", "MI"],
        ["Minnesota", "MN"],
        ["Mississippi", "MS"],
        ["Missouri", "MO"],
        ["Montana", "MT"],
        ["Nebraska", "NE"],
        ["Nevada", "NV"],
        ["New Hampshire", "NH"],
        ["New Jersey", "NJ"],
        ["New Mexico", "NM"],
        ["New York", "NY"],
        ["North Carolina", "NC"],
        ["North Dakota", "ND"],
        ["Ohio", "OH"],
        ["Oklahoma", "OK"],
        ["Oregon", "OR"],
        ["Pennsylvania", "PA"],
        ["Rhode Island", "RI"],
        ["South Carolina", "SC"],
        ["South Dakota", "SD"],
        ["Tennessee", "TN"],
        ["Texas", "TX"],
        ["Utah", "UT"],
        ["Vermont", "VT"],
        ["Virginia", "VA"],
        ["Washington", "WA"],
        ["West Virginia", "WV"],
        ["Wisconsin", "WI"],
        ["Wyoming", "WY"]])
      
    .value("TIMEZONES", [
        ["(GMT -12:00) International Dateline West", "-720"],
        ["(GMT -11:00) Midway Island, Samoa", "-660"],
        ["(GMT -10:00) Hawaii", "-600"],
        ["(GMT -09:00) Alaska", "-540"],
        ["(GMT -08:00) Pacific Time (US & Canada], Tijuana", "-480"],
        ["(GMT -07:00) Mountain Time (US & Canada)", "-420"],
        ["(GMT -06:00) Central Time (US & Canada)", "-360"],
        ["(GMT -05:00) Eastern Time (US & Canada)", "-300"],
        ["(GMT -04:00) Atlantic Time (Canada)", "-240"],
        ["(GMT -03:30) NewfoundLand Time (Canada)", "-210"],
        ["(GMT -03:00) Buenos Aires, Georgetown", "-180"],
        ["(GMT -02:00) Mid-Atlantic", "-120"],
        ["(GMT -01:00) Cape Verde Is.", "-60"],
        ["(GMT  00:00) Dublin, Edinburgh, Lisbon, London", "0"],
        ["(GMT +01:00) Amsterdam, Berlin, Bern, Rome, Paris, Stockholm, Vienna", "60"],
        ["(GMT +02:00) Athens, Bucharest, Istanbul, Minsk", "120"],
        ["(GMT +03:00) Moscow, St. Petersburg, Volgograd", "180"],
        ["(GMT +03:30) Tehran", "210"],
        ["(GMT +04:00) Abu Dhabi, Muscat", "240"],
        ["(GMT +04:30) Kabul", "270"],
        ["(GMT +05:00) Islamabad, Karachi, Tashkent", "300"],
        ["(GMT +05:30) Calcutta, Chennai, Mumbai,New Delhi", "330"],
        ["(GMT +05:45) Kathmandu", "345"],
        ["(GMT +06:00) Astana,Almaty, Dhaka, Novosibirsk", "360"],
        ["(GMT +06:30) Rangoon (Yangon, Burma)", "390"],
        ["(GMT +07:00) Bangkok, Hanoi, Jakarta", "420"],
        ["(GMT +08:00) Beijing, Chongqing, Hong Kong, Urumqi", "480"],
        ["(GMT +09:00) Osaka, Sapporo, Tokyo", "540"],
        ["(GMT +09:30) Adelaide, Darwin", "570"],
        ["(GMT +10:00) Canberra, Melbourne, Sydney, Vladvostok", "600"],
        ["(GMT +11:00) Magadan, Solomon Is., New Caledonia", "660"],
        ["(GMT +12:00) Auckland, Fiji, Kamchatka, Marshall Is.", "720"],
        ["(GMT +13:00) Nuku'alofa", "780"],
    ]);
