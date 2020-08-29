const { performance } = require("perf_hooks");

type NumBool = 0 | 1;
type BrowserPermission = 1 | 2 | 3 | 4 | 5;

// TODO: Make it more stringent
type Browser = {
  userAgent: string;
  InstallTrigger: NumBool;
  window: {
    screen: {
      availWidth: 1366;
      availHeight: 696;
      width: 1366;
      height: 696;
      colorDepth: 1 | 4 | 8 | 15 | 16 | 24 | 32;
      pixelDepth: 1 | 4 | 8 | 15 | 16 | 24 | 32;
    };
    innerWidth: 1366;
    innerHeight: 696;
    outerWidth: 1366;
    outerHeight: 696;
    callPhantom: NumBool;
    ActiveXObject: NumBool;
    HTMLElement: NumBool;
    RTCPeerConnection: NumBool;
    mozInnerScreenY: NumBool;
    FileReader: NumBool;
    DeviceOrientationEvent: "do_en" | "do_dis";
    DeviceMotionEvent: "dm_en" | "dm_dis";
    TouchEvent: "t_en" | "t_dis";
    chrome: {
      webstore: NumBool;
    };
    opera: NumBool;
    $cdc_asdjflasutopfhvcZLmcfl_: NumBool;
    XPathResult: NumBool;
    webdriver: NumBool;
    sessionStorage: boolean;
    localStorage: boolean;
    indexedDB: boolean;
  };
  document: {
    documentMode: NumBool;
    input: {
      name: string;
      type: "text" | "search" | "url" | "email" | "tel" | "number" | "password";
      id: string;
      required: boolean;
      autocomplete: "on" | "off";
      value: string;
      defaultValue: string;
    }[];
    documentElement: {
      webdriver: NumBool;
      driver: NumBool;
      selenium: NumBool;
    };
  };
  navigator: {
    onLine: NumBool;
    productSub: string;
    language: string;
    product: string;
    plugins: string[];
    _phantom: NumBool;
    brave: NumBool;
    webdriver: NumBool;
    domAutomation: NumBool;
    vibrate: NumBool;
    getBattery: NumBool;
    permissions: {
      query: {
        // states
        geolocation: BrowserPermission;
        notifications: BrowserPermission;
        push: BrowserPermission;
        midi: BrowserPermission;
        camera: BrowserPermission;
        microphone: BrowserPermission;
        speaker: BrowserPermission;
        "device-info": BrowserPermission;
        "background-sync": BrowserPermission;
        bluetooth: BrowserPermission;
        "persistent-storage": BrowserPermission;
        "ambient-light-sensor": BrowserPermission;
        accelerometer: BrowserPermission;
        gyroscope: BrowserPermission;
        magnetometer: BrowserPermission;
        clipboard: BrowserPermission;
        "accessibility-events": BrowserPermission;
        "clipboard-read": BrowserPermission;
        "clipboard-write": BrowserPermission;
        "payment-handler": BrowserPermission;
      };
    };
    cookieEnabled: boolean;
    javaEnabled: boolean;
    doNotTrack: -1;
  };
  Array: {
    prototype: {
      forEach: NumBool; // inverted boolean
    };
  };
};

type Events = {
  keyboard: {
    type: "keydown" | "keyup" | "keypress";
    keyCode: number;
    charCode: number;
    ctrlKey: boolean;
    altKey: boolean;
    metaKey: boolean;
    isTrusted: boolean;
    target: { name: string | null; id: string | null };
  }[];
  mouse: {
    type: "mousemove" | "click" | "mousedown" | "mouseup";
    clientX: number;
    clientY: number;
    pageX: number;
    pageY: number;
    which: 0 | 1 | 2 | 3;
    button: 0 | 1 | 2 | 3 | 4;
    isTrusted: boolean;
    target: { name: string | null; id: string | null };
  }[];
  touch: [];
  pointer: [];
  device: [];
};

class Akamai {
  version: number;
  api_public_key: string;
  cs: string;
  loc: string;
  ke_cnt_lmt: number;
  mme_cnt_lmt: number;
  mduce_cnt_lmt: number;

