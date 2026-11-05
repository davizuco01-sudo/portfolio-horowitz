# Business Opportunity Radar

**Category:** AI Agents / Market Research / Automation

**Status:** Functional Research Prototype

**Technologies:** React, JavaScript, Vite, Supabase, Reddit API, Groq, GitHub Actions

**Short Description:**
An automated research tool that analyzes online discussions to identify repetitive operational problems and potential business opportunities.

---

## 1. The Problem

After spending months learning to build applications with AI, I found myself facing a different problem: I knew how to create software, but I didn't know what was worth building.

I didn't want to spend weeks developing random ideas without understanding whether anyone actually needed them. So I decided to build a tool that could help me discover problems directly from the people experiencing them.

My idea was to look for professionals describing repetitive tasks, inefficient workflows and frustrations in their daily work, then use AI to identify which of those problems might be worth investigating.

## 2. What I Built

I developed a research application that collects discussions from Reddit, filters irrelevant content and analyzes the remaining messages for potential business opportunities.

The system combines automated collection with multiple analysis stages. It evaluates whether a comment describes a real operational problem, identifies repetitive or manual work, considers possible automation approaches and assigns a priority score.

I used Supabase to store the collected messages and their analysis results, and built a React dashboard to review them. The interface allows me to filter opportunities, inspect the reasoning behind their classifications and open the original conversations.

I also configured an automated daily scanning workflow using GitHub Actions so the research process wouldn't depend entirely on manual searches.

## 3. Technical Challenges

One of the biggest difficulties was separating genuine problems from irrelevant conversations, advertisements and general advice.

A message mentioning spreadsheets or automation doesn't necessarily represent a business opportunity. I had to introduce filtering stages, scoring rules and more specific AI instructions to reduce the amount of noise.

The results also taught me that an AI-generated priority score is only a starting point. Even when a system identifies an interesting problem, it cannot prove that someone would pay for a solution.

I still needed to investigate the industry and understand the people behind those workflows.

## 4. Results & What Came Next

In one saved research dataset, the application collected and classified 131 Reddit comments from 50 different discussions. Its scoring system identified 11 high-priority and 3 medium-priority potential opportunities.

Several of the problems involved logistics and customs operations: inconsistent shipping documents, manual data entry, mismatched invoice information and difficulties transferring data between systems.

This research helped direct my attention toward the customs industry, where I continued investigating documentation requirements and eventually started building Customs Documentation AI.

The Radar didn't become a commercial product, but it served the purpose I originally built it for: helping me move from searching for an idea to working on a specific problem.

It also taught me that discovering a problem, validating demand and building the solution are three different stages.