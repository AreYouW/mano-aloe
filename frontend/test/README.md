# Frontend Tests

## Installation

1. Install the python packages. You will want to use python 3.
```python
pip3 install -R requirements.txt
```
2. Download [chromedriver](https://chromedriver.chromium.org/). (Geckodriver will be supported later.)

## Running the Tests

```
python3 test_messages.py
```

If your chromedriver is in a different location, use the `--chromedriver_path` option.

If you're testing against a local instance, you can use the `--website_url` option to specify the local url. For example `localhost:3000`. Usually if you're testing locally, you will also have to use the `--backend_url` argument to specify where the backend is.
