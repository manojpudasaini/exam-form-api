const puppeteer = require("puppeteer");

const fs = require("fs-extra");

const hbs = require("handlebars");

const path = require("path");
exports.createForm = async (req, res) => {
  const compile = async function (templateName, data) {
    const filePath = path.join(
      process.cwd(),
      "templates",
      `${templateName}.hbs`
    );
    const html = await fs.readFile(filePath, "utf8");
    console.log(html);
    return hbs.compile(html)(data);
  };
  (async function () {
    try {
      const browser = await puppeteer.launch();

      const page = await browser.newPage();
      const data = req.body;
      console.log(data);

      const content = await compile("index", data);

      console.log(content);
      await page.setContent(content);
      await page.emulateMediaType("screen");
      await page.pdf({
        path: "output.pdf",
        format: "A4",
        printBackground: true,
      });

      console.log("done creating pdf");

      await browser.close();
      return res.send("success");
    } catch (e) {
      console.log(e);
    }
  })();
};