  url: string;
  startTime: number;
  events: Events;
  browser: Browser;

  z1: number;
  d3: number;
  ajaxType: number;
  ajaxCount: number;
  o9: number;

  constructor(options?: {
    url: string;
    startTime: number;
    events: Events;
    browser: Browser;
  }) {
    // static
    this.version = 1.63;
    this.api_public_key = "afSbep8yjnZUjq3aL010jO15Sawj2VZfdYK8uY90uxq";
    this.cs = "0a46G5m17Vrp4o4c";
    this.loc = "";
    this.ke_cnt_lmt = 150;
    this.mme_cnt_lmt = 100;
    this.mduce_cnt_lmt = 75;

    // customizable
    this.url = options?.url || "https://www.nike.com/in/"; // TODO: Use document["URL"].replace (/\\|"/g, "")
    this.startTime = options?.startTime || Date.now();
    this.events = options?.events || {
      keyboard: [],
      mouse: [],
      touch: [],
      pointer: [],
      device: [],
    };
    this.browser = {
      userAgent:
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4182.0 Safari/537.36",
      InstallTrigger: 0,
      window: {
        screen: {
          availWidth: 1366,
          availHeight: 696, // normal: 696
          width: 1366,
          height: 696,
          colorDepth: 24,
          pixelDepth: 24,
        },
        innerWidth: 1366,
        innerHeight: 696, // normal: 592
        outerWidth: 1366,
        outerHeight: 696, // normal: 696
        callPhantom: 0,
        ActiveXObject: 0,
        HTMLElement: 0,
        RTCPeerConnection: 1,
        mozInnerScreenY: 0,
        FileReader: 1,
        DeviceOrientationEvent: "do_en",
        DeviceMotionEvent: "dm_en",
        TouchEvent: "t_en",
        chrome: {
          webstore: 0,
        },
        opera: 0,
        $cdc_asdjflasutopfhvcZLmcfl_: 0,
        XPathResult: 1,
        webdriver: 0,
        sessionStorage: true,
        localStorage: true,
        indexedDB: true,
      },
      document: {
        documentMode: 0,
        input: [
          {
            name: "search",
            type: "text",
            id: "TypeaheadSearchInput",
            required: false,
            autocomplete: "off",
            value: "",
            defaultValue: "",
          },
        ],
        documentElement: {
          webdriver: 0,
          driver: 0,
          selenium: 0,
        },
      },
      navigator: {
        onLine: 1,
        productSub: "20030107",
        language: "en-US",
        product: "Gecko",
        plugins: ["Chrome PDF Plugin", "Chrome PDF Viewer", "Native Client"],
        _phantom: 0,
        brave: 0,
        webdriver: 0,
        domAutomation: 0,
        vibrate: 1,
        getBattery: 1,
        permissions: {
          query: {
            // states
            geolocation: 1,
            notifications: 1,
            push: 3,
            midi: 2,
            camera: 1,
            microphone: 1,
            speaker: 4,
            "device-info": 4,
            "background-sync": 2,
            bluetooth: 4,
            "persistent-storage": 1,
            "ambient-light-sensor": 3,
            accelerometer: 2,
            gyroscope: 2,
            magnetometer: 2,
            clipboard: 4,
            "accessibility-events": 3,
            "clipboard-read": 1,
            "clipboard-write": 2,
            "payment-handler": 2,
          },
        },
        cookieEnabled: true,
        javaEnabled: false,
        doNotTrack: -1,
      },
      Array: {
        prototype: {
          forEach: 0, // inverted boolean
        },
      },
      ...options?.browser,
    };

    // will update
    this.z1 = Math.floor(this.startTime / Math.pow(2016, 2));
    this.d3 = Date.now() % 1e7;
    this.o9 = this.to();
    this.ajaxType = 0;
    this.ajaxCount = 0;
  }

  set setEvents(i: Events) {
    this.events = i;
  }

