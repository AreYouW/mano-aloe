# Python Standard libs
import argparse
from pprint import pprint
import re
from typing import List, Dict

# 3rd party libs
from deepdiff import DeepDiff
import requests
from selenium import webdriver


REGEX_N = re.compile(r"((\\n)|\s){1,5}")
MSG_CARD_HEAD = '//div[@id="root"]/main/div[2]/div[2]/div[5]/div/div['
MSG_CARD_TAIL = ']/div[1]/div[@class="message-card-text active-message"]/div'
FLAG_HEAD = '//*[@id="root"]/main/div[2]/div[2]/div[5]/div/div['
FLAG_TAIL = ']/div[2]/span/img'
TEST_DIMENSIONS = ["country", "orig_msg", "tl_msg", "username"]


def test_messages(args):
    driver = webdriver.Chrome(args.chromedriver_path)
    driver.implicitly_wait(5)
    driver.get(args.website_url)

    api = requests.get(args.backend_url + "/api/messages")
    api_json = api.json()

    driver.execute_script("window.scrollTo(0,document.body.scrollHeight)")
    DOM_list = get_message_cards_data(driver, api_json)

    for message in api_json["messages"]:
        message["tl_msg"] = unescape(message["tl_msg"])
        message["orig_msg"] = unescape(message["orig_msg"])

    for message in api_json["messages"]:
        message_index = api_json["messages"].index(message)
        front_end_index = message_index + 1
        for dimension in TEST_DIMENSIONS:
            diff = DeepDiff(
                api_json["messages"][message_index][dimension],
                DOM_list[message_index][dimension])
            if diff:
                print(f"Diff detected in front end index {front_end_index}")
                pprint(diff)


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
            "Some opertaion has gone wrong, front_end_index "
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
        FLAG_HEAD,
        front_end_index,
        FLAG_TAIL
    )
    if api_json["messages"][message_index]["country"]:
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


def get_message_cards_data(driver, api_json) -> List:
    dom_list = []
    for message in api_json["messages"]:
        message_index = api_json["messages"].index(message)
        front_end_index = message_index + 1
        native_msg = get_native_messages(
            driver, api_json, front_end_index, message_index)
        username = get_message_username(
            driver, api_json, message_index)
        flag = get_message_flags(
            driver, api_json, front_end_index, message_index)
        # Translate Botan GO!
        driver.find_element_by_xpath(
            '//*[@id="root"]/main/header/div[2]/button').click()
        jp_msg = get_jp_messages(
            driver, api_json, front_end_index, message_index)
        # Revert Back for normal msg
        driver.find_element_by_xpath(
            '//*[@id="root"]/main/header/div[2]/button').click()
        dom_list.append(
            {
                "country": flag,
                "orig_msg": unescape(native_msg),
                "tl_msg": unescape(jp_msg),
                "username": username
            }
        )
    return dom_list


def unescape(in_str):
    """Unicode-unescape string with only some characters escaped."""
    #ideographic space skip, it doesn't work for some reason :(
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
        default='https://manotomo.tk',
        help='the website that this test will use, do not include '
        'a slash at the end, for example https://manotomo.tk is '
        'good, but https://manotomo.tk/ or '
        'https://manotomo.tk/api/messages is bad.'
    )
    parser.add_argument(
        '--backend_url', '-b', dest='backend_url',
        default='https://manotomo.tk',
        help='URL for the backend. Used for local testing.'
    )
    args = parser.parse_args()
    test_messages(args)
