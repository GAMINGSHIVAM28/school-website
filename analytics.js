/**
 * analytics.js
 * Advanced website analytics tracking module
 * Collects page views, events, and user info, and sends to analytics endpoint
 */

const Analytics = (() => {
    const endpoint = 'https://your-analytics-endpoint.com/track';
    const sessionId = (() => {
        let sid = sessionStorage.getItem('analytics_sid');
        if (!sid) {
            sid = Math.random().toString(36).substr(2, 12) + Date.now();
            sessionStorage.setItem('analytics_sid', sid);
        }
        return sid;
    })();

    function getUserInfo() {
        return {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            screen: {
                width: window.screen.width,
                height: window.screen.height,
            },
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
    }

    function send(data) {
        navigator.sendBeacon(
            endpoint,
            JSON.stringify({
                ...data,
                sessionId,
                timestamp: new Date().toISOString(),
                url: window.location.href,
                referrer: document.referrer,
            })
        );
    }

    function trackPageView() {
        send({
            type: 'pageview',
            user: getUserInfo(),
        });
    }

    function trackEvent(eventName, eventData = {}) {
        send({
            type: 'event',
            event: eventName,
            data: eventData,
            user: getUserInfo(),
        });
    }

    // Auto-track page views
    window.addEventListener('DOMContentLoaded', trackPageView);

    // Expose API
    return {
        trackPageView,
        trackEvent,
    };
})();

// Example usage:
// Analytics.trackEvent('button_click', { id: 'signup-btn' });

export default Analytics;