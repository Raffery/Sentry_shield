(function () {
  let devtoolsOpen = false;

  function isDevToolsOpen() {
    // Simple heuristic: measure window size difference
    const threshold = 160;
    return (
      window.outerWidth - window.innerWidth > threshold ||
      window.outerHeight - window.innerHeight > threshold
    );
  }

  async function sendAlert() {
    try {
      await fetch("https://your-domain.com/api/alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: window.location.pathname,
          time: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }),
      });
    } catch (e) {
      // Fail silently
      console.warn("Alert sending failed:", e);
    }
  }

  setInterval(() => {
    if (isDevToolsOpen()) {
      if (!devtoolsOpen) {
        devtoolsOpen = true;
        sendAlert();
      }
    } else {
      devtoolsOpen = false;
    }
  }, 1000);
})();
