# Multi-Agent Mathematical Solver

**Category:** AI Agents / Mathematics

**Status:** Experimental Prototype

**Technologies:** Python, CrewAI, Groq, Llama 3.3 70B, SymPy, Streamlit, Matplotlib, LaTeX

**Short Description:** An experimental multi-agent system that coordinates mathematical problem solving, scientific explanations and visualizations to generate structured LaTeX reports.

## Why I Built It

As a Mathematical Engineering student, I wanted to explore whether AI could do more than simply provide answers to mathematical problems. My idea was to create a system that could explain the reasoning, connect mathematical concepts to practical applications and present everything in a structured document.

## What I Built

I used CrewAI to coordinate three specialized agents across four tasks: a mathematical solver, a scientific researcher and a visualization agent.

The system integrates SymPy for symbolic calculations, generates graphs when appropriate and combines the results into a LaTeX report. I also built a Streamlit interface where users can enter mathematical problems and download the generated PDF when compilation succeeds.

This project allowed me to experiment with multi-agent orchestration and the integration of language models with mathematical tools.

https://github.com/davizuco01-sudo/IA-matematicas