  to() {
    var t = Date.now() % 1e7;
    this.d3 = t;
    for (var a = t, e = parseInt(String.fromCharCode(51)), n = 0; n < 5; n++) {
      var o = Math.floor(t / Math.pow(10, n)) % 10,
        m = o + 1;
      const op = this.encode3(o);
      a = op(a, m);
    }
    return a * e;
  }

  encode0(t: number, a: number, e: number, n: number) {
    return t > a && t <= e && (t += n % (e - a)) > e && (t = t - e + a), t;
  }

  // od
  encode1(t: string, a: string): string {
    try {
      (t = String(t)), (a = String(a));
      var e = [],
        n = a["length"];
      if (n > 0) {
        for (var o = 0; o < t["length"]; o++) {
          var m = t.charCodeAt(o),
            r = t.charAt(o),
            i = a.charCodeAt(o % n);
          (m = this.encode0(m, 47, 57, i)),
            m != t.charCodeAt(o) && (r = String.fromCharCode(m)),
            e.push(r);
        }
        if (e["length"] > 0) return e.join("");
      }
    } catch (t) {}
    return t.toString();
  }

  // ab
  encode2(t: string): number {
    if (null == t) return -1;
    try {
      for (var a = 0, e = 0; e < t["length"]; e++) {
        var n = t.charCodeAt(e);
        n < 128 && (a += n);
      }
      return a;
    } catch (t) {
      return -2;
    }
  }

  // cc
  encode3(t: number) {
    var a = t % 4;
    2 == a && (a = 3);
    var e = 42 + a,
      n = function (t: number, a: number) {
        return 0;
      };
    if (42 == e)
      var n = function (t: number, a: number) {
        return t * a;
      };
    else if (43 == e)
      var n = function (t: number, a: number) {
        return t + a;
      };
    else
      var n = function (t: number, a: number) {
        return t - a;
      };
    return n;
  }

  // getmr
  generateMathRandom(): string {
    for (
      var a = "",
        t = 1e3,
        e = [
          Math["abs"],
          Math["acos"],
          Math["asin"],
          Math["atanh"],
          Math["cbrt"],
          Math["exp"],
          Math["random"],
          Math["round"],
          Math["sqrt"],
          isFinite,
          isNaN,
          parseFloat,
          parseInt,
          JSON["parse"],
        ],
        n = 0;
      n < e["length"];
      n++
    ) {
      var o = [],
        m = 0,
        r = performance.now(),
        i = 0,
        c = 0;
      if (void 0 !== e[n]) {
        for (i = 0; i < t && m < 0.6; i++) {
          for (var b = performance.now(), d = 0; d < 4e3; d++) e[n](3.14);
          var k = performance.now();
          o.push(Math.round(1e3 * (k - b))), (m = k - r);
        }
        var s = o.sort();
        c = s[Math.floor(s["length"] / 2)] / 5;
      }
      a = a + c + ",";
    }
    return a;
  }

  generateWindowSignature() {
    const addEventListener = 1;
    const XMLHttpRequest = 1;
    const XDomainRequest = 0;
    const emit = 0;
    const DeviceOrientationEvent = 1;
    const DeviceMotionEvent = 1;
    const TouchEvent = 1;
    const spawn = 0;
    const innerWidth = 1;
    const outerWidth = 1;
    const chrome = 1;
    const FunctionPrototypeBind = 1;
    const Buffer = 0;
    const PointerEvent = 1;

    return (
      (addEventListener << 0) +
      (XMLHttpRequest << 1) +
      (XDomainRequest << 2) +
      (emit << 3) +
      (DeviceOrientationEvent << 4) +
      (DeviceMotionEvent << 5) +
      (TouchEvent << 6) +
      (spawn << 7) +
      (innerWidth << 8) +
      (outerWidth << 9) +
      (chrome << 10) +
      (FunctionPrototypeBind << 11) +
      (Buffer << 12) +
      (PointerEvent << 13)
    );
  }

  generateInitial() {
    const a = this.encode1(this.cs, this.api_public_key).slice(0, 16);
    const b = Math.floor(Date.now() / 36e5);
    return a + this.encode1(String(b), String(a));
  }

