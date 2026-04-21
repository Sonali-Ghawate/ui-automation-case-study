# Tasks: Core UI Test Scenarios — automationexercise.com

**Feature Branch**: `001-core-flow-tests`  
**Input**: Design documents from `/specs/001-core-flow-tests/`
**Tech Stack**: Playwright, TypeScript, Page Object Model, Playwright HTML Reporter

---

## Format: `[ID] [P?] [Story?] Description`

- **[ID]**: Task identifier (T001, T002, etc.) in execution order
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: User story this task belongs to (US1, US2, etc.)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Initialize Playwright project with TypeScript, dependencies, and configuration

- [ ] T001 Initialize Playwright TypeScript project with `npm init` and package.json
- [ ] T002 [P] Install Playwright dependencies: `@playwright/test` and related packages
- [ ] T003 [P] Install TypeScript and ts-node development dependencies
- [ ] T004 [P] Configure TypeScript compiler options in `tsconfig.json` (strict mode, module resolution)
- [ ] T005 [P] Configure Playwright config in `playwright.config.ts` (browsers, base URL, reporter settings)
- [ ] T006 Create `.env` file for test data (valid email, password for automationexercise.com account)
- [ ] T007 Create `playwright.config.ts` with Playwright HTML Reporter configuration in `reporter: 'html'`
- [ ] T008 Setup project folder structure: `pages/`, `tests/`, `utils/`, `data/`, `reports/`
- [ ] T009 [P] Create GitHub Actions workflow for CI/CD (optional - future enhancement)

**Checkpoint**: Playwright project ready with configuration and dependencies installed

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core Page Object Model framework and test utilities that ALL test stories depend on

**⚠️ CRITICAL**: No test implementation can begin until this phase is complete

- [ ] T010 Create base PageObject abstract class in `pages/page.object.base.ts` with constructor, page fixture, and common methods
- [ ] T011 [P] Create test data utilities in `data/test-data.ts` (constants for product names, search terms, invalid data)
- [ ] T012 [P] Create selector strategies utilities in `utils/selectors.ts` (helper functions for data-qa, id selectors)
- [ ] T013 [P] Configure test hooks in `playwright.config.ts` (beforeEach: reset to home page, clear cache if needed)
- [ ] T014 Create environment setup utility in `utils/env.config.ts` to load `.env` file with valid credentials
- [ ] T015 [P] Create assertion helpers in `utils/assertions.ts` for common validations (visibility, text content, count)
- [ ] T016 Create base test setup in `tests/fixtures.ts` (Playwright test context fixtures)

**Checkpoint**: Page Object framework ready — all page objects can now inherit from base class

---

## Phase 3: Login Tests (User Stories 1-4) — Core Authentication Flow

**Goal**: Implement comprehensive login testing covering valid credentials, error handling, and validation

**Independent Test**: Each login scenario is independently testable without other flows

---

### Implementation for User Story 1: Valid Login (P1)

- [ ] T017 [P] Create LoginPage page object in `pages/login.page.ts` with methods:
  - `goto()` — Navigate to /login
  - `fillEmail(email)` — Enter email in input field using data-qa attribute
  - `fillPassword(password)` — Enter password in input field using data-qa attribute
  - `clickLoginButton()` — Click login submit button
  - `isLoggedIn()` — Verify successful login by checking dashboard/home page element
  - `getErrorMessage()` — Return error message locator

- [ ] T018 [US1] Create test file `tests/login.valid.spec.ts` with test: "User successfully logs in with valid credentials"
  - Test flow: Navigate to login → Fill valid email and password → Click login → Verify redirect to dashboard/authenticated page
  - Verify: User is authenticated and page shows authenticated elements (logout button, user name, etc.)

---

### Implementation for User Story 2: Invalid Password (P1)

- [ ] T019 [US2] Add test to `tests/login.invalid-password.spec.ts`: "Login fails with valid email but wrong password"
  - Test flow: Navigate to login → Fill valid email with incorrect password → Click login → Verify error message displayed
  - Verify error message contains "Invalid Email address or password"
  - Verify user remains on login page (URL unchanged)

