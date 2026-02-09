(function () {
  "use strict";

  // ==================== CONFIGURATION ====================
  // Get config from window object (set by customer before loading this script)
  const userConfig = window.SENTRY_SHIELD_CONFIG || {};
  
  const CONFIG = {
    API_ENDPOINT: userConfig.endpoint || "https://api.sentryshield.com/v1/alert",
    API_KEY: userConfig.apiKey || "",
    CHECK_INTERVAL: userConfig.checkInterval || 500,
    DEBOUNCE_TIME: userConfig.debounceTime || 2000,
    MAX_ALERTS_PER_SESSION: userConfig.maxAlertsPerSession || 10,
    ENABLE_BEHAVIOR_TRACKING: userConfig.enableBehaviorTracking !== false,
    ENABLE_REMOTE_DETECTION: userConfig.enableRemoteDetection !== false,
    ENABLE_BLACK_SCREEN_DETECTION: userConfig.enableBlackScreenDetection !== false,
    TEST_MODE: userConfig.testMode || false,
    ON_ALERT_SENT: userConfig.onAlertSent || null,
  };

  // Validate API key
  if (!CONFIG.API_KEY && !CONFIG.TEST_MODE) {
    console.error('[SentryShield] ERROR: API key not provided. Set window.SENTRY_SHIELD_CONFIG.apiKey');
    return;
  }

  // ==================== STATE ====================
  const state = {
    devtoolsOpen: false,
    alertCount: 0,
    lastAlertTime: 0,
    sessionId: generateSessionId(),
    debounceTimer: null,
    pageLoadTime: Date.now(),
    mouseMovements: 0,
    keystrokes: 0, 
    clicks: 0,
    blackScreenDetected: false,
    remoteSessionDetected: false,
  };

  // ==================== UTILITY FUNCTIONS ====================
  function generateSessionId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  function log(level, ...args) {
    if (CONFIG.TEST_MODE) {
      console[level]('[SentryShield]', ...args);
    }
  }

  // ==================== DEVTOOLS DETECTION ====================
  function isDevToolsOpen() {
    let detected = false;

    // Method 1: Window size difference
    const threshold = 160;
    if (window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold) {
      detected = true;
    }

    // Method 2: Debugger timing check
    const start = performance.now();
    // eslint-disable-next-line no-debugger
    debugger;
    const end = performance.now();
    if (end - start > 100) {
      detected = true;
    }

    // Method 3: Console detection
    const element = {};
    let consoleOpen = false;
    Object.defineProperty(element, 'id', {
      get: function() {
        consoleOpen = true;
        return 'detect';
      }
    });
    console.log('%c', element);
    if (consoleOpen) {
      detected = true;
    }

    return detected;
  }

  // ==================== REMOTE SESSION DETECTION ====================
  function detectRemoteSession() {
    if (!CONFIG.ENABLE_REMOTE_DETECTION) {
      return {};
    }

    const indicators = {
      teamviewer: false,
      anydesk: false,
      suspiciousResolution: false,
      multiMonitor: false,
    };

    // Check DOM
    if (document.querySelector('[class*="teamviewer"], [id*="teamviewer"]')) {
      indicators.teamviewer = true;
    }
    if (document.querySelector('[class*="anydesk"], [id*="anydesk"]')) {
      indicators.anydesk = true;
    }

    // Check user agent
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('teamviewer')) indicators.teamviewer = true;
    if (ua.includes('anydesk')) indicators.anydesk = true;

    // Check screen anomalies
    const aspectRatio = window.screen.width / window.screen.height;
    if (aspectRatio < 1 || aspectRatio > 2.5) {
      indicators.suspiciousResolution = true;
    }

    if (window.screen.availWidth !== window.screen.width ||
        window.screen.availHeight !== window.screen.height) {
      indicators.multiMonitor = true;
    }

    state.remoteSessionDetected = Object.values(indicators).some(v => v);
    return indicators;
  }

  // ==================== BLACK SCREEN DETECTION ====================
  function detectBlackScreen() {
    if (!CONFIG.ENABLE_BLACK_SCREEN_DETECTION) {
      return false;
    }

    const body = document.body;
    if (!body) return false;

    const bodyStyle = window.getComputedStyle(body);
    if (bodyStyle.backgroundColor === 'rgb(0, 0, 0)' ||
        bodyStyle.backgroundColor === 'black') {
      return true;
    }

    // Check for overlays
    const elements = document.querySelectorAll('*');
    for (let el of elements) {
      const style = window.getComputedStyle(el);
      if (style.position === 'fixed' &&
          (style.backgroundColor === 'rgb(0, 0, 0)' || style.backgroundColor === 'black') &&
          (parseInt(style.zIndex) || 0) > 1000) {
        const rect = el.getBoundingClientRect();
        if (rect.width > window.innerWidth * 0.9 &&
            rect.height > window.innerHeight * 0.9) {
          return true;
        }
      }
    }

    return false;
  }

  // ==================== BANKING PAGE DETECTION ====================
  function detectBankingPage() {
    const keywords = ['balance', 'account', 'savings', 'checking', 'transaction', 'transfer'];
    const url = window.location.href.toLowerCase();
    const title = document.title.toLowerCase();
    return keywords.some(k => url.includes(k) || title.includes(k));
  }

  function isBalanceVisible() {
    const selectors = [
      '[class*="balance"]', '[class*="amount"]',
      '[id*="balance"]', '[id*="amount"]',
      '.account-balance', '.total-balance'
    ];
    return selectors.some(s => {
      const el = document.querySelector(s);
      return el && el.offsetParent !== null;
    });
  }

  // ==================== BEHAVIORAL TRACKING ====================
  function initBehaviorTracking() {
    if (!CONFIG.ENABLE_BEHAVIOR_TRACKING) return;

    let lastMouseMove = 0;
    document.addEventListener('mousemove', () => {
      const now = Date.now();
      if (now - lastMouseMove > 100) {
        state.mouseMovements++;
        lastMouseMove = now;
      }
    }, { passive: true });

    document.addEventListener('keydown', () => {
      state.keystrokes++;
    }, { passive: true });

    document.addEventListener('click', () => {
      state.clicks++;
    }, { passive: true });
  }

  // ==================== SEVERITY CALCULATION ====================
  function calculateSeverity(remoteSession, blackScreen) {
    if ((remoteSession.teamviewer || remoteSession.anydesk) && blackScreen) {
      return "CRITICAL";
    }
    if (remoteSession.teamviewer || remoteSession.anydesk) {
      return "HIGH";
    }
    if (remoteSession.suspiciousResolution || blackScreen) {
      return "HIGH";
    }
    return "MEDIUM";
  }

  // ==================== ALERT SENDING ====================
  async function sendAlert() {
    // Rate limiting
    if (state.alertCount >= CONFIG.MAX_ALERTS_PER_SESSION) {
      log('warn', 'Max alerts reached');
      return;
    }

    const now = Date.now();
    if (now - state.lastAlertTime < 20000) {
      return;
    }

    state.alertCount++;
    state.lastAlertTime = now;

    const remoteSession = detectRemoteSession();
    const blackScreen = detectBlackScreen();
    const severity = calculateSeverity(remoteSession, blackScreen);

    if (blackScreen) state.blackScreenDetected = true;

    const payload = {
      apiKey: CONFIG.API_KEY,
      sessionId: state.sessionId,
      url: window.location.href,
      pathname: window.location.pathname,
      pageTitle: document.title,
      timestamp: new Date().toISOString(),
      timeOnPage: Math.floor((now - state.pageLoadTime) / 1000),
      userAgent: navigator.userAgent,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      windowSize: `${window.innerWidth}x${window.innerHeight}`,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      remoteSession: remoteSession,
      isRemoteSessionDetected: state.remoteSessionDetected,
      blackScreenDetected: blackScreen,
      severity: severity,
      isBankingPage: detectBankingPage(),
      isBalanceVisible: isBalanceVisible(),
      mouseMovements: state.mouseMovements,
      keystrokes: state.keystrokes,
      clicks: state.clicks,
      alertNumber: state.alertCount,
      referrer: document.referrer || "direct",
      connectionType: navigator.connection?.effectiveType || "unknown",
    };

    // Test mode
    if (CONFIG.TEST_MODE) {
      log('info', 'TEST MODE - Alert would be sent:', payload);
      if (CONFIG.ON_ALERT_SENT) {
        CONFIG.ON_ALERT_SENT(payload);
      }
      return;
    }

    // Send with retry
    let retries = 3;
    while (retries > 0) {
      try {
        const response = await fetch(CONFIG.API_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": CONFIG.API_KEY,
          },
          body: JSON.stringify(payload),
          mode: "cors",
          credentials: "omit",
        });

        if (response.ok) {
          log('info', 'Alert sent successfully');
          if (CONFIG.ON_ALERT_SENT) {
            CONFIG.ON_ALERT_SENT(payload);
          }
          break;
        } else {
          throw new Error(`HTTP ${response.status}`);
        }
      } catch (error) {
        retries--;
        if (retries === 0) {
          // Store for retry
          try {
            const failed = JSON.parse(localStorage.getItem('sentry_failed_alerts') || '[]');
            failed.push({ payload, timestamp: now });
            localStorage.setItem('sentry_failed_alerts', JSON.stringify(failed.slice(-10)));
          } catch (e) {
            // Ignore
          }
        } else {
          await new Promise(r => setTimeout(r, (4 - retries) * 1000));
        }
      }
    }
  }

  // ==================== RETRY FAILED ALERTS ====================
  function retryFailedAlerts() {
    if (CONFIG.TEST_MODE) return;
    
    try {
      const failed = JSON.parse(localStorage.getItem('sentry_failed_alerts') || '[]');
      if (failed.length > 0) {
        localStorage.removeItem('sentry_failed_alerts');
        failed.forEach((alert, i) => {
          setTimeout(async () => {
            try {
              await fetch(CONFIG.API_ENDPOINT, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-API-Key": CONFIG.API_KEY,
                },
                body: JSON.stringify({
                  ...alert.payload,
                  retried: true,
                  originalTimestamp: alert.timestamp,
                }),
              });
            } catch (e) {
              // Ignore
            }
          }, i * 2000);
        });
      }
    } catch (e) {
      // Ignore
    }
  }

  // ==================== MAIN DETECTION LOOP ====================
  function checkForThreats() {
    const devtoolsNowOpen = isDevToolsOpen();
    const blackScreen = detectBlackScreen();

    if (devtoolsNowOpen && !state.devtoolsOpen) {
      state.devtoolsOpen = true;
      if (state.debounceTimer) clearTimeout(state.debounceTimer);
      state.debounceTimer = setTimeout(() => {
        if (state.devtoolsOpen) sendAlert();
      }, CONFIG.DEBOUNCE_TIME);
    } else if (!devtoolsNowOpen && state.devtoolsOpen) {
      state.devtoolsOpen = false;
      if (state.debounceTimer) {
        clearTimeout(state.debounceTimer);
        state.debounceTimer = null;
      }
    }

    if (blackScreen && !state.blackScreenDetected) {
      state.blackScreenDetected = true;
      sendAlert();
    } else if (!blackScreen && state.blackScreenDetected) {
      state.blackScreenDetected = false;
    }
  }

  // ==================== INITIALIZATION ====================
  function init() {
    log('info', 'Initializing protection...');
    initBehaviorTracking();
    retryFailedAlerts();
    setInterval(checkForThreats, CONFIG.CHECK_INTERVAL);
    checkForThreats();
    log('info', 'Protection active');
  }

  // ==================== CLEANUP ====================
  window.addEventListener('beforeunload', () => {
    if (state.debounceTimer) clearTimeout(state.debounceTimer);
  });

  // ==================== START ====================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
