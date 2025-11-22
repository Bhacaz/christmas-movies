const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log("Navigating to http://localhost:8081...");
  await page.goto("http://localhost:8081");

  // Wait a bit for the scroll to happen
  await page.waitForTimeout(1000);

  const result = await page.evaluate(() => {
    const day22 = Array.from(document.querySelectorAll(".day")).find(
      (el) => el.textContent.trim() === "22"
    );
    if (!day22) return { found: false };

    const cardWrapper = day22.closest(".movie-card-wrapper");
    const rect = cardWrapper.getBoundingClientRect();
    const inView = rect.top >= 0 && rect.bottom <= window.innerHeight;

    const overlay = cardWrapper.querySelector(".gift-overlay");
    const isUnwrapped = overlay ? overlay.classList.contains("unwrap") : false;

    return {
      found: true,
      scrollY: window.scrollY,
      inView,
      isUnwrapped,
    };
  });

  console.log("Validation Result:", result);

  if (result.found && result.inView && result.isUnwrapped) {
    console.log("SUCCESS: Card 22 is in view and unwrapped.");
  } else {
    console.error("FAILURE: Card 22 check failed.");
  }

  await browser.close();
})();
