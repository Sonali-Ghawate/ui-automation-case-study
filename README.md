# UI Test Automation — automationexercise.com

## Overview
UI automation suite built as part of a QA Engineer case study using 
Spec-Driven Development (SDD) and Playwright + TypeScript.

## Tech Stack
- Playwright + TypeScript
- GitHub Spec Kit (SDD)
- Page Object Model
- Playwright HTML Reporter

## Flows Covered
- Login (Happy path, Invalid input, Empty fields, Error handling)
- Product Browsing (Happy path, Search, Invalid search, Empty search)
- Add to Cart (Happy path, Cart verify, Empty cart, Without login)

## Results
12/12 tests passing ✅

## Setup & Run
# Install dependencies
npm install

# Install browsers
npx playwright install

# Add credentials
cp .env.example .env
# Edit .env with your automationexercise.com credentials

# Run all tests
npx playwright test

# View report
npx playwright show-report

## Project Structure
pages/              → Page Object Model classes
tests/              → Test specifications
.specify/           → SDD documents (Spec Kit)
.github/prompts/    → Spec Kit prompt files
playwright.config.ts → Playwright configuration

## SDD Documents
- constitution.md  → Project principles
- spec.md          → Test scenarios
- plan.md          → Technical design
- tasks.md         → Task breakdown