  generateDevice() {
    const d = Math.random();
    const k = Math.floor((1e3 * d) / 2);
    const s = d.toString().slice(0, 11) + k;

    return (
      this.browser.userAgent +
      ",uaend," +
      this.generateWindowSignature() +
      "," +
      this.browser.navigator.productSub +
      "," +
      this.browser.navigator.language +
      "," +
      this.browser.navigator.product +
      "," +
      this.browser.navigator.plugins.length +
      "," +
      this.browser.navigator._phantom +
      "," +
      this.browser.navigator.webdriver +
      "," +
      this.browser.navigator.domAutomation +
      "," +
      this.z1 + // time dependent
      "," +
      this.d3 + // time dependent
      "," +
      this.browser.window.screen.availWidth +
      "," +
      this.browser.window.screen.availHeight +
      "," +
      this.browser.window.screen.width +
      "," +
      this.browser.window.screen.height +
      "," +
      this.browser.window.innerWidth +
      "," +
      this.browser.window.innerHeight +
      "," +
      this.browser.window.outerWidth +
      "," +
      ",cpen:" +
      this.browser.window.callPhantom +
      ",i1:" +
      this.browser.window.ActiveXObject +
      ",dm:" +
      this.browser.document.documentMode +
      ",cwen:" +
      this.browser.window.chrome.webstore +
      ",non:" +
      this.browser.navigator.onLine +
      ",opc:" +
      this.browser.window.opera +
      ",fc:" +
      this.browser.InstallTrigger +
      ",sc:" +
      this.browser.window.HTMLElement +
      ",wrc:" +
      this.browser.window.RTCPeerConnection +
      ",isc:" +
      this.browser.window.mozInnerScreenY +
      ",vib:" +
      this.browser.navigator.vibrate +
      ",bat:" +
      this.browser.navigator.getBattery +
      ",x11:" +
      this.browser.Array.prototype.forEach +
      ",x12:" +
      this.browser.window.FileReader +
      "," +
      this.encode2(this.browser.userAgent) +
      "," +
      s + // math random
      "," +
      this.startTime / 2 + // time dependent
      "," +
      this.browser.navigator.brave +
      ",loc:" +
      this.loc
    );
  }

  generateAccelerator() {
    return (
      this.browser.window.DeviceOrientationEvent +
      "," +
      this.browser.window.DeviceMotionEvent +
      "," +
      this.browser.window.TouchEvent
    );
  }

  generateFormInfo() {
    let items = "";

    this.browser.document["input"].forEach((i) => {
      const nameEncoded = this.encode2(i.name);
      const idEncoded = this.encode2(i.id);
      const required = i.required ? 1 : 0;
      const type = !i.type
        ? -1
        : ["text", "search", "url", "email", "tel", "number"].includes(i.type)
        ? 0
        : i.type === "password"
        ? 1
        : 2;
      const autocomplete = !i.autocomplete
        ? -1
        : i.autocomplete === "off"
        ? 0
        : i.autocomplete === "on"
        ? 1
        : 2;
      const defaultValue = i.defaultValue ? 1 : 0;
      const valIsEqualDefaultVal = !i.defaultValue
        ? 0
        : i.defaultValue === i.value
        ? 1
        : 0;

      if (type == 2) return;

      items +=
        type +
        "," +
        autocomplete +
        "," +
        valIsEqualDefaultVal +
        "," +
        required +
        "," +
        idEncoded +
        "," +
        nameEncoded +
        "," +
        defaultValue +
        ";";
    });

    return items;
  }

  getActiveEncoded(target: { name: string | null; id: string | null }): number {
    if (target.name) return this.encode2(target.name);
    if (target.id) return this.encode2(target.id);

    return -1;
  }

