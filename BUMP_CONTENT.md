# BUMP — Agentic Proximity Safety

**Category:** AI Agents / Safety Systems / Simulation

**Status:** Experimental Prototype

**Technologies:** Python, CrewAI, Groq, Llama 3.3 70B, SQLite

**Short Description:** An experimental AI-powered decision system that evaluates simulated proximity encounters between users before allowing an interaction.

## Why I Built It

BUMP started as an idea for a location-based social app, inspired by Pokémon GO. When two people using the app came close to each other, they would receive a notification, take a photo together and add it to a personal collection of encounters.

As I explored the concept, I became more interested in a different question: how could the application decide whether notifying two nearby strangers was appropriate?

I decided to experiment with an AI-based safety layer before developing the full social application.

## What I Built

I developed a Python simulation where users move through a virtual space and the system detects when they come within a defined distance.

Using CrewAI and Llama 3.3 70B through Groq, I created an agent that evaluates simulated encounters using information such as profile verification, mutual connections and location context.

The system can recommend allowing or blocking an interaction, while SQLite stores user information and previous decisions.

The project allowed me to explore how an AI agent could be integrated into a rule-based proximity system. It also highlighted the limitations of using incomplete profile information to make decisions about personal safety.

BUMP remained a simulation, not a deployed mobile application or a validated safety system.