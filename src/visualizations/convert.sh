dirName=$1
visName=$2

for file in $(ls $dirName); do
  sed -i '1iimport * as d3 from "d3";\nimport $ from "jquery";\nimport shared from "../../shared/shared";\n' $dirName/$file \
  && sed -i "s/gViz\.shared/shared/g" $dirName/$file \
  && sed -i "s/gViz\.vis\.$visName\./const /g" $dirName/$file \
  && printf "\nexport default ${file%%.*};" >> $dirName/$file
done
