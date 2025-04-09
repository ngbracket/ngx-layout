---
sidebar_position: 4
---

# ObservableMedia

The injectable ObservableMedia service will provide mediaQuery activations notifications for all registered BreakPoints.

This service is essentially an Observable that exposes both features to subscribe to mediaQuery changes and a validator method .isActive() to test if a mediaQuery (or alias) is currently active.

Only mediaChange activations (not deactivations) are announced by the ObservableMedia!