  // TODO: Implement keyboard limit
  generateKeyboard(kEvents?: Events["keyboard"]) {
    let data: string = "";
    let events: Events["keyboard"] = kEvents ? kEvents : this.events.keyboard;

    events.forEach((e, count) => {
      if (count >= this.ke_cnt_lmt) return;

      const keyCode = e["keyCode"] || e["charCode"] || 0;
      let keyCodeEncoded = keyCode;

      if (!e["ctrlKey"] && !e["metaKey"] && !e["altKey"]) {
        if (keyCode >= 32) {
          if (e["type"] === "keypress") {
            if (keyCode >= 32 && keyCode <= 126) {
              keyCodeEncoded = -2;
            }
          } else {
            if (keyCode >= 33 && keyCode <= 47) {
              keyCodeEncoded = -3;
            } else if (keyCode >= 112 && keyCode <= 123) {
              keyCodeEncoded = -4;
            } else {
              keyCodeEncoded = -2;
            }
          }
        }
      }

      const eventType =
        e["type"] === "keypress" ? 3 : e["type"] === "keyup" ? 2 : 1;

      data +=
        count +
        "," +
        eventType +
        "," +
        (Date.now() - this.startTime + this.randomIntFromInterval(20, 50)) +
        "," +
        keyCodeEncoded +
        "," +
        0 +
        "," +
        (8 * +e["shiftKey"] +
          4 * +e["ctrlKey"] +
          2 * +e["altKey"] +
          +e["metaKey"]) +
        "," +
        this.getActiveEncoded(e.target);

      if (!e["isTrusted"]) data += ",0";

      data += ";";
    });

    return data;
  }

  // TODO: Implement mouse event limit
  generateMouse(mEvents?: Events["mouse"]) {
    let data = "";
    let events: Events["mouse"] = mEvents ? mEvents : this.events.mouse;

    let mousemoveCount = 0;
    let mouseduceCount = 0;

    events.forEach((e, count) => {
      if (e["type"] === "mousemove") {
        if (mousemoveCount >= this.mme_cnt_lmt) return;
        mousemoveCount += 1;
      } else {
        if (mouseduceCount >= this.mduce_cnt_lmt) return;
        mouseduceCount += 1;
      }

      const x = Math.floor(e.pageX || e.clientX);
      const y = Math.floor(e.pageY || e.clientY);

      const eventType =
        e["type"] === "mousemove"
          ? 1
          : e["type"] === "click"
          ? 2
          : e["type"] === "mousedown"
          ? 3
          : e["type"] === "mouseup"
          ? 4
          : 0;

      data +=
        count +
        "," +
        eventType +
        "," +
        (Date.now() - this.startTime + this.randomIntFromInterval(10, 50)) +
        "," +
        x +
        "," +
        y;

      if (e["type"] !== "mousemove") {
        const targetEncoded = this.getActiveEncoded(e.target);
        const buttonType = e["which"] ? e["which"] : e["button"];

        data += "," + targetEncoded;

        if (buttonType && buttonType !== 1) {
          data += "," + buttonType;
        }
      }

      if (!e["isTrusted"]) data += ",it0";

      data += ";";
    });
    return data;
  }

  generateTouch() {
    return "";
  }

  generatePointer() {
    return "";
  }

  generateDeviceOrientation() {
    return `0,${Date.now() - this.startTime},-1,-1,-1` + ";";
  }

  generateDeviceMotion() {
    return `0,${Date.now() - this.startTime},-1,-1,-1,-1,-1,-1,-1,-1,-1` + ";";
  }

  generateWindowVisibility() {
    return "";
  }

  generateSed() {
    return [
      this.browser.window["$cdc_asdjflasutopfhvcZLmcfl_"],
      this.browser.document.documentElement.webdriver,
      this.browser.navigator.webdriver,
      this.browser.window.webdriver,
      this.browser.window.XPathResult,
      this.browser.document.documentElement.driver,
      this.browser.document.documentElement.selenium,
    ].join(",");
  }

  generateNavigatorPermissions() {
    const a = this.browser.navigator.permissions.query;
    const keys = Object.keys(a);

    return keys.map((k) => a[k]).join("");
  }

