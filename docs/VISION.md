# Collab+ (Working Title) — Product Vision

> **Note:** `Collab+` is a temporary prototype working title and is subject to change at any time during development. All internal monorepo packages intentionally use the brand-neutral `@repo/*` scope (`@repo/web`, `@repo/api`, `@repo/shared`), while the display name and branding live centrally in [`packages/shared/src/constants.js`](../packages/shared/src/constants.js) (`BRAND_CONFIG`).

### What should it do?
It must be a way to connect with my friends like discord, chat like discord, share pictures, screenshare, video meet, voice calls, mini social games? maybe!, github ui, poll, quiz, an active Ai bot for each chat room like discord, wakatime UI?, common compiler for coding exercise, Leetcode connect, goal tracking.
All this, with user login and authentication, yes. That would be fire. 

### What would we call it?
We all be vibing and chilling here or coding. Can't call it vibe&code for obvious reasons.So we could just call it chill or chill-z. Something like that. For now name it Collab+ project (temporary working title).

### Foundation
Let's start with a page from where everything will branch. The home page. We will be doing it in Frontend > Backend development where we make the frontend and then do the wiring of backend in iterations.

### Core features:
1. Communication [Real time chat, Voice chats, Voice calls/meet room, video call/meet room, media message(images, videos, GIFs, Stickers, etc), Data model messaging(spreadsheet, txt, ppt, mail format, code snippets, etc)]
2. File Sharing [All file types]
3. Activity Tracking [Coding tracking(through waketime), project tracking(through waketime, GitHub, IDEs, GitLab, etc.), Activity tracking(through app plugins like Instagram feed sharing (activity notification(optionally available to be turned on or off)), facebook feed sharing (activity notification(optionally available to be turned on or off)), X(twitter) feed, Activity syncronisation engine(custom engine to sync all activity to create an log map of activity of the user, visible to user by default and optional for the room), etc]
4. AI integration [Room/Space manager, File Manager, Schedule Manager, Office Manager]

### Multi-Tenancy & Permission:
1. Users will be gouped in Spaces, which includes group types-[Lounge, Rooms, Workspace, Channels, Projects]. A "Space" is a term use by this project that refers to a protected server space of any scale where more than 1 users are connected and are sharing resources owned by either or the platform that is *Collab+.
2. A user can be associated with more than one group of different spaces or the same space. A single space can contain multiple group types.
3. RBAC might include Owner, Admin, Moderator and Memeber.*
 
### Security & Privacy:
1. End-to-end encryption will enabled for all messages in all spaces by default. Only the owner will have the authority to disable it. Users can still keep the encryption enables for a direct message even within the same space that has the encryption disabled.
2. All data will be end to end encrypted and authentication data will be encrypted to industry standard.

### Tech Stack / ORM:
In disscussion.