---
layout: post
title: "The Machine Runs in Your Head: What G-Code Taught Me About Mental Models"
date: 2026-05-13 00:00:00 +0000
tags: [cnc, programming, mental-models, manufacturing]
---

There's no print statement.

No breakpoint. No undo. No restart button. When the spindle starts turning and the table starts moving, the program runs exactly as you wrote it — and if you made a mistake, you find out at 3000 RPM.

That's the environment where I learned to program. Not a text editor. Not a terminal. A machine shop with a Fanuc controller and material loaded in the chuck that someone else already paid for.

## What G-Code Actually Is

G-code is the assembly language of manufacturing. Where Python has functions, loops, and variables, G-code has movement commands. `G01` moves a tool in a straight line. `G02` arcs clockwise. `G00` rapids to position. That's about the level of abstraction you get.

A moderately complex part program — a shaft with threads, tapers, grooves, and multiple setups — can run to 1500 or 2000 lines. No subroutines. No named variables (on most controllers). No way to say "go to the center of this feature" without calculating the exact coordinate by hand.

You write it, you post it, you run it.

## The Simulator You Build in Your Head

The interesting thing about working in this environment for years is what it does to your brain.

You start building a simulator.

Not consciously. Not because anyone told you to. But because you *have* to. When you write a line like `G01 X42.5 Z-18.3 F0.15`, you need to know where the tool is before that line runs, what it's cutting into, how fast it's moving, what happens if you got the sign wrong on that Z. You run it in your head before you run it on the machine.

The simulator has layers. There's the geometry layer — you're tracking tool position in three-dimensional space, imagining the stock material being removed pass by pass. There's the kinematics layer — you know this machine has a 12-station turret, tool 7 is the threading insert, and you need to call a tool change before the coolant comes on. There's the process layer — spindle speed, feed rate, the sound a correctly cutting tool makes versus a tool that's about to break.

All of this runs in parallel, in your head, before you hit cycle start.

## Why This Skill Exists

The economics of being wrong are brutal.

A broken carbide insert costs €40–80 and ruins your surface finish. A miscalculated rapid move that drives a tool into the workpiece at full speed damages the spindle — that's €30,000 to €80,000 in repairs plus downtime. A program error on an expensive billet that took eight hours to machine means starting over with material that might not even be in stock.

These aren't edge cases. They happen. Every experienced machinist has stories.

When the cost of running your code is that high, you develop habits that don't come naturally in lower-stakes environments. You simulate before you execute. You verify assumptions before the program starts. You think about failure modes before they occur.

The environment shaped the cognition.

## Environment Shapes the Habit

I'm not saying software developers don't think rigorously. The people writing flight control software or medical device firmware operate with exactly this level of pre-execution verification — and then some.

But those environments demand it. The cost of running broken code is high enough that the culture, the tooling, and the process all push toward simulation first, execution second.

Most software development doesn't work that way, and for good reason. When running code costs nothing — when you can print, break, undo, restart in milliseconds — fast iteration is the right strategy. The environment is correct to teach that.

The interesting question is what happens when someone trained in a high-iteration environment moves into a higher-stakes context. The habits don't automatically update. The factory floor trains the other direction from the start — which turns out to be useful in ways I didn't expect when I made the switch.

## I Built an External Version of My Own Mental Simulator

A few months ago I started building Visual CNC — a G-code toolpath visualizer written in C11 and raylib.

The premise is simple: read a G-code program, parse every movement command, render the toolpath in 3D so you can see what the machine will do before it does it.

When I started building it, I realized I was externalizing something I'd been doing internally for years. The mental simulator I described above — the one I built up through thousands of hours at the machine — I was writing it down as code.

Every edge case I handled in the visualizer was a failure mode I'd learned to check in my head. Rapid moves that pass through the part? I'd caught that mentally once at the last second. Tool radius compensation going the wrong direction? Same. The code is a transcript of the mental model.

## The Transferable Insight

Writing G-code by hand, in a high-stakes environment, builds a specific cognitive skill: the ability to mentally execute code before it runs.

This isn't unique to manufacturing. Any domain where the cost of running is high forces you to develop it. Surgeons simulate procedures before operating. Pilots run through emergency checklists in their head. Spacecraft engineers review burn sequences on paper before uploading to hardware.

The insight isn't that manufacturing is special. It's that the skill is transferable — and the factory floor is an unusual place to develop it for someone who ends up writing software.

If you want to build it deliberately: find a context where running your code has real costs, and work there. Or build a simulation environment that approximates it and take it seriously.

Or build a visualizer for the thing you're automating. Make the implicit model explicit.

That's what I did.

---

*I build CNC tools at the intersection of manufacturing and software. Find me on [GitHub](https://github.com/Kaido997) and [X](https://x.com/pirro_alan).*
