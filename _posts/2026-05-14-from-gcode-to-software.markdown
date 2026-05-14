---
layout: post
title: "From G-code to Software: What 7 Years on the Factory Floor Taught Me About Software Engineering"
date: 2026-05-14 10:00:00 -0400
tags: [cnc, manufacturing, software-engineering, career]
---

There's a moment every CNC programmer knows.

You're standing at the machine, hand hovering near the cycle start button, program loaded. You've read through the code twice. Maybe three times. The workpiece is clamped, the tool is measured, the coolant is ready. Everything checks out on paper. You press the button.

For the next few seconds, you just watch.

Not because you're curious — because somewhere in those first rapid moves, you'll know whether the mental simulation you ran for the past hour was correct. If it was, the tool will arc to position, the spindle will spin up, and the cut will begin exactly as planned. If it wasn't, you'll hear it first. A sound you can't un-hear.

I pressed that button hundreds of times over seven years in CNC manufacturing. Every single time taught me something about software.

---

**TL;DR:** Seven years programming CNC machines before switching to software. The factory floor taught me three things that no bootcamp covers: simulate before you execute, treat any performance problem the same way regardless of whether the bottleneck is in a database or a toolpath, and read code by tracing state — not skimming syntax. These are now the foundation of how I build software and why I'm building CNC tools in C/C++.

---

## Precision Is a Mindset, Not a Skill

In machining, tolerances are physical law. A part spec'd at 25.00mm that measures 25.03mm is a scrapped part. It doesn't matter that you were close. "Close" in manufacturing means rework, or — more likely — a part that ends up in the bin and a conversation with your supervisor.

I spent six years at a small manufacturer in northern Italy programming Fanuc lathes and a Mazak Integrex 200-SY — a 5-axis multi-tasking machine that combines turning and milling in a single setup. Complex geometries, tight tolerances, pump components that had to fit together precisely or they didn't work at all.

When I started learning software — studying at nights and weekends through Start2Impact while still working the floor full-time — I kept waiting for someone to explain what the equivalent of tolerance was in code. Nobody did, because in most software environments the feedback loop is forgiving. You write a bug, run the code, get an error, fix it, try again. The cost of being wrong is a stack trace and some lost time.

On the shop floor, the cost of being wrong is a broken insert, a scrapped billet, or — in the worst cases — a spindle crash that takes a machine worth more than a house out of service for a week.

That gap in consequences changes how you think. You develop a habit of simulating before executing. Not because someone told you to — because the alternative had consequences that trained the habit into you. I carry it into every pull request I write. I carry it into every architecture decision I make. I trace the data through the system in my head before I commit.

---

## Optimization Is Just Profiling With Physical Consequences

At my current job at a gear manufacturer in Ontario, Canada, I inherited a set of G-code programs that had been running the same way for years. The machine spent a significant fraction of each cycle on rapid moves — repositioning between cuts — that were never optimized for the actual geometry of the part. They worked. They just weren't good.

I treated it like a performance problem in software. I mapped the existing tool paths, identified where the machine was traveling farther than necessary, rewrote the logic to minimize air time, and applied parametric programming to make the calculations dynamic rather than hardcoded. Where there were repeated operations that could be templated, I templated them.

The result was up to a 50% reduction in machining time per part.

Any software engineer who has profiled a slow database query or optimized a hot code path will recognize the pattern: measure, find the bottleneck, eliminate the waste, measure again. The difference is that in a gear shop, the result doesn't go to a dashboard — it goes to the bottom line. More parts per shift. Less machine idle time. Real money.

The abstraction is identical. The stakes just have a different unit.

The same thing happened at MVV, the company where I spent most of those seven years: systematic optimization of program logic led to a 15% reduction in machining time. I didn't know at the time that I was doing what software engineers call profiling. I was just trying to make the machine faster. The method was the same.

---

## Debugging When You Can't Add a Print Statement

G-code doesn't have a debugger. No breakpoints, no variable inspector, no step-through execution. When a program doesn't behave as expected, you have two options: reason through it from first principles, or run it at reduced feedrate and watch.