  generateFingerPrint() {
    const plugins = [
      "WebEx64 General Plugin Container",
      "YouTube Plug-in",
      "Java Applet Plug-in",
      "Shockwave Flash",
      "iPhotoPhotocast",
      "SharePoint Browser Plug-in",
      "Chrome Remote Desktop Viewer",
      "Chrome PDF Viewer",
      "Native Client",
      "Unity Player",
      "WebKit-integrierte PDF",
      "QuickTime Plug-in",
      "RealPlayer Version Plugin",
      "RealPlayer(tm) G2 LiveConnect-Enabled Plug-In (32-bit)",
      "Mozilla Default Plug-in",
      "Adobe Acrobat",
      "AdobeAAMDetect",
      "Google Earth Plug-in",
      "Java Plug-in 2 for NPAPI Browsers",
      "Widevine Content Decryption Module",
      "Microsoft Office Live Plug-in",
      "Windows Media Player Plug-in Dynamic Link Library",
      "Google Talk Plugin Video Renderer",
      "Edge PDF Viewer",
      "Shockwave for Director",
      "Default Browser Helper",
      "Silverlight Plug-In",
    ];

    const availablePlugins =
      "," +
      plugins
        .filter((p) => this.browser.navigator.plugins.includes(p))
        .map((p) => plugins.indexOf(p))
        .join(",");
    return [
      // TODO: canvas signature 1
      -705080415,
      // TODO: canvas signature 2
      1993109966,
      "dis",
      availablePlugins,
      this.browser.window.sessionStorage,
      this.browser.window.localStorage,
      this.browser.window.indexedDB,
      new Date().getTimezoneOffset(),
      !!this.browser.window.RTCPeerConnection,
      this.browser.window.screen.colorDepth,
      this.browser.window.screen.pixelDepth,
      this.browser.navigator.cookieEnabled,
      this.browser.navigator.javaEnabled,
      this.browser.navigator.doNotTrack,
    ].join(";");
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  generateExecutionTime() {
    const a = this.randomIntFromInterval(30, 50);
    const b = a + this.randomIntFromInterval(0, 15);

    return `;${a};${b};0`;
  }

  generateCookieSignature() {
    return "";
  }

  generateGraphicsCard() {
    return "";
  }

  generate() {
    const sensorData1 =
      this.generateInitial() +
      this.version +
      `-1,2,-94,-100,${this.generateDevice()}` +
      `-1,2,-94,-101,${this.generateAccelerator()}` +
      `-1,2,-94,-105,${this.generateFormInfo()}` + // TODO: available inputs on page load
      `-1,2,-94,-102,${this.generateFormInfo()}` + // TODO: available inputs dispatch load
      `-1,2,-94,-108,${this.generateKeyboard()}` +
      `-1,2,-94,-110,${this.generateMouse()}` +
      `-1,2,-94,-117,${this.generateTouch()}` +
      `-1,2,-94,-111,${this.generateDeviceOrientation()}` +
      `-1,2,-94,-109,${this.generateDeviceMotion()}` +
      `-1,2,-94,-114,${this.generatePointer()}` +
      `-1,2,-94,-103,${this.generateWindowVisibility()}` +
      `-1,2,-94,-112,${this.url}` +
      `-1,2,-94,-115,${this.generateCookieSignature()}` +
      `-1,2,-94,-106,${this.ajaxType},${this.ajaxCount}` +
      `-1,2,-94,-119,${this.generateMathRandom()}` +
      `-1,2,-94,-122,${this.generateSed()}` +
      `-1,2,-94,-123,` +
      `-1,2,-94,-124,` +
      `-1,2,-94,-126,` +
      `-1,2,-94,-127,${this.generateNavigatorPermissions()}`;

    const sensorData1Encoded = 24 ^ this.encode2(sensorData1);

    const sensorData =
      sensorData1 +
      `-1,2,-94,-70,${this.generateFingerPrint()}` +
      `-1,2,-94,-80,${this.encode2(this.generateFingerPrint())}` +
      `-1,2,-94,-116,${this.o9}` +
      `-1,2,-94,-118,${sensorData1Encoded}` +
      `-1,2,-94,-129,${this.generateGraphicsCard()}` +
      `-1,2,-94,-121,${this.generateExecutionTime()}`;

    return sensorData;
  }
}

module.exports = Akamai;

// const akamai = new Akamai();
// console.log(akamai.generateMathRandom());