---

### Implementation for User Story 3: Empty Fields Validation (P1)

- [ ] T020 [P] [US3] Add test to `tests/login.empty-fields.spec.ts`: "Login prevents submission with empty email field"
  - Test flow: Navigate to login → Leave email empty, fill password → Click login → Verify validation or error

- [ ] T021 [P] [US3] Add test to `tests/login.empty-fields.spec.ts`: "Login prevents submission with empty password field"
  - Test flow: Navigate to login → Fill email, leave password empty → Click login → Verify validation or error

- [ ] T022 [P] [US3] Add test to `tests/login.empty-fields.spec.ts`: "Login prevents submission with both fields empty"
  - Test flow: Navigate to login → Leave both empty → Click login → Verify validation or error

---

### Implementation for User Story 4: Invalid Email Format (P1)

- [ ] T023 [P] [US4] Add test to `tests/login.invalid-email.spec.ts`: "Login rejects email without @ symbol"
  - Test flow: Navigate to login → Fill "invalidemail" (no @) and password → Click login → Verify error
  - Verify error indicates invalid email format

- [ ] T024 [P] [US4] Add test to `tests/login.invalid-email.spec.ts`: "Login rejects email without domain"
  - Test flow: Navigate to login → Fill "user@" (missing domain) and password → Click login → Verify error

- [ ] T025 [P] [US4] Add test to `tests/login.invalid-email.spec.ts`: "Login rejects email with double @@ symbol"
  - Test flow: Navigate to login → Fill "user@@domain.com" and password → Click login → Verify error

**Checkpoint**: All login scenarios (US1-US4) fully functional and independently testable. Proceed to product browsing tests.

---

## Phase 4: Product Browsing Tests (User Stories 5-8) — Product Discovery

**Goal**: Implement product viewing and search functionality testing

**Independent Test**: Product browsing features work independently without login/cart integration

---

### Implementation for User Story 5: View All Products (P1)

- [ ] T026 [P] Create ProductsPage page object in `pages/products.page.ts` with methods:
  - `goto()` — Navigate to /products
  - `getProductCards()` — Return all product card locators
  - `getProductCount()` — Return number of products visible
  - `getProductNames()` — Extract all product names
  - `getProductPrices()` — Extract all product prices
  - `addFirstProductToCart()` — Click add to cart button on first product
  - `searchProduct(name)` — Fill search field and submit search

- [ ] T027 [US5] Create test file `tests/products.view-all.spec.ts`: "User views all products on products page"
  - Test flow: Navigate to products page → Verify products load → Verify each product displays name, price, rating, image
  - Verify: Multiple products visible (at least 5), all have complete information

---

### Implementation for User Story 6: Search Valid Product (P1)

- [ ] T028 [US6] Add test to `tests/products.search-valid.spec.ts`: "Search returns matching products for valid search term"
  - Test flow: Navigate to products → Search for "Top" (known search term) → Verify results contain "Blue Top" product
  - Verify: Results show correct product with price, rating, image
  - Verify: Search results count > 0

---

### Implementation for User Story 7: Search Invalid Product (P2)

- [ ] T029 [US7] Add test to `tests/products.search-invalid.spec.ts`: "Search displays empty state for non-existent product"
  - Test flow: Navigate to products → Search for "NonexistentProduct12345" → Verify empty state message
  - Verify: Message indicates no products found or results are empty
  - Verify: No error exception thrown

---

### Implementation for User Story 8: Empty Search Field (P2)

- [ ] T030 [US8] Add test to `tests/products.search-empty.spec.ts`: "Search with empty field either prevents submission or shows all products"
  - Test flow: Navigate to products → Click search button with empty search field → Verify behavior
  - Verify: Either validation prevents submission OR all products display again
  - Verify: No error or exception

**Checkpoint**: Product browsing (US5-US8) fully functional and independently testable. Proceed to cart tests.

