/**
 * These tests are only check consistency of the sensor_data generated.
 */

const levenshtein = require("fast-levenshtein");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

const Akamai = require("../build/generate");
const akamai = new Akamai();

/**
 * TODO:
 * Make sure every request sent to static/asd is tested for a given webpage.
 * Loading mobile version from time to time.
 * Sometimes failing all tests!
 */

describe("Nike.com", () => {
  // hoist
  let bmak;
  let browser;
  let page;

  beforeAll(async () => {
    jest.setTimeout(100000);

    browser = await puppeteer.launch({
      headless: true,
      args: [
        `--window-size=${akamai.browser.window.screen.width},${akamai.browser.window.screen.height}`,
      ],
    });
    page = await browser.newPage();

    // await page.setRequestInterception(true);

    // // block unnecessary requests
    // page.on("request", (request) => {
    //   const isAkamaiRequest = request
    //     .url()
    //     .includes("https://www.nike.com/static/");
    //   const isAsset = ["image", "font", "stylesheet"].includes(
    //     request.resourceType()
    //   );

    //   // console.log(request.url());

    //   if (!isAsset) return request.continue();

    //   return request.abort();
    // });

    /**
     ** WARNING: Nike might block a request if too many requests are made. In which case, wait and retry
     */
    await page.goto(akamai.url);

    bmak = await page.evaluate(() => bmak);
  });

  afterAll(async (done) => {
    await browser.close();
    done();
  });

  /********
   * BMAK *
   ********/

  describe("bmak", () => {
    test("version", () => {
      expect(akamai.version).toEqual(bmak.ver);
      expect(akamai.api_public_key).toEqual(bmak.api_public_key);
      expect(akamai.cs).toEqual(bmak.cs);
    });

    test("static variables", () => {
      expect(akamai.loc).toEqual(bmak.loc);
      expect(akamai.ke_cnt_lmt).toEqual(bmak.ke_cnt_lmt);
      expect(akamai.mme_cnt_lmt).toEqual(bmak.mme_cnt_lmt);
      expect(akamai.mduce_cnt_lmt).toEqual(bmak.mduce_cnt_lmt);
    });

    test("generated variables", () => {
      expect(akamai.z1).toEqual(bmak.z1);
      expect(Math.abs(bmak.d3 - akamai.d3)).toBeLessThanOrEqual(15000);
      expect(
        Math.abs(akamai.o9.toString().length - bmak.o9.toString().length)
      ).toBeLessThanOrEqual(2);
    });

    test("string encoders", async () => {
      const encoded0 = await page.evaluate(() => bmak.rir(10, 11, 12, 13));
      const encoded1 = await page.evaluate(() =>
        bmak.od("TestString1", "TestString2")
      );
      const encoded2 = await page.evaluate(() => bmak.ab("TestString"));
      const encoded3 = await page.evaluate(() => bmak.cc(10)(11, 12));

      expect(akamai.encode0(10, 11, 12, 13)).toBe(encoded0);
      expect(akamai.encode1("TestString1", "TestString2")).toBe(encoded1);
      expect(akamai.encode2("TestString")).toBe(encoded2);
      expect(akamai.encode3(10)(11, 12)).toBe(encoded3);
    });
  });

  /***************
   * SENSOR DATA *
   ***************/

  describe("bmak.sensor_data", () => {
    test("initial", () => {
      const initial = bmak.sensor_data.substr(0, 22);
      expect(akamai.generateInitial()).toEqual(initial);
    });

    test("version", () => {
      const version = bmak.sensor_data.substr(22, 4);
      expect(akamai.version).toEqual(parseFloat(version));
    });

    // -1,2,-94,-100
    test("device", async () => {
      bmak.gd = await page.evaluate(() => bmak.gd());

      // expect(akamai.generateDevice()).toEqual(bmak.gd);

      expect(akamai.generateDevice().split(",").length).toEqual(
        bmak.gd.split(",").length
      );
      expect(
        levenshtein.get(akamai.generateDevice(), bmak.gd)
      ).toBeLessThanOrEqual(25);
    });

    // -1,2,-94,-101
    test("accelerator", () => {
      const accelerator = /-1,2,-94,-101,(.*)-1,2,-94,-105/gm.exec(
        bmak.sensor_data
      )[1];
      expect(akamai.generateAccelerator()).toEqual(accelerator);
    });

    // -1,2,-94,-105
    test("available inputs on page load", () => {
      expect(akamai.generateFormInfo()).toEqual(bmak.informinfo);
    });

    // -1,2,-94,-102
    test("available inputs before dispatch", async () => {
      bmak.informinfo = await page.evaluate(() => bmak.getforminfo());
      expect(akamai.generateFormInfo()).toEqual(bmak["informinfo"]);
    });

    // -1,2,-94,-108
    test("keyboard", async () => {
      // Listen events on Window
      await page.evaluate(() => {
        kEvents = [];

        ["keydown", "keyup", "keypress"].forEach((type) => {
          document.addEventListener(type, (event) => {
            const pickedEvent = (({
              keyCode,
              charCode,
              ctrlKey,
              shiftKey,
              metaKey,
              altKey,
              type,
              which,
              isTrusted,
              target: { name, id },
            }) => ({
              keyCode,
              charCode,
              ctrlKey,
              shiftKey,
              metaKey,
              altKey,
              type,
              which,
              isTrusted,
              target: { name, id },
            }))(event);

            kEvents.push(pickedEvent);
          });
        });
      });

      // Mock Events
      await page.keyboard.press("Enter");

      /**
       * * WARNING: #TypeaheadSearchInput is not present if the server sends a mobile rendered page. The server does this from time to time. In this case, simply rerun the suite.
       */
      await page.type("#TypeaheadSearchInput", "TestString"); // search string
      await page.keyboard.press("Tab");

      // Recorded Events
      kEvents = await page.evaluate(() => kEvents);

      // Tests
      bmak["kact"] = await page.evaluate(() => bmak.kact);
      const generated = akamai.generateKeyboard(kEvents);

      // expect(generated).toEqual(bmak["kact"]);

      const kactPieces = bmak["kact"].split(";");
      const generatedPieces = generated.split(";");

      // check if all keystrokes are captured
      expect(generatedPieces.length).toEqual(kactPieces.length);

      // check if every single keystroke data is matching
      generatedPieces.forEach((_, i) => {
        generatedChunks = generatedPieces[i].split(",");
        generatedChunks.splice(2, 1);

        kactChunks = kactPieces[i].split(",");
        kactChunks.splice(2, 1);

        expect(generatedChunks).toEqual(kactChunks);
      });
    });

    // -1,2,-94,-110
    test("mouse", async () => {
      // Listen events on window
      await page.evaluate(() => {
        mEvents = [];

        ["mousemove", "click", "mousedown", "mouseup"].forEach((type) => {
          document.addEventListener(type, (event) => {
            const pickedEvent = (({
              pageX,
              pageY,
              clientX,
              clientY,
              type,
              which,
              isTrusted,
              target: { name, id },
            }) => ({
              pageX,
              pageY,
              clientX,
              clientY,
              type,
              which,
              isTrusted,
              target: { name, id },
            }))(event);

            mEvents.push(pickedEvent);
          });
        });
      });

      // Mock Events
      await page.mouse.move(10, 10);
      await page.mouse.down();
      await page.mouse.move(10, 100);
      await page.mouse.move(100, 100);
      await page.mouse.click(100, 100, { button: "left" });
      await page.mouse.click(100, 100, { button: "right" });
      await page.mouse.move(100, 10);
      await page.mouse.move(10, 10);
      await page.mouse.up();

      // Recorded Events
      const mEvents = await page.evaluate(() => mEvents);

      // Tests
      bmak["mact"] = await page.evaluate(() => bmak.mact);
      const generated = akamai.generateMouse(mEvents);

      // expect(generated).toEqual(bmak["mact"]);

      const mactPieces = bmak["mact"].split(";");
      const generatedPieces = generated.split(";");

      // check if all mousestrokes are captured
      expect(generatedPieces.length).toEqual(mactPieces.length);

      // check if every single mousetroke data is matching
      generatedPieces.forEach((_, i) => {
        generatedChunks = generatedPieces[i].split(",");
        generatedChunks.splice(2, 1);

        mactChunks = mactPieces[i].split(",");
        mactChunks.splice(2, 1);

        expect(generatedChunks).toEqual(mactChunks);
      });
    });

    // -1,2,-94,-117
    test("touch", () => {
      expect(akamai.generateTouch()).toEqual(bmak.tact);
    });

    // -1,2,-94,-111
    test("device orientation", () => {
      const doactPieces = bmak["doact"].split(",");
      const generatedPieces = akamai.generateDeviceOrientation().split(",");

      doactPieces.splice(1, 1);
      generatedPieces.splice(1, 1);

      expect(generatedPieces).toEqual(doactPieces);
    });

    // -1,2,-94,-109
    test("device motion", () => {
      const dmactPieces = bmak["dmact"].split(",");
      const generatedPieces = akamai.generateDeviceMotion().split(",");

      dmactPieces.splice(1, 1);
      generatedPieces.splice(1, 1);

      expect(generatedPieces).toEqual(dmactPieces);
    });

    // -1,2,-94,-114
    test("pointer", () => {
      expect(akamai.generatePointer()).toEqual(bmak.pact);
    });

    // -1,2,-94,-103
    test("window visibility", () => {
      expect(akamai.generateWindowVisibility()).toEqual(bmak.vcact);
    });

    // -1,2,-94,-112
    test("url", async () => {
      bmak["url"] = await page.evaluate(() => window.location.href);
      expect(akamai.url).toEqual(bmak["url"]);
    });

    // -1,2,-94,-115
    // TODO: Cookie Signature

    // -1,2,-94,-106
    // TODO: Ajax Info

    // -1,2,-94,-119
    // ? Expected has no decimal place but received has decimal place.
    test("math random", () => {
      expect(akamai.generateMathRandom().split(",").length).toEqual(
        bmak.mr.split(",").length
      );
    });

    // -1,2,-94,-122
    test("sed", async () => {
      bmak.sed = await page.evaluate(() => bmak.sed());
      expect(akamai.generateSed()).toEqual(bmak.sed);
    });

    // -1,2,-94,-123 | -1,2,-94,-126 | -1,2,-94,-124
    test("mn_r", async () => {
      bmak.sensor_data = await page.evaluate(() => bmak.sensor_data);
      const empty123 = /-1,2,-94,-123,(.*)-1,2,-94,-124/gm.exec(
        bmak.sensor_data
      )[1];
      const empty126 = /-1,2,-94,-126,(.*)-1,2,-94,-127/gm.exec(
        bmak.sensor_data
      )[1];
      const empty124 = /-1,2,-94,-124,(.*)-1,2,-94,-126/gm.exec(
        bmak.sensor_data
      )[1];

      expect("").toEqual(empty123);
      expect("").toEqual(empty126);

      // ? Why is this being generated?
      // expect("").toEqual(empty124);
    });

    // -1,2,-94,-127
    test("permissions", () => {
      expect(akamai.generateNavigatorPermissions().length).toEqual(
        bmak["nav_perm"].length
      );
    });

    // -1,2,-94,-70
    test("fingerprint", () => {
      expect(akamai.generateFingerPrint().split(";").slice(2)).toEqual(
        bmak["fpcf"]["fpValstr"].split(";").slice(2)
      );
    });

    // -1,2,-94,-80
    test("fingerprint encoded", async () => {
      const encoded = await page.evaluate(() =>
        bmak.ab(bmak["fpcf"]["fpValstr"])
      );

      expect(
        Math.abs(akamai.encode2(akamai.generateFingerPrint()) - encoded)
      ).toBeLessThanOrEqual(100);
    });

    // -1,2,-94,-116
    test("o9 timestamp", async () => {
      expect(
        Math.abs(akamai.o9.toString().length - bmak.o9.toString().length)
      ).toBeLessThanOrEqual(2);
    });

    // -1,2,-94,-118
    // TODO: Sensor data encoded

    // -1,2,-94,-129
    // TODO: Graphics card

    // -1,2,-94,-121
    test("execution time", () => {
      const executionTime = /-1,2,-94,-121,(.*)/gm.exec(bmak["sensor_data"])[1];
      const [, first, second] = executionTime.split(";");
      const [
        ,
        firstGenerated,
        secondGenerated,
      ] = akamai.generateExecutionTime().split(";");

      expect(Math.abs(first - firstGenerated)).toBeLessThanOrEqual(100);
      expect(Math.abs(second - secondGenerated)).toBeLessThanOrEqual(100);
    });

    test("sensors are exhausted", () => {
      const regex = /-1,2,-94,-\d{3}/gm;

      bmak.sensors = [];
      for (let match of bmak.sensor_data.matchAll(regex)) {
        bmak.sensors.push(match[0]);
      }

      const sensors = [];
      for (let match of akamai.generate().matchAll(regex)) {
        sensors.push(match[0]);
      }

      expect(sensors).toEqual(bmak.sensors);
    });
  });
});
