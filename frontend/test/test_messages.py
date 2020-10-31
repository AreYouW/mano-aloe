"""
E2E test for whether API messages from Backend and DOM messages displayed
on Frontend matches.

Checks native messages, JP messages, flag emojis, and username.

Exercises the following UI elements:
- Full site translate botan on NavBar
- Loading and displaying cards on the entire frontpage
"""

# Python Standard libs
import argparse
from pprint import pprint
import re
from typing import Dict

# 3rd party libs
from deepdiff import DeepDiff
import requests
from selenium import webdriver

NUM_ERRORS = 0
REGEX_N = re.compile(r"((\\n)|\s){1,5}")
MSG_CARD_HEAD = '//div[@id="root"]/main/section/div/div[5]/div/div/div['
MSG_CARD_TAIL = (
    ']/div/div/div/div[@class="message-card-text active-message"]/div')
FLAG_TAIL = ']/div/div/div[2]/span/img'
TRANSLATE_BOTAN = '//*[@id="root"]/header[1]/div[2]/button'
# TODO: Replace TEST_DIMENSIONS with "region" once aloe site uses region in db
REGION = "country"
TEST_DIMENSIONS = [REGION, "orig_msg", "tl_msg", "username"]


def test_messages(args):
    driver = webdriver.Chrome(args.chromedriver_path)
    driver.implicitly_wait(5)
    driver.get(f"http://{args.website_url}")

    api = requests.get(f"http://{args.backend_url}/api/messages")
    api_json = api.json()

    # Determines whether fields in the FE and BE are the same.
    # Skips UI testing early if there's possible issues here.
    api_keys = list(api_json["messages"][0].keys())
    # messageID not used on the frontend
    api_keys.pop(api_keys.index("messageID"))
    api_dom_keys_diff = DeepDiff(
        api_keys,
        TEST_DIMENSIONS,
        ignore_order=True)
    assert not api_dom_keys_diff, (
        f"Diff between backend and frontend keys {api_dom_keys_diff}")

    driver.execute_script("window.scrollTo(0,document.body.scrollHeight)")
    DOM_dict = get_message_cards_data(driver, api_json)

    for message in api_json["messages"]:
        message["tl_msg"] = unescape(message["tl_msg"])
        message["orig_msg"] = unescape(message["orig_msg"])

    global NUM_ERRORS
    for message_index, dom_message in DOM_dict.items():
        for dimension in TEST_DIMENSIONS:
            diff = DeepDiff(
                api_json["messages"][message_index][dimension],
                dom_message[dimension])
            if diff:
                print(f"Diff detected in front end index {message_index + 1}")
                pprint(diff)
                NUM_ERRORS += 1



def get_native_messages(
        driver, api_json, front_end_index, message_index) -> str:
    native_msg_xpath = "{}{}{}".format(
        MSG_CARD_HEAD,
        front_end_index,
        MSG_CARD_TAIL)
    driver.execute_script(
        "arguments[0].scrollIntoView();",
        driver.find_element_by_xpath(native_msg_xpath))
    while True:
        if driver.find_element_by_xpath(native_msg_xpath).is_displayed():
            return driver.find_element_by_xpath(native_msg_xpath).text
    else:
        raise ValueError(
            "Some operation has gone wrong, front_end_index "
            f"{front_end_index} for native msg does not exist on page")


def get_jp_messages(
        driver, api_json, front_end_index, message_index) -> str:
    jp_msg_xpath = "{}{}{}".format(
        MSG_CARD_HEAD,
        front_end_index,
        MSG_CARD_TAIL)
    if api_json["messages"][message_index]["tl_msg"]:
        driver.execute_script(
            "arguments[0].scrollIntoView();",
            driver.find_element_by_xpath(jp_msg_xpath))
        while True:
            if driver.find_element_by_xpath(jp_msg_xpath).is_displayed():
                return driver.find_element_by_xpath(jp_msg_xpath).text
    return ""


def get_message_flags(
        driver, api_json, front_end_index, message_index) -> str:
    flag_xpath = "{}{}{}".format(
        MSG_CARD_HEAD,
        front_end_index,
        FLAG_TAIL
    )
    if api_json["messages"][message_index][REGION]:
        driver.execute_script(
            "arguments[0].scrollIntoView();",
            driver.find_element_by_xpath(flag_xpath))
        while True:
            if driver.find_element_by_xpath(flag_xpath).is_displayed():
                return ("".join(
                    map(lambda x: chr(
                        ord(x) - 0x1F1A5), driver.find_element_by_xpath(
                        flag_xpath).get_attribute("alt"))))
    return ""


def get_message_username(
        driver, api_json, message_index) -> str:
    return driver.find_elements_by_class_name(
        "message-card-footer")[message_index].text


def get_message_cards_data(driver, api_json) -> Dict:
    dom_dict = {}
    for message in api_json["messages"]:
        message_index = api_json["messages"].index(message)
        front_end_index = message_index + 1
        current_dict = {
            REGION: get_message_flags(
                driver, api_json, front_end_index, message_index),
            "orig_msg": unescape(
                get_native_messages(
                    driver, api_json, front_end_index, message_index)),
            "tl_msg": "",  # Populate after page completely Japanese
            "username": get_message_username(
                driver, api_json, message_index)
        }
        dom_dict[message_index] = current_dict

    # TRANSLATE BOTAN GO!
    driver.find_element_by_xpath(TRANSLATE_BOTAN).click()
    # Not part of the original loop to save time since all cards are
    # translated using the site-wide translate botan
    for message in api_json["messages"]:
        message_index = api_json["messages"].index(message)
        front_end_index = message_index + 1
        dom_dict[message_index]['tl_msg'] = unescape(
            get_jp_messages(
                driver, api_json, front_end_index, message_index))
    return dom_dict


def unescape(in_str):
    """Unicode-unescape string with only some characters escaped."""
    # ideographic space skip, it doesn't work for some reason :(
    in_str = in_str.replace('\\u3000', " ")
    in_str = REGEX_N.sub(" ", in_str)
    in_str = in_str.encode('unicode-escape')   # bytes with all chars escaped (the original escapes have the backslash escaped)
    in_str = in_str.replace(b'\\\\u', b'\\u')  # unescape the \
    in_str = in_str.decode('unicode-escape')   # unescape unicode
    in_str = in_str.rstrip()
    return in_str


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='Arg parser for chromedriver path and website '
                    'url.')
    parser.add_argument(
        '--chromedriver_path', '-c', dest='chromedriver_path',
        default='/chromedriver.exe',
        help='the path to your chromedriver')
    parser.add_argument(
        '--website_url', '-w', dest='website_url',
        default='manotomo.tk',
        help='the website that this test will use, do not include '
        'a slash at the end, for example manotomo.tk is '
        'good, but manotomo.tk/ or '
        'manotomo.tk/api/messages is bad.'
    )
    parser.add_argument(
        '--backend_url', '-b', dest='backend_url',
        default='manotomo.tk',
        help='URL for the backend. Used for local testing.'
    )
    args = parser.parse_args()
    test_messages(args)
    print(NUM_ERRORS)
