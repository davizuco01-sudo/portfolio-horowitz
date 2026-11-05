# Customs Documentation AI

**Category:** Applied AI / Document Processing

**Status:** Working Prototype — In Development

**Technologies:** Python, React, TypeScript, Vite, Tailwind CSS, Claude Sonnet 5.5

**Short Description:**
An AI-powered tool that extracts and structures customs documentation according to the EU Customs Data Model, combining automated validation with human review and document traceability.

---

## 1. The Problem & Discovery

I started this project while looking for business problems that could realistically be solved with AI. After researching different industries and analyzing complaints from employees, I became interested in customs agencies. It seemed like a sector where people were still spending a considerable amount of time manually processing documents.

I had no previous experience in customs, so I started by investigating how the information was supposed to be structured. That's how I discovered the EU Customs Data Model and the H1 import and B1 export requirements. Spain's recent transition to H1 made the opportunity even more interesting to me.

## 2. What I Built

I built an application that extracts, organizes and validates information from customs documents, including commercial invoices, packing lists and transport documents.

Using Claude Sonnet 5.5, the system identifies information and associates it with the corresponding H1 fields. A separate Python layer checks technical constraints and flags missing, inconsistent or uncertain information.

One of the features I focused on most was traceability. Users can select an extracted value and open the original PDF, where its source is highlighted using document coordinates. This allows them to check exactly where the information came from before accepting or correcting it.

The application can also compare information across documents belonging to the same shipment and organize the remaining review tasks. Once all pending review requirements have been addressed, it allows users to export the structured information as H1 XML.

I wanted AI to handle the repetitive work without giving it the final say over information that could have serious consequences if incorrect.

## 3. Technical Challenges

My biggest challenge was getting the AI to associate information with the correct fields without missing values along the way. Earlier versions sometimes assigned information to the wrong parameters or flagged repeated values for unnecessary review.

I worked on these problems through repeated testing with different documents, refining the agent's instructions and improving the validation and review logic.

Another challenge was the interface. As the number of fields and verification steps increased, the application became uncomfortable to navigate. I had to rethink how the results were presented and make the review process clearer and more interactive.

## 4. What I Learned

At first, I was mostly focused on making the program work correctly. An early version had a fairly monotonous interface, and my father, who has years of experience in marketing, pointed out something I hadn't really considered: even a useful product can struggle if people don't enjoy using it.

That made me change my approach. I started paying much more attention to the interface, the way information was presented and how easily users could interact with the results.

This project also made me realize that building functional software and building something people would actually pay for are two very different challenges.

## 5. Current Status & Next Steps

The application is currently