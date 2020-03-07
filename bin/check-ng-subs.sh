#!/bin/bash

. ./lib.sh

echo
echo "----------------------------------------------------"
echo
echo "***** STARTING CHECK-NG-SUBS *****"
echo
echo "----------------------------------------------------"
echo

start=$(date +"%s")
Log "Started checking codebase for open subs"
RED='\033[0;31m'
DEFAULT="\033[0m"

for f in $(find ././../src/app/modules -name '*.ts'); do
  noOfSubscriptions=$(grep -o ': Subscription' ${f} | wc -l)
  if [[ noOfSubscriptions -gt 0 ]]; then
    grep -o -P '(?<=private).*(?=Subscription)' ${f} | while read -r line ; do
      subscriptionName=${line//:}
      noOfOpenSubscriptions=$(grep -o "this.${subscriptionName}.unsubscribe()" ${f} | wc -l)
      if [[ noOfOpenSubscriptions -eq 0 ]]; then
        Log "${RED}Found an open sub for ${subscriptionName} in $(basename ${f}) ${DEFAULT}"
      fi
    done
  fi
done

end=$(date +"%s")
runtime=$((${end}-${start}))
Log "Finished checking codebase for open subs"

echo
echo "----------------------------------------------------"
echo
echo "***** FINISHED CHECK-NG-SUBS *****"
echo
echo "Duration: $(($runtime / 60)) minutes and $(($runtime % 60)) seconds"
echo
echo "----------------------------------------------------"
echo

