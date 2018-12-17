Frequently Asked Questions
==========================

Q. The dev process is weird.
----------------------------
That's not a question but I'll explain. In development Create-React-App sits
on port :3000 and Express sits on :3001 so we can enable hot code reloading.

In production we make a prebuilt version of the React app and serve it on
:3001 with express.