---

## Phase 5: Add to Cart Tests (User Stories 9-12) — Shopping Cart Flow

**Goal**: Implement shopping cart functionality including adding products, tracking count, viewing contents, and empty state

**Independent Test**: Cart operations are independently testable; can be tested without full login flow for cart-specific features

---

### Implementation for User Story 9: Add Product to Cart (P1)

- [ ] T031 [P] Create CartPage page object in `pages/cart.page.ts` with methods:
  - `goto()` — Navigate to /view_cart
  - `getCartItems()` — Return cart item row locators
  - `getCartItemCount()` — Return number of items in cart display/counter
  - `getCartTotal()` — Return total price value
  - `getEmptyCartMessage()` — Return empty cart message locator
  - `getProductQuantityInCart(productName)` — Get quantity of specific product

- [ ] T032 [US9] Create test file `tests/cart.add-product.spec.ts`: "User adds product to cart successfully"
  - Test flow: Navigate to products → Add first product to cart → Verify add action completes → Verify cart count increments
  - Verify: Cart count indicator shows 1 (or increments correctly)

---

### Implementation for User Story 10: Verify Cart Item Count (P1)

- [ ] T033 [P] [US10] Add test to `tests/cart.count.spec.ts`: "Cart count increments correctly when adding products"
  - Test flow: Navigate to products → Add first product (count = 1) → Add different product (count = 2) → Verify cart count shows 2

- [ ] T034 [P] [US10] Add test to `tests/cart.count.spec.ts`: "Adding same product multiple times increments count correctly"
  - Test flow: Navigate to products → Add same product twice (via different paths if needed) → Verify cart count reflects total (e.g., 2)

---

### Implementation for User Story 11: View Cart Contents (P1)

- [ ] T035 [US11] Add test to `tests/cart.view-contents.spec.ts`: "User views cart contents with product details"
  - Test flow: Add product(s) to cart → Navigate to /view_cart → Verify cart displays all items with:
    - Product name matching what was added
    - Price information visible
    - Quantity visible
    - Total price calculated correctly (unit price × quantity)

- [ ] T036 [US11] Add test to `tests/cart.view-contents.spec.ts`: "Cart total calculates correctly for multiple items"
  - Test flow: Add product(s) with known prices → View cart → Verify cart total = sum of all item totals
  - Verify: Mathematical accuracy of totals

---

### Implementation for User Story 12: Empty Cart State (P2)

- [ ] T037 [US12] Add test to `tests/cart.empty-state.spec.ts`: "Cart displays empty state when no items added"
  - Test flow: Login → Clear any cart data → Navigate to /view_cart → Verify empty state message visible
  - Verify: Message contains text like "Your cart is empty" or similar
  - Verify: No product rows displayed

**Checkpoint**: Cart functionality (US9-US12) fully functional and independently testable. All core flows implemented.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Reporting, validation, documentation, and quality improvements across all test suites

- [ ] T038 [P] Configure Playwright HTML Reporter output path in `playwright.config.ts` to `reports/html-report/`
- [ ] T039 [P] Add test data fixtures in `fixtures.ts` for logged-in state (reusable setup for tests that need authentication)
- [ ] T040 [P] Add test teardown (clear browser cache, logout, reset cart) in `playwright.config.ts`
- [ ] T041 Create comprehensive README in `tests/README.md` with:
  - Setup instructions (npm install, .env configuration)
  - How to run all tests: `npm test`
  - How to run specific suite: `npm test -- --grep "login"`
  - How to view HTML report: `npm run report:show`
  - Troubleshooting guide

- [ ] T042 [P] Add npm scripts in `package.json`:
  - `test` — Run all tests in headed/headless mode
  - `test:headed` — Run with visible browser
  - `test:debug` — Run with debugger
  - `report:show` — Open HTML report in default browser

- [ ] T043 Add GitHub Actions workflow in `.github/workflows/test.yml` (optional):
  - Trigger on push and pull request
  - Install dependencies
  - Run tests
  - Upload HTML report as artifact

