#!/bin/bash
DIST=dist/modules
for f in src/modules/*/; do
    if [ -d ${f} ]; then
        # Will not run if no directories are available
        # echo $f
        FOLDER=$(echo $f | cut -d'/' -f 3)
        # echo Copy from ${FOLDER}
        for fi in $f*; do
            # echo ${fi}
            FILE=$(echo $fi | cut -d'/' -f 4)

            if [[ $FILE == *.graphql ]]; then
                echo "COPY FROM: ${f}${FILE}"
                echo "TO: ${DIST}/${FOLDER}/${FILE}"

                if [ ! -d "${DIST}/${FOLDER}" ]; then
                    echo "CREATING DIR: ${DIST}/${FOLDER}"
                    mkdir -p ${DIST}/${FOLDER}
                fi

                cp ${f}${FILE} ${DIST}/${FOLDER}/${FILE}
            fi
        done
    fi
done