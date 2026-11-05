# LayerGuard — AI-Powered 3D Printing Assistant

**Category:** Multimodal AI / Rapid Prototyping

**Status:** Hackathon Prototype

**Technology:** AWS PartyRock

**Recognition:** Third Prize — National Generative AI Awards 2025/2026, 3D Printing & Additive Manufacturing category.

**Short Description:**
A multimodal AI assistant designed to help 3D printer users identify printing defects, understand their possible causes and find practical solutions through image analysis and conversational guidance.

---

## 1. The Challenge

During a university hackathon using AWS PartyRock, we were given two hours to develop four different AI projects, leaving approximately 30 minutes for each challenge.

One of them focused on making 3D printing more accessible, as part of a challenge associated with Prusa Research. Participants could explore several problems, including training, troubleshooting and print configuration optimization.

I decided to focus on diagnosing printing failures. Many beginners struggle to identify what's going wrong with their prints, and often don't even know the technical terms needed to describe the problem. I wanted to build something that could help them understand and solve those issues without requiring advanced knowledge of 3D printing.

## 2. What I Built

I developed LayerGuard, a multimodal AI assistant designed to help users diagnose problems with their 3D printers.

Instead of relying entirely on technical descriptions, the prototype was designed around visual evidence. Users could provide an image of a failed print alongside information about their printer, filament, nozzle and printing settings.

The AI would analyze the available information to identify possible defects, such as warping, stringing or adhesion failures, explain their potential causes and suggest practical corrections, including changes to slicer settings when appropriate.

I also designed the experience to support follow-up questions through conversational assistance, allowing users to ask for clarification or additional guidance.

The central idea was to combine visual analysis and technical context to make troubleshooting more accessible, particularly for beginners who might struggle to describe what they were seeing.

## 3. My Approach

I used AWS PartyRock to build the prototype without developing a traditional application from scratch.

With approximately 30 minutes available, I concentrated on the interaction between the different AI components rather than building a complex interface.

I organized the concept around two main inputs: technical information about the printing setup and an image of the problem. The diagnostic system was designed to interpret both sources, identify possible causes and provide actionable recommendations.

I also considered cases where no image was available, so the assistant could offer an estimated diagnosis using the user's description while acknowledging the additional uncertainty.

My focus was on turning the available AI capabilities into a practical troubleshooting workflow within the time constraints of the competition.

## 4. Results & Recognition

LayerGuard didn't win the initial university evaluation. However, several months later, I received an email informing me that the project had been awarded third prize nationally in the 3D Printing & Additive Manufacturing category of the AWS National Generative AI Awards 2025/2026.

What made the result particularly meaningful to me was that I had developed the prototype in approximately 30 minutes, as one of four projects during the university hackathon.

Although LayerGuard was a prototype rather than a commercial product, the experience showed me how quickly an idea could be turned into something useful by combining a clearly defined problem with the right AI tools.