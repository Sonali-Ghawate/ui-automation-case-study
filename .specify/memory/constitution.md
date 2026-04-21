<!--
# SYNC IMPACT REPORT — Constitution v1.0.0 → v1.1.0

## Version Change: 1.0.0 → 1.1.0 (MINOR bump)
**Rationale**: Expanded guidance on selector strategy, test data security, reporting, and test isolation. All changes backward-compatible; existing tests remain valid.

## Modified Principles
- **I. Page Object Model**: Added clarity on POM inheritance model + base class pattern
- **III. Comprehensive Scenario Coverage**: Renamed from "II" (reordered), enhanced test naming standards
- **IV. Test-First**: Renamed from "III" (reordered), emphasized independent test design
- **V. TypeScript & Playwright Standards**: Enhanced with HTML reporter requirement, Playwright locator preference

## Principles Added
- **II. Selector Strategy: Data Attributes First** (NEW): Explicit locator strategy (data-qa > id, avoid XPath)
- **VI. Test Data Management & Security (NEW)**: Credentials in .env, test data isolated, session reset between tests
- **VII. Clear Test Documentation & Observability** (RENAMED from V): Enhanced with assertion clarity, HTML report emphasis

## Sections Restructured
- **Technology Stack Requirements**: Expanded with specific versions (TS v5.0+, Node v16+), reporter config added
- **Scope & Test Flows**: Renamed to "Scope: Three Core Flows", broken into Flow 1-3 with specific scenario numbers
- **New Section**: "Test Execution & Isolation" — explicit setup/teardown, parallel safety, test independence
- **Governance**: Expanded with amendment process, semantic versioning policy

## Template Sync Status
- **spec-template.md**: ✅ ALIGNED — Accepts independent test scenarios, emphasizes acceptance criteria
- **plan-template.md**: ✅ ALIGNED — Supports Page Object architecture, TypeScript/Playwright stack documented
- **tasks-template.md**: ✅ ALIGNED — Task structure supports independent test story execution, POM task types recognized

## Follow-Up TODOs
None. All placeholders replaced with concrete guidance specific to automationexercise.com.

**Report Generated**: 2026-04-21
-->

# Playwright UI Test Automation Constitution
<!-- Governance: automationexercise.com Test Automation Suite -->

## Core Principles

### I. Page Object Model (NON-NEGOTIABLE)
Every test interaction with the application MUST flow through a Page Object encapsulating selectors and behavior. No hardcoded selectors in test files. Each page gets dedicated POM class (e.g., `LoginPage`, `ProductsPage`, `CartPage`) with methods representing user actions. Clear separation between test logic and UI manipulation ensures maintainability and resilience to UI changes. Base `PageObjectBase` abstract class provides shared functionality.

### II. Selector Strategy: Data Attributes First
Locators MUST prioritize `data-qa` attributes as primary strategy; fall back to stable `id` attributes. Avoid XPath and overly specific CSS selectors. Playwright's built-in locators (`getByRole`, `getByText`, `getByTestId`) strongly preferred over selectors. Locator brittleness is a blocker for POM review. Selector changes must be isolated to POM layer only.

### III. Comprehensive Scenario Coverage (NON-NEGOTIABLE)
All test flows MUST include: happy path (valid inputs, successful outcomes), invalid input handling (bad credentials, malformed data), empty field validation (required field checks), and error state verification (error messages displayed correctly). Each test covers ONE logical behavior. Complex user journeys decomposed into focused, independent test cases. Test names MUST reflect business context (e.g., "login_with_invalid_password", not "test_login_3").

### IV. Test-First & Independent Test Design (NON-NEGOTIABLE)
Test cases MUST be designed and approved before implementation begins. Each test independently testable without requiring other tests to pass first. Red-Green-Refactor cycle strictly enforced: write failing test → get approval → implement code → verify test passes. No test skipping, no pending tests, no assumptions about application behavior.

### V. TypeScript & Playwright Standards
All code MUST be TypeScript (v5.0+) with strict type checking enabled. Playwright (latest stable) is the sole automation engine. Modern async/await patterns required; no callback chains. No console warnings or type errors. Code review includes TypeScript compilation check. Tests run with Playwright HTML Reporter; all test runs produce artifacts in `reports/html-report/`.

### VI. Test Data Management & Security (NON-NEGOTIABLE)
No hardcoded credentials in code or test files. Valid test credentials stored in `.env` file (git-ignored). Test data constants (product names, search terms, invalid data examples) organized in dedicated `data/test-data.ts`. Test isolation ensured via setup/teardown hooks: login before each test, logout/clear cart after each test. Session state not assumed to persist between test runs.

### VII. Clear Test Documentation & Observability
Each test MUST include descriptive comments: scenario description, expected behavior, and assertion rationale. Meaningful assertion error messages (e.g., "Login error message should display 'Invalid credentials'" instead of generic assertion failures). Console logging for critical test flow steps during debugging; debug logs disabled in normal test runs. HTML report captures screenshots and logs for every test.

## Technology Stack Requirements

**Language**: TypeScript (v5.0+) with strict mode enabled.
**Framework**: Playwright (latest stable), TypeScript bindings.
**Target**: automationexercise.com (UI interaction only).
**Test Data**: `.env` file for credentials, `data/test-data.ts` for constants.
**Reporting**: Playwright HTML Reporter with screenshots, video on failure (optional).
**Supported Browsers**: Chromium (default), Firefox, WebKit (parallel execution).
**Node.js**: v16+ required.

No backend API mocking, no backend validation testing—UI interaction only.

## Scope: Three Core Flows

### Flow 1: User Login (Scenarios: US1-US4)
Happy path: valid email/password → authenticated state. Error scenarios: invalid password, empty fields, invalid email format. Assertion scope: successful authentication OR error message display, user NOT authenticated.

### Flow 2: Product Browsing (Scenarios: US5-US8)
Happy path: view all products, search for valid product. Error scenarios: search non-existent product, empty search. Assertion scope: products display with name/price/rating/image, search results accurate, empty state feedback.

### Flow 3: Add to Cart (Scenarios: US9-US12)
Happy path: add product, verify cart count increments. Error scenarios: empty cart state, multiple items tracking. Assertion scope: cart count reflects additions, cart items display with price/quantity/total, empty cart shows proper message.

## Test Execution & Isolation

All tests run with complete isolation. Before each test: navigate to base URL. After each test: clear browser cache, logout if logged in, reset cart. Parallel execution supported: tests can run across multiple workers without state conflicts. Test order independence MUST be maintained—no test depends on another test's data.

## Governance & Amendment

All code changes MUST align with these seven Core Principles. Constitution supersedes ad-hoc testing practices. Page Object modifications subject to POM review (selector strategy verified). New test flows added must follow full scenario coverage requirement (happy path + all error cases). Changes to this constitution require documentation of version bump rationale and team notification.

**Amendment Process**: Version follows semantic versioning (MAJOR.MINOR.PATCH).
- **MAJOR**: Breaking changes to test structure, tool replacement, scope reduction.
- **MINOR**: New principle added, existing principle expanded, new test flows defined.
- **PATCH**: Clarifications, wording adjustments, non-semantic refinements.

**Version**: 1.1.0 | **Ratified**: 2026-04-21 | **Last Amended**: 2026-04-21
