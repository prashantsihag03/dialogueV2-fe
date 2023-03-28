# add bash declaration here

# use environment variable to assign Backend build path to this variable
BE_PUBLIC_PATH="/Users/prashantsihag/Downloads/projects/dialogueV2/public"
BE_PUBLIC_JAVASCRIPT_PATH="${BE_PUBLIC_PATH}/javascripts"
BE_PUBLIC_IMAGES_PATH="${BE_PUBLIC_PATH}/images"

FE_BUILD_PATH="/Users/prashantsihag/Downloads/projects/dialogueV2-fe/build"
FE_BUILD_JAVASCRIPT_PATH="${FE_BUILD_PATH}/javascripts"
FE_BUILD_IMAGES_PATH="${FE_BUILD_PATH}/images"

# copying build files to backend public directory
cp -R $FE_BUILD_JAVASCRIPT_PATH/. $BE_PUBLIC_JAVASCRIPT_PATH/
cp -R $FE_BUILD_IMAGES_PATH/. $BE_PUBLIC_IMAGES_PATH/
cp -R $FE_BUILD_PATH/home.html $BE_PUBLIC_PATH/home.html