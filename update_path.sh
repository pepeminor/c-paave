#!/bin/sh
export LC_CTYPE=C ; 
find ./src -type f -name '*.*' -exec sed -i '' -e 's/\(\.\.\/\)*assets\//assets\//g' {} + ; \
find ./src -type f -name '*.*' -exec sed -i '' -e 's/\(\.\.\/\)*components\//components\//g' {} + ; \
find ./src -type f -name '*.*' -exec sed -i '' -e 's/\(\.\.\/\)*config\//config\//g' {} + ; \
find ./src -type f -name '*.*' -exec sed -i '' -e 's/\(\.\.\/\)*constants\//constants\//g' {} + ; \
find ./src -type f -name '*.*' -exec sed -i '' -e 's/\(\.\.\/\)*global\//global\//g' {} + ; \
find ./src -type f -name '*.*' -exec sed -i '' -e 's/\(\.\.\/\)*hooks\//hooks\//g' {} + ; \
find ./src -type f -name '*.*' -exec sed -i '' -e 's/\(\.\.\/\)*interfaces\//interfaces\//g' {} + ; \
find ./src -type f -name '*.*' -exec sed -i '' -e 's/\(\.\.\/\)*reduxs\//reduxs\//g' {} + ; \
find ./src -type f -name '*.*' -exec sed -i '' -e 's/\(\.\.\/\)*screens\//screens\//g' {} + ; \
find ./src -type f -name '*.*' -exec sed -i '' -e 's/\(\.\.\/\)*styles\//styles\//g' {} + ; \
find ./src -type f -name '*.*' -exec sed -i '' -e 's/\(\.\.\/\)*utils\//utils\//g' {} + ; \
find ./src -type f -name '*.*' -exec sed -i '' -e 's/\(\.\.\/\)*HOC\//HOC\//g' {} + ; \
export LC_CTYPE=UTF-8 ;
