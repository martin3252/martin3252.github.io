/* Edit this file to update your profile and projects.
   Use relative paths for local demos or full HTTPS URLs for external projects.
   Leave sourceUrl empty to hide the source link. */
window.SITE_CONFIG = {
  name: "martin3252",
  githubUsername: "martin3252",
  intro: "From workplace communication to local information, this is a collection of my web projects and small interactive experiments. Pick one and give it a try.",
  bio: "How2Talk explores better ways to communicate at work. Brisbane Tradies helps you find businesses around Brisbane. Alongside them are a few small, hands-on demos built to turn ideas into something you can try.",
  profileIsPlaceholder: false,
  projects: [
    { id: "how2talk", title: "How2Talk", subtitle: "WORDS THAT WORK", description: "Explore workplace scenarios through examples of what to avoid and how to respond thoughtfully. Search situations and filter by managers, colleagues, direct reports, clients, or interviewers.", tags: ["Live project", "Communication", "Scenario cards"], previewUrl: "https://how2talk.vercel.app/", sourceUrl: "", isDemo: false, visual: "talk", featured: true },
    { id: "tradies", title: "Brisbane Tradies", subtitle: "FIND. FILTER. SHORTLIST.", description: "Find businesses around Brisbane by trade, keyword, and distance. Compare ratings and review counts, then save candidates to a shortlist.", tags: ["Live project", "Local information", "Search & filters"], previewUrl: "https://usefulinformation.vercel.app/", sourceUrl: "", isDemo: false, visual: "directory", featured: true },
    { id: "palette", title: "Color Playground", subtitle: "COLOR PLAYGROUND", description: "Find inspiration for your next interface. Adjust the hue, generate a palette, and copy the CSS variables.", tags: ["Design tools", "JavaScript"], previewUrl: "./demos/palette.html", sourceUrl: "./demos/demo.js", isDemo: true, visual: "palette" },
    { id: "focus", title: "Focus Timer", subtitle: "FOCUS TIMER", description: "Make room for uninterrupted work. Set your session length, start, pause, and begin again.", tags: ["Productivity", "JavaScript"], previewUrl: "./demos/focus.html", sourceUrl: "./demos/demo.js", isDemo: true, visual: "focus" },
    { id: "tasks", title: "Tiny Tasks", subtitle: "TINY TASKS", description: "Get small tasks out of your head. Add a to-do, mark it complete, and make your next step a little clearer.", tags: ["Productivity", "Interface experiments"], previewUrl: "./demos/tasks.html", sourceUrl: "./demos/demo.js", isDemo: true, visual: "tasks" }
  ]
};