- [ ] T044 [P] Create test data documentation in `data/README.md`:
  - Valid test account credentials
  - Known products and search terms
  - Data cleanup procedures

- [ ] T045 Validate all tests follow Page Object Model pattern (no hardcoded selectors in test files)
- [ ] T046 Run full test suite locally and verify all tests pass or are properly documented
- [ ] T047 Update project root README with quick start: `npm install && npm test`

**Checkpoint**: All tests documented, configured for reporting, and ready for CI/CD integration

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Requires Phase 1 completion — **BLOCKS all test implementation**
- **Phase 3-5 (Test Stories)**: Require Phase 2 completion — can execute in parallel or sequentially
- **Phase 6 (Polish)**: Depends on at least one complete test story phase

### User Story Dependencies

- **Login Tests (US1-US4)**: Independent; can run in any order after Phase 2
  - US1 (valid login) should complete first to validate authentication works
  - US2-US4 can run in parallel as validation/error scenarios

- **Product Tests (US5-US8)**: Independent of login tests; can start after Phase 2
  - US5 (view all) should complete first
  - US6 (valid search) builds on US5
  - US7-US8 can run in parallel as error/validation scenarios

- **Cart Tests (US9-US12)**: Independent of other flows; can start after Phase 2
  - US9 (add to cart) should complete first
  - US10-US11 can run in parallel (both read cart state)
  - US12 (empty state) independent

### Within Each User Story

1. Page Object creation (e.g., T017 for LoginPage)
2. Test file creation and test cases (e.g., T018 for US1 test)
3. Test execution and validation

---

## Parallel Execution Opportunities

### Parallel Setup (Phase 1)

All marked [P] can run simultaneously:

```bash
# Terminal 1: Install dependencies
npm install

# Terminal 2: Configure TypeScript
# (configure tsconfig.json in parallel)

# Terminal 3: Setup environment
# (create .env file in parallel)
```

### Parallel Foundational (Phase 2)

Multiple developers can work on these in parallel:

```bash
# Developer A: Base utilities (T011-T012)
# Developer B: Selectors and assertions (T015)
# Developer C: Environment config (T014)
```

### Parallel Test Implementation (Phases 3-5)

After Phase 2 completion, test stories can be implemented in parallel:

```bash
# Developer A: Implements all Login tests (US1-US4) in Phase 3
# Developer B: Implements all Product tests (US5-US8) in Phase 4 simultaneously
# Developer C: Implements all Cart tests (US9-US12) in Phase 5 simultaneously

# Each developer works on different files:
# pages/login.page.ts (Dev A)
# pages/products.page.ts (Dev B)
# pages/cart.page.ts (Dev C)

# Tests run in parallel:
# tests/login.*.spec.ts (Dev A)
# tests/products.*.spec.ts (Dev B)
# tests/cart.*.spec.ts (Dev C)
```

### Test Execution Parallelization

Playwright natively supports parallel test execution across multiple browsers:

```bash
# Run all tests in parallel across 4 workers
npx playwright test --workers=4

# Run specific suite in parallel
npx playwright test tests/login.*.spec.ts --workers=2
```

---

## Task Summary

| Phase | Purpose | Task Count | Parallelizable |
|-------|---------|-----------|-----------------|
| Phase 1 | Setup | 9 tasks | 4 tasks marked [P] |
| Phase 2 | Foundational | 7 tasks | 4 tasks marked [P] |
| Phase 3 | Login Tests (US1-US4) | 9 tasks | 6 tasks marked [P] |
| Phase 4 | Product Tests (US5-US8) | 5 tasks | 2 tasks marked [P] |
| Phase 5 | Cart Tests (US9-US12) | 7 tasks | 3 tasks marked [P] |
| Phase 6 | Polish | 10 tasks | 5 tasks marked [P] |
| **TOTAL** | **All Phases** | **47 tasks** | **24 tasks (51%)** |

---

## MVP Scope Recommendation

