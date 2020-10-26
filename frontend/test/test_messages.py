# Python Standard libs
import argparse
import json
import re
from typing import List

# 3rd party libs
import requests
from selenium import webdriver


REGEX_N = re.compile(r"((\\n)|\s){1,5}")
MSG_CARD_HEAD = '//div[@id="root"]/main/div[2]/div[2]/div[5]/div/div['
MSG_CARD_TAIL = ']/div[1]/div[@class="message-card-text active-message"]/div'
FLAG_HEAD = '//*[@id="root"]/main/div[2]/div[2]/div[5]/div/div['
FLAG_TAIL = ']/div[2]/span/img'


def test_messages(args):
    driver = webdriver.Chrome(args.chromedriver_path)
    driver.implicitly_wait(5)
    driver.get(args.website_url)

    api = requests.get(args.backend_url + "/api/messages")
    api_json = api.json()
    print(json.dumps(api_json, sort_keys=True, ensure_ascii=True, indent=4))

    driver.execute_script("window.scrollTo(0,document.body.scrollHeight)")
    native_message_list = get_native_messages(driver, api_json)
    jp_message_list = []
    flag_list = []
    DOM_list = []

    for message in api_json["messages"]:
        message_index = api_json["messages"].index(message)
        front_end_index = message_index + 1
        jp_msg_xpath = "{}{}{}".format(
            MSG_CARD_HEAD,
            front_end_index,
            MSG_CARD_TAIL)
        flag_xpath = "{}{}{}".format(
            FLAG_HEAD,
            front_end_index,
            FLAG_TAIL
        )
        if api_json["messages"][message_index]["tl_msg"] == "":
            jp_message_list.append("")
        else:
            driver.execute_script(
                "arguments[0].scrollIntoView();",
                driver.find_element_by_xpath(jp_msg_xpath))
            while True:
                if driver.find_element_by_xpath(jp_msg_xpath).is_displayed():
                    jp_message_list.append(
                        driver.find_element_by_xpath(jp_msg_xpath).text)
                    break
        if api_json["messages"][message_index]["country"] == "":
            flag_list.append("")
        else:
            driver.execute_script(
                "arguments[0].scrollIntoView();",
                driver.find_element_by_xpath(flag_xpath))
            while True:
                if driver.find_element_by_xpath(flag_xpath).is_displayed():
                    flag_list.append("".join(
                        map(lambda x: chr(
                            ord(x) - 0x1F1A5), driver.find_element_by_xpath(
                            flag_xpath).get_attribute("alt"))))
                    break
        driver.execute_script(
            "arguments[0].scrollIntoView();",
            driver.find_element_by_xpath(jp_msg_xpath))
        DOM_list.append(
            {
                "country": str(
                    flag_list[message_index]),
                "orig_msg": str(
                    native_message_list[message_index]),
                "tl_msg": str(
                    jp_message_list[message_index]),
                "username": str(
                    driver.find_elements_by_class_name(
                        "message-card-footer")[message_index].text)
            }
        )

    for message in api_json["messages"]:
        message_index = api_json["messages"].index(message)
        front_end_index = message_index + 1
        if not (
            api_json["messages"][message_index][
                "country"] == DOM_list[message_index]["country"]):
            print(
                F'ALERT: ON ENTRY {front_end_index}'
                ' THE COUNTRY HAS A MISMATCH')
        if not (
            unescape(api_json["messages"][message_index][
                "orig_msg"]) == DOM_list[message_index]["orig_msg"]):
            print(
                F'ALERT: ON ENTRY {front_end_index}'
                ' THE NATIVE MESSAGE HAS A MISMATCH')
        if not (
            unescape(api_json["messages"][message_index][
                "tl_msg"]) == DOM_list[message_index]["tl_msg"]):
            print(
                F'ALERT: ON ENTRY {front_end_index}'
                ' THE TRANSLATED MESSAGE HAS A MISMATCH')
        if not (
            unescape(api_json["messages"][message_index][
                "username"]) == DOM_list[message_index]["username"]):
            print(
                F'ALERT: ON ENTRY {front_end_index}'
                ' THE USERNAME HAS A MISMATCH')


def get_native_messages(driver, api_json) -> List:
    native_message_list = []
    # Retrieves all the Native Messages
    for message in api_json["messages"]:
        native_msg_xpath = "{}{}{}".format(
            MSG_CARD_HEAD,
            api_json["messages"].index(message) + 1,
            MSG_CARD_TAIL)
        driver.execute_script(
            "arguments[0].scrollIntoView();",
            driver.find_element_by_xpath(native_msg_xpath))
        while True:
            if driver.find_element_by_xpath(native_msg_xpath).is_displayed():
                native_message_list.append(
                    driver.find_element_by_xpath(native_msg_xpath).text)
                break
    driver.find_element_by_xpath(
        '//*[@id="root"]/main/header/div[2]/button').click()
    return native_message_list

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
