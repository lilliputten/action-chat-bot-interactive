#!/bin/sh
# @desc Pack publish folder
# @changed 2026.05.24, 16:01

scriptsPath=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")
rootPath=`dirname "$scriptsPath"`
prjPath="$rootPath" # `pwd`

# Import config variables (expected variable `$BUILD_FOLDER`)...
test -f "$scriptsPath/config.sh" && . "$scriptsPath/config.sh"
test -f "$scriptsPath/config-local.sh" && . "$scriptsPath/config-local.sh"

# Check basic required variables...
test -f "$scriptsPath/config-check.sh" && . "$scriptsPath/config-check.sh"

PRJNAME=`git remote -v  | sed -rn '1s#.*/(.*)\.git.*#\1#p'`

VERSION_PATH="$rootPath/${VERSION_FILE}"
VERSION=`cat "$VERSION_PATH"`
# TIMESTAMP=`date -r "$VERSION_PATH" "+%Y.%m.%d %H:%M:%S %z"`
TIMETAG=`date -r "$VERSION_PATH" "+%y%m%d-%H%M"`

ARCDIR=".arc"
ARCNAME="$PRJNAME-v.$VERSION-$TIMETAG.zip"

echo "Pack publish folder '$BUILD_FOLDER' to archive '$ARCNAME'..."

mkdir -p $ARCDIR

cd "$BUILD_FOLDER" && \
  pwd && \
  zip -r "../$ARCDIR/$ARCNAME" * -x "*_" -x "*.swp"
  cd .. && \
  echo OK
