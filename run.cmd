@ECHO OFF

REM invoke npm through a windows equivalent of a subshell due to an npm bug
REM https://github.com/npm/npm/issues/2938
cmd /c npm install

NODE_ENV=staging npm run dev
