#! /bin/bash

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile

brew list librdkafka  &> /dev/null

if [[ $? -gt 0 ]]; then
    brew install librdkafka
else

    brew reinstall librdkafka    
fi

echo "-----finised-----"