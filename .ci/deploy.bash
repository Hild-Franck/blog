mkdir ffmpeg
wget -qP ffmpeg -O ffmpeg.tar.xz https://johnvansickle.com/ffmpeg/builds/ffmpeg-git-amd64-static.tar.xz
tar -xf ffmpeg.tar.xz -C ffmpeg --strip-components 1
PATH=$PATH:$(pwd)/ffmpeg
npm run build