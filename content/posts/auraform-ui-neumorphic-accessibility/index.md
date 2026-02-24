---
title: "Auraform UI: Building an Accessible Neumorphic Component Library From Scratch"
description: Why neumorphic design fails at accessibility, and how I built a React component library that fixes it with math, tokens, and dual-signaling
date: "2026-02-24"
draft: false
slug: "/pensieve/auraform-ui-neumorphic-accessibility"
tags:
  - Open Source
  - React
  - UI Design
  - Accessibility
  - Neumorphism
---

## Auraform UI: Building an Accessible Neumorphic Component Library From Scratch

Neumorphic design is one of those things that looks beautiful in a Dribbble shot and falls apart the moment a real person tries to use it. I have admired it for years. Soft shadows. Gentle depth. A clean, modern feel that makes flat UI look boring. But every time I tried to build something real with it, the same problems showed up. Poor contrast. Invisible boundaries. Users who could not tell a button from a background. Accessibility was always the casualty.

I kept thinking someone would build a proper neumorphic component library that takes accessibility seriously. Nobody did. So I built one myself. It is called Auraform UI, and it is now open source.

## The Problem With Neumorphism

Neumorphism creates depth using light and dark shadows on a surface that matches the background color. That is its charm. That is also its curse.

When the background and the element are the same color, the only visual difference is a shadow. Shadows are subtle by nature. On a bright screen in sunlight, they disappear. For someone with low vision, they barely exist. For a color blind user, the difference between a pressed button and a resting button is invisible if the only signal is a shadow shift.

Most neumorphic examples you see online ignore this completely. They look great in a dark room on a retina display. They fail everywhere else. Screen readers get no help. Keyboard users get no focus indicators. Contrast ratios are a joke.

This is not a styling problem. It is a design philosophy problem. Neumorphism as commonly practiced treats accessibility as someone else's concern. I wanted to prove it does not have to be that way.

## The Idea Behind Auraform UI

The core idea is simple. What if you could give the library a single color, and it would figure out everything else? Shadows. Borders. Text contrast. Light mode. Dark mode. All derived mathematically from one hex value.

That became the foundation. One color in. An entire neumorphic theme out. No manual tuning. No guessing. No broken contrast.

I split the project into three packages inside a Turborepo monorepo. A core package that handles the color math and token generation. A React package with the actual components. And a React Native package for mobile, still in early stages.

## Solving Accessibility With Dual-Signaling

The biggest design decision was what I call dual-signaling. The rule is straightforward. Never rely on shadows alone to communicate state.

Every interactive state change uses two signals. A shadow shift and something else. A color change. A border. An icon. A scale animation. When a checkbox is checked, it does not just go from extruded to inset. It also fills with an accent color and shows a checkmark. When a button is pressed, it does not just flatten. It scales down and the shadow inverts.

This means even if a user cannot perceive the shadow difference at all, they still get a clear visual signal. It also means every component works with screen readers out of the box. Proper ARIA roles. Keyboard navigation. Focus rings that actually show up.

Dual-signaling is not a new idea. It is just rarely applied to neumorphic design because people treat neumorphism as a visual trend rather than a real interface system.

## One Color In, Full Theme Out

The core package does something I am genuinely proud of. You pass it a hex color like `#e0e0e0` and it returns a complete set of design tokens. Background. Light shadow. Dark shadow. Border. Text color. Secondary text. All computed using HSL color math.

It shifts lightness up for the light shadow and down for the dark shadow. It generates a subtle border that is invisible on light backgrounds but provides just enough contrast on dark ones. It picks text colors that meet contrast requirements automatically.

The best part is the auto dark mode detection. If you pass a dark base color like `#2d2d2d`, the system detects that the lightness is below fifty percent and flips its behavior. Light shadows become white-tinted overlays. Borders become light instead of dark. Text becomes white. You do not configure dark mode. You just use a dark color and it works.

The provider component wraps your app, takes a base color and an optional mode prop, and sets CSS custom properties for everything. Components read tokens from context. Change the base color and the entire UI re-themes instantly.

## Twenty Five Components and Counting

The React package ships with twenty five components today. Buttons, inputs, text areas, checkboxes, radios, switches, sliders, cards, tabs, tooltips, progress indicators, avatars, badges, chips, dividers, and icon buttons. Those were the original nineteen.

I recently added six more that I felt were missing from most component libraries. A rotary knob control for audio and settings interfaces. A vertical slider for volume and mixer style controls. A semicircular gauge for dashboards. A numeric stepper. A star rating component. And an iOS style segmented control with a smooth sliding animation.

Every single one supports keyboard navigation, screen readers, focus management, and the dual-signaling pattern. Every one adapts automatically to light and dark themes.

## Storybook as the Playground

All twenty five components have interactive Storybook stories organized into categories. Primitives. Form controls. Display elements. Navigation. There is also a dark mode showcase that renders a complete dashboard using a dark base color so you can see the full system working together.

The Storybook toolbar lets you switch between preset themes. Soft gray. Warm beige. Cool blue. Lavender. And three dark presets. Dark gray. Dark navy. Dark plum. Every component re-renders instantly when you switch.

You can try it live at the GitHub Pages deployment linked in the repository.

## What I Learned

Building this taught me a few things worth sharing.

First, constraints breed creativity. The rule that shadows alone cannot communicate state forced me to think harder about every interaction. The result is components that are more thoughtful than they would have been without the constraint.

Second, color math is powerful. Deriving an entire theme from a single value sounds limiting but it actually frees you from decision fatigue. You pick one color and the system handles the rest. Designers can focus on the one choice that matters.

Third, accessibility is not a feature you add later. It has to be in the architecture from day one. The token system, the dual-signaling pattern, the ARIA roles, the keyboard handling. These are not decorations. They are the foundation.

## Try It Out

Auraform UI is open source and available on npm. The GitHub repository has full documentation covering the core API, theming, component props, and getting started guides.

If you have ever wanted neumorphic design that does not sacrifice usability, give it a try. Pick a color. Wrap your app. Build something soft that everyone can use.

GitHub: [github.com/dgr8akki/auraform-ui](https://github.com/dgr8akki/auraform-ui)
Storybook: [dgr8akki.github.io/auraform-ui](https://dgr8akki.github.io/auraform-ui/)
npm: [@auraform/react](https://www.npmjs.com/package/@auraform/react)