**Minimum Viable Product (MVP)**: Phases 1-2 + Phase 3 (Login Tests US1-US4)

- **MVP Goal**: Establish working test infrastructure with authenticated state
- **Tasks**: T001-T025 (Setup + Foundational + Login)
- **Estimated Effort**: ~5-7 days for single developer
- **Value Delivered**: Reusable Page Object framework + comprehensive login validation

**Phase 2 Expansion**: Add Phase 4 (Product Tests) for product discovery capability
**Full Scope**: All phases for complete e-commerce flow testing

---

## Implementation Strategy

### Week 1: Project Foundation

- **Sprint**: Setup + Foundational phases (T001-T016)
- **Deliverable**: Playwright project configured with Page Object framework ready
- **Team Size**: 1-2 developers

### Week 2: Login Testing

- **Sprint**: Login tests Phase 3 (T017-T025)
- **Deliverable**: Complete authentication testing with 4 scenarios
- **Team Size**: 1 developer

### Week 3: Product & Cart (Parallel)

- **Sprint**: Product tests Phase 4 (T026-T030) + Cart tests Phase 5 (T031-T037)
- **Deliverable**: Full shopping flow testing
- **Team Size**: 2 developers (can split across product and cart)

### Week 4: Polish & Reporting

- **Sprint**: Polish Phase 6 (T038-T047)
- **Deliverable**: CI/CD ready, fully documented test suite
- **Team Size**: 1 developer

---

## File Structure Reference

```
automation-suite/
├── pages/
│   ├── page.object.base.ts          # [T010] Base abstract class
│   ├── login.page.ts                # [T017] LoginPage
│   ├── products.page.ts             # [T026] ProductsPage
│   └── cart.page.ts                 # [T031] CartPage
├── tests/
│   ├── fixtures.ts                  # [T016] Test setup
│   ├── login.valid.spec.ts          # [T018] US1
│   ├── login.invalid-password.spec.ts # [T019] US2
│   ├── login.empty-fields.spec.ts   # [T020-T022] US3
│   ├── login.invalid-email.spec.ts  # [T023-T025] US4
│   ├── products.view-all.spec.ts    # [T027] US5
│   ├── products.search-valid.spec.ts # [T028] US6
│   ├── products.search-invalid.spec.ts # [T029] US7
│   ├── products.search-empty.spec.ts # [T030] US8
│   ├── cart.add-product.spec.ts     # [T032] US9
│   ├── cart.count.spec.ts           # [T033-T034] US10
│   ├── cart.view-contents.spec.ts   # [T035-T036] US11
│   ├── cart.empty-state.spec.ts     # [T037] US12
│   └── README.md                    # [T041] Test documentation
├── data/
│   ├── test-data.ts                 # [T011] Constants and test data
│   └── README.md                    # [T044] Data documentation
├── utils/
│   ├── selectors.ts                 # [T012] Selector helpers
│   ├── assertions.ts                # [T015] Assertion helpers
│   └── env.config.ts                # [T014] Environment setup
├── reports/
│   └── html-report/                 # [T038] HTML reporter output
├── .env                             # [T006] Test credentials
├── tsconfig.json                    # [T004] TypeScript config
├── playwright.config.ts             # [T005, T007] Playwright config
├── package.json                     # [T001-T002] Project config + scripts [T042]
├── README.md                        # Project quick start
└── .github/
    └── workflows/
        └── test.yml                 # [T043] CI/CD workflow
```

---

## Success Criteria

- ✅ All 47 tasks completed
- ✅ All 12 user stories independently testable
- ✅ Page Object Model strictly followed (no hardcoded selectors)
- ✅ All tests pass against automationexercise.com staging/production
- ✅ HTML report generates successfully
- ✅ Tests execute in parallel without interference
- ✅ CI/CD pipeline configured and operational
- ✅ Documentation complete and clear for new team members

---

**Generated**: 2026-04-21  
**For**: automationexercise.com Test Automation Suite  
**Status**: Ready for Implementation
