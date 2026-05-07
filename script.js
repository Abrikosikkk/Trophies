"use strict";
(() => {
  // src/brawler.ts
  var Brawler = class {
    cardID;
    skins;
    trophies;
    highestTrophies;
    powerlevel;
    powerpoints;
    state;
    masteryPoints;
    masteryClaimed;
    winstreak;
    constructor(cardID, skins, trophies, highestTrophies, powerlevel, powerpoints, state, masteryPoints, masteryClaimed, winstreak) {
      this.cardID = cardID;
      this.skins = skins;
      this.trophies = trophies;
      this.highestTrophies = highestTrophies;
      this.powerlevel = powerlevel;
      this.powerpoints = powerpoints;
      this.state = state;
      this.masteryPoints = masteryPoints;
      this.masteryClaimed = masteryClaimed;
      this.winstreak = winstreak;
    }
  };

  // src/long.ts
  var Long = class {
    high;
    low;
    constructor(high, low) {
      this.high = high;
      this.low = low;
    }
  };

  // src/config.ts
  var Config = class {
    id = new Long(0, 1);
    tutorial = true;
    registered = false;
    name = "Natesworks";
    coins = 0;
    gems = 0;
    bling = 0;
    starpoints = 0;
    experienceLevel = 0;
    experience = 0;
    namecolor = 0;
    thumbnail = 0;
    trophyRoadTier = 0;
    tokens = 0;
    tokenDoublers = 0;
    trioWins = 0;
    soloWins = 0;
    duoWins = 0;
    challengeWins = 0;
    selectedBrawlers = [0, 1, 2];
    enableShop = false;
    enableBrawlPass = false;
    lobbyinfo = "";
    enableClubs = false;
    brawlPassPremium = true;
    ownedBrawlers = {};
    disableBots = false;
    infiniteAmmo = false;
    infiniteSuper = false;
    china = false;
    artTest = false;
    customLoadingScreen = true;
    debugMenu = true;
    events = [];
    rankedCurrent = 0;
    rankedHighest = 0;
    prestige = 0;
    fameCredits = 0;
    favouriteBrawler = 0;
    rankedReputation = 0;
    region = "";
    supportedCreator = "";
    allCreatorCodesValid = false;
    creatorCodes = [];
    randomBotNames = true;
    draftMapLimit = 100;
    winstreak = 0;
    winstreakBrawler = 0;
    creationDate = 0;
    highestRoboRumbleLvlPassed = 0;
    highestBossFightLvlPassed = 0;
    highestRampageLvlPassed = 0;
    mostChallengeWins = 0;
    highestClubLeague = 0;
    highestSoloLeague = 0;
    r35brawlers = 0;
    teamExperiment = false;
    logLevel = 0;
    enableSupercellID = false;
    hiddenSettingsButtons = [
      "button_faq",
      "button_terms",
      "button_privacy",
      "button_parentsguide",
      "button_thirdparty",
      "button_api",
      "button_random_reward_rates",
      "button_kakao_connect",
      "button_privact_settings",
      "button_birthday",
      "button_ads",
      "button_privacy_settings",
      "button_sc_id"
    ];
    customSettings = true;
    passTokens = 4e4;
    plus = true;
    ownedPins = [];
    ownedSkins = [];
    ownedThumbnails = [0];
  };
  function readConfig() {
    const json = JSON.parse(File.readAllText(configPath));
    const config2 = new Config();
    if (json.id) {
      config2.id = new Long(json.id[0], json.id[1]);
    }
    config2.tutorial = json.tutorial;
    config2.registered = json.registered;
    config2.coins = json.coins;
    config2.gems = json.gems;
    config2.bling = json.bling;
    config2.starpoints = json.starpoints;
    config2.experienceLevel = json.level;
    config2.experience = json.experience;
    config2.namecolor = json.namecolor;
    config2.thumbnail = json.thumbnail;
    config2.trophyRoadTier = json["trophyRoadTier"];
    config2.selectedBrawlers = json.selectedBrawlers;
    config2.tokens = json.tokens;
    config2.tokenDoublers = json.tokenDoublers;
    config2.trioWins = json["3v3Victories"];
    config2.soloWins = json.soloVictories;
    config2.duoWins = json.duoVictories;
    config2.challengeWins = json.mostChallengeWins;
    config2.lobbyinfo = json.lobbyinfo;
    config2.enableBrawlPass = json.enableBrawlPass == null ? false : json.enableBrawlPass;
    config2.enableShop = json.enableShop == null ? false : json.enableShop;
    config2.enableClubs = json.enableClubs == null ? false : json.enableClubs;
    config2.disableBots = json.disableBots == null ? false : json.disableBots;
    config2.infiniteAmmo = json.infiniteAmmo == null ? false : json.infiniteAmmo;
    config2.infiniteSuper = json.infiniteSuper == null ? false : json.infiniteSuper;
    config2.china = json.china == null ? false : json.china;
    config2.name = json.name == null ? "Natesworks" : json.name;
    config2.artTest = json.artTest == null ? false : json.artTest;
    config2.customLoadingScreen = json.customLoadingScreen == null ? true : json.customLoadingScreen;
    config2.debugMenu = json.debugMenu == null ? true : json.debugMenu;
    for (const [id, brawler] of Object.entries(
      json.unlockedBrawlers
    )) {
      config2.ownedBrawlers[Number(id)] = new Brawler(
        brawler.cardID,
        brawler.skins,
        brawler.trophies,
        brawler.highestTrophies,
        brawler.powerlevel,
        brawler.powerpoints,
        brawler.state,
        brawler.masteryPoints,
        brawler.masteryClaimed,
        brawler.winstreak || 0
      );
    }
    config2.events = json.events;
    config2.rankedCurrent = json.rankedCurrent;
    config2.rankedHighest = json.rankedHighest;
    config2.prestige = json.prestige;
    config2.fameCredits = json.fameCredits;
    config2.favouriteBrawler = json.favouriteBrawler;
    config2.rankedReputation = json.rankedReputation || 100;
    config2.region = json.region || "PL";
    config2.supportedCreator = json.supportedCreator || "Natesworks";
    config2.allCreatorCodesValid = json.allCreatorCodesValid || false;
    config2.creatorCodes = json.creatorCodes || [
      "Natesworks",
      "kubune",
      "Hallo",
      "Kazarex",
      "Ryo",
      "Banaanae"
    ];
    config2.randomBotNames = json.randomBotNames || true;
    config2.draftMapLimit = json.draftMapLimit || 5;
    config2.winstreak = json.winstreak || 0;
    config2.winstreakBrawler = json.winstreakBrawler || 0;
    config2.creationDate = json.creationDate || 0;
    if (json.previousStats) {
      config2.highestRoboRumbleLvlPassed = json.previousStats.highestRoboRumbleLvlPassed || 0;
      config2.highestBossFightLvlPassed = json.previousStats.highestBossFightLvlPassed || 0;
      config2.highestRampageLvlPassed = json.previousStats.highestRampageLvlPassed || 0;
      config2.challengeWins = json.previousStats.challengeWins || 0;
      config2.highestClubLeague = json.previousStats.highestClubLeague || 0;
      config2.highestSoloLeague = json.previousStats.highestSoloLeague || 0;
      config2.r35brawlers = json.previousStats.r35brawlers || 0;
    }
    config2.teamExperiment = json.teamExperiment || false;
    config2.logLevel = json.logLevel || 0;
    config2.enableSupercellID = json.enableSupercellID || false;
    config2.customSettings = json.customSettings || true;
    if (json.brawlpass) {
      config2.enableBrawlPass = json.brawlpass.enabled;
      config2.brawlPassPremium = json.brawlpass.hasPremium;
      config2.plus = json.brawlpass.hasPlus;
      config2.passTokens = json.brawlpass.tokens;
    }
    return config2;
  }
  function writeConfig(config2) {
    const data = {};
    data.tutorial = config2.tutorial;
    data.registered = config2.registered;
    data.name = config2.name;
    data.coins = config2.coins;
    data.gems = config2.gems;
    data.bling = config2.bling;
    data.starpoints = config2.starpoints;
    data.level = config2.experienceLevel;
    data.experience = config2.experience;
    data.namecolor = config2.namecolor;
    data.thumbnail = config2.thumbnail;
    data.trophyRoadTier = config2.trophyRoadTier;
    data.selectedBrawlers = config2.selectedBrawlers;
    data.tokens = config2.tokens;
    data.tokenDoublers = config2.tokenDoublers;
    data["3v3Victories"] = config2.trioWins;
    data.soloVictories = config2.soloWins;
    data.duoVictories = config2.duoWins;
    data.mostChallengeWins = config2.challengeWins;
    data.lobbyinfo = config2.lobbyinfo;
    data.enableShop = config2.enableShop;
    data.enableClubs = config2.enableClubs;
    data.disableBots = config2.disableBots;
    data.infiniteAmmo = config2.infiniteAmmo;
    data.infiniteSuper = config2.infiniteSuper;
    data.china = config2.china;
    data.artTest = config2.artTest;
    data.customLoadingScreen = config2.customLoadingScreen;
    data.debugMenu = config2.debugMenu;
    data.region = config2.region;
    data.supportedCreator = config2.supportedCreator;
    data.allCreatorCodesValid = config2.allCreatorCodesValid;
    data.creatorCodes = config2.creatorCodes;
    data.unlockedBrawlers = {};
    for (const [id, brawler] of Object.entries(config2.ownedBrawlers)) {
      data.unlockedBrawlers[Number(id)] = {
        cardID: brawler.cardID,
        skins: brawler.skins,
        trophies: brawler.trophies,
        highestTrophies: brawler.highestTrophies,
        powerlevel: brawler.powerlevel,
        powerpoints: brawler.powerpoints,
        state: brawler.state,
        masteryPoints: brawler.masteryPoints,
        masteryClaimed: brawler.masteryClaimed,
        winstreak: brawler.winstreak
      };
      data.events = config2.events;
      data.rankedCurrent = config2.rankedCurrent;
      data.rankedHighest = config2.rankedHighest;
      data.prestige = config2.prestige;
      data.fameCredits = config2.fameCredits;
      data.favouriteBrawler = config2.favouriteBrawler;
      data.rankedReputation = config2.rankedReputation;
      data.randomBotNames = config2.randomBotNames;
      data.draftMapLimit = config2.draftMapLimit;
      data.winstreak = config2.winstreak;
      data.winstreakBrawler = config2.winstreakBrawler;
      data.creationDate = config2.creationDate;
      data.previousStats = {
        highestRoboRumbleLvlPassed: config2.highestRoboRumbleLvlPassed,
        highestBossFightLvlPassed: config2.highestBossFightLvlPassed,
        highestRampageLvlPassed: config2.highestRampageLvlPassed,
        challengeWins: config2.challengeWins,
        highestClubLeague: config2.highestClubLeague,
        highestSoloLeague: config2.highestSoloLeague,
        r35brawlers: config2.r35brawlers
      };
      data.teamExperiment = config2.teamExperiment;
      data.logLevel = config2.logLevel;
      data.enableSupercellID = config2.enableSupercellID;
      data.customSettings = config2.customSettings;
      data.brawlpass = {
        enabled: config2.enableBrawlPass,
        hasPremium: config2.brawlPassPremium,
        hasPlus: config2.plus,
        tokens: config2.passTokens
      };
    }
    const remove = new NativeFunction(libc.getExportByName("remove"), "int", [
      "pointer"
    ]);
    remove(Memory.allocUtf8String(configPath));
    File.writeAllText(configPath, JSON.stringify(data, null, 2));
  }

  // src/version/v59/android/arm64/version.ts
  var version = {
    gmv: 59,
    platform: "android",
    offsets: {
      ServerConnectionUpdate: "0x60fda8",
      HasConnectFailed: 8,
      State: 24,
      MessageManagerInstance: "0xf2ed50",
      MessageManagerReceiveMessage: "0x604eac",
      SendMessage: "0x604cd8",
      Send: "0xb03bec",
      CreateMessageByType: "0x87a818",
      LogicLaserMessageFactory: "0xe5152e",
      GetMessageType: 40,
      Destruct: 56,
      Encode: 16,
      Decode: 24,
      Messaging: 72,
      Version: 136,
      PayloadOffset: 20,
      PayloadSize: 24,
      PayloadPtr: 56,
      ByteStream: 8,
      IsDev: "0x780274",
      IsProd: "0x78027c",
      IsDeveloperBuild: "0x7802ac",
      IsChinaVersion: "0x780294",
      DebuggerWarning: "0x98ef9c",
      DebuggerError: "0x98f03c",
      StringConstructor: "0xb14f28",
      StartGame: "0x7264d8",
      OperatorNew: "0xdffca0",
      SetTextAndScaleIfNecessary: "0x776bf0",
      UpdateLoadingProgress: "0x768438",
      GotoAndStopFrameIndex: "0x951044",
      LoadingText: 120,
      LoadingPercent: 64,
      LoadingAlpha: 56,
      GetHelpfulHandState: "0x7386cc",
      StringTableGetString: "0x76a5e4",
      GetPlayerDraftMapNumLimit: "0x8760a0",
      GetPlayerCount: "0x912b14",
      GlobalID: 32,
      WriteDataReference: "0x91185c",
      WriteVInt: "0x98e210",
      WriteInt: "0x98d8bc",
      WriteBoolean: "0x98d660",
      WriteLongLong: "0x98eb3c",
      WriteString: "0x98d200",
      ReadGlobalID: "0x911948",
      ReadVInt: "0x98e498",
      ReadInt: "0x98dc74",
      ReadBoolean: "0x98d748",
      ReadLongLong: "0x98ddd8",
      ReadString: "0x98d310",
      ReadVLong: "0x98e928",
      DecodeLogicLong: "0x9114ac",
      IsSupercellIDEnabled: "0x75290c",
      SettingsScreenConstructor: "0x751588",
      AddGameButton: "0x475fec",
      GetX: "0x94cf54",
      SetX: "0x94cef4",
      GetY: "0x94cfa8",
      SetY: "0x94cef",
      SetXY: "0x94cf04",
      GetWidth: "0x94d410",
      SetWidth: "0x94d548",
      GetHeight: "0x94d480",
      SetHeight: "0x94d4fc",
      GameButtonConstructor: "0x475230",
      SetText: "0x97c510",
      GetMovieClip: "0x928660",
      InitFn: 352,
      StageInstance: "0xf330f0",
      SpriteAddChild: "0x95e4b4",
      ButtonText: 96,
      GetTextFieldByName: "0x9520f8",
      SetMultiline: "0x97c928",
      AutoAdjustText: "0x7773d0",
      GetFontSize: "0x97c8d8",
      SetFontSize: "0x97c4bc",
      HomePageConstructor: "0x71b050",
      LoadAsset: "0x3b4c3c",
      SetTextFieldVerticallyCentered: "0x776818",
      ButtonPressed: "0x97fff8",
      ShowFloaterTextAtDefaultPos: "0x46fddc",
      GUIInstance: "0xf2e968"
    }
  };

  // src/offsets.ts
  var Offsets;
  function setupOffsets() {
    const offsets = version.offsets;
    Offsets = Object.fromEntries(
      Object.entries(offsets).map(([k, v]) => [k, String(v)])
    );
  }

  // src/platform.ts
  var isAndroid = Process.platform === "linux";

  // src/util.ts
  var read = new NativeFunction(
    Process.getModuleByName(
      isAndroid ? "libc.so" : "libSystem.B.dylib"
    ).getExportByName("read"),
    "int",
    ["int", "pointer", "int"]
  );
  var open = new NativeFunction(
    Process.getModuleByName(
      isAndroid ? "libc.so" : "libSystem.B.dylib"
    ).getExportByName("open"),
    "int",
    ["pointer", "int", "int"]
  );
  var close = new NativeFunction(
    Process.getModuleByName(
      isAndroid ? "libc.so" : "libSystem.B.dylib"
    ).getExportByName("close"),
    "int",
    ["int"]
  );
  function getPackageName() {
    const buf = Memory.alloc(4096);
    const fd = open(Memory.allocUtf8String("/proc/self/cmdline"), 0, 0);
    const n = read(fd, buf, 4096);
    close(fd);
    if (n <= 0) return "";
    const arr = new Uint8Array(buf.readByteArray(n));
    return String.fromCharCode(...arr).replace(/\0+$/, "");
  }
  function getMessageManagerInstance() {
    return base.add(Offsets.MessageManagerInstance).readPointer();
  }
  function getDocumentsDirectory() {
    if (!isAndroid) {
      var NSFileManager = ObjC.classes.NSFileManager;
      var fm = NSFileManager.defaultManager();
      let docsPath = fm.URLsForDirectory_inDomains_(9, 1).objectAtIndex_(0).path().toString();
      return docsPath;
    } else {
      let path = `/storage/emulated/0/Android/media/${pkgName}`;
      mkdir(Memory.allocUtf8String(path), 777);
      return path;
    }
  }
  function decodeString(src) {
    let len = src.add(4).readInt();
    if (len >= 8) {
      return src.add(8).readPointer().readUtf8String(len);
    }
    return src.add(8).readUtf8String(len);
  }
  function createStringObject(text) {
    let ptr2 = malloc(128);
    stringCtor(ptr2, Memory.allocUtf8String(text));
    return ptr2;
  }
  function utf8ArrayToString(array) {
    let out = "", i = 0, len = array.length;
    while (i < len) {
      let c = array[i++];
      if (c < 128) {
        out += String.fromCharCode(c);
      } else if (c > 191 && c < 224) {
        let c2 = array[i++];
        out += String.fromCharCode((c & 31) << 6 | c2 & 63);
      } else {
        let c2 = array[i++];
        let c3 = array[i++];
        out += String.fromCharCode(
          (c & 15) << 12 | (c2 & 63) << 6 | c3 & 63
        );
      }
    }
    return out;
  }
  function stringToUtf8Array(str) {
    let utf8 = [];
    for (let i = 0; i < str.length; i++) {
      let charcode = str.charCodeAt(i);
      if (charcode < 128) {
        utf8.push(charcode);
      } else if (charcode < 2048) {
        utf8.push(192 | charcode >> 6, 128 | charcode & 63);
      } else if (charcode < 55296 || charcode >= 57344) {
        utf8.push(
          224 | charcode >> 12,
          128 | charcode >> 6 & 63,
          128 | charcode & 63
        );
      } else {
        i++;
        let surrogatePair = 65536 + ((charcode & 1023) << 10 | str.charCodeAt(i) & 1023);
        utf8.push(
          240 | surrogatePair >> 18,
          128 | surrogatePair >> 12 & 63,
          128 | surrogatePair >> 6 & 63,
          128 | surrogatePair & 63
        );
      }
    }
    return new Uint8Array(utf8);
  }
  function calculateTrophies(brawlerData) {
    let trophies = 0;
    for (const [_, brawler] of Object.entries(
      brawlerData
    )) {
      trophies += brawler.highestTrophies;
    }
    return trophies;
  }
  function calculateHighestTrophies(brawlerData) {
    let trophies = 0;
    for (const [_, brawler] of Object.entries(
      brawlerData
    )) {
      trophies += brawler.highestTrophies;
    }
    return trophies;
  }
  function shuffle(arr) {
    let idx = arr.length;
    while (idx != 0) {
      let shuffledIdx = Math.floor(Math.random() * idx);
      idx--;
      [arr[idx], arr[shuffledIdx]] = [arr[shuffledIdx], arr[idx]];
    }
    return arr;
  }
  function getBotNames(n) {
    let arr = [];
    let i = 1;
    while (true) {
      let name = decodeString(
        getString(Memory.allocUtf8String("TID_BOT_" + i.toString()))
      );
      if (!name) throw new Error("name is null");
      if (i >= n && name.startsWith("TID_")) break;
      i++;
      arr.push(name);
    }
    return shuffle(arr);
  }

  // src/definitions.ts
  var base = NULL;
  var libc = isAndroid ? Process.getModuleByName("libc.so") : Process.getModuleByName("libSystem.B.dylib");
  var malloc = new NativeFunction(
    libc.getExportByName("malloc"),
    "pointer",
    ["uint"]
  );
  var mkdir = new NativeFunction(libc.getExportByName("mkdir"), "int", [
    "pointer",
    "int"
  ]);
  var documentsDirectory;
  var configPath;
  var config;
  var pkgName;
  var botNames;
  var createMessageByType;
  var operator_new;
  var messageManagerReceiveMessage;
  var stringCtor;
  var messagingSend;
  var setTextAndScaleIfNecessary;
  var getString;
  var setText;
  var getMovieClip;
  var gameButtonConstructor;
  var addChild;
  var gotoAndStop;
  var getTextFieldByName;
  var getX;
  var setX;
  var getY;
  var setY;
  var setXY;
  var getWidth;
  var setWidth;
  var getHeight;
  var setHeight;
  var setMultiline;
  var autoAdjustText;
  var getFontSize;
  var setFontSize;
  var loadAsset;
  var setVerticallyCentered;
  var showFloaterText;
  var buttonHandlers = [];
  function load() {
    setupOffsets();
    pkgName = getPackageName();
    documentsDirectory = getDocumentsDirectory();
    configPath = documentsDirectory + "/config.json";
    config = readConfig();
    createMessageByType = new NativeFunction(
      base.add(Offsets.CreateMessageByType),
      "pointer",
      ["pointer", "int"]
    );
    operator_new = new NativeFunction(base.add(Offsets.OperatorNew), "pointer", [
      "uint"
    ]);
    messageManagerReceiveMessage = new NativeFunction(
      base.add(
        isAndroid ? Offsets.MessageManagerReceiveMessage : Offsets.MessageManagerReceiveMessageThunk
      ),
      "int",
      ["pointer", "pointer"]
    );
    stringCtor = new NativeFunction(
      base.add(Offsets.StringConstructor),
      "pointer",
      ["pointer", "pointer"]
    );
    messagingSend = new NativeFunction(base.add(Offsets.Send), "bool", [
      "pointer",
      "pointer"
    ]);
    setTextAndScaleIfNecessary = new NativeFunction(
      base.add(Offsets.SetTextAndScaleIfNecessary),
      "void",
      ["pointer", "pointer", "bool", "bool"]
    );
    getString = new NativeFunction(
      base.add(
        isAndroid ? Offsets.StringTableGetString : Offsets.StringTableGetStringThunk
      ),
      "pointer",
      ["pointer"]
    );
    if (version.gmv == 59) {
      setText = new NativeFunction(base.add(Offsets.SetText), "int64", [
        "pointer",
        "pointer"
      ]);
      getMovieClip = new NativeFunction(
        base.add(Offsets.GetMovieClip),
        "pointer",
        ["pointer", "pointer", "bool"]
      );
      gameButtonConstructor = new NativeFunction(
        base.add(Offsets.GameButtonConstructor),
        "void",
        ["pointer"]
      );
      addChild = new NativeFunction(base.add(Offsets.SpriteAddChild), "void", [
        "pointer",
        "pointer"
      ]);
      gotoAndStop = new NativeFunction(
        base.add(Offsets.GotoAndStopFrameIndex),
        "void",
        ["pointer", "int"]
      );
      getTextFieldByName = new NativeFunction(
        base.add(Offsets.GetTextFieldByName),
        "pointer",
        ["pointer", "pointer"]
      );
      getWidth = new NativeFunction(base.add(Offsets.GetWidth), "float", [
        "pointer"
      ]);
      setWidth = new NativeFunction(base.add(Offsets.SetWidth), "void", [
        "pointer",
        "float"
      ]);
      getHeight = new NativeFunction(base.add(Offsets.GetHeight), "float", [
        "pointer"
      ]);
      setHeight = new NativeFunction(base.add(Offsets.SetHeight), "void", [
        "pointer",
        "float"
      ]);
      setMultiline = new NativeFunction(base.add(Offsets.SetMultiline), "void", [
        "pointer",
        "bool"
      ]);
      autoAdjustText = new NativeFunction(
        base.add(Offsets.AutoAdjustText),
        "void",
        ["pointer", "int", "int", "int"]
      );
      getFontSize = new NativeFunction(base.add(Offsets.GetFontSize), "int", [
        "pointer"
      ]);
      setFontSize = new NativeFunction(base.add(Offsets.SetFontSize), "void", [
        "pointer",
        "int"
      ]);
      loadAsset = new NativeFunction(base.add(Offsets.LoadAsset), "bool", [
        "pointer",
        "bool"
      ]);
      setVerticallyCentered = new NativeFunction(
        base.add(Offsets.SetTextFieldVerticallyCentered),
        "void",
        ["pointer"]
      );
      showFloaterText = new NativeFunction(
        base.add(Offsets.ShowFloaterTextAtDefaultPos),
        "pointer",
        ["pointer", "pointer", "int64", "float"]
      );
    }
    getX = new NativeFunction(base.add(Offsets.GetX), "float", ["pointer"]);
    setX = new NativeFunction(base.add(Offsets.SetX), "void", [
      "pointer",
      "float"
    ]);
    getY = new NativeFunction(base.add(Offsets.GetY), "float", ["pointer"]);
    setY = new NativeFunction(base.add(Offsets.SetY), "void", [
      "pointer",
      "float"
    ]);
    setXY = new NativeFunction(base.add(Offsets.SetXY), "void", [
      "pointer",
      "float",
      "float"
    ]);
  }
  function setBase(ptr2) {
    base = ptr2;
  }
  function setBotNames(x) {
    botNames = x;
  }

  // src/piranhamessage.ts
  var PiranhaMessage = class {
    static getMessageType(message) {
      let vtable = message.readPointer();
      let getMessageType = new NativeFunction(vtable.add(Offsets.GetMessageType).readPointer(), "int", []);
      return getMessageType();
    }
    static destroyMessage(message) {
      let vtable = message.readPointer();
      let destroyMessage = new NativeFunction(vtable.add(Offsets.Destruct).readPointer(), "void", ["pointer"]);
      return destroyMessage(message);
    }
    static getEncodingLength(message) {
      let stream = this.getByteStream(message);
      let size = stream.add(Offsets.PayloadSize).readS32();
      let offset = stream.add(Offsets.PayloadOffset).readS32();
      return offset > size ? offset : size;
    }
    static getByteStream(message) {
      return message.add(Offsets.ByteStream);
    }
    static encode(message) {
      let vtable = message.readPointer();
      const encode = new NativeFunction(vtable.add(Offsets.Encode).readPointer(), "pointer", ["pointer"]);
      return encode(message);
    }
  };

  // src/bytestream.ts
  var ByteStream = class {
    payload;
    bitoffset;
    offset;
    constructor(payload) {
      this.payload = payload;
      this.bitoffset = 0;
      this.offset = 0;
    }
    readBytesLength() {
      this.bitoffset = 0;
      const b1 = this.payload[this.offset++];
      const b2 = this.payload[this.offset++];
      const b3 = this.payload[this.offset++];
      const b4 = this.payload[this.offset++];
      return b1 << 24 >>> 0 | b2 << 16 | b3 << 8 | b4;
    }
    readInt() {
      this.bitoffset = 0;
      let result = this.payload[this.offset] << 24 >>> 0 | this.payload[this.offset + 1] << 16 | this.payload[this.offset + 2] << 8 | this.payload[this.offset + 3];
      this.offset += 4;
      return result;
    }
    readByte() {
      this.bitoffset = 0;
      let result = this.payload[this.offset];
      this.offset++;
      return result;
    }
    readShort() {
      this.bitoffset = 0;
      let result = this.payload[this.offset] << 8 | this.payload[this.offset + 1];
      this.offset += 2;
      return result;
    }
    readLong() {
      this.bitoffset = 0;
      let high = this.readInt();
      let low = this.readInt();
      return Number(BigInt(high) << 32n | BigInt(low >>> 0));
    }
    readString(maxCapacity = 9e6) {
      this.bitoffset = 0;
      const length = this.readBytesLength();
      if (length < 0 || length > maxCapacity) {
        throw Error("invalid string length");
      }
      const bytes = this.payload.slice(this.offset, this.offset + length);
      this.offset += length;
      return utf8ArrayToString(new Uint8Array(bytes));
    }
    readStringReference(maxCapacity = 9e6) {
      this.bitoffset = 0;
      const length = this.readBytesLength();
      if (length < 0 || length > maxCapacity) {
        return "";
      }
      const bytes = this.payload.slice(this.offset, this.offset + length);
      this.offset += length;
      return utf8ArrayToString(new Uint8Array(bytes));
    }
    writeDataReference(classID, instanceID) {
      this.bitoffset = 0;
      this.writeVInt(classID);
      if (classID != 0) this.writeVInt(instanceID);
    }
    readVInt() {
      let start = this.offset;
      this.bitoffset = 0;
      let b0 = this.payload[start];
      this.offset = start + 1;
      let result = b0 & 63;
      if (b0 & 64) {
        if (b0 & 128) {
          let b1 = this.payload[start + 1];
          result = result | (b1 & 127) << 6;
          this.offset = start + 2;
          if (b1 & 128) {
            let b2 = this.payload[start + 2];
            result = result | (b2 & 127) << 13;
            this.offset = start + 3;
            if (b2 & 128) {
              let b3 = this.payload[start + 3];
              result = result | (b3 & 127) << 20;
              this.offset = start + 4;
              if (b3 & 128) {
                let b4 = this.payload[start + 4];
                this.offset = start + 5;
                result = result | b4 << 27;
              }
            }
          }
        }
        result = -(result | 4294967232 << (this.offset - start - 1) * 7 - 6);
      } else if (b0 & 128) {
        let b1 = this.payload[start + 1];
        result = result | (b1 & 127) << 6;
        this.offset = start + 2;
        if (b1 & 128) {
          let b2 = this.payload[start + 2];
          result = result | (b2 & 127) << 13;
          this.offset = start + 3;
          if (b2 & 128) {
            let b3 = this.payload[start + 3];
            result = result | (b3 & 127) << 20;
            this.offset = start + 4;
            if (b3 & 128) {
              let b4 = this.payload[start + 4];
              this.offset = start + 5;
              result = result | b4 << 27;
            }
          }
        }
      }
      return result;
    }
    readVLong() {
      let high = this.readVInt();
      let low = this.readVInt();
      return Number(BigInt(high) << 32n | BigInt(low >>> 0));
    }
    readVLongAsLong() {
      let high = this.readVInt();
      let low = this.readVInt();
      return new Long(high, low);
    }
    readBoolean() {
      this.bitoffset = 0;
      return this.payload[this.offset++] !== 0;
    }
    readDataReference() {
      const high = this.readVInt();
      if (high === 0) {
        return { high: 0, low: 0 };
      }
      const low = this.readVInt();
      return { high, low };
    }
    writeByte(value) {
      this.bitoffset = 0;
      this.payload.push(value & 255);
      this.offset++;
    }
    writeShort(value) {
      this.bitoffset = 0;
      this.payload.push(value >> 8 & 255);
      this.payload.push(value & 255);
      this.offset += 2;
    }
    writeInt(value) {
      this.bitoffset = 0;
      this.payload.push(value >> 24 & 255);
      this.payload.push(value >> 16 & 255);
      this.payload.push(value >> 8 & 255);
      this.payload.push(value & 255);
      this.offset += 4;
    }
    writeString(str) {
      this.bitoffset = 0;
      let bytes = stringToUtf8Array(str);
      this.writeInt(bytes.length);
      for (let i = 0; i < bytes.length; i++) {
        this.writeByte(bytes[i]);
      }
    }
    writeVInt(value) {
      this.bitoffset = 0;
      if (value < 0) {
        if (value >= -63) {
          this.payload.push(value & 63 | 64);
          this.offset += 1;
        } else if (value >= -8191) {
          this.payload.push(value & 63 | 192);
          this.payload.push(value >> 6 & 127);
          this.offset += 2;
        } else if (value >= -1048575) {
          this.payload.push(value & 63 | 192);
          this.payload.push(value >> 6 & 127 | 128);
          this.payload.push(value >> 13 & 127);
          this.offset += 3;
        } else if (value >= -134217727) {
          this.payload.push(value & 63 | 192);
          this.payload.push(value >> 6 & 127 | 128);
          this.payload.push(value >> 13 & 127 | 128);
          this.payload.push(value >> 20 & 127);
          this.offset += 4;
        } else {
          this.payload.push(value & 63 | 192);
          this.payload.push(value >> 6 & 127 | 128);
          this.payload.push(value >> 13 & 127 | 128);
          this.payload.push(value >> 20 & 127 | 128);
          this.payload.push(value >> 27 & 15);
          this.offset += 5;
        }
      } else {
        if (value <= 63) {
          this.payload.push(value & 63);
          this.offset += 1;
        } else if (value <= 8191) {
          this.payload.push(value & 63 | 128);
          this.payload.push(value >> 6 & 127);
          this.offset += 2;
        } else if (value <= 1048575) {
          this.payload.push(value & 63 | 128);
          this.payload.push(value >> 6 & 127 | 128);
          this.payload.push(value >> 13 & 127);
          this.offset += 3;
        } else if (value <= 134217727) {
          this.payload.push(value & 63 | 128);
          this.payload.push(value >> 6 & 127 | 128);
          this.payload.push(value >> 13 & 127 | 128);
          this.payload.push(value >> 20 & 127);
          this.offset += 4;
        } else {
          this.payload.push(value & 63 | 128);
          this.payload.push(value >> 6 & 127 | 128);
          this.payload.push(value >> 13 & 127 | 128);
          this.payload.push(value >> 20 & 127 | 128);
          this.payload.push(value >> 27 & 15);
          this.offset += 5;
        }
      }
    }
    writeVLong(high, low) {
      this.bitoffset = 0;
      this.writeVInt(high);
      this.writeVInt(low);
    }
    writeBoolean(value) {
      if (this.bitoffset == 0) {
        this.payload.push(0);
        this.offset++;
      }
      if (value) {
        this.payload[this.offset - 1] |= 1 << (this.bitoffset & 7);
      }
      this.bitoffset = this.bitoffset + 1 & 7;
    }
    writeLong(high, low) {
      this.bitoffset = 0;
      this.writeInt(high);
      this.writeInt(low);
    }
    writeHexa(hex) {
      for (let i = 0; i < hex.length; i += 2) {
        const byteStr = hex.substring(i, i + 2);
        const byte = parseInt(byteStr, 16);
        if (isNaN(byte)) {
          throw new Error(`invalid hex: ${byteStr}`);
        }
        this.writeByte(byte);
      }
    }
    writeBytes(value, length) {
      this.writeInt(length);
      for (let i = 0; i < length; i++) {
        this.payload[this.offset + i] = value[i] & 255;
      }
      this.offset += length;
    }
  };

  // src/teams/teamentry.ts
  var TeamEntry = class {
    id;
    type = 0;
    locationID = 0;
    teamMembers = [];
    constructor(id, type, locationID) {
      this.id = id;
      this.type = type;
      this.locationID = locationID;
    }
    encode(stream) {
      stream.writeVInt(this.type);
      stream.writeBoolean(this.type == 1);
      stream.writeVInt(3);
      stream.writeLong(this.id.high, this.id.low);
      stream.writeVInt(0);
      stream.writeBoolean(false);
      stream.writeBoolean(false);
      for (let i = 0; i < 3; i++) {
        stream.writeVInt(0);
      }
      stream.writeDataReference(15, 8);
      stream.writeBoolean(false);
      stream.writeVInt(this.teamMembers.length);
      stream = this.teamMembers.reduce((prev, x) => {
        return x.encode(prev);
      }, stream);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeBoolean(true);
      stream.writeBoolean(false);
      stream.writeBoolean(false);
      stream.writeBoolean(false);
      return stream;
    }
  };

  // src/playerdisplaydata.ts
  var PlayerDisplayData = class {
    name = "Natesworks";
    thumbnail = 0;
    namecolor = 0;
    constructor(name, thumbnail, namecolor) {
      this.name = name;
      this.thumbnail = thumbnail;
      this.namecolor = namecolor;
    }
    encode(stream) {
      stream.writeString(this.name);
      stream.writeVInt(100);
      stream.writeVInt(28e6 + this.thumbnail);
      stream.writeVInt(43e6 + this.namecolor);
      stream.writeVInt(43e6 + this.namecolor);
      if (version.gmv == 64) {
        stream.writeBoolean(false);
        stream.writeVInt(0);
        stream.writeVInt(0);
      }
      return stream;
    }
  };

  // src/teams/teammember.ts
  var TeamMember = class {
    isOwner = true;
    state = 0;
    playerDisplayData;
    characterID = 0;
    ready = false;
    constructor(isOwner, state) {
      this.isOwner = isOwner;
      this.state = state;
      this.characterID = config.selectedBrawlers[0];
      this.playerDisplayData = new PlayerDisplayData(
        config.name,
        config.thumbnail,
        config.namecolor
      );
    }
    encode(stream) {
      stream.writeBoolean(this.isOwner);
      stream.writeLong(0, 1);
      stream.writeDataReference(16, this.characterID);
      stream.writeDataReference(29, 0);
      stream.writeVInt(1e3);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(this.state);
      stream.writeBoolean(this.ready);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream = this.playerDisplayData.encode(stream);
      for (let i = 0; i < 5; i++) {
        stream.writeVInt(0);
      }
      stream.writeVInt(0);
      return stream;
    }
  };

  // src/teams/teammanager.ts
  var TeamManager = class {
    static createTeam() {
      let entry = new TeamEntry(new Long(0, 1), 1, 5);
      entry.teamMembers.push(new TeamMember(true, 3));
      let stream = new ByteStream([]);
      Messaging.sendOfflineMessage(24124, entry.encode(stream).payload);
    }
  };

  // src/packets/server/ownhomedatamessage/v59/ownhomedatamessage.ts
  var OwnHomeDataMessage = class {
    static encode() {
      let stream = new ByteStream([]);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(calculateTrophies(config.ownedBrawlers));
      stream.writeVInt(calculateHighestTrophies(config.ownedBrawlers));
      stream.writeVInt(calculateHighestTrophies(config.ownedBrawlers));
      stream.writeVInt(config.trophyRoadTier);
      stream.writeVInt(config.experience);
      stream.writeDataReference(28, config.thumbnail);
      stream.writeDataReference(43, config.namecolor);
      stream.writeVInt(38);
      for (let i = 0; i < 38; i++) stream.writeVInt(i);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(config.ownedSkins.length);
      config.ownedSkins.forEach((x) => stream.writeDataReference(29, x));
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(calculateHighestTrophies(config.ownedBrawlers));
      stream.writeVInt(0);
      stream.writeVInt(2);
      stream.writeBoolean(false);
      stream.writeVInt(config.tokenDoublers);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(120);
      stream.writeVInt(200);
      stream.writeVInt(0);
      stream.writeBoolean(true);
      stream.writeVInt(2);
      stream.writeVInt(2);
      stream.writeVInt(2);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(1);
      stream.writeVInt(30);
      stream.writeByte(config.selectedBrawlers.length);
      for (const brawler of config.selectedBrawlers) {
        stream.writeDataReference(16, brawler);
      }
      stream.writeString(config.region);
      stream.writeString(config.supportedCreator);
      stream.writeVInt(23);
      stream.writeVLong(config.rankedReputation, 41);
      stream.writeDataReference(2, 1);
      stream.writeDataReference(3, 0);
      stream.writeDataReference(4, 0);
      stream.writeDataReference(6, 0);
      stream.writeDataReference(7, 0);
      stream.writeDataReference(8, 0);
      stream.writeDataReference(9, 1);
      stream.writeDataReference(10, 0);
      stream.writeDataReference(12, 1);
      stream.writeDataReference(14, 0);
      stream.writeDataReference(15, 1);
      stream.writeDataReference(16, 1);
      stream.writeDataReference(17, 0);
      stream.writeDataReference(18, 0);
      stream.writeDataReference(19, 0);
      stream.writeDataReference(20, 0);
      stream.writeDataReference(21, 1);
      stream.writeDataReference(22, 1);
      stream.writeDataReference(23, 0);
      stream.writeDataReference(24, 1);
      stream.writeDataReference(32447, 28);
      stream.writeDataReference(16, 5);
      stream.writeVInt(0);
      stream.writeVInt(1);
      stream.writeVInt(35 - 1);
      stream.writeVInt(config.passTokens);
      stream.writeBoolean(config.brawlPassPremium);
      stream.writeVInt(0);
      stream.writeBoolean(false);
      stream.writeBoolean(true);
      stream.writeInt(-1);
      stream.writeInt(-1);
      stream.writeInt(-1);
      stream.writeInt(-1);
      stream.writeBoolean(true);
      stream.writeInt(-1);
      stream.writeInt(-1);
      stream.writeInt(-1);
      stream.writeInt(-1);
      stream.writeBoolean(config.plus);
      stream.writeBoolean(true);
      stream.writeInt(-1);
      stream.writeInt(-1);
      stream.writeInt(-1);
      stream.writeInt(-1);
      stream.writeBoolean(true);
      stream.writeVInt(0);
      stream.writeVInt(1);
      stream.writeVInt(2);
      stream.writeVInt(0);
      stream.writeBoolean(true);
      stream.writeVInt(
        config.ownedThumbnails.length + config.ownedPins.length + 1
      );
      config.ownedThumbnails.forEach((x) => {
        stream.writeDataReference(28, x);
        stream.writeVInt(0);
      });
      config.ownedPins.forEach((x) => {
        stream.writeDataReference(52, x);
        stream.writeVInt(0);
      });
      stream.writeDataReference(28, 186);
      stream.writeVInt(0);
      stream.writeBoolean(false);
      stream.writeInt(0);
      stream.writeVInt(0);
      stream.writeDataReference(16, config.favouriteBrawler);
      stream.writeBoolean(false);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(-1);
      stream.writeVInt(40);
      for (let i = 0; i < 40; i++) stream.writeVInt(i);
      stream.writeVInt(config.events.length);
      for (const event of config.events) {
        stream.writeVInt(-1);
        stream.writeVInt(event.slot);
        stream.writeVInt(0);
        stream.writeVInt(0);
        stream.writeVInt(0);
        stream.writeVInt(10);
        stream.writeDataReference(15, event.mapID);
        stream.writeVInt(-1);
        stream.writeVInt(2);
        stream.writeString("");
        stream.writeVInt(0);
        stream.writeVInt(0);
        if ([20, 21, 22, 23, 24, 35, 36].includes(event.slot) && event.championShipInfo) {
          stream.writeVInt(event.championShipInfo.maxWins);
        } else {
          stream.writeVInt(0);
        }
        stream.writeVInt(0);
        stream.writeVInt(0);
        stream.writeVInt(6);
        stream.writeBoolean(false);
        stream.writeVInt(0);
        stream.writeBoolean(false);
        stream.writeVInt(0);
        stream.writeVInt(0);
        if ([20, 21, 22, 23, 24, 35, 36].includes(event.slot) && event.championShipInfo) {
          stream.writeBoolean(true);
          stream.writeString(event.championShipInfo.chronosTextEntry);
          stream.writeVInt(0);
        } else {
          stream.writeBoolean(false);
        }
        stream.writeBoolean(false);
        stream.writeBoolean(false);
        if ([20, 21, 22, 23, 24].includes(event.slot) && event.championShipInfo) {
          stream.writeBoolean(true);
          const offer = event.championShipInfo.logicGemOffer;
          stream.writeVInt(offer.id);
          stream.writeVInt(offer.amount);
          stream.writeDataReference(offer.csvID[0], offer.csvID[1]);
          stream.writeVInt(offer.skinID);
        } else {
          stream.writeBoolean(false);
        }
        stream.writeVInt(1);
        stream.writeVInt(6);
        if ([20, 21, 22, 23, 24, 35, 36].includes(event.slot) && event.championShipInfo) {
          stream.writeBoolean(true);
          const entry = event.championShipInfo.chronosFileEntry;
          stream.writeString(entry.scName);
          stream.writeString(entry.scFile);
        }
        stream.writeBoolean(false);
        stream.writeBoolean(false);
        stream.writeVInt(-1);
        stream.writeVInt(0);
        stream.writeVInt(0);
        stream.writeVInt(0);
        stream.writeBoolean(false);
        stream.writeBoolean(false);
        stream.writeBoolean(false);
        stream.writeBoolean(false);
      }
      stream.writeVInt(0);
      const brawlerUpgradeCost = [
        20,
        35,
        75,
        140,
        290,
        480,
        800,
        1250,
        1875,
        2800
      ];
      const shopCoinsPrice = [20, 50, 140, 280];
      const shopCoinsAmount = [300, 880, 2040, 4680];
      stream.writeVInt(brawlerUpgradeCost.length);
      for (const cost of brawlerUpgradeCost) {
        stream.writeVInt(cost);
      }
      stream.writeVInt(shopCoinsPrice.length);
      for (const price of shopCoinsPrice) {
        stream.writeVInt(price);
      }
      stream.writeVInt(shopCoinsAmount.length);
      for (const amount of shopCoinsAmount) {
        stream.writeVInt(amount);
      }
      stream.writeVInt(0);
      stream.writeVInt(6);
      stream.writeDataReference(41000117, 1);
      stream.writeDataReference(89, 6);
      stream.writeDataReference(22, 0);
      stream.writeDataReference(36, 1);
      stream.writeDataReference(73, 1);
      stream.writeDataReference(16, 5);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(1);
      stream.writeVInt(1);
      stream.writeBoolean(true);
      stream.writeString("1a1d6744f7dfb7bcfa54e3876c944b1da9d075db");
      stream.writeString(
        "/3f8dc547-1aed-4d85-81b0-32ead16f7474_collab_toystory.sc"
      );
      stream.writeVInt(83);
      stream.writeVInt(6);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeLong(config.id.high, config.id.low);
      stream.writeVInt(0);
      stream.writeVInt(1);
      stream.writeBoolean(false);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeBoolean(false);
      stream.writeBoolean(false);
      stream.writeBoolean(false);
      stream.writeVInt(0);
      stream.writeBoolean(true);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(1);
      stream.writeDataReference(16, 0);
      stream.writeVInt(2);
      stream.writeVInt(1e4);
      stream.writeVInt(0);
      stream.writeVInt(1);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(Object.keys(config.ownedBrawlers).length);
      for (const [brawlerID, brawlerData] of Object.entries(
        config.ownedBrawlers
      )) {
        stream.writeVInt(brawlerData.masteryPoints);
        stream.writeVInt(brawlerData.masteryClaimed);
        stream.writeDataReference(16, Number(brawlerID));
      }
      stream.writeDataReference(100, 1);
      stream.writeDataReference(28, -1);
      stream.writeDataReference(28, -1);
      stream.writeDataReference(52, -1);
      stream.writeDataReference(76, -1);
      stream.writeBoolean(false);
      stream.writeBoolean(false);
      stream.writeBoolean(false);
      stream.writeBoolean(false);
      stream.writeVInt(0);
      stream.writeVInt(14);
      for (let i = 0; i < 14; i++) {
        stream.writeDataReference(80, i);
        stream.writeVInt(-1);
        stream.writeVInt(0);
      }
      stream.writeVInt(0);
      stream.writeInt(-1435281534);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(86400 * 24);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeBoolean(false);
      stream.writeBoolean(false);
      stream.writeBoolean(false);
      stream.writeBoolean(false);
      stream.writeVInt(0);
      stream.writeBoolean(false);
      stream.writeVLong(config.id.high, config.id.low);
      stream.writeVLong(config.id.high, config.id.low);
      stream.writeVLong(config.id.high, config.id.low);
      stream.writeString(config.name);
      stream.writeBoolean(config.registered);
      stream.writeInt(-1);
      let count = 24;
      const unlockedBrawler = Object.values(config.ownedBrawlers).map(
        (i) => i.cardID
      );
      stream.writeVInt(count);
      stream.writeVInt(unlockedBrawler.length + 3);
      for (const x of unlockedBrawler) {
        stream.writeDataReference(23, x);
        stream.writeVInt(-1);
        stream.writeVInt(1);
      }
      stream.writeDataReference(5, 8);
      stream.writeVInt(-1);
      stream.writeVInt(config.coins);
      stream.writeDataReference(5, 21);
      stream.writeVInt(-1);
      stream.writeVInt(0);
      stream.writeDataReference(5, 23);
      stream.writeVInt(-1);
      stream.writeVInt(config.bling);
      stream.writeVInt(Object.keys(config.ownedBrawlers).length);
      for (const [brawlerID, brawlerData] of Object.entries(
        config.ownedBrawlers
      )) {
        stream.writeDataReference(16, Number(brawlerID));
        stream.writeVInt(-1);
        stream.writeVInt(brawlerData.trophies);
      }
      stream.writeVInt(Object.keys(config.ownedBrawlers).length);
      for (const [brawlerID, brawlerData] of Object.entries(
        config.ownedBrawlers
      )) {
        stream.writeDataReference(16, Number(brawlerID));
        stream.writeVInt(-1);
        stream.writeVInt(brawlerData.highestTrophies);
      }
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(Object.keys(config.ownedBrawlers).length);
      for (const [brawlerID, brawlerData] of Object.entries(
        config.ownedBrawlers
      )) {
        stream.writeDataReference(16, Number(brawlerID));
        stream.writeVInt(-1);
        stream.writeVInt(brawlerData.powerlevel - 1);
      }
      stream.writeVInt(0);
      stream.writeVInt(Object.keys(config.ownedBrawlers).length);
      for (const [brawlerID, brawlerData] of Object.entries(
        config.ownedBrawlers
      )) {
        stream.writeDataReference(16, Number(brawlerID));
        stream.writeVInt(-1);
        stream.writeVInt(brawlerData.state);
      }
      for (let i = 0; i < count - 7; i++) {
        stream.writeVInt(0);
      }
      stream.writeVInt(config.gems);
      stream.writeVInt(config.gems);
      stream.writeVInt(config.experienceLevel);
      stream.writeVInt(100);
      stream.writeVInt(0);
      stream.writeVInt(100);
      stream.writeVInt(10);
      stream.writeVInt(80);
      stream.writeVInt(50);
      stream.writeVInt(20);
      stream.writeVInt(0);
      stream.writeVInt(config.tutorial ? 0 : 2);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeString("");
      stream.writeVInt(0);
      stream.writeVInt(0);
      return stream.payload;
    }
  };

  // src/packets/server/playerprofilemessage.ts
  var PlayerProfileMessage = class {
    static encode() {
      let stream = new ByteStream([]);
      stream.writeVLong(config.id.high, config.id.low);
      stream.writeDataReference(16, config.favouriteBrawler);
      stream.writeDataReference(16, config.winstreakBrawler);
      stream.writeVInt(1);
      stream.writeDataReference(16, 1);
      stream.writeDataReference(0, -1);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(1);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(16);
      stream.writeVInt(1);
      stream.writeVInt(config.trioWins);
      stream.writeVInt(8);
      stream.writeVInt(config.soloWins);
      stream.writeVInt(11);
      stream.writeVInt(config.duoWins);
      stream.writeVInt(29);
      stream.writeVInt(calculateTrophies(config.ownedBrawlers));
      stream.writeVInt(4);
      stream.writeVInt(calculateHighestTrophies(config.ownedBrawlers));
      stream.writeVInt(24);
      stream.writeVInt(config.rankedHighest);
      stream.writeVInt(25);
      stream.writeVInt(config.rankedCurrent);
      stream.writeVInt(20);
      stream.writeVInt(config.fameCredits);
      stream.writeVInt(27);
      stream.writeVInt(config.creationDate);
      stream.writeVInt(28);
      stream.writeVInt(config.r35brawlers);
      stream.writeVInt(9);
      stream.writeVInt(config.highestRoboRumbleLvlPassed);
      stream.writeVInt(12);
      stream.writeVInt(config.highestBossFightLvlPassed);
      stream.writeVInt(15);
      stream.writeVInt(config.mostChallengeWins);
      stream.writeVInt(16);
      stream.writeVInt(config.highestRampageLvlPassed);
      stream.writeVInt(18);
      stream.writeVInt(config.highestSoloLeague);
      stream.writeVInt(19);
      stream.writeVInt(config.highestClubLeague);
      let displaydata = new PlayerDisplayData(
        config.name,
        config.thumbnail,
        config.namecolor
      );
      stream = displaydata.encode(stream);
      stream.writeBoolean(false);
      stream.writeString("hello world");
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(config.winstreak);
      stream.writeDataReference(29, 0);
      stream.writeDataReference(0, -1);
      stream.writeDataReference(0, -1);
      stream.writeDataReference(0, -1);
      stream.writeDataReference(0, -1);
      stream.writeBoolean(false);
      stream.writeDataReference(0, 0);
      stream.writeVInt(0);
      return stream.payload;
    }
  };

  // src/packets/server/namechange/avatarnamecheckresponsemessage.ts
  var AvatarNameCheckResponseMessage = class {
    static encode(name) {
      let stream = new ByteStream([]);
      stream.writeBoolean(false);
      stream.writeInt(0);
      stream.writeString(name);
      return stream.payload;
    }
  };

  // src/packets/client/namechange/avatarnamecheckmessage.ts
  var AvatarNameCheckRequestMessage = class {
    static decode(stream) {
      return stream.readString();
    }
    static execute(name) {
      Messaging.sendOfflineMessage(
        20300,
        AvatarNameCheckResponseMessage.encode(name)
      );
    }
  };

  // src/logiccommand.ts
  var LogicCommand = class {
    static encode() {
      let stream = new ByteStream([]);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVLong(0, 0);
      return stream.payload;
    }
    static decode(stream) {
      stream.readVInt();
      stream.readVInt();
      stream.readVlong();
      return stream;
    }
  };

  // src/commands/server/logicchangeavatarnamecommand.ts
  var LogicChangeAvatarNameCommand = class {
    static encode() {
      let stream = new ByteStream([]);
      stream.writeVInt(201);
      stream.writeString(config.name);
      stream.writeVInt(0);
      stream.payload.concat(LogicCommand.encode());
      return stream.payload;
    }
  };

  // src/utility/logger.ts
  function getTimestamp() {
    const d = /* @__PURE__ */ new Date();
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yy = String(d.getFullYear()).slice(2);
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    return `[${dd}/${mm}/${yy} ${hh}:${mi}:${ss}]`;
  }
  function format(args) {
    return args.map((a) => {
      if (typeof a === "string") return a;
      if (a instanceof ArrayBuffer) {
        return Array.from(new Uint8Array(a)).map((b) => b.toString(16).padStart(2, "0")).join(" ");
      }
      if (a instanceof Uint8Array) {
        return Array.from(a).map((b) => b.toString(16).padStart(2, "0")).join(" ");
      }
      try {
        return String(a);
      } catch {
        return "[object]";
      }
    }).join(" ");
  }
  var Logger = class {
    static error(...args) {
      if (config.logLevel >= 5) return;
      const msg = format(args);
      const line = `${getTimestamp()} [ERROR] ${msg}`;
      console.log(line);
    }
    static warn(...args) {
      if (config.logLevel >= 4) return;
      const msg = format(args);
      const line = `${getTimestamp()} [WARN] ${msg}`;
      console.log(line);
    }
    static info(...args) {
      if (config.logLevel >= 3) return;
      const msg = format(args);
      const line = `${getTimestamp()} [INFO] ${msg}`;
      console.log(line);
    }
    static debug(...args) {
      if (config.logLevel >= 2) return;
      const msg = format(args);
      const line = `${getTimestamp()} [DEBUG] ${msg}`;
      console.log(line);
    }
    static verbose(...args) {
      if (config.logLevel != 0) return;
      const msg = format(args);
      const line = `${getTimestamp()} [VERBOSE] ${msg}`;
      console.log(line);
    }
  };

  // src/packets/client/namechange/changeavatarnamemessage.ts
  var ChangeAvatarNameMessage = class {
    static decode(stream) {
      return stream.readString();
    }
    static execute(name) {
      config.name = name;
      config.registered = true;
      writeConfig(config);
      Logger.verbose("Changed name to", name);
      Messaging.sendOfflineMessage(24111, LogicChangeAvatarNameCommand.encode());
    }
  };

  // src/commands/client/logicselectcharactercommand.ts
  var LogicSelectCharacterCommand = class {
    static decode(stream) {
      stream = LogicCommand.decode(stream);
      let character = stream.readDataReference().low;
      return { stream, character };
    }
    static execute(brawlerID) {
      Logger.verbose("New brawler id:", brawlerID);
      config.selectedBrawlers[0] = brawlerID;
      writeConfig(config);
    }
  };

  // src/commands/client/logicselectfavouriteherocommand.ts
  var LogicSelectFavouriteHeroCommand = class {
    static decode(stream) {
      stream = LogicCommand.decode(stream);
      let character = stream.readDataReference().low;
      return { stream, character };
    }
    static execute(characterID) {
      Logger.verbose("New favourite brawler id:", characterID);
      config.favouriteBrawler = characterID;
      writeConfig(config);
    }
  };

  // src/commands/client/logicselectskincommand.ts
  var LogicSelectSkinCommand = class {
    static decode(stream) {
      stream = LogicCommand.decode(stream);
      let skin = stream.readDataReference().low;
      console.log("New skin id:", skin);
      let unk1 = stream.readVInt();
      return { stream, skin };
    }
    static execute(skinID) {
      Logger.verbose("New skin id:", skinID);
    }
  };

  // src/commands/client/logicsetplayernamecolorcommand.ts
  var LogicSetPlayerNameColorCommand = class {
    static decode(stream) {
      stream = LogicCommand.decode(stream);
      let namecolor = stream.readDataReference().low;
      return { stream, namecolor };
    }
    static execute(colorID) {
      Logger.verbose("New color id:", colorID);
      config.namecolor = colorID;
      writeConfig(config);
    }
  };

  // src/commands/client/logicsetplayerthumbnailcommand.ts
  var LogicSetPlayerThumbnailCommand = class {
    static decode(stream) {
      stream = LogicCommand.decode(stream);
      let thumbnail = stream.readDataReference().low;
      return { stream, thumbnail };
    }
    static execute(thumbnailID) {
      Logger.verbose("New thumbnail id:", thumbnailID);
      config.thumbnail = thumbnailID;
      writeConfig(config);
    }
  };

  // src/commandhandler.ts
  var CommandHandler = class {
    static handleCommand(id, stream) {
      switch (id) {
        case 527:
          var namecolor = 0;
          ({ stream, namecolor } = LogicSetPlayerNameColorCommand.decode(stream));
          LogicSetPlayerNameColorCommand.execute(namecolor);
          break;
        case 505:
          var thumbnail = 0;
          ({ stream, thumbnail } = LogicSetPlayerThumbnailCommand.decode(stream));
          LogicSetPlayerThumbnailCommand.execute(thumbnail);
          break;
        case 570:
          var character = 0;
          ({ stream, character } = LogicSelectFavouriteHeroCommand.decode(stream));
          LogicSelectFavouriteHeroCommand.execute(character);
          break;
        case 525:
          var character = 0;
          ({ stream, character } = LogicSelectCharacterCommand.decode(stream));
          LogicSelectCharacterCommand.execute(character);
          break;
        case 506:
          var skin = 0;
          ({ stream, skin } = LogicSelectSkinCommand.decode(stream));
          LogicSelectSkinCommand.execute(skin);
          break;
        default:
          Logger.warn("Unhandled command of type:", id);
          break;
      }
      return stream;
    }
  };

  // src/packets/client/endclientturnmessage.ts
  var EndClientTurnMessage = class {
    static decode(stream) {
      stream.readBoolean();
      let tick = stream.readVInt();
      let checksum = stream.readVInt();
      let count = stream.readVInt();
      Logger.verbose("Command amount:", count);
      return { stream, tick, checksum, count };
    }
    // idk how to do this well fuck this
    static execute(data) {
      let { stream, count } = data;
      for (let i = 0; i < count; i++) {
        let id = stream.readVInt();
        Logger.verbose("Command ID:", id);
        stream = CommandHandler.handleCommand(id, stream);
      }
    }
  };

  // src/packets/server/setsupportedcreatorresponsemessage.ts
  var SetSupportedCreatorResponseMessage = class {
    static encode() {
      let stream = new ByteStream([]);
      stream.writeVInt(1);
      stream.writeString(config.supportedCreator);
      return stream.payload;
    }
  };

  // src/commands/server/logicsetsupportedcreatorcommand.ts
  var LogicSetSupportedCreatorCommand = class {
    static encode() {
      let stream = new ByteStream([]);
      stream.writeVInt(215);
      stream.writeBoolean(true);
      stream.writeString(config.supportedCreator);
      stream.payload.concat(LogicCommand.encode());
      return stream.payload;
    }
  };

  // src/packets/client/setsupportedcreatormessage.ts
  var SetSupportedCreatorMessage = class {
    static decode(stream) {
      let ccc = stream.readString();
      return ccc;
    }
    static execute(ccc) {
      if (ccc == "") {
        Logger.debug("Clearing CCC");
      } else {
        Logger.debug("New CCC:", ccc);
      }
      let creatorCodes = config.creatorCodes.map((v) => v.toLowerCase());
      let cccLower = ccc.toLowerCase();
      if (ccc != "" && !config.allCreatorCodesValid && !creatorCodes.includes(cccLower)) {
        return Messaging.sendOfflineMessage(
          28686,
          SetSupportedCreatorResponseMessage.encode()
        );
      }
      if (ccc != "") {
        let correctCaseIndex = creatorCodes.indexOf(cccLower);
        config.supportedCreator = config.creatorCodes[correctCaseIndex];
      } else {
        config.supportedCreator = "";
      }
      writeConfig(config);
      Messaging.sendOfflineMessage(
        24111,
        LogicSetSupportedCreatorCommand.encode()
      );
    }
  };

  // src/playermap.ts
  var PlayerMap = class {
    id = [0, 1];
    name;
    gmv;
    theme;
    data = [];
    accountID = [0, 1];
    mapEnvironmentData = 0;
    avatarName = "";
    constructor(name, gmv, theme) {
      this.name = name;
      this.gmv = gmv;
      this.theme = theme;
    }
    encode(stream) {
      stream.writeVLong(this.id[0], this.id[1]);
      stream.writeString(this.name);
      stream.writeVInt(this.gmv);
      stream.writeDataReference({ high: 54, low: this.mapEnvironmentData });
      if (this.data.length > 0) stream.writeBytes(this.data, this.data.length);
      else stream.writeInt(-1);
      stream.writeVLong(this.accountID[0], this.accountID[1]);
      stream.writeString(this.avatarName);
      stream.writeVInt(1);
      stream.writeLong(0, 0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      return stream;
    }
  };

  // src/packets/server/mapmaker/createplayermapresponsemessage.ts
  var CreatePlayerMapResponseMessage = class {
    static encode(map) {
      let stream = new ByteStream([]);
      stream.writeVInt(0);
      stream.writeBoolean(true);
      stream = map.encode(stream);
      return stream.payload;
    }
  };

  // src/packets/client/mapmaker/createplayermapmessage.ts
  var CreatePlayerMapMessage = class {
    static decode(stream) {
      let mapName = stream.readString();
      let gmv = stream.readVInt();
      let theme = stream.readDataReference().low;
      return new PlayerMap(mapName, gmv, theme);
    }
    static execute(map) {
      Messaging.sendOfflineMessage(
        22100,
        CreatePlayerMapResponseMessage.encode(map)
      );
    }
  };

  // src/packets/server/mapmaker/playermapsmessage.ts
  var PlayerMapsMessage = class {
    static encode() {
      let stream = new ByteStream([]);
      stream.writeVInt(1);
      let map = new PlayerMap("Test", 0, 0);
      map.avatarName = "hi";
      stream = map.encode(stream);
      return stream.payload;
    }
  };

  // src/packets/server/mapmaker/deleteplayermapresponsemessage.ts
  var DeletePlayerMapResponseMessage = class {
    static encode(id) {
      let stream = new ByteStream([]);
      stream.writeVInt(0);
      stream.writeVLong(id.high, id.low);
      return stream.payload;
    }
  };

  // src/packets/client/mapmaker/deleteplayermapmessage.ts
  var DeletePlayerMapMessage = class {
    static decode(stream) {
      let id = stream.readVLongAsLong();
      return id;
    }
    static execute(id) {
      Messaging.sendOfflineMessage(
        22101,
        DeletePlayerMapResponseMessage.encode(id)
      );
    }
  };

  // src/packets/client/teams/teamcreatemessage.ts
  var TeamCreateMessage = class {
    static decode(stream) {
      stream.readLong();
      let type = stream.readVInt();
      let slot = stream.readVInt();
      stream.readVInt();
      return { type, slot };
    }
    static execute(data) {
      TeamManager.createTeam();
    }
  };

  // src/packets/server/loginokmessage.ts
  var LoginOkMessage = class {
    static encode() {
      let stream = new ByteStream([]);
      stream.writeLong(0, 1);
      stream.writeLong(0, 1);
      stream.writeString("");
      stream.writeString("");
      stream.writeString("");
      stream.writeInt(1);
      stream.writeInt(2);
      stream.writeInt(3);
      stream.writeString("dev");
      stream.writeInt(0);
      stream.writeInt(0);
      stream.writeInt(0);
      stream.writeString("");
      stream.writeString("");
      stream.writeString("");
      stream.writeInt(0);
      stream.writeString("");
      stream.writeString("EN");
      stream.writeString("");
      stream.writeInt(0);
      stream.writeString("");
      stream.writeInt(2);
      stream.writeString("https://game-assets.brawlstarsgame.com");
      stream.writeString(
        "http://a678dbc1c015a893c9fd-4e8cc3b1ad3a3c940c504815caefa967.r87.cf2.rackcdn.com"
      );
      stream.writeInt(3);
      stream.writeString("https://event-assets.brawlstars.com");
      stream.writeString("https://event-assets-2.brawlstars.com");
      stream.writeString(
        "https://24b999e6da07674e22b0-8209975788a0f2469e68e84405ae4fcf.ssl.cf2.rackcdn.com/event-assets"
      );
      stream.writeVInt(0);
      stream.writeInt(0);
      stream.writeBoolean(true);
      stream.writeBoolean(false);
      stream.writeString("");
      stream.writeString("");
      stream.writeString("");
      stream.writeString(
        "https://play.google.com/store/apps/details?id=com.supercell.brawlstars"
      );
      stream.writeString("");
      stream.writeBoolean(false);
      return stream.payload;
    }
  };

  // src/hero.ts
  var Hero = class {
    id;
    skinID;
    team;
    isPlayer;
    name;
    constructor(id, skinID, team, isPlayer, name) {
      this.id = id;
      this.skinID = skinID;
      this.team = team;
      this.isPlayer = isPlayer;
      this.name = name;
    }
  };

  // src/battleenddata.ts
  var BattleEndData = class {
    gamemode;
    result;
    rank;
    mapID;
    heroes;
    constructor(gamemode, result, rank, mapID, heroes) {
      this.gamemode = gamemode;
      this.result = result;
      this.rank = rank;
      this.mapID = mapID;
      this.heroes = heroes;
    }
  };

  // src/packets/server/battleendmessage.ts
  var BattleEndMessage = class {
    static encode(data) {
      let stream = new ByteStream([]);
      stream.writeLong(0, 1);
      stream.writeLong(0, 1);
      stream.writeVInt(data.gamemode);
      stream.writeVInt(data.rank);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeBoolean(false);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeBoolean(false);
      stream.writeBoolean(false);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeBoolean(false);
      stream.writeBoolean(false);
      stream.writeBoolean(false);
      stream.writeBoolean(true);
      stream.writeBoolean(false);
      stream.writeBoolean(false);
      stream.writeVInt(-1);
      stream.writeBoolean(false);
      data.heroes.forEach((hero) => {
        stream.writeBoolean(hero.isPlayer);
        stream.writeBoolean(Boolean(hero.team));
        stream.writeBoolean(Boolean(hero.team));
        stream.writeByte(1);
        stream.writeDataReference(hero.id.high, hero.id.low);
        stream.writeByte(1);
        stream.writeVInt(0);
        stream.writeByte(1);
        stream.writeVInt(1e3);
        stream.writeByte(1);
        stream.writeVInt(11);
        stream.writeByte(1);
        stream.writeVInt(0);
        stream.writeVInt(0);
        stream.writeBoolean(hero.isPlayer);
        if (hero.isPlayer) {
          stream.writeLong(config.id.high, config.id.low);
        }
        stream = new PlayerDisplayData(hero.name, 0, 0).encode(stream);
        stream.writeBoolean(false);
        stream.writeByte(1);
        stream.writeVInt(5978);
        stream.writeByte(1);
        stream.writeVInt(0);
        stream.writeShort(5);
        stream.writeShort(3);
        stream.writeInt(27328);
        stream.writeInt(25659);
        stream.writeDataReference(0, 1);
        stream.writeVInt(0);
        stream.writeVInt(0);
        stream.writeVInt(0);
      });
      stream.writeVInt(0);
      stream.writeVInt(1);
      stream.writeVInt(0);
      stream.writeDataReference(0, -1);
      stream.writeBoolean(false);
      stream.writeBoolean(false);
      stream.writeBoolean(false);
      stream.writeBoolean(false);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeBoolean(false);
      stream.writeVInt(0);
      stream.writeBoolean(false);
      stream.writeVInt(0);
      stream.writeBoolean(false);
      stream.writeBoolean(false);
      stream.writeBoolean(false);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeBoolean(false);
      stream.writeBoolean(false);
      stream.writeBoolean(false);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeVInt(0);
      stream.writeBoolean(false);
      stream.writeVInt(0);
      stream.writeVInt(0);
      return stream.payload;
    }
  };

  // src/packets/client/askforbattleendmessage.ts
  var AskForBattleEndMessage = class {
    static decode(stream) {
      let gamemode = stream.readVInt();
      let result = stream.readVInt();
      let rank = stream.readVInt();
      let mapID = stream.readDataReference();
      let heroes = [];
      let heroCount = stream.readVInt();
      for (let i = 0; i < heroCount; i++) {
        heroes.push(
          new Hero(
            stream.readDataReference(),
            stream.readDataReference(),
            stream.readVInt(),
            stream.readBoolean(),
            stream.readString()
          )
        );
      }
      return new BattleEndData(gamemode, result, rank, mapID, heroes);
    }
    static execute(data) {
      Messaging.sendOfflineMessage(23456, BattleEndMessage.encode(data));
    }
  };

  // src/packets/server/setcountryresponsemessage.ts
  var SetCountryResponseMessage = class {
    static encode(country) {
      let stream = new ByteStream([]);
      stream.writeVInt(0);
      stream.writeDataReference(country.high, country.low);
      return stream.payload;
    }
  };

  // src/packets/client/setcountrymessage.ts
  var SetCountryMessage = class {
    static decode(stream) {
      return stream.readDataReference();
    }
    static execute(region) {
      Logger.verbose("Changed country to", region.low);
      Messaging.sendOfflineMessage(24178, SetCountryResponseMessage.encode(region));
    }
  };

  // src/messaging.ts
  var Messaging = class _Messaging {
    static sendOfflineMessage(id, payload) {
      let version2 = id == 20104 ? 1 : 0;
      const factory = Memory.alloc(512);
      factory.writePointer(base.add(Offsets.LogicLaserMessageFactory));
      let message = createMessageByType(factory, id);
      message.add(Offsets.Version).writeS32(version2);
      const payloadLength = PiranhaMessage.getByteStream(message).add(
        Offsets.PayloadSize
      );
      payloadLength.writeS32(payload.length);
      if (payload.length > 0) {
        let payloadPtr = operator_new(payload.length).writeByteArray(payload);
        PiranhaMessage.getByteStream(message).add(Offsets.PayloadPtr).writePointer(payloadPtr);
      }
      let decodeOffset = message.readPointer().add(Offsets.Decode).readPointer();
      Logger.debug("Decode function for type", id + ":", decodeOffset.sub(base));
      let decode = new NativeFunction(decodeOffset, "void", ["pointer"]);
      decode(message);
      Logger.debug("Message decoded succesfully");
      messageManagerReceiveMessage(getMessageManagerInstance(), message);
      Logger.debug("Message received");
      return message;
    }
    static handleMessage(id, stream) {
      switch (id) {
        // ClientHelloMessage
        case 10100: {
          _Messaging.sendOfflineMessage(20104, LoginOkMessage.encode());
          _Messaging.sendOfflineMessage(24101, OwnHomeDataMessage.encode());
          if (config.teamExperiment) {
            TeamManager.createTeam();
          }
          break;
        }
        // GoHomeFromOfflinePracticeMesage
        case 17750:
        // GoHomeFromMapEditorMessage
        case 12108: {
          if (config.tutorial) {
            config.tutorial = false;
            writeConfig(config);
          }
          _Messaging.sendOfflineMessage(24101, OwnHomeDataMessage.encode());
          if (config.teamExperiment) {
            TeamManager.createTeam();
          }
          break;
        }
        // AskForBattleEndMessage
        case 14110: {
          AskForBattleEndMessage.execute(AskForBattleEndMessage.decode(stream));
          break;
        }
        // GetPlayerProfileMessage
        case 15081: {
          _Messaging.sendOfflineMessage(24113, PlayerProfileMessage.encode());
          break;
        }
        // AvatarNameCheckRequestMessage
        case 14600: {
          AvatarNameCheckRequestMessage.execute(
            AvatarNameCheckRequestMessage.decode(stream)
          );
          break;
        }
        // ChangeAvatarNameMessage
        case 10212: {
          ChangeAvatarNameMessage.execute(ChangeAvatarNameMessage.decode(stream));
          break;
        }
        case 14102: {
          EndClientTurnMessage.execute(EndClientTurnMessage.decode(stream));
          break;
        }
        case 18686: {
          SetSupportedCreatorMessage.execute(
            SetSupportedCreatorMessage.decode(stream)
          );
          break;
        }
        case 12100: {
          CreatePlayerMapMessage.execute(CreatePlayerMapMessage.decode(stream));
          break;
        }
        case 12102: {
          _Messaging.sendOfflineMessage(22102, PlayerMapsMessage.encode());
          break;
        }
        case 12101: {
          DeletePlayerMapMessage.execute(DeletePlayerMapMessage.decode(stream));
          break;
        }
        case 12998: {
          SetCountryMessage.execute(SetCountryMessage.decode(stream));
          break;
        }
        case 14350: {
          TeamCreateMessage.execute(TeamCreateMessage.decode(stream));
          break;
        }
      }
    }
  };

  // src/utility/buttonhelper.ts
  var ButtonHelper = class {
    static hideButton(displayObject) {
      setXY(displayObject, NaN, NaN);
    }
    static createButton(guiContainer2, scFile, item, init = true, x, y, width = void 0, height = void 0, frameIndex = void 0) {
      let btn = malloc(600);
      gameButtonConstructor(btn);
      let movieClip = getMovieClip(
        Memory.allocUtf8String(scFile),
        Memory.allocUtf8String(item),
        1
      );
      if (frameIndex) gotoAndStop(movieClip, frameIndex);
      new NativeFunction(
        btn.readPointer().add(Offsets.InitFn).readPointer(),
        "void",
        ["pointer", "pointer", "bool"]
      )(btn, movieClip, Number(init));
      setXY(btn, x, y);
      if (width) setWidth(btn, width);
      if (height) setHeight(btn, height);
      addChild(guiContainer2, btn);
      return btn;
    }
    static setButtonText(btn, textFieldName, text, multiline = false, centered = false, fontSize = void 0) {
      let textField = getTextFieldByName(
        btn.add(Offsets.ButtonText).readPointer(),
        Memory.allocUtf8String(textFieldName)
      );
      setText(textField, createStringObject(text));
      setMultiline(textField, Number(multiline));
      autoAdjustText(textField, 1, 1, 1);
      if (centered) setVerticallyCentered(textField);
      if (fontSize) setFontSize(textField, fontSize);
    }
    static setButtonHandler(ptr2, handler) {
      const entry = buttonHandlers.find((e) => e.ptr.equals(ptr2));
      if (entry) {
        entry.handler = handler;
      } else {
        buttonHandlers.push({ ptr: ptr2, handler });
      }
    }
  };

  // src/debugmenu/debugmenu.ts
  var DebugMenu = class {
    guiContainer;
    toggle = NULL;
    menu = NULL;
    menuVisible = true;
    debugPosition = 1225;
    // good is 1225; left 250
    start = 100;
    step = 55;
    next = this.start;
    constructor(guiContainer2) {
      this.guiContainer = guiContainer2;
      this.createDebugButton();
      this.createDebugMenu();
      this.hideDebugMenu();
      ButtonHelper.setButtonHandler(
        this.toggle,
        (button) => this.onDebugButtonClick(button)
      );
      this.addDebugButton("Hello", (button) => Logger.debug("click"));
      this.addDebugButton("wow", (button) => Logger.debug("click"));
      this.addDebugButton("wow2", (button) => Logger.debug("click"));
      this.addDebugButton("wo3w", (button) => Logger.debug("click"));
      this.addDebugButton("wo4w", (button) => Logger.debug("click"));
    }
    onDebugButtonClick(button) {
      Logger.debug("Button clicked");
      if (button.equals(this.toggle)) this.toggleDebugMenu();
    }
    createDebugButton() {
      Logger.debug("Creating debug button");
      this.toggle = ButtonHelper.createButton(
        this.guiContainer,
        "sc/debug.sc",
        "debug_button",
        true,
        -40,
        575
      );
      ButtonHelper.setButtonText(this.toggle, "txt", "D");
    }
    createDebugMenu() {
      Logger.debug("Creating debug menu");
      this.menu = ButtonHelper.createButton(
        this.guiContainer,
        "sc/debug.sc",
        "debug_menu",
        false,
        this.debugPosition,
        0
      );
      ButtonHelper.setButtonText(this.menu, "title", "NBS Offline");
      ButtonHelper.setButtonText(this.menu, "version", "Beta 4 Testing");
      ButtonHelper.setButtonText(this.menu, "search_help", "Search...");
    }
    hideDebugMenu() {
      this.menuVisible = false;
      ButtonHelper.hideButton(this.menu);
    }
    showDebugMenu() {
      this.menuVisible = true;
      setXY(this.menu, this.debugPosition, 0);
    }
    toggleDebugMenu() {
      if (this.menuVisible) this.hideDebugMenu();
      else this.showDebugMenu();
    }
    addDebugButton(text, handler) {
      let btn = ButtonHelper.createButton(
        this.menu,
        "sc/debug.sc",
        "debug_menu_item",
        true,
        -165,
        this.next,
        265,
        // og 290
        50
      );
      this.next += this.step;
      ButtonHelper.setButtonText(btn, "Text", text, false, true);
      ButtonHelper.setButtonHandler(btn, handler);
    }
  };

  // src/mainHooks.ts
  var progress;
  var hasLoaded = false;
  function installHooks() {
    Interceptor.attach(base.add(Offsets.DebuggerError), {
      onEnter(args) {
        Logger.error(args[0].readCString());
      }
    });
    Interceptor.attach(base.add(Offsets.DebuggerWarning), {
      onEnter(args) {
        Logger.warn(decodeString(args[0]));
      }
    });
    Interceptor.attach(base.add(Offsets.ServerConnectionUpdate), {
      onEnter: function(args) {
        args[0].add(Process.pointerSize).readPointer().add(Offsets.HasConnectFailed).writeU8(0);
        args[0].add(Process.pointerSize).readPointer().add(Offsets.State).writeInt(5);
      }
    });
    Interceptor.attach(base.add(Offsets.IsDev), {
      onLeave(retval) {
        retval.replace(ptr(1));
      }
    });
    Interceptor.attach(base.add(Offsets.IsDeveloperBuild), {
      onLeave(retval) {
        retval.replace(ptr(1));
      }
    });
    Interceptor.attach(base.add(Offsets.IsProd), {
      onLeave(retval) {
        retval.replace(ptr(0));
      }
    });
    Interceptor.attach(base.add(Offsets.MessageManagerReceiveMessage), {
      onLeave: function(retval) {
        retval.replace(ptr(1));
      }
    });
    Interceptor.attach(base.add(Offsets.StartGame), {
      onEnter: function(args) {
        args[3] = ptr(3);
        if (config.randomBotNames) {
          this.h = Interceptor.attach(base.add(Offsets.GetPlayerCount), {
            onLeave(retval) {
              setBotNames(getBotNames(retval.toInt32() - 1));
              Logger.verbose("Bot names:", botNames.toString());
            }
          });
        }
      },
      onLeave() {
        if (config.randomBotNames) {
          this.h.detach();
        }
      }
    });
    Interceptor.attach(base.add(Offsets.SendMessage), {
      onEnter(args) {
        PiranhaMessage.encode(args[1]);
        let messaging = args[0].add(Offsets.Messaging).readPointer();
        messaging.add(Offsets.State).writeInt(5);
      }
    });
    Interceptor.replace(
      base.add(Offsets.Send),
      new NativeCallback(
        function(_self, message) {
          let type = PiranhaMessage.getMessageType(message);
          let length = PiranhaMessage.getEncodingLength(message);
          if (type === 10108) return 0;
          Logger.info("Recieved message of type:", type);
          Logger.verbose("Length:", length);
          let payloadPtr = PiranhaMessage.getByteStream(message).add(Offsets.PayloadPtr).readPointer();
          let payload = payloadPtr.readByteArray(length);
          if (payload !== null) {
            let stream = new ByteStream(Array.from(new Uint8Array(payload)));
            Logger.debug("Stream dump:", payload);
            Messaging.handleMessage(type, stream);
          }
          PiranhaMessage.destroyMessage(message);
          return 0;
        },
        "int",
        ["pointer", "pointer"]
      )
    );
    Interceptor.attach(base.add(Offsets.UpdateLoadingProgress), {
      onEnter(args) {
        this.textfield = args[0].add(Offsets.LoadingText).readPointer();
        this.goToAndStopFrameIndexHook = Interceptor.attach(
          base.add(Offsets.GotoAndStopFrameIndex),
          {
            onEnter(args2) {
              progress = args2[1].toInt32();
              if (progress == 99) hasLoaded = true;
            }
          }
        );
      },
      onLeave(retval) {
        if (config.customLoadingScreen) {
          let text = `[${progress}%] Loading game...`;
          setTextAndScaleIfNecessary(
            this.textfield,
            createStringObject(text),
            0,
            0
          );
          this.goToAndStopFrameIndexHook.detach();
        }
      }
    });
    Interceptor.attach(base.add(Offsets.StringTableGetString), {
      onEnter(args) {
        this.str = args[0].readUtf8String();
      },
      onLeave(retval) {
        let replacement;
        if (config.randomBotNames && this.str.startsWith("TID_BOT_")) {
          let idx = this.str.split("TID_BOT_")[1] - 1;
          replacement = botNames[idx];
        }
        if (replacement) retval.replace(createStringObject(replacement));
      }
    });
    Interceptor.replace(
      base.add(Offsets.GetPlayerDraftMapNumLimit),
      new NativeCallback(
        () => {
          return config.draftMapLimit;
        },
        "int",
        []
      )
    );
    Interceptor.attach(base.add(Offsets.IsSupercellIDEnabled), {
      onLeave(retval) {
        retval.replace(ptr(Number(config.enableSupercellID)));
      }
    });
    if (version.gmv == 59 && config.debugMenu) {
      Interceptor.attach(base.add(Offsets.HomePageConstructor), {
        onLeave(guiContainer2) {
          Logger.debug(
            "Load asset retval",
            loadAsset(createStringObject("sc/debug.sc"), 0)
          );
          new DebugMenu(guiContainer2);
        }
      });
      Interceptor.attach(base.add(Offsets.ButtonPressed), {
        onEnter(args) {
          const clicked = args[0];
          for (const entry of buttonHandlers) {
            if (entry.ptr.equals(clicked)) {
              entry.handler(clicked);
              break;
            }
          }
        }
      });
    }
  }

  // src/customsettings.ts
  var editControlsPos;
  var editConfigPos;
  var guiContainer;
  function setupCustomSettings() {
    Interceptor.attach(base.add(Offsets.SettingsScreenConstructor), {
      onEnter(args) {
        guiContainer = args[0];
        this.setTextHook = Interceptor.attach(base.add(Offsets.SetText), {
          onEnter(args2) {
            if (decodeString(args2[1]) == "SUPERCELL ID") {
              stringCtor(args2[1], Memory.allocUtf8String(""));
            }
          }
        });
        this.addGameBtnHook = Interceptor.attach(
          base.add(Offsets.AddGameButton),
          {
            onEnter(args2) {
              this.name = args2[1].readCString();
            },
            onLeave(btn) {
              if (this.name == "button_parentsguide") {
                editControlsPos = { x: getX(btn), y: getY(btn) };
              } else if (this.name == "button_edit_controls") {
                setXY(btn, editControlsPos.x, editControlsPos.y);
              } else if (this.name == "button_random_reward_rates") {
                editConfigPos = { x: getX(btn), y: getY(btn) };
              }
              if (config.hiddenSettingsButtons.includes(this.name)) {
                ButtonHelper.hideButton(btn);
              }
            }
          }
        );
      },
      onLeave() {
        this.addGameBtnHook.detach();
        this.setTextHook.detach();
      }
    });
  }

  // src/init.ts
  var library = isAndroid ? "libg.so" : "laser";
  setBase(Module.getBaseAddress(library));
  load();
  Logger.info("Running on", isAndroid ? "Android" : "iOS");
  Logger.verbose(`${library} loaded at: ${base}`);
  for (const brawlerKey in config.ownedBrawlers) {
    const brawler = config.ownedBrawlers[brawlerKey];
    for (const skin of brawler.skins) {
      config.ownedSkins.push(skin);
    }
  }
  installHooks();
  if (config.customSettings) setupCustomSettings();
})();
