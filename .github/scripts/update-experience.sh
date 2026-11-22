#!/usr/bin/env bash
# Sets the README experience badge to the number of full years since the
# career start month. Optional first argument: today's date as YYYY-MM, for testing.
set -euo pipefail

start_year=2023
start_month=2
today="${1:-$(date -u +%Y-%m)}"
year="${today%-*}"
month=$((10#${today#*-}))

years=$((year - start_year))
if [ "$month" -lt "$start_month" ]; then
  years=$((years - 1))
fi

sed -i -E \
  -e "s#badge/experience-[0-9]+%2B_years#badge/experience-${years}%2B_years#" \
  -e "s#alt=\"Experience: [0-9]+\\+ years\"#alt=\"Experience: ${years}+ years\"#" \
  README.md

echo "experience: ${years}+ years (as of ${today})"