You reason through it first.

This forced a specific kind of rigor. You learn to hold the state of the machine in your head — where the tool is, what direction it's moving, what the active modal codes are, what the previous block set up for this one. You build what I can only describe as a mental interpreter: a model of execution that runs ahead of the machine, catching the bad case before the machine reaches it.

When I started writing real software, this translated directly into how I read code. I don't skim — I trace. I follow data through the function, through the call, through the response. I hold state. It's slower than scanning, but it catches things that scanning misses.

Some bugs only reveal themselves when you run the execution in your head first. The code looks fine on the page. The problem only shows up when you follow the state.

---

## The Bridge Goes Both Ways

After years in manufacturing, I pivoted to software. First at a Web3 software house in Padua doing backend and blockchain work. Then freelance. Then briefly at a small AI startup building a perfume consultation platform — about as far from CNC as you can get.

The manufacturing background was considered irrelevant by most of the employers I talked to. Job listings weren't asking for people who knew how a Fanuc controller works.

But they were asking for people who understand systems. People who reason carefully about edge cases. People who think about what happens when things go wrong, not just when they go right. People who have been somewhere where "we'll fix it in production" was not an option.

That's exactly what seven years on the factory floor teaches. It just doesn't call it that.

Now I'm building the tools I wish had existed when I was writing G-code by hand.

**[NC++](https://github.com/Kaido997)** is a programming language that compiles down to G-code. G-code is essentially assembly — no variables, no functions, no loops, programs that can run to 2,000 lines for a single part. NC++ raises the abstraction level. You write structured, parameterized source code; the compiler outputs controller-specific G-code for Fanuc (and eventually Haas, Siemens, LinuxCNC). It's a compiler for metal.

**[Visual CNC](https://github.com/Kaido997)** is a toolpath visualizer built in C with raylib. It renders G-code movements before the machine runs them — animating the tool path, flagging crash risks, catching missing feed rates, warning about spindle-off cutting. It's the mental simulator I built in my head for seven years, externalized into code.

**[G-code Analyzer](https://github.com/Kaido997)** is a static analysis tool for NC programs. Lint, but for machines. It catches the class of errors that don't show up until the program runs.

**[BKG Finder](https://github.com/Kaido997)** is a small utility that computes gauge block combinations for precise physical measurements. Metrology is part of the job. Doing the arithmetic by hand gets tedious.

Each of these tools is a software solution to a problem I encountered in the physical world. That's not a coincidence. That's what happens when you spend seven years understanding a domain before writing your first line of code about it.

---

## What the Factory Floor Actually Teaches

If I had to distill it: manufacturing teaches you that code runs in a physical context, and that context has consequences.

Most software developers work in environments where the cost of being wrong is low. Iterate fast. Ship and fix. The feedback loop is tight and forgiving. That's genuinely good for most domains — velocity matters, and the ability to correct quickly is a real advantage.

But there's a class of problems where you can't ship and fix. Where edge cases have physical consequences. Where the cost of a failure is measured in machined material, broken tooling, or stopped production lines. Medical devices. Aerospace control systems. Financial clearing. Industrial automation.

People who come from those domains think differently. Not better or worse than engineers who came up through web and mobile — *differently*. Their reasoning was shaped by an environment where precision and anticipation were survival skills, not academic ideals.

I didn't go to a CS program. I learned to code while running 5-axis machines in a factory in northern Italy, studying at night for a certification I finished while still pulling shifts. The background looked irrelevant on paper for most of my software career.

But every loop I write, I think about what happens when the feed rate is wrong. Every function I design, I think about the state the caller leaves behind. Every edge case I find before a reviewer does, I trace back to seven years of pressing that button and watching.

The machine doesn't care if your algorithm is elegant. It cares if your coordinates are right.

---

*Building CNC tools in C/C++ and writing about the manufacturing–software intersection at [blog.kaid0.dev](https://blog.kaid0.dev). Follow the build on [X](https://x.com/pirro_alan) or browse the projects on [GitHub](https://github.com/Kaido997).*
