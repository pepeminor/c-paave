rm -rf ./ios/build
rm -rf $HOME/Library/Developer/Xcode/DerivedData/*
rm -rf $HOME/Library/Caches/com.apple.dt.Xcode/*
rm -rf "$(getconf DARWIN_USER_CACHE_DIR)/org.llvm.clang/ModuleCache"
rm -rf "$(getconf DARWIN_USER_CACHE_DIR)/org.llvm.clang.${USER}/ModuleCache"