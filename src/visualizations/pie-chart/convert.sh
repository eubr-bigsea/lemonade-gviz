visName=$1

for file in $(ls | grep -v convert); do
  sed -i '1iimport * as d3 from "d3";\nimport $ from "jquery";\nimport shared from "../../shared/shared";\n' $file \
  && sed -i "s/gViz\.shared/shared/g" $file \
  && sed -i "s/gViz\.vis\.$visName\./const /g" $file \
  && printf "\nexport default ${file%%.*};" >> $file
done
