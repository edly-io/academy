# Edly Academy

This is the source code of the site that is hosted on https://edly.io/academy. Contributions are welcome: if you see a typo or would like to contribute some content, please open a pull request.

## Usage

To add a new article, open the [build.py](./build.py) file. Insert an entry in `RESOURCES`. Then, test your changes with:

    make build # or `make watch`
    make serve

Once your changes are ready, push them to the upstream repository. The contents of edly.io/academy will be automatically updated after the automated [actions](https://github.com/edly-io/academy/actions/workflows/deploy_s3.yml) have run successfully.

## Development

Install requirements:

- For Linux:

        sudo apt install pandoc
        pip install -r requirements.txt

- For macOS:

        brew install pandoc
        pip install -r requirements.txt

Build the static website:

    make build

Run a development server:

    make serve


## License

This work is licensed under [CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/